type Props = {
  pressure: number[]; // 5 FSR values (0–1)
};

const fsrPositions = [
  { x: 100, y: 60 },   // toe
  { x: 70,  y: 120 },  // ball left
  { x: 130, y: 120 },  // ball right
  { x: 100, y: 200 },  // midfoot
  { x: 100, y: 260 },  // heel
];

// Convert pressure → heatmap color
function pressureToColor(p: number) {
  if (p < 0.33) {
    return `rgba(0,255,0,${p + 0.2})`;        // green
  } else if (p < 0.66) {
    return `rgba(255,255,0,${p + 0.2})`;      // yellow
  } else {
    return `rgba(255,0,0,${p + 0.2})`;        // red
  }
}

export default function PressureMap({ pressure }: Props) {
  return (
    <svg viewBox="0 0 200 300" className="w-full h-full">
      <defs>
        {pressure.map((p, i) => (
          <radialGradient
            key={i}
            id={`heat-${i}`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor={pressureToColor(p)} />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        ))}
      </defs>

      {pressure.map((p, i) => (
        <circle
          key={i}
          cx={fsrPositions[i].x}
          cy={fsrPositions[i].y}
          r={20 + p * 30}       // radius increases with pressure
          fill={`url(#heat-${i})`}
        />
      ))}
    </svg>
  );
}
