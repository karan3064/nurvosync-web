import { Activity, BrainCircuit, Scale, Zap, Cpu } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { classifyLiveFrame } from "../lib/clinicalEngine";
import type { TrainedPrediction } from "../hooks/useTrainedGaitModel";

type Props = {
  leftPressure?: number[];
  rightPressure?: number[];
  leftRoll?: number;
  rightRoll?: number;
  leftAz?: number;
  rightAz?: number;
  // Only set once a real model has been trained via `npm run train-model`
  // and successfully loaded -- absent otherwise, in which case this panel
  // shows only the rule-based engine below, same as before.
  trainedPrediction?: TrainedPrediction | null;
};

type Log = {
  id: number;
  time: string;
  message: string;
  type: "info" | "warning" | "success" | "danger";
};

export default function AIAnalysis({
  leftPressure = [],
  rightPressure = [],
  leftRoll = 0,
  rightRoll = 0,
  leftAz = 1,
  rightAz = 1,
  trainedPrediction = null,
}: Props) {
  // --- CORE CALCULATIONS ---
  const leftSum = leftPressure.reduce((a, b) => a + b, 0);
  const rightSum = rightPressure.reduce((a, b) => a + b, 0);
  const totalLoad = leftSum + rightSum;
  const isActive = totalLoad > 0.5;

  const leftPercent = isActive ? (leftSum / totalLoad) * 100 : 50;
  const leftImpact = Math.abs(leftAz - 1);
  const rightImpact = Math.abs(rightAz - 1);
  const currentMaxImpact = Math.max(leftImpact, rightImpact);

  // Real-time rule-based classification (see src/lib/clinicalEngine.ts) --
  // deterministic heuristics over the current frame, not a trained model.
  const liveSignal = classifyLiveFrame({
    leftSum,
    rightSum,
    leftImpactG: leftImpact,
    rightImpactG: rightImpact,
  });

  // --- HISTORY & LOGS ---
  const [impactHistory, setImpactHistory] = useState<number[]>(new Array(30).fill(0));
  const [logs, setLogs] = useState<Log[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastLogTime = useRef(0);
  const lastLabel = useRef("");

  const addLog = (msg: string, type: Log["type"]) => {
    const now = Date.now();
    if (now - lastLogTime.current < 800) return;
    lastLogTime.current = now;
    const timeStr = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLogs((prev) => [...prev, { id: now, time: timeStr, message: msg, type }].slice(-6));
  };

  // THE THINKING ENGINE — real-time rule-based monitoring
  useEffect(() => {
    if (!isActive) return;

    // Update Sparkline
    setImpactHistory((prev) => [...prev.slice(1), currentMaxImpact]);

    // Log signal changes
    if (liveSignal.label !== lastLabel.current) {
      const type = liveSignal.severity === "danger" ? "danger" : liveSignal.severity === "warning" ? "warning" : "success";
      addLog(`${liveSignal.label.toUpperCase()}: ${liveSignal.message}`, type);
      lastLabel.current = liveSignal.label;
    }
  }, [leftPercent, currentMaxImpact, isActive, liveSignal.label]);

  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  // Dynamic UI Styles
  const isEmergency = liveSignal.severity === "danger";
  const containerBorder = isEmergency
    ? "border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.4)] bg-red-950/10"
    : "border-white/10";

  return (
    <div className={`space-y-6 font-sans text-white transition-all duration-300 ${isActive ? "" : "opacity-60 grayscale"}`}>

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <BrainCircuit className={`w-5 h-5 ${isEmergency ? "text-red-500 animate-bounce" : "text-purple-400 animate-pulse"}`} />
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase">
                NURVOSYNC <span className="text-purple-400">RULE ENGINE</span>
                {isActive && <span className="ml-2 text-gray-500 font-normal">[{liveSignal.label}]</span>}
            </h3>
            <div className="text-[9px] text-gray-500 font-mono tracking-tighter">
                REAL-TIME GAIT MONITORING (RULE-BASED)
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded border border-white/5">
            <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500 animate-ping" : "bg-gray-600"}`} />
            <span className="text-[10px] text-gray-400 font-bold uppercase">{isActive ? "MONITORING" : "IDLE"}</span>
        </div>
      </div>

      {/* TRAINED MODEL BADGE -- only appears once a real model has been
          trained (npm run train-model) and loaded. Distinct from the
          rule engine above: this is an actual learned classifier. */}
      {trainedPrediction && (
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
          <Cpu size={14} className="text-emerald-400" />
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wide">Trained Model</span>
          <span className="text-xs text-white font-medium ml-auto">{trainedPrediction.label}</span>
          <span className="text-[10px] text-gray-400 font-mono">{trainedPrediction.confidence}%</span>
        </div>
      )}

      {/* 1. THE BRAIN (LOGS) */}
      <div className={`bg-black/40 rounded-lg border ${containerBorder} p-3 h-32 overflow-hidden flex flex-col relative backdrop-blur-md transition-all duration-500`}>
         <div className="absolute inset-0 bg-scanline pointer-events-none opacity-20"></div>
         <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 custom-scrollbar z-0 py-2">
            {logs.length === 0 && <div className="text-gray-700 font-mono text-[10px] text-center mt-10">Waiting for sensor stream...</div>}
            {logs.map(log => (
                <div key={log.id} className="text-[10px] font-mono flex gap-2 items-center animate-in slide-in-from-left-2 fade-in duration-300">
                    <span className="text-gray-600 opacity-50">[{log.time}]</span>
                    <span className={`${
                        log.type === 'danger' ? 'text-red-400 font-bold drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]' :
                        log.type === 'warning' ? 'text-yellow-400' :
                        log.type === 'success' ? 'text-emerald-400' : 'text-blue-400'
                    }`}>
                        {log.type === 'danger' && '⚠️ '}
                        {log.message}
                    </span>
                </div>
            ))}
         </div>
      </div>

      {/* 2. LIVE IMPACT GRAPH */}
      <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative overflow-hidden group">
          <div className="flex justify-between items-end mb-2 relative z-10">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-cyan-400" />
                <span className="text-xs text-gray-300 font-bold uppercase tracking-wider">Shock Absorption</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white leading-none">{currentMaxImpact.toFixed(1)}<span className="text-xs text-gray-500 font-normal ml-1">g</span></div>
              </div>
          </div>

          <div className="h-12 flex items-end gap-0.5 border-b border-white/10 relative z-10">
              {impactHistory.map((val, i) => {
                  const heightPct = Math.min(val * 50, 100);
                  const barColor = val > 1.3 ? "bg-red-500" : val > 0.7 ? "bg-yellow-400" : "bg-cyan-500/50";
                  return (
                    <div
                        key={i}
                        className={`w-full rounded-t-sm transition-all duration-100 ${barColor}`}
                        style={{ height: `${heightPct}%`, opacity: (i + 5) / 35 }}
                    />
                  )
              })}
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
      </div>

      {/* 3. SYMMETRY & KINEMATICS GRID */}
      <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-center relative overflow-hidden">
              <div className="text-xs text-gray-400 mb-3 font-bold uppercase tracking-wider flex items-center gap-1 z-10">
                <Scale size={12} /> Load Dist
              </div>
              <div className="flex justify-center mb-2 z-10">
                <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden relative">
                     <div
                        className="absolute h-full w-1/2 bg-indigo-500 transition-all duration-300 ease-out"
                        style={{ left: `${leftPercent}%`, transform: 'translateX(-50%)' }}
                     />
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-gray-400 z-10">
                  <span className={leftPercent > 55 ? "text-white font-bold" : ""}>{leftPercent.toFixed(0)}% L</span>
                  <span className={leftPercent < 45 ? "text-white font-bold" : ""}>{(100 - leftPercent).toFixed(0)}% R</span>
              </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-center">
              <div className="text-xs text-gray-400 mb-3 font-bold uppercase tracking-wider flex items-center gap-1">
                <Zap size={12} /> Stability
              </div>
              <div className="space-y-2">
                  <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500">L</span>
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-300 ${Math.abs(leftRoll) > 0.3 ? "bg-red-500 w-full" : "bg-green-500 w-1/3"}`} />
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-500">R</span>
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-300 ${Math.abs(rightRoll) > 0.3 ? "bg-red-500 w-full" : "bg-green-500 w-1/3"}`} />
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
