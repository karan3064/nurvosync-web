import { useRef, useEffect, useState } from "react";
import { Settings2, Plus, Minus, Check, RotateCcw } from "lucide-react";

type Point = { x: number; y: number };

type Props = {
  pressure: number[]; 
  onLayoutChange?: (points: Point[]) => void;
  side?: "left" | "right"; // <--- ADDED PROP
};

const WIDTH = 200;
const HEIGHT = 300;
const HISTORY_LENGTH = 20;

// Default Layout (Left Foot Layout)
const DEFAULT_POINTS: Point[] = [
  { x: 100, y: 60 },  // Toes
  { x: 65,  y: 110 }, // Meta 1
  { x: 135, y: 110 }, // Meta 5
  { x: 110, y: 190 }, // Arch
  { x: 100, y: 255 }, // Heel
];

const getPalette = () => {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256; canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0.0, "rgba(0, 0, 255, 0)");
  grad.addColorStop(0.1, "rgb(0, 0, 255)");
  grad.addColorStop(0.3, "rgb(0, 255, 255)");
  grad.addColorStop(0.6, "rgb(0, 255, 0)");
  grad.addColorStop(0.8, "rgb(255, 255, 0)");
  grad.addColorStop(1.0, "rgb(255, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1);
  return ctx.getImageData(0, 0, 256, 1).data;
};

const FOOT_PATH = `M 90,285 C 60,285 50,230 60,190 C 65,160 50,140 40,110 C 30,80 40,40 70,30 C 100,20 140,20 160,40 C 180,60 180,100 170,120 C 160,140 145,160 140,190 C 135,230 130,285 90,285 Z`;

function drawFootShape(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  const p = new Path2D(FOOT_PATH);
  ctx.fillStyle = "black";
  ctx.fill(p);
}

// Default to "left" if not specified
export default function HeatmapCanvas({ pressure, onLayoutChange, side = "left" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [palette, setPalette] = useState<Uint8ClampedArray | null>(null);
  const [points, setPoints] = useState<Point[]>(DEFAULT_POINTS);
  const [isEditing, setIsEditing] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const [copHistory, setCopHistory] = useState<Point[]>([]);
  const [cop, setCop] = useState<{ x: number, y: number, active: boolean }>({ x: 100, y: 150, active: false });

  useEffect(() => { setPalette(getPalette()); }, []);

  useEffect(() => {
    if (onLayoutChange) onLayoutChange(points);
  }, [points, onLayoutChange]);

  // --- 1. CALCULATE COP (Logic is essentially same) ---
  useEffect(() => {
    let weightedX = 0;
    let weightedY = 0;
    let totalForce = 0;

    pressure.forEach((p, i) => {
        if (points[i] && p > 0.05) {
            weightedX += p * points[i].x;
            weightedY += p * points[i].y;
            totalForce += p;
        }
    });

    if (totalForce > 0.1) {
        const newX = weightedX / totalForce;
        const newY = weightedY / totalForce;
        
        setCop({ x: newX, y: newY, active: true });
        setCopHistory(prev => {
            const next = [...prev, { x: newX, y: newY }];
            if (next.length > HISTORY_LENGTH) next.shift(); 
            return next;
        });

    } else {
        setCop(prev => ({ ...prev, active: false }));
    }
  }, [pressure, points]);

  // --- INTERACTION HANDLERS ---
  const handlePointerDown = (index: number, e: React.PointerEvent) => {
    if (!isEditing) return;
    e.stopPropagation(); 
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragIndex(index);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragIndex === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;
    
    let x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // 🛠️ CRITICAL FIX: If Right foot, we must invert the mouse X 
    // so it matches the internal "Left-based" coordinate system.
    if (side === "right") {
        x = WIDTH - x;
    }

    setPoints(prev => {
        const newPoints = [...prev];
        newPoints[dragIndex] = { x, y };
        return newPoints;
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragIndex(null);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const addSensor = () => setPoints(prev => [...prev, { x: 100, y: 150 }]);
  const removeSensor = () => setPoints(prev => prev.slice(0, -1));
  const resetLayout = () => setPoints(DEFAULT_POINTS);

  // --- RENDER HEATMAP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !palette) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // 🛠️ MIRROR TRANSFORM START
    // We flip the ENTIRE context. This ensures the mask and blobs align perfectly.
    ctx.save();
    if (side === "right") {
        ctx.translate(WIDTH, 0);
        ctx.scale(-1, 1);
    }

    // Draw Pressure Blobs
    points.forEach((pt, i) => {
      const p = pressure[i] || 0; 
      const radius = 50 + (p * 50); 
      const intensity = Math.min(1, Math.pow(p, 0.5)); 

      const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius);
      grad.addColorStop(0, `rgba(0, 0, 0, ${intensity})`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Colorize
    const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {
        const offset = alpha * 4;
        data[i] = palette[offset];
        data[i + 1] = palette[offset + 1];
        data[i + 2] = palette[offset + 2];
        data[i + 3] = Math.min(255, alpha * 2);
      }
    }
    ctx.putImageData(imageData, 0, 0);

    // Mask
    ctx.globalCompositeOperation = "destination-in";
    // We must re-apply the mirror logic for the mask because 'putImageData' resets context state in some browsers,
    // but usually 'ctx.save()' handles it. However, the vector path needs the transform active.
    // Since we are still inside the 'save()', the transform is active.
    drawFootShape(ctx);
    
    ctx.restore(); // 🛠️ MIRROR TRANSFORM END
    
    ctx.globalCompositeOperation = "source-over";

  }, [pressure, palette, points, side]); // Add side dependency

  return (
    <div className="relative w-full h-full flex flex-col">
        
        {/* --- TOOLBAR --- */}
        <div className={`absolute top-2 left-2 right-2 z-50 flex gap-2 transition-all ${isEditing ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
            <div className="bg-gray-800/90 backdrop-blur border border-white/10 rounded-lg p-1 flex gap-1 shadow-xl">
                <button onClick={addSensor} className="p-2 hover:bg-white/10 rounded-md text-green-400"><Plus size={16}/></button>
                <button onClick={removeSensor} className="p-2 hover:bg-white/10 rounded-md text-red-400"><Minus size={16}/></button>
                <div className="w-px bg-white/10 mx-1"></div>
                <button onClick={resetLayout} className="p-2 hover:bg-white/10 rounded-md text-gray-400"><RotateCcw size={16}/></button>
            </div>
        </div>

        {/* --- EDIT BUTTON --- */}
        <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`absolute bottom-4 right-4 z-50 p-3 rounded-full shadow-lg border transition-all ${isEditing ? 'bg-blue-600 border-blue-400 text-white' : 'bg-gray-800/50 border-white/10 text-gray-400 hover:bg-gray-700'}`}
        >
            {isEditing ? <Check size={20} /> : <Settings2 size={20} />}
        </button>

        {/* --- CANVAS --- */}
        <div 
            ref={containerRef}
            className={`relative flex-1 rounded-xl overflow-hidden transition-all duration-300 ${isEditing ? 'bg-gray-900 ring-2 ring-blue-500/50 scale-[0.98]' : 'bg-transparent'}`}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <canvas
                ref={canvasRef}
                width={WIDTH}
                height={HEIGHT}
                className="absolute inset-0 w-full h-full object-contain opacity-90"
                style={{ filter: "blur(4px)" }} 
            />

            <svg 
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`} 
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* 🛠️ SVG MIRROR GROUP: Flips the vector overlays */}
                <g transform={side === "right" ? `scale(-1, 1) translate(-${WIDTH}, 0)` : ""}>

                    <path d={FOOT_PATH} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />

                    {/* --- SENSOR HANDLES --- */}
                    {points.map((pt, i) => (
                        <g 
                            key={i} 
                            transform={`translate(${pt.x}, ${pt.y})`}
                            className={`${isEditing ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
                            onPointerDown={(e) => handlePointerDown(i, e)}
                        >
                            {isEditing ? (
                                <>
                                    <circle r="15" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" className="animate-pulse" />
                                    <circle r="4" fill="white" />
                                    {/* 🛠️ Un-flip text so it is readable on Right foot */}
                                    <text 
                                      y="-20" 
                                      textAnchor="middle" 
                                      fill="white" 
                                      fontSize="10" 
                                      fontWeight="bold"
                                      transform={side === "right" ? "scale(-1, 1)" : ""}
                                    >S{i}</text>
                                </>
                            ) : (
                                 <circle r="3" fill="rgba(255,255,255,0.2)" />
                            )}
                        </g>
                    ))}

                    {/* --- COP TRACE LINE --- */}
                    <polyline
                        points={copHistory.map(p => `${p.x},${p.y}`).join(" ")}
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.6"
                    />

                    {/* --- COP DOT --- */}
                    {cop.active && (
                        <g className="transition-all duration-75 ease-linear" style={{ transform: `translate(${cop.x}px, ${cop.y}px)` }}>
                            <circle r="12" fill="none" stroke="#22d3ee" strokeWidth="2" className="animate-ping opacity-75" />
                            <circle r="5" fill="#22d3ee" stroke="white" strokeWidth="2" />
                        </g>
                    )}
                </g>
            </svg>
        </div>
    </div>
  );
}