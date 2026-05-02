"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Zap, BarChart3, ArrowRight, Check,
  Target, Users, Layers, Shield, Sparkles, TrendingUp,
  Clock, FileText, Video, Brain, ChevronDown,
} from "lucide-react";
import CompetitorTable from "@/components/CompetitorTable";

// ─── Constants ────────────────────────────────────────────────────────────────

const SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;
const VP_ONCE = { once: true, amount: 0.18 } as const;

// ─── Particle data (deterministic) ───────────────────────────────────────────

const STARS = Array.from({ length: 26 }, (_, i) => ({
  left:     `${(i * 37 + 11) % 97}%`,
  top:      `${(i * 53 + 7) % 96}%`,
  size:     i % 5 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
  delay:    (i * 0.28) % 5,
  duration: 3 + (i % 6),
  color:    ["#a78bfa", "#67e8f9", "#c084fc", "#6ee7b7", "#f472b6"][i % 5],
}));

const FIREFLIES = Array.from({ length: 6 }, (_, i) => ({
  left:     `${(i * 43 + 15) % 90}%`,
  top:      `${(i * 61 + 20) % 85}%`,
  color:    ["#a78bfa", "#67e8f9", "#6ee7b7", "#c084fc", "#a78bfa"][i % 5],
  size:     2 + (i % 3) * 0.5,
  delay:    i * 0.9,
  duration: 9 + i * 1.4,
  driftX:   [0, 40 - i * 4, -28 + i * 3, 18, -12, 0] as number[],
  driftY:   [0, -30 + i * 2, 22 - i * 2, -40, 15, 0] as number[],
}));

// ─── Animated counter ─────────────────────────────────────────────────────────

function useCounter(target: number, inView: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.round(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [inView, target, duration]);
  return count;
}

// ─── PAGE BACKGROUND ──────────────────────────────────────────────────────────

function PageBackground() {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {mounted && <style>{`
        @keyframes meshA { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-47%,-53%) scale(1.07)} }
        @keyframes meshB { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-53%,-47%) scale(1.05)} }
        @keyframes meshC { 0%,100%{transform:translate(-50%,-50%) scale(1)} 33%{transform:translate(-48%,-52%) scale(1.06)} 66%{transform:translate(-52%,-48%) scale(0.96)} }
        .ma{animation:meshA 20s ease-in-out infinite}
        .mb{animation:meshB 24s ease-in-out infinite}
        .mc{animation:meshC 28s ease-in-out infinite}
        @keyframes pulseUL { 0%,100%{transform:scaleX(0.55);opacity:0.5} 50%{transform:scaleX(1);opacity:1} }
        .pulse-ul{animation:pulseUL 2.8s ease-in-out infinite;transform-origin:center}
        @keyframes ctaLight { 0%{left:-35%} 100%{left:135%} }
        .cta-light{animation:ctaLight 3.8s ease-in-out infinite}
        @keyframes dotPulse { 0%,100%{transform:translate(-50%,-50%) scale(0.7);opacity:0.85} 50%{transform:translate(-50%,-50%) scale(2.4);opacity:0} }
        .dot-pulse{animation:dotPulse 1.6s ease-in-out infinite}
      `}</style>}

      {/* Base */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0a0810 0%, #130a1e 50%, #0a0810 100%)" }} />

      {/* CSS mesh orbs */}
      {mounted && (
        <>
          <div className="ma absolute rounded-full" style={{ left:"30%", top:"20%", width:800, height:800, background:"radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 65%)", filter:"blur(80px)", transform:"translate(-50%,-50%)" }} />
          <div className="mb absolute rounded-full" style={{ left:"72%", top:"45%", width:700, height:700, background:"radial-gradient(circle,rgba(6,182,212,0.06) 0%,transparent 65%)", filter:"blur(80px)", transform:"translate(-50%,-50%)" }} />
          <div className="mc absolute rounded-full" style={{ left:"48%", top:"78%", width:580, height:580, background:"radial-gradient(circle,rgba(124,58,237,0.065) 0%,transparent 65%)", filter:"blur(80px)", transform:"translate(-50%,-50%)" }} />
        </>
      )}

      {/* Stars */}
      {mounted && STARS.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ left:s.left, top:s.top, width:s.size, height:s.size, background:s.color, boxShadow:`0 0 ${s.size*4}px ${s.color}` }}
          animate={shouldReduce ? {} : { opacity:[0.07,0.65,0.07], scale:[0.7,1.3,0.7] }}
          transition={{ duration:s.duration, repeat:Infinity, ease:"easeInOut", delay:s.delay }}
        />
      ))}

      {/* Fireflies */}
      {mounted && FIREFLIES.map((f, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ left:f.left, top:f.top, width:f.size, height:f.size, background:f.color, boxShadow:`0 0 ${f.size*5}px ${f.color}` }}
          animate={shouldReduce ? {} : { x:f.driftX, y:f.driftY, opacity:[0,0.55,0.3,0.7,0.2,0] }}
          transition={{ duration:f.duration, repeat:Infinity, ease:"easeInOut", delay:f.delay }}
        />
      ))}

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.013]" style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
    </div>
  );
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VP_ONCE);
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity:0, y:22 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ ...SPRING, delay }}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily:"var(--font-inter), Inter, sans-serif", fontSize:11, fontWeight:700, letterSpacing:2, color:"#a78bfa", textTransform:"uppercase", marginBottom:14 }}>
      {children}
    </p>
  );
}

function GlassCard({ children, className = "", accentColor = "rgba(124,58,237,0.55)", glowColor = "rgba(124,58,237,0.18)", style, hover = false }: {
  children: React.ReactNode; className?: string; accentColor?: string; glowColor?: string; style?: React.CSSProperties; hover?: boolean;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] ${className}`}
      style={{ background:"rgba(6,10,16,0.76)", backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)", boxShadow:"0 4px 32px rgba(0,0,0,0.55),inset 0 0 0 1px rgba(255,255,255,0.04)", ...style }}
      whileHover={hover ? { y:-5, boxShadow:`0 14px 48px rgba(0,0,0,0.65),0 0 40px ${glowColor},inset 0 0 0 1px rgba(255,255,255,0.08)` } : undefined}
      transition={{ duration:0.22 }}
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background:`linear-gradient(90deg,transparent,${accentColor} 50%,transparent)` }} />
      {children}
    </motion.div>
  );
}

// ─── SECTION 1 — HERO ─────────────────────────────────────────────────────────

function HeroDashboardCard() {
  const shouldReduce = useReducedMotion();
  const candidates = [
    { initials:"LR", name:"Layla Rashid",  role:"Sr. Engineer · Dubai",    match:91, color:"#a78bfa" },
    { initials:"AR", name:"Ahmed Rashid",   role:"Product Lead · Riyadh",   match:87, color:"#67e8f9" },
    { initials:"SM", name:"Sara Mansoor",   role:"UX Designer · Singapore", match:83, color:"#6ee7b7" },
  ];
  const stages = ["Screening","Interview","Scoring","Insights"];

  return (
    <motion.div className="relative mx-auto w-full max-w-sm"
      initial={{ opacity:0, x:40, scale:0.95 }}
      animate={{ opacity:1, x:0, scale:1 }}
      transition={{ ...SPRING, delay:0.45 }}>
      <GlassCard className="p-5" accentColor="rgba(52,211,153,0.7)"
        style={{ boxShadow:"0 0 80px rgba(124,58,237,0.15),0 0 160px rgba(6,182,212,0.06),0 8px 40px rgba(0,0,0,0.65)" }}>

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.span className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              animate={shouldReduce ? {} : { opacity:[1,0.3,1] }}
              transition={{ duration:1.4, repeat:Infinity }} aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Clavo · Pipeline</span>
          </div>
          <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">Live</span>
        </div>

        {/* Stage pills */}
        <div className="mb-4 flex gap-1.5">
          {stages.map((s, i) => (
            <span key={s} className="flex-1 rounded-md py-1 text-center text-[9px] font-semibold"
              style={{ background:i===0?"rgba(167,139,250,0.2)":"rgba(255,255,255,0.04)", color:i===0?"#a78bfa":"rgba(255,255,255,0.22)", border:i===0?"1px solid rgba(167,139,250,0.3)":"1px solid transparent" }}>
              {s}
            </span>
          ))}
        </div>

        {/* Candidates */}
        <div className="flex flex-col gap-2">
          {candidates.map((c, i) => (
            <motion.div key={c.name}
              className="flex items-center gap-2.5 rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-2"
              initial={{ opacity:0, x:12 }}
              animate={{ opacity:1, x:0 }}
              transition={{ ...SPRING, delay:0.65+i*0.12 }}>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-extrabold text-white"
                style={{ background:`linear-gradient(135deg,${c.color}90,${c.color}50)` }} aria-hidden="true">{c.initials}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-white/85 truncate">{c.name}</p>
                <p className="text-[9px] text-white/35 truncate">{c.role}</p>
              </div>
              <span className="text-[11px] font-extrabold shrink-0" style={{ color:c.color }}>{c.match}%</span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div className="h-full rounded-full" style={{ background:"linear-gradient(90deg,#7c3aed,#0891b2)" }}
              initial={{ width:0 }} animate={{ width:"68%" }}
              transition={{ duration:1.2, delay:0.95, ease:"easeOut" }} />
          </div>
          <span className="text-[10px] text-white/30">68%</span>
        </div>
      </GlassCard>
    </motion.div>
  );
}

const SCORE_BARS = [
  { label: "MATCH CONFIDENCE",       val: 91, display: "91%", color: "linear-gradient(to right, #f0a500, #4ade80)" },
  { label: "ATS Proficiency",         val: 94, display: "94",  color: "#f0a500" },
  { label: "Stakeholder Management",  val: 91, display: "91",  color: "#a78bfa" },
  { label: "Communication",           val: 88, display: "88",  color: "#4ade80" },
  { label: "Cultural Alignment",      val: 96, display: "96",  color: "#06b6d4" },
];

function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target:containerRef, offset:["start start","end start"] });
  const contentY = useTransform(scrollYProgress, [0,1], [0,-55]);
  const shouldReduce = useReducedMotion();
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <section ref={containerRef} aria-labelledby="about-hero-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 pb-10" style={{ background: "transparent", margin: 0, borderTop: "none", borderBottom: "none" }}>

      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <img src="/about-bg1.jpg" alt="" style={{
          width: "100%", height: "100%", objectFit: "cover",
          animation: "kenBurnsAbout1 22s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(240,165,0,0.5) 0%, rgba(251,191,36,0.4) 40%, rgba(212,147,10,0.3) 70%, rgba(254,215,170,0.18) 100%)",
          mixBlendMode: "color" as React.CSSProperties["mixBlendMode"],
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(3,6,8,0.88) 0%, rgba(3,6,8,0.72) 40%, rgba(3,6,8,0.72) 60%, rgba(3,6,8,0.88) 100%)",
          pointerEvents: "none",
        }} />
        {/* Bottom fade — blends into #0a0810 page bg */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 250, zIndex: 5,
          background: "linear-gradient(to bottom, transparent, #0a0810)",
          pointerEvents: "none",
        }} />
      </div>

      <motion.div style={shouldReduce ? {} : { y:contentY }} className="relative z-10 w-full">
        <div className="about-hero-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 0.7fr",
          gap: 48,
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
        }}>

          {/* LEFT — heading and description */}
          <div className="text-center lg:text-left">
            <motion.div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/[0.08] px-4 py-1.5"
              initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ ...SPRING, delay:0.1 }}>
              <motion.span className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={shouldReduce ? {} : { opacity:[1,0.3,1] }} transition={{ duration:1.8, repeat:Infinity }} aria-hidden="true" />
              <span className="text-xs font-semibold text-white/55">Built for hiring teams across GCC</span>
            </motion.div>

            <motion.h1 id="about-hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.1, textShadow:"0 0 80px rgba(124,58,237,0.2)" }}
              initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }} transition={{ ...SPRING, delay:0.2 }}>
              We Didn&apos;t Enter the Market.{" "}
              <span style={{ color: "#f0a500" }}>
                We Created It.
              </span>
            </motion.h1>

            <motion.p className="mx-auto mt-6 max-w-xl lg:mx-0"
              style={{ fontFamily:"var(--font-inter), Inter, sans-serif", fontSize:17, lineHeight:1.7, color:"rgba(255,255,255,0.55)", fontWeight:400 }}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ ...SPRING, delay:0.35 }}>
              Every other hiring tool was built for Silicon Valley. Clavo AI was built for Dubai, Riyadh, Doha, and the GCC — where compliance isn&apos;t optional, and hiring speed defines who wins.
            </motion.p>

            <motion.p className="mx-auto mt-4 max-w-lg lg:mx-0"
              style={{ fontFamily:"var(--font-inter), Inter, sans-serif", fontSize:17, lineHeight:1.7, color:"rgba(255,255,255,0.55)", fontWeight:400 }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
              AI hiring intelligence + nationalization compliance. One platform. Zero competition.
            </motion.p>

            <motion.div className="mt-12 flex justify-center lg:justify-start"
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}>
              <motion.div animate={shouldReduce ? {} : { y:[0,6,0] }} transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut" }}>
                <ChevronDown size={20} className="text-white/20" aria-hidden="true" />
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — 360° card */}
          <div className="about-hero-right"
            onClick={() => setReportOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Open Daniel Reed's 360° candidate report"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setReportOpen(true); }}
            style={{
              cursor: "pointer",
              background: "rgba(8,6,20,0.85)",
              border: "1px solid rgba(240,165,0,0.2)",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 0 60px rgba(240,165,0,0.12), 0 30px 60px rgba(0,0,0,0.5)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 0 80px rgba(240,165,0,0.2), 0 30px 60px rgba(0,0,0,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 60px rgba(240,165,0,0.12), 0 30px 60px rgba(0,0,0,0.5)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#4ade80" }}>
                AI SCREENED · LIVE MATCH
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Daniel Reed</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                  Senior Recruiter · 6 yrs ATS &amp; Stakeholder Mgmt
                </div>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: "rgba(240,165,0,0.12)",
                border: "1px solid rgba(240,165,0,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16,
              }}>🧠</div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                AI BEHAVIORAL SCORE
              </div>
              <div style={{ fontSize: 40, fontWeight: 900, color: "#f0a500", lineHeight: 1 }}>91</div>
            </div>

            {SCORE_BARS.map((bar) => (
              <div key={bar.label} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{bar.label}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: typeof bar.color === "string" && bar.color.startsWith("#") ? bar.color : "#f0a500" }}>
                    {bar.display}
                  </span>
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${bar.val}%`, height: "100%", background: bar.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "rgba(255,255,255,0.4)" }}>
                KEY SKILLS
              </span>
              <span style={{
                padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                background: "rgba(240,165,0,0.12)",
                border: "1px solid rgba(240,165,0,0.25)",
                color: "#f0a500",
              }}>ATS Systems</span>
            </div>

            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginTop: 16, textAlign: "center" }}>
              &ldquo;16,800 screening hours bypassed. 1,245 recruiter hours saved.&rdquo;
            </div>

            <div style={{
              marginTop: 18, padding: "10px 14px",
              background: "rgba(74,222,128,0.06)",
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: 10,
              textAlign: "center",
              fontSize: 11, fontWeight: 600, color: "#4ade80",
            }}>
              View 360° Report →
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {reportOpen && (
        <div
          onClick={() => setReportOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            padding: 24, paddingTop: 120, overflowY: "auto",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0a0810",
              border: "1px solid rgba(240,165,0,0.25)",
              borderRadius: 24, padding: 40,
              maxWidth: 1100, width: "100%",
              position: "relative",
            }}
          >
            <button
              onClick={() => setReportOpen(false)}
              style={{
                position: "absolute", top: 16, right: 16, zIndex: 100,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                width: 36, height: 36, borderRadius: "50%",
                color: "#fff", fontSize: 20, cursor: "pointer",
              }}
            >×</button>

            {/* TOP — Header with 96% donut + name + badges */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingRight: 50 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{
                  width: 84, height: 84, borderRadius: "50%",
                  background: "conic-gradient(#f0a500 0% 96%, rgba(255,255,255,0.08) 96% 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <div style={{
                    width: 70, height: 70, borderRadius: "50%", background: "#0a0810",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#f0a500" }}>96%</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>AI Match</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Daniel Reed</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80" }}>● Strong Hire</span>
                    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)", color: "#a78bfa" }}>◇ AI Screened</span>
                    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.25)", color: "#f0a500" }}>● Active</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.2)", textAlign: "center" }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "rgba(255,255,255,0.5)" }}>AUDIT CONFIDENCE</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#4ade80", marginTop: 2 }}>Very High</div>
              </div>
            </div>

            {/* PERSONALITY ORB / KEY HIGHLIGHT / PRIMARY RISK */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(167,139,250,0.05)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #a78bfa", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✦</div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#a78bfa" }}>PERSONALITY ORB</span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                  Analytical problem-solver with strong collaborative instincts. Thrives in autonomous environments while maintaining team alignment.
                </div>
              </div>
              <div style={{ background: "rgba(240,165,0,0.05)", border: "1px solid rgba(240,165,0,0.15)", borderLeft: "3px solid #f0a500", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 14 }}>✨</span>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#f0a500" }}>KEY HIGHLIGHT</span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                  Led 3 successful product launches in 18 months, demonstrating exceptional execution velocity and cross-functional leadership.
                </div>
              </div>
              <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderLeft: "3px solid #ef4444", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 14 }}>⚠</span>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#ef4444" }}>PRIMARY RISK</span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                  High market demand for skillset may lead to counteroffer scenarios. Recommend expedited decision timeline.
                </div>
              </div>
            </div>

            {/* 4 Big Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
              {[
                { icon: "◎", label: "AI MATCH SCORE",   val: "96%",    color: "#f0a500" },
                { icon: "🛡", label: "RETENTION RISK",   val: "Low",    color: "#4ade80" },
                { icon: "◴", label: "CULTURE FIT",       val: "87%",    color: "#a78bfa" },
                { icon: "⚡", label: "ONBOARDING LOAD",  val: "Medium", color: "#f0a500" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <span style={{ color: s.color, fontSize: 12 }}>{s.icon}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "rgba(255,255,255,0.5)" }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Interview Video + Compensation Analysis */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {/* Video player */}
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #a78bfa", borderRadius: 10, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#a78bfa" }}>📹 AI INTERVIEW RECORDING</span>
                  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80" }}>29 Apr 2026 · 18:24</span>
                </div>
                <div style={{ position: "relative", background: "linear-gradient(135deg, #0a0810 0%, #0f0a1a 100%)", borderRadius: 8, overflow: "hidden", aspectRatio: "16/9", marginBottom: 8 }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#fff" }}>DR</div>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(240,165,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(240,165,0,0.4)", cursor: "pointer" }}>
                      <div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "13px solid #000", marginLeft: 3 }} />
                    </div>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Daniel Reed — Technical Round</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 10px", background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: "#fff" }}>12:34</span>
                      <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 2 }}>
                        <div style={{ width: "68%", height: "100%", background: "#f0a500", borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>18:24</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {[{ label: "Confident", c: "#4ade80" }, { label: "Articulate", c: "#a78bfa" }, { label: "Technical Depth", c: "#f0a500" }, { label: "Structured Thinking", c: "#67e8f9" }].map(t => (
                    <span key={t.label} style={{ padding: "2px 8px", borderRadius: 10, fontSize: 9, fontWeight: 600, background: `${t.c}18`, border: `1px solid ${t.c}40`, color: t.c }}>{t.label}</span>
                  ))}
                </div>
              </div>

              {/* Compensation Analysis */}
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #f0a500", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#f0a500", marginBottom: 12 }}>💰 COMPENSATION ANALYSIS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                  <div style={{ background: "rgba(240,165,0,0.06)", border: "1px solid rgba(240,165,0,0.2)", borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>CANDIDATE EXPECTS</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#f0a500" }}>AED 28,500</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>per month</div>
                  </div>
                  <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>BUDGET</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#4ade80" }}>AED 26,000</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>per month</div>
                  </div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(255,255,255,0.5)", marginBottom: 5 }}>
                    <span>Market Range</span>
                    <span>AED 24,000 – AED 32,000</span>
                  </div>
                  <div style={{ position: "relative", height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 4 }}>
                    <div style={{ position: "absolute", left: "20%", right: "20%", height: "100%", background: "rgba(167,139,250,0.2)", borderRadius: 4 }} />
                    <div style={{ position: "absolute", left: "25%", top: -3, width: 2, height: 14, background: "#4ade80", borderRadius: 1 }} />
                    <div style={{ position: "absolute", left: "53%", top: -3, width: 2, height: 14, background: "#f0a500", borderRadius: 1 }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, color: "rgba(255,255,255,0.3)" }}>
                    <span>AED 20k</span>
                    <span style={{ color: "#4ade80" }}>▲ Budget</span>
                    <span style={{ color: "#f0a500" }}>▲ Expects</span>
                    <span>AED 36k</span>
                  </div>
                </div>
                <div style={{ background: "rgba(240,165,0,0.06)", border: "1px solid rgba(240,165,0,0.15)", borderRadius: 8, padding: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#f0a500" }}>Gap from Budget</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#f0a500" }}>+9.6%</span>
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                    Within negotiable range. Recommend offering AED 27,000 + performance bonus. Candidate is 11% below market ceiling.
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Sentiment Timeline + Hiring Manager Summary */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #a78bfa", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>📊 INTERVIEW SENTIMENT TIMELINE</div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", height: 100 }}>
                  {[
                    { pct: 78, lbl: "Opening",    c: "#a78bfa" },
                    { pct: 92, lbl: "Technical",  c: "#a78bfa" },
                    { pct: 85, lbl: "Soft Skills", c: "#f0a500" },
                    { pct: 88, lbl: "Behavioural", c: "#f0a500" },
                  ].map((b, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: b.c }}>{b.pct}%</span>
                      <div style={{ width: 24, height: b.pct * 0.6, background: `linear-gradient(to top, ${b.c}, ${b.c}88)`, borderRadius: 4 }} />
                      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>{b.lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #f0a500", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>📋 HIRING MANAGER SUMMARY</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                  Steve demonstrates exceptional technical depth combined with strong product intuition. His experience leading cross-functional teams at scale makes him an ideal candidate for the Senior Engineering Manager role.
                </div>
              </div>
            </div>

            {/* Red Flag Audit + Behavioral Intelligence */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #ef4444", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#ef4444", marginBottom: 10 }}>⚠ RED FLAG AUDIT</div>
                {[
                  { title: "Employment Gap Analysis",      sub: "No unexplained gaps detected",     status: "Pass",    c: "#4ade80" },
                  { title: "Reference Consistency",        sub: "All references verified",           status: "Pass",    c: "#4ade80" },
                  { title: "Salary Expectation Alignment", sub: "12% above budget range",            status: "Caution", c: "#f0a500" },
                  { title: "Notice Period Compatibility",  sub: "60 days required, target 30 days",  status: "Fail",    c: "#ef4444" },
                  { title: "Skill Verification",           sub: "Technical assessment passed",        status: "Pass",    c: "#4ade80" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", marginBottom: 5, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>{r.title}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{r.sub}</div>
                    </div>
                    <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 9, fontWeight: 600, background: `${r.c}15`, border: `1px solid ${r.c}40`, color: r.c }}>{r.status}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #a78bfa", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#a78bfa", marginBottom: 10 }}>🧠 BEHAVIORAL INTELLIGENCE</div>
                <div style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 8, padding: 10, marginBottom: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#4ade80", marginBottom: 6 }}>✦ Key Strengths (4)</div>
                  {["Exceptional problem decomposition skills", "Strong emotional intelligence", "Data-driven decision making", "Collaborative leadership approach"].map((s, i) => (
                    <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 3, paddingLeft: 8 }}>● {s}</div>
                  ))}
                </div>
                <div style={{ background: "rgba(240,165,0,0.05)", border: "1px solid rgba(240,165,0,0.15)", borderRadius: 8, padding: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#f0a500", marginBottom: 6 }}>⚠ Friction Points (3)</div>
                  {["Tendency to over-engineer in ambiguous contexts", "May require structured feedback mechanisms", "Prefers async communication"].map((s, i) => (
                    <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 3, paddingLeft: 8 }}>● {s}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Big 5 Performance Radar + Technical Evidence Studio */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #a78bfa", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#a78bfa", marginBottom: 12 }}>📊 BIG 5 PERFORMANCE RADAR</div>
                <svg viewBox="0 0 200 200" style={{ width: "100%", height: 180 }}>
                  {[80, 60, 40, 20].map((r, i) => (
                    <polygon key={i}
                      points={Array.from({ length: 5 }, (_, k) => {
                        const angle = (Math.PI * 2 * k) / 5 - Math.PI / 2;
                        return `${100 + Math.cos(angle) * r},${100 + Math.sin(angle) * r}`;
                      }).join(" ")}
                      fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  ))}
                  <polygon
                    points={[88, 75, 70, 65, 78].map((v, k) => {
                      const angle = (Math.PI * 2 * k) / 5 - Math.PI / 2;
                      return `${100 + Math.cos(angle) * v},${100 + Math.sin(angle) * v}`;
                    }).join(" ")}
                    fill="rgba(167,139,250,0.25)" stroke="#a78bfa" strokeWidth="2" />
                  {["Technical Depth", "Communication", "Cultural Fit", "Problem Solving", "Leadership"].map((label, k) => {
                    const angle = (Math.PI * 2 * k) / 5 - Math.PI / 2;
                    const x = 100 + Math.cos(angle) * 95;
                    const y = 100 + Math.sin(angle) * 95;
                    return <text key={k} x={x} y={y} fill="rgba(255,255,255,0.6)" fontSize="8" textAnchor="middle">{label}</text>;
                  })}
                </svg>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #a78bfa", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#a78bfa", marginBottom: 10 }}>{"</> TECHNICAL EVIDENCE STUDIO"}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 8 }}>
                  <div style={{ background: "#0a0810", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: 10, fontFamily: "monospace", fontSize: 9, lineHeight: 1.5 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f0a500" }} />
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
                      <span style={{ color: "rgba(255,255,255,0.4)", marginLeft: 6 }}>solution.ts</span>
                    </div>
                    <div style={{ color: "#a78bfa" }}>async function <span style={{ color: "#f0a500" }}>optimizeQuery</span>(params) {"{"}</div>
                    <div style={{ color: "#60a5fa", paddingLeft: 8 }}>const cached = await redis.get(params.key);</div>
                    <div style={{ color: "#60a5fa", paddingLeft: 8 }}>if (cached) return JSON.parse(cached);</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", paddingLeft: 8 }}>// Efficient batch processing</div>
                    <div style={{ color: "#60a5fa", paddingLeft: 8 }}>const result = await db.query(...);</div>
                    <div style={{ color: "#a78bfa" }}>{"}"}</div>
                  </div>
                  <div style={{ background: "rgba(167,139,250,0.05)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 6, padding: 10 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#a78bfa", marginBottom: 6 }}>AI ANALYSIS</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>Code Quality</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#f0a500", marginBottom: 6 }}>94/100</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>Pattern</div>
                    <div style={{ fontSize: 10, color: "#fff", marginBottom: 6 }}>Caching-first</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>Best Practice</div>
                    <div style={{ fontSize: 10, color: "#4ade80" }}>Async/await ✓</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Retention Risk + Counteroffer Risk */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #4ade80", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#4ade80", marginBottom: 8 }}>🛡 RETENTION RISK INDICATOR</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                      {[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= 2 ? "#4ade80" : "rgba(255,255,255,0.1)" }} />)}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#4ade80" }}>Low Risk</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 600 }}>24+ month tenure</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Based on engagement signals</div>
                  </div>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #f0a500", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#f0a500", marginBottom: 8 }}>$ COUNTEROFFER RISK</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                      {[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= 3 ? "#f0a500" : "rgba(255,255,255,0.1)" }} />)}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#f0a500" }}>Medium Risk</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "#f0a500", fontWeight: 600 }}>12-15% salary gap</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Current vs. market rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Score + Benchmarking */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #a78bfa", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#a78bfa", marginBottom: 8 }}>♥ CANDIDATE ENGAGEMENT SCORE</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: "#f0a500" }}>89%</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>engagement</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 10 }}>
                  <div style={{ width: "89%", height: "100%", background: "#a78bfa", borderRadius: 4 }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>Enthusiasm</div>
                    <div style={{ height: 2, background: "rgba(255,255,255,0.06)", marginTop: 3, marginBottom: 3 }}>
                      <div style={{ width: "92%", height: "100%", background: "#a78bfa" }} />
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#a78bfa", textAlign: "right" }}>92%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>Preparation</div>
                    <div style={{ height: 2, background: "rgba(255,255,255,0.06)", marginTop: 3, marginBottom: 3 }}>
                      <div style={{ width: "86%", height: "100%", background: "#a78bfa" }} />
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#a78bfa", textAlign: "right" }}>86%</div>
                  </div>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #f0a500", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#f0a500", marginBottom: 10 }}>📊 COMPARABLE CANDIDATE BENCHMARKING</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>🏆</span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#f0a500" }}>#1</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>of 47 candidates</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>vs. Pool Average</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#4ade80" }}>+24% above</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                  <span>Pool Average (72%)</span>
                  <span>Daniel Reed (96%)</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
                  <div style={{ width: "96%", height: "100%", background: "linear-gradient(to right, #f0a500, #fbbf24)", borderRadius: 4 }} />
                </div>
              </div>
            </div>

            {/* Onboarding Complexity + Reference Check Prompts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #a78bfa", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#a78bfa", marginBottom: 10 }}>📚 ONBOARDING COMPLEXITY</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ padding: "3px 10px", borderRadius: 16, fontSize: 10, fontWeight: 600, background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)", color: "#a78bfa" }}>Medium</span>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>Est. 6-8 weeks to full productivity</span>
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>SKILLS TO ONBOARD</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "System Design", "Team Leadership"].map(s => (
                    <span key={s} style={{ padding: "3px 8px", borderRadius: 12, fontSize: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderLeft: "3px solid #a78bfa", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#a78bfa", marginBottom: 10 }}>💬 REFERENCE CHECK PROMPTS</div>
                {[
                  "Can you describe a situation where Steve had to navigate conflicting priorities between stakeholders?",
                  "How did Steve handle feedback when his technical recommendations were challenged?",
                  "What was Steve's approach to mentoring junior team members during high-pressure periods?",
                ].map((q, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, padding: "8px 10px", background: "rgba(167,139,250,0.04)", border: "1px solid rgba(167,139,250,0.12)", borderRadius: 6 }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(167,139,250,0.15)", color: "#a78bfa", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Best Action */}
            <div style={{ background: "rgba(240,165,0,0.05)", border: "1px solid rgba(240,165,0,0.25)", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#f0a500", marginBottom: 4 }}>⚡ NEXT BEST ACTION</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Schedule final round interview with hiring committee</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Strong match. Recommend expedited process due to competing offers. Decision timeline: 10 business days.</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>↓ Export Dossier</button>
                <button style={{ padding: "8px 14px", borderRadius: 8, background: "#f0a500", border: "none", color: "#000", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>✓ Final Approval</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── SECTION 2+3 — MISSION + VISION (MERGED) ─────────────────────────────────

// Chaos-to-Intelligence visual data
const CNODES = [
  { id:"a", label:"Email Inbox", cx:{x:-108,y:-72,r:-18,o:0.72}, sx:{x:-56,y:-44,r:-6,o:0.86}, fx:{x:-80,y:-54,r:0,o:1}, cc:"#f87171",fc:"#67e8f9",jx:2.5,jy:1.5,jr:1.5,jd:0.42 },
  { id:"b", label:"CV Stack",    cx:{x:76, y:-94,r:14, o:0.65}, sx:{x:36, y:-56,r:4, o:0.82}, fx:{x:0,  y:-54,r:0,o:1}, cc:"#a855f7",fc:"#a78bfa",jx:2,  jy:2,  jr:1.2,jd:0.38 },
  { id:"c", label:"ATS",         cx:{x:-32,y:-14,r:-9, o:0.72}, sx:{x:-16,y:-8, r:-2,o:0.88}, fx:{x:80, y:-54,r:0,o:1}, cc:"#c084fc",fc:"#6ee7b7",jx:3,  jy:1,  jr:2,  jd:0.50 },
  { id:"d", label:"Notes",       cx:{x:110,y:14, r:17, o:0.62}, sx:{x:58, y:7,  r:5, o:0.80}, fx:{x:-80,y:54, r:0,o:1}, cc:"#f472b6",fc:"#67e8f9",jx:1.5,jy:2.5,jr:1.8,jd:0.45 },
  { id:"e", label:"Slack",       cx:{x:-92,y:80, r:-14,o:0.68}, sx:{x:-48,y:44, r:-4,o:0.84}, fx:{x:0,  y:54, r:0,o:1}, cc:"#f87171",fc:"#a78bfa",jx:2.2,jy:1.8,jr:1.3,jd:0.36 },
  { id:"f", label:"Reports",     cx:{x:88, y:96, r:12, o:0.62}, sx:{x:44, y:50, r:3, o:0.81}, fx:{x:80, y:54, r:0,o:1}, cc:"#ef4444",fc:"#6ee7b7",jx:1.8,jy:2,  jr:1,  jd:0.48 },
];
// Future-state grid positions (container 340×440, center 170,220)
const FPOS = [{x:90,y:166},{x:170,y:166},{x:250,y:166},{x:90,y:274},{x:170,y:274},{x:250,y:274}];
const FEDGES: [number,number][] = [[0,1],[1,2],[3,4],[4,5],[0,3],[1,4],[2,5]];

function ChaosToIntelligence() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, amount:0.35 });
  const [phase, setPhase] = useState<0|1|2>(0);
  const [ripple, setRipple] = useState<number|null>(null);
  const [hovered, setHovered] = useState<number|null>(null);
  const shouldReduce = useReducedMotion();
  const manualRef = useRef(false);
  const t1Ref = useRef<ReturnType<typeof setTimeout>|null>(null);
  const t2Ref = useRef<ReturnType<typeof setTimeout>|null>(null);

  useEffect(() => {
    if (!inView) return;
    if (shouldReduce) { setPhase(2); return; }
    if (manualRef.current) return;
    t1Ref.current = setTimeout(() => setPhase(1), 1600);
    t2Ref.current = setTimeout(() => setPhase(2), 3300);
    return () => {
      if (t1Ref.current) clearTimeout(t1Ref.current);
      if (t2Ref.current) clearTimeout(t2Ref.current);
    };
  }, [inView, shouldReduce]);

  function handleDot(i: 0|1|2) {
    manualRef.current = true;
    if (t1Ref.current) { clearTimeout(t1Ref.current); t1Ref.current = null; }
    if (t2Ref.current) { clearTimeout(t2Ref.current); t2Ref.current = null; }
    setPhase(i);
    setRipple(i);
  }

  const LABELS    = ["The Problem", "The Shift",  "The Future"];
  const DOT_LABELS = ["Problem",    "Shift",      "Future"    ];
  const PCOLORS   = ["#f87171",     "#c084fc",    "#6ee7b7"   ];

  return (
    <motion.div
      ref={ref}
      className="relative h-full min-h-[440px] w-full overflow-hidden rounded-2xl border border-white/[0.07]"
      style={{ background:"rgba(6,10,16,0.76)", backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)", boxShadow:"0 4px 32px rgba(0,0,0,0.55),inset 0 0 0 1px rgba(255,255,255,0.04)" }}
      initial={{ opacity:0 }}
      animate={inView ? { opacity:1 } : {}}
      transition={{ duration:0.9 }}
    >
      {/* Top accent — shifts color with phase */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
        style={{ transition:"background 1.4s ease", background:phase===0?"linear-gradient(90deg,transparent,rgba(248,113,113,0.7) 50%,transparent)":phase===1?"linear-gradient(90deg,transparent,rgba(192,132,252,0.7) 50%,transparent)":"linear-gradient(90deg,transparent,rgba(103,232,249,0.7) 50%,transparent)" }} />

      {/* Background glow — shifts color with phase */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ transition:"background 1.6s ease", background:phase===0?"radial-gradient(ellipse at 50% 50%,rgba(248,113,113,0.08) 0%,transparent 68%)":phase===1?"radial-gradient(ellipse at 50% 50%,rgba(192,132,252,0.07) 0%,transparent 68%)":"radial-gradient(ellipse at 50% 50%,rgba(6,182,212,0.09) 0%,transparent 68%)" }} />

      {/* SVG connection lines — fade in on future state */}
      <svg aria-hidden="true" viewBox="0 0 340 440" className="pointer-events-none absolute inset-0 h-full w-full">
        {FEDGES.map(([a,b],i) => (
          <line key={i}
            x1={FPOS[a].x} y1={FPOS[a].y} x2={FPOS[b].x} y2={FPOS[b].y}
            stroke="rgba(103,232,249,0.22)" strokeWidth="1" strokeDasharray="5 6"
            style={{ opacity:phase===2?1:0, transition:`opacity 0.7s ease ${i*0.12}s` }}
          />
        ))}
        {/* Future-state node halos */}
        {phase===2 && FPOS.map((p,i) => (
          <circle key={i} cx={p.x} cy={p.y} r={22}
            fill="none" stroke="rgba(103,232,249,0.08)" strokeWidth="1"
            style={{ opacity:1, transition:`opacity 0.5s ease ${i*0.1}s` }} />
        ))}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0" aria-label="Hiring system visualization">
        {CNODES.map((n) => {
          const s = phase===0 ? n.cx : phase===1 ? n.sx : n.fx;
          const col = phase===0 ? n.cc : phase===2 ? n.fc : "#c084fc";
          return (
            <motion.div
              key={n.id}
              className="absolute flex items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-2 text-xs font-semibold"
              style={{
                top:"50%", left:"50%",
                marginTop:-16, marginLeft:-48,
                borderColor:`${col}42`,
                background:`${col}12`,
                color:col,
                transition:"border-color 1.2s ease,background-color 1.2s ease,color 1.2s ease,box-shadow 1.2s ease",
                boxShadow:`0 0 18px ${col}${phase===0?"35":phase===1?"28":"40"}`,
              }}
              animate={inView ? (phase===0 ? {
                x:[s.x-n.jx, s.x+n.jx],
                y:[s.y-n.jy/2, s.y+n.jy],
                rotate:[s.r-n.jr, s.r+n.jr],
                opacity:s.o,
                scale:0.9,
              } : {
                x:s.x, y:s.y, rotate:s.r, opacity:s.o, scale:1,
              }) : { x:n.cx.x, y:n.cx.y, opacity:0, scale:0.75 }}
              transition={phase===0 && inView ? {
                x:{ duration:n.jd, repeat:Infinity, repeatType:"mirror", ease:"easeInOut" },
                y:{ duration:n.jd*1.2, repeat:Infinity, repeatType:"mirror", ease:"easeInOut" },
                rotate:{ duration:n.jd*1.6, repeat:Infinity, repeatType:"mirror", ease:"easeInOut" },
                opacity:{ duration:0.8 },
                scale:{ duration:0.8 },
              } : { duration:1.6, ease:"easeInOut" }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background:col, transition:"background 1.2s ease" }} aria-hidden="true" />
              {n.label}
            </motion.div>
          );
        })}
      </div>

      {/* Phase label + interactive dot controls */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
        <motion.span
          key={phase}
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color:PCOLORS[phase] }}
          initial={{ opacity:0, y:5 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.4 }}
        >
          {LABELS[phase]}
        </motion.span>

        {/* Clickable dot controls */}
        <div className="relative flex items-center gap-3">
          {/* Connecting glow line */}
          <div aria-hidden="true" className="pointer-events-none absolute left-2 right-2 top-1/2 h-px -translate-y-1/2"
            style={{ background:`linear-gradient(90deg,${PCOLORS[0]}50,${PCOLORS[1]}50,${PCOLORS[2]}50)`, opacity:0.45 }} />

          {([0,1,2] as const).map(i => (
            <div key={i} className="relative" style={{ zIndex:1 }}>
              {/* Tooltip */}
              {hovered===i && (
                <motion.div
                  className="pointer-events-none absolute bottom-full left-1/2 mb-2 whitespace-nowrap rounded-md border border-white/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider"
                  style={{ background:"rgba(6,10,16,0.92)", color:PCOLORS[i], backdropFilter:"blur(8px)", marginLeft:"-50%", zIndex:20 }}
                  initial={{ opacity:0, y:4, scale:0.88 }}
                  animate={{ opacity:1, y:0, scale:1 }}
                  transition={{ duration:0.14 }}
                >
                  {DOT_LABELS[i]}
                </motion.div>
              )}

              {/* Active pulse ring */}
              {i===phase && (
                <span aria-hidden="true" className="dot-pulse pointer-events-none absolute rounded-full"
                  style={{ width:10, height:10, left:"50%", top:"50%", marginLeft:-5, marginTop:-5, border:`1.5px solid ${PCOLORS[i]}` }} />
              )}

              {/* Ripple burst */}
              {ripple===i && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute rounded-full"
                  style={{ width:8, height:8, left:"50%", top:"50%", marginLeft:-4, marginTop:-4, background:PCOLORS[i] }}
                  initial={{ scale:1, opacity:0.75 }}
                  animate={{ scale:5, opacity:0 }}
                  transition={{ duration:0.55, ease:"easeOut" }}
                  onAnimationComplete={() => setRipple(null)}
                />
              )}

              {/* Dot button */}
              <motion.button
                type="button"
                aria-label={`View ${DOT_LABELS[i]} phase`}
                aria-pressed={i===phase}
                className="relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                style={{
                  height: i===phase ? 10 : 6,
                  width: i===phase ? 22 : 6,
                  background: i<=phase ? PCOLORS[i] : "rgba(255,255,255,0.12)",
                  boxShadow: i===phase
                    ? `0 0 10px ${PCOLORS[i]}, 0 0 22px ${PCOLORS[i]}55`
                    : hovered===i ? `0 0 8px ${PCOLORS[i]}80` : "none",
                  transition:"height 0.55s ease,width 0.55s ease,background 0.55s ease,box-shadow 0.55s ease",
                  cursor:"pointer",
                  display:"block",
                }}
                whileTap={{ scale:0.6 }}
                onClick={() => handleDot(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MissionVisionSection() {
  return (
    <section aria-labelledby="mission-heading" className="relative z-10 px-4 py-10" style={{ background: "transparent", margin: 0, borderTop: "none", borderBottom: "none" }}>
      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn className="mb-8 text-center">
          <SectionLabel>Mission &amp; Vision</SectionLabel>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">
          {/* LEFT — Chaos to Intelligence */}
          <FadeIn delay={0.05} className="h-full">
            <ChaosToIntelligence />
          </FadeIn>

          {/* RIGHT — Cards */}
          <div className="flex flex-col gap-6">
            <FadeIn delay={0.18}>
              <GlassCard className="p-9" accentColor="rgba(6,182,212,0.65)" glowColor="rgba(6,182,212,0.2)" hover>
                <SectionLabel>Our Mission</SectionLabel>
                <h2 id="mission-heading" style={{ fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.1, fontSize:"clamp(24px, 2.5vw, 36px)", marginBottom:16 }}>
                  Make GCC hiring fast, fair, and fully compliant.
                </h2>
                <p style={{ fontFamily:"var(--font-inter), Inter, sans-serif", fontSize:17, lineHeight:1.7, color:"rgba(255,255,255,0.55)", fontWeight:400 }}>
                  To eliminate inefficiency in hiring while solving the GCC&apos;s biggest challenge — keeping every recruiter ahead of nationalization deadlines, penalties, and audit cycles.
                </p>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.28}>
              <GlassCard className="p-9" accentColor="rgba(167,139,250,0.65)" glowColor="rgba(167,139,250,0.2)" hover>
                <SectionLabel>Our Vision</SectionLabel>
                <h2 id="vision-heading" style={{ fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.1, fontSize:"clamp(24px, 2.5vw, 36px)", marginBottom:16 }}>
                  The GCC&apos;s hiring intelligence layer.
                </h2>
                <p style={{ fontFamily:"var(--font-inter), Inter, sans-serif", fontSize:17, lineHeight:1.7, color:"rgba(255,255,255,0.55)", fontWeight:400 }}>
                  Every recruiter in the region using one platform that thinks ahead, finds talent faster, and keeps companies penalty-free — turning compliance from a burden into a competitive edge.
                </p>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 4 — PROBLEM ──────────────────────────────────────────────────────

const BROKEN_STEPS = [
  { label:"Email inbox",    issue:"Candidates lost in threads",       rotate:-2,   color:"#f87171" },
  { label:"Spreadsheet",    issue:"Manual errors, no version control",rotate:1.5,  color:"#a855f7" },
  { label:"ATS",            issue:"Rigid, poor candidate experience", rotate:-1,   color:"#c084fc" },
  { label:"Interview Tool", issue:"Disconnected from pipeline",       rotate:2,    color:"#f472b6" },
  { label:"Notes & Docs",   issue:"Insights lost after meetings",     rotate:-1.5, color:"#f87171" },
  { label:"Chaos",          issue:"No single source of truth",        rotate:3,    color:"#ef4444" },
];

const PROBLEMS = [
  { icon:Clock,     label:"Manual CV screening slows teams down",           color:"#f87171" },
  { icon:Users,     label:"Top candidates are lost due to delays",           color:"#a855f7" },
  { icon:BarChart3, label:"Decisions are made without complete data",        color:"#c084fc" },
  { icon:Layers,    label:"Multiple disconnected tools create inefficiency", color:"#f472b6" },
];

function BrokenWorkflow() {
  const [hovered, setHovered] = useState<number|null>(null);
  return (
    <div className="relative overflow-visible rounded-2xl border border-red-500/10 p-8"
      style={{ background:"rgba(6,10,16,0.76)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)" }}>
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-white/32">
        System Breakdown · Typical Hiring Workflow
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-6">
        {BROKEN_STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div className="relative cursor-default" style={{ transform:`rotate(${step.rotate}deg)` }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <div className="rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200"
                style={{ borderColor:hovered===i?`${step.color}60`:`${step.color}22`, background:hovered===i?`${step.color}14`:"rgba(255,255,255,0.03)", color:hovered===i?step.color:"rgba(255,255,255,0.45)", boxShadow:hovered===i?`0 0 24px ${step.color}30`:"none" }}>
                {step.label}
              </div>
              {hovered===i && (
                <motion.div className="absolute -top-12 left-1/2 z-20 w-max max-w-[180px] rounded-lg border px-3 py-2 text-center text-xs font-medium"
                  style={{ transform:"translateX(-50%)", background:"rgba(4,8,12,0.96)", borderColor:`${step.color}45`, color:step.color }}
                  initial={{ opacity:0, y:4, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ duration:0.14 }}>
                  {step.issue}
                </motion.div>
              )}
            </div>
            {i < BROKEN_STEPS.length-1 && (
              <span className="text-red-500/32 font-bold text-base">→</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-red-400/52">No unified view. No speed. No clarity.</p>
    </div>
  );
}

function ProblemSection() {
  return (
    <section aria-labelledby="problem-heading" className="relative z-10 px-4 py-10" style={{ background: "transparent", marginTop: 80, borderTop: "none", borderBottom: "none" }}>
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-8 text-center">
          <SectionLabel>The Problem</SectionLabel>
          <h2 id="problem-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.1 }}>
            Hiring Today{" "}
            <span style={{ color: "#f0a500" }}>is Broken</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl" style={{ fontFamily:"var(--font-inter), Inter, sans-serif", fontSize:17, lineHeight:1.7, color:"rgba(255,255,255,0.55)", fontWeight:400 }}>Most hiring teams are working against their tools — not with them.</p>
        </FadeIn>

        <div className="mb-8 grid gap-5 sm:grid-cols-2">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeIn key={p.label} delay={i*0.08}>
                <GlassCard className="flex items-start gap-5 p-7" accentColor={`${p.color}80`} glowColor={`${p.color}20`} hover>
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ background:`${p.color}18`, border:`1px solid ${p.color}35` }}>
                    <Icon size={20} style={{ color:p.color }} aria-hidden="true" />
                  </div>
                  <p className="text-base font-medium text-white/75 leading-relaxed">{p.label}</p>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.32}>
          <BrokenWorkflow />
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SECTION 5 — SOLUTION (SEQUENTIAL PIPELINE) ───────────────────────────────

const FLOW_STEPS = [
  { label:"CV",        icon:FileText,  color:"#a78bfa", desc:"Parsed & ranked" },
  { label:"Screening", icon:Brain,     color:"#67e8f9", desc:"AI-powered" },
  { label:"Interview", icon:Video,     color:"#6ee7b7", desc:"Structured" },
  { label:"Scoring",   icon:BarChart3, color:"#c084fc", desc:"Data-driven" },
  { label:"Insights",  icon:Sparkles,  color:"#f472b6", desc:"Full clarity" },
];

function SolutionPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, amount:0.35 });
  const shouldReduce = useReducedMotion();

  return (
    <div ref={ref}>

      {/* ── Mobile: vertical stack ── */}
      <div className="flex flex-col items-stretch gap-0 sm:hidden">
        {FLOW_STEPS.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === FLOW_STEPS.length - 1;
          return (
            <div key={step.label} className="flex flex-col items-center">
              <motion.div
                className="flex w-full items-center gap-4 rounded-2xl px-5 py-4"
                style={{ background:`${step.color}0d`, border:`1px solid ${step.color}28` }}
                initial={{ opacity:0, x:-18 }}
                animate={inView ? { opacity:1, x:0 } : {}}
                transition={{ ...SPRING, delay:shouldReduce?0:0.14+i*0.16 }}>
                <motion.div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ background:`${step.color}18`, border:`1px solid ${step.color}40` }}
                  animate={inView && !shouldReduce ? {
                    boxShadow:[`0 0 0px ${step.color}00`,`0 0 20px ${step.color}60`,`0 0 0px ${step.color}00`],
                  } : {}}
                  transition={{ duration:2.6, repeat:Infinity, delay:0.5+i*0.5 }}>
                  <Icon size={20} style={{ color:step.color }} aria-hidden="true" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-white/90">{step.label}</p>
                  <p className="text-xs text-white/45">{step.desc}</p>
                </div>
                <span className="ml-auto text-xs font-bold tabular-nums" style={{ color:step.color }}>
                  0{i+1}
                </span>
              </motion.div>

              {!isLast && (
                <motion.div
                  className="flex flex-col items-center py-1"
                  initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
                  transition={{ delay:shouldReduce?0:0.28+i*0.16 }}>
                  <div className="h-5 w-px" style={{ background:`linear-gradient(to bottom,${step.color}50,${FLOW_STEPS[i+1].color}50)` }} />
                  <ArrowRight size={11} style={{ color:`${FLOW_STEPS[i+1].color}60`, transform:"rotate(90deg)" }} aria-hidden="true" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Desktop: horizontal flow ── */}
      <div className="hidden sm:flex flex-wrap items-start justify-center gap-0">
        {FLOW_STEPS.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === FLOW_STEPS.length-1;
          return (
            <div key={step.label} className="flex items-center">
              <motion.div className="flex flex-col items-center gap-2"
                initial={{ opacity:0, scale:0.65 }}
                animate={inView ? { opacity:1, scale:1 } : {}}
                transition={{ ...SPRING, delay:shouldReduce?0:0.18+i*0.22 }}>

                <motion.div className="relative flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background:`${step.color}18`, border:`1px solid ${step.color}40` }}
                  animate={inView && !shouldReduce ? {
                    boxShadow:[`0 0 0px ${step.color}00`,`0 0 32px ${step.color}65`,`0 0 14px ${step.color}30`,`0 0 32px ${step.color}65`,`0 0 0px ${step.color}00`],
                  } : {}}
                  transition={{ duration:2.6, repeat:Infinity, delay:0.5+i*0.5 }}>
                  {isLast && (
                    <motion.div className="absolute inset-0 rounded-2xl"
                      style={{ border:`1px solid ${step.color}55` }}
                      animate={inView && !shouldReduce ? { scale:[1,1.38,1], opacity:[0.55,0,0.55] } : {}}
                      transition={{ duration:2, repeat:Infinity, delay:1.5 }} />
                  )}
                  <Icon size={24} style={{ color:step.color }} aria-hidden="true" />
                </motion.div>

                <motion.div className="text-center"
                  initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
                  transition={{ delay:shouldReduce?0:0.36+i*0.22 }}>
                  <p className="text-sm font-bold text-white/85">{step.label}</p>
                  <p className="text-xs text-white/42">{step.desc}</p>
                </motion.div>
              </motion.div>

              {!isLast && (
                <motion.div className="mx-2 mb-6 flex items-center"
                  initial={{ opacity:0, scaleX:0 }} animate={inView ? { opacity:1, scaleX:1 } : {}}
                  transition={{ delay:shouldReduce?0:0.36+i*0.22, duration:0.28 }}
                  style={{ transformOrigin:"left" }}>
                  <div className="relative h-px w-14 overflow-hidden"
                    style={{ background:`linear-gradient(90deg,${step.color}40,${FLOW_STEPS[i+1].color}40)` }}>
                    {inView && !shouldReduce && (
                      <motion.div className="absolute inset-y-0 w-6 rounded-full"
                        style={{ background:`linear-gradient(90deg,transparent,${step.color},transparent)` }}
                        animate={{ x:[-24,56] }}
                        transition={{ duration:1.1, repeat:Infinity, ease:"linear", delay:0.6+i*0.38 }} />
                    )}
                  </div>
                  <ArrowRight size={13} style={{ color:`${FLOW_STEPS[i+1].color}55` }} className="-ml-1" aria-hidden="true" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

function SolutionSection() {
  return (
    <section aria-labelledby="solution-heading" className="relative z-10 px-4 py-10" style={{ background: "transparent", margin: 0, borderTop: "none", borderBottom: "none" }}>
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-8 text-center">
          <SectionLabel>The Solution</SectionLabel>
          <h2 id="solution-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.1 }}>
            What{" "}
            <span style={{ color: "#f0a500" }}>Clavo Changes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl" style={{ fontFamily:"var(--font-inter), Inter, sans-serif", fontSize:17, lineHeight:1.7, color:"rgba(255,255,255,0.55)", fontWeight:400 }}>
            Clavo AI brings the entire hiring workflow into one intelligent system — from screening to interviews to analytics.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <GlassCard className="p-6 sm:p-10 lg:p-16" accentColor="rgba(240,165,0,0.70)" glowColor="rgba(240,165,0,0.18)" style={{ border: "1px solid rgba(240,165,0,0.22)", boxShadow: "0 0 40px rgba(240,165,0,0.10), 0 4px 32px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)" }}>
            <SolutionPipeline />
            <div className="mt-8 flex justify-center">
              <p className="rounded-full px-4 py-2.5 text-center text-xs sm:text-sm text-white/55" style={{ border: "1px solid rgba(240,165,0,0.30)", background: "rgba(240,165,0,0.05)", boxShadow: "0 0 14px rgba(240,165,0,0.14)" }}>
                One unified system. Zero fragmentation. Full pipeline intelligence.
              </p>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SECTION 9 — ROI DASHBOARD ────────────────────────────────────────────────

type MetricItem = { label:string; target:number; prefix:string; suffix:string; color:string; icon:React.ElementType; bars:number[] };

const METRICS: MetricItem[] = [
  { label:"Time to hire",           target:42,  prefix:"↓ ", suffix:"%", color:"#6ee7b7", icon:Clock,      bars:[78,62,48,35,26] },
  { label:"Cost per hire",          target:35,  prefix:"↓ ", suffix:"%", color:"#67e8f9", icon:TrendingUp,  bars:[68,58,50,42,33] },
  { label:"Recruiter productivity", target:3,   prefix:"",   suffix:"×", color:"#a78bfa", icon:Zap,         bars:[28,48,68,84,100] },
  { label:"Candidate visibility",   target:100, prefix:"",   suffix:"%", color:"#c084fc", icon:Target,      bars:[18,38,60,78,100] },
];

function MetricCard({ m, delay }: { m:MetricItem; delay:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, amount:0.5 });
  const count = useCounter(m.target, inView);
  const Icon = m.icon;

  return (
    <FadeIn delay={delay}>
      <GlassCard className="p-6" accentColor={`${m.color}80`} glowColor={`${m.color}20`} hover>
        <div ref={ref}>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background:`${m.color}18`, border:`1px solid ${m.color}35` }}>
              <Icon size={20} style={{ color:m.color }} aria-hidden="true" />
            </div>
            <span className="text-3xl font-extrabold tabular-nums" style={{ color:m.color }}>
              {m.prefix}{count}{m.suffix}
            </span>
          </div>

          {/* Mini bar chart */}
          <div className="mb-4 flex h-14 items-end gap-1">
            {m.bars.map((h, i) => (
              <motion.div key={i} className="flex-1 rounded-sm"
                style={{ background:`${m.color}${i===m.bars.length-1?"cc":"42"}`, maxWidth:16 }}
                initial={{ height:0 }}
                animate={inView ? { height:`${h}%` } : { height:0 }}
                transition={{ duration:0.55, delay:delay+0.18+i*0.09, ease:"easeOut" }} />
            ))}
          </div>

          <p className="text-sm text-white/52">{m.label}</p>
        </div>
      </GlassCard>
    </FadeIn>
  );
}

function ImpactSection() {
  return (
    <section aria-labelledby="impact-heading" className="relative z-10 px-4 py-10" style={{ background: "transparent", margin: 0, borderTop: "none", borderBottom: "none" }}>
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-8 text-center">
          <SectionLabel>ROI &amp; Impact</SectionLabel>
          <h2 id="impact-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.1 }}>
            Real Impact{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">on Hiring</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md" style={{ fontFamily:"var(--font-inter), Inter, sans-serif", fontSize:17, lineHeight:1.7, color:"rgba(255,255,255,0.55)", fontWeight:400 }}>What recruiting teams experience when they switch to Clavo.</p>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => <MetricCard key={m.label} m={m} delay={i*0.1} />)}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 10 — EARLY ACCESS CTA ───────────────────────────────────────────

function AIPositionSection() {
  return (
    <section className="relative z-10 px-4 py-20" style={{ background: "transparent" }}>
      <div className="relative mx-auto max-w-3xl text-center">
        <FadeIn>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#a78bfa", marginBottom: 16, textTransform: "uppercase" }}>
            Get Started
          </div>
          <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
            Ready to hire smarter in the <span style={{ color: "#f0a500" }}>GCC?</span>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
            Join teams across Saudi Arabia, UAE, and the wider GCC already on the waitlist.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/book-demo"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", borderRadius: 12,
                background: "#f0a500", color: "#000",
                fontWeight: 700, fontSize: 15, textDecoration: "none",
                boxShadow: "0 0 32px rgba(240,165,0,0.35)",
                transition: "opacity 0.15s",
              }}
            >
              Book a Demo
            </a>
            <a
              href="/book-demo"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", borderRadius: 12,
                border: "1px solid rgba(167,139,250,0.35)",
                background: "rgba(167,139,250,0.07)", color: "#c4b5fd",
                fontWeight: 600, fontSize: 15, textDecoration: "none",
                transition: "opacity 0.15s",
              }}
            >
              Join Early Access
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SECTION 11 — CTA ─────────────────────────────────────────────────────────

function CTASection() {
  const shouldReduce = useReducedMotion();
  return (
    <section aria-labelledby="cta-heading" className="relative z-10 px-4 py-10" style={{ background: "transparent", margin: 0, borderTop: "none", borderBottom: "none", overflow: "hidden" }}>
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <img src="/about-bg3.jpg" alt="" style={{
          width: "100%", height: "100%", objectFit: "cover",
          animation: "kenBurnsAbout3 20s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(240,165,0,0.5) 0%, rgba(251,191,36,0.4) 40%, rgba(212,147,10,0.3) 70%, rgba(254,215,170,0.18) 100%)",
          mixBlendMode: "color" as React.CSSProperties["mixBlendMode"],
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(3,6,8,0.88) 0%, rgba(3,6,8,0.72) 40%, rgba(3,6,8,0.72) 60%, rgba(3,6,8,0.88) 100%)",
          pointerEvents: "none",
        }} />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 p-16 text-center"
            style={{ background:"linear-gradient(145deg,rgba(6,10,16,0.92),rgba(124,58,237,0.07),rgba(6,182,212,0.04))", backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)", boxShadow:"0 0 80px rgba(124,58,237,0.13),0 0 160px rgba(6,182,212,0.06),0 8px 48px rgba(0,0,0,0.72)" }}>

            {/* Top edge */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(167,139,250,0.82) 32%,rgba(6,182,212,0.62) 68%,transparent)" }} />

            {/* Moving light sweep */}
            {!shouldReduce && (
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="cta-light absolute top-0 h-full w-[28%]" style={{ background:"linear-gradient(90deg,transparent,rgba(167,139,250,0.045),transparent)", transform:"skewX(-14deg)" }} />
              </div>
            )}

            <SectionLabel>Get Started</SectionLabel>
            <h2 id="cta-heading" className="mb-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.1, textShadow:"0 0 60px rgba(124,58,237,0.2)" }}>
              Experience{" "}
              <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
                Hiring Intelligence
              </span>
            </h2>
            <p className="mx-auto mb-12 max-w-md" style={{ fontFamily:"var(--font-inter), Inter, sans-serif", fontSize:17, lineHeight:1.7, color:"rgba(255,255,255,0.55)", fontWeight:400 }}>
              Join hiring teams across GCC already using Clavo to hire faster and smarter.
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="/book-demo"
                className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:scale-[1.03]"
                style={{ background:"linear-gradient(135deg,#7c3aed,#0891b2)", boxShadow:"0 0 32px rgba(124,58,237,0.42),0 4px 20px rgba(0,0,0,0.4)" }}
                aria-label="Book a live demo with Clavo AI">
                Book a Live Demo
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a href="#about-hero-heading"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-8 py-4 text-sm font-semibold text-white/65 transition-all hover:border-white/18 hover:bg-white/[0.08] hover:text-white"
                aria-label="See Clavo in action">
                See Clavo in Action
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <PageBackground />
      <main className="relative min-h-screen" style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        {/* about-bg2 spans Mission & Vision + Hiring is Broken + What Clavo Changes */}
        <div style={{ position: "relative", overflow: "hidden", marginTop: 0, marginBottom: 0 }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src="/about-bg2.jpg" alt="" style={{
              width: "100%", height: "100%", objectFit: "cover",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(240,165,0,0.5) 0%, rgba(251,191,36,0.4) 40%, rgba(212,147,10,0.3) 70%, rgba(254,215,170,0.18) 100%)",
              mixBlendMode: "color" as React.CSSProperties["mixBlendMode"],
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(3,6,8,0.88) 0%, rgba(3,6,8,0.72) 40%, rgba(3,6,8,0.72) 60%, rgba(3,6,8,0.88) 100%)",
              pointerEvents: "none",
            }} />
            {/* Top fade — blends from #0a0810 hero bottom */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              height: 250, zIndex: 5,
              background: "linear-gradient(to top, transparent, #0a0810)",
              pointerEvents: "none",
            }} />
          </div>
          <MissionVisionSection />
          <ProblemSection />
          <SolutionSection />
        </div>
        <CompetitorTable />
        <AIPositionSection />
      </main>
    </>
  );
}
