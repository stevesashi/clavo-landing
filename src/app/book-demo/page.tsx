"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Brain, BarChart3, Zap, Flame, Star, Shield } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/admin-clavo/30min";

// ─── Background ───────────────────────────────────────────────────────────────

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const FIREFLIES = Array.from({ length: 22 }, (_, i) => ({
  x: 8 + sr(i * 7) * 84, y: 10 + sr(i * 13) * 75,
  size: 1.5 + sr(i * 3) * 2, op: 0.25 + sr(i * 17) * 0.55,
  dur: 4 + sr(i * 5) * 7, delay: sr(i * 11) * 9,
  fx: (sr(i * 19) - 0.5) * 40, fy: (sr(i * 23) - 0.5) * 30,
  color: i % 5 === 0 ? "rgba(217,119,6,0.9)" : i % 3 === 0 ? "rgba(167,139,250,0.9)" : "rgba(110,231,183,0.9)",
}));

const BG_STARS = Array.from({ length: 40 }, (_, i) => ({
  x: sr(i * 31) * 100, y: sr(i * 41) * 60,
  size: 0.7 + sr(i * 7) * 1.2, op: 0.15 + sr(i * 53) * 0.35,
  dur: 3 + sr(i * 17) * 5, delay: sr(i * 43) * 8,
}));

function NightForestClearingBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <>
      {mounted && <style>{`
        @keyframes bd-ff {
          0%,100% { transform:translate(0,0) scale(1); opacity:var(--fop); }
          33%      { transform:translate(var(--fx),var(--fy)) scale(1.3); opacity:calc(var(--fop)*0.15); }
          66%      { transform:translate(calc(var(--fx)*-0.6),calc(var(--fy)*0.4)) scale(0.9); opacity:var(--fop); }
        }
        @keyframes bd-star { 0%,100%{opacity:var(--sop)} 50%{opacity:calc(var(--sop)*0.2)} }
        @keyframes bd-glow { 0%,100%{opacity:0.55} 50%{opacity:0.80} }
        @keyframes bd-mist { 0%,100%{transform:translateX(0)} 50%{transform:translateX(18px)} }
      `}</style>}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Base gradient — dark navy/purple instead of pure black */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #06080f 0%, #080b18 40%, #07091a 70%, #050810 100%)" }} />
        {/* Ambient purple upper-left wash */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(109,40,217,0.13) 0%, transparent 70%)", filter: "blur(60px)" }} />
        {/* Ambient gold upper-center wash */}
        <div className="absolute left-1/4 top-0 h-[400px] w-[700px]"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(217,119,6,0.07) 0%, transparent 65%)", filter: "blur(50px)" }} />
        {mounted && BG_STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: s.size, height: s.size, background: "#fff",
              "--sop": s.op, opacity: s.op,
              animation: `bd-star ${s.dur}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            } as React.CSSProperties} />
        ))}
        {mounted && (
          <>
            <div className="absolute inset-y-0 left-0 w-[22%]"
              style={{ background: "linear-gradient(to right, rgba(1,8,4,0.92) 0%, rgba(2,12,7,0.65) 50%, transparent 100%)" }} />
            <svg className="absolute bottom-0 left-0 opacity-[0.52]" viewBox="0 0 260 500" preserveAspectRatio="none"
              style={{ width: 260, height: "72%", filter: "blur(7px)" }}>
              <path d="M0,500 L0,280 L18,340 L32,230 L50,310 L68,180 L88,270 L105,150 L125,240 L140,170 L158,260 L175,200 L195,290 L215,210 L235,300 L260,240 L260,500 Z" fill="#010b05" />
              <path d="M0,500 L0,320 L22,265 L45,330 L72,240 L95,315 L120,225 L148,308 L175,238 L205,320 L230,265 L260,310 L260,500 Z" fill="#020d07" opacity="0.75" />
            </svg>
            <div className="absolute inset-y-0 left-0 w-[18%]"
              style={{ background: "linear-gradient(to right, rgba(10,40,20,0.12) 0%, transparent 100%)", filter: "blur(12px)", animation: "bd-mist 9s ease-in-out infinite" }} />
            <div className="absolute inset-y-0 right-0 w-[22%]"
              style={{ background: "linear-gradient(to left, rgba(1,8,4,0.92) 0%, rgba(2,12,7,0.65) 50%, transparent 100%)" }} />
            <svg className="absolute bottom-0 right-0 opacity-[0.52]" viewBox="0 0 260 500" preserveAspectRatio="none"
              style={{ width: 260, height: "72%", filter: "blur(7px)", transform: "scaleX(-1)" }}>
              <path d="M0,500 L0,280 L18,340 L32,230 L50,310 L68,180 L88,270 L105,150 L125,240 L140,170 L158,260 L175,200 L195,290 L215,210 L235,300 L260,240 L260,500 Z" fill="#010b05" />
              <path d="M0,500 L0,320 L22,265 L45,330 L72,240 L95,315 L120,225 L148,308 L175,238 L205,320 L230,265 L260,310 L260,500 Z" fill="#020d07" opacity="0.75" />
            </svg>
            <div className="absolute inset-y-0 right-0 w-[18%]"
              style={{ background: "linear-gradient(to left, rgba(10,40,20,0.12) 0%, transparent 100%)", filter: "blur(12px)", animation: "bd-mist 11s ease-in-out infinite reverse" }} />
            <div className="absolute inset-x-[20%]"
              style={{ top: "8%", bottom: "20%", background: "radial-gradient(ellipse at 50% 42%, rgba(217,119,6,0.09) 0%, rgba(139,92,246,0.05) 40%, transparent 68%)", animation: "bd-glow 6s ease-in-out infinite" }} />
            <div className="absolute inset-x-[28%] bottom-[14%]"
              style={{ height: 180, background: "radial-gradient(ellipse at 50% 100%, rgba(217,119,6,0.06) 0%, transparent 70%)", filter: "blur(20px)" }} />
          </>
        )}
        {mounted && FIREFLIES.map((f, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              left: `${f.x}%`, top: `${f.y}%`,
              width: f.size, height: f.size,
              background: f.color, boxShadow: `0 0 ${f.size * 4}px ${f.color}`,
              "--fop": f.op, "--fx": `${f.fx}px`, "--fy": `${f.fy}px`,
              opacity: f.op,
              animation: `bd-ff ${f.dur}s ease-in-out infinite`,
              animationDelay: `${f.delay}s`,
            } as React.CSSProperties} />
        ))}
        <div className="absolute inset-x-0"
          style={{ top: "55%", bottom: 0, background: "linear-gradient(to bottom, transparent 0%, rgba(3,10,5,0.40) 100%)" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.60) 100%)" }} />
      </div>
    </>
  );
}

function ForestFloor() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-0">
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full" style={{ height: 220, display: "block" }}>
        <path d="M0,220 L0,175 L22,145 L44,170 L68,130 L92,160 L118,100 L144,155 L165,120 L190,75 L215,130 L240,100 L268,155 L295,120 L325,68 L358,135 L385,100 L412,155 L440,115 L472,60 L505,128 L532,95 L558,150 L585,108 L618,65 L650,138 L674,100 L700,158 L728,112 L760,62 L793,140 L820,105 L848,162 L875,118 L908,68 L940,142 L966,108 L992,165 L1020,122 L1052,72 L1085,145 L1110,108 L1138,162 L1165,125 L1200,72 L1234,145 L1262,108 L1295,162 L1325,128 L1360,80 L1395,152 L1420,118 L1440,155 L1440,220 Z"
          fill="#091510" />
      </svg>
      <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 w-full" style={{ height: 180, display: "block" }}>
        <path d="M0,180 L0,148 L18,118 L36,142 L55,112 L76,138 L100,88 L126,130 L148,102 L172,58 L198,118 L220,90 L245,138 L272,105 L300,55 L330,122 L352,90 L378,138 L405,100 L432,52 L462,118 L488,88 L514,138 L540,100 L568,55 L598,125 L622,92 L648,140 L672,102 L700,55 L728,128 L752,96 L778,140 L805,100 L835,52 L864,122 L888,90 L914,140 L942,102 L970,55 L998,125 L1022,92 L1048,140 L1074,102 L1104,55 L1132,128 L1156,96 L1182,142 L1208,105 L1240,58 L1268,128 L1292,96 L1320,140 L1348,105 L1378,60 L1408,130 L1440,100 L1440,180 Z"
          fill="#050d08" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-28"
        style={{ background: "linear-gradient(to top, rgba(20,60,35,0.14) 0%, rgba(20,60,35,0.06) 55%, transparent 100%)", filter: "blur(3px)" }} />
    </div>
  );
}

// ─── Calendly embed ───────────────────────────────────────────────────────────

function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Calendly = (window as any).Calendly;
      if (Calendly && ref.current) {
        Calendly.initInlineWidget({
          url: `${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0b1020&text_color=ffffff&primary_color=f59e0b`,
          parentElement: ref.current,
          prefill: {},
          utm: {},
        });
      }
    };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return <div ref={ref} className="w-full" style={{ minWidth: 320, height: 700 }} />;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const BULLETS = [
  { icon: Brain,     color: "#a78bfa", title: "AI screening & interviews in action",  sub: "Watch Clavo autonomously screen, score, and interview candidates — live." },
  { icon: BarChart3, color: "#fbbf24", title: "Your pipeline, from 40 days to 15",    sub: "See the exact workflow that cuts time-to-hire by 62% and cost per hire by 72%." },
  { icon: Zap,       color: "#6ee7b7", title: "CEO-ready hiring intelligence",          sub: "360° candidate reports, market benchmarks, and exec summaries — automated." },
];

const STATS = [
  { value: "15",  unit: "days", label: "avg. time-to-hire" },
  { value: "72%", unit: "",     label: "cost reduction" },
  { value: "94%", unit: "",     label: "offer acceptance rate" },
  { value: "3×",  unit: "",     label: "faster than traditional hiring" },
];

const TESTIMONIALS = [
  { quote: "We filled 3 senior roles in under 2 weeks. Never happened before.",         name: "Fatima Al-Mansoori",  role: "VP Talent · Series B Fintech, Dubai",       color: "#a78bfa" },
  { quote: "The AI interview reports are better than what my team writes manually.",     name: "Ravi Krishnamurthy", role: "Head of HR · SaaS Scale-up, Singapore",     color: "#fbbf24" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BookDemoPage() {
  return (
    <div className="relative min-h-screen" style={{ background: "#06080f" }}>
      <NightForestClearingBackground />
      <ForestFloor />

      {/* ── HERO ── */}
      <section id="demo-booking" className="relative px-4 pb-20 pt-24" style={{ zIndex: 2 }}>
        <div className="relative z-10 mx-auto max-w-6xl">

          {/* Top copy */}
          <div className="mb-14 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
              style={{ borderColor: "rgba(167,139,250,0.30)", background: "rgba(167,139,250,0.09)" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" style={{ animation: "pulse 2s ease-in-out infinite" }} aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300/90">
                30-Min Live Demo · No Sales Pitch
              </span>
            </div>

            <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              See Clavo Replace Your{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400 bg-clip-text text-transparent">
                Entire Hiring Workflow
              </span>
              {" "}— Live
            </h1>

            <p className="mx-auto mb-6 max-w-xl text-lg leading-relaxed text-white/60">
              Book a personalized session and watch Clavo AI screen, interview, and rank candidates in real time.
            </p>

            {/* Founder offer strip */}
            <div className="mx-auto mb-2 inline-flex flex-col gap-1.5 rounded-xl border px-5 py-3"
              style={{
                borderColor: "rgba(217,119,6,0.32)",
                background: "linear-gradient(135deg, rgba(217,119,6,0.10) 0%, rgba(180,83,9,0.07) 100%)",
                boxShadow: "0 0 28px rgba(217,119,6,0.10)",
              }}>
              <div className="flex items-center gap-2.5">
                <Flame size={13} className="shrink-0 text-amber-400" aria-hidden="true" />
                <p className="text-sm font-semibold text-amber-300">
                  Limited Founder Offer — Lock in{" "}
                  <span className="font-extrabold text-amber-300">$699/month for life</span>
                </p>
              </div>
              <p className="pl-[21px] text-xs font-medium text-white/45">Scroll to see full details</p>
            </div>
          </div>

          {/* Calendly embed card */}
          <div className="relative mx-auto max-w-4xl">
            {/* Outer glow layer — sits behind the card */}
            <div aria-hidden="true" className="pointer-events-none absolute -inset-8 rounded-[40px]"
              style={{
                background: "radial-gradient(ellipse at 50% 30%, rgba(109,40,217,0.22) 0%, rgba(217,119,6,0.08) 55%, transparent 75%)",
                filter: "blur(32px)",
              }} />

            <div className="relative overflow-hidden rounded-3xl"
              style={{
                background: "linear-gradient(160deg, rgba(16,20,44,0.95) 0%, rgba(11,14,32,0.98) 100%)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: "1px solid rgba(167,139,250,0.18)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset, 0 2px 80px rgba(109,40,217,0.20), 0 32px 80px rgba(0,0,0,0.70)",
              }}>

              {/* Top edge shimmer */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.65) 30%, rgba(167,139,250,0.65) 70%, transparent 100%)" }} />

              {/* Inner corner glows */}
              <span aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(217,119,6,0.14) 0%, transparent 70%)", filter: "blur(24px)" }} />
              <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)", filter: "blur(24px)" }} />

              <div className="px-8 pb-8 pt-7">
                <p className="mb-1.5 text-center text-base font-semibold text-white/90">Pick a time that works for you</p>
                <p className="mb-6 text-center text-sm text-white/45">All times shown in your local timezone</p>
                {/* Calendly iframe wrapper */}
                <div className="relative overflow-hidden rounded-2xl"
                  style={{
                    background: "rgba(11,15,26,0.90)",
                    border: "1px solid rgba(167,139,250,0.12)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}>
                  {/* Subtle gradient overlay for perceived contrast — behind the iframe */}
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                      background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, rgba(109,40,217,0.08) 45%, transparent 70%)",
                    }} />
                  <CalendlyEmbed />
                </div>
              </div>
            </div>
          </div>

          {/* Bullets below embed */}
          <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-3">
            {BULLETS.map(({ icon: Icon, color, title, sub }) => (
              <div key={title} className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
                  <Icon size={17} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/90">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/45">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust line */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            {[
              { icon: Shield, label: "No credit card required" },
              { icon: Star,   label: "Trusted by teams across GCC & APAC" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={11} className="text-white/35" aria-hidden="true" />
                <span className="text-xs text-white/35">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative px-4 py-14" style={{ zIndex: 2 }} aria-label="Clavo AI results">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map(({ value, unit, label }) => (
              <div key={label} className="rounded-2xl border border-white/[0.08] p-5 text-center"
                style={{ background: "rgba(16,20,44,0.55)", backdropFilter: "blur(16px)" }}>
                <p className="text-3xl font-extrabold text-white">
                  {value}<span className="text-lg text-white/45">{unit}</span>
                </p>
                <p className="mt-1 text-xs text-white/45">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER OFFER ── */}
      <section className="relative px-4 py-14" style={{ zIndex: 2 }} aria-labelledby="founder-offer-heading">
        <div className="mx-auto max-w-2xl">
          <div className="relative overflow-hidden rounded-2xl border p-8 text-center"
            style={{ borderColor: "rgba(239,68,68,0.28)", background: "rgba(239,68,68,0.06)", boxShadow: "0 0 48px rgba(239,68,68,0.08)" }}>
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.55) 50%, transparent)" }} />
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
              style={{ borderColor: "rgba(239,68,68,0.32)", background: "rgba(239,68,68,0.09)" }}>
              <Flame size={12} className="text-red-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-red-400/90">Limited Founder Offer — 7 Spots</span>
            </div>
            <h2 id="founder-offer-heading" className="mb-4 text-2xl font-extrabold text-white sm:text-3xl">
              Lock In <span className="text-amber-300">$699/month</span> Forever
            </h2>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-white/60">
              The first 7 companies to book a demo and sign up get lifetime access at{" "}
              <span className="font-semibold text-amber-300">$699/month</span> — instead of the standard $999/month. Price locks in permanently, even as we scale.
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
              Full access to Clavo's end-to-end AI hiring system — screening, interviews, and 360° reports included.
            </p>
            <p className="mt-3 text-xs text-white/35">No long-term contracts. Cancel anytime.</p>
            <p className="mt-3 text-xs text-white/28">Early partners also get priority support and first access to new features.</p>
            <div className="mt-6 flex items-center justify-center gap-3 text-xs">
              <span className="line-through text-white/25">$999/mo standard</span>
              <span className="text-white/20">·</span>
              <span className="font-semibold text-red-400/80">4 of 7 spots remaining</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="relative px-4 py-14" style={{ zIndex: 2 }} aria-labelledby="social-proof-heading">
        <div className="mx-auto max-w-3xl">
          <p id="social-proof-heading" className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-white/30">
            What teams say after their demo
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {TESTIMONIALS.map(({ quote, name, role, color }) => (
              <div key={name} className="rounded-2xl border border-white/[0.08] p-6"
                style={{ background: "rgba(16,20,44,0.50)", backdropFilter: "blur(16px)" }}>
                <div className="mb-1 flex gap-0.5" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} fill={color} color={color} aria-hidden="true" />
                  ))}
                </div>
                <p className="mb-4 mt-3 text-sm leading-relaxed text-white/75">&ldquo;{quote}&rdquo;</p>
                <p className="text-xs font-semibold text-white/65">{name}</p>
                <p className="text-[11px] text-white/35">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL URGENCY ── */}
      <section className="relative px-4 py-20 pb-52" style={{ zIndex: 2 }} aria-labelledby="urgency-heading">
        <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/[0.09] p-10 text-center"
          style={{ background: "rgba(13,17,36,0.80)", backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)", boxShadow: "0 0 80px rgba(217,119,6,0.10)" }}>
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(217,119,6,0.55) 35%, rgba(139,92,246,0.45) 65%, transparent)" }} />
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-400/65">Don&apos;t miss your slot</p>
          <h2 id="urgency-heading" className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">
            Your next great hire is{" "}
            <span className="bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">15 days away.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-white/50">
            Demo slots fill fast. Book yours now and see Clavo AI transform your pipeline in 30 minutes.
          </p>
          <a href="#demo-booking"
            onClick={(e) => { e.preventDefault(); document.getElementById("demo-booking")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            style={{ background: "linear-gradient(135deg, #d97706 0%, #b45309 55%, #7c3aed 100%)", boxShadow: "0 0 32px rgba(217,119,6,0.45), 0 0 64px rgba(217,119,6,0.12)", touchAction: "manipulation" }}>
            Book a Live Demo
            <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <p className="mt-4 text-xs text-white/25">
            No credit card &nbsp;·&nbsp; 4 of 7 founder spots left &nbsp;·&nbsp; Cancel anytime
          </p>
        </div>
      </section>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }`}</style>
    </div>
  );
}
