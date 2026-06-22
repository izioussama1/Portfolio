"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Code2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactApp({ isDark }: { isDark: boolean }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
  const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
  const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

  useEffect(() => {
    if (emailjsPublicKey) {
      emailjs.init(emailjsPublicKey);
    }
  }, [emailjsPublicKey]);

  const accent = isDark ? "text-cyan-400" : "text-folder-blue";
  const text = isDark ? "text-white" : "text-text";
  const textLight = isDark ? "text-white/50" : "text-text-light";
  const cardBg = isDark ? "bg-white/5 border-white/5" : "bg-cream-dark/30 border-white/60";
  const inputBg = isDark ? "bg-white/5 border-white/10 placeholder:text-white/30" : "bg-white/60 border-white/80 placeholder:text-text-light/50";
  const btnBg = isDark ? "bg-cyan-400 text-black hover:bg-cyan-300" : "bg-folder-blue text-white hover:bg-blue-500";
  const socialBg = isDark ? "bg-white/5 border-white/10 text-white/40 hover:text-cyan-400 hover:border-cyan-400/30" : "bg-white/60 border-white/80 text-text-light hover:text-folder-blue hover:border-folder-blue/30";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) {
      console.error("Missing EmailJS configuration.");
      setStatus("error");
      return;
    }

    try {
      await emailjs.send(emailjsServiceId, emailjsTemplateId, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      });
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("izioussama18@gmail.com");
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch (error) {
      console.error("Clipboard copy error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold mb-2 ${text}`}>Let's work together</h2>
        <p className={`text-sm ${textLight}`}>Have a project in mind? Send me a message.</p>
      </div>

      <div className="space-y-4">
        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={copyEmail}
          className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border ${cardBg} transition-colors hover:border-cyan-400/30 hover:bg-white/10 cursor-pointer`}
        >
          <Mail size={20} className={accent} />
          <div className="flex-1">
            <div className={`text-sm font-medium ${text}`}>Email</div>
            <div className={`text-xs ${textLight}`}>izioussama18@gmail.com</div>
          </div>
          <div className={`text-xs font-medium ${copyStatus === "copied" ? "text-green-400" : textLight}`}>
            {copyStatus === "copied" ? "Copied" : "Copy"}
          </div>
        </motion.button>
        <div className={`flex items-center gap-4 p-4 rounded-xl border ${cardBg}`}>
          <MapPin size={20} className={accent} />
          <div>
            <div className={`text-sm font-medium ${text}`}>Location</div>
            <div className={`text-xs ${textLight}`}>Available worldwide</div>
          </div>
        </div>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-cyan-400/50 transition-colors ${inputBg} ${text}`}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-cyan-400/50 transition-colors ${inputBg} ${text}`}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-cyan-400/50 transition-colors resize-none ${inputBg} ${text}`}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={status === "sending"}
          className={`w-full inline-flex py-2.5 rounded-lg font-medium text-sm items-center justify-center gap-2 transition-colors shadow-md ${btnBg} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Send size={16} />
          {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Message"}
        </motion.button>

        {status === "sent" && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-green-400"
          >
            Message sent successfully! I'll get back to you soon.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-red-400"
          >
            Something went wrong. Please try again.
          </motion.p>
        )}
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