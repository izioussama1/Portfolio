"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, FolderOpen } from "lucide-react";
import { projects } from "@/lib/data";

export default function ProjectsApp({ isDark }: { isDark: boolean }) {
  const accent = isDark ? "text-cyan-400" : "text-folder-blue";
  const text = isDark ? "text-white" : "text-text";
  const textLight = isDark ? "text-white/50" : "text-text-light";
  const cardBg = isDark ? "bg-white/5 border-white/5 hover:bg-white/10 hover:border-cyan-400/30" : "bg-cream-dark/30 border-white/60 hover:bg-cream-dark/50 hover:border-folder-blue/30";

  return (
    <div className="h-full overflow-auto custom-scrollbar">
      <div className="p-4 space-y-4">
        <div className={`flex items-center gap-2 text-sm mb-4 ${textLight}`}>
          <FolderOpen size={16} />
          <span>~/Projects</span>
        </div>

        <div className="grid gap-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`group rounded-xl border overflow-hidden transition-all ${cardBg}`}
            >
              {/* Project Image */}
              {project.image && (
                <div className="relative aspect-[16/9] overflow-hidden bg-black/20">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className={`text-xs font-mono ${isDark ? "text-white/70" : "text-white/80"}`}>
                      {project.year}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className={`font-semibold group-hover:${accent} transition-colors ${text}`}>{project.title}</h3>
                    {!project.image && (
                      <span className={`text-xs font-mono ${isDark ? "text-white/30" : "text-text-light/60"}`}>{project.year}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1.5 rounded-lg transition-colors ${isDark ? "bg-white/5 hover:bg-white/10 text-white/40 hover:text-white" : "bg-cream-dark/50 hover:bg-white text-text-light hover:text-text"}`}
                      >
                        <Code2 size={14} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1.5 rounded-lg transition-colors ${isDark ? "bg-white/5 hover:bg-white/10 text-white/40 hover:text-white" : "bg-cream-dark/50 hover:bg-white text-text-light hover:text-text"}`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <p className={`text-sm mb-3 leading-relaxed ${textLight}`}>{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className={`px-2 py-0.5 rounded-md text-xs font-mono ${isDark ? "bg-cyan-400/10 text-cyan-400/80" : "bg-folder-blue/10 text-folder-blue/80"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}