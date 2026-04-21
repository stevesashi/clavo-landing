"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  ArrowRight,
  Brain,
  Play,
  Flag,
  Activity,
  DollarSign,
  BarChart3,
  Video,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MapPin,
  Clock,
  Award,
} from "lucide-react";

// ─── Sample candidate data ────────────────────────────────────────────────────

const RADAR_METRICS: { label: string; multiline?: string[]; value: number; color: string }[] = [
  { label: "Technical Depth",  multiline: ["Technical", "Depth"],  value: 88, color: "#a78bfa" },
  { label: "Communication",                                          value: 92, color: "#67e8f9" },
  { label: "Cultural Fit",     multiline: ["Cultural", "Fit"],      value: 85, color: "#6ee7b7" },
  { label: "Problem Solving",  multiline: ["Problem", "Solving"],   value: 90, color: "#fbbf24" },
  { label: "Leadership",                                             value: 87, color: "#f87171" },
];

const SKILL_BARS = [
  { label: "Technical Depth",    value: 88, color: "#a78bfa" },
  { label: "Communication",      value: 92, color: "#67e8f9" },
  { label: "Cultural Fit",       value: 85, color: "#6ee7b7" },
  { label: "Problem Solving",    value: 90, color: "#fbbf24" },
  { label: "Leadership",         value: 87, color: "#f87171" },
];

const VIDEO_CHAPTERS = [
  { time: "00:00", dur: "3:20", title: "Opening & Background Walk-through" },
  { time: "01:45", dur: "4:15", title: "Technical Problem Solving" },
  { time: "08:10", dur: "2:40", title: "Communication & Soft Skills" },
  { time: "10:25", dur: "3:09", title: "Behavioural Scenario — Team Conflict" },
];

const RED_FLAGS: Array<{ label: string; status: "pass" | "caution" | "fail"; detail: string }> = [
  { label: "Arabic Fluency",          status: "caution", detail: "Not explicitly mentioned — verify in partner round" },
  { label: "Notice Period",           status: "caution", detail: "Not stated — must be confirmed before offer" },
  { label: "Technical Benchmark",     status: "fail",    detail: "Technical score: 0% — Below minimum bar" },
  { label: "Communication Clarity",   status: "pass",    detail: "0 grammar events detected during AI screen" },
  { label: "Odoo / ERP Domain Fit",   status: "fail",    detail: "No Odoo/ERP signals detected" },
];

const STRENGTHS = [
  {
    title: "Reliable Professional Presence",
    detail: "Demonstrated conscientiousness and depth-over-breadth thinking across all interview responses. Speaks with precision and avoids hedging — signals high trust as an independent operator.",
  },
  {
    title: "Strong Stakeholder Communication",
    detail: "Articulate in both Arabic and English. Naturally structures answers in a way that is concise for executives and thorough for technical reviewers. Trusted by C-suite contacts.",
  },
];

const FRICTION = [
  {
    title: "Preference for Independent Work",
    detail: "Strong ATS and sourcing knowledge but shows preference for solo delivery over cross-functional collaboration. May need structured team alignment processes.",
  },
  {
    title: "Limited Agile/Scrum Exposure",
    detail: "No Agile/Scrum methodology signals detected across interview — may require onboarding in sprint-based delivery environments.",
  },
];

// ─── Radar Chart ──────────────────────────────────────────────────────────────

function RadarChartSVG() {
  const size = 176;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 60;
  const n = RADAR_METRICS.length;

  const pt = (i: number, r: number) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridPaths = [0.28, 0.52, 0.76, 1.0].map((level) =>
    Array.from({ length: n }, (_, i) => {
      const p = pt(i, level * maxR);
      return `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    }).join(" ") + " Z"
  );

  const dataPath =
    RADAR_METRICS.map((m, i) => {
      const r = (m.value / 100) * maxR;
      const p = pt(i, r);
      return `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    }).join(" ") + " Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      {/* Grid rings */}
      {gridPaths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {/* Axis spokes */}
      {Array.from({ length: n }, (_, i) => {
        const p = pt(i, maxR);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={p.x} y2={p.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        );
      })}
      {/* Filled polygon */}
      <path
        d={dataPath}
        fill="rgba(124,58,237,0.14)"
        stroke="rgba(124,58,237,0.55)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Data-point dots */}
      {RADAR_METRICS.map((m, i) => {
        const r = (m.value / 100) * maxR;
        const p = pt(i, r);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill={m.color}
            style={{ filter: `drop-shadow(0 0 3px ${m.color}80)` }}
          />
        );
      })}
      {/* Axis labels */}
      {RADAR_METRICS.map((m, i) => {
        const p = pt(i, maxR + 17);
        const lines = m.multiline ?? [m.label];
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill="rgba(255,255,255,0.42)"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="600"
          >
            {lines.map((line, li) => (
              <tspan key={li} x={p.x} dy={li === 0 ? 0 : "1.2em"}>
                {line}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Score Ring ───────────────────────────────────────────────────────────────

function ScoreRing({ score, size = 72 }: { score: number; size?: number }) {
  const r = size * 0.375;
  const circ = 2 * Math.PI * r;
  const sw = size * 0.075;

  return (
    <div
      className="relative shrink-0 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={sw}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="url(#rptRing)"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - score / 100) }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        />
        <defs>
          <linearGradient id="rptRing" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-extrabold leading-none text-white" style={{ fontSize: size * 0.285 }}>
          {score}
        </span>
        <span className="font-semibold text-white/40" style={{ fontSize: size * 0.115 }}>%</span>
      </div>
    </div>
  );
}

// ─── Syntax-coloured code block ───────────────────────────────────────────────

function CodeEditor() {
  const kw = "text-sky-400";       // keywords
  const fn = "text-violet-300";    // function names
  const vr = "text-slate-200";     // variables / identifiers
  const nu = "text-amber-400";     // numbers
  const op = "text-slate-500";     // operators / punctuation

  const lines: ReactNode[] = [
    <><span className={kw}>function </span><span className={fn}>calculateMatchScore</span><span className={op}>(</span><span className={vr}>candidate, requirements</span><span className={op}>{") {"}</span></>,
    <><span className={op}>&nbsp;&nbsp;</span><span className={kw}>const </span><span className={op}>{"{ "}</span><span className={vr}>skills, experience, culturalFit</span><span className={op}>{" } = "}</span><span className={vr}>candidate</span><span className={op}>;</span></>,
    <><span className={op}>&nbsp;&nbsp;</span><span className={kw}>const </span><span className={vr}>skillOverlap</span><span className={op}>{" = "}</span><span className={vr}>skills</span><span className={op}>.filter(</span><span className={vr}>s</span><span className={op}>{" =>"}</span></>,
    <><span className={op}>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className={vr}>requirements</span><span className={op}>.</span><span className={fn}>mustHave</span><span className={op}>.</span><span className={fn}>includes</span><span className={op}>(</span><span className={vr}>s</span><span className={op}>)</span></>,
    <><span className={op}>&nbsp;&nbsp;</span><span className={op}>).</span><span className={fn}>length</span><span className={op}>{" / "}</span><span className={vr}>requirements</span><span className={op}>.</span><span className={fn}>mustHave</span><span className={op}>.</span><span className={fn}>length</span><span className={op}>;</span></>,
    <><span className={op}>&nbsp;&nbsp;</span><span className={kw}>const </span><span className={vr}>expWeight</span><span className={op}>{" = Math.min("}</span></>,
    <><span className={op}>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className={vr}>experience</span><span className={op}>{" / "}</span><span className={vr}>requirements</span><span className={op}>.</span><span className={vr}>minYears</span><span className={op}>{", "}</span><span className={nu}>1.2</span></>,
    <><span className={op}>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className={op}>{");"}</span></>,
    <><span className={op}>&nbsp;&nbsp;</span><span className={kw}>return </span><span className={fn}>Math</span><span className={op}>.</span><span className={fn}>round</span><span className={op}>(</span></>,
    <><span className={op}>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className={op}>(</span><span className={vr}>skillOverlap</span><span className={op}>{" * "}</span><span className={nu}>0.5</span><span className={op}>{" +"}</span></>,
    <><span className={op}>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className={vr}>culturalFit</span><span className={op}>{" * "}</span><span className={nu}>0.3</span><span className={op}>{" +"}</span></>,
    <><span className={op}>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className={vr}>expWeight</span><span className={op}>{" * "}</span><span className={nu}>0.2</span><span className={op}>{")"}</span><span className={op}>{" * "}</span><span className={nu}>100</span></>,
    <><span className={op}>&nbsp;&nbsp;</span><span className={op}>{");"}</span></>,
    <><span className={op}>{"}"}</span></>,
  ];

  return (
    <div
      className="rounded-xl overflow-x-auto"
      style={{
        background: "rgba(3, 5, 10, 0.92)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex flex-col gap-0.5 p-4 font-mono text-[11px] leading-[1.65]">
        {lines.map((line, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="w-5 shrink-0 select-none text-right text-white/18">{i + 1}</span>
            <span className="whitespace-pre">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Red Flag Row ─────────────────────────────────────────────────────────────

const FLAG_CFG = {
  pass: {
    icon: <CheckCircle2 size={13} />,
    color: "#14b8a6",
    bg: "rgba(20,184,166,0.09)",
    border: "rgba(20,184,166,0.22)",
    label: "PASS",
  },
  caution: {
    icon: <AlertTriangle size={13} />,
    color: "#d97706",
    bg: "rgba(217,119,6,0.11)",
    border: "rgba(217,119,6,0.25)",
    label: "CAUTION",
  },
  fail: {
    icon: <XCircle size={13} />,
    color: "#ef4444",
    bg: "rgba(239,68,68,0.10)",
    border: "rgba(239,68,68,0.22)",
    label: "FAIL",
  },
};

function RedFlagRow({
  label,
  status,
  detail,
}: {
  label: string;
  status: "pass" | "caution" | "fail";
  detail: string;
}) {
  const cfg = FLAG_CFG[status];
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3 mb-2 last:mb-0"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      <span className="mt-0.5 shrink-0" style={{ color: cfg.color }}>
        {cfg.icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span className="text-[12px] font-semibold text-white/80">{label}</span>
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
            style={{
              background: `${cfg.color}1a`,
              color: cfg.color,
              border: `1px solid ${cfg.color}35`,
            }}
          >
            {cfg.label}
          </span>
        </div>
        <p className="text-[11px] text-white/38 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

// ─── Expandable behavioral row ────────────────────────────────────────────────

function ExpandableRow({
  title,
  detail,
  variant,
}: {
  title: string;
  detail: string;
  variant: "strength" | "friction";
}) {
  const [open, setOpen] = useState(false);
  const isStrength = variant === "strength";
  const color = isStrength ? "#14b8a6" : "#d97706";
  const Icon = isStrength ? CheckCircle2 : AlertTriangle;

  return (
    <div
      className="mb-2 last:mb-0 overflow-hidden rounded-xl"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <button
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <Icon size={12} className="mt-0.5 shrink-0" style={{ color }} />
        <span className="flex-1 min-w-0 text-[11px] font-semibold text-white/75 truncate">
          {title}
        </span>
        <span className="hidden sm:block text-[10px] text-white/28 truncate max-w-[160px] text-right">
          {detail.slice(0, 42)}…
        </span>
        <ChevronRight
          size={13}
          className="shrink-0 text-white/25 transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div
              className="px-4 pb-3.5 pt-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <p className="text-[12px] leading-relaxed text-white/48 mt-2.5">{detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section helpers ──────────────────────────────────────────────────────────

function SectionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.07] p-4 ${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.02) inset",
      }}
    >
      {children}
    </div>
  );
}

function SectionHead({
  icon,
  title,
  subtitle,
  accent = "#a78bfa",
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  accent?: string;
}) {
  return (
    <div className="mb-3.5">
      <div className="flex items-center gap-2 mb-0.5">
        <span aria-hidden="true" style={{ color: accent, opacity: 0.85 }}>
          {icon}
        </span>
        <span className="text-[13px] font-bold text-white/88">{title}</span>
      </div>
      {subtitle && (
        <p className="ml-[22px] text-[10px] text-white/30 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export interface Candidate360Props {
  open: boolean;
  onClose: () => void;
}

export default function Candidate360ReportPreview({
  open,
  onClose,
}: Candidate360Props) {
  const shouldReduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset scroll on open
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open]);

  const passCount    = RED_FLAGS.filter((f) => f.status === "pass").length;
  const cautionCount = RED_FLAGS.filter((f) => f.status === "caution").length;
  const failCount    = RED_FLAGS.filter((f) => f.status === "fail").length;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="r360-backdrop"
            className="fixed inset-0 z-[300]"
            style={{
              background: "rgba(1, 2, 7, 0.88)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Panel ── */}
          <motion.div
            key="r360-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Daniel Reed — 360° Intelligence Report"
            className="fixed inset-y-0 right-0 z-[301] flex w-full flex-col md:max-w-[760px]"
            style={{
              background: "linear-gradient(165deg, #080613 0%, #060410 55%, #070513 100%)",
              borderLeft: "1px solid rgba(139,92,246,0.22)",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.6)",
            }}
            initial={shouldReduce ? { opacity: 0 } : { x: "100%" }}
            animate={shouldReduce ? { opacity: 1 } : { x: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { x: "100%" }}
            transition={
              shouldReduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 280, damping: 30, mass: 0.9 }
            }
          >
            {/* Top purple glow line */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(139,92,246,0.75) 40%, rgba(34,211,238,0.55) 72%, transparent)",
              }}
            />

            {/* ══ TOP NAV BAR ══════════════════════════════════════════════ */}
            <div
              className="flex shrink-0 items-center justify-between gap-3 px-5 py-3"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.018)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full bg-purple-500/50"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Candidate 360° Intelligence Audit
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium text-white/28">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/55" />
                  Clavo AI Audit
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close report"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.04] text-white/32 transition-colors hover:bg-white/[0.08] hover:text-white/72 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* ══ HERO HEADER ══════════════════════════════════════════════ */}
            <div
              className="shrink-0 px-5 pt-4 pb-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-start gap-4">
                {/* Score ring */}
                <ScoreRing score={91} size={72} />

                {/* Identity block */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)" }}
                      aria-hidden="true"
                    >
                      DR
                    </div>
                    <h2 className="text-[15px] font-bold text-white/95 leading-tight">
                      Daniel Reed
                    </h2>
                    <span className="text-[12px] font-medium text-white/42">
                      TA Corporate &amp; Technical
                    </span>
                    <span
                      className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold text-amber-300"
                      style={{
                        borderColor: "rgba(251,191,36,0.30)",
                        background: "rgba(251,191,36,0.09)",
                      }}
                    >
                      High-Value Target
                    </span>
                  </div>

                  <p className="text-[11px] text-white/38 mb-2 ml-0.5">
                    Senior Candidate
                  </p>

                  {/* Stats chips row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 ml-0.5">
                    {[
                      { label: "AI Score",  value: "91% Match" },
                      { label: "Status",    value: "Active" },
                      { label: "Stage",     value: "AI Screened" },
                      { label: "Technical", value: "94%" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center gap-1">
                        <span className="text-[9px] text-white/28 uppercase tracking-wide">
                          {label}:
                        </span>
                        <span className="text-[10px] font-semibold text-white/62">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Personality Orb — desktop only */}
                <div
                  className="hidden lg:block shrink-0 w-[172px] rounded-xl p-3.5"
                  style={{
                    background: "rgba(139,92,246,0.07)",
                    border: "1px solid rgba(139,92,246,0.22)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Brain size={11} className="text-purple-400" aria-hidden="true" />
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-purple-400/65">
                      AI Personality Orb
                    </span>
                  </div>
                  <p className="text-[11px] leading-[1.65] text-white/50">
                    Daniel radiates quiet confidence — deliberate in answers, never
                    verbose. Their technical cadence signals a builder who has
                    shipped real systems under pressure. The AI detected a
                    results-first personality with high ownership and low ego.
                  </p>
                </div>
              </div>

              {/* Tab strip */}
              <div className="mt-3.5 flex gap-1">
                {["Intelligence Report", "Raw AI Notes"].map((tab, i) => (
                  <button
                    key={tab}
                    className={`rounded-lg px-3.5 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 ${
                      i === 0
                        ? "border border-purple-400/25 bg-purple-500/18 text-purple-200"
                        : "text-white/30 hover:text-white/55"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* ══ SCROLLABLE CONTENT ═══════════════════════════════════════ */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(139,92,246,0.18) transparent",
              }}
            >

              {/* ── ROW 1: Radar + Technical Evidence ── */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* Big 5 Performance Radar */}
                <SectionCard>
                  <SectionHead
                    icon={<BarChart3 size={13} />}
                    title="Big 5 Performance Radar"
                    subtitle="AI-derived competency analysis"
                    accent="#a78bfa"
                  />
                  <div className="flex justify-center mb-3">
                    <RadarChartSVG />
                  </div>
                  <div className="space-y-2.5">
                    {SKILL_BARS.map((bar) => (
                      <div key={bar.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-white/42">{bar.label}</span>
                          <span
                            className="text-[10px] font-bold"
                            style={{ color: bar.color }}
                          >
                            {bar.value}%
                          </span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${bar.color}55, ${bar.color})`,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${bar.value}%` }}
                            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* Technical Evidence — Studio Snippet */}
                <SectionCard>
                  <SectionHead
                    icon={
                      <span className="font-mono text-[12px] font-bold leading-none">{`</>`}</span>
                    }
                    title="Technical Evidence — Studio Snippet"
                    subtitle="Best logic extracted from interview session"
                    accent="#67e8f9"
                  />
                  <CodeEditor />
                  {/* AI Annotation */}
                  <div
                    className="mt-3 rounded-xl p-3"
                    style={{
                      background: "rgba(139,92,246,0.07)",
                      border: "1px solid rgba(139,92,246,0.20)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-purple-400/75 text-[11px]" aria-hidden="true">✦</span>
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-purple-400/65">
                        AI Annotation
                      </span>
                    </div>
                    <p className="text-[11px] leading-[1.65] text-white/48">
                      Clean functional decomposition. Weighted scoring shows systems
                      thinking — balancing multiple dimensions without
                      over-engineering.
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-purple-400/55 text-[10px]">✦</span>
                      <span className="text-[10px] font-semibold text-purple-400/58">
                        Quality: Senior-grade
                      </span>
                    </div>
                  </div>
                </SectionCard>
              </div>

              {/* ── ROW 2: Video Vault + Financial Pulse ── */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* Video Intelligence Vault */}
                <SectionCard>
                  <SectionHead
                    icon={<Video size={13} />}
                    title="Video Intelligence Vault"
                    subtitle="Full interview recording with AI chapter navigation"
                    accent="#67e8f9"
                  />

                  {/* Video placeholder */}
                  <div
                    className="flex aspect-video w-full items-center justify-center rounded-xl mb-3"
                    style={{
                      background: "rgba(4, 6, 14, 0.92)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex flex-col items-center gap-2.5 text-center">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{
                          background: "rgba(99,102,241,0.12)",
                          border: "1px solid rgba(99,102,241,0.22)",
                        }}
                        aria-hidden="true"
                      >
                        <Play size={20} className="translate-x-0.5 text-indigo-300/55" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-white/42">
                          Video Not Available
                        </p>
                        <p className="text-[10px] text-white/25 mt-0.5">
                          Interview recording pending processing
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chapter list */}
                  <div>
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-white/22">
                      AI Chapters
                    </p>
                    <div>
                      {VIDEO_CHAPTERS.map((ch, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 hover:bg-white/[0.03] cursor-pointer transition-colors"
                          style={{
                            borderBottom:
                              i < VIDEO_CHAPTERS.length - 1
                                ? "1px solid rgba(255,255,255,0.04)"
                                : "none",
                          }}
                        >
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/55"
                            aria-hidden="true"
                          />
                          <span className="flex-1 text-[11px] text-white/52">
                            {ch.title}
                          </span>
                          <span className="shrink-0 font-mono text-[10px] font-bold text-cyan-400/68">
                            {ch.time}
                          </span>
                          <span className="shrink-0 font-mono text-[10px] text-white/25">
                            {ch.dur}
                          </span>
                          <ChevronRight
                            size={11}
                            className="shrink-0 text-white/18"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>

                {/* Financial Market Pulse */}
                <SectionCard className="flex flex-col">
                  <SectionHead
                    icon={<DollarSign size={13} />}
                    title="Financial Market Pulse"
                    subtitle="Compensation alignment vs. job budget"
                    accent="#6ee7b7"
                  />

                  <div
                    className="flex flex-1 flex-col justify-center gap-3 rounded-xl p-4"
                    style={{
                      background: "rgba(4,6,14,0.72)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {[
                      { label: "Candidate Salary", value: "$85,000 / yr", color: "#6ee7b7", border: "rgba(110,231,183,0.22)", bg: "rgba(110,231,183,0.07)" },
                      { label: "Job Budget",        value: "$95,000 / yr", color: "#a78bfa", border: "rgba(167,139,250,0.25)", bg: "rgba(167,139,250,0.07)" },
                      { label: "Market Average",    value: "$90,000 / yr", color: "#67e8f9", border: "rgba(103,232,249,0.22)", bg: "rgba(103,232,249,0.06)" },
                    ].map(({ label, value, color, border, bg }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-xl px-4 py-3.5"
                        style={{ border: `1px solid ${border}`, background: bg }}
                      >
                        <p className="text-[11px] font-semibold text-white/50">{label}</p>
                        <p className="text-[13px] font-bold" style={{ color }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>

              {/* ── Red Flag Audit ── */}
              <SectionCard>
                <SectionHead
                  icon={<Flag size={13} />}
                  title="Red Flag Audit"
                  subtitle="Pass / Fail / Caution screening criteria"
                  accent="#f87171"
                />
                <div>
                  {RED_FLAGS.map((flag) => (
                    <RedFlagRow key={flag.label} {...flag} />
                  ))}
                </div>
                {/* Summary tally */}
                <div className="mt-3.5 flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-teal-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    {passCount} PASS
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    {cautionCount} CAUTION
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-red-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    {failCount} FAIL
                  </span>
                </div>
              </SectionCard>

              {/* ── Behavioral Intelligence — Forensic Breakdown ── */}
              <SectionCard>
                <SectionHead
                  icon={<Activity size={13} />}
                  title="Behavioral Intelligence — Forensic Breakdown"
                  subtitle="Click any item to expand the full AI analysis with evidence from the interview"
                  accent="#6ee7b7"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Key Strengths */}
                  <div>
                    <div className="mb-2.5 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden="true" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-teal-400/68">
                        Key Strengths
                      </span>
                      <span className="text-[9px] text-white/22">— click to expand</span>
                    </div>
                    {STRENGTHS.map((s) => (
                      <ExpandableRow
                        key={s.title}
                        title={s.title}
                        detail={s.detail}
                        variant="strength"
                      />
                    ))}
                  </div>

                  {/* Potential Friction Points */}
                  <div>
                    <div className="mb-2.5 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400/68">
                        Potential Friction Points
                      </span>
                      <span className="text-[9px] text-white/22">— click to expand</span>
                    </div>
                    {FRICTION.map((f) => (
                      <ExpandableRow
                        key={f.title}
                        title={f.title}
                        detail={f.detail}
                        variant="friction"
                      />
                    ))}
                  </div>
                </div>

                {/* Communication Index */}
                <div
                  className="mt-4 flex items-center justify-between pt-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span className="flex items-center gap-1.5 text-[10px] text-white/28">
                    <span aria-hidden="true">💬</span>
                    Communication Index
                  </span>
                  <span className="text-[11px] font-bold text-white/38">92%</span>
                </div>
              </SectionCard>

              {/* Bottom spacer */}
              <div className="h-2" />
            </div>

            {/* ══ FOOTER CTA ════════════════════════════════════════════════ */}
            <div
              className="shrink-0 px-5 py-4"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(5, 7, 13, 0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <p className="mb-3 text-center text-[11px] leading-relaxed text-white/32">
                See how Clavo evaluates your candidates across screening,
                interviews, and 360° intelligence.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <motion.a
                  href="#demo"
                  onClick={onClose}
                  aria-label="Book a live demo of Clavo AI"
                  className="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                  style={{
                    background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                    boxShadow: "0 0 20px rgba(217,119,6,0.35)",
                    touchAction: "manipulation",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(217,119,6,0.55)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  Book a Live Demo
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-150 group-hover:translate-x-0.5"
                  />
                </motion.a>
                <motion.a
                  href="#features"
                  onClick={onClose}
                  aria-label="See Clavo AI in action"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white/52 transition-colors hover:border-white/20 hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                  style={{ touchAction: "manipulation" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  See Clavo in Action
                </motion.a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
