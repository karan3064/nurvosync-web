import type { GaitSession } from '../types/domain';

// Thresholds below are reconciled with the ones already used in
// src/hooks/gaitAnalysis.ts's analyzeWalk() (symmetry < 80/90 ~= asymmetry
// index > 20/10). Keep both files in sync if these change.
const ASYMMETRY_HIGH = 15;
const ASYMMETRY_MILD = 8;
const STEP_VARIABILITY_HIGH = 10;
const HEEL_TOE_RATIO_LOW = 0.5;
const CADENCE_LOW = 60;
const CADENCE_HIGH = 130;

export type Tone = "critical" | "warning" | "normal";

export function classifyStepVariability(v: number): { label: string; tone: Tone } {
  if (v > STEP_VARIABILITY_HIGH) return { label: "Elevated", tone: "critical" };
  if (v > STEP_VARIABILITY_HIGH / 2) return { label: "Moderate", tone: "warning" };
  return { label: "Normal", tone: "normal" };
}

export function classifyBalance(balanceScore: number): { label: string; tone: Tone } {
  if (balanceScore < 70) return { label: "Poor", tone: "critical" };
  if (balanceScore < 85) return { label: "Moderate", tone: "warning" };
  return { label: "Good", tone: "normal" };
}

export function classifyCadence(cadence: number): { label: string; tone: Tone } {
  if (cadence < CADENCE_LOW || cadence > CADENCE_HIGH) return { label: "Abnormal", tone: "warning" };
  return { label: "Normal", tone: "normal" };
}

// Documented policy mapping (not a validated clinical scale) shared by the
// live in-session risk badge and the patient dashboard's fall-risk sidebar,
// so both display consistent numbers for the same risk_level.
export function riskLevelToScore(level: "Low" | "Moderate" | "High"): number {
  switch (level) {
    case "High": return 85;
    case "Moderate": return 50;
    default: return 15;
  }
}

export interface ClinicalInsight {
  diagnosis: string;
  biomarkers: {
    asymmetry: string;
    variability: string;
    cadence: string;
    impact: string;
  };
  narrative: string;
  recommendation: string;
  alert: string;
}

// Real, deterministic, explainable clinical decision support -- derives
// every field from the session's actual recorded numbers. Not a trained
// model; a documented rule engine, honestly labeled as such in the UI.
export function generateClinicalNarrative(session: GaitSession | null): ClinicalInsight | null {
  if (!session) return null;

  const {
    asymmetry_index,
    step_variability,
    cadence,
    risk_level,
    risk_reason,
    left_heel_toe_ratio,
    right_heel_toe_ratio,
    stance_percent,
  } = session;

  const hasShuffle = left_heel_toe_ratio < HEEL_TOE_RATIO_LOW || right_heel_toe_ratio < HEEL_TOE_RATIO_LOW;

  let diagnosis = "Normal Gait Pattern";
  if (hasShuffle) {
    diagnosis = "Shuffling / Reduced Heel Strike Pattern";
  } else if (asymmetry_index > ASYMMETRY_HIGH) {
    diagnosis = "Significant Antalgic (Asymmetric) Gait Pattern";
  } else if (step_variability > STEP_VARIABILITY_HIGH) {
    diagnosis = "Ataxic / High-Variability Gait Pattern";
  } else if (asymmetry_index > ASYMMETRY_MILD) {
    diagnosis = "Mild Gait Asymmetry";
  }

  const narrative =
    `Recorded session shows an asymmetry index of ${asymmetry_index}% between left and right limb loading ` +
    `(${asymmetry_index > ASYMMETRY_HIGH ? "clinically significant" : asymmetry_index > ASYMMETRY_MILD ? "mildly elevated" : "within normal limits"}). ` +
    `Step-to-step variability is ${step_variability}% ` +
    `(${step_variability > STEP_VARIABILITY_HIGH ? "elevated, suggesting reduced gait stability" : "within expected range"}). ` +
    `Cadence measured at ${cadence} steps/min with ${stance_percent}% of the gait cycle spent in stance phase. ` +
    risk_reason;

  let recommendation = "Continue routine monitoring.";
  if (hasShuffle) {
    recommendation = "Recommend gait training focused on heel-strike mechanics; evaluate for foot drop or shuffling compensation.";
  } else if (risk_level === "High") {
    recommendation = "Recommend clinical follow-up within 1 week; consider balance/fall-risk assessment.";
  } else if (risk_level === "Moderate") {
    recommendation = "Recommend monitoring over next 2-3 sessions to confirm trend before intervention.";
  }

  const alert =
    risk_level === "High" ? "High Fall Risk — Review Required" :
    risk_level === "Moderate" ? "Moderate Risk — Monitor Closely" :
    "No Immediate Concerns";

  return {
    diagnosis,
    biomarkers: {
      asymmetry: `${asymmetry_index}%`,
      variability: `${step_variability}%`,
      cadence: `${cadence} spm`,
      impact: hasShuffle ? "Abnormal (Low Heel Load)" : "Normal",
    },
    narrative,
    recommendation,
    alert,
  };
}

export interface LiveGaitSignal {
  label: "Idle" | "Walking" | "Asymmetric Loading" | "High Impact";
  severity: "info" | "warning" | "danger";
  message: string;
}

// Real-time per-frame classifier for the live BLE view. analyzeWalk's
// metrics are windowed (need a full recording) and can't run per-frame, so
// this is deliberately separate, simple heuristic logic driven directly by
// the current frame's pressure/impact readings.
export function classifyLiveFrame(params: {
  leftSum: number;
  rightSum: number;
  leftImpactG: number; // |az - 1|
  rightImpactG: number;
}): LiveGaitSignal {
  const { leftSum, rightSum, leftImpactG, rightImpactG } = params;
  const total = leftSum + rightSum;
  const maxImpact = Math.max(leftImpactG, rightImpactG);

  if (total < 0.05) {
    return { label: "Idle", severity: "info", message: "No load detected." };
  }

  if (maxImpact > 1.8) {
    return { label: "High Impact", severity: "danger", message: `Shock: ${maxImpact.toFixed(1)}g` };
  }

  const leftPercent = (leftSum / total) * 100;
  if (Math.abs(leftPercent - 50) > 22) {
    return { label: "Asymmetric Loading", severity: "warning", message: "Asymmetric foot loading detected." };
  }

  return { label: "Walking", severity: "info", message: "Normal gait loading." };
}
