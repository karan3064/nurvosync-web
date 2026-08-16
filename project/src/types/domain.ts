export interface Patient {
  id: string;
  doctor_id: string;
  name: string;
  age: number;
  condition: string;
  created_at: string;
}

export interface GaitSession {
  id: string;
  patient_id: string;
  doctor_id: string;
  recorded_at: string;
  symmetry: number;
  balance_score: number;
  step_count: number;
  cadence: number;
  stance_percent: number;
  swing_percent: number;
  step_variability: number;
  asymmetry_index: number;
  stride_length: number;
  risk_level: "Low" | "Moderate" | "High";
  risk_reason: string;
  left_heel_toe_ratio: number;
  right_heel_toe_ratio: number;
  created_at: string;
}

// Derived/UI-only shape used by the dashboard's patient roster row,
// computed client-side from a Patient + their session history.
export interface PatientWithStats extends Patient {
  latestSession: GaitSession | null;
  status: "High Risk" | "Needs Review" | "Stable" | "No Sessions";
  trend: "improving" | "declining" | "stable";
  adherence: number; // 0-100
  lastVisit: string; // human-readable relative string
}
