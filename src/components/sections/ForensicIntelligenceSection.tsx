"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Clock, TrendingUp, TrendingDown, Users, AlertTriangle,
  ArrowRight, Building2, Activity, Zap, Target, Radio,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1.8, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.5 });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!inView || shouldReduce) { setCount(target); return; }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setCount(
        decimals > 0
          ? parseFloat((eased * target).toFixed(decimals))
          : Math.floor(eased * target),
      );
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, decimals, shouldReduce]);

  return { count, ref };
}

// ─── Shared card style ────────────────────────────────────────────────────────

const CARD =
  "relative overflow-hidden rounded-2xl border border-white/[0.08] p-5";
const CARD_BG: React.CSSProperties = {
  background: "rgba(10,8,20,0.80)",
  boxShadow: "0 0 20px rgba(139,92,246,0.04)",
  transition: "all 0.3s ease",
};

// ─── Radial Gauge ─────────────────────────────────────────────────────────────

function RadialGauge({
  value, max, color, unit,
}: { value: number; max: number; color: string; unit: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.5 });
  const r = 38;
  const cx = 48, cy = 48;
  const circumference = 2 * Math.PI * r;
  // show "time saved" as filled portion
  const progress = (max - value) / max;

  return (
    <div ref={wrapRef} className="relative flex items-center justify-center w-24 h-24">
      <svg width={96} height={96} viewBox="0 0 96 96" className="absolute inset-0">
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={6} />
        <motion.circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: inView ? circumference * (1 - progress) : circumference }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            rotate: "-90deg",
            filter: `drop-shadow(0 0 6px ${color}99)`,
          }}
        />
      </svg>
      <div className="relative flex flex-col items-center leading-none">
        <span className="text-xl font-black text-white"
          style={{ textShadow: `0 0 12px ${color}88` }}>
          {value}
        </span>
        <span className="text-[9px] font-semibold mt-0.5" style={{ color }}>
          {unit}
        </span>
      </div>
    </div>
  );
}

// ─── Line chart (SVG) ─────────────────────────────────────────────────────────

// Chart dimensions
const VW = 380, VH = 128;
const PL = 38, PT = 12, PR = 10, PB = 30;
// px = PL + (i/9)*(VW-PL-PR)

function px(i: number) { return PL + (i / 9) * (VW - PL - PR); }

// Hours saved trend (10 weeks, rising sharply)
const HOURS_Y_RAW = [150, 230, 330, 445, 570, 710, 860, 1000, 1130, 1245];
const H_MAX = 1245;
function hy(v: number) { return PT + (VH - PT - PB) - ((v / H_MAX) * (VH - PT - PB)); }

// Candidates screened (gradual rise, lower band)
const CANDS_Y_RAW = [82, 90, 99, 107, 114, 120, 125, 129, 132, 134];
function cy2(v: number) {
  const min = 82, max = 134;
  return VH - PB - 2 - ((v - min) / (max - min)) * 26;
}

const HOURS_PTS = HOURS_Y_RAW.map((v, i) => [px(i), hy(v)] as [number, number]);
const CANDS_PTS = CANDS_Y_RAW.map((v, i) => [px(i), cy2(v)] as [number, number]);

function polyPath(pts: [number, number][]) {
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}
function areaPath(pts: [number, number][], baseY: number) {
  return (
    polyPath(pts) +
    ` L${pts[pts.length - 1][0].toFixed(1)},${baseY} L${pts[0][0].toFixed(1)},${baseY} Z`
  );
}

const HOURS_LINE = polyPath(HOURS_PTS);
const CANDS_LINE = polyPath(CANDS_PTS);
const HOURS_AREA = areaPath(HOURS_PTS, VH - PB);
const CANDS_AREA = areaPath(CANDS_PTS, VH - PB);

const Y_GRID = [
  { y: hy(0),    label: "0" },
  { y: hy(400),  label: "400h" },
  { y: hy(800),  label: "800h" },
  { y: hy(1200), label: "1.2k" },
];
const X_TICKS = [0, 2, 4, 6, 8].map((i) => ({
  x: px(i),
  label: `W${i + 1}`,
}));

function LineChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.3 });

  return (
    <div ref={wrapRef} className="w-full">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full h-auto"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="hGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.01" />
          </linearGradient>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Horizontal grid */}
        {Y_GRID.map(({ y, label }) => (
          <g key={label}>
            <line x1={PL} y1={y} x2={VW - PR} y2={y}
              stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} strokeDasharray="3,4" />
            <text x={PL - 4} y={y + 3} textAnchor="end" fontSize={7}
              fill="rgba(255,255,255,0.25)">{label}</text>
          </g>
        ))}

        {/* X-axis baseline */}
        <line x1={PL} y1={VH - PB} x2={VW - PR} y2={VH - PB}
          stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />

        {/* X-axis ticks */}
        {X_TICKS.map(({ x, label }) => (
          <text key={label} x={x} y={VH - PB + 12} textAnchor="middle"
            fontSize={7} fill="rgba(255,255,255,0.25)">{label}</text>
        ))}

        {/* Area fills */}
        <motion.path d={CANDS_AREA} fill="url(#cGrad)"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.9, delay: 1.0 }} />
        <motion.path d={HOURS_AREA} fill="url(#hGrad)"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.9, delay: 0.8 }} />

        {/* Candidates line */}
        <motion.path
          d={CANDS_LINE}
          fill="none" stroke="#818cf8" strokeWidth={1.5}
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
        />

        {/* Hours line */}
        <motion.path
          d={HOURS_LINE}
          fill="none" stroke="#a78bfa" strokeWidth={2.2}
          strokeLinecap="round" strokeLinejoin="round"
          filter="url(#lineGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
          transition={{ duration: 2.0, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Dots on hours line */}
        {HOURS_PTS.map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r={2.8} fill="#a78bfa"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.17, type: "spring", stiffness: 400 }}
            style={{ filter: "drop-shadow(0 0 3px rgba(167,139,250,0.8))" }}
          />
        ))}

        {/* Last dot highlight */}
        {inView && (
          <circle
            cx={HOURS_PTS[9][0]} cy={HOURS_PTS[9][1]} r={5} fill="none"
            stroke="#a78bfa" strokeWidth={1.2} strokeOpacity={0.5}
          />
        )}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex items-center gap-5 px-1">
        <div className="flex items-center gap-1.5">
          <span className="block h-0.5 w-5 rounded"
            style={{ background: "#a78bfa", boxShadow: "0 0 4px rgba(167,139,250,0.7)" }} />
          <span className="text-[10px] text-white/38">Recruiter Hours</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="block h-0.5 w-5 rounded" style={{ background: "#818cf8" }} />
          <span className="text-[10px] text-white/38">Candidates Screened</span>
        </div>
      </div>
    </div>
  );
}

// ─── Pipeline bar ─────────────────────────────────────────────────────────────

function PipelineBar({
  label, value, pct, color, icon, delay,
}: {
  label: string; value: string; pct: number;
  color: string; icon?: React.ReactNode; delay: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-medium text-white/55">{label}</span>
        <div className="flex items-center gap-1.5 text-white/28">
          {icon}
          <span>{value}</span>
        </div>
      </div>
      <div className="relative h-7 overflow-hidden rounded-lg bg-white/[0.04]">
        <motion.div
          className="absolute inset-y-0 left-0 flex items-center rounded-lg pl-3"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, delay, ease: "easeOut" }}
        >
          <span className="text-[10px] font-bold text-black/65 whitespace-nowrap">{value}</span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Bottleneck row ───────────────────────────────────────────────────────────

function BottleneckRow({
  rank, role, detail, tag, severity,
}: {
  rank: number; role: string; detail: string;
  tag: string; severity: "high" | "medium";
}) {
  const tagColor =
    severity === "high"
      ? { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.35)", text: "#f87171" }
      : { bg: "rgba(147,51,234,0.10)", border: "rgba(147,51,234,0.30)", text: "#c084fc" };

  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-bold text-white/40">
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold text-white/80 truncate">{role}</p>
        <p className="mt-0.5 text-[10px] leading-relaxed text-white/35 line-clamp-1">{detail}</p>
      </div>
      <span
        className="shrink-0 rounded-full border px-2.5 py-0.5 text-[9px] font-bold whitespace-nowrap"
        style={{ background: tagColor.bg, borderColor: tagColor.border, color: tagColor.text }}
      >
        {tag}
      </span>
    </div>
  );
}

// ─── Card fade-in wrapper ─────────────────────────────────────────────────────

function FadeCard({
  children, delay = 0, className = "", style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 200, damping: 26, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ForensicIntelligenceSection() {
  const fireCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = fireCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drops = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 30 + 10,
      speedY: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      width: Math.random() * 1.5 + 0.5,
      hue: Math.random() > 0.5 ? '167,139,250' : '192,132,252',
    }));

    let animId: number;
    let lastTime = 0;
    const frameInterval = 1000 / 30;
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drops.forEach(d => {
          d.y += d.speedY;
          d.x += d.speedX;
          if (d.y > canvas.height) {
            d.y = -d.length;
            d.x = Math.random() * canvas.width;
          }
          const gradient = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
          gradient.addColorStop(0, `rgba(${d.hue},${d.opacity})`);
          gradient.addColorStop(0.5, `rgba(${d.hue},${d.opacity * 0.6})`);
          gradient.addColorStop(1, `rgba(${d.hue},0)`);
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x, d.y + d.length);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = d.width;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.width + 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${d.hue},${d.opacity * 1.5})`;
          ctx.fill();
        });
        lastTime = currentTime;
      }
      animId = requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { animId = requestAnimationFrame(animate); }
        else { cancelAnimationFrame(animId); }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      aria-labelledby="forensic-heading"
      className="relative overflow-hidden px-4 py-24"
    >
      {/* Background image — Ken Burns */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <img
          src="/solar-bg-forensic.jpg"
          alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "top center",
            animation: "kenBurnsForensic 40s ease-in-out infinite",
          }}
        />
      </div>

      {/* Purple tint overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        pointerEvents: "none",
        background: "linear-gradient(135deg, rgba(88,28,220,0.55) 0%, rgba(124,58,237,0.45) 40%, rgba(167,139,250,0.35) 70%, rgba(196,181,253,0.2) 100%)",
        mixBlendMode: "color" as any,
      }}/>

      {/* Dark overlay for text readability */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(to bottom, rgba(3,6,8,0.85) 0%, rgba(3,6,8,0.7) 40%, rgba(3,6,8,0.7) 60%, rgba(3,6,8,0.85) 100%)",
        pointerEvents: "none",
      }}/>

      {/* Fire drip canvas */}
      <canvas
        ref={fireCanvasRef}
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 3,
        }}
      />

      {/* Top fade */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "200px",
        background: "linear-gradient(to bottom, #030608, transparent)",
        pointerEvents: "none", zIndex: 4,
      }} />

      {/* Bottom fade */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "200px",
        background: "linear-gradient(to top, #030608, transparent)",
        pointerEvents: "none", zIndex: 4,
      }} />

      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 65%)" }} />
        <div className="absolute right-1/4 bottom-1/3 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-6">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <AnimatedSection>
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400/55">
            From CV to CEO-level hiring decisions
          </p>
          <h2
            id="forensic-heading"
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ lineHeight: 1.1, letterSpacing: "-0.02em", textShadow: "0 0 60px rgba(167,139,250,0.15)" }}
          >
            Forensic Hiring{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/38">
            Real-time operational data from active Clavo deployments — the same dashboard your
            hiring team sees live.
          </p>
        </motion.div>
        </AnimatedSection>

        {/* ── ROW 1 — 4 metric cards ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* Hours Saved */}
          <AnimatedSection delay={0.1}>
          <FadeCard delay={0} className="relative overflow-hidden rounded-2xl" style={{
            ...CARD_BG,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "24px 28px",
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase", marginBottom: 12,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <Clock size={13} style={{ color: "rgba(167,139,250,0.7)" }} /> TOTAL HOURS SAVED
            </div>
            <div style={{
              fontSize: 48, fontWeight: 900, color: "#a78bfa",
              lineHeight: 1, letterSpacing: -2, marginBottom: 8,
            }}>
              1,245
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              Recruiter hours saved
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>
              Screenings fully automated
            </div>
          </FadeCard>
          </AnimatedSection>

          {/* Avg Time to Fill */}
          <AnimatedSection delay={0.2}>
          <FadeCard delay={0.08} className={CARD} style={CARD_BG}>
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(6,182,212,0.5) 50%,transparent)" }} />
            <div className="mb-2 flex items-center gap-2">
              <Target size={13} style={{ color: "rgba(6,182,212,0.7)" }} />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
                Avg Time to Fill
              </span>
            </div>
            <div className="flex items-center gap-4">
              <RadialGauge value={19.5} max={40} color="#06b6d4" unit="Days" />
              <div className="flex flex-col gap-1.5">
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "rgba(6,182,212,0.1)", color: "#06b6d4" }}>
                  On Track
                </span>
                <span className="text-[10px] text-white/30">Market avg:</span>
                <span className="text-[11px] font-bold text-white/50">40 Days</span>
              </div>
            </div>
          </FadeCard>
          </AnimatedSection>

          {/* High-Match Rate */}
          <AnimatedSection delay={0.3}>
          <FadeCard delay={0.16} className="relative overflow-hidden rounded-2xl" style={{
            ...CARD_BG,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "24px 28px",
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase", marginBottom: 12,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <TrendingUp size={13} style={{ color: "rgba(167,139,250,0.7)" }} /> HIGH-MATCH RATE
            </div>
            <div style={{
              fontSize: 48, fontWeight: 900, color: "#a78bfa",
              lineHeight: 1, letterSpacing: -2, marginBottom: 8,
            }}>
              29%
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              Top candidate match rate
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>
              Avg match score for top 5
            </div>
          </FadeCard>
          </AnimatedSection>

          {/* Candidates Processed */}
          <AnimatedSection delay={0.4}>
          <FadeCard delay={0.24} className="relative overflow-hidden rounded-2xl" style={{
            ...CARD_BG,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "24px 28px",
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase", marginBottom: 12,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <Users size={13} style={{ color: "rgba(167,139,250,0.7)" }} /> CANDIDATES PROCESSED
            </div>
            <div style={{
              fontSize: 48, fontWeight: 900, color: "#a78bfa",
              lineHeight: 1, letterSpacing: -2, marginBottom: 8,
            }}>
              10K+
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              Across all active roles
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>
              GCC pipelines
            </div>
          </FadeCard>
          </AnimatedSection>
        </div>

        {/* ── ROW 2 — Line chart + Pipeline ───────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">

          {/* Line chart */}
          <AnimatedSection delay={0.2} direction="scale">
          <FadeCard delay={0.05} className={CARD} style={CARD_BG}>
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(147,51,234,0.45) 50%,transparent)" }} />
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Pipeline Efficiency &amp; Cost Savings
                </p>
                <h3 className="text-sm font-bold text-white/80">Recruiter Hours Saved Trend</h3>
              </div>
              <span className="rounded-full border border-amber-400/20 bg-purple-400/08 px-2.5 py-1 text-[10px] font-semibold text-purple-400">
                ↑ +730% / 10wk
              </span>
            </div>
            <LineChart />
          </FadeCard>
          </AnimatedSection>

          {/* Pipeline Health */}
          <AnimatedSection delay={0.3} direction="right">
          <FadeCard delay={0.12} className={CARD} style={CARD_BG}>
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(167,139,250,0.45) 50%,transparent)" }} />
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/30">
              Portfolio Pipeline Health Status
            </p>
            <h3 className="mb-5 text-sm font-bold text-white/80">Pipeline Efficiency</h3>

            <div className="space-y-4">
              <PipelineBar
                label="5 pipelines"
                value="5 Active Pipelines"
                pct={88}
                color="linear-gradient(90deg, #a78bfa, #7c3aed)"
                delay={0.1}
              />
              <PipelineBar
                label="2 roles"
                value="2 Roles Filled"
                icon={<span style={{ color: "#f0a500" }}>✓</span>}
                pct={40}
                color="linear-gradient(90deg, #f0a500, #d97706)"
                delay={0.22}
              />
              <PipelineBar
                label="3 roles"
                value="3 Roles Interviewing"
                icon={<Users size={11} />}
                pct={60}
                color="linear-gradient(90deg, #a78bfa, #7c3aed)"
                delay={0.34}
              />
            </div>

            {/* Mini stat row */}
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.05] pt-4">
              {[
                { v: "91%", l: "Fill Rate" },
                { v: "4h",  l: "Screen Time" },
                { v: "15d", l: "Avg TtH" },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <p className="text-sm font-extrabold text-white/80">{v}</p>
                  <p className="text-[9px] text-white/28">{l}</p>
                </div>
              ))}
            </div>
          </FadeCard>
          </AnimatedSection>
        </div>

        {/* ── ROW 3 — Bottlenecks + CEO Insight ───────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Bottleneck table */}
          <AnimatedSection delay={0.2} direction="left">
          <FadeCard delay={0.05} className={CARD} style={CARD_BG}>
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(239,68,68,0.4) 50%,transparent)" }} />
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-400/70" />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                Critical Bottleneck Flagging
              </p>
            </div>
            <h3 className="mb-1 text-sm font-bold text-white/80">&apos;Critical Roles with Bottlenecks&apos;</h3>
            <p className="mb-4 text-[10px] text-white/25 italic">[Live User Summary]</p>

            {/* Table header */}
            <div className="mb-2 grid grid-cols-[auto_1fr_auto] gap-3 px-4 text-[9px] font-semibold uppercase tracking-widest text-white/25">
              <span>Rank</span>
              <span>Role</span>
              <span>Warning</span>
            </div>

            <div className="space-y-2">
              <BottleneckRow rank={1}
                role="Senior Backend Engineer"
                detail="7 yrs exp, GCC market, Arabic & English required"
                tag="Arabic Scarcity"
                severity="high" />
              <BottleneckRow rank={2}
                role="Senior Recruiter"
                detail="6 yrs exp, ATS & Stakeholder mgmt, OOoo proficiency"
                tag="ATS Systems Scarcity"
                severity="high" />
              <BottleneckRow rank={3}
                role="Product Manager"
                detail="OKR experience, cross-functional stakeholder alignment"
                tag="Interview Delays"
                severity="medium" />
            </div>
          </FadeCard>
          </AnimatedSection>

          {/* CEO Strategic Action Summary */}
          <AnimatedSection delay={0.3} direction="right">
          <FadeCard
            delay={0.14}
            className={`${CARD} group`}
            style={CARD_BG}
          >
            {/* Top streak */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
              style={{ background: "linear-gradient(90deg,transparent,rgba(167,139,250,0.55) 50%,transparent)" }} />
            {/* Ambient hover glow */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.08) 0%, transparent 65%)" }} />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "rgba(167,139,250,0.12)" }}>
                  <Zap size={13} style={{ color: "#a78bfa" }} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(167,139,250,0.6)" }}>
                    AI Executive Insight
                  </p>
                  <p className="text-[9px] text-white/25 italic">[Live Summary]</p>
                </div>
              </div>

              <h3 className="mb-3 text-sm font-bold text-white/85">CEO Strategic Action Summary</h3>

              <p className="text-[13px] leading-relaxed text-white/62">
                Talent scarcity detected for{" "}
                <span className="font-semibold text-purple-300/85">backend engineering</span> across
                GCC. Limited qualified candidates and high competitor demand are slowing
                pipeline velocity by{" "}
                <span className="font-semibold text-red-400/85">34%</span>. Arabic &amp; English
                fluency requirements limiting the candidate pool.
              </p>

              <div className="mt-4 space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(167,139,250,0.5)" }}>
                  Recommended Actions
                </p>
                {[
                  "Expand sourcing channels to MENA universities",
                  "Adjust compensation benchmarks +12%",
                  "Prioritise high-intent passive candidates earlier",
                ].map((action) => (
                  <div key={action} className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(167,139,250,0.6)" }} />
                    <span className="text-[11px] text-white/50">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeCard>
          </AnimatedSection>
        </div>

        {/* ── ROW 4 — Competitor Activity + Hiring Speed ──────────────────── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Competitor Activity */}
          <FadeCard delay={0.05} className={CARD} style={CARD_BG}>
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(167,139,250,0.4) 50%,transparent)" }} />
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio size={13} style={{ color: "rgba(167,139,250,0.7)" }} />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                    Market Intelligence
                  </p>
                  <h3 className="text-sm font-bold text-white/80">Competitor Activity</h3>
                </div>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[9px] font-bold text-red-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                LIVE
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                { icon: "↑", color: "#ef4444", text: "TechCorp increased engineering hiring by 35% in Q2", time: "2h ago" },
                { icon: "→", color: "#9333ea", text: "Top Backend candidates trending toward FinServ sector", time: "5h ago" },
                { icon: "!", color: "#a78bfa", text: "Surge demand: Backend, ML, DevOps — GCC-wide", time: "8h ago" },
                { icon: "↓", color: "#22d3ee", text: "Avg offer-to-accept window compressed to 4.2 days", time: "12h ago" },
              ].map(({ icon, color, text, time }) => (
                <div key={text} className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.025] px-3.5 py-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black"
                    style={{ background: `${color}15`, color }}>
                    {icon}
                  </span>
                  <p className="flex-1 text-[11px] leading-snug text-white/55">{text}</p>
                  <span className="shrink-0 text-[9px] text-white/22 mt-0.5">{time}</span>
                </div>
              ))}
            </div>
          </FadeCard>

          {/* Hiring Speed vs Market */}
          <FadeCard delay={0.14} className={CARD} style={CARD_BG}>
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(167,139,250,0.4) 50%,transparent)" }} />
            <div className="mb-4 flex items-center gap-2">
              <Activity size={13} style={{ color: "rgba(167,139,250,0.7)" }} />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Benchmarking
                </p>
                <h3 className="text-sm font-bold text-white/80">Hiring Speed vs Market</h3>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { label: "Time to Fill", clavo: "15 Days", industry: "40 Days", clavoW: 38, indW: 100, color: "#a78bfa" },
                { label: "Screening Time", clavo: "4 Hrs", industry: "12 Hrs", clavoW: 33, indW: 100, color: "#a78bfa" },
                { label: "Offer Acceptance", clavo: "87%", industry: "72%", clavoW: 87, indW: 72, color: "#a78bfa" },
              ].map(({ label, clavo, industry, clavoW, indW, color }, idx) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white/55">{label}</span>
                    <span className="text-[10px] text-white/28">vs market</span>
                  </div>
                  {/* Clavo row */}
                  <div className="flex items-center gap-2">
                    <span className="w-[52px] shrink-0 text-right text-[10px] font-semibold text-white/40">Clavo</span>
                    <div className="relative flex-1 h-5 overflow-hidden rounded-lg bg-white/[0.04]">
                      <motion.div
                        className="absolute inset-y-0 left-0 flex items-center rounded-lg pl-2"
                        style={{ background: `linear-gradient(90deg, ${color}aa, ${color})`, boxShadow: `0 0 10px ${color}50` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${clavoW}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.0, delay: 0.1 + idx * 0.12, ease: "easeOut" }}
                      >
                        <span className="text-[9px] font-bold text-black/65 whitespace-nowrap">{clavo}</span>
                      </motion.div>
                    </div>
                  </div>
                  {/* Industry row */}
                  <div className="flex items-center gap-2">
                    <span className="w-[52px] shrink-0 text-right text-[10px] text-white/22">Industry</span>
                    <div className="relative flex-1 h-5 overflow-hidden rounded-lg bg-white/[0.04]">
                      <motion.div
                        className="absolute inset-y-0 left-0 flex items-center rounded-lg pl-2 bg-white/[0.08]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${indW}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.0, delay: 0.2 + idx * 0.12, ease: "easeOut" }}
                      >
                        <span className="text-[9px] text-white/30 whitespace-nowrap">{industry}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeCard>
        </div>

        {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
        <motion.div
          className="mt-4 flex flex-col items-center gap-5 pt-8 text-center border-t border-white/[0.05]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.1 }}
        >
          <p className="text-xl font-semibold text-white/60">
            Turn hiring data into{" "}
            <span className="font-bold text-white/90">hiring decisions</span>
          </p>
          <motion.a
            href="/book-demo"
            aria-label="Book a Live Demo — see Clavo Intelligence live"
            className="group inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
              boxShadow: "0 0 24px rgba(139,92,246,0.40)",
              touchAction: "manipulation",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(139,92,246,0.65)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 22 }}
          >
            Book a Live Demo
            <ArrowRight size={14} aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
