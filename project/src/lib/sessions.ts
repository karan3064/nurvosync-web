import { supabase } from './supabase';
import type { GaitSession } from '../types/domain';
import type { WalkReport } from '../hooks/gaitAnalysis';

export async function saveSession(
  doctorId: string,
  patientId: string,
  report: WalkReport
): Promise<GaitSession> {
  const { data, error } = await supabase
    .from('gait_sessions')
    .insert({
      doctor_id: doctorId,
      patient_id: patientId,
      symmetry: report.symmetry,
      balance_score: report.balanceScore,
      step_count: report.stepCount,
      cadence: report.cadence,
      stance_percent: report.stancePercent,
      swing_percent: report.swingPercent,
      step_variability: report.stepVariability,
      asymmetry_index: report.asymmetryIndex,
      stride_length: report.strideLength,
      risk_level: report.riskLevel,
      risk_reason: report.riskReason,
      left_heel_toe_ratio: report.leftHeelToeRatio,
      right_heel_toe_ratio: report.rightHeelToeRatio,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function listSessionsForPatient(patientId: string): Promise<GaitSession[]> {
  const { data, error } = await supabase
    .from('gait_sessions')
    .select('*')
    .eq('patient_id', patientId)
    .order('recorded_at', { ascending: true }); // ascending for chart chronology
  if (error) throw error;
  return data ?? [];
}

// Fetches every session belonging to a doctor in one query, so the dashboard
// can compute per-patient stats without an N+1 query loop.
export async function listSessionsForDoctor(doctorId: string): Promise<GaitSession[]> {
  const { data, error } = await supabase
    .from('gait_sessions')
    .select('*')
    .eq('doctor_id', doctorId)
    .order('recorded_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}
