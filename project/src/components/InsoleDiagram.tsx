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

export default function InsoleDiagram() {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
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
