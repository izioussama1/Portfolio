"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, Code2 } from "lucide-react";

export default function ContactApp({ isDark }: { isDark: boolean }) {
  const accent = isDark ? "text-cyan-400" : "text-folder-blue";
  const text = isDark ? "text-white" : "text-text";
  const textLight = isDark ? "text-white/50" : "text-text-light";
  const cardBg = isDark ? "bg-white/5 border-white/5" : "bg-cream-dark/30 border-white/60";
  const inputBg = isDark ? "bg-white/5 border-white/10 placeholder:text-white/30" : "bg-white/60 border-white/80 placeholder:text-text-light/50";
  const btnBg = isDark ? "bg-cyan-400 text-black hover:bg-cyan-300" : "bg-folder-blue text-white hover:bg-blue-500";
  const socialBg = isDark ? "bg-white/5 border-white/10 text-white/40 hover:text-cyan-400 hover:border-cyan-400/30" : "bg-white/60 border-white/80 text-text-light hover:text-folder-blue hover:border-folder-blue/30";
  const mailtoLink = "mailto:izioussama18@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Oussama%2C%0A%0AI%20would%20like%20to%20talk%20about%20a%20project.%0A";

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold mb-2 ${text}`}>Let's work together</h2>
        <p className={`text-sm ${textLight}`}>Have a project in mind? Send me a message.</p>
      </div>

      <div className="space-y-4">
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          href={mailtoLink}
          className={`flex items-center gap-4 p-4 rounded-xl border ${cardBg} transition-colors hover:border-cyan-400/30 hover:bg-white/10 cursor-pointer`}
        >
          <Mail size={20} className={accent} />
          <div>
            <div className={`text-sm font-medium ${text}`}>Email</div>
            <div className={`text-xs ${textLight}`}>izioussama18@gmail.com</div>
          </div>
        </motion.a>
        <div className={`flex items-center gap-4 p-4 rounded-xl border ${cardBg}`}>
          <MapPin size={20} className={accent} />
          <div>
            <div className={`text-sm font-medium ${text}`}>Location</div>
            <div className={`text-xs ${textLight}`}>Available worldwide</div>
          </div>
        </div>
      </div>

      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Your Name" className={`w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-cyan-400/50 transition-colors ${inputBg} ${text}`} />
        <input type="email" placeholder="Your Email" className={`w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-cyan-400/50 transition-colors ${inputBg} ${text}`} />
        <textarea placeholder="Your Message" rows={4} className={`w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-cyan-400/50 transition-colors resize-none ${inputBg} ${text}`} />
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={mailtoLink}
          className={`w-full inline-flex py-2.5 rounded-lg font-medium text-sm items-center justify-center gap-2 transition-colors shadow-md ${btnBg}`}
        >
          <Send size={16} />
          Send Message
        </motion.a>
      </form>

      <div className="flex justify-center gap-4 pt-2">
        {[Code2].map((Icon, i) => (
          <motion.a key={i} whileHover={{ scale: 1.1, y: -2 }} href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${socialBg}`}>
            <Icon size={18} />
          </motion.a>
        ))}
      </div>
    </div>
  );
}