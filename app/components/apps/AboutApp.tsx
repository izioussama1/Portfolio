"use client";
import { motion } from "framer-motion";
import { Code2, Palette, Globe, MapPin, Calendar, Sparkles } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects", value: "6+" },
  { label: "Clients", value: "30+" },
];

export default function AboutApp({ isDark }: { isDark: boolean }) {
  const accent = isDark ? "text-cyan-400" : "text-folder-blue";
  const text = isDark ? "text-white" : "text-text";
  const textLight = isDark ? "text-white/60" : "text-text-light";
  const cardBg = isDark
    ? "bg-white/5 border-white/5"
    : "bg-cream-dark/50 border-white/60";
  const sectionLabel = `text-sm font-semibold uppercase tracking-wider ${textLight}`;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start gap-6">
        <div
          className={`w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg shrink-0 text-white ${
            isDark
              ? "bg-gradient-to-br from-cyan-400 to-blue-600"
              : "bg-gradient-to-br from-folder-blue to-blue-600"
          }`}
        >
          IO
        </div>
        <div>
          <h2 className={`text-2xl font-bold mb-1 ${text}`}>Izi Oussama</h2>
          <p className={`font-mono text-sm mb-2 ${accent}`}>
            Full Stack Developer & Designer
          </p>
          <div className={`flex items-center gap-1 text-xs mb-3 ${textLight}`}>
            <MapPin size={12} />
            <span>Tangier, Morocco</span>
          </div>
          <p className={`text-sm leading-relaxed ${textLight}`}>
            I craft digital experiences where technical precision meets visual
            artistry. Building immersive web applications with modern
            technologies.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl p-4 text-center border ${cardBg}`}
          >
            <div className={`text-xl font-bold ${accent}`}>{stat.value}</div>
            <div className={`text-xs mt-1 ${textLight}`}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* My Story */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`rounded-xl p-4 border ${cardBg} space-y-3`}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={14} className={accent} />
          <h3 className={sectionLabel}>My Story</h3>
        </div>
        <p className={`text-sm leading-relaxed ${textLight}`}>
          I started my journey in 2020 at{" "}
          <span className={`font-semibold ${accent}`}>Solicode</span>, a coding
          center in Tangier where I discovered a deep passion for building things
          on the web. What began as curiosity quickly became a craft — I've since
          shipped 6+ projects (and several more that haven't seen the light yet)
          across development and design.
        </p>
        <p className={`text-sm leading-relaxed ${textLight}`}>
          I'm driven by the intersection of clean code and thoughtful design —
          the kind of work that doesn't just function well, but feels right to
          use. Every project is a chance to push that boundary a little further.
        </p>
      </motion.div>

      {/* What I Do */}
      <div className="space-y-3">
        <h3 className={sectionLabel}>What I Do</h3>
        {[
          { icon: Code2, title: "Development", desc: "React, Next.js, Node.js, TypeScript" },
          { icon: Palette, title: "Design", desc: "UI/UX, Figma, Design Systems" },
          { icon: Globe, title: "3D & Motion", desc: "Three.js, Framer Motion, GSAP" },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
              isDark
                ? "bg-white/5 hover:bg-white/10"
                : "bg-cream-dark/30 hover:bg-cream-dark/50"
            }`}
          >
            <item.icon size={20} className={accent} />
            <div>
              <div className={`font-medium text-sm ${text}`}>{item.title}</div>
              <div className={`text-xs ${textLight}`}>{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Availability CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className={`rounded-xl p-4 border ${
          isDark
            ? "bg-cyan-400/5 border-cyan-400/20"
            : "bg-folder-blue/5 border-folder-blue/20"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 w-2 h-2 rounded-full shrink-0 animate-pulse ${
              isDark ? "bg-cyan-400" : "bg-folder-blue"
            }`}
          />
          <div className="space-y-1">
            <div className={`text-sm font-semibold ${text}`}>
              Available for Full Time Positions
            </div>
            <p className={`text-xs leading-relaxed ${textLight}`}>
              I'm currently open to Full time job — I can make a real impact. Whether it's a landing
              page, a web app, or a design refresh, let's build something
              together and grow the company.
            </p>
          </div>
          <Calendar size={16} className={`shrink-0 mt-0.5 ${accent}`} />
        </div>
      </motion.div>

    </div>
  );
}