import CinematicHero from "@/components/cinematic/CinematicHero";
import LanternCursor from "@/components/cinematic/LanternCursor";
import GlobalBackground from "@/components/cinematic/GlobalBackground";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ForensicIntelligenceSection from "@/components/sections/ForensicIntelligenceSection";
import TrustBar from "@/components/sections/TrustBar";
import MetricsSection from "@/components/sections/MetricsSection";
import DemoSection from "@/components/sections/DemoSection";
import PainSolutionSection from "@/components/sections/PainSolutionSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AIScreeningDemo from "@/components/sections/AIScreeningDemo";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import CTASection from "@/components/sections/CTASection";
import StickyCTA from "@/components/layout/StickyCTA";

// ──────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Clavo AI — The Future of Behavioral Recruitment",
  description:
    "Clavo AI screens, interviews, and ranks candidates autonomously. Time-to-hire drops from 40 days to 15. Cost per hire falls from AED 15k to AED 4.2k.",
};

export default function Home() {
  return (
    <main>
      {/* Persistent canvas background — spans entire page, z-index 2, screen blend */}
      <GlobalBackground />

      {/* Global glowing lantern cursor — primary light source for the forest */}
      <LanternCursor />

      {/* ── Cinematic 4-scene vertical journey ──────────────────────────── */}
      <CinematicHero />

       {/* ── Capabilities — "Your Entire Hiring System" ───────────────────── */}
      <CapabilitiesSection />

       {/* ── Trust Bar ───────────────────────────────────────────────────── */}
      <TrustBar />

      {/* ── Forensic Hiring Intelligence dashboard ───────────────────────── */}
      <ForensicIntelligenceSection />

      {/* ── Metrics ─────────────────────────────────────────────────────── */}
      <MetricsSection />

      {/* ── How It Works ────────────────────────────────────────────────── */}
      <HowItWorksSection />

      {/* ── Demo Video ──────────────────────────────────────────────────── */}
      <DemoSection />

      {/* ── Interactive AI Screening ─────────────────────────────────────── */}
      <AIScreeningDemo />

      {/* ── Pain → Solution ─────────────────────────────────────────────── */}
      <PainSolutionSection />

      {/* ── Platform Features — 4 product modules ───────────────────────── */}
      <FeaturesSection />

      {/* ── Testimonials + Case Study + Social Proof ────────────────────── */}
      <TestimonialsSection />


{/* ── Final CTA ───────────────────────────────────────────────────── */}
      <CTASection />

      {/* ── Sticky CTA — appears after 900px scroll ───────────────────────── */}
      <StickyCTA />
    </main>
  );
}
