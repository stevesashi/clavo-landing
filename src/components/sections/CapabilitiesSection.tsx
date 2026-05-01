"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Mic2,
  FileBarChart2,
  Users2,
  PenLine,
  Radar,
  Globe2,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Cap {
  Icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  detail: string;
  color: string;
  metric: string;
  metricLabel: string;
  tags: string[];
}

const CAPABILITIES: Cap[] = [
  {
    Icon: Brain,
    number: "01",
    title: "AI Screening",
    description: "Automatically filter and rank candidates in seconds",
    detail:
      "Our AI reads every CV against your job description — scoring experience, skills, and cultural fit before a human ever looks. 400 CVs processed in under 4 hours.",
    color: "#a78bfa",
    metric: "400 CVs",
    metricLabel: "processed in under 4 hours",
    tags: ["CV Analysis", "Auto-Ranking", "Bias-Free"],
  },
  {
    Icon: Mic2,
    number: "02",
    title: "AI Interviews",
    description: "Conduct structured AI-led interviews at scale",
    detail:
      "Asynchronous video interviews conducted 24/7. Every candidate gets a fair, consistent experience — you receive scored transcripts and full behavioral analysis.",
    color: "#a78bfa",
    metric: "24/7",
    metricLabel: "automated interview availability",
    tags: ["Video Analysis", "Behavioral AI", "Structured"],
  },
  {
    Icon: FileBarChart2,
    number: "03",
    title: "AI 360° Reports",
    description: "Get deep candidate insights across skills and behavior",
    detail:
      "Auto-generated reports covering role fit, behavioral patterns, communication style, and experience depth — with a clear hire/no-hire recommendation per candidate.",
    color: "#a78bfa",
    metric: "94%",
    metricLabel: "prediction accuracy vs hire outcome",
    tags: ["360° Analysis", "Hire/No-Hire", "Role Fit"],
  },
  {
    Icon: Users2,
    number: "04",
    title: "Human + AI Co-Pilot",
    description: "Assist human interviews with real-time AI guidance",
    detail:
      "Clavo listens to live interviews, surfaces follow-up questions in real time, flags key moments, and adds instant context — so nothing important gets missed.",
    color: "#a78bfa",
    metric: "Real-time",
    metricLabel: "AI guidance during live interviews",
    tags: ["Live Analysis", "Smart Prompts", "Moment Flags"],
  },
  {
    Icon: PenLine,
    number: "05",
    title: "AI Note Taking",
    description: "Capture and summarize every interview automatically",
    detail:
      "No more scribbling. Clavo transcribes every session, highlights standout answers, and delivers a structured summary to your dashboard within minutes.",
    color: "#a78bfa",
    metric: "< 1 min",
    metricLabel: "to full structured interview summary",
    tags: ["Auto-Transcript", "Smart Summary", "Highlights"],
  },
  {
    Icon: Radar,
    number: "06",
    title: "AI Competitor Mapping",
    description: "Track where top candidates are going — and why",
    detail:
      "Real-time salary benchmarks, offer trends, and talent movement across 200+ companies in GCC. Know exactly what it takes to win the best candidates.",
    color: "#a78bfa",
    metric: "200+",
    metricLabel: "companies tracked across GCC",
    tags: ["Salary Intel", "Offer Trends", "Talent Flow"],
  },
  {
    Icon: Globe2,
    number: "07",
    title: "Global & Regional Hiring Intelligence",
    description: "Built for the markets where you actually hire",
    detail:
      "Clavo is purpose-built for GCC, India, and Southeast Asia — with multilingual AI screening, localized evaluation frameworks, and native support for national programs like NAFIS. One platform, every market.",
    color: "#a78bfa",
    metric: "Any Language",
    metricLabel: "Interview candidates in Arabic, Hindi, Spanish, French & more",
    tags: ["NAFIS Ready", "Multilingual AI", "GCC"],
  },
];

const N = CAPABILITIES.length;

// Precomputed waveform — reduced to 14 bars (was 28) to cut infinite animations
const WAVEFORM = Array.from({ length: 14 }, (_, i) => ({
  minH: 15,
  maxH: Math.round(25 + Math.abs(Math.sin(i * 0.9)) * 65),
  delay: i * 0.09,
  dur: 0.7 + (i % 5) * 0.1,
}));

// ─── Demo Panels ──────────────────────────────────────────────────────────────

function ScreeningPanel({ color }: { color: string }) {
  const candidates = [
    { name: "Sara Al-Rashid", score: 94 },
    { name: "Mohamed Khalid", score: 87 },
    { name: "Ana Rodriguez", score: 82 },
    { name: "James Chen", score: 71 },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-widest" style={{ color }}>
          ● AI Screening Active
        </span>
        <span className="text-[13px] text-white/30">247 applications</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: "0%" }}
          animate={{ width: "78%" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </div>
      <div className="mt-1 flex flex-col gap-2">
        {candidates.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "rgba(255,255,255,0.04)" }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.35 }}
          >
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black"
              style={{ background: `${color}18`, color }}
            >
              {i + 1}
            </div>
            <span className="flex-1 text-sm text-white/65">{c.name}</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `${color}cc` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${c.score}%` }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: "easeOut" }}
                />
              </div>
              <span className="w-8 text-right text-sm font-black" style={{ color }}>
                {c.score}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex items-center gap-2 rounded-xl px-4 py-2.5"
        style={{ background: `${color}10` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <span style={{ color }}>⚡</span>
        <span className="text-sm text-white/45">
          Screened in <span className="font-bold" style={{ color }}>3.2s</span>
        </span>
      </motion.div>
    </div>
  );
}

function InterviewsPanel({ color }: { color: string }) {
  const signals = [
    { label: "Confidence", pct: 82 },
    { label: "Clarity", pct: 76 },
    { label: "Leadership", pct: 88 },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-widest" style={{ color }}>
          ● AI Interview Live
        </span>
        <span className="font-mono text-[13px] text-white/30">00:04:32</span>
      </div>
      {/* Waveform */}
      <div
        className="flex h-16 items-end justify-center gap-[3px] overflow-hidden rounded-xl px-3"
        style={{ background: `${color}0a` }}
      >
        {WAVEFORM.map((w, i) => (
          <motion.div
            key={i}
            className="w-[4px] rounded-full"
            style={{ background: `${color}70` }}
            animate={{ height: [`${w.minH}%`, `${w.maxH}%`, `${w.minH}%`] }}
            transition={{ duration: w.dur, repeat: Infinity, delay: w.delay, ease: "easeInOut" }}
          />
        ))}
      </div>
      {/* Question */}
      <div
        className="rounded-xl px-4 py-3 text-sm leading-relaxed text-white/50"
        style={{ background: "rgba(255,255,255,0.03)", borderLeft: `2px solid ${color}50` }}
      >
        "Describe a time you led a cross-functional team through a challenging deadline..."
      </div>
      {/* Signals */}
      <div className="flex flex-col gap-3">
        {signals.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <span className="w-24 text-[13px] text-white/35">{s.label}</span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                initial={{ width: "0%" }}
                animate={{ width: `${s.pct}%` }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.7 }}
              />
            </div>
            <span className="w-10 text-right text-[13px] font-bold" style={{ color }}>
              {s.pct}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ReportsPanel({ color }: { color: string }) {
  const skills = [
    { label: "Technical", score: 89 },
    { label: "Leadership", score: 78 },
    { label: "Culture Fit", score: 94 },
    { label: "Communication", score: 83 },
  ];
  const circumference = 2 * Math.PI * 36;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-widest" style={{ color }}>
          AI 360° Report
        </span>
        <span
          className="rounded-full px-3 py-1 text-xs font-black"
          style={{ background: `${color}18`, color }}
        >
          Sara Al-Rashid
        </span>
      </div>
      {/* Circular score */}
      <div className="flex items-center justify-center py-1">
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
            <circle cx="40" cy="40" r="36" fill="none" stroke={`${color}15`} strokeWidth="6" />
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke={color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * (1 - 0.86) }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black" style={{ color }}>86</span>
            <span className="text-xs text-white/30">/ 100</span>
          </div>
        </div>
      </div>
      {/* Skill bars */}
      <div className="flex flex-col gap-2.5">
        {skills.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="w-32 text-[13px] text-white/40">{s.label}</span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `${color}cc` }}
                initial={{ width: "0%" }}
                animate={{ width: `${s.score}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
              />
            </div>
            <span className="w-8 text-right text-[13px] text-white/35">{s.score}</span>
          </div>
        ))}
      </div>
      <motion.div
        className="flex items-center justify-center gap-2 rounded-xl py-3"
        style={{ background: `${color}15` }}
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.85 }}
      >
        <span className="text-sm font-black uppercase tracking-widest" style={{ color }}>
          ✓ Hire Recommended
        </span>
      </motion.div>
    </div>
  );
}

function CoPilotPanel({ color }: { color: string }) {
  const suggestions = [
    "Probe deeper on the Q2 budget gap",
    "Ask about managing team conflicts",
    "Clarify the leadership transition period",
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-widest" style={{ color }}>
          ● Live Interview
        </span>
        <span className="font-mono text-[13px] text-white/30">00:14:32</span>
      </div>
      <div
        className="rounded-xl px-4 py-3 text-sm leading-relaxed text-white/45"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        "...we scaled the team from 4 to 18 people in Q3, and the main challenge was maintaining alignment across..."
      </div>
      <div
        className="rounded-xl p-4"
        style={{ background: `${color}0a`, border: `1px solid ${color}1e` }}
      >
        <p
          className="mb-3 text-xs font-black uppercase tracking-widest"
          style={{ color: `${color}80` }}
        >
          AI Suggestions
        </p>
        <div className="flex flex-col gap-2">
          {suggestions.map((s, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-2.5 rounded-lg px-3 py-2"
              style={{ background: "rgba(255,255,255,0.04)" }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.14 }}
            >
              <span className="mt-0.5 text-xs" style={{ color }}>→</span>
              <span className="text-sm text-white/55">{s}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="flex items-center gap-2 rounded-xl px-4 py-3"
        style={{ background: `${color}0e` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
      >
        <span style={{ color }}>⚡</span>
        <span className="text-sm text-white/45">
          <span className="font-bold" style={{ color }}>3 key moments</span> flagged for review
        </span>
      </motion.div>
    </div>
  );
}

function NoteTakingPanel({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-widest" style={{ color }}>
          AI Auto-Summary
        </span>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold"
          style={{ background: `${color}18`, color }}
        >
          Ready in 0:42
        </span>
      </div>
      {/* Tabs */}
      <div className="flex gap-2">
        {["Transcript", "Highlights", "Actions"].map((t, i) => (
          <div
            key={t}
            className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
            style={
              i === 1
                ? { background: `${color}20`, color }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.28)" }
            }
          >
            {t}
          </div>
        ))}
      </div>
      {/* Highlighted transcript */}
      <div
        className="rounded-xl px-4 py-3.5 text-sm leading-[1.75] text-white/42"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        "...demonstrated strong{" "}
        <span className="rounded px-1 font-semibold" style={{ background: `${color}25`, color }}>
          leadership
        </span>{" "}
        in previous role, managed{" "}
        <span className="rounded px-1 font-semibold" style={{ background: `${color}25`, color }}>
          team of 12
        </span>{" "}
        across{" "}
        <span className="rounded px-1 font-semibold" style={{ background: `${color}25`, color }}>
          3 regions
        </span>
        , delivered{" "}
        <span className="rounded px-1 font-semibold" style={{ background: `${color}25`, color }}>
          AED 2.3M
        </span>{" "}
        project under budget..."
      </div>
      <div className="flex flex-wrap gap-2">
        {["Leadership ✓", "Scale ✓", "Delivery ✓", "Budget ✓"].map((t) => (
          <span
            key={t}
            className="rounded-full px-3 py-1 text-[13px] font-semibold"
            style={{ background: `${color}12`, color: `${color}cc` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function CompetitorPanel({ color }: { color: string }) {
  const companies = [
    { name: "Google MENA", hires: 28 },
    { name: "Amazon UAE", hires: 21 },
    { name: "Microsoft", hires: 17 },
    { name: "ADNOC", hires: 14 },
    { name: "Noon", hires: 9 },
  ];
  const max = 28;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-widest" style={{ color }}>
          Talent Intelligence
        </span>
        <span className="text-[13px] text-white/30">GCC · Q2 2025</span>
      </div>
      <div className="flex flex-col gap-2">
        {companies.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.1 }}
          >
            <span className="w-28 truncate text-[13px] text-white/40">{c.name}</span>
            <div
              className="flex-1 h-5 rounded overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <motion.div
                className="h-full rounded"
                style={{ background: `${color}38` }}
                initial={{ width: "0%" }}
                animate={{ width: `${(c.hires / max) * 100}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: "easeOut" }}
              />
            </div>
            <span className="w-9 text-right text-[13px] font-bold" style={{ color }}>
              +{c.hires}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-2 gap-3">
        <div className="rounded-xl p-4 text-center" style={{ background: `${color}0e` }}>
          <p className="text-xl font-black" style={{ color }}>
            AED 42k
          </p>
          <p className="text-xs text-white/30">Avg. monthly offer</p>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: `${color}0e` }}>
          <p className="text-xl font-black" style={{ color }}>
            ↑ 8%
          </p>
          <p className="text-xs text-white/30">vs last quarter</p>
        </div>
      </div>
    </div>
  );
}

function GlobalPanel({ color }: { color: string }) {
  const languages = [
    { name: "Arabic",     regions: "UAE · KSA · Qatar" },
    { name: "English",    regions: "GCC · India · SEA"  },
    { name: "Hindi",      regions: "India"               },
    { name: "Tagalog",    regions: "Philippines"         },
    { name: "Bahasa",     regions: "Indonesia · Malaysia"},
  ];
  const regions = [
    { label: "GCC",           pct: 100 },
    { label: "India",         pct: 82  },
    { label: "Southeast Asia", pct: 68  },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-widest" style={{ color }}>
          ● Regional Coverage Active
        </span>
        <span
          className="rounded-full px-3 py-1 text-xs font-black"
          style={{ background: `${color}18`, color }}
        >
          NAFIS Ready
        </span>
      </div>

      {/* Language list */}
      <div className="flex flex-col gap-2">
        {languages.map((l, i) => (
          <motion.div
            key={l.name}
            className="flex items-center justify-between rounded-xl px-4 py-2.5"
            style={{ background: "rgba(255,255,255,0.04)" }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.09, duration: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-2 w-2 rounded-full shrink-0"
                style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
              />
              <span className="text-sm font-semibold text-white/80">{l.name}</span>
            </div>
            <span className="text-[13px] text-white/35">{l.regions}</span>
          </motion.div>
        ))}
      </div>

      {/* Regional reach bars */}
      <div
        className="rounded-xl p-4"
        style={{ background: `${color}08`, border: `1px solid ${color}1a` }}
      >
        <p className="mb-3 text-xs font-black uppercase tracking-widest" style={{ color: `${color}80` }}>
          Market Penetration
        </p>
        <div className="flex flex-col gap-3">
          {regions.map((r, i) => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="w-32 text-[13px] text-white/40">{r.label}</span>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `${color}cc` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${r.pct}%` }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <span className="w-9 text-right text-[13px] font-bold" style={{ color }}>{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const DEMO_PANELS: React.FC<{ color: string }>[] = [
  ScreeningPanel,
  InterviewsPanel,
  ReportsPanel,
  CoPilotPanel,
  NoteTakingPanel,
  CompetitorPanel,
  GlobalPanel,
];

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function CapabilitiesSection() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Guard against NaN/Infinity (can occur when the target element has
    // display:none on mobile, or during momentum scroll overscroll).
    if (!isFinite(v)) return;
    // Clamp both ends: v can go slightly below 0 or above 1 during
    // iOS/macOS rubber-band scroll. Without Math.max(0,...) the index
    // becomes -1 which makes CAPABILITIES[-1] === undefined and crashes.
    setActiveIndex(Math.max(0, Math.min(N - 1, Math.floor(v * N))));
  });

  // Double-clamp as a safety net — state updates are async and React can
  // theoretically render with a stale out-of-range value between updates.
  const safeIndex = Math.max(0, Math.min(N - 1, activeIndex));
  const active = CAPABILITIES[safeIndex] ?? CAPABILITIES[0];
  const DemoPanel = DEMO_PANELS[safeIndex] ?? DEMO_PANELS[0];

  // ── Reduced-motion: static grid ───────────────────────────────────────────
  if (shouldReduce) {
    return (
      <section
        aria-labelledby="cap-heading"
        className="relative overflow-hidden py-28 px-4"
        style={{ background: "radial-gradient(ellipse 80% 50% at 20% 50%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(167,139,250,0.06) 0%, transparent 50%), #030608" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(167,139,250,0.6)" }}>
              The Full Stack
            </p>
            <h2
              id="cap-heading"
              className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Your Entire Hiring System —{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-purple-300 bg-clip-text text-transparent">
                Powered by Clavo
              </span>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/45">
              From screening to interviews to reports that help YOU take the final decision —
              Clavo handles your full hiring workflow end-to-end.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] p-7"
                style={{ background: "rgba(7,14,20,0.72)" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${cap.color}14`, color: cap.color }}
                >
                  <cap.Icon size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{cap.title}</h3>
                  <p className="mt-1 text-sm text-white/45">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Mobile: natural-scroll stacked cards ──────────────────────────────────
  // Desktop: sticky story rail (600vh scroll container)

  return (
    <section aria-labelledby="cap-heading-sr">
      <h2 id="cap-heading-sr" className="sr-only">
        Your Entire Hiring System — Powered by Clavo
      </h2>

      {/* ══ DESKTOP STORY RAIL ══
          Outer div provides 600vh of scroll distance.
          Inner sticky div is the 100vh visual stage.
          NO overflow:hidden on the sticky element or its ancestors — that
          would break position:sticky in Safari/Chromium. Individual inner
          elements may use overflow:hidden freely. */}
      <div
        ref={desktopRef}
        className="relative hidden lg:block"
        style={{ height: `${N * 100}vh` }}
      >
        <div
          className="sticky top-0 h-screen"
          style={{ background: "radial-gradient(ellipse 80% 50% at 20% 50%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(167,139,250,0.06) 0%, transparent 50%), #030608" }}
        >
          {/* Ambient color glow — plain div + CSS transition avoids Framer
              Motion trying to interpolate from "none" → gradient (which throws) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, ${active.color}09 0%, rgba(0,0,0,0) 65%)`,
              transition: "background 0.8s ease-in-out",
            }}
            aria-hidden
          />

          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden
          />

          {/* Heading — inside sticky so it's always visible during scroll */}
          <div className="relative z-10 pt-8 pb-5 text-center px-6">
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-400/60">
                The Full Stack
              </p>
              <h2 className="mb-3 text-4xl font-extrabold tracking-tight text-white xl:text-5xl" style={{ lineHeight: 1.08 }}>
                Your Entire Hiring System —{" "}
                <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
                  Powered by Clavo
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/45">
                From screening to interviews to reports that help YOU take the final decision —
                Clavo handles your full hiring workflow end-to-end.
              </p>
            </div>
          </div>

          {/* Three-column layout */}
          <div className="relative z-10 flex items-stretch mx-auto max-w-[1380px] px-6" style={{ height: "calc(100% - 160px)" }}>

            {/* ── LEFT: Vertical progress rail ── */}
            <div className="flex w-[72px] shrink-0 flex-col items-center justify-center py-12 pr-4">
              <div className="relative flex flex-col items-center">
                {/* Background line */}
                <div
                  className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                {/* Animated fill line */}
                <motion.div
                  className="absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top"
                  initial={{
                    height: "0%",
                    backgroundColor: CAPABILITIES[0].color,
                    opacity: 0,
                  }}
                  animate={{
                    height: `${(safeIndex / (N - 1)) * 100}%`,
                    backgroundColor: active.color,
                    opacity: 0.45,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {CAPABILITIES.map((cap, i) => {
                  const isAct = i === activeIndex;
                  const isPast = i < activeIndex;
                  return (
                    <div
                      key={cap.number}
                      className="relative z-10 flex flex-col items-center"
                      style={{ marginBottom: i < N - 1 ? "2.5rem" : 0 }}
                    >
                      <motion.div
                        className="flex items-center justify-center rounded-full border"
                        animate={{
                          width: isAct ? 34 : 20,
                          height: isAct ? 34 : 20,
                          borderColor: isAct
                            ? cap.color
                            : isPast
                            ? `${cap.color}35`
                            : "rgba(255,255,255,0.1)",
                          backgroundColor: isAct
                            ? `${cap.color}18`
                            : "rgba(0,0,0,0)",
                          boxShadow: isAct
                            ? `0 0 18px ${cap.color}45`
                            : "none",
                        }}
                        transition={{ duration: 0.28 }}
                      >
                        {isAct ? (
                          <span
                            className="text-[9px] font-black"
                            style={{ color: cap.color }}
                          >
                            {cap.number}
                          </span>
                        ) : isPast ? (
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: `${cap.color}55` }}
                          />
                        ) : (
                          <span className="text-[9px] font-bold text-white/18">
                            {cap.number}
                          </span>
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── CENTER: Demo stage ── */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 xl:px-10">
              {/* Stage header */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`hdr-${activeIndex}`}
                  className="mb-5 flex items-center gap-3"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.22 }}
                >
                  <motion.div
                    className="flex h-8 w-8 items-center justify-center rounded-xl"
                    initial={{
                      backgroundColor: `${CAPABILITIES[0].color}18`,
                      color: CAPABILITIES[0].color,
                      boxShadow: `0 0 18px ${CAPABILITIES[0].color}35`,
                    }}
                    animate={{
                      backgroundColor: `${active.color}18`,
                      color: active.color,
                      boxShadow: `0 0 18px ${active.color}35`,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <active.Icon size={15} />
                  </motion.div>
                  <span className="text-sm font-bold text-white/75">
                    {active.title}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider"
                    style={{ background: `${active.color}15`, color: active.color }}
                  >
                    {active.number} / {String(N).padStart(2, "0")}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Card */}
              <div className="relative w-full max-w-[680px]">
                {/* Glow behind card — CSS transition instead of Framer Motion
                    animate so there's no undefined initial-value read */}
                <div
                  className="pointer-events-none absolute -inset-6 rounded-3xl blur-2xl"
                  style={{
                    backgroundColor: `${active.color}0d`,
                    transition: "background-color 0.8s ease-in-out",
                  }}
                  aria-hidden
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`card-${activeIndex}`}
                    className="relative rounded-2xl p-7"
                    style={{
                      background: "rgba(7,13,21,0.88)",
                      backdropFilter: "blur(24px)",
                      // border is a CSS shorthand — keep it in style, not animate,
                      // so Framer Motion never tries to interpolate it.
                      border: `1px solid ${active.color}20`,
                      boxShadow: `0 0 0 1px ${active.color}10, 0 20px 56px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)`,
                    }}
                    initial={{ opacity: 0, y: 18, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {/* Fake window chrome */}
                    <div className="mb-5 flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
                      <div className="ml-3 h-4 w-36 rounded-md bg-white/[0.04]" />
                      <div className="ml-auto h-4 w-12 rounded-md bg-white/[0.04]" />
                    </div>
                    <DemoPanel color={active.color} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom progress bar */}
              <div className="mt-7 w-full max-w-[680px]">
                <div
                  className="h-[2px] w-full rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${active.color}, ${active.color}55)`,
                    }}
                    animate={{ width: `${((activeIndex + 1) / N) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>

            {/* ── RIGHT: Copy + metrics ── */}
            <div className="flex w-[260px] shrink-0 flex-col justify-center pl-6 xl:w-[300px] xl:pl-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${activeIndex}`}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p
                    className="text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ color: `${active.color}70` }}
                  >
                    The Full Stack — {active.number}
                  </p>

                  <h2 className="text-2xl font-extrabold leading-tight text-white xl:text-[1.7rem]">
                    {active.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-white/42">
                    {active.detail}
                  </p>

                  {/* Metric block */}
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      background: `${active.color}0a`,
                      border: `1px solid ${active.color}18`,
                    }}
                  >
                    <p
                      className="text-2xl font-black xl:text-3xl"
                      style={{ color: active.color }}
                    >
                      {active.metric}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/38">
                      {active.metricLabel}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-3 py-1 text-[10px] font-semibold"
                        style={{
                          borderColor: "rgba(255,255,255,0.07)",
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MOBILE: Stacked cards ══
          Natural height, no sticky, no blank space risk. */}
      <div
        className="block lg:hidden px-4 py-16"
        style={{ background: "radial-gradient(ellipse 80% 50% at 20% 50%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(167,139,250,0.06) 0%, transparent 50%), #030608" }}
      >
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-400/60">
            The Full Stack
          </p>
          <h2 className="mb-4 text-2xl font-extrabold text-white">
            Your Entire Hiring System —{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
              Powered by Clavo
            </span>
          </h2>
          <p className="text-sm leading-relaxed text-white/40">
            From screening to interviews to reports that help YOU take the final decision —
            Clavo handles your full hiring workflow end-to-end.
          </p>
        </div>

        <div className="mx-auto max-w-sm flex flex-col gap-4">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="rounded-2xl border p-5"
              style={{
                background: "rgba(8,14,22,0.8)",
                borderColor: `${cap.color}20`,
              }}
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${cap.color}15`, color: cap.color }}
                >
                  <cap.Icon size={16} />
                </div>
                <div>
                  <p
                    className="text-[9px] font-black uppercase tracking-widest"
                    style={{ color: `${cap.color}80` }}
                  >
                    {cap.number}
                  </p>
                  <p className="text-sm font-bold text-white">{cap.title}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/42">
                {cap.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cap.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                    style={{ background: `${cap.color}12`, color: `${cap.color}bb` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
