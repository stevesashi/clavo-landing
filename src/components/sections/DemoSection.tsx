"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, ArrowRight, Calendar } from "lucide-react";

const SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;
const VIEWPORT = { once: false, amount: 0.3 } as const;

export default function DemoSection() {
  const [playing, setPlaying] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <section
      aria-labelledby="demo-heading"
      className="relative overflow-hidden py-28 px-4"
      style={{ background: "radial-gradient(ellipse 80% 50% at 80% 30%, rgba(124,58,237,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(167,139,250,0.06) 0%, transparent 50%), #030608" }}
    >
      {/* Ambient orb */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full"
          style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, rgba(6,182,212,0.04) 50%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div className="mb-12 text-center"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT} transition={SPRING}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400/60">
            Product Demo
          </p>
          <h2 id="demo-heading"
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            See Clavo AI{" "}
            <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
              in Action
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/42">
            Watch how candidates go from applied → shortlisted in minutes.
          </p>
        </motion.div>

        {/* Video player card */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-white/[0.08]"
          style={{
            background: "rgba(8,14,20,0.96)",
            boxShadow: "0 0 80px rgba(124,58,237,0.15), 0 0 40px rgba(6,182,212,0.08), 0 8px 48px rgba(0,0,0,0.7)",
          }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ ...SPRING, delay: 0.1 }}
        >
          {/* Top edge glow */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6) 35%, rgba(6,182,212,0.5) 65%, transparent)" }} />

          {/* Fake browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-red-500/60" />
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-purple-400/60" />
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-emerald-400/60" />
            <div className="mx-4 flex-1 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-white/25">
              app.clavoai.com/dashboard
            </div>
          </div>

          {/* Thumbnail / placeholder */}
          <div
            className="relative flex aspect-video w-full cursor-pointer items-center justify-center"
            onClick={() => setPlaying(true)}
            role="button"
            aria-label="Play Clavo AI product demo video"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setPlaying(true)}
          >
            {/* Simulated dashboard background */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #0e0420 0%, #0a1628 50%, #0e0420 100%)" }}>
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }} aria-hidden="true" />
            </div>

            {/* Mock UI elements */}
            <div aria-hidden="true" className="absolute inset-6 grid grid-cols-3 gap-4 opacity-40 pointer-events-none">
              {/* Left panel */}
              <div className="col-span-1 flex flex-col gap-3">
                <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-3">
                  <div className="mb-2 h-2 w-16 rounded-full bg-white/20" />
                  <div className="text-2xl font-bold text-purple-300">91%</div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[91%] rounded-full bg-purple-400" />
                  </div>
                </div>
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                  <div className="mb-1 h-2 w-12 rounded-full bg-white/20" />
                  <div className="text-lg font-bold text-cyan-300">15 Days</div>
                </div>
              </div>
              {/* Center panel */}
              <div className="col-span-2 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <div className="h-2 w-24 rounded-full bg-white/20" />
                </div>
                {[85, 72, 91, 67].map((w, i) => (
                  <div key={i} className="mb-2 flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex-shrink-0" />
                    <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" style={{ width: `${w}%` }} />
                    </div>
                    <span className="text-[10px] text-white/40">{w}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Play button */}
            <motion.div
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.9), rgba(6,182,212,0.8))",
                boxShadow: "0 0 36px rgba(124,58,237,0.45), 0 0 64px rgba(6,182,212,0.18)",
              }}
              whileHover={shouldReduce ? {} : { scale: 1.1 }}
              whileTap={shouldReduce ? {} : { scale: 0.95 }}
            >
              <Play size={28} className="translate-x-0.5 text-white" aria-hidden="true" />
            </motion.div>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold text-white/60 backdrop-blur"
              aria-label="Video duration 2 minutes 47 seconds">
              2:47
            </div>
          </div>
        </motion.div>

        {/* CTAs below video */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...SPRING, delay: 0.25 }}
        >
          {/* Primary */}
          <motion.a
            href="/book-demo"
            aria-label="See Clavo AI in action"
            className="group inline-flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
              touchAction: "manipulation",
            }}
            whileHover={shouldReduce ? {} : { scale: 1.05, boxShadow: "0 0 32px rgba(124,58,237,0.6)" }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.14) 0%, transparent 60%)" }} />
            <Play size={15} aria-hidden="true" className="relative" />
            <span className="relative">See Clavo in Action</span>
          </motion.a>

          {/* Secondary */}
          <motion.a
            href="/book-demo"
            aria-label="Book a live demo with the Clavo AI team"
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/65 backdrop-blur transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
            style={{ touchAction: "manipulation" }}
            whileHover={shouldReduce ? {} : { scale: 1.03 }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
          >
            <Calendar size={15} aria-hidden="true" />
            Book a Live Demo
            <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
