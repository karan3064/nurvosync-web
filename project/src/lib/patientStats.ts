import type { GaitSession, Patient, PatientWithStats } from '../types/domain';

// Clinical policy assumptions, not a validated protocol -- tune as needed.
const TARGET_SESSIONS_PER_WEEK = 3;
const TREND_THRESHOLD_PCT = 3;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function computeAdherence(sessions: GaitSession[], now: Date = new Date()): number {
  const cutoff = now.getTime() - SEVEN_DAYS_MS;
  const sessionsInLast7Days = sessions.filter(
    (s) => new Date(s.recorded_at).getTime() >= cutoff
  ).length;
  return Math.round(Math.min(100, (sessionsInLast7Days / TARGET_SESSIONS_PER_WEEK) * 100));
}

function computeTrend(sortedSessions: GaitSession[]): PatientWithStats['trend'] {
  if (sortedSessions.length < 2) return 'stable'; // insufficient data, don't fabricate a trend
  const latest = sortedSessions[sortedSessions.length - 1];
  const previous = sortedSessions[sortedSessions.length - 2];
  const delta = latest.symmetry - previous.symmetry;
  if (delta > TREND_THRESHOLD_PCT) return 'improving';
  if (delta < -TREND_THRESHOLD_PCT) return 'declining';
  return 'stable';
}

function computeStatus(latestSession: GaitSession | null): PatientWithStats['status'] {
  if (!latestSession) return 'No Sessions';
  if (latestSession.risk_level === 'High') return 'High Risk';
  if (latestSession.risk_level === 'Moderate') return 'Needs Review';
  return 'Stable';
}

function relativeLastVisit(latestSession: GaitSession | null): string {
  if (!latestSession) return 'Never';
  const days = Math.floor((Date.now() - new Date(latestSession.recorded_at).getTime()) / (24 * 60 * 60 * 1000));
  if (days <= 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
}

export function computePatientStats(patients: Patient[], sessions: GaitSession[]): PatientWithStats[] {
  return patients.map((patient) => {
    const patientSessions = sessions
      .filter((s) => s.patient_id === patient.id)
      .sort((a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime());

    const latestSession = patientSessions.length > 0 ? patientSessions[patientSessions.length - 1] : null;

    return {
      ...patient,
      latestSession,
      status: computeStatus(latestSession),
      trend: computeTrend(patientSessions),
      adherence: computeAdherence(patientSessions),
      lastVisit: relativeLastVisit(latestSession),
    };
  });
}
