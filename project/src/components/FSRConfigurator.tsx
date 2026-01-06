import { useState } from "react";

type Sensor = {
  id: number;
  x: number;
  y: number;
};

export default function FSRConfigurator({ foot }: { foot: "left" | "right" }) {
  const STORAGE_KEY = `fsr-config-${foot}`;

  const [image, setImage] = useState<string | null>(
    localStorage.getItem(`${STORAGE_KEY}-image`)
  );

  const [sensors, setSensors] = useState<Sensor[]>(
    JSON.parse(
      localStorage.getItem(STORAGE_KEY) ||
        JSON.stringify([
          { id: 0, x: 120, y: 80 },   // toes
          { id: 1, x: 150, y: 80 },
          { id: 2, x: 100, y: 160 }, // arch
          { id: 3, x: 120, y: 260 }, // heel
          { id: 4, x: 130, y: 200 },
        ])
    )
  );

  const save = (updated: Sensor[]) => {
    setSensors(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const onDrag = (id: number, e: React.MouseEvent) => {
    const parent = (e.target as HTMLElement).parentElement!;
    const rect = parent.getBoundingClientRect();

    save(
      sensors.map((s) =>
        s.id === id
          ? {
              ...s,
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            }
          : s
      )
    );
  };

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      localStorage.setItem(`${STORAGE_KEY}-image`, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-[280px] h-[520px] border border-dashed border-white/20 rounded-xl overflow-hidden bg-black/30">
      {image && (
        <img
          src={image}
          className="absolute inset-0 w-full h-full object-contain opacity-80"
        />
      )}

      {sensors.map((s) => (
        <div
          key={s.id}
          onMouseDown={(e) => onDrag(s.id, e)}
          className="absolute w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs cursor-move shadow-lg"
          style={{ left: s.x - 16, top: s.y - 16 }}
        >
          {s.id}
        </div>
      ))}

      <label className="absolute bottom-2 left-2 right-2 bg-blue-600 text-xs text-center py-1 rounded cursor-pointer">
        Upload Foot Image
        <input hidden type="file" onChange={onImageUpload} />
      </label>
    </div>
  );
}
