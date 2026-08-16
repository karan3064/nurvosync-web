import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const MODEL_URL = '/models/gait-classifier/model.json';
const NORMALIZATION_URL = '/models/gait-classifier/normalization.json';
const LABELS_URL = '/models/gait-classifier/labels.json';

interface Normalization {
  channels: string[];
  windowSize: number;
  means: number[];
  stds: number[];
}

interface SensorFrame {
  leftFsr: number[];
  rightFsr: number[];
  leftImu: { ax: number; ay: number; az: number };
  rightImu: { ax: number; ay: number; az: number };
}

export interface TrainedPrediction {
  label: string;
  confidence: number;
}

function mean(arr: number[]) { return arr.reduce((a, b) => a + b, 0) / arr.length; }
function std(arr: number[], m: number) {
  const variance = arr.reduce((a, b) => a + (b - m) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}

function getChannelValue(frame: SensorFrame, channel: string): number {
  if (channel.startsWith('left_fsr_')) return frame.leftFsr[Number(channel.split('_')[2])] ?? 0;
  if (channel.startsWith('right_fsr_')) return frame.rightFsr[Number(channel.split('_')[2])] ?? 0;
  if (channel === 'left_ax') return frame.leftImu.ax;
  if (channel === 'left_ay') return frame.leftImu.ay;
  if (channel === 'left_az') return frame.leftImu.az;
  if (channel === 'right_ax') return frame.rightImu.ax;
  if (channel === 'right_ay') return frame.rightImu.ay;
  if (channel === 'right_az') return frame.rightImu.az;
  return 0;
}

// Must exactly match scripts/train-model.mjs's extractFeatures() -- same
// channel order, same per-channel stats (mean/std/min/max). If one changes,
// the other must change too, or predictions will be garbage.
function extractFeatures(window: SensorFrame[], channels: string[]): number[] {
  const features: number[] = [];
  for (const channel of channels) {
    const values = window.map((f) => getChannelValue(f, channel));
    const m = mean(values);
    features.push(m, std(values, m), Math.min(...values), Math.max(...values));
  }
  return features;
}

// Loads a real trained model if one exists at public/models/gait-classifier/
// (produced by `npm run train-model` on real recorded sessions). If no model
// has been trained yet, `available` stays false -- this is the expected
// state, not an error, and the rest of the app must work identically either
// way (see AIAnalysis.tsx, which only shows a trained-model badge when
// `available` is true).
export function useTrainedGaitModel() {
  const [available, setAvailable] = useState(false);
  const modelRef = useRef<tf.LayersModel | null>(null);
  const normalizationRef = useRef<Normalization | null>(null);
  const labelsRef = useRef<string[]>([]);
  const bufferRef = useRef<SensorFrame[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [model, normRes, labelsRes] = await Promise.all([
          tf.loadLayersModel(MODEL_URL),
          fetch(NORMALIZATION_URL),
          fetch(LABELS_URL),
        ]);
        if (!normRes.ok || !labelsRes.ok) throw new Error('missing sidecar files');
        const normalization: Normalization = await normRes.json();
        const labels: string[] = await labelsRes.json();
        if (cancelled) return;
        modelRef.current = model;
        normalizationRef.current = normalization;
        labelsRef.current = labels;
        setAvailable(true);
        console.info('Trained gait model loaded:', labels);
      } catch {
        // No trained model yet -- expected until `npm run train-model` has
        // been run against real recorded sessions. Not an error.
        setAvailable(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const pushFrame = (frame: SensorFrame): TrainedPrediction | null => {
    if (!available || !modelRef.current || !normalizationRef.current) return null;
    const norm = normalizationRef.current;
    bufferRef.current.push(frame);
    if (bufferRef.current.length > norm.windowSize) bufferRef.current.shift();
    if (bufferRef.current.length < norm.windowSize) return null;

    const raw = extractFeatures(bufferRef.current, norm.channels);
    const normalized = raw.map((v, i) => (v - norm.means[i]) / (norm.stds[i] || 1));

    const output = tf.tidy(() => {
      const input = tf.tensor2d([normalized]);
      const prediction = modelRef.current!.predict(input) as tf.Tensor;
      return prediction.dataSync();
    });

    let maxIdx = 0;
    for (let i = 1; i < output.length; i++) if (output[i] > output[maxIdx]) maxIdx = i;
    return { label: labelsRef.current[maxIdx], confidence: Math.round(output[maxIdx] * 100) };
  };

  return { available, pushFrame };
}
