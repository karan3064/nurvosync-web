// Real gait-classifier training script.
//
// Reads CSV files exported by the app's DataLogger ("ML Training Data
// Collection" panel) from training-data/, windows the sensor stream into
// fixed-size chunks, extracts summary-statistic features per window, and
// trains an actual TensorFlow.js dense classifier on them.
//
// Usage: npm run train-model
//
// Uses plain @tensorflow/tfjs (pure JS CPU backend) rather than
// @tensorflow/tfjs-node, to avoid native-binding install issues -- the
// tradeoff is training runs on the JS CPU backend, which is fine for the
// small feature-vector dataset this produces (not raw high-res signals).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as tf from '@tensorflow/tfjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'training-data');
const OUT_DIR = path.join(ROOT, 'public', 'models', 'gait-classifier');

// Must match the CSV column order DataLogger.tsx writes, and must stay in
// sync with the feature order used at inference time in
// src/hooks/useTrainedGaitModel.ts.
const CHANNELS = [
  'left_fsr_0', 'left_fsr_1', 'left_fsr_2', 'left_fsr_3', 'left_fsr_4',
  'right_fsr_0', 'right_fsr_1', 'right_fsr_2', 'right_fsr_3', 'right_fsr_4',
  'left_ax', 'left_ay', 'left_az',
  'right_ax', 'right_ay', 'right_az',
];

const WINDOW_SIZE = 50; // rows per window (non-overlapping)
const MIN_SAMPLES = 8; // refuse to train on fewer windows than this

function parseCsv(filePath) {
  const text = fs.readFileSync(filePath, 'utf-8').trim();
  const lines = text.split('\n');
  const header = lines[0].split(',');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length !== header.length) continue; // skip malformed rows
    const row = {};
    header.forEach((col, j) => {
      row[col] = col === 'label' ? cols[j] : Number(cols[j]);
    });
    rows.push(row);
  }
  return rows;
}

function mean(arr) { return arr.reduce((a, b) => a + b, 0) / arr.length; }
function std(arr, m) {
  const variance = arr.reduce((a, b) => a + (b - m) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}

function extractFeatures(window) {
  const features = [];
  for (const channel of CHANNELS) {
    const values = window.map((row) => row[channel]);
    const m = mean(values);
    features.push(m, std(values, m), Math.min(...values), Math.max(...values));
  }
  return features; // length = CHANNELS.length * 4
}

function loadDataset() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`No training-data/ directory found at ${DATA_DIR}`);
    process.exit(1);
  }
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.csv'));
  if (files.length === 0) {
    console.error(
      'No CSV files found in training-data/. Record sessions via the app\'s ' +
      '"ML Training Data Collection" panel first -- see training-data/README.md.'
    );
    process.exit(1);
  }

  const samples = []; // { features: number[], label: string }
  for (const file of files) {
    const rows = parseCsv(path.join(DATA_DIR, file));
    if (rows.length === 0) continue;
    const label = rows[0].label;
    for (let i = 0; i + WINDOW_SIZE <= rows.length; i += WINDOW_SIZE) {
      const window = rows.slice(i, i + WINDOW_SIZE);
      samples.push({ features: extractFeatures(window), label });
    }
    console.log(`  ${file}: ${rows.length} rows -> ${Math.floor(rows.length / WINDOW_SIZE)} windows [${label}]`);
  }

  return samples;
}

async function saveModel(model, normalization, labels) {
  await fs.promises.mkdir(OUT_DIR, { recursive: true });

  // Pure-JS custom save handler (no @tensorflow/tfjs-node dependency needed)
  // that writes the exact model.json + weights.bin format the browser's
  // tf.loadLayersModel() expects.
  await model.save(tf.io.withSaveHandler(async (artifacts) => {
    const modelJson = {
      modelTopology: artifacts.modelTopology,
      format: artifacts.format,
      generatedBy: artifacts.generatedBy,
      convertedBy: artifacts.convertedBy,
      weightsManifest: [{ paths: ['weights.bin'], weights: artifacts.weightSpecs }],
    };
    await fs.promises.writeFile(path.join(OUT_DIR, 'model.json'), JSON.stringify(modelJson));
    await fs.promises.writeFile(path.join(OUT_DIR, 'weights.bin'), Buffer.from(artifacts.weightData));
    return { modelArtifactsInfo: { dateSaved: new Date(), modelTopologyType: 'JSON' } };
  }));

  await fs.promises.writeFile(
    path.join(OUT_DIR, 'normalization.json'),
    JSON.stringify(normalization, null, 2)
  );
  await fs.promises.writeFile(
    path.join(OUT_DIR, 'labels.json'),
    JSON.stringify(labels, null, 2)
  );
}

async function main() {
  console.log('Loading training-data/*.csv ...');
  const samples = loadDataset();

  if (samples.length < MIN_SAMPLES) {
    console.error(
      `\nOnly ${samples.length} training windows found (need at least ${MIN_SAMPLES}). ` +
      `Record more sessions -- refusing to train a model on insufficient data.`
    );
    process.exit(1);
  }

  const labels = [...new Set(samples.map((s) => s.label))].sort();
  if (labels.length < 2) {
    console.error(
      `\nOnly one label ("${labels[0]}") present across all recordings. ` +
      `Need at least 2 different activity labels to train a classifier.`
    );
    process.exit(1);
  }
  console.log(`\n${samples.length} total windows across ${labels.length} labels: ${labels.join(', ')}`);

  // Normalize features (z-score) -- stats saved alongside the model so
  // inference applies the identical transform.
  const featureLength = samples[0].features.length;
  const means = new Array(featureLength).fill(0);
  const stds = new Array(featureLength).fill(1);
  for (let f = 0; f < featureLength; f++) {
    const col = samples.map((s) => s.features[f]);
    means[f] = mean(col);
    stds[f] = std(col, means[f]) || 1; // avoid divide-by-zero for constant columns
  }
  const normalized = samples.map((s) => ({
    features: s.features.map((v, f) => (v - means[f]) / stds[f]),
    label: s.label,
  }));

  // Shuffle, then split 80/20 train/validation.
  for (let i = normalized.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [normalized[i], normalized[j]] = [normalized[j], normalized[i]];
  }
  const splitIdx = Math.floor(normalized.length * 0.8);
  const trainSet = normalized.slice(0, splitIdx);
  const valSet = normalized.slice(splitIdx);

  const toTensors = (set) => {
    const xs = tf.tensor2d(set.map((s) => s.features));
    const ys = tf.tensor2d(
      set.map((s) => labels.map((l) => (l === s.label ? 1 : 0)))
    );
    return { xs, ys };
  };
  const trainTensors = toTensors(trainSet);
  const valTensors = valSet.length > 0 ? toTensors(valSet) : null;

  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [featureLength], units: 32, activation: 'relu' }));
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: labels.length, activation: 'softmax' }));
  model.compile({ optimizer: tf.train.adam(0.01), loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

  console.log('\nTraining...\n');
  await model.fit(trainTensors.xs, trainTensors.ys, {
    epochs: 60,
    validationData: valTensors ? [valTensors.xs, valTensors.ys] : undefined,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        const valPart = logs.val_acc !== undefined ? ` val_acc=${logs.val_acc.toFixed(3)}` : '';
        if (epoch % 10 === 0 || epoch === 59) {
          console.log(`  epoch ${epoch + 1}/60  loss=${logs.loss.toFixed(3)} acc=${logs.acc.toFixed(3)}${valPart}`);
        }
      },
    },
  });

  await saveModel(
    model,
    { channels: CHANNELS, windowSize: WINDOW_SIZE, means, stds },
    labels
  );

  console.log(`\nSaved real trained model to ${path.relative(ROOT, OUT_DIR)}/`);
  console.log('The app will automatically pick it up on next load (src/hooks/useTrainedGaitModel.ts).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
