"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star, TrendingDown, Users, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;
const VIEWPORT = { once: false, amount: 0.25 } as const;

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "We reduced hiring time from 35 days to 12 using Clavo. The AI interviews alone saved my team 60+ hours last month.",
    author: "Layla Rashid",
    title: "Head of Talent",
    company: "GCC FinTech Scale-up",
    initials: "LR",
    color: "#6ee7b7",
    stars: 5,
  },
  {
    quote: "The match scores are frighteningly accurate. Our last three hires all scored above 88% — all three are still with us 9 months later.",
    author: "Omar Al-Farsi",
    title: "Recruitment Director",
    company: "Gulf Tech Agency",
    initials: "OF",
    color: "#a78bfa",
    stars: 5,
  },
  {
    quote: "I was skeptical about AI screening. After the first week, I canceled our legacy ATS subscription. Clavo does everything better and costs a fraction.",
    author: "Priya Nair",
    title: "HR Manager",
    company: "Singapore Growth Co.",
    initials: "PN",
    color: "#67e8f9",
    stars: 5,
  },
];

// ── Numbers credibility bar ───────────────────────────────────────────────────
const PROOF_NUMBERS = [
  { value: "10,000+", label: "Candidates Screened", color: "#c084fc" },
  { value: "1,200+",  label: "Recruiter Hours Saved", color: "#6ee7b7" },
  { value: "92%",     label: "Match Accuracy",  color: "#a78bfa" },
  { value: "50+",     label: "Teams Across GCC", color: "#67e8f9" },
];

// ── Case study data ───────────────────────────────────────────────────────────
const CASE_STUDY = {
  company: "Gulf Tech Agency",
  tag: "Case Study",
  problem: {
    heading: "The Problem",
    body: "A 12-person recruitment agency was drowning in 400+ CVs per week across 30 open roles. Manual screening took 3 recruiters 2+ days each. Clients complained about slow turnaround. Top candidates were accepting other offers before the team could respond.",
  },
  process: {
    heading: "The Process",
    steps: [
      "Connected job descriptions to Clavo in one afternoon",
      "Bulk-uploaded 400 CVs — AI screened all 400 in 3.5 hours",
      "AI conducted asynchronous behavioral video interviews with top 40",
      "Received ranked shortlist of 5 per role with 360° reports",
    ],
  },
  results: {
    heading: "The Results",
    stats: [
      { value: "35d → 11d", label: "Time to hire", color: "#6ee7b7" },
      { value: "AED 68k",   label: "Saved in first month", color: "#c084fc" },
      { value: "3 → 0.5",   label: "Recruiter days per role", color: "#a78bfa" },
      { value: "100%",      label: "Client retention", color: "#67e8f9" },
    ],
  },
};

// ── Testimonial card ──────────────────────────────────────────────────────────
function TestimonialCard({
  quote, author, title, company, initials, color, stars, delay,
}: (typeof TESTIMONIALS)[0] & { delay: number }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...SPRING, delay }}
      whileHover={shouldReduce ? {} : { y: -4 }}
      className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/[0.07] p-7 transition-colors duration-300 hover:border-white/[0.13]"
      style={{
        background: "rgba(7,14,20,0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 4px 36px rgba(0,0,0,0.45)",
      }}
    >
      {/* Top edge */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60 50%, transparent)` }} />

      {/* Hover glow */}
      <div aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}0d 0%, transparent 65%)` }} />

      {/* Stars */}
      <div className="flex gap-0.5" aria-label={`${stars} stars`}>
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} size={12} fill="#c084fc" className="text-purple-400" aria-hidden="true" />
        ))}
      </div>

      {/* Quote icon */}
      <Quote size={22} style={{ color: `${color}50` }} aria-hidden="true" />

      {/* Quote text */}
      <p className="flex-1 text-sm leading-relaxed text-white/70 italic">
        "{quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/[0.05]">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold"
          style={{ background: `${color}20`, color }}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-white/85">{author}</p>
          <p className="text-xs text-white/35">{title} · {company}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = starsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speedY: (Math.random() - 0.5) * 0.15,
      speedX: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      stars.forEach(s => {
        s.y += s.speedY;
        s.x += s.speedX;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;

        const twinkle = Math.sin(frame * s.twinkleSpeed + s.twinklePhase);
        const currentOpacity = s.opacity * (0.5 + twinkle * 0.5);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,180,255,${currentOpacity})`;
        ctx.fill();

        if (s.size > 1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167,139,250,${currentOpacity * 0.15})`;
          ctx.fill();
        }
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
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden py-28 px-4"
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <img
          src="/solar-bg3.jpg"
          alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            animation: "kenBurnsTestimonials 24s ease-in-out infinite",
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

      {/* Dark overlay for readability */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(to bottom, rgba(3,6,8,0.88) 0%, rgba(3,6,8,0.75) 40%, rgba(3,6,8,0.75) 60%, rgba(3,6,8,0.88) 100%)",
        pointerEvents: "none",
      }}/>

      {/* Glow pulse */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.1) 0%, transparent 55%)",
        animation: "glowPulseTestimonials 8s ease-in-out infinite",
      }}/>

      {/* Floating star particles */}
      <canvas
        ref={starsCanvasRef}
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 5,
        }}
      />

      {/* Top seamless fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 200, zIndex: 4,
        background: "linear-gradient(to bottom, #030608, transparent)",
        pointerEvents: "none",
      }}/>

      {/* Bottom seamless fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 200, zIndex: 4,
        background: "linear-gradient(to top, #030608, transparent)",
        pointerEvents: "none",
      }}/>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ── Numbers credibility bar ── */}
        <motion.div
          className="mb-20 grid grid-cols-2 gap-4 rounded-2xl border border-white/[0.07] p-6 sm:grid-cols-4"
          style={{ background: "rgba(255,255,255,0.015)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={SPRING}
          role="list"
          aria-label="Clavo AI credibility statistics"
        >
          {PROOF_NUMBERS.map(({ value, label, color }) => (
            <div
              key={label}
              role="listitem"
              className="flex flex-col items-center gap-1 text-center"
              aria-label={`${value} ${label}`}
            >
              <span
                className="text-2xl font-extrabold sm:text-3xl"
                style={{
                  background: `linear-gradient(135deg, ${color}, white)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: `drop-shadow(0 0 12px ${color}45)`,
                }}
              >
                {value}
              </span>
              <span className="text-xs font-semibold text-white/45">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Section header */}
        <AnimatedSection>
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT} transition={SPRING}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-400/60">
            Social Proof
          </p>
          <h2
            id="testimonials-heading"
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            Hiring Teams{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-purple-300 bg-clip-text text-transparent">
              Already Trust Clavo
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/38">
            From solo recruiters to agency directors across GCC — here's what they say after switching.
          </p>
        </motion.div>
        </AnimatedSection>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.author} delay={0.1 + i * 0.1} direction="scale">
              <TestimonialCard {...t} delay={0.08 + i * 0.12} />
            </AnimatedSection>
          ))}
        </div>

        {/* ── Case Study ── */}
        <motion.div
          className="mt-16 overflow-hidden rounded-3xl border border-white/[0.08]"
          style={{
            background: "rgba(6,14,18,0.78)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            boxShadow: "0 0 60px rgba(110,231,183,0.06), 0 8px 48px rgba(0,0,0,0.6)",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...SPRING, delay: 0.1 }}
        >
          {/* Top edge */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(110,231,183,0.45) 35%, rgba(167,139,250,0.35) 65%, transparent)" }} />

          {/* Case study header */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-8 py-5">
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300">
              {CASE_STUDY.tag}
            </span>
            <span className="text-sm font-semibold text-white/55">{CASE_STUDY.company}</span>
          </div>

          <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
            {/* Problem */}
            <div className="border-b border-white/[0.06] p-8 md:border-b-0 md:border-r">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-red-500/15 flex items-center justify-center" aria-hidden="true">
                  <TrendingDown size={14} className="text-red-400" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-red-400/70">
                  {CASE_STUDY.problem.heading}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-white/50">{CASE_STUDY.problem.body}</p>
            </div>

            {/* Process */}
            <div className="border-b border-white/[0.06] p-8 md:border-b-0 md:border-r">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-purple-400/15 flex items-center justify-center" aria-hidden="true">
                  <Users size={14} className="text-purple-400" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400/70">
                  {CASE_STUDY.process.heading}
                </h3>
              </div>
              <ol className="flex flex-col gap-2.5" aria-label="Steps Clavo AI took">
                {CASE_STUDY.process.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-400/15 text-[9px] font-bold text-purple-400">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-snug text-white/50">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Results */}
            <div className="p-8">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-400/15 flex items-center justify-center" aria-hidden="true">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400/70">
                  {CASE_STUDY.results.heading}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {CASE_STUDY.results.stats.map(({ value, label, color }) => (
                  <div key={label}
                    className="flex flex-col gap-0.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center"
                    aria-label={`${value} ${label}`}
                  >
                    <span
                      className="text-lg font-extrabold"
                      style={{
                        background: `linear-gradient(135deg, ${color}, white)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {value}
                    </span>
                    <span className="text-[10px] text-white/35">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
