import { useState, useEffect } from "react";
import SceneTest from "../components/SceneTest";
import PressureMap from "../components/PressureMap";

import { connectBLE } from "../hooks/useBLE";
import {
  Activity,
  Footprints,
  Clock,
  Gauge,
  TrendingUp,
  BarChart3,
  Zap,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
const [fsrLayout, setFsrLayout] = useState(null);

useEffect(() => {
  const saved = localStorage.getItem("fsr-layout");
  if (saved) {
    setFsrLayout(JSON.parse(saved));
  }
}, []);

export default function Demo() {
  /* ---------------- STATIC ANALYTICS (TEMP) ---------------- */
  const comfortScore = 80;
  const balance = 50;
  const usageTime = 0;
const [leftPressure, setLeftPressure] = useState([0.2, 0.4, 0.6, 0.3, 0.7]);
const [rightPressure, setRightPressure] = useState([0.3, 0.5, 0.2, 0.6, 0.4]);

  /* ---------------- LEFT & RIGHT DATA ---------------- */
  const [leftConnected, setLeftConnected] = useState(false);
  const [rightConnected, setRightConnected] = useState(false);
  const connected = leftConnected || rightConnected;


  const [leftData, setLeftData] = useState({
    ax: 0,
    ay: 0,
    az: 1,
    steps: 0,
    pressure: [0.1, 0.2, 0.4, 0.3],
  });

  const [rightData, setRightData] = useState({
    ax: 0,
    ay: 0,
    az: 1,
    steps: 0,
    pressure: [0.2, 0.1, 0.3, 0.5],
  });
 
useEffect(() => {
  const interval = setInterval(() => {
    setLeftPressure(prev =>
      prev.map(() => Math.random())
    );
    setRightPressure(prev =>
      prev.map(() => Math.random())
    );
  }, 800);

  return () => clearInterval(interval);
}, []);


  /* ---------------- BLE CONNECT ---------------- */
  const handleLeftConnect = async () => {
    await connectBLE("NurvoSync-Left", (data) => {
      setLeftData((prev) => ({ ...prev, ...data }));
      setLeftConnected(true);
    });
  };

  const handleRightConnect = async () => {
    await connectBLE("NurvoSync-Right", (data) => {
      setRightData((prev) => ({ ...prev, ...data }));
      setRightConnected(true);
    });
  };

  /* ---------------- DERIVED VALUES ---------------- */
  const steps =
    (leftData.steps ?? 0) + (rightData.steps ?? 0);

  const pitch =
    Math.atan2(
      leftData.ax,
      Math.sqrt(leftData.ay ** 2 + leftData.az ** 2)
    ) * 2.5;

  const roll =
    Math.atan2(
      leftData.ay,
      Math.sqrt(leftData.ax ** 2 + leftData.az ** 2)
    ) * 2.5;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Live Dashboard</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Footwear Intelligence
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {' '}
              Dashboard
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Real-time insights into comfort, balance, and footwear usage
          </p>

          {!connected ? (
            <div className="flex gap-4 justify-center">
  <button
    onClick={handleLeftConnect}
    className="px-6 py-3 bg-blue-600 rounded-xl"
  >
    Connect Left Insole
  </button>

  <button
    onClick={handleRightConnect}
    className="px-6 py-3 bg-purple-600 rounded-xl"
  >
    Connect Right Insole
  </button>
</div>

          ) : (
            <div className="flex items-center justify-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-medium">Connected</span>
            </div>
          )}
        </div>

        {connected && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-4 gap-6">
              <GlassCard className="p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center group-hover:animate-glow-pulse">
                    <Gauge className="w-5 h-5 text-green-400" />
                  </div>
                  <GlassCard className="p-4">
  <div className="text-xs font-mono text-cyan-300">
    <div>ax: {leftData.ax.toFixed(3)}</div>
<div>ay: {leftData.ay.toFixed(3)}</div>
<div>az: {leftData.az.toFixed(3)}</div>

    <div className="text-green-400">steps: {steps}</div>
    <div>pitch: {pitch.toFixed(2)}</div>
    <div>roll: {roll.toFixed(2)}</div>
  </div>
</GlassCard>

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                      Experience Score
                    </p>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="text-5xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-3 font-mono">
                    {Math.round(comfortScore)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">/100</span>
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>Optimal</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center group-hover:animate-glow-pulse">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Balance</p>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-3 font-mono">
                    {balance.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">%</span>
                    <span className="text-sm text-cyan-400">Symmetry</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:animate-glow-pulse">
                    <Footprints className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Steps</p>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-3 font-mono">
                    {steps}
                  </div>
                  <span className="text-sm text-purple-400">Current session</span>
                </div>
              </GlassCard>

              <GlassCard className="p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center group-hover:animate-glow-pulse">
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Usage Time</p>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="text-4xl font-bold text-white mb-3 font-mono">{formatTime(usageTime)}</div>
                  <span className="text-sm text-orange-400">Active duration</span>
                </div>
              </GlassCard>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <GlassCard className="p-6 relative overflow-hidden group">
                <PressureMap pressure={leftData.pressure} />

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Footprints className="w-5 h-5 text-cyan-400" />
                    Pressure Distribution
                  </h3>
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded-full border border-cyan-500/20">Left Foot</span>
                </div>
                <div className="relative aspect-[3/4] bg-gradient-to-b from-blue-950/60 to-cyan-950/60 rounded-2xl overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 200 300" className="w-full h-full">
                      <defs>
                        <radialGradient id="leftGrad1">
                          <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
                        </radialGradient>
                        <radialGradient id="leftGrad2">
                          <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.1" />
                        </radialGradient>
                      </defs>
                      <ellipse cx="100" cy="80" rx="60" ry="45" fill="url(#leftGrad1)" className="animate-pulse" />
                      <ellipse cx="100" cy="200" rx="55" ry="70" fill="url(#leftGrad2)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <ellipse cx="70" cy="250" rx="30" ry="35" fill="url(#leftGrad1)" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-1">
                        {(balance + 2).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-400">Load distribution</div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 relative overflow-hidden group">
                <PressureMap pressure={rightData.pressure} />

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Footprints className="w-5 h-5 text-cyan-400" />
                    Pressure Distribution
                  </h3>
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded-full border border-cyan-500/20">Right Foot</span>
                </div>
                <div className="relative aspect-[3/4] bg-gradient-to-b from-blue-950/60 to-cyan-950/60 rounded-2xl overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 200 300" className="w-full h-full">
                      <defs>
                        <radialGradient id="rightGrad1">
                          <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.65" />
                          <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.15" />
                        </radialGradient>
                        <radialGradient id="rightGrad2">
                          <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.15" />
                        </radialGradient>
                      </defs>
                      <ellipse cx="100" cy="80" rx="58" ry="43" fill="url(#rightGrad1)" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <ellipse cx="100" cy="200" rx="53" ry="68" fill="url(#rightGrad2)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <ellipse cx="130" cy="250" rx="32" ry="37" fill="url(#rightGrad1)" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-1">
                        {(100 - balance - 2).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-400">Load distribution</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                
                {/* 👇 3D SCENE COMPONENT */}
                <SceneTest pitch={pitch} roll={roll} />

                <div className="flex items-center gap-3 mb-6 mt-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Movement Insights</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Walking Pattern</span>
                      <span className="text-sm text-cyan-400">Consistent</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-[85%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Symmetry</span>
                      <span className="text-sm text-green-400">Balanced</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 w-[92%]" />
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Usage Trends</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Today</span>
                    <span className="text-white font-semibold">{steps} steps</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Active Time</span>
                    <span className="text-white font-semibold">{formatTime(usageTime)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Experience Score</span>
                    <span className="text-green-400 font-semibold">
                      {Math.round(comfortScore)}/100
                    </span>
                  </div>
                </div>
              </GlassCard>
            </div>

            <GlassCard className="p-6 border-blue-500/30">
              <div className="text-center">
                <p className="text-sm text-blue-300 italic">
                  Displaying simulated live data for demonstration. Real insights from connected
                  smart insoles provide footwear usage analytics only — not intended for medical
                  use.
                </p>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}