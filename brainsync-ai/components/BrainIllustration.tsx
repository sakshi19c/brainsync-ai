"use client";

import { motion } from "framer-motion";
import { FileText, StickyNote, Brain as BrainIcon, Link2, Sparkles } from "lucide-react";

const floaters = [
  { icon: FileText, label: "Documents", className: "top-2 left-2 sm:top-4 sm:left-6", delay: 0 },
  { icon: StickyNote, label: "Notes", className: "top-10 right-0 sm:top-14 sm:right-2", delay: 0.6 },
  { icon: BrainIcon, label: "Knowledge", className: "bottom-24 left-0 sm:left-2", delay: 1.2 },
  { icon: Link2, label: "Links", className: "bottom-8 right-6 sm:right-10", delay: 1.8 },
  { icon: Sparkles, label: "AI", className: "bottom-0 left-1/2 -translate-x-1/2", delay: 2.4 },
];

export default function BrainIllustration() {
  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      {/* glow */}
      <div className="absolute inset-8 rounded-full gradient-bg opacity-30 blur-3xl animate-glow" />

      {/* central brain */}
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-12 sm:inset-16 rounded-full gradient-bg shadow-soft flex items-center justify-center"
      >
        <BrainIcon className="w-20 h-20 sm:w-28 sm:h-28 text-white" strokeWidth={1.5} />
      </motion.div>

      {/* floating icons */}
      {floaters.map(({ icon: Icon, label, className, delay }) => (
        <motion.div
          key={label}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
          className={`absolute ${className} flex items-center gap-2 bg-white shadow-card border border-border rounded-2xl px-3 py-2`}
        >
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-ink">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}
