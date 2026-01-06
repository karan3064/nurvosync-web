type PressureMapProps = {
  title: string;
  pressure: number[]; // 5 values (0 → 1)
};

const FSR_POSITIONS = [
  { x: 50, y: 15 }, // toe
  { x: 35, y: 40 }, // left ball
  { x: 65, y: 40 }, // right ball
  { x: 50, y: 65 }, // mid foot
  { x: 50, y: 85 }, // heel
];

export default function PressureMap({ title, pressure }: PressureMapProps) {
  return (
    <div className="p-4">
      <h3 className="text-white font-semibold mb-3">{title}</h3>

      <div className="relative w-[180px] h-[360px] bg-gray-900 rounded-2xl mx-auto border border-white/10">
        {FSR_POSITIONS.map((pos, i) => (
          <div
            key={i}
            className="absolute rounded-full transition-all duration-300"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${40 + pressure[i] * 60}px`,
              height: `${40 + pressure[i] * 60}px`,
              background: `rgba(255, 80, 80, ${pressure[i]})`,
              transform: "translate(-50%, -50%)",
              filter: "blur(12px)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
