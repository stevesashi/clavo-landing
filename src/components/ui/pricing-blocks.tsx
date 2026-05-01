"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Star, Building2 } from "lucide-react";

// ─── Card feature highlights (short lists for the cards only) ─────────────────

const CORE_HIGHLIGHTS = [
  "5 Active Roles · 2 Recruiter Seats",
  "Unlimited AI CV Screening",
  "Basic Candidate Reports",
  "Nationalization Dashboard (1 Country)",
  "Basic Analytics · Email Support",
];

const SCALE_HIGHLIGHTS = [
  "10 Active Roles · 5 Recruiter Seats",
  "Unlimited AI CV Screening",
  "2,500 min/mo AI Video Interviews",
  "360° Advanced Candidate Reports",
  "Nationalization Compliance (6 Countries)",
  "Penalty Calculator & ROI",
  "Smart Notes, Talent Mapping, AI Co-Pilot",
  "WhatsApp Integration",
  "Advanced Analytics · Priority Support",
];

const ENTERPRISE_HIGHLIGHTS = [
  "Unlimited Roles & Recruiter Seats",
  "Everything in Scale",
  "AI Sourcing Agent",
  "Custom AI Models & ATS Integrations",
  "White-Label Option",
  "Dedicated Account Manager",
  "SLA & Uptime Guarantee",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ClavoPricingBlocks() {
  return (
    <section
      className="relative flex flex-col items-center px-4 py-20"
      aria-label="Pricing plans"
    >
      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[560px] w-[560px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.10) 0%, rgba(167,139,250,0.07) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Cards row */}
      <div className="pricing-cards relative flex flex-col items-center justify-center gap-6 md:flex-row md:items-end">

        {/* ── Core ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -5 }}
          transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.0 }}
          whileHover={{ scale: 1.03 }}
          className="relative z-10 w-72 rounded-2xl px-7 py-9"
          style={{
            background: "linear-gradient(155deg, #0d0f1e 0%, #161829 55%, #0d0f1e 100%)",
            border: "1px solid rgba(99,102,241,0.28)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 0 0 1px rgba(99,102,241,0.06) inset, 0 8px 40px rgba(0,0,0,0.65), inset 0 0 60px rgba(99,102,241,0.05)",
          }}
          aria-label="Core plan"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
            style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.55) 50%, transparent)" }}
          />

          <div className="mb-2 flex items-center gap-2">
            <Zap size={14} aria-hidden="true" style={{ color: "#818cf8" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>Core</span>
          </div>

          <div className="text-3xl font-extrabold text-white">$599</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", textDecoration: "line-through", marginTop: 4 }}>
            $999/mo at launch
          </div>
          <div style={{ fontSize: 12, color: "#818cf8", fontWeight: 600, marginTop: 4 }}>
            Founder price locked forever
          </div>
          <div className="mb-6 mt-2 text-[11px] text-white/35">/mo · Solo recruiters &amp; small teams</div>

          <ul className="mb-7 space-y-2.5" role="list" aria-label="Core plan highlights">
            {CORE_HIGHLIGHTS.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-xs text-white/60">
                <Check size={11} className="mt-0.5 shrink-0" aria-hidden="true" style={{ color: "rgba(99,102,241,0.8)" }} />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="/book-demo"
            className="block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            style={{
              color: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(99,102,241,0.30)",
              background: "rgba(99,102,241,0.08)",
              touchAction: "manipulation",
            }}
            aria-label="Book Demo — Core plan"
          >
            Book Demo
          </a>
        </motion.div>

        {/* ── Scale ── */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: 0 }}
          animate={{ opacity: 1, y: -24, rotate: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="relative z-20 rounded-3xl px-9 py-12"
          style={{
            width: "22rem",
            background: "linear-gradient(155deg, #1c1408 0%, #292010 55%, #1c1408 100%)",
            border: "2px solid rgba(240,165,0,0.35)",
            boxShadow:
              "0 0 60px rgba(240,165,0,0.22), 0 0 120px rgba(240,165,0,0.08), 0 24px 64px rgba(0,0,0,0.75), inset 0 0 80px rgba(240,165,0,0.07), inset 0 0 30px rgba(240,165,0,0.04)",
          }}
          aria-label="Scale plan — Founder Offer"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-3xl"
            style={{ background: "linear-gradient(90deg, transparent, rgba(240,165,0,0.55) 50%, transparent)" }}
          />

          <div className="mb-2 flex items-center gap-2">
            <Star size={14} className="text-white/80" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">Scale</span>
          </div>

          <div className="text-4xl font-black text-white" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.22)" }}>
            $1,199
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", textDecoration: "line-through", marginTop: 4 }}>
            $1,999/mo at launch
          </div>
          <div style={{ fontSize: 12, color: "#f0a500", fontWeight: 600, marginTop: 4 }}>
            Founder price locked forever
          </div>
          <div className="mb-6 mt-2 text-[11px] text-white/60">/mo · Growing agencies &amp; hiring teams</div>

          <ul className="mb-7 space-y-2.5" role="list" aria-label="Scale plan highlights">
            {SCALE_HIGHLIGHTS.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-white/90">
                <Check size={12} className="mt-0.5 shrink-0" aria-hidden="true" style={{ color: "#f0a500" }} />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="/book-demo"
            className="group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ background: "rgba(8,4,2,0.88)", touchAction: "manipulation" }}
            aria-label="Book a Live Demo — Scale plan"
          >
            Book a Live Demo
            <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* ── Enterprise ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 5 }}
          transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.15 }}
          whileHover={{ scale: 1.03 }}
          className="relative z-10 w-72 rounded-2xl px-7 py-9"
          style={{
            background: "linear-gradient(155deg, #081a12 0%, #0d2018 55%, #081a12 100%)",
            border: "1px solid rgba(16,185,129,0.28)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 0 0 1px rgba(16,185,129,0.06) inset, 0 8px 40px rgba(0,0,0,0.65), inset 0 0 60px rgba(16,185,129,0.05)",
          }}
          aria-label="Enterprise plan — Custom pricing"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
            style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.55) 50%, transparent)" }}
          />

          <div className="mb-2 flex items-center gap-2">
            <Building2 size={14} style={{ color: "#34d399" }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#34d399" }}>Enterprise</span>
          </div>

          <div className="mb-0.5 text-3xl font-extrabold text-white">Custom</div>
          <div className="mb-6 text-[11px] text-white/35">Large organisations &amp; agencies</div>

          <ul className="mb-7 space-y-2.5" role="list" aria-label="Enterprise plan highlights">
            {ENTERPRISE_HIGHLIGHTS.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-xs text-white/60">
                <Check size={11} className="mt-0.5 shrink-0" aria-hidden="true" style={{ color: "rgba(16,185,129,0.8)" }} />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="/book-demo"
            className="block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              color: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(16,185,129,0.30)",
              background: "rgba(16,185,129,0.08)",
              touchAction: "manipulation",
            }}
            aria-label="Contact Sales — Enterprise plan"
          >
            Contact Sales
          </a>
        </motion.div>

      </div>
    </section>
  );
}
