import { motion } from 'framer-motion';

// Reuses the same foot silhouette used by the real pressure-map canvas
// (HeatmapCanvas.tsx), so this illustrative diagram matches the shape
// clinicians actually see in the dashboard.
const FOOT_PATH = "M 90,285 C 60,285 50,230 60,190 C 65,160 50,140 40,110 C 30,80 40,40 70,30 C 100,20 140,20 160,40 C 180,60 180,100 170,120 C 160,140 145,160 140,190 C 135,230 130,285 90,285 Z";

const VB_W = 400;
const VB_H = 320;
// Foot path lives in a 0-200 x 0-300 space originally; shift it into the
// middle of a wider canvas so there's room for callout labels either side.
const OFFSET_X = 100;
const OFFSET_Y = 10;

const SENSORS = [
  { id: 'toes', dot: [100 + OFFSET_X, 60 + OFFSET_Y], chip: [335, 40], side: 'right' as const, label: 'Toe-Off Detection' },
  { id: 'meta1', dot: [65 + OFFSET_X, 110 + OFFSET_Y], chip: [45, 118], side: 'left' as const, label: 'Medial Forefoot' },
  { id: 'meta5', dot: [135 + OFFSET_X, 110 + OFFSET_Y], chip: [325, 128], side: 'right' as const, label: 'Lateral Forefoot' },
  { id: 'arch', dot: [110 + OFFSET_X, 190 + OFFSET_Y], chip: [45, 208], side: 'left' as const, label: 'Arch Support' },
  { id: 'heel', dot: [100 + OFFSET_X, 255 + OFFSET_Y], chip: [335, 275], side: 'right' as const, label: 'Heel Strike' },
];

// Illustrated wireless pod that clips to the heel of the insole — a
// stylized concept diagram, not a photo of any real manufactured part.
const POD_CABLE = `M 200,265 C 218,275 232,278 248,281`;
const POD_CENTER: [number, number] = [264, 286];

export default function InsoleDiagram() {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white rounded-full text-[10px] font-bold tracking-widest uppercase z-10">
        NurvoSync Insole — Concept Diagram
      </div>

      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full">
        <motion.path
          d={FOOT_PATH}
          transform={`translate(${OFFSET_X},${OFFSET_Y})`}
          fill="rgba(20,184,166,0.07)"
          stroke="rgba(20,184,166,0.45)"
          strokeWidth="2"
          strokeDasharray="5 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        <motion.text
          x={185} y={175}
          textAnchor="middle"
          transform="rotate(-90 185 175)"
          className="fill-teal-700/40"
          style={{ fontSize: 15, fontWeight: 700, letterSpacing: 3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          NURVOSYNC
        </motion.text>

        {/* Wireless pod + connecting cable */}
        <motion.path
          d={POD_CABLE}
          fill="none"
          stroke="#334155"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        />
        <motion.g
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.7, type: 'spring', stiffness: 260, damping: 18 }}
          style={{ transformOrigin: `${POD_CENTER[0]}px ${POD_CENTER[1]}px` }}
        >
          <rect x={POD_CENTER[0] - 20} y={POD_CENTER[1] - 12} width="40" height="24" rx="8" fill="#0f172a" />
          <circle cx={POD_CENTER[0]} cy={POD_CENTER[1]} r="4" className="fill-cyan-400 animate-pulse" />
        </motion.g>
        <motion.text
          x={POD_CENTER[0]} y={POD_CENTER[1] + 26}
          textAnchor="middle"
          className="fill-gray-500"
          style={{ fontSize: 10, fontWeight: 600 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.9 }}
        >
          Wireless Sensor Pod
        </motion.text>

        {SENSORS.map((s, i) => (
          <motion.line
            key={`line-${s.id}`}
            x1={s.dot[0]} y1={s.dot[1]} x2={s.chip[0]} y2={s.chip[1]}
            stroke="#0d9488"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.35, delay: 0.12 * i + 0.15 }}
          />
        ))}

        {SENSORS.map((s, i) => (
          <g key={`dot-${s.id}`}>
            <circle
              cx={s.dot[0]} cy={s.dot[1]} r="9"
              className="fill-teal-400 opacity-60 animate-ping"
              style={{ transformOrigin: `${s.dot[0]}px ${s.dot[1]}px` }}
            />
            <motion.circle
              cx={s.dot[0]} cy={s.dot[1]} r="6"
              fill="#0d9488"
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 * i, type: 'spring', stiffness: 320, damping: 18 }}
            />
          </g>
        ))}
      </svg>

      {SENSORS.map((s, i) => (
        <motion.div
          key={`label-${s.id}`}
          initial={{ opacity: 0, x: s.side === 'left' ? 8 : -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.12 * i + 0.3 }}
          className={`absolute -translate-y-1/2 ${s.side === 'left' ? '-translate-x-full' : ''} px-3 py-1.5 bg-white border border-teal-200 rounded-lg shadow-md text-xs font-semibold text-gray-800 whitespace-nowrap`}
          style={{
            left: `${(s.chip[0] / VB_W) * 100}%`,
            top: `${(s.chip[1] / VB_H) * 100}%`,
          }}
        >
          {s.label}
        </motion.div>
      ))}
    </div>
  );
}
