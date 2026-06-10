"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { Terminal } from "lucide-react";

export default function SkillsApp({ isDark }: { isDark: boolean }) {
  const accent = isDark ? "text-cyan-400" : "text-folder-blue";
  const text = isDark ? "text-white" : "text-text";
  const textLight = isDark ? "text-white/50" : "text-text-light";
  const cardBg = isDark ? "bg-white/5 border-white/5" : "bg-cream-dark/30 border-white/60";
  const tagBg = isDark ? "bg-white/5 border-white/10 hover:border-cyan-400/30 hover:text-white" : "bg-white/60 border-white/80 hover:border-folder-blue/30 hover:text-text";

  return (
    <div className="space-y-4">
      <div className={`flex items-center gap-2 text-sm mb-4 ${textLight}`}>
        <Terminal size={16} />
        <span>~/Skills</span>
      </div>

      <div className="grid gap-4">
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`p-4 rounded-xl border ${cardBg}`}
          >
            <h3 className={`text-sm font-semibold mb-3 uppercase tracking-wider ${accent}`}>{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-default shadow-sm ${tagBg} ${textLight}`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}