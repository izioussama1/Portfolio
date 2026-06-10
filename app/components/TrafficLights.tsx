"use client";

import { motion } from "framer-motion";

interface TrafficLightsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export default function TrafficLights({ onClose, onMinimize, onMaximize }: TrafficLightsProps) {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/30 flex items-center justify-center group"
      >
        <svg className="w-2 h-2 opacity-0 group-hover:opacity-100" viewBox="0 0 8 8" fill="none">
          <path d="M2 2L6 6M6 2L2 6" stroke="#4a0000" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
        className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]/30 flex items-center justify-center group"
      >
        <svg className="w-2 h-2 opacity-0 group-hover:opacity-100" viewBox="0 0 8 8" fill="none">
          <path d="M1 4H7" stroke="#995700" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onMaximize(); }}
        className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab2e]/30 flex items-center justify-center group"
      >
        <svg className="w-2 h-2 opacity-0 group-hover:opacity-100" viewBox="0 0 8 8" fill="none">
          <path d="M2 2H6V6H2V2Z" stroke="#006500" strokeWidth="0.6" />
        </svg>
      </motion.button>
    </div>
  );
}
