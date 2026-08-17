import { motion } from 'framer-motion';
import { Footprints, Zap } from 'lucide-react';

export default function ShoeLayers({ onSelectInsole }: { onSelectInsole: () => void }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Upper */}
      <motion.div
        initial={{ y: 0, opacity: 0, scale: 0.85 }}
        animate={{ y: -82, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute w-[85%] bg-gray-100 border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm"
      >
        <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0">
          <Footprints className="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900">Upper & Cushioning</div>
          <div className="text-xs text-gray-500">Any orthopedic shoe a patient already wears</div>
        </div>
      </motion.div>

      {/* Insole — clickable, highlighted */}
      <motion.button
        onClick={onSelectInsole}
        initial={{ y: 0, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.03 }}
        className="absolute w-[92%] bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-300 rounded-2xl p-4 flex items-center gap-3 shadow-lg shadow-teal-500/10 text-left group z-10"
      >
        <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-teal-800">NurvoSync Smart Insole</div>
          <div className="text-xs text-teal-600">Tap to see what's inside &rarr;</div>
        </div>
      </motion.button>

      {/* Outsole */}
      <motion.div
        initial={{ y: 0, opacity: 0, scale: 0.85 }}
        animate={{ y: 82, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        className="absolute w-[85%] bg-gray-800 border border-gray-700 rounded-2xl p-4 flex items-center gap-3 shadow-sm"
      >
        <div className="w-10 h-10 rounded-xl bg-gray-700 flex items-center justify-center flex-shrink-0">
          <Footprints className="w-5 h-5 text-gray-300" />
        </div>
        <div>
          <div className="text-sm font-bold text-white">Durable Outsole</div>
          <div className="text-xs text-gray-400">No changes needed to the shoe itself</div>
        </div>
      </motion.div>
    </div>
  );
}
