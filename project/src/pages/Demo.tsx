import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity, Bluetooth, Loader2, Footprints, Zap,
  BarChart3, ChevronLeft, Download,
  Share2, FileText, TrendingUp, AlertTriangle, User,
  ArrowRight, Calendar, ShieldAlert, CheckCircle2,
  ClipboardCheck, BrainCircuit, Microscope, Plus, X, ChevronDown, LogOut
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// --- IMPORTS (Assumed to exist in your project structure) ---
import SceneTest from "../components/SceneTest";
import PressureMap from "../components/HeatmapCanvas";
import AIAnalysis from "../components/AIAnalysis";
import { connectBLE } from "../hooks/useBLE";
import { analyzeWalk, GaitFrame, WalkReport } from "../hooks/gaitAnalysis";
import GaitCyclogram from "../components/GaitCyclogram";
import StanceSwingBar from "../components/StanceSwingBar";
import SwayTarget from "../components/SwayTarget";
import FootStrikeGauge from "../components/FootStrikeGauge";
import DataLogger from "../components/DataLogger";
import MedicalReport from '../components/MedicalReport';
import { useAuth } from "../contexts/AuthContext";
import { listPatients, addPatient } from "../lib/patients";
import { saveSession, listSessionsForDoctor, listSessionsForPatient } from "../lib/sessions";
import { computePatientStats } from "../lib/patientStats";
import { generateClinicalNarrative, classifyStepVariability, classifyBalance, classifyCadence, riskLevelToScore } from "../lib/clinicalEngine";
import { useTrainedGaitModel, type TrainedPrediction } from "../hooks/useTrainedGaitModel";
import type { PatientWithStats, GaitSession } from "../types/domain";

// --- UI HELPERS ---

function GlassCard({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`bg-[#111827]/90 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

// --- COMPONENT: RULE-BASED CLINICAL ANALYSIS (real, deterministic, see src/lib/clinicalEngine.ts) ---
const AdvancedAIAnalysis = ({ session }: { session: GaitSession | null }) => {
  const aiData = generateClinicalNarrative(session);

  if (!aiData || !session) {
    return (
      <GlassCard className="p-8 text-center text-gray-500 text-sm">
        No gait session recorded yet — start a live assessment to generate clinical insights.
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* DIGITAL BIOMARKERS GRID (from the most recent recorded session) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 bg-blue-900/10 border-blue-500/20 relative group">
            <div className="absolute top-2 right-2 text-blue-500 opacity-50"><Activity size={12}/></div>
            <div className="text-[10px] uppercase text-blue-400 font-bold mb-1">Gait Asymmetry</div>
            <div className="text-2xl font-bold text-white">{aiData.biomarkers.asymmetry}</div>
            <div className="text-xs text-red-400 mt-1">
               {session.asymmetry_index > 8 ? "⚠️ Abnormal" : "Within Limits"}
            </div>
        </GlassCard>

        <GlassCard className="p-4 bg-purple-900/10 border-purple-500/20">
            <div className="text-[10px] uppercase text-purple-400 font-bold mb-1">Step Variability (CV)</div>
            <div className="text-2xl font-bold text-white">{aiData.biomarkers.variability}</div>
            <div className="text-xs text-gray-400 mt-1">Stability Index</div>
        </GlassCard>

        <GlassCard className="p-4 bg-green-900/10 border-green-500/20">
            <div className="text-[10px] uppercase text-green-400 font-bold mb-1">Cadence</div>
            <div className="text-2xl font-bold text-white">{aiData.biomarkers.cadence}</div>
            <div className="text-xs text-green-400 mt-1">Latest Session</div>
        </GlassCard>

        <GlassCard className="p-4 bg-orange-900/10 border-orange-500/20">
            <div className="text-[10px] uppercase text-orange-400 font-bold mb-1">Heel Strike</div>
            <div className="text-lg font-bold text-white">{aiData.biomarkers.impact}</div>
            <div className="text-xs text-gray-400 mt-1">Heel/Toe Load Ratio</div>
        </GlassCard>
      </div>

      {/* CLINICAL NARRATIVE — rule-based decision support, not a trained model */}
      <GlassCard className="p-1 relative overflow-hidden bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border-blue-500/30">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <div className="p-6">
            <div className="flex items-start gap-5">
                <div className="bg-blue-600/20 p-3 rounded-xl text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-900/20">
                  <BrainCircuit size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-lg font-bold text-white">NurvoSync Clinical Engine</h3>
                     <span className="text-xs font-mono text-gray-500">{new Date(session.recorded_at).toLocaleDateString()} • Rule-Based</span>
                  </div>

                  {/* Diagnosis Badge */}
                  <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wide">
                     <Microscope size={12} /> {aiData.diagnosis}
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">{aiData.narrative}</p>

                  {/* Actionable Plan */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-black/40 p-3 rounded border border-white/5 flex gap-3 items-center">
                        <div className="p-2 rounded bg-orange-500/10 text-orange-400"><ShieldAlert size={16}/></div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase font-bold">Clinical Alert</div>
                            <div className="text-white text-xs font-medium">{aiData.alert}</div>
                        </div>
                     </div>
                     <div className="bg-black/40 p-3 rounded border border-white/5 flex gap-3 items-center">
                         <div className="p-2 rounded bg-blue-500/10 text-blue-400"><ClipboardCheck size={16}/></div>
                         <div>
                            <div className="text-[10px] text-gray-500 uppercase font-bold">Recommended Therapy</div>
                            <div className="text-white text-xs font-medium">{aiData.recommendation}</div>
                        </div>
                     </div>
                  </div>
                </div>
            </div>
          </div>
      </GlassCard>
    </div>
  );
};

// --- COMPONENT: 1. DOCTOR DASHBOARD (real patients + real session-derived stats) ---
const DoctorDashboard = ({ onSelectPatient }: { onSelectPatient: (p: PatientWithStats) => void }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState<PatientWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", condition: "" });
  const [adding, setAdding] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [rawPatients, sessions] = await Promise.all([
        listPatients(user.id),
        listSessionsForDoctor(user.id),
      ]);
      setPatients(computePatientStats(rawPatients, sessions));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [user]);

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPatient.name || !newPatient.age) return;
    setAdding(true);
    try {
      await addPatient(user.id, {
        name: newPatient.name,
        age: Number(newPatient.age),
        condition: newPatient.condition,
      });
      setNewPatient({ name: "", age: "", condition: "" });
      setShowAddPatient(false);
      await loadData();
    } finally {
      setAdding(false);
    }
  };

  const highRiskCount = patients.filter(p => p.status === 'High Risk').length;
  const decliningCount = patients.filter(p => p.trend === 'declining').length;
  const avgAdherence = patients.length > 0
    ? Math.round(patients.reduce((acc, p) => acc + p.adherence, 0) / patients.length)
    : 0;

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Doctor Dashboard</h1>
          <p className="text-gray-400">
            {user?.email}
            {highRiskCount > 0 ? ` — you have ${highRiskCount} patient${highRiskCount === 1 ? '' : 's'} requiring immediate attention.` : ' — all patients within normal risk parameters.'}
          </p>
        </div>
        <div className="flex gap-3 items-center">
           <button onClick={() => setShowAddPatient(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg text-sm text-white font-medium flex items-center gap-2"><Plus size={16}/> Add Patient</button>
           <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">{(user?.email?.[0] ?? 'D').toUpperCase()}</div>
           <button onClick={handleSignOut} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 transition rounded-lg text-sm text-gray-300 font-medium flex items-center gap-2"><LogOut size={16}/> Sign Out</button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 border-l-4 border-l-red-500 relative overflow-hidden group hover:border-l-8 transition-all duration-300">
          <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><ShieldAlert size={80}/></div>
          <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">High Fall Risk</div>
          <div className="text-4xl font-bold text-white">
              {highRiskCount} <span className="text-lg text-gray-500 font-normal">Patients</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-l-4 border-l-yellow-500 relative overflow-hidden group hover:border-l-8 transition-all duration-300">
           <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><TrendingUp size={80}/></div>
           <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Declining Stability</div>
          <div className="text-4xl font-bold text-white">
              {decliningCount} <span className="text-lg text-gray-500 font-normal">Patients</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-l-4 border-l-green-500 relative overflow-hidden group hover:border-l-8 transition-all duration-300">
           <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><CheckCircle2 size={80}/></div>
           <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Therapy Adherence</div>
          <div className="text-4xl font-bold text-white">
              {avgAdherence}% <span className="text-lg text-gray-500 font-normal">Avg</span>
          </div>
        </GlassCard>
      </div>

      {/* Patient List */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-6 text-blue-400 uppercase text-xs font-bold tracking-widest">
           <User size={14} /> Active Patient Roster
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-500">
            <Loader2 className="animate-spin mr-2" size={20}/> Loading patients...
          </div>
        ) : patients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
            <p className="text-gray-500">No patients yet — add your first patient to begin tracking gait sessions.</p>
            <button onClick={() => setShowAddPatient(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg text-sm text-white font-medium flex items-center gap-2"><Plus size={16}/> Add Patient</button>
          </div>
        ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-sm border-b border-gray-800">
              <th className="py-3 font-medium">Patient Name</th>
              <th className="py-3 font-medium">Condition</th>
              <th className="py-3 font-medium">Last Visit</th>
              <th className="py-3 font-medium">Risk Status</th>
              <th className="py-3 font-medium">Trend</th>
              <th className="py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} onClick={() => onSelectPatient(p)} className="border-b border-gray-800/50 hover:bg-white/5 cursor-pointer transition-colors group">
                <td className="py-4 text-white font-medium flex flex-col justify-center h-full">
                    {p.name}
                    <span className="text-gray-500 font-normal text-xs mt-1">{p.age} yrs • ID #{p.id.slice(0, 8)}</span>
                </td>
                <td className="py-4 text-gray-300">{p.condition || '—'}</td>
                <td className="py-4 text-gray-400">{p.lastVisit}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1
                    ${p.status === 'High Risk' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      p.status === 'Needs Review' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      p.status === 'No Sessions' ? 'bg-gray-600/20 text-gray-400 border border-gray-500/30' :
                      'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                    {p.status === 'High Risk' && <ShieldAlert size={10} />}
                    {p.status}
                  </span>
                </td>
                <td className="py-4">
                    {p.trend === 'declining' && <span className="flex items-center gap-1 text-red-400 text-sm font-medium"><TrendingUp className="rotate-180" size={16}/> Declining</span>}
                    {p.trend === 'improving' && <span className="flex items-center gap-1 text-green-400 text-sm font-medium"><TrendingUp size={16}/> Improving</span>}
                    {p.trend === 'stable' && <span className="flex items-center gap-1 text-gray-400 text-sm font-medium"><Activity size={16}/> Stable</span>}
                </td>
                <td className="py-4 text-right">
                  <ChevronLeft className="rotate-180 text-gray-600 group-hover:text-white transition-colors" size={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </GlassCard>

      {/* ADD PATIENT MODAL */}
      {showAddPatient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <GlassCard className="w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Add Patient</h3>
              <button onClick={() => setShowAddPatient(false)} className="text-gray-500 hover:text-white"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Name</label>
                <input required value={newPatient.name} onChange={e => setNewPatient(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Age</label>
                <input required type="number" min={1} max={129} value={newPatient.age} onChange={e => setNewPatient(p => ({ ...p, age: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Condition</label>
                <input value={newPatient.condition} onChange={e => setNewPatient(p => ({ ...p, condition: e.target.value }))}
                  placeholder="e.g. ACL Reconstruction (Post-Op)"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <button type="submit" disabled={adding}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg py-2.5 font-medium text-sm flex items-center justify-center gap-2">
                {adding && <Loader2 className="animate-spin" size={16}/>} Add Patient
              </button>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

// Mapping fall-risk badge -> a display score. A documented policy choice
// (not a validated clinical scale) so the sidebar has something to show
// beyond the categorical status.
function fallRiskScore(status: PatientWithStats['status']): number {
  switch (status) {
    case 'High Risk': return 85;
    case 'Needs Review': return 50;
    case 'Stable': return 15;
    default: return 0;
  }
}

const TONE_COLOR: Record<string, string> = {
  critical: 'text-red-400',
  warning: 'text-yellow-400',
  normal: 'text-green-400',
};

// --- COMPONENT: 2. PATIENT DETAIL + REAL SESSION HISTORY ---
const PatientDetail = ({ patient, onBack, onStartLive }: { patient: PatientWithStats, onBack: () => void, onStartLive: () => void }) => {
  const [sessions, setSessions] = useState<GaitSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoadingSessions(true);
    listSessionsForPatient(patient.id).then((data) => {
      if (!cancelled) {
        setSessions(data);
        setLoadingSessions(false);
      }
    });
    return () => { cancelled = true; };
  }, [patient.id]);

  const latest = patient.latestSession;
  const previous = sessions.length > 1 ? sessions[sessions.length - 2] : null;
  const symmetryDelta = latest && previous ? Number((latest.symmetry - previous.symmetry).toFixed(1)) : null;

  const stepVariability = latest ? classifyStepVariability(latest.step_variability) : null;
  const balance = latest ? classifyBalance(latest.balance_score) : null;
  const cadenceClass = latest ? classifyCadence(latest.cadence) : null;
  const riskScore = fallRiskScore(patient.status);

  const chartData = sessions.map((s) => ({
    date: new Date(s.recorded_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    symmetry: s.symmetry,
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
       {/* Nav */}
       <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-2 transition-colors">
          <ChevronLeft size={20} /> Back to Dashboard
       </button>

       {/* Header Card */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              {patient.name}
              <span className={`text-sm px-3 py-1 rounded-full border ${patient.status === 'High Risk' ? 'border-red-500 text-red-400' : patient.status === 'No Sessions' ? 'border-gray-600 text-gray-500' : 'border-gray-500 text-gray-400'}`}>
                {patient.status}
              </span>
            </h1>
            <p className="text-gray-400 mt-1">{patient.condition || 'No condition on file'} • {patient.age} years old • ID: #{patient.id.slice(0, 8)}</p>
         </div>
         <button
            onClick={onStartLive}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
         >
            <Activity size={18} /> Start Live Assessment
         </button>
       </div>

       {/* MAIN CONTENT GRID */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

         {/* CHART: GAIT SYMMETRY TREND (real recorded sessions) */}
         <GlassCard className="col-span-2 p-6">
             <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
                   <TrendingUp size={14} /> Gait Symmetry Trend (All Recorded Sessions)
                </div>
                {symmetryDelta !== null && (
                  <div className={`${symmetryDelta < 0 ? 'text-red-400 bg-red-900/20 border-red-500/20' : 'text-green-400 bg-green-900/20 border-green-500/20'} font-bold text-sm px-3 py-1 rounded-lg border`}>
                     {symmetryDelta > 0 ? '+' : ''}{symmetryDelta}% vs. previous session
                  </div>
                )}
             </div>

             {loadingSessions ? (
               <div className="h-64 flex items-center justify-center text-gray-500">
                 <Loader2 className="animate-spin mr-2" size={18}/> Loading sessions...
               </div>
             ) : sessions.length === 0 ? (
               <div className="h-64 flex flex-col items-center justify-center text-center gap-2 text-gray-500">
                 <p>No gait sessions recorded yet for this patient.</p>
                 <p className="text-xs">Start a Live Assessment to record the first session.</p>
               </div>
             ) : (
               <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={chartData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                     <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                     <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
                     <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8, color: '#fff' }} />
                     <Line type="monotone" dataKey="symmetry" stroke={symmetryDelta !== null && symmetryDelta < 0 ? '#ef4444' : '#22c55e'} strokeWidth={3} dot={{ r: 3 }} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
             )}
             <p className="text-xs text-gray-500 mt-4">
                {sessions.length === 0
                  ? "Symmetry trend will appear here once sessions are recorded."
                  : `${sessions.length} session${sessions.length === 1 ? '' : 's'} recorded.`}
             </p>
         </GlassCard>

         {/* SIDEBAR: RISK FACTORS (real, from latest session) */}
         <GlassCard className="col-span-1 p-6 space-y-6">
             <div>
                <div className="text-gray-400 text-xs uppercase font-bold mb-2">Fall Risk Score</div>
                <div className="text-5xl font-bold text-white mb-2">{riskScore}%</div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                   <div
                     className={`h-full rounded-full ${riskScore >= 70 ? 'bg-gradient-to-r from-orange-500 to-red-600' : riskScore >= 35 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-green-600'}`}
                     style={{ width: `${riskScore}%` }}
                   />
                </div>
             </div>

             <div className="space-y-3 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between text-sm">
                   <span className="text-gray-400">Step Variability</span>
                   <span className={`font-bold ${stepVariability ? TONE_COLOR[stepVariability.tone] : 'text-gray-600'}`}>{stepVariability?.label ?? 'No Data'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                   <span className="text-gray-400">Balance Score</span>
                   <span className={`font-bold ${balance ? TONE_COLOR[balance.tone] : 'text-gray-600'}`}>{balance?.label ?? 'No Data'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                   <span className="text-gray-400">Cadence</span>
                   <span className={`font-bold ${cadenceClass ? TONE_COLOR[cadenceClass.tone] : 'text-gray-600'}`}>{cadenceClass?.label ?? 'No Data'}</span>
                </div>
             </div>
         </GlassCard>

         {/* RULE-BASED CLINICAL ANALYSIS */}
         <div className="col-span-1 md:col-span-3">
             <AdvancedAIAnalysis session={patient.latestSession} />
         </div>

       </div>
    </div>
  );
};

// --- MAIN APP (Handles Routing & Live Logic) ---

export default function App() {
  const { user } = useAuth();

  // STATE: Navigation
  const [view, setView] = useState<'dashboard' | 'patient' | 'live'>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<PatientWithStats | null>(null);

  // STATE: Live Demo Logic
  const [leftConnected, setLeftConnected] = useState(false);
  const [rightConnected, setRightConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [leftImu, setLeftImu] = useState({ ax: 0, ay: 0, az: 1, steps: 0, cad: 0 });
  const [leftPressure, setLeftPressure] = useState<number[]>([0, 0, 0, 0, 0]);
  const [rightImu, setRightImu] = useState({ ax: 0, ay: 0, az: 1, steps: 0, cad: 0 });
  const [rightPressure, setRightPressure] = useState<number[]>([0, 0, 0, 0, 0]);
  const [leftPath, setLeftPath] = useState<{x:number, y:number}[]>([]);
  const [rightPath, setRightPath] = useState<{x:number, y:number}[]>([]);
  const [leftForceTotal, setLeftForceTotal] = useState(0);
  const [rightForceTotal, setRightForceTotal] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [reportData, setReportData] = useState<WalkReport | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [showRawData, setShowRawData] = useState(false);
  const [liveRisk, setLiveRisk] = useState<{ level: WalkReport["riskLevel"]; score: number } | null>(null);
  const [liveMetrics, setLiveMetrics] = useState<{ gaitSpeed: number; doubleSupportPercent: number; cadence: number; symmetry: number } | null>(null);
  const [signalRate, setSignalRate] = useState({ left: 0, right: 0 });
  const recordedFrames = useRef<GaitFrame[]>([]);
  const lastUpdate = useRef({ left: 0, right: 0 });
  const recordingStartTime = useRef(0);
  const packetCounts = useRef({ left: 0, right: 0 });
  const trainedModel = useTrainedGaitModel();
  const [trainedPrediction, setTrainedPrediction] = useState<TrainedPrediction | null>(null);
  const SENSOR_POS = [{ x: 100, y: 60 }, { x: 65, y: 110 }, { x: 135, y: 110 }, { x: 110, y: 190 }, { x: 100, y: 255 }];

  // --- LIVE DEMO CALCULATIONS ---
  const calculateOrientation = (ax: number, ay: number, az: number) => {
    const pitch = Math.atan2(ax, Math.sqrt(ay * ay + az * az)) * 2.5;
    const roll = Math.atan2(ay, Math.sqrt(ax * ax + az * az)) * 2.5;
    return { pitch, roll };
  };
  const leftOrient = calculateOrientation(leftImu.ax, leftImu.ay, leftImu.az);
  const rightOrient = calculateOrientation(rightImu.ax, rightImu.ay, rightImu.az);

  useEffect(() => {
    const getCoP = (pressures: number[]) => {
        let totalP = 0, wx = 0, wy = 0;
        pressures.forEach((p, i) => {
              if(p > 0.05) { totalP += p; wx += p * SENSOR_POS[i].x; wy += p * SENSOR_POS[i].y; }
        });
        return totalP > 0.1 ? { x: wx/totalP, y: wy/totalP, force: totalP } : null;
    };
    const l = getCoP(leftPressure);
    if (l) { setLeftPath(p => [...p, l]); setLeftForceTotal(l.force); } else { if(leftPath.length) setLeftPath([]); setLeftForceTotal(0); }
    const r = getCoP(rightPressure);
    if (r) { setRightPath(p => [...p, r]); setRightForceTotal(r.force); } else { if(rightPath.length) setRightPath([]); setRightForceTotal(0); }
  }, [leftPressure, rightPressure]);

  // Real signal-rate readout (actual BLE packets/sec per insole, not a
  // decorative "Active" label) -- useful anytime a device is connected,
  // not just during a recording.
  useEffect(() => {
    if (!leftConnected && !rightConnected) return;
    const interval = setInterval(() => {
      setSignalRate({ left: packetCounts.current.left, right: packetCounts.current.right });
      packetCounts.current = { left: 0, right: 0 };
    }, 1000);
    return () => clearInterval(interval);
  }, [leftConnected, rightConnected]);

  // Recording Logic
  const startWalkTest = () => {
    if (!leftConnected || !rightConnected) { alert("Please connect BOTH insoles."); return; }
    recordedFrames.current = []; recordingStartTime.current = Date.now();
    setTimeLeft(60); setIsRecording(true); setSaveStatus("idle"); setLiveRisk(null); setLiveMetrics(null);
  };
  useEffect(() => {
    if (isRecording) recordedFrames.current.push({ timestamp: Date.now(), leftFSR: [...leftPressure], rightFSR: [...rightPressure] });
  }, [leftPressure, rightPressure, isRecording]);

  // Feeds the real trained model (if one has been trained) with each new
  // sensor frame. No-ops harmlessly if no model was loaded.
  useEffect(() => {
    const prediction = trainedModel.pushFrame({ leftFsr: leftPressure, rightFsr: rightPressure, leftImu, rightImu });
    if (prediction) setTrainedPrediction(prediction);
  }, [leftPressure, rightPressure, leftImu, rightImu]);
  useEffect(() => {
    let interval: any;
    if (isRecording && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(p => p - 1);
        // Live risk preview: same rule-based engine as the post-session
        // report, just re-run on the frames collected so far. Needs a
        // minimum sample before the estimate is meaningful.
        if (recordedFrames.current.length >= 20) {
          const liveAnalysis = analyzeWalk(recordedFrames.current);
          setLiveRisk({ level: liveAnalysis.riskLevel, score: riskLevelToScore(liveAnalysis.riskLevel) });

          // Live gait speed: reuses the same stride-length approximation as
          // analyzeWalk's post-session strideLength, driven by real elapsed
          // time + real step counts (not analyzeWalk's own `cadence` field,
          // which assumes a completed 60s window).
          const elapsedSeconds = Math.max(1, (Date.now() - recordingStartTime.current) / 1000);
          const totalSteps = leftImu.steps + rightImu.steps;
          const liveCadence = (totalSteps / elapsedSeconds) * 60;
          const liveStrideLength = Math.max(0, 0.7 + (liveCadence - 90) * 0.002);
          const gaitSpeed = liveStrideLength * (liveCadence / 2) / 60; // m/s

          // Double support: % of recorded frames where both feet carry load
          // simultaneously -- a standard fall-risk/Parkinson's gait marker.
          let doubleSupportFrames = 0;
          recordedFrames.current.forEach((f) => {
            const l = f.leftFSR.reduce((a, b) => a + b, 0);
            const r = f.rightFSR.reduce((a, b) => a + b, 0);
            if (l > 0.1 && r > 0.1) doubleSupportFrames++;
          });
          const doubleSupportPercent = (doubleSupportFrames / recordedFrames.current.length) * 100;

          setLiveMetrics({
            cadence: Math.round(liveCadence),
            gaitSpeed: Number(gaitSpeed.toFixed(2)),
            doubleSupportPercent: Math.round(doubleSupportPercent),
            symmetry: liveAnalysis.symmetry,
          });
        }
      }, 1000);
    }
    else if (isRecording && timeLeft === 0) {
        setIsRecording(false);
        setLiveRisk(null);
        setLiveMetrics(null);
        const analysis = analyzeWalk(recordedFrames.current);
        setReportData(analysis);
        if (user && selectedPatient) {
          setSaveStatus("saving");
          saveSession(user.id, selectedPatient.id, analysis)
            .then(() => setSaveStatus("saved"))
            .catch((err) => { console.error("Failed to save session", err); setSaveStatus("error"); });
        }
    }
    return () => clearInterval(interval);
  }, [isRecording, timeLeft]);

  // Connection
  const handleConnect = async (side: "left" | "right") => {
      if (isConnecting) return;
      setIsConnecting(true);
      const deviceName = side === "left" ? "NurvoSync-Left" : "NurvoSync-Right";
      try {
        await connectBLE(deviceName, (data) => {

  const now = Date.now();

  if (side === "left") {

      packetCounts.current.left++;

      if (now - lastUpdate.current.left > 40) {

          lastUpdate.current.left = now;

          if (data.ax !== undefined) {
              setLeftImu(p => ({ ...p, ...data }));
          }

          if (data.fsr) {
              setLeftPressure(data.fsr);
          }

      }

      setLeftConnected(true);

  } else {

      packetCounts.current.right++;

      if (now - lastUpdate.current.right > 40) {

          lastUpdate.current.right = now;

          if (data.ax !== undefined) {
              setRightImu(p => ({ ...p, ...data }));
          }

          if (data.fsr) {
              setRightPressure(data.fsr);
          }

      }

      setRightConnected(true);

  }

});
      } catch(e: any) { alert(`Connection Failed: ${e.message}`); } 
      finally { setIsConnecting(false); }
  };

  // --- RENDER ROUTER ---
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans pb-20">
      
      {/* GLOBAL NAVBAR */}
      <nav className="border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">N</div>
                <span className="font-bold text-lg">SoleSync <span className="text-blue-500 font-light">Clinical</span></span>
            </div>
            
            {/* If in Live Mode, show connection controls */}
            {view === 'live' && (
              <div className="flex gap-3">
                 <button onClick={() => setView('patient')} className="mr-4 text-sm text-gray-400 hover:text-white">Exit Session</button>
                  {[{side: 'left', active: leftConnected, hz: signalRate.left}, {side: 'right', active: rightConnected, hz: signalRate.right}].map((dev: any) => (
                      <button key={dev.side} onClick={() => handleConnect(dev.side)} disabled={dev.active || isConnecting}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-2 ${dev.active ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' : 'border-white/10 hover:bg-white/5 text-gray-400'}`}>
                          {isConnecting && !dev.active ? <Loader2 className="animate-spin" size={14}/> : dev.active ? <Activity size={14}/> : <Bluetooth size={14}/>}
                          {dev.side} {dev.active ? `${dev.hz}Hz` : 'Connect'}
                      </button>
                  ))}
              </div>
            )}
        </div>
      </nav>

      {/* --- VIEWS --- */}

      {/* VIEW 1: DASHBOARD */}
      {view === 'dashboard' && (
        <DoctorDashboard onSelectPatient={(p) => { setSelectedPatient(p); setView('patient'); }} />
      )}

      {/* VIEW 2: PATIENT DETAIL */}
      {view === 'patient' && selectedPatient && (
        <PatientDetail 
          patient={selectedPatient} 
          onBack={() => setView('dashboard')} 
          onStartLive={() => setView('live')} 
        />
      )}

      {/* VIEW 3: LIVE TECH DEMO */}
      {view === 'live' && (
        <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-6 animate-in fade-in duration-500">

           {/* SESSION HEADER */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0d1220] to-[#111827] border border-white/10 rounded-2xl px-6 py-5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isRecording ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                  <Activity size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white leading-tight">Live Gait Assessment</h2>
                  <p className="text-gray-500 text-sm">
                    <span className="text-white font-medium">{selectedPatient?.name}</span>
                    <span className="mx-1.5">•</span>
                    ID #{selectedPatient?.id.slice(0, 8)}
                  </p>
                </div>
              </div>
              {isRecording && (
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wide w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" /> Recording — {timeLeft}s remaining
                  </div>
                  {liveRisk ? (
                    <div className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wide w-fit ${
                      liveRisk.level === 'High' ? 'bg-red-500/10 border-red-500/40 text-red-400' :
                      liveRisk.level === 'Moderate' ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400' :
                      'bg-green-500/10 border-green-500/40 text-green-400'
                    }`}>
                      Live Fall Risk: {liveRisk.score}% ({liveRisk.level})
                    </div>
                  ) : (
                    <div className="px-4 py-2 rounded-full border border-white/10 text-gray-500 text-xs font-bold uppercase tracking-wide w-fit">
                      Live Fall Risk: Calculating...
                    </div>
                  )}
                </div>
              )}
           </div>

           {reportData && (
             <MedicalReport
               report={reportData}
               saveStatus={saveStatus}
               onClose={() => { setReportData(null); setSaveStatus("idle"); }}
             />
           )}

           {/* LIVE SESSION METRICS — real, computed continuously from the frames recorded so far */}
           {isRecording && (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <GlassCard className="p-4">
                  <div className="text-[10px] uppercase text-cyan-400 font-bold mb-1">Gait Speed</div>
                  <div className="text-2xl font-bold text-white">{liveMetrics ? liveMetrics.gaitSpeed.toFixed(2) : '--'}<span className="text-xs text-gray-500 font-normal ml-1">m/s</span></div>
                  <div className="text-[10px] text-gray-500 mt-1">Clinical "6th vital sign"</div>
                </GlassCard>
                <GlassCard className="p-4">
                  <div className="text-[10px] uppercase text-purple-400 font-bold mb-1">Double Support</div>
                  <div className="text-2xl font-bold text-white">{liveMetrics ? liveMetrics.doubleSupportPercent : '--'}<span className="text-xs text-gray-500 font-normal ml-1">%</span></div>
                  <div className="text-[10px] text-gray-500 mt-1">Both feet loaded</div>
                </GlassCard>
                <GlassCard className="p-4">
                  <div className="text-[10px] uppercase text-green-400 font-bold mb-1">Cadence</div>
                  <div className="text-2xl font-bold text-white">{liveMetrics ? liveMetrics.cadence : '--'}<span className="text-xs text-gray-500 font-normal ml-1">spm</span></div>
                  <div className="text-[10px] text-gray-500 mt-1">Steps per minute</div>
                </GlassCard>
                <GlassCard className="p-4">
                  <div className="text-[10px] uppercase text-yellow-400 font-bold mb-1">Symmetry</div>
                  <div className="text-2xl font-bold text-white">{liveMetrics ? liveMetrics.symmetry.toFixed(0) : '--'}<span className="text-xs text-gray-500 font-normal ml-1">%</span></div>
                  <div className="text-[10px] text-gray-500 mt-1">L/R load balance</div>
                </GlassCard>
             </div>
           )}

           {/* HERO ROW: the two signals that matter most, front and center */}
           <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <GlassCard className="lg:col-span-2 p-6 flex flex-col items-center justify-center relative min-h-[320px] bg-gradient-to-b from-cyan-950/20 to-transparent">
                    <div className="flex items-center gap-2 mb-4 text-cyan-400 self-start"><Activity size={16}/><span className="text-xs font-bold uppercase tracking-widest">Gait Symmetry</span></div>
                    <div className="flex-1 w-full flex items-center justify-center"><GaitCyclogram leftForce={leftForceTotal} rightForce={rightForceTotal} /></div>
                </GlassCard>
                <GlassCard className="lg:col-span-3 p-6 bg-gradient-to-br from-[#111827] to-[#1e1b4b] min-h-[320px]">
                    <AIAnalysis leftPressure={leftPressure} rightPressure={rightPressure} leftRoll={leftOrient.roll} rightRoll={rightOrient.roll} leftAz={leftImu.az} rightAz={rightImu.az} trainedPrediction={trainedPrediction} />
                </GlassCard>
            </div>

            {/* SECOND ROW: balance + unified body map */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <GlassCard className="lg:col-span-1 p-6 flex flex-col items-center justify-center relative min-h-[280px]">
                    <div className="flex items-center gap-2 mb-4 text-yellow-400 self-start"><Activity size={16}/><span className="text-xs font-bold uppercase tracking-widest">Balance (CoP)</span></div>
                    <div className="flex-1 w-full flex items-center justify-center"><SwayTarget x={((leftPath[leftPath.length-1]?.x||50)+(rightPath[rightPath.length-1]?.x||50))/2} y={((leftPath[leftPath.length-1]?.y||50)+(rightPath[rightPath.length-1]?.y||50))/2} /></div>
                </GlassCard>

                <GlassCard className="lg:col-span-3 p-0 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center gap-2">
                        <Footprints size={16} className="text-gray-400"/>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Extremity Comparison</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
                        {/* LEFT */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"/><span className="font-bold text-gray-100">Left</span></div>
                                <span className="text-xs text-gray-500 uppercase font-bold">Steps <span className="text-white font-mono text-sm">{leftImu.steps}</span></span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-40 bg-black/40 rounded-xl overflow-hidden border border-white/5 relative"><SceneTest pitch={leftOrient.pitch} roll={leftOrient.roll} side="left" /></div>
                                <div className="h-40 bg-black/40 rounded-xl p-2 border border-white/5 flex items-center justify-center relative"><PressureMap pressure={leftPressure} side="left" sensorPos={SENSOR_POS} copPath={leftPath} /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FootStrikeGauge roll={leftOrient.roll} side="left" />
                                <StanceSwingBar side="left" isStance={leftForceTotal > 0.1} />
                            </div>
                        </div>
                        {/* RIGHT */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"/><span className="font-bold text-gray-100">Right</span></div>
                                <span className="text-xs text-gray-500 uppercase font-bold">Steps <span className="text-white font-mono text-sm">{rightImu.steps}</span></span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-40 bg-black/40 rounded-xl p-2 border border-white/5 flex items-center justify-center relative"><PressureMap pressure={rightPressure} side="right" sensorPos={SENSOR_POS} copPath={rightPath} /></div>
                                <div className="h-40 bg-black/40 rounded-xl overflow-hidden border border-white/5 relative"><SceneTest pitch={rightOrient.pitch} roll={rightOrient.roll} side="right" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <StanceSwingBar side="right" isStance={rightForceTotal > 0.1} />
                                <FootStrikeGauge roll={rightOrient.roll} side="right" />
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* ADVANCED: RAW SENSOR LOG (collapsed by default, out of the primary sightline) */}
            <GlassCard className="p-0 overflow-hidden">
                <button onClick={() => setShowRawData(v => !v)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-2 text-gray-400"><FileText size={14}/><span className="text-xs font-bold uppercase tracking-widest">Advanced: Raw Sensor Log</span></div>
                    <ChevronDown className={`text-gray-500 transition-transform ${showRawData ? 'rotate-180' : ''}`} size={16} />
                </button>
                {showRawData && (
                    <div className="px-6 pb-6">
                        <DataLogger
                            leftPressure={leftPressure}
                            rightPressure={rightPressure}
                            leftImu={leftImu}
                            rightImu={rightImu}
                        />
                    </div>
                )}
            </GlassCard>

            {/* RECORDING BUTTON */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
                {!isRecording ? (
                  <button onClick={startWalkTest} disabled={!leftConnected || !rightConnected}
                    className={`group px-8 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-3 overflow-hidden transition-all ${(!leftConnected || !rightConnected) ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50' : 'bg-white text-black hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]'}`}>
                    {(!leftConnected || !rightConnected) && <AlertTriangle size={16} />}
                    <span className="relative z-10">{(!leftConnected || !rightConnected) ? "Connect Devices First" : "Start Clinical Assessment"}</span>
                  </button>
                ) : (
                  <div className="bg-red-900/90 backdrop-blur border border-red-500/30 px-8 py-3 rounded-full flex items-center gap-4 shadow-[0_0_50px_rgba(220,38,38,0.5)]">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                      <span className="font-mono font-bold text-white text-xl">{timeLeft}s</span>
                      <span className="text-xs text-red-200 uppercase tracking-widest">Recording Gait...</span>
                  </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}