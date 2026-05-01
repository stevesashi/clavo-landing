"use client";

import { ArrowRight, Flame } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden px-4 py-28"
      style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(167,139,250,0.12) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 50% 80%, rgba(167,139,250,0.08) 0%, transparent 40%), #020408" }}
    >
      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 720, height: 420,
            background:
              "radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, rgba(139,92,246,0.07) 50%, transparent 72%)",
          }}
        />
      </div>

      {/* Top border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.40) 35%, rgba(139,92,246,0.35) 65%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">

        {/* Founder offer badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            borderColor: "rgba(239,68,68,0.30)",
            background: "rgba(239,68,68,0.07)",
          }}
        >
          <Flame size={12} className="text-red-400" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest text-red-400/85">
            Limited Founder Offer — 7 Spots
          </span>
        </div>

        {/* Headline */}
        <AnimatedSection direction="scale">
        <h2
          id="cta-heading"
          className="mb-4 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          Hire 3× Faster.{" "}
          <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-400 bg-clip-text text-transparent">
            Starting Now.
          </span>
        </h2>
        </AnimatedSection>

        {/* Subtext + offer detail */}
        <p className="mx-auto mb-3 max-w-md text-base leading-relaxed text-white/45">
          Cut time-to-hire from 40 days to 15.
          <br />
          First 7 companies lock in{" "}
          <span className="font-semibold text-purple-300/90">lifetime access at $1,199/mo</span>
          {" "}— down from $1,999/mo.
        </p>

        {/* CTA buttons */}
        <AnimatedSection delay={0.2}>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">

          {/* Primary */}
          <a
            href="/book-demo"
            aria-label="Book a live demo of Clavo AI"
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 55%, #7c3aed 100%)",
              boxShadow:
                "0 0 28px rgba(139,92,246,0.42), 0 0 60px rgba(139,92,246,0.12), 0 4px 24px rgba(0,0,0,0.5)",
              touchAction: "manipulation",
            }}
          >
            Book a Live Demo
            <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>

          {/* Secondary */}
          <a
            href="/early-access"
            aria-label="Join Clavo AI early access"
            className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-semibold transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
            style={{
              borderColor: "rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.52)",
              touchAction: "manipulation",
            }}
          >
            Join Early Access
          </a>
        </div>
        </AnimatedSection>

        {/* Helper text */}
        <p className="mt-5 text-xs text-white/22">
          No credit card required &nbsp;·&nbsp; 4 of 7 founder spots remaining &nbsp;·&nbsp; Cancel anytime
        </p>

      </div>
    </section>
  );
}
