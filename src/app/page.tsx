import React from "react";
import ResponsiveHeroBanner from "@/components/ui/ResponsiveHeroBanner";
import ScrollSection from "@/components/ScrollSection";
import FeaturesSection from "@/components/FeaturesSection";
import ForensicIntelligenceSection from "@/components/sections/ForensicIntelligenceSection";
import TrustBar from "@/components/sections/TrustBar";
import MetricsSection from "@/components/sections/MetricsSection";
import DemoSection from "@/components/sections/DemoSection";
import AIScreeningDemo from "@/components/sections/AIScreeningDemo";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import StickyCTA from "@/components/layout/StickyCTA";

// ── Cinematic section wrapper ─────────────────────────────────────────────────
// Adds a top + bottom #030608 fade over every section so the whole page
// reads as one continuous dark scene instead of stacked boxes.
function CinematicWrap({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      {children}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "160px",
          background: "linear-gradient(to bottom, #030608, transparent)",
          pointerEvents: "none", zIndex: 10,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "160px",
          background: "linear-gradient(to top, #030608, transparent)",
          pointerEvents: "none", zIndex: 10,
        }}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Clavo AI — The Future of Behavioral Recruitment",
  description:
    "Clavo AI screens, interviews, and ranks candidates autonomously. Time-to-hire drops from 40 days to 15. Cost per hire falls from AED 15k to AED 4.2k.",
};

export default function Home() {
  return (
    <main style={{ margin: 0, padding: 0, background: "#030608" }}>
      {/* ── Hero Banner — handles its own bottom fade internally ─────────── */}
      <ResponsiveHeroBanner
        logoUrl="/clavo-logo-transparent.png"
        navLinks={[
          { label: "Pricing", href: "/pricing" },
          { label: "Why Clavo", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ]}
        ctaButtonText="Book Demo"
        ctaButtonHref="/book-demo"
        badgeLabel="New"
        badgeText="The Only Platform With Built-In National Compliance"
        title="#1 AI Hiring Intelligence"
        titleLine2="& Compliance Platform in GCC."
        description="Screen 500 CVs in 90 seconds. Conduct AI interviews 24/7. Track nationalization across 6 GCC countries. Map talent markets in real time. Smart notes for every interview. One platform. Zero penalty risk."
        primaryButtonText="Book Demo"
        primaryButtonHref="/book-demo"
        secondaryButtonText="See How It Works"
        secondaryButtonHref="#features"
        partnersTitle="Trusted by innovative teams around the world"
        partners={[]}
      />

      {/* ── ScrollSection — handles its own top/bottom fades internally ───── */}
      <ScrollSection />

      {/* ── Features — Tabbed Spotlight ──────────────────────────────────── */}
      <CinematicWrap><FeaturesSection /></CinematicWrap>

      {/* ── Trust Bar ───────────────────────────────────────────────────── */}
      <CinematicWrap><TrustBar /></CinematicWrap>

      {/* ── Forensic Hiring Intelligence dashboard ───────────────────────── */}
      <CinematicWrap><ForensicIntelligenceSection /></CinematicWrap>

      {/* ── Metrics ─────────────────────────────────────────────────────── */}
      <CinematicWrap><MetricsSection /></CinematicWrap>


      {/* ── Demo Video ──────────────────────────────────────────────────── */}
      <CinematicWrap><DemoSection /></CinematicWrap>

      {/* ── Interactive AI Screening ─────────────────────────────────────── */}
      <CinematicWrap><AIScreeningDemo /></CinematicWrap>


      {/* ── Testimonials + Case Study + Social Proof ────────────────────── */}
      <CinematicWrap><TestimonialsSection /></CinematicWrap>

      {/* ── Final CTA ───────────────────────────────────────────────────── */}
      <CinematicWrap><CTASection /></CinematicWrap>

      {/* ── Sticky CTA — appears after 900px scroll ───────────────────────── */}
      <StickyCTA />
    </main>
  );
}
