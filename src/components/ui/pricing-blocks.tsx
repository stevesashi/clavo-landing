"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Star, Building2 } from "lucide-react";
import { useEffect, useState } from "react";

// ─── Region logic ─────────────────────────────────────────────────────────────

type RegionType = "INR" | "USD" | "CHINA" | "RUSSIA";

const INR_COUNTRIES = new Set([
  "IN", "LK", "BD", "PK", "ID", "PH", "VN",
]);

const USD_COUNTRIES = new Set([
  "MY", "SG", "AE", "SA", "QA", "KW", "OM",
  "US", "GB", "AU",
  // Europe
  "DE", "FR", "NL", "ES", "IT", "SE", "NO", "DK", "FI", "BE", "AT", "CH", "PL", "PT", "IE",
]);

function detectRegion(countryCode: string): RegionType {
  if (countryCode === "CN") return "CHINA";
  if (countryCode === "RU") return "RUSSIA";
  if (INR_COUNTRIES.has(countryCode)) return "INR";
  return "USD";
}

async function fetchRegion(): Promise<RegionType> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) });
    const data = await res.json();
    return detectRegion((data.country_code ?? "").toUpperCase());
  } catch {
    return "USD";
  }
}

// ─── Pricing per region ───────────────────────────────────────────────────────

const PRICING: Record<RegionType, { core: string; scale: string; period: string }> = {
  INR:    { core: "₹12,999", scale: "₹29,999", period: "/mo" },
  USD:    { core: "$499",    scale: "$999",     period: "/mo" },
  CHINA:  { core: "$499",    scale: "$999",     period: "/mo" },
  RUSSIA: { core: "",        scale: "",         period: ""    },
};

// ─── Feature lists ────────────────────────────────────────────────────────────

const CORE_FEATURES = [
  "2 Active Roles",
  "AI CV Screening",
  "AI Video Interviews",
  "Basic Candidate Reports",
  "1 Recruiter Seat",
  "Basic Analytics",
];

const SCALE_FEATURES = [
  "5 Active Roles",
  "2 Recruiter Seats",
  "AI CV Screening",
  "AI Video Interviews",
  "Clavo 360° Reports (Advanced)",
  "AI Notes + Interview Insights",
  "Talent Mapping",
  "WhatsApp Integration",
  "AI Co-Pilot (Live Interview Assistance)",
  "Advanced Analytics Dashboard",
  "Priority Support",
];

const ENTERPRISE_FEATURES = [
  "Everything in Scale",
  "AI Sourcing Agent",
  "Custom AI Models",
  "ATS Integrations",
  "Dedicated Account Manager",
  "Custom Workflows",
  "SLA + Dedicated Support",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ClavoPricingBlocks() {
  const [region, setRegion] = useState<RegionType>("USD");
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    fetchRegion().then((r) => {
      setRegion(r);
      setResolved(true);
    });
  }, []);

  const p = PRICING[region];
  const isRussia = region === "RUSSIA";
  const isChina  = region === "CHINA";
  const showNote = resolved && region !== "USD";

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
              "radial-gradient(circle, rgba(217,119,6,0.10) 0%, rgba(139,92,246,0.07) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Cards row */}
      <div className="relative flex flex-col items-center justify-center gap-6 md:flex-row md:items-end">

        {/* ── Core ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -5 }}
          transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.0 }}
          whileHover={{ scale: 1.03 }}
          className="relative z-10 w-72 rounded-2xl px-7 py-9"
          style={{
            background: "rgba(8, 14, 22, 0.82)",
            border: "1px solid rgba(139,92,246,0.22)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 0 0 1px rgba(139,92,246,0.05) inset, 0 8px 40px rgba(0,0,0,0.55)",
          }}
          aria-label="Core plan"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.55) 50%, transparent)",
            }}
          />

          <div className="mb-2 flex items-center gap-2">
            <Zap size={14} className="text-purple-400" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Core</span>
          </div>

          {isRussia ? (
            <div className="mb-6 text-sm font-semibold text-white/60">Contact Sales</div>
          ) : (
            <>
              <div className="mb-0.5 text-3xl font-extrabold text-white">{p.core}</div>
              <div className="mb-6 text-[11px] text-white/35">{p.period} · Solo recruiters &amp; small teams</div>
            </>
          )}

          <ul className="mb-7 space-y-2.5" role="list" aria-label="Core features">
            {CORE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-xs text-white/60">
                <Check size={11} className="shrink-0 text-purple-400/70" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#demo"
            className="block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
            style={{
              color: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(139,92,246,0.30)",
              background: "rgba(139,92,246,0.08)",
              touchAction: "manipulation",
            }}
            aria-label="Book Demo — Core plan"
          >
            {isRussia ? "Contact Sales" : "Book Demo"}
          </a>
        </motion.div>

        {/* ── Scale ── */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: 0 }}
          animate={{ opacity: 1, y: -24, rotate: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="relative z-20 w-84 rounded-3xl px-9 py-12"
          style={{
            width: "22rem",
            background: "linear-gradient(155deg, #d97706 0%, #b45309 55%, #92400e 100%)",
            border: "2px solid rgba(251,191,36,0.42)",
            boxShadow:
              "0 0 60px rgba(217,119,6,0.42), 0 0 120px rgba(217,119,6,0.14), 0 24px 64px rgba(0,0,0,0.65)",
          }}
          aria-label="Scale plan — Most Popular"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-3xl"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.32) 50%, transparent)",
            }}
          />

          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-amber-300/30 bg-amber-400 px-5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-amber-950 shadow-lg"
            aria-label="Most Popular plan"
          >
            Most Popular
          </div>

          <div className="mb-2 flex items-center gap-2">
            <Star size={14} className="text-amber-900/80" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-900">Scale</span>
          </div>

          {isRussia ? (
            <div className="mb-6 text-sm font-semibold text-amber-100/80">Contact Sales</div>
          ) : (
            <>
              <div
                className="mb-0.5 text-4xl font-black text-white"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.22)" }}
              >
                {p.scale}
              </div>
              <div className="mb-6 text-[11px] text-amber-100/60">{p.period} · Growing agencies &amp; hiring teams</div>
            </>
          )}

          <ul className="mb-7 space-y-2.5" role="list" aria-label="Scale features">
            {SCALE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-amber-50/90">
                <Check size={12} className="shrink-0 text-amber-200" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#demo"
            className="group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{
              background: isChina ? "rgba(180,83,9,0.95)" : "rgba(8,4,2,0.88)",
              border: isChina ? "1px solid rgba(251,191,36,0.5)" : "none",
              touchAction: "manipulation",
            }}
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
            background: "rgba(8, 14, 22, 0.82)",
            border: "1px solid rgba(34,211,238,0.22)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 0 0 1px rgba(34,211,238,0.05) inset, 0 8px 40px rgba(0,0,0,0.55)",
          }}
          aria-label="Enterprise plan — Custom pricing"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.55) 50%, transparent)",
            }}
          />

          <div className="mb-2 flex items-center gap-2">
            <Building2 size={14} className="text-cyan-400" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Enterprise</span>
          </div>

          <div className="mb-0.5 text-3xl font-extrabold text-white">Custom</div>
          <div className="mb-6 text-[11px] text-white/35">Large organisations &amp; agencies</div>

          <ul className="mb-7 space-y-2.5" role="list" aria-label="Enterprise features">
            {ENTERPRISE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-xs text-white/60">
                <Check size={11} className="shrink-0 text-cyan-400/70" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#demo"
            className="block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            style={{
              color: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(34,211,238,0.30)",
              background: "rgba(34,211,238,0.08)",
              touchAction: "manipulation",
            }}
            aria-label="Contact Sales — Enterprise plan"
          >
            Contact Sales
          </a>
        </motion.div>

      </div>

      {/* Region note */}
      {showNote && (
        <p className="mt-8 text-center text-[11px] text-white/30">
          Pricing adjusted based on your region.
        </p>
      )}
    </section>
  );
}
