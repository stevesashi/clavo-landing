"use client";

import { motion, useReducedMotion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

const SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;
const VIEWPORT = { once: false, amount: 0.3 } as const;

const PAINS = [
  "40+ days to hire",
  "Manual CV screening",
  "Missed top candidates",
  "Recruiter burnout",
  "Inconsistent decisions",
];

const SOLUTIONS = [
  "15-day hiring cycles",
  "AI-powered screening & interviews",
  "Top candidates surfaced instantly",
  "Automated workflows",
  "Data-driven decisions",
];

export default function PainSolutionSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      aria-labelledby="pain-solution-heading"
      className="relative overflow-hidden py-28 px-4"
      style={{ background: "linear-gradient(180deg, #04090e 0%, #030608 100%)" }}
    >
      {/* Ambient split glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-1/2"
          style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(239,68,68,0.05) 0%, transparent 60%)" }} />
        <div className="absolute right-0 top-0 h-full w-1/2"
          style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(52,211,153,0.06) 0%, transparent 60%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* Section label */}
        <motion.div className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT} transition={SPRING}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/30">
            The Problem vs The Fix
          </p>
          <h2 id="pain-solution-heading"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Why Hiring Teams{" "}
            <span className="bg-gradient-to-r from-red-400 to-amber-300 bg-clip-text text-transparent">
              Switch to Clavo
            </span>
          </h2>
        </motion.div>

        {/* Two-column card */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* ── LEFT — Pain ── */}
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-red-500/15 p-8"
            style={{
              background: "rgba(20,6,6,0.70)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 0 40px rgba(239,68,68,0.07), 0 4px 32px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ ...SPRING, delay: 0.08 }}
          >
            {/* Top edge */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.5) 50%, transparent)" }} />

            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-red-400/60">
              Without Clavo AI
            </h3>
            <p className="mb-8 text-xl font-bold text-white/80">
              Hiring Today is Broken
            </p>

            <ul className="flex flex-col gap-4" role="list" aria-label="Hiring pain points without Clavo AI">
              {PAINS.map((pain, i) => (
                <motion.li
                  key={pain}
                  className="flex items-center gap-3"
                  initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ ...SPRING, delay: 0.18 + i * 0.08 }}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10"
                    aria-hidden="true">
                    <X size={12} className="text-red-400" />
                  </div>
                  <span className="text-white/55 line-through decoration-red-500/30">{pain}</span>
                </motion.li>
              ))}
            </ul>

            {/* Blurred "damage" stat */}
            <div className="mt-8 rounded-xl border border-red-500/10 bg-red-500/[0.06] p-4 text-center">
              <p className="text-2xl font-extrabold text-red-400/80">AED 15k+</p>
              <p className="mt-0.5 text-xs text-white/30">avg cost per hire · 40+ day pipeline</p>
            </div>
          </motion.div>

          {/* ── RIGHT — Solution ── */}
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-emerald-500/20 p-8"
            style={{
              background: "rgba(4,18,12,0.75)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 0 50px rgba(52,211,153,0.09), 0 4px 32px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ ...SPRING, delay: 0.14 }}
          >
            {/* Top edge */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.55) 50%, transparent)" }} />

            {/* Corner glow */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
              style={{ background: "rgba(52,211,153,0.10)" }} />

            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-400/65">
              With Clavo AI
            </h3>
            <p className="mb-8 text-xl font-bold text-white/90">
              Clavo Fixes It Instantly
            </p>

            <ul className="flex flex-col gap-4" role="list" aria-label="Solutions with Clavo AI">
              {SOLUTIONS.map((solution, i) => (
                <motion.li
                  key={solution}
                  className="flex items-center gap-3"
                  initial={shouldReduce ? {} : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ ...SPRING, delay: 0.22 + i * 0.08 }}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/12"
                    aria-hidden="true">
                    <Check size={12} className="text-emerald-400" />
                  </div>
                  <span className="font-medium text-white/85">{solution}</span>
                </motion.li>
              ))}
            </ul>

            {/* Glowing result stat */}
            <div
              className="mt-8 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] p-4 text-center"
              style={{ boxShadow: "0 0 16px rgba(52,211,153,0.10)" }}
            >
              <p className="text-2xl font-extrabold text-emerald-300">AED 4.2k</p>
              <p className="mt-0.5 text-xs text-white/40">cost per hire · 15-day pipeline · 87% acceptance</p>
            </div>
          </motion.div>
        </div>

        {/* Middle arrow CTA */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...SPRING, delay: 0.5 }}
        >
          <p className="text-base font-semibold text-white/45">
            Ready to move from the left column to the right?
          </p>
          <motion.a
            href="/book-demo"
            aria-label="Book a live demo of Clavo AI"
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-7 py-3.5 text-sm font-semibold text-emerald-300 transition-all hover:border-emerald-400/40 hover:bg-emerald-400/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
            style={{ touchAction: "manipulation" }}
            whileHover={shouldReduce ? {} : { scale: 1.04 }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
          >
            Book a Live Demo
            <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
