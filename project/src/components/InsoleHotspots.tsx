import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, LucideIcon } from 'lucide-react';

export interface Hotspot {
  id: string;
  x: number; // percent, left
  y: number; // percent, top
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function InsoleHotspots({
  src,
  alt,
  hotspots,
}: {
  src: string;
  alt: string;
  hotspots: Hotspot[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());

  const handleClick = (id: string) => {
    setActive(id);
    setVisited((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const activeHotspot = hotspots.find((h) => h.id === active);
  const allFound = visited.size === hotspots.length;

  return (
    <div>
      <div className="relative">
        <img src={src} alt={alt} className="rounded-2xl w-full object-cover pointer-events-none" />

        {hotspots.map((h) => {
          const isVisited = visited.has(h.id);
          const isActive = active === h.id;
          return (
            <button
              key={h.id}
              onClick={() => handleClick(h.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              aria-label={h.title}
            >
              {!isVisited && (
                <span className="absolute inset-0 rounded-full bg-teal-400 opacity-60 animate-ping" />
              )}
              <span
                className={`relative flex items-center justify-center w-7 h-7 rounded-full border-2 shadow-lg transition-all group-hover:scale-110 ${
                  isActive
                    ? 'bg-teal-600 border-white scale-110'
                    : isVisited
                    ? 'bg-white border-teal-500'
                    : 'bg-teal-500 border-white'
                }`}
              >
                {isVisited ? (
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 min-h-[74px] bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center">
        <AnimatePresence mode="wait">
          {activeHotspot ? (
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-3 w-full"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                <activeHotspot.icon className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">{activeHotspot.title}</div>
                <div className="text-xs text-gray-600">{activeHotspot.description}</div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full text-center text-sm text-gray-500 font-medium"
            >
              Tap the glowing points to explore the insole
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-2 text-center text-xs font-semibold text-teal-600">
        {allFound ? 'All features discovered!' : `${visited.size} / ${hotspots.length} features discovered`}
      </div>
    </div>
  );
}
