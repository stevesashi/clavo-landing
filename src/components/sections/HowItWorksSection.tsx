"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Upload, Cpu, ListOrdered, ArrowRight } from "lucide-react";

const SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;
const VIEWPORT = { once: false, amount: 0.3 } as const;

const STEPS = [
  {
    step: "01",
    icon: <Upload size={24} />,
    title: "Upload Candidates",
    description:
      "Drop CVs one by one or bulk-upload hundreds at once. Paste a job description and Clavo maps the role automatically — no templates, no manual config.",
    color: "#a78bfa",
    detail: "CSV, PDF, DOCX · Bulk up to 500",
  },
  {
    step: "02",
    icon: <Cpu size={24} />,
    title: "AI Screens & Interviews",
    description:
      "Our behavioral AI reads every CV, scores candidates against your role, and conducts asynchronous video interviews — all in under 4 hours, 24/7.",
    color: "#67e8f9",
    detail: "Avg 4h · Zero recruiter time",
  },
  {
    step: "03",
    icon: <ListOrdered size={24} />,
    title: "Get Your Ranked Shortlist",
    description:
      "Receive a prioritised top-5 with match scores, behavioral breakdowns, and a one-page 360° report per candidate. Hire with confidence, not gut feeling.",
    color: "#6ee7b7",
    detail: "Top 5 ranked · 360° reports included",
  },
];

export default function HowItWorksSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden py-28 px-4"
      style={{ background: "linear-gradient(180deg, #030608 0%, #040b10 50%, #030608 100%)" }}
    >
      {/* Layered background lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left purple bleed */}
        <div style={{
          position: "absolute", top: "-10%", left: "-5%",
          width: "55%", height: "70%",
          background: "radial-gradient(ellipse at 20% 20%, rgba(139,92,246,0.07) 0%, transparent 60%)",
          filter: "blur(60px)",
        }} />
        {/* Top-right cyan bleed */}
        <div style={{
          position: "absolute", top: "-5%", right: "-5%",
          width: "50%", height: "60%",
          background: "radial-gradient(ellipse at 80% 15%, rgba(103,232,249,0.05) 0%, transparent 60%)",
          filter: "blur(60px)",
        }} />
        {/* Soft center wash — very low opacity, no visible boundary */}
        <div style={{
          position: "absolute", top: "20%", left: "15%", right: "15%", bottom: "10%",
          background: "radial-gradient(ellipse at 50% 40%, rgba(167,139,250,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        {/* Bottom darkening fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
          background: "linear-gradient(to top, rgba(3,6,8,0.6) 0%, transparent 100%)",
        }} />
        {/* Subtle noise grain */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
          opacity: 0.018,
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT} transition={SPRING}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400/60">
            How It Works
          </p>
          <h2
            id="how-it-works-heading"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            From Inbox to Shortlist{" "}
            <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
              in 3 Steps
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40">
            No complex setup. No ATS migration. Just paste your job description and go.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Connector line (desktop only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px md:block"
            style={{ background: "linear-gradient(90deg, transparent 5%, rgba(167,139,250,0.20) 20%, rgba(103,232,249,0.20) 80%, transparent 95%)" }}
          />

          {STEPS.map(({ step, icon, title, description, color, detail }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ ...SPRING, delay: 0.08 + i * 0.14 }}
              whileHover={shouldReduce ? {} : { y: -4 }}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/[0.07] p-7 transition-colors duration-300 hover:border-white/[0.13]"
              style={{
                background: "rgba(8,14,20,0.72)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 4px 36px rgba(0,0,0,0.45)",
              }}
            >
              {/* Top edge accent */}
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${color}70 50%, transparent)` }} />

              {/* Hover glow */}
              <div aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}0e 0%, transparent 65%)` }} />

              {/* Step number + icon */}
              <div className="relative flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${color}18`, color }}
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <span
                  className="text-5xl font-black leading-none"
                  style={{ color: `${color}18` }}
                  aria-hidden="true"
                >
                  {step}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 className="mb-2 text-lg font-bold text-white/90">{title}</h3>
                <p className="text-sm leading-relaxed text-white/45">{description}</p>
              </div>

              {/* Detail pill */}
              <div
                className="self-start rounded-full border px-3 py-1 text-[10px] font-semibold"
                style={{ borderColor: `${color}28`, color: `${color}99`, background: `${color}0c` }}
              >
                {detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...SPRING, delay: 0.5 }}
        >
          <motion.a
            href="/book-demo"
            aria-label="Book a live demo of Clavo AI"
            className="group inline-flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #0e7490 100%)",
              boxShadow: "0 0 24px rgba(124,58,237,0.35)",
              touchAction: "manipulation",
            }}
            whileHover={shouldReduce ? {} : { scale: 1.05, boxShadow: "0 0 40px rgba(124,58,237,0.55)" }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.12) 0%, transparent 55%)" }} />
            <span className="relative">Book a Live Demo</span>
            <ArrowRight size={15} aria-hidden="true" className="relative transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
