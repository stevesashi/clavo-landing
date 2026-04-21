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
  Zap, BarChart3, Globe2, ArrowRight, Check,
  Target, Users, Layers, Shield, Sparkles, TrendingUp,
  Clock, FileText, Video, Brain, ChevronDown,
} from "lucide-react";

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
  color:    ["#a78bfa", "#67e8f9", "#fbbf24", "#6ee7b7", "#f472b6"][i % 5],
}));

const FIREFLIES = Array.from({ length: 6 }, (_, i) => ({
  left:     `${(i * 43 + 15) % 90}%`,
  top:      `${(i * 61 + 20) % 85}%`,
  color:    ["#a78bfa", "#67e8f9", "#6ee7b7", "#fbbf24", "#a78bfa"][i % 5],
  size:     2 + (i % 3) * 0.5,
  delay:    i * 0.9,
  duration: 9 + i * 1.4,
  driftX:   [0, 40 - i * 4, -28 + i * 3, 18, -12, 0] as number[],
  driftY:   [0, -30 + i * 2, 22 - i * 2, -40, 15, 0] as number[],
}));

// Hero AI nodes
const AI_NODES = [
  { x: 12, y: 22, r: 3.5, color: "#a78bfa", delay: 0   },
  { x: 88, y: 18, r: 3,   color: "#67e8f9", delay: 0.5 },
  { x: 25, y: 72, r: 2.5, color: "#6ee7b7", delay: 1.0 },
  { x: 78, y: 68, r: 3,   color: "#fbbf24", delay: 1.5 },
  { x: 50, y: 85, r: 2,   color: "#a78bfa", delay: 2.0 },
  { x: 18, y: 48, r: 2.5, color: "#67e8f9", delay: 2.5 },
  { x: 82, y: 44, r: 2,   color: "#6ee7b7", delay: 0.8 },
];

const AI_EDGES = [[0, 5], [1, 6], [5, 2], [6, 3], [2, 4], [3, 4], [5, 6]];

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
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#020507 0%,#030a10 40%,#04080c 70%,#020507 100%)" }} />

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
  return <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400/60">{children}</p>;
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

function HeroAINodes() {
  const shouldReduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {AI_EDGES.map(([a, b], i) => {
          const na = AI_NODES[a], nb = AI_NODES[b];
          return (
            <motion.line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="rgba(167,139,250,0.1)" strokeWidth="0.18" strokeDasharray="1 1.2"
              initial={{ opacity:0 }}
              animate={shouldReduce ? {} : { opacity:[0,0.45,0], strokeDashoffset:[0,-4,-8] }}
              transition={{ duration:4+i, repeat:Infinity, ease:"linear", delay:i*0.7 }}
            />
          );
        })}
        {AI_NODES.map((n, i) => (
          <motion.circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.color}
            initial={{ opacity:0, scale:0 }}
            animate={shouldReduce ? {} : { opacity:[0.15,0.65,0.15], scale:[0.8,1.2,0.8] }}
            transition={{ duration:3+(i%3), repeat:Infinity, ease:"easeInOut", delay:n.delay }}
            style={{ filter:`drop-shadow(0 0 ${n.r*2}px ${n.color})` }}
          />
        ))}
      </svg>
    </div>
  );
}

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

function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target:containerRef, offset:["start start","end start"] });
  const contentY = useTransform(scrollYProgress, [0,1], [0,-55]);
  const shouldReduce = useReducedMotion();

  return (
    <section ref={containerRef} aria-labelledby="about-hero-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28 pb-24">

      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background:"radial-gradient(ellipse at 50% 38%,rgba(124,58,237,0.12) 0%,rgba(3,6,8,0.55) 65%,rgba(3,6,8,0.85) 100%)" }} />

      <HeroAINodes />

      <motion.div style={shouldReduce ? {} : { y:contentY }}
        className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left: text */}
          <div className="text-center lg:text-left">
            <motion.div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/[0.08] px-4 py-1.5"
              initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ ...SPRING, delay:0.1 }}>
              <motion.span className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={shouldReduce ? {} : { opacity:[1,0.3,1] }} transition={{ duration:1.8, repeat:Infinity }} aria-hidden="true" />
              <span className="text-xs font-semibold text-white/55">Built for hiring teams across GCC &amp; APAC</span>
            </motion.div>

            <motion.h1 id="about-hero-heading"
              className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ lineHeight:1.07, textShadow:"0 0 80px rgba(124,58,237,0.2)" }}
              initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }} transition={{ ...SPRING, delay:0.2 }}>
              Redefining How{" "}
              <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
                the World Hires
              </span>
            </motion.h1>

            <motion.p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/45 sm:text-xl lg:mx-0"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ ...SPRING, delay:0.35 }}>
              Clavo AI is built for fast-scaling hiring teams across GCC &amp; APAC — bringing speed, intelligence, and clarity to every stage of hiring.
            </motion.p>

            <motion.p className="mx-auto mt-4 max-w-lg text-base text-white/45 lg:mx-0"
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
              Built for modern recruiters — not to replace them, but to empower them.
            </motion.p>

            <motion.div className="mt-12 flex justify-center lg:justify-start"
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}>
              <motion.div animate={shouldReduce ? {} : { y:[0,6,0] }} transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut" }}>
                <ChevronDown size={20} className="text-white/20" aria-hidden="true" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right: dashboard (desktop) */}
          <div className="hidden lg:block">
            <HeroDashboardCard />
          </div>
        </div>

        {/* Dashboard (mobile) */}
        <div className="mt-12 lg:hidden">
          <HeroDashboardCard />
        </div>
      </motion.div>
    </section>
  );
}

// ─── SECTION 2+3 — MISSION + VISION (MERGED) ─────────────────────────────────

// Chaos-to-Intelligence visual data
const CNODES = [
  { id:"a", label:"Email Inbox", cx:{x:-108,y:-72,r:-18,o:0.72}, sx:{x:-56,y:-44,r:-6,o:0.86}, fx:{x:-80,y:-54,r:0,o:1}, cc:"#f87171",fc:"#67e8f9",jx:2.5,jy:1.5,jr:1.5,jd:0.42 },
  { id:"b", label:"CV Stack",    cx:{x:76, y:-94,r:14, o:0.65}, sx:{x:36, y:-56,r:4, o:0.82}, fx:{x:0,  y:-54,r:0,o:1}, cc:"#fb923c",fc:"#a78bfa",jx:2,  jy:2,  jr:1.2,jd:0.38 },
  { id:"c", label:"ATS",         cx:{x:-32,y:-14,r:-9, o:0.72}, sx:{x:-16,y:-8, r:-2,o:0.88}, fx:{x:80, y:-54,r:0,o:1}, cc:"#fbbf24",fc:"#6ee7b7",jx:3,  jy:1,  jr:2,  jd:0.50 },
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
  const PCOLORS   = ["#f87171",     "#fbbf24",    "#6ee7b7"   ];

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
        style={{ transition:"background 1.4s ease", background:phase===0?"linear-gradient(90deg,transparent,rgba(248,113,113,0.7) 50%,transparent)":phase===1?"linear-gradient(90deg,transparent,rgba(251,191,36,0.7) 50%,transparent)":"linear-gradient(90deg,transparent,rgba(103,232,249,0.7) 50%,transparent)" }} />

      {/* Background glow — shifts color with phase */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ transition:"background 1.6s ease", background:phase===0?"radial-gradient(ellipse at 50% 50%,rgba(248,113,113,0.08) 0%,transparent 68%)":phase===1?"radial-gradient(ellipse at 50% 50%,rgba(251,191,36,0.07) 0%,transparent 68%)":"radial-gradient(ellipse at 50% 50%,rgba(6,182,212,0.09) 0%,transparent 68%)" }} />

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
          const col = phase===0 ? n.cc : phase===2 ? n.fc : "#fbbf24";
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
    <section aria-labelledby="mission-heading" className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center">
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
                <h2 id="mission-heading" className="mb-4 text-2xl font-extrabold tracking-tight text-white" style={{ lineHeight:1.2 }}>
                  Eliminate inefficiency.{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Surface talent faster.</span>
                </h2>
                <p className="text-base text-white/60 leading-relaxed">
                  To eliminate inefficiencies in hiring and empower recruiters with intelligent systems that surface the right candidates, faster.
                </p>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.28}>
              <GlassCard className="p-9" accentColor="rgba(167,139,250,0.65)" glowColor="rgba(167,139,250,0.2)" hover>
                <SectionLabel>Our Vision</SectionLabel>
                <h2 id="vision-heading" className="mb-4 text-2xl font-extrabold tracking-tight text-white" style={{ lineHeight:1.2 }}>
                  Hiring driven by{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">clarity, intelligence, and speed</span>
                </h2>
                <p className="text-base text-white/60 leading-relaxed">
                  We envision a future where hiring is driven by clarity, intelligence, and speed — where recruiters are equipped with AI systems that enhance their capabilities, not replace them.
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
  { label:"Spreadsheet",    issue:"Manual errors, no version control",rotate:1.5,  color:"#fb923c" },
  { label:"ATS",            issue:"Rigid, poor candidate experience", rotate:-1,   color:"#fbbf24" },
  { label:"Interview Tool", issue:"Disconnected from pipeline",       rotate:2,    color:"#f472b6" },
  { label:"Notes & Docs",   issue:"Insights lost after meetings",     rotate:-1.5, color:"#f87171" },
  { label:"Chaos",          issue:"No single source of truth",        rotate:3,    color:"#ef4444" },
];

const PROBLEMS = [
  { icon:Clock,     label:"Manual CV screening slows teams down",           color:"#f87171" },
  { icon:Users,     label:"Top candidates are lost due to delays",           color:"#fb923c" },
  { icon:BarChart3, label:"Decisions are made without complete data",        color:"#fbbf24" },
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
    <section aria-labelledby="problem-heading" className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-14 text-center">
          <SectionLabel>The Problem</SectionLabel>
          <h2 id="problem-heading" className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ lineHeight:1.12 }}>
            Hiring Today{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">is Broken</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/52">Most hiring teams are working against their tools — not with them.</p>
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
  { label:"Scoring",   icon:BarChart3, color:"#fbbf24", desc:"Data-driven" },
  { label:"Insights",  icon:Sparkles,  color:"#f472b6", desc:"Full clarity" },
];

function SolutionPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, amount:0.35 });
  const shouldReduce = useReducedMotion();

  return (
    <div ref={ref} className="flex flex-wrap items-start justify-center gap-0">
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
  );
}

function SolutionSection() {
  return (
    <section aria-labelledby="solution-heading" className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-14 text-center">
          <SectionLabel>The Solution</SectionLabel>
          <h2 id="solution-heading" className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ lineHeight:1.12 }}>
            What{" "}
            <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">Clavo Changes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/52">
            Clavo AI brings the entire hiring workflow into one intelligent system — from screening to interviews to analytics.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <GlassCard className="p-10 sm:p-16" accentColor="rgba(167,139,250,0.65)">
            <SolutionPipeline />
            <div className="mt-8 flex justify-center">
              <p className="rounded-full border border-white/[0.07] bg-white/[0.03] px-6 py-2.5 text-center text-sm text-white/45">
                One unified system. Zero fragmentation. Full pipeline intelligence.
              </p>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SECTION 6 — VALUES (INTERACTIVE) ────────────────────────────────────────

const VALUES = [
  { icon:Zap,    title:"Speed with Precision",        body:"We believe hiring should be fast, but never rushed.",     color:"#fbbf24" },
  { icon:Brain,  title:"Intelligence Over Intuition",  body:"Better data leads to better hiring outcomes.",             color:"#a78bfa" },
  { icon:Users,  title:"Recruiter Empowerment",        body:"We build tools to amplify recruiters, not replace them.",  color:"#67e8f9" },
  { icon:Layers, title:"Simplicity at Scale",          body:"Powerful systems should still feel simple to use.",        color:"#6ee7b7" },
];

function ValueCard({ v, delay }: { v: typeof VALUES[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = v.icon;
  return (
    <FadeIn delay={delay}>
      <motion.div
        className="relative h-full cursor-default overflow-hidden rounded-2xl border p-8"
        style={{
          borderColor:hovered?`${v.color}42`:"rgba(255,255,255,0.07)",
          background:hovered?`linear-gradient(145deg,rgba(6,10,16,0.88),${v.color}09)`:"rgba(6,10,16,0.76)",
          backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)",
          boxShadow:hovered?`0 12px 44px rgba(0,0,0,0.62),0 0 36px ${v.color}18,inset 0 0 0 1px ${v.color}22`:"0 4px 32px rgba(0,0,0,0.52),inset 0 0 0 1px rgba(255,255,255,0.04)",
          transition:"all 0.24s ease",
        }}
        whileHover={{ y:-5 }} transition={{ duration:0.22 }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
          style={{ background:`linear-gradient(90deg,transparent,${v.color}${hovered?"95":"52"} 50%,transparent)`, transition:"background 0.24s ease" }} />

        <motion.div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background:`${v.color}18`, border:`1px solid ${v.color}${hovered?"52":"32"}` }}
          animate={hovered ? { rotate:[0,-8,8,-4,4,0], scale:1.1 } : { rotate:0, scale:1 }}
          transition={{ duration:0.48 }}>
          <Icon size={22} style={{ color:v.color }} aria-hidden="true" />
        </motion.div>

        <h3 className="mb-2.5 text-lg font-bold" style={{ color:hovered?"#fff":"rgba(255,255,255,0.88)", transition:"color 0.2s" }}>{v.title}</h3>
        <p className="text-base leading-relaxed" style={{ color:hovered?"rgba(255,255,255,0.62)":"rgba(255,255,255,0.50)", transition:"color 0.2s" }}>{v.body}</p>
      </motion.div>
    </FadeIn>
  );
}

function ValuesSection() {
  return (
    <section aria-labelledby="values-heading" className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-14 text-center">
          <SectionLabel>Our Values</SectionLabel>
          <h2 id="values-heading" className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ lineHeight:1.12 }}>
            What We{" "}
            <span className="bg-gradient-to-r from-amber-300 to-purple-300 bg-clip-text text-transparent">Stand For</span>
          </h2>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2">
          {VALUES.map((v, i) => <ValueCard key={v.title} v={v} delay={i*0.09} />)}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 7 — WHY CLAVO (FEATURE GRID) ────────────────────────────────────

const WHY_CARDS = [
  { icon:Layers, title:"End-to-End System",    body:"Clavo is not a point solution — it covers the entire hiring workflow.",              color:"#a78bfa" },
  { icon:Shield, title:"Flexibility",           body:"Designed to adapt to different hiring processes across industries and regions.",      color:"#67e8f9" },
  { icon:Brain,  title:"Autonomous Copilot",    body:"The first AI hiring copilot that supports recruiters across every stage.",           color:"#6ee7b7" },
  { icon:Globe2, title:"Built for GCC & APAC",  body:"Designed for fast-scaling markets with real hiring challenges.",                    color:"#fbbf24" },
];

function WhyCard({ c, delay }: { c: typeof WHY_CARDS[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = c.icon;
  return (
    <FadeIn delay={delay}>
      <motion.div
        className="relative h-full cursor-default overflow-hidden rounded-2xl border p-8"
        style={{
          borderColor:hovered?`${c.color}38`:"rgba(255,255,255,0.07)",
          background:"rgba(6,10,16,0.76)",
          backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)",
          boxShadow:hovered?`0 10px 40px rgba(0,0,0,0.58),0 0 28px ${c.color}14`:"0 4px 32px rgba(0,0,0,0.52)",
          transition:"all 0.24s ease",
        }}
        whileHover={{ y:-4, scale:1.012 }} transition={{ duration:0.22 }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
          style={{ background:`linear-gradient(90deg,transparent,${c.color}${hovered?"82":"48"} 50%,transparent)`, transition:"background 0.24s ease" }} />

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background:`${c.color}18`, border:`1px solid ${c.color}30` }}>
          <Icon size={22} style={{ color:c.color }} aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-lg font-bold text-white/90">{c.title}</h3>
        <p className="mb-5 text-base text-white/55 leading-relaxed">{c.body}</p>

        {/* Animated underline */}
        <div className="relative h-px overflow-hidden rounded-full" style={{ background:"rgba(255,255,255,0.06)" }}>
          <motion.div className="absolute inset-y-0 left-0 rounded-full"
            style={{ background:`linear-gradient(90deg,${c.color}70,${c.color})` }}
            animate={hovered ? { width:"100%" } : { width:"0%" }}
            transition={{ duration:0.38, ease:[0.16,1,0.3,1] }} />
        </div>
      </motion.div>
    </FadeIn>
  );
}

function WhyClavoSection() {
  return (
    <section aria-labelledby="why-heading" className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-14 text-center">
          <SectionLabel>Why Clavo</SectionLabel>
          <h2 id="why-heading" className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ lineHeight:1.12 }}>
            Built for the{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">next generation</span>{" "}
            of hiring teams.
          </h2>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2">
          {WHY_CARDS.map((c, i) => <WhyCard key={c.title} c={c} delay={i*0.09} />)}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 8 — POSITIONING (SHOWSTOPPER) ───────────────────────────────────

function PositioningSection() {
  const pointItems = [
    { label:"Focus on a single hiring stage",    tag:"Fragmented" },
    { label:"Limited pipeline visibility",        tag:"Single-point" },
    { label:"Require multiple tools to operate",  tag:"Limited visibility" },
  ];
  const clavoItems = [
    { label:"Unified system across all stages",  tag:"Unified system" },
    { label:"Full pipeline intelligence",         tag:"End-to-end" },
    { label:"Faster, lower-friction workflows",   tag:"Full visibility" },
  ];

  return (
    <section aria-labelledby="positioning-heading" className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-14 text-center">
          <SectionLabel>Positioning</SectionLabel>
          <h2 id="positioning-heading" className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ lineHeight:1.12 }}>
            Beyond{" "}
            <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">Point Solutions</span>
          </h2>
        </FadeIn>

        <div className="relative grid gap-6 sm:grid-cols-2">
          {/* Left — competitors */}
          <FadeIn>
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] p-9"
              style={{ background:"rgba(6,10,16,0.68)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)" }}>
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(239,68,68,0.32) 50%,transparent)" }} />
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-red-400/55">Point Tools</p>
              <p className="mb-7 text-sm text-white/38">HireVue, Metaview, et al.</p>
              <ul className="flex flex-col gap-5">
                {pointItems.map((item) => (
                  <li key={item.label} className="flex flex-col gap-2">
                    <span className="inline-flex w-fit rounded-md border border-red-500/20 bg-red-500/[0.08] px-2.5 py-1 text-xs font-bold text-red-400/70">{item.tag}</span>
                    <span className="text-base text-white/48">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Right — Clavo */}
          <FadeIn delay={0.12}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-purple-500/22 p-9"
              style={{ background:"linear-gradient(145deg,rgba(6,10,16,0.84),rgba(124,58,237,0.07))", backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)", boxShadow:"0 0 40px rgba(124,58,237,0.08)" }}>
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(167,139,250,0.72) 50%,transparent)" }} />
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-purple-300/65">Clavo AI</p>
              <p className="mb-7 text-sm text-white/38">End-to-end hiring intelligence</p>
              <ul className="flex flex-col gap-5">
                {clavoItems.map((item) => (
                  <li key={item.label} className="flex flex-col gap-2">
                    <span className="inline-flex items-center gap-1.5 w-fit rounded-md border border-emerald-500/25 bg-emerald-500/[0.08] px-2.5 py-1 text-xs font-bold text-emerald-400/82">
                      <Check size={10} aria-hidden="true" />{item.tag}
                    </span>
                    <span className="text-base text-white/72">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* VS badge (absolute center on desktop) */}
          <div className="pointer-events-none absolute inset-0 hidden sm:flex items-center justify-center">
            <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/28 bg-[rgba(6,10,16,0.92)] text-[11px] font-extrabold text-white/45 backdrop-blur-sm"
              style={{ boxShadow:"0 0 20px rgba(124,58,237,0.22)" }}>VS</div>
          </div>
        </div>
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
  { label:"Candidate visibility",   target:100, prefix:"",   suffix:"%", color:"#fbbf24", icon:Target,      bars:[18,38,60,78,100] },
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
    <section aria-labelledby="impact-heading" className="relative z-10 px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-14 text-center">
          <SectionLabel>ROI &amp; Impact</SectionLabel>
          <h2 id="impact-heading" className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ lineHeight:1.12 }}>
            Real Impact{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">on Hiring</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/48">What recruiting teams experience when they switch to Clavo.</p>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => <MetricCard key={m.label} m={m} delay={i*0.1} />)}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 10 — AI POSITION (EMOTIONAL) ────────────────────────────────────

function AIPositionSection() {
  const shouldReduce = useReducedMotion();
  return (
    <section aria-labelledby="ai-position-heading" className="relative z-10 px-4 py-28">
      <motion.div aria-hidden="true" className="pointer-events-none absolute rounded-full"
        style={{ width:700, height:700, left:"50%", top:"50%", transform:"translate(-50%,-50%)", background:"radial-gradient(circle,rgba(124,58,237,0.09) 0%,transparent 70%)", filter:"blur(60px)" }}
        animate={shouldReduce ? {} : { scale:[1,1.12,1], opacity:[0.7,1,0.7] }}
        transition={{ duration:8, repeat:Infinity, ease:"easeInOut" }} />

      <div className="relative mx-auto max-w-4xl text-center">
        <FadeIn>
          <SectionLabel>Our Position on AI</SectionLabel>
          <h2 id="ai-position-heading"
            className="mb-5 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ lineHeight:1.07, textShadow:"0 0 80px rgba(124,58,237,0.22)" }}>
            AI + Recruiters.
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
              Not AI vs Recruiters.
            </span>
          </h2>

          {/* Animated underline */}
          <div className="mb-14 flex justify-center">
            <div className="relative h-0.5 w-64 overflow-hidden rounded-full" style={{ background:"rgba(255,255,255,0.06)" }}>
              <div className="pulse-ul absolute inset-0 rounded-full" style={{ background:"linear-gradient(90deg,rgba(167,139,250,0.85),rgba(6,182,212,0.85))" }} />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/[0.08] p-12"
            style={{ background:"rgba(6,10,16,0.8)", backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)" }}
            animate={shouldReduce ? {} : { boxShadow:["0 4px 32px rgba(0,0,0,0.55),0 0 0px rgba(124,58,237,0)","0 4px 32px rgba(0,0,0,0.55),0 0 56px rgba(124,58,237,0.12)","0 4px 32px rgba(0,0,0,0.55),0 0 0px rgba(124,58,237,0)"] }}
            transition={{ duration:4.5, repeat:Infinity, ease:"easeInOut" }}>
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(167,139,250,0.65) 50%,transparent)" }} />
            <p className="mb-7 text-lg text-white/62 leading-relaxed">
              Clavo is not built to replace recruiters. It is built to equip them — giving them the tools, insights, and speed needed to thrive in a rapidly changing hiring landscape.
            </p>
            <div className="mx-auto max-w-lg rounded-xl border border-purple-500/15 bg-purple-500/[0.06] px-8 py-6">
              <p className="text-base font-semibold text-purple-200/72 leading-relaxed">
                "This is not automation replacing people. This is intelligence empowering them."
              </p>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SECTION 11 — CTA ─────────────────────────────────────────────────────────

function CTASection() {
  const shouldReduce = useReducedMotion();
  return (
    <section aria-labelledby="cta-heading" className="relative z-10 px-4 py-32">
      <div className="mx-auto max-w-4xl">
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
            <h2 id="cta-heading" className="mb-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
              style={{ lineHeight:1.1, textShadow:"0 0 60px rgba(124,58,237,0.2)" }}>
              Experience{" "}
              <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
                Hiring Intelligence
              </span>
            </h2>
            <p className="mx-auto mb-12 max-w-md text-lg text-white/52">
              Join hiring teams across GCC &amp; APAC already using Clavo to hire faster and smarter.
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
      <main className="relative min-h-screen">
        <HeroSection />
        <MissionVisionSection />
        <ProblemSection />
        <SolutionSection />
        <ValuesSection />
        <WhyClavoSection />
        <PositioningSection />
        <ImpactSection />
        <AIPositionSection />
        <CTASection />
      </main>
    </>
  );
}
