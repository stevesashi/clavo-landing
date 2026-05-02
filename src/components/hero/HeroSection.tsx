"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Zap,
  TrendingUp,
  Users,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";

// ─── Palette Tokens ────────────────────────────────────────────────────────────
// cyan-500   : #06b6d4
// purple-700 : #7c3aed
// purple-950 : #1e0a3c  (deep bg base)
// ───────────────────────────────────────────────────────────────────────────────

// ─── Animation Variants ────────────────────────────────────────────────────────

const SPRING = { type: "spring", stiffness: 260, damping: 24 } as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SPRING },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ...SPRING, stiffness: 300 } },
};

// ─── Glass Card Primitive ──────────────────────────────────────────────────────

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

function GlassCard({ children, className = "", style, "aria-label": ariaLabel }: GlassCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      aria-label={ariaLabel}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] ${className}`}
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.06) inset, 0 8px 48px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.08) inset",
        ...style,
      }}
    >
      {/* Top-edge light streak */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(6,182,212,0.6) 40%, rgba(124,58,237,0.5) 60%, transparent)",
        }}
      />
      {children}
    </motion.div>
  );
}

// ─── Aurora / Mesh Gradient Background ────────────────────────────────────────

function AuroraBackground() {
  const shouldReduce = useReducedMotion();

  const orbs = [
    {
      color: "radial-gradient(ellipse at center, rgba(6,182,212,0.55) 0%, transparent 70%)",
      className: "w-[700px] h-[700px] left-[-120px] top-[-180px]",
      animate: shouldReduce ? {} : { x: [0, 30, 0], y: [0, 20, 0] },
      duration: 14,
    },
    {
      color: "radial-gradient(ellipse at center, rgba(124,58,237,0.65) 0%, transparent 70%)",
      className: "w-[800px] h-[800px] right-[-200px] top-[-100px]",
      animate: shouldReduce ? {} : { x: [0, -25, 0], y: [0, 30, 0] },
      duration: 18,
    },
    {
      color: "radial-gradient(ellipse at center, rgba(6,182,212,0.35) 0%, transparent 65%)",
      className: "w-[600px] h-[600px] left-[30%] bottom-[-150px]",
      animate: shouldReduce ? {} : { x: [0, 15, 0], y: [0, -20, 0] },
      duration: 16,
    },
    {
      color: "radial-gradient(ellipse at center, rgba(88,28,135,0.55) 0%, transparent 70%)",
      className: "w-[500px] h-[500px] left-[10%] top-[40%]",
      animate: shouldReduce ? {} : { x: [0, -18, 0], y: [0, 25, 0] },
      duration: 20,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0e0420 0%, #0a1628 50%, #0e0420 100%)" }}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute blur-3xl ${orb.className}${i >= 2 ? " hidden md:block" : " opacity-50 md:opacity-100"}`}
          style={{ background: orb.color }}
          animate={orb.animate}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Noise grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}

// ─── Glow Button ──────────────────────────────────────────────────────────────

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function GlowButton({ children, onClick }: GlowButtonProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.button
      onClick={onClick}
      aria-label="Get started with Clavo AI — The Future of Behavioral Recruitment"
      className="group relative inline-flex cursor-pointer items-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
      style={{
        background: "linear-gradient(135deg, #06b6d4 0%, #7c3aed 60%, #4f1d96 100%)",
        touchAction: "manipulation",
      }}
      whileHover={shouldReduce ? {} : { scale: 1.05 }}
      whileTap={shouldReduce ? {} : { scale: 0.96 }}
      animate={
        shouldReduce
          ? {}
          : {
              boxShadow: [
                "0 0 18px rgba(6,182,212,0.5), 0 0 40px rgba(124,58,237,0.3), 0 4px 20px rgba(0,0,0,0.6)",
                "0 0 32px rgba(6,182,212,0.85), 0 0 64px rgba(124,58,237,0.55), 0 4px 24px rgba(0,0,0,0.6)",
                "0 0 18px rgba(6,182,212,0.5), 0 0 40px rgba(124,58,237,0.3), 0 4px 20px rgba(0,0,0,0.6)",
              ],
            }
      }
      transition={
        shouldReduce
          ? {}
          : {
              boxShadow: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 340, damping: 22 },
            }
      }
    >
      {/* Inner glass sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
        }}
      />
      {/* Outer ring pulse */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
        animate={
          shouldReduce
            ? {}
            : {
                boxShadow: [
                  "0 0 0 0px rgba(6,182,212,0.55)",
                  "0 0 0 8px rgba(6,182,212,0)",
                ],
              }
        }
        transition={shouldReduce ? {} : { duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="relative z-10">{children}</span>
      <ArrowRight
        size={18}
        aria-hidden="true"
        className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
      />
    </motion.button>
  );
}

// ─── Stat Badge ───────────────────────────────────────────────────────────────

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent"
        aria-label={`${value} ${label}`}
      >
        {value}
      </span>
      <span className="text-sm font-medium text-white/50">{label}</span>
    </div>
  );
}

// ─── Mini Feature Card ────────────────────────────────────────────────────────

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}

function FeatureCard({ icon, title, description, accentColor }: FeatureCardProps) {
  const shouldReduce = useReducedMotion();

  return (
    <GlassCard
      aria-label={`${title}: ${description}`}
      className="flex flex-col gap-3 p-5 transition-colors duration-300 hover:bg-white/[0.07]"
    >
      <motion.div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: `${accentColor}20`, color: accentColor }}
        whileHover={shouldReduce ? {} : { scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-hidden="true"
      >
        {icon}
      </motion.div>
      <div>
        <p className="text-sm font-semibold text-white/90">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-white/45">{description}</p>
      </div>
    </GlassCard>
  );
}

// ─── Live Activity Ticker ─────────────────────────────────────────────────────

const ACTIVITY_ITEMS = [
  { name: "Sophia M.", role: "Senior Engineer", score: 94 },
  { name: "James T.", role: "Product Lead", score: 91 },
  { name: "Aisha K.", role: "Data Scientist", score: 97 },
];

function LiveActivityCard() {
  const shouldReduce = useReducedMotion();

  return (
    <GlassCard
      aria-label="Live candidate matching activity"
      className="flex flex-col gap-4 p-5"
    >
      <div className="flex items-center gap-2">
        <motion.span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-emerald-400"
          animate={shouldReduce ? {} : { opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
          Live Matches
        </span>
      </div>
      <ul className="flex flex-col gap-3" role="list" aria-label="Recent candidate matches">
        {ACTIVITY_ITEMS.map((item, i) => (
          <motion.li
            key={item.name}
            className="flex items-center justify-between"
            initial={shouldReduce ? {} : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.12, ...SPRING }}
            aria-label={`${item.name}, ${item.role}, match score ${item.score}`}
          >
            <div className="flex items-center gap-2.5">
              <div
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
                  color: "white",
                }}
              >
                {item.name[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-white/85">{item.name}</p>
                <p className="text-[10px] text-white/40">{item.role}</p>
              </div>
            </div>
            <span
              className="rounded-full px-2 py-0.5 text-xs font-bold"
              style={{
                background: "rgba(6,182,212,0.15)",
                color: "#67e8f9",
              }}
              aria-label={`Match score ${item.score}`}
            >
              {item.score}%
            </span>
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────

function TrustBar() {
  const logos = ["Accenture", "Stripe", "Shopify", "Linear", "Notion"];
  return (
    <motion.div
      variants={fadeUpVariants}
      className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
      aria-label="Trusted by leading companies"
    >
      <span className="text-xs uppercase tracking-widest text-white/30">Trusted by</span>
      {logos.map((logo) => (
        <span
          key={logo}
          className="text-sm font-semibold text-white/25 transition-colors duration-200 hover:text-white/50"
        >
          {logo}
        </span>
      ))}
    </motion.div>
  );
}

// ─── Hero Section (root) ──────────────────────────────────────────────────────

export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-14 md:py-24 sm:px-6 lg:px-8"
    >
      {/* ── Aurora Background ── */}
      <AuroraBackground />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Badge ── */}
        <motion.div variants={fadeUpVariants} className="flex justify-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-1.5"
            role="status"
            aria-label="Now in public beta"
          >
            <Sparkles size={13} className="text-cyan-400" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide text-cyan-300">
              Now in Public Beta — Behavioral AI v2.0
            </span>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────────────
            BENTO GRID
            Desktop: 3-col grid
            Mobile: single column stack
        ───────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">

          {/* ── MAIN HERO CARD — col-span-2 row-span-2 ── */}
          <GlassCard
            aria-label="Clavo AI main headline section"
            className="col-span-1 flex flex-col justify-between gap-6 md:gap-8 p-6 md:p-8 md:col-span-2 md:row-span-2 lg:p-10"
            style={{
              background:
                "linear-gradient(145deg, rgba(6,182,212,0.06) 0%, rgba(255,255,255,0.03) 50%, rgba(124,58,237,0.08) 100%)",
            }}
          >
            {/* Decorative corner glow — desktop only */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full blur-3xl hidden md:block"
              style={{ background: "rgba(6,182,212,0.15)" }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl hidden md:block"
              style={{ background: "rgba(124,58,237,0.15)" }}
            />

            <div className="relative flex flex-col gap-6">
              {/* Headline */}
              <motion.h1
                id="hero-headline"
                variants={fadeUpVariants}
                className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                The Future of{" "}
                <span
                  className="bg-gradient-to-r from-cyan-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent"
                  style={{
                    filter: "drop-shadow(0 0 32px rgba(6,182,212,0.4))",
                  }}
                >
                  Behavioral
                </span>{" "}
                Recruitment.
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                variants={fadeUpVariants}
                className="max-w-xl text-lg leading-relaxed text-white/55"
              >
                Clavo AI decodes how people think, collaborate, and lead — surfacing top
                talent before your competitors even see their résumé.
              </motion.p>

              {/* CTA Row */}
              <motion.div
                variants={fadeUpVariants}
                className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3"
              >
                <GlowButton>Start Hiring Smarter</GlowButton>
                <button
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/70 backdrop-blur transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50"
                  aria-label="Watch Clavo AI product demo video"
                  style={{ touchAction: "manipulation" }}
                >
                  Watch Demo
                </button>
              </motion.div>
            </div>

            {/* Stats Row */}
            <motion.div
              variants={fadeUpVariants}
              className="relative grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-6"
            >
              <StatBadge value="98.2%" label="Match Accuracy" />
              <StatBadge value="3.4×" label="Faster Hiring" />
              <StatBadge value="500+" label="Roles Filled" />
            </motion.div>
          </GlassCard>

          {/* ── LIVE ACTIVITY — col 3, row 1 (desktop only) ── */}
          <div className="hidden md:contents">
            <LiveActivityCard />
          </div>

          {/* ── AI SCORE FEATURE — col 3, row 2 (desktop only) ── */}
          <div className="hidden md:contents">
          <GlassCard
            aria-label="Behavioral score feature: real-time cognitive profiling"
            className="flex flex-col justify-between gap-4 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/35">
                  AI Behavioral Score
                </p>
                <p
                  className="mt-1 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-4xl font-extrabold text-transparent"
                  aria-label="Score 94 out of 100"
                >
                  94
                </p>
              </div>
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(124,58,237,0.2)" }}
                aria-hidden="true"
              >
                <Brain size={20} className="text-purple-300" />
              </div>
            </div>

            {/* Score bar */}
            <div aria-hidden="true" className="flex flex-col gap-1.5">
              {[
                { label: "Cognitive", value: 94, color: "#06b6d4" },
                { label: "Collab", value: 88, color: "#a78bfa" },
                { label: "Leadership", value: 91, color: "#818cf8" },
              ].map((bar) => (
                <div key={bar.label} className="flex items-center gap-2">
                  <span className="w-16 text-[10px] text-white/35">{bar.label}</span>
                  <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: bar.color }}
                      initial={shouldReduce ? { width: `${bar.value}%` } : { width: 0 }}
                      animate={{ width: `${bar.value}%` }}
                      transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <span className="w-8 text-right text-[10px] font-semibold text-white/45">
                    {bar.value}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            FEATURE MICRO-CARDS — bottom row
        ───────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <FeatureCard
            icon={<Brain size={18} />}
            title="Deep Behavioral AI"
            description="Maps 40+ cognitive & personality signals from natural conversation."
            accentColor="#06b6d4"
          />
          <FeatureCard
            icon={<Zap size={18} />}
            title="Real-time Analysis"
            description="Candidate insights surface in seconds, not days."
            accentColor="#a78bfa"
          />
          <FeatureCard
            icon={<ShieldCheck size={18} />}
            title="Bias-Free Hiring"
            description="Structured AI scoring eliminates unconscious bias at every step."
            accentColor="#34d399"
          />
          <FeatureCard
            icon={<Clock size={18} />}
            title="48hr Time-to-Hire"
            description="From first contact to signed offer — faster than any manual pipeline."
            accentColor="#9333ea"
          />
        </div>

        {/* ── Trust Bar ── */}
        <TrustBar />
      </motion.div>
    </section>
  );
}
