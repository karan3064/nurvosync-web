import { MoveRight, MoveLeft } from "lucide-react";

export default function FootStrikeGauge({ roll, side }: { roll: number, side: "left" | "right" }) {
    // Convert radians to degrees if needed, or assume input is degrees.
    // Let's assume input is degrees: -20 (Supination) to +20 (Pronation)
    const angle = Math.max(-30, Math.min(30, roll * (180/Math.PI))); 
    
    // Determine status
    let status = "Neutral";
    let color = "text-green-600";
    if (angle > 10) { status = "Over-Pronation"; color = "text-red-600"; }
    if (angle < -10) { status = "Supination"; color = "text-orange-600"; }

    return (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col items-center">
            <span className="text-xs text-gray-500 uppercase mb-2">Strike Angle ({side})</span>

            <div className="relative w-32 h-16 overflow-hidden mb-2">
                 {/* Gauge Background */}
                 <div className="absolute bottom-0 w-32 h-32 rounded-full border-[12px] border-gray-300 border-b-0 border-l-0 border-r-0"></div>

                 {/* Needle */}
                 <div
                    className="absolute bottom-0 left-1/2 w-1 h-14 bg-gray-900 origin-bottom rounded-full transition-transform duration-300"
                    style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
                 ></div>

                 {/* Center Dot */}
                 <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-700 rounded-full -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className={`text-sm font-bold ${color}`}>{status}</div>
            <div className="text-xs text-gray-600">{angle.toFixed(1)}°</div>
        </div>
    );
}