"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Radar,
  LayoutDashboard,
  GitBranch,
  BarChart3,
  Zap,
  Users,
  MessageSquare,
  TrendingUp,
  Shield,
  Clock,
  Target,
  Brain,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

const SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;
const VIEWPORT = { once: false, amount: 0.3 } as const;

// ─── Feature Glass Card ─────────────────────────────────────────────────────

function FeatureCard({
  icon,
  title,
  description,
  chips,
  accent,
  delay,
  stat,
  statLabel,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  chips: string[];
  accent: string;
  delay: number;
  stat?: string;
  statLabel?: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...SPRING, delay }}
      whileHover={shouldReduce ? {} : { y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] p-6 transition-colors duration-300 hover:border-white/[0.12]"
      style={{
        background: "rgba(8, 16, 12, 0.85)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset",
      }}
    >
      {/* Accent top streak */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}80 50%, transparent)`,
          opacity: 0.5,
        }}
      />

      {/* Corner glow on hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: `${accent}18`, color: accent }}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Content */}
      <h3 className="mb-2 text-base font-bold text-white/90">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-white/42">{description}</p>

      {/* Chips */}
      <div className="flex flex-wrap gap-1.5" role="list" aria-label={`Features of ${title}`}>
        {chips.map((chip) => (
          <span
            key={chip}
            role="listitem"
            className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold"
            style={{
              borderColor: `${accent}30`,
              color: `${accent}cc`,
              background: `${accent}10`,
            }}
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Stat badge */}
      {stat && (
        <div
          className="mt-5 border-t pt-4"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
          aria-label={`${stat} ${statLabel}`}
        >
          <span
            className="text-2xl font-extrabold"
            style={{
              background: `linear-gradient(135deg, ${accent}, white)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {stat}
          </span>
          <span className="ml-2 text-xs text-white/30">{statLabel}</span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Feature data — sourced directly from screenshots ───────────────────────

const FEATURES = [
  {
    icon: <Radar size={20} />,
    title: "Know Who to Hire — Before Your Competitors Do",
    description:
      "Real-time market radar tracks competitor salaries at Noon, Careem, and fast-scaling companies across GCC. Get URGENT alerts the moment a top candidate is about to leave your pipeline — act before the offer lands.",
    chips: ["Market Velocity", "Live Talent Vortex", "Counter-Intelligence", "Talent Leak Alerts"],
    accent: "#c084fc",
    delay: 0.06,
    stat: "40%",
    statLabel: "faster market velocity vs last quarter",
  },
  {
    icon: <LayoutDashboard size={20} />,
    title: "Run Your Entire Pipeline — From One Screen",
    description:
      "Every open role, every AI-screened candidate, every interview slot — managed from a single command hub. No spreadsheets. No missed follow-ups. No candidates falling through cracks.",
    chips: ["Active Roles", "AI Screening", "Interview Calendar", "Sourcing Pulse"],
    accent: "#a78bfa",
    delay: 0.14,
    stat: "92%",
    statLabel: "avg AI match score on shortlisted candidates",
  },
  {
    icon: <GitBranch size={20} />,
    title: "See Every Candidate's Journey — In Real Time",
    description:
      "Visual track from Applied → AI Screened → Interviewed → Hired. Behavioral scores, 360° reports, and Priority Actions surface the people worth your time — the rest is handled automatically.",
    chips: ["Match Score", "360° Reports", "Bulk Upload", "Behavioral Scoring", "Priority Actions"],
    accent: "#6ee7b7",
    delay: 0.22,
    stat: "82%",
    statLabel: "avg sentiment score on AI interviews",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Prove ROI to Leadership — With One Click",
    description:
      "CEO Strategic Action Summary, Recruiter Hours Saved trend, and Pipeline Health Status — all auto-generated. Walk into any board meeting ready with data. No manual reporting.",
    chips: ["Hours Saved", "Bottleneck Flags", "CEO Summary", "Portfolio Health"],
    accent: "#67e8f9",
    delay: 0.30,
    stat: "1,245",
    statLabel: "hours saved — 16,800 screenings bypassed",
  },
];

// ─── Secondary capability pills ─────────────────────────────────────────────

const CAPABILITIES = [
  { icon: <Brain size={14} />, label: "AI Interview Studio", color: "#c084fc" },
  { icon: <MessageSquare size={14} />, label: "WhatsApp Integration", color: "#6ee7b7" },
  { icon: <Shield size={14} />, label: "Bias-Free Scoring", color: "#a78bfa" },
  { icon: <Zap size={14} />, label: "4h Screening Speed", color: "#67e8f9" },
  { icon: <Users size={14} />, label: "Golden Top 5 Ranking", color: "#f87171" },
  { icon: <TrendingUp size={14} />, label: "Market Counter-Intel", color: "#c084fc" },
  { icon: <Target size={14} />, label: "Critical Talent Leaks", color: "#a855f7" },
  { icon: <Clock size={14} />, label: "15-Day Time to Hire", color: "#6ee7b7" },
];

// ─── Root ────────────────────────────────────────────────────────────────────

export default function FeaturesSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      aria-labelledby="features-heading"
      className="relative overflow-hidden py-28 px-4"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(124,58,237,0.1) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(167,139,250,0.08) 0%, transparent 50%), #030608",
      }}
    >
      {/* Background ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(192,132,252,0.04)" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(103,232,249,0.04)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={SPRING}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400/60">
            The Platform
          </p>
          <h2
            id="features-heading"
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ lineHeight: 1.1, letterSpacing: "-0.02em", textShadow: "0 0 60px rgba(255,180,60,0.12)" }}
          >
            Four Modules.{" "}
            <span
              className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent"
            >
              One Intelligence.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-white/40">
            From market radar to CEO-level analytics — every screen of Clavo AI is purpose-built
            for high-growth companies competing across GCC's fast-moving talent markets.
          </p>
        </motion.div>

        {/* 4-card grid */}
        <div className="features-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>

        {/* Capability pills */}
        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...SPRING, delay: 0.45 }}
          role="list"
          aria-label="Additional Clavo AI capabilities"
        >
          {CAPABILITIES.map(({ icon, label, color }) => (
            <motion.div
              key={label}
              role="listitem"
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
              style={{
                borderColor: `${color}25`,
                color: `${color}bb`,
                background: `${color}0c`,
              }}
              whileHover={shouldReduce ? {} : { scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              aria-label={label}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom divider stat bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/[0.06] p-6 sm:grid-cols-4"
          style={{ background: "rgba(255,255,255,0.02)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.55, duration: 0.8 }}
          role="list"
          aria-label="Clavo AI industry sourcing health benchmarks"
        >
          {[
            { v: "15d", l: "Time to Hire", b: "vs 40d market avg", c: "#c084fc" },
            { v: "87%", l: "Offer Acceptance", b: "vs 72% avg", c: "#6ee7b7" },
            { v: "91%", l: "9-Month Retention", b: "vs 68% avg", c: "#a78bfa" },
            { v: "AED 4.2k", l: "Cost per Hire", b: "vs AED 15k avg", c: "#67e8f9" },
          ].map(({ v, l, b, c }) => (
            <div
              key={l}
              role="listitem"
              className="flex flex-col items-center gap-1 text-center"
              aria-label={`${v} ${l} — ${b}`}
            >
              <span
                className="text-2xl font-extrabold"
                style={{
                  background: `linear-gradient(135deg, ${c}, white)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {v}
              </span>
              <span className="text-xs font-semibold text-white/50">{l}</span>
              <span className="text-[10px] text-emerald-400/55">{b}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
