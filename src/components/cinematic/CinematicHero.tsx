"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Brain, Sparkles } from "lucide-react";
import Image from "next/image";
import Fireflies from "./Fireflies";
import Candidate360ReportPreview from "@/components/report/Candidate360ReportPreview";
import HiringTransformation from "./HiringTransformation";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SPRING_SOFT = { type: "spring", stiffness: 200, damping: 28 } as const;
const VIEWPORT = { once: false, amount: 0.45 } as const;

// ─── Forest SVG Treeline ──────────────────────────────────────────────────────

function TreeLine({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0"
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: 220, display: "block" }}
      >
        <path
          d="M0,220 L0,175 L22,145 L44,170 L68,130 L92,160 L118,100 L144,155 L165,120 L190,75 L215,130 L240,100 L268,155 L295,120 L325,68 L358,135 L385,100 L412,155 L440,115 L472,60 L505,128 L532,95 L558,150 L585,108 L618,65 L650,138 L674,100 L700,158 L728,112 L760,62 L793,140 L820,105 L848,162 L875,118 L908,68 L940,142 L966,108 L992,165 L1020,122 L1052,72 L1085,145 L1110,108 L1138,162 L1165,125 L1200,72 L1234,145 L1262,108 L1295,162 L1325,128 L1360,80 L1395,152 L1420,118 L1440,155 L1440,220 Z"
          fill="#091510"
        />
      </svg>
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full"
        style={{ height: 180, display: "block" }}
      >
        <path
          d="M0,180 L0,148 L18,118 L36,142 L55,112 L76,138 L100,88 L126,130 L148,102 L172,58 L198,118 L220,90 L245,138 L272,105 L300,55 L330,122 L352,90 L378,138 L405,100 L432,52 L462,118 L488,88 L514,138 L540,100 L568,55 L598,125 L622,92 L648,140 L672,102 L700,55 L728,128 L752,96 L778,140 L805,100 L835,52 L864,122 L888,90 L914,140 L942,102 L970,55 L998,125 L1022,92 L1048,140 L1074,102 L1104,55 L1132,128 L1156,96 L1182,142 L1208,105 L1240,58 L1268,128 L1292,96 L1320,140 L1348,105 L1378,60 L1408,130 L1440,100 L1440,180 Z"
          fill="#050d08"
        />
      </svg>
    </div>
  );
}

// ─── Fog / Mist layer ─────────────────────────────────────────────────────────

function Mist() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "linear-gradient(to top, rgba(60,110,80,0.10) 0%, rgba(60,110,80,0.04) 60%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: "linear-gradient(to bottom, rgba(5,10,8,0.6) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Forest CTA Button ────────────────────────────────────────────────────────

function ForestButton({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion();
  return (
    <Link href="/book-demo" aria-label="Book a live demo of Clavo AI">
      <motion.span
        className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
        style={{
          background: "linear-gradient(135deg, rgba(255,180,50,0.18) 0%, rgba(255,120,20,0.12) 100%)",
          border: "1px solid rgba(255,180,60,0.28)",
          boxShadow: "0 0 20px rgba(255,160,40,0.25)",
          touchAction: "manipulation",
          display: "inline-flex",
        }}
        whileHover={shouldReduce ? {} : { scale: 1.05 }}
        whileTap={shouldReduce ? {} : { scale: 0.96 }}
        transition={shouldReduce ? {} : { type: "spring", stiffness: 340, damping: 22 }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.12) 0%, transparent 60%)" }}
        />
        <span className="relative z-10">{children}</span>
        <ArrowRight
          size={17}
          aria-hidden="true"
          className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
        />
      </motion.span>
    </Link>
  );
}

// ─── Glass Lantern Card ───────────────────────────────────────────────────────

function LanternCard({
  children,
  className = "",
  glowColor = "rgba(255,180,50,0.12)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/[0.08] ${className}`}
      style={{
        background: "rgba(10,20,14,0.85)",
        boxShadow: `0 0 32px ${glowColor}, 0 8px 32px rgba(0,0,0,0.5)`,
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,185,60,0.5) 40%, rgba(200,240,180,0.3) 60%, transparent)",
        }}
      />
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 1 — THE HOOK
// ─────────────────────────────────────────────────────────────────────────────

function Scene1Hook() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shouldReduce = useReducedMotion();

  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ["0%", "0%"] : ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <>
      <section
        ref={ref}
        aria-labelledby="scene1-headline"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{ background: "#030608" }}
      >
        <Fireflies />
        <Mist />
        <TreeLine />

        {/* Ambient glow orb — static */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-full" style={{ width: 600, height: 600 }}>
            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,165,40,0.07) 0%, rgba(255,100,20,0.03) 45%, transparent 70%)",
              }}
            />
          </div>
        </div>

        {/* Two-column layout */}
        <motion.div
          className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Logo */}
          <motion.div
            className="mb-4 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...SPRING_SOFT, delay: 0.0 }}
          >
            <Image
              src="/clavo-hero-logo.png"
              alt="Clavo AI"
              width={960}
              height={400}
              priority
              className="h-80 w-auto object-contain"
              style={{
                filter:
                  "drop-shadow(0 0 36px rgba(255,165,40,0.55)) drop-shadow(0 0 14px rgba(255,120,20,0.35))",
              }}
            />
          </motion.div>

          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">

            {/* LEFT — text content */}
            <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...SPRING_SOFT, delay: 0.05 }}
              >
                <div
                  className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 px-4 py-1.5"
                  style={{ background: "rgba(255,180,50,0.07)" }}
                  role="status"
                >
                  <Sparkles size={12} className="text-purple-400" aria-hidden="true" />
                  <span className="text-xs font-semibold tracking-wide text-purple-300/80">
                    Built for fast-scaling teams across GCC · Setup in under 5 minutes
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                id="scene1-headline"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...SPRING_SOFT, delay: 0.12 }}
                className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
                style={{ textShadow: "0 0 60px rgba(255,180,60,0.15), 0 2px 40px rgba(0,0,0,0.8)" }}
              >
                Hire{" "}
                <span
                  className="bg-gradient-to-r from-purple-300 via-yellow-200 to-purple-300 bg-clip-text text-transparent"
                  style={{ filter: "drop-shadow(0 0 24px rgba(255,180,60,0.5))" }}
                >
                  3x Faster.
                </span>
                <br />
                Cut Recruitment{" "}
                <span
                  className="bg-gradient-to-r from-purple-300 via-yellow-200 to-green-300 bg-clip-text text-transparent"
                  style={{ filter: "drop-shadow(0 0 24px rgba(255,180,60,0.4))" }}
                >
                  Costs by 70%.
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...SPRING_SOFT, delay: 0.22 }}
                className="max-w-lg text-lg leading-relaxed text-white/50"
              >
                Clavo AI screens, interviews, and ranks candidates automatically — so your team
                hires smarter, faster, and without manual effort.
              </motion.p>

              {/* Trust line */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ ...SPRING_SOFT, delay: 0.28 }}
                className="flex items-center gap-2 text-sm text-white/32"
                aria-label="Built for fast-scaling teams across GCC. Setup in under 5 minutes."
              >
                <span className="h-px w-6 bg-purple-400/40" aria-hidden="true" />
                Built for fast-scaling teams across GCC. Setup in under 5 minutes.
                <span className="h-px w-6 bg-purple-400/40" aria-hidden="true" />
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...SPRING_SOFT, delay: 0.34 }}
                className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              >
                <ForestButton>Book a Live Demo</ForestButton>
              </motion.div>
            </div>

            {/* RIGHT — floating AI match card */}
            <motion.div
              className="w-full max-w-sm shrink-0 lg:w-80"
              initial={{ opacity: 0, x: 48, scale: 0.94 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ ...SPRING_SOFT, delay: 0.30 }}
            >
              {/* Orb glow behind card — static */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  className="rounded-full"
                  style={{
                    width: 300,
                    height: 300,
                    background: "radial-gradient(circle, rgba(255,180,50,0.10) 0%, transparent 70%)",
                  }}
                />
              </div>

              <div
                className="relative overflow-hidden rounded-2xl border border-white/[0.08]"
                style={{
                  background: "rgba(10,18,14,0.90)",
                  boxShadow: "0 0 32px rgba(255,180,50,0.12), 0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                {/* Top edge light */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,185,60,0.6) 50%, transparent)",
                  }}
                />

                <div className="p-6">
                  {/* Header */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400/80">
                        Top Match Identified
                      </span>
                    </div>
                    <span className="rounded-full border border-amber-400/20 bg-purple-400/10 px-2 py-0.5 text-[10px] font-bold text-purple-300">
                      LIVE
                    </span>
                  </div>

                  {/* Candidate */}
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #c084fc, #9333ea)" }}
                      aria-hidden="true"
                    >A</div>
                    <div>
                      <p className="text-sm font-bold text-white/90">Alex Morgan</p>
                      <p className="text-xs text-white/40">Senior Recruiter · 6 yrs exp</p>
                    </div>
                  </div>

                  {/* Score ring */}
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30">AI Score</p>
                      <motion.p
                        className="mt-0.5 bg-gradient-to-r from-purple-300 to-emerald-300 bg-clip-text text-5xl font-extrabold text-transparent"
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={VIEWPORT}
                        transition={{ ...SPRING_SOFT, delay: 0.55 }}
                        aria-label="AI score 91 out of 100"
                      >91</motion.p>
                    </div>
                    <div className="relative flex h-16 w-16 items-center justify-center" aria-hidden="true">
                      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                        <motion.circle
                          cx="32" cy="32" r="26" fill="none"
                          stroke="url(#scoreGrad)" strokeWidth="4" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 26}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                          whileInView={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - 0.91) }}
                          viewport={VIEWPORT}
                          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                        />
                        <defs>
                          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c084fc" />
                            <stop offset="100%" stopColor="#6ee7b7" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="text-xs font-bold text-white/60">91%</span>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="flex flex-col gap-3" aria-label="Match breakdown">
                    {[
                      { label: "ATS Proficiency", value: 94, color: "#c084fc", delay: 0.65 },
                      { label: "Communication",   value: 88, color: "#a78bfa", delay: 0.75 },
                      { label: "Leadership",      value: 91, color: "#6ee7b7", delay: 0.85 },
                    ].map((bar) => (
                      <div key={bar.label} aria-label={`${bar.label} ${bar.value}`}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[10px] text-white/35">{bar.label}</span>
                          <span className="text-[10px] font-bold" style={{ color: bar.color }}>{bar.value}</span>
                        </div>
                        <div className="relative h-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${bar.color}80, ${bar.color})`,
                              boxShadow: `0 0 6px ${bar.color}60`,
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${bar.value}%` }}
                            viewport={VIEWPORT}
                            transition={{ duration: 0.9, delay: bar.delay, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skills Matched */}
                  <div className="mt-4">
                    <p className="mb-2 text-[10px] uppercase tracking-widest text-white/30">Skills Matched</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["React", "Node.js", "SQL", "Communication", "Problem Solving"].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Red Flags */}
                  <div className="mt-3">
                    <p className="mb-2 text-[10px] uppercase tracking-widest text-white/30">Red Flags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["No leadership exp", "Missing Python", "Limited system design"].map((flag) => (
                        <span
                          key={flag}
                          className="rounded-full border border-red-400/20 bg-red-400/[0.07] px-2.5 py-0.5 text-[10px] font-semibold text-red-300/80"
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-12 flex flex-col items-center gap-2 pb-10"
            aria-label="Scroll to continue"
          >
            <span className="text-[11px] uppercase tracking-widest text-white/20">Scroll to explore</span>
            <div
              className="h-8 w-px opacity-50"
              aria-hidden="true"
              style={{ background: "linear-gradient(to bottom, rgba(255,180,60,0.4), transparent)" }}
            />
          </motion.div>
        </motion.div>
      </section>

    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 2 — THE INSIGHT
// ─────────────────────────────────────────────────────────────────────────────

const SCORE_BARS = [
  { label: "ATS Proficiency",        value: 94, color: "#c084fc" },
  { label: "Stakeholder Management", value: 91, color: "#a78bfa" },
  { label: "Communication",          value: 88, color: "#6ee7b7" },
  { label: "Cultural Alignment",     value: 96, color: "#67e8f9" },
];

const BG_CANDIDATES = [
  {
    name: "A. Rahman", role: "Recruiter · 3 yrs", score: 62,
    bars: [
      { label: "ATS Proficiency",    v: 45, color: "#f87171" },
      { label: "Stakeholder Mgmt",   v: 58, color: "#c084fc" },
      { label: "Communication",      v: 72, color: "#6ee7b7" },
      { label: "Cultural Alignment", v: 63, color: "#67e8f9" },
    ],
    x: -248, rotate: -8, scale: 0.91, opacity: 0.38,
  },
  {
    name: "L. Chen", role: "HR Specialist · 5 yrs", score: 71,
    bars: [
      { label: "ATS Proficiency",    v: 78, color: "#c084fc" },
      { label: "Stakeholder Mgmt",   v: 65, color: "#a78bfa" },
      { label: "Communication",      v: 44, color: "#f87171" },
      { label: "Cultural Alignment", v: 80, color: "#67e8f9" },
    ],
    x: -148, rotate: -4, scale: 0.95, opacity: 0.46,
  },
  {
    name: "M. Hassan", role: "TA Manager · 4 yrs", score: 55,
    bars: [
      { label: "ATS Proficiency",    v: 60, color: "#c084fc" },
      { label: "Stakeholder Mgmt",   v: 42, color: "#f87171" },
      { label: "Communication",      v: 58, color: "#6ee7b7" },
      { label: "Cultural Alignment", v: 47, color: "#f87171" },
    ],
    x: 148, rotate: 4, scale: 0.95, opacity: 0.44,
  },
  {
    name: "P. Williams", role: "Recruiter · 2 yrs", score: 68,
    bars: [
      { label: "ATS Proficiency",    v: 72, color: "#c084fc" },
      { label: "Stakeholder Mgmt",   v: 55, color: "#a78bfa" },
      { label: "Communication",      v: 63, color: "#6ee7b7" },
      { label: "Cultural Alignment", v: 38, color: "#f87171" },
    ],
    x: 248, rotate: 9, scale: 0.91, opacity: 0.37,
  },
];

function Scene2Insight() {
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("clavo:report", { detail: { open: reportOpen } }));
    document.body.classList.toggle("clavo-report-open", reportOpen);
    return () => { document.body.classList.remove("clavo-report-open"); };
  }, [reportOpen]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const x0 = useTransform(scrollYProgress, [0, 1], [0, BG_CANDIDATES[0].x]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, BG_CANDIDATES[1].x]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, BG_CANDIDATES[2].x]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, BG_CANDIDATES[3].x]);
  const cardXValues = [x0, x1, x2, x3];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="scene2-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030608 0%, #04090c 100%)" }}
    >
      <Fireflies />
      <Mist />
      <TreeLine />

      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 500, height: 500 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,180,50,0.10) 0%, rgba(255,120,20,0.04) 55%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* Content wrapper */}
      <div className="relative z-20 mx-auto w-full max-w-2xl px-4">

        {/* Heading */}
        <motion.div
          className="mb-10 text-center"
          initial={shouldReduce ? {} : { opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400/55">
            AI Screening Engine
          </p>
          <h2
            id="scene2-heading"
            className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            style={{ lineHeight: 1.1 }}
          >
            The Right Candidate,{" "}
            <span
              className="bg-gradient-to-r from-purple-300 to-emerald-300 bg-clip-text text-transparent"
            >
              Identified in Seconds
            </span>
          </h2>
          <p className="mx-auto max-w-md text-base leading-relaxed text-white/40">
            Clavo screens, scores, and ranks candidates instantly — surfacing the
            highest-match profiles for your role.
          </p>
        </motion.div>

        {/* Card area */}
        <div className="relative mx-auto max-w-md">

          {/* Background candidate cards — decorative, scroll-spread */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden sm:block"
            style={{ zIndex: 9, overflow: "visible" }}
          >
            {BG_CANDIDATES.map((c, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: "50%",
                  left: "calc(50% - 126px)",
                  width: 252,
                  x: shouldReduce ? c.x : cardXValues[i],
                  y: "-50%",
                  rotate: c.rotate,
                  scale: c.scale,
                  opacity: c.opacity,
                  filter: "blur(1px)",
                }}
              >
                <div
                  style={{
                    background: "rgba(8,16,26,0.92)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: 14,
                    padding: "14px 16px",
                    boxShadow: "0 0 40px rgba(255,200,100,0.15), 0 8px 32px rgba(0,0,0,0.60)",
                  }}
                >
                  {/* Status badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 9 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#f87171", flexShrink: 0 }} />
                    <span style={{ fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(248,113,113,0.70)" }}>
                      AI Screened · Reviewed
                    </span>
                  </div>

                  {/* Name + score + brain */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 9 }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", margin: 0 }}>{c.name}</p>
                      <p style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", margin: "2px 0 6px" }}>{c.role}</p>
                      <p style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.28)", margin: 0 }}>AI Score</p>
                      <p style={{
                        fontSize: 26, fontWeight: 800, margin: "1px 0 0",
                        background: "linear-gradient(to right, #c084fc, #6ee7b7)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      }}>{c.score}</p>
                    </div>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: "rgba(255,180,50,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Brain size={14} style={{ color: "#c084fc" }} />
                    </div>
                  </div>

                  {/* Match confidence */}
                  <div style={{ marginBottom: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.28)" }}>Match Confidence</span>
                      <span style={{ fontSize: 8, fontWeight: 700, color: "#c084fc" }}>{c.score}%</span>
                    </div>
                    <div style={{ height: 2, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                      <div style={{ width: `${c.score}%`, height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #c084fc, #6ee7b7)" }} />
                    </div>
                  </div>

                  {/* Score bars */}
                  {c.bars.map((b, j) => (
                    <div key={j} style={{ marginBottom: j < c.bars.length - 1 ? 6 : 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                        <span style={{ fontSize: 8, color: "rgba(255,255,255,0.38)" }}>{b.label}</span>
                        <span style={{ fontSize: 8, fontWeight: 700, color: b.color }}>{b.v}</span>
                      </div>
                      <div style={{ height: 2, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                        <div style={{ width: `${b.v}%`, height: "100%", borderRadius: 99, background: b.color, opacity: 0.9 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main card */}
          <motion.div
            className="relative w-full"
            style={{ zIndex: 20 }}
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ ...SPRING_SOFT, delay: 0.08 }}
          >
        <LanternCard glowColor="rgba(255,180,50,0.26)" className="p-8">

          {/* Candidate header */}
          <div className="mb-2 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/70">
              AI Screened · Live Match
            </span>
          </div>

          <div className="mb-6 flex items-start justify-between">
            <div>
              <p id="scene2-heading" className="text-sm font-bold text-white/85">
                Daniel Reed
              </p>
              <p className="text-xs text-white/35">Senior Recruiter · 6 yrs ATS &amp; Stakeholder Mgmt</p>
              <div className="mt-3">
                <p className="text-[10px] uppercase tracking-widest text-white/30">AI Behavioral Score</p>
                <motion.p
                  className="mt-0.5 bg-gradient-to-r from-purple-300 to-emerald-300 bg-clip-text text-5xl font-extrabold text-transparent"
                  initial={shouldReduce ? {} : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VIEWPORT}
                  transition={{ ...SPRING_SOFT, delay: 0.24 }}
                  aria-label="AI Behavioral Score 91 out of 100"
                >
                  91
                </motion.p>
              </div>
            </div>
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: "rgba(255,180,50,0.14)", color: "#c084fc" }}
              initial={shouldReduce ? {} : { rotate: -20, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ ...SPRING_SOFT, delay: 0.18 }}
              aria-hidden="true"
            >
              <Brain size={22} />
            </motion.div>
          </div>

          {/* Match confidence bar */}
          <div className="mb-6">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wide text-white/35">Match Confidence</span>
              <span className="text-[10px] font-bold text-purple-300">91%</span>
            </div>
            <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #c084fc, #6ee7b7)",
                  boxShadow: "0 0 8px rgba(192,132,252,0.5)",
                }}
                initial={{ width: 0 }}
                whileInView={{ width: "91%" }}
                viewport={VIEWPORT}
                transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Score bars */}
          <ul className="flex flex-col gap-4" aria-label="Behavioral score breakdown">
            {SCORE_BARS.map((bar, i) => (
              <motion.li
                key={bar.label}
                className="flex flex-col gap-1.5"
                initial={shouldReduce ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ ...SPRING_SOFT, delay: 0.30 + i * 0.09 }}
                aria-label={`${bar.label}: ${bar.value} out of 100`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white/45">{bar.label}</span>
                  <span className="text-xs font-bold" style={{ color: bar.color }}>{bar.value}</span>
                </div>
                <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${bar.color}99, ${bar.color})`,
                      boxShadow: `0 0 8px ${bar.color}80`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.value}%` }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Key skill badge */}
          <motion.div
            className="mt-6 flex items-center gap-2"
            initial={shouldReduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-wide text-white/25">Key Skills</span>
            <span className="rounded-full border border-amber-400/20 bg-purple-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-purple-300">
              ATS Systems
            </span>
          </motion.div>

          {/* Quote */}
          <motion.p
            className="mt-5 text-center text-xs italic leading-relaxed text-white/22"
            initial={shouldReduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            "16,800 screening hours bypassed. 1,245 recruiter hours saved."
          </motion.p>

          {/* View 360° Report CTA */}
          <motion.button
            onClick={() => setReportOpen(true)}
            aria-label="View Daniel Reed's 360° candidate report"
            className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] py-2.5 transition-colors hover:border-emerald-400/30 hover:bg-emerald-400/[0.10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            style={{ touchAction: "manipulation" }}
          >
            <span className="text-xs font-semibold text-emerald-300">View 360° Report</span>
            <ArrowRight size={12} className="text-emerald-300" aria-hidden="true" />
          </motion.button>
        </LanternCard>
        </motion.div>
        </div>{/* card area */}
      </div>{/* content wrapper */}

      {/* 360° Report slide-over */}
      <Candidate360ReportPreview
        open={reportOpen}
        onClose={() => setReportOpen(false)}
      />
    </section>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

export default function CinematicHero() {
  return (
    <div className="relative" style={{ background: "#030608" }}>
      <Scene1Hook />
      <Scene2Insight />
      <HiringTransformation />
    </div>
  );
}
