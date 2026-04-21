"use client";

import { motion, useReducedMotion } from "framer-motion";

// ─── Design partner placeholder logos ────────────────────────────────────────
// Styled as real brand marks — will swap for actual logos when available.

const PARTNERS = [
  { initials: "TH", name: "TalentHub GCC",       color: "#fbbf24" },
  { initials: "GR", name: "Gulf Recruit",         color: "#a78bfa" },
  { initials: "AP", name: "APAC TalentGroup",     color: "#67e8f9" },
  { initials: "NE", name: "Neon Staffing",        color: "#6ee7b7" },
  { initials: "SG", name: "SingaHire",            color: "#fb923c" },
  { initials: "HF", name: "HireFlow",             color: "#f472b6" },
  { initials: "MG", name: "Majid Group",          color: "#fbbf24" },
  { initials: "XP", name: "Expansion People Co.", color: "#a78bfa" },
];

// Duplicate for seamless infinite scroll
const ALL = [...PARTNERS, ...PARTNERS];

function LogoPill({ initials, name, color }: (typeof PARTNERS)[0]) {
  return (
    <div
      className="flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-2.5"
      style={{
        borderColor: `${color}22`,
        background: `${color}0a`,
      }}
      aria-label={name}
    >
      {/* Monogram mark */}
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold"
        style={{ background: `${color}20`, color }}
        aria-hidden="true"
      >
        {initials}
      </div>
      <span className="whitespace-nowrap text-sm font-semibold text-white/45">{name}</span>
    </div>
  );
}

export default function TrustBar() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      aria-labelledby="trust-heading"
      className="relative overflow-hidden py-14"
      style={{ background: "linear-gradient(180deg, #030608 0%, #040a0d 100%)" }}
    >
      {/* Subtle separator line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,180,60,0.18) 40%, rgba(103,232,249,0.14) 60%, transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Label */}
        <motion.p
          id="trust-heading"
          className="mb-8 text-center text-sm font-medium text-white/30"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
        >
          Trusted by fast-scaling hiring teams across{" "}
          <span className="text-white/50">GCC & APAC — startups, agencies, and growth-stage companies</span>
        </motion.p>

        {/* Marquee track */}
        <div className="relative overflow-hidden" aria-hidden="true">
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
            style={{ background: "linear-gradient(to right, #030608, transparent)" }} />
          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
            style={{ background: "linear-gradient(to left, #040a0d, transparent)" }} />

          <motion.div
            className="flex gap-3"
            animate={shouldReduce ? {} : { x: ["0%", "-50%"] }}
            transition={shouldReduce ? {} : {
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {ALL.map((p, i) => (
              <LogoPill key={`${p.initials}-${i}`} {...p} />
            ))}
          </motion.div>
        </div>

        {/* Design partners callout */}
        <motion.div
          className="mt-7 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="h-px w-10 bg-white/10" aria-hidden="true" />
          <span className="text-xs text-white/22 italic">
            Featuring Clavo AI Design Partners · <span className="text-amber-400/50 not-italic font-semibold">Early Access Now Open</span>
          </span>
          <span className="h-px w-10 bg-white/10" aria-hidden="true" />
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(103,232,249,0.10) 50%, transparent)" }}
      />
    </section>
  );
}
