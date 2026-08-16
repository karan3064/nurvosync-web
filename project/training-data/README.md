# Training Data

Drop CSV files exported from the app's "ML Training Data Collection" panel
(Live Assessment → Advanced: Raw Sensor Log) here, then run:

```
npm run train-model
```

## How to collect data

1. Connect both insoles on the Live Assessment page.
2. Open "Advanced: Raw Sensor Log".
3. Pick a **Target Activity** label (Idle / Normal Walking / Limping / Falling (simulated)).
4. Click **Record**, perform that activity for 20-30+ seconds, click **Stop & Save**.
5. Repeat for each activity, multiple times, ideally with different people/sessions
   for variety. Each recording downloads as one CSV into your Downloads folder —
   move it into this `training-data/` folder.

## What you need before training produces a useful model

- At least a few recordings per activity label (the more real variation, the
  better — different people, different walking styles, different sessions).
- More than one activity label present (a single-class dataset can't classify
  anything).

The training script will refuse to run (with a clear message) if there isn't
enough real data yet — it will not fabricate a "trained" model from
insufficient data.

Nothing in this folder is committed to git (see `.gitignore`) since it's raw
sensor recordings, not source code.
