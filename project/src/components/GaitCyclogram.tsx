import { useEffect, useRef } from "react";

export default function GaitCyclogram({ leftForce, rightForce }: { leftForce: number, rightForce: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const history = useRef<{l: number, r: number}[]>([]);

  useEffect(() => {
    // Keep last 100 frames (~2 seconds of data)
    history.current.push({ l: leftForce, r: rightForce });
    if (history.current.length > 100) history.current.shift();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, 200, 200);

    // Draw Grid (The "Ideal" 45-degree symmetry line)
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 200); ctx.lineTo(200, 0); // Diagonal
    ctx.stroke();

    // Draw The Loop
    ctx.beginPath();
    ctx.strokeStyle = "#0891b2"; // Cyan (darker for contrast on light bg)
    ctx.lineWidth = 3;
    
    // Scale: Assuming max force ~1000 arbitrary units, map to 0-200px
    // You might need to adjust the divisor '5' based on your sensor sensitivity
    history.current.forEach((pt, i) => {
        const x = pt.l * 100; // Left Force on X
        const y = 200 - (pt.r * 100); // Right Force on Y (inverted)
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    
    ctx.stroke();

    // Draw Head (Current Point)
    const last = history.current[history.current.length - 1];
    if (last) {
        ctx.beginPath();
        ctx.fillStyle = "#0f172a";
        ctx.arc(last.l * 100, 200 - (last.r * 100), 4, 0, Math.PI * 2);
        ctx.fill();
    }

  }, [leftForce, rightForce]);

  return (
    <div className="flex flex-col items-center">
      <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-2">Gait Symmetry Loop</h4>
      <div className="border border-gray-200 bg-gray-50 rounded-lg p-2">
        <canvas ref={canvasRef} width={200} height={200} />
      </div>
    </div>
  );
}