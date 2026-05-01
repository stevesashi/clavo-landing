"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TrendingDown, TrendingUp, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

// ─── Count-up hook ───────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1.8, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!inView || shouldReduce) {
      setCount(target);
      return;
    }
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = eased * target;
      setCount(decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, decimals, shouldReduce]);

  return { count, ref };
}

// ─── Comparison bar ─────────────────────────────────────────────────────────

function ComparisonBar({
  clavoValue,
  industryValue,
  clavoLabel,
  industryLabel,
  color,
  invert = false,
}: {
  clavoValue: number;
  industryValue: number;
  clavoLabel: string;
  industryLabel: string;
  color: string;
  invert?: boolean;
}) {
  const max = Math.max(clavoValue, industryValue);
  const clavoWidth  = (clavoValue  / max) * 100;
  const industryWidth = (industryValue / max) * 100;

  return (
    <div className="flex flex-col gap-2.5" role="img" aria-label={`Clavo AI ${clavoLabel} vs industry ${industryLabel}`}>
      <div className="flex items-center gap-3">
        <span className="w-20 shrink-0 text-right text-[11px] font-semibold text-white/55">Clavo AI</span>
        <div className="relative flex-1 h-5 overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            className="absolute inset-y-0 left-0 flex items-center rounded-full pl-2"
            style={{ background: `linear-gradient(90deg, ${color}cc, ${color})`, boxShadow: `0 0 12px ${color}60` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${invert ? 100 - clavoWidth + Math.min(clavoWidth, 20) : clavoWidth}%` }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
          >
            <span className="text-[10px] font-bold text-black/70 whitespace-nowrap">{clavoLabel}</span>
          </motion.div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 shrink-0 text-right text-[11px] text-white/28">Industry avg</span>
        <div className="relative flex-1 h-5 overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            className="absolute inset-y-0 left-0 flex items-center rounded-full pl-2 bg-white/10"
            initial={{ width: 0 }}
            whileInView={{ width: `${invert ? 100 : industryWidth}%` }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
          >
            <span className="text-[10px] text-white/35 whitespace-nowrap">{industryLabel}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Individual metric card ──────────────────────────────────────────────────

interface MetricCardProps {
  icon: React.ReactNode;
  prefix?: string;
  target: number;
  suffix: string;
  decimals?: number;
  label: string;
  sublabel: string;
  direction: "up" | "down";
  color: string;
  comparison: React.ReactNode;
  delay: number;
}

function MetricCard({
  icon, prefix = "", target, suffix, decimals = 0,
  label, sublabel, direction, color, comparison, delay,
}: MetricCardProps) {
  const { count, ref } = useCountUp(target, 2.0, decimals);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 220, damping: 26, delay }}
      whileHover={shouldReduce ? {} : { y: -6 }}
      className="group relative flex flex-col gap-5 md:gap-6 overflow-hidden rounded-2xl border border-white/[0.07] p-5 md:p-7 transition-colors duration-300 hover:border-white/[0.12]"
      style={{
        background: "rgba(7, 14, 11, 0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: `0 4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset`,
      }}
    >
      <div aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 70%)` }} />

      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}70 50%, transparent)` }} />

      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: `${color}18`, color }} aria-hidden="true">
          {icon}
        </div>
        <div className="flex items-center gap-1.5 rounded-full border px-2.5 py-1"
          style={{ borderColor: `${color}25`, background: `${color}10` }}>
          {direction === "down"
            ? <TrendingDown size={12} style={{ color }} aria-hidden="true" />
            : <TrendingUp size={12} style={{ color }} aria-hidden="true" />}
          <span className="text-[10px] font-bold" style={{ color }}>
            {direction === "down" ? "Cost Reduced" : "Above Avg"}
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-end gap-1 leading-none">
          {prefix && <span className="mb-1 text-2xl font-bold text-white/50">{prefix}</span>}
          <motion.span
            ref={ref}
            className="font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(3rem, 8vw, 5rem)",
              background: `linear-gradient(135deg, ${color} 0%, white 60%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 20px ${color}60)`,
            }}
            aria-label={`${prefix}${count}${suffix}`}
          >
            {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
          </motion.span>
          <span className="mb-2 text-2xl font-bold" style={{ color: `${color}99` }}>{suffix}</span>
        </div>
        <p className="mt-1 text-base font-semibold text-white/75">{label}</p>
        <p className="mt-0.5 text-sm text-white/38">{sublabel}</p>
      </div>

      <div>{comparison}</div>
    </motion.div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function MetricsSection() {
  const testimonialsCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = testimonialsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drops = Array.from({ length: 60 }, () => ({
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
    const animate = () => {
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

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      aria-labelledby="metrics-heading"
      className="relative overflow-hidden py-16 md:py-28 px-3 md:px-4"
    >
      {/* Atmospheric glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block" style={{ zIndex: 3 }}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(circle, rgba(192,132,252,0.07) 0%, transparent 70%)" }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)" }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-px"
          style={{ left: "20%", width: "60%", background: "linear-gradient(to right, transparent, rgba(167,139,250,0.3), transparent)" }}
        />
      </div>

      {/* Falling ember particles */}
      <canvas
        ref={testimonialsCanvasRef}
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 4,
        }}
      />

      {/* Top seamless fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 100, zIndex: 5,
        background: "linear-gradient(to bottom, #030608, transparent)",
        pointerEvents: "none",
      }}/>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 200, zIndex: 5,
        background: "linear-gradient(to top, #030608, transparent)",
        pointerEvents: "none",
      }}/>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <AnimatedSection>
        <motion.div className="mb-10 md:mb-16 text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400/55">
            Proven Impact
          </p>
          <h2 id="metrics-heading"
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ lineHeight: 1.1, letterSpacing: "-0.02em", textShadow: "0 0 60px rgba(255,180,60,0.12)" }}>
            Real Results from{" "}
            <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Real Hiring Teams
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/38">
            Every number below comes from active Clavo AI deployments across fast-scaling hiring teams in GCC.
            No projections. No estimates.
          </p>
        </motion.div>
        </AnimatedSection>

        {/* 3 metric cards */}
        <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-3" role="list" aria-label="Clavo AI key metrics">
          <AnimatedSection delay={0.1} direction="left">
          <div role="listitem">
            <MetricCard
              icon={<Clock size={20} />}
              target={1245}
              suffix="+"
              label="Hours Saved"
              sublabel="16,800 screenings fully automated"
              direction="up"
              color="#c084fc"
              delay={0.06}
              comparison={
                <ComparisonBar
                  clavoValue={1245} industryValue={0}
                  clavoLabel="1,245 hrs saved" industryLabel="0 hrs saved"
                  color="#c084fc" invert={false}
                />
              }
            />
          </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
          <div role="listitem">
            <MetricCard
              icon={<TrendingDown size={20} />}
              prefix="AED "
              target={4.2}
              suffix="k"
              decimals={1}
              label="Cost per Hire"
              sublabel="↓ from AED 15k industry average"
              direction="down"
              color="#6ee7b7"
              delay={0.18}
              comparison={
                <ComparisonBar
                  clavoValue={4.2} industryValue={15}
                  clavoLabel="AED 4.2k" industryLabel="AED 15k avg"
                  color="#6ee7b7" invert={true}
                />
              }
            />
          </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} direction="right">
          <div role="listitem">
            <MetricCard
              icon={<TrendingUp size={20} />}
              target={87}
              suffix="%"
              label="Offer Acceptance Rate"
              sublabel="↑ vs 72% industry average"
              direction="up"
              color="#67e8f9"
              delay={0.30}
              comparison={
                <ComparisonBar
                  clavoValue={87} industryValue={72}
                  clavoLabel="87% Clavo AI" industryLabel="72% industry"
                  color="#67e8f9" invert={false}
                />
              }
            />
          </div>
          </AnimatedSection>
        </div>

        {/* ── Sub-metrics row ── */}
        <motion.div
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.38 }}
          role="list"
          aria-label="Additional Clavo AI performance benchmarks"
        >
          {[
            { value: "15 Days",  label: "Time to Hire",       sub: "vs 40 days avg",  color: "#c084fc" },
            { value: "91%",      label: "Retention @ 9mo",    sub: "vs 68% avg",       color: "#6ee7b7" },
            { value: "4 Hours",  label: "Screening Time",     sub: "vs 12h avg",       color: "#a78bfa" },
            { value: "94%",      label: "Pipeline Fill Rate", sub: "vs 60% avg",       color: "#67e8f9" },
          ].map(({ value, label, sub, color }) => (
            <div
              key={label}
              role="listitem"
              className="flex flex-col items-center gap-1 rounded-xl border border-white/[0.06] px-4 py-4 text-center"
              style={{ background: "rgba(255,255,255,0.02)" }}
              aria-label={`${value} ${label} — ${sub}`}
            >
              <span className="text-2xl font-extrabold"
                style={{
                  background: `linear-gradient(135deg, ${color}, white)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: `drop-shadow(0 0 10px ${color}50)`,
                }}>
                {value}
              </span>
              <span className="text-xs font-semibold text-white/55">{label}</span>
              <span className="text-[10px] text-emerald-400/60">{sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom punch line */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.45 }}
        >
          <p className="text-lg font-semibold text-white/60">
            The average Clavo AI team{" "}
            <span className="text-purple-300 font-bold">saves AED 10,800 per hire</span>{" "}
            and fills roles{" "}
            <span className="text-cyan-300 font-bold">62% faster</span>{" "}
            than before.
          </p>
          <p className="text-sm text-white/25 italic">
            Based on aggregated data from hiring teams across GCC · Updated April 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
