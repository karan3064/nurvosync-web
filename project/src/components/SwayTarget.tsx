import { useEffect, useRef } from "react";

export default function SwayTarget({ x, y }: { x: number, y: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // We need to accumulate points to show the "scribble"
  const trace = useRef<{x:number, y:number}[]>([]);

  useEffect(() => {
    // Normalize x,y from sensor space (0-100 usually) to Canvas space (-100 to 100)
    // Assuming x,y come in as 0-100 range roughly? Adjust '50' offset accordingly.
    const normX = (x - 50) * 3; 
    const normY = (y - 50) * 3;

    trace.current.push({ x: normX, y: normY });
    if (trace.current.length > 200) trace.current.shift(); // Keep history

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    
    const w = 200;
    const h = 200;
    const cx = w/2;
    const cy = h/2;

    ctx.clearRect(0, 0, w, h);

    // Draw Target Rings
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1;
    [20, 40, 60, 80].forEach(r => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI*2);
        ctx.stroke();
    });

    // Draw Crosshairs
    ctx.beginPath();
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.moveTo(0, cy); ctx.lineTo(w, cy);
    ctx.stroke();

    // Draw Sway Path
    ctx.strokeStyle = "#facc15"; // Yellow
    ctx.lineWidth = 2;
    ctx.beginPath();
    trace.current.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(cx + pt.x, cy + pt.y);
        else ctx.lineTo(cx + pt.x, cy + pt.y);
    });
    ctx.stroke();

  }, [x, y]);

  return (
    <div className="relative flex flex-col items-center">
       <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Postural Sway (CoP)</h4>
       <canvas ref={canvasRef} width={200} height={200} className="bg-gray-900 rounded-full border border-gray-700 shadow-inner" />
    </div>
  );
}