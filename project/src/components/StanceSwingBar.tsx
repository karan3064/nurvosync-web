import { useEffect, useState } from "react";

export default function StanceSwingBar({ isStance, side }: { isStance: boolean, side: "left" | "right" }) {
    // We visualize a rolling window of history
    const [history, setHistory] = useState<boolean[]>(new Array(40).fill(false));

    useEffect(() => {
        setHistory(prev => {
            const next = [...prev, isStance];
            return next.slice(-40); // Keep last 40 frames
        });
    }, [isStance]);

    return (
        <div className="w-full">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span className="uppercase">{side} Rhythm</span>
                <span>{isStance ? "STANCE" : "SWING"}</span>
            </div>
            <div className="flex gap-0.5 h-6 w-full">
                {history.map((active, i) => (
                    <div 
                        key={i}
                        className={`flex-1 rounded-sm transition-colors duration-75 ${
                            active 
                            ? (side === "left" ? "bg-blue-500" : "bg-indigo-500") 
                            : "bg-gray-800"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}