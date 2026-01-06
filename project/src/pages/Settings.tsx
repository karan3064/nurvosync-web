import { useState } from "react";

const DEFAULT_LAYOUT = {
  left: [
    { id: 1, x: 50, y: 20 },
    { id: 2, x: 45, y: 50 },
    { id: 2, x: 45, y: 50 },
    { id: 2, x: 45, y: 50 },
  ],
  right: [
    { id: 1, x: 50, y: 20 },
    { id: 2, x: 55, y: 50 },
  ],
};

export default function Settings() {
  const [layout, setLayout] = useState(() => {
    const saved = localStorage.getItem("fsr-layout");
    return saved ? JSON.parse(saved) : DEFAULT_LAYOUT;
  });

  const saveLayout = () => {
    localStorage.setItem("fsr-layout", JSON.stringify(layout));
    alert("FSR layout saved!");
  };

  const moveFSR = (foot, id, x, y) => {
    setLayout(prev => ({
      ...prev,
      [foot]: prev[foot].map(f =>
        f.id === id ? { ...f, x, y } : f
      )
    }));
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl mb-4">FSR Calibration</h1>

      <div className="flex gap-10">
        {["left", "right"].map(foot => (
          <div key={foot} className="relative w-[200px] h-[400px] bg-gray-800 rounded-xl">
            {layout[foot].map(fsr => (
              <div
                key={fsr.id}
                draggable
                onDragEnd={(e) => {
                  const rect = e.currentTarget.parentElement.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  moveFSR(foot, fsr.id, x, y);
                }}
                className="absolute w-6 h-6 bg-cyan-400 rounded-full cursor-move"
                style={{
                  left: `${fsr.x}%`,
                  top: `${fsr.y}%`,
                  transform: "translate(-50%, -50%)"
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={saveLayout}
        className="mt-6 px-4 py-2 bg-cyan-600 rounded"
      >
        Save Calibration
      </button>
    </div>
  );
}
