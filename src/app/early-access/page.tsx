"use client";

import { useState } from "react";
import { Check, Zap, Crown, Headphones, Flame, ArrowRight, Lock, Users, Globe, Sparkles } from "lucide-react";
import GlobalBackground from "@/components/cinematic/GlobalBackground";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: Zap,
    color: "#a78bfa",
    border: "rgba(167,139,250,0.20)",
    glow: "rgba(167,139,250,0.08)",
    title: "Early access before public launch",
    sub: "Be among the first to deploy Clavo inside your hiring pipeline — before anyone else.",
  },
  {
    icon: Crown,
    color: "#c084fc",
    border: "rgba(192,132,252,0.20)",
    glow: "rgba(192,132,252,0.07)",
    title: "Founder pricing — locked forever",
    sub: "Secure $1,199/month for life. This rate disappears the moment we go public.",
  },
  {
    icon: Headphones,
    color: "#6ee7b7",
    border: "rgba(110,231,183,0.20)",
    glow: "rgba(110,231,183,0.07)",
    title: "Direct onboarding + white-glove support",
    sub: "Our founding team sets up your pipeline personally. No ticket queues. No waiting.",
  },
  {
    icon: Sparkles,
    color: "#f472b6",
    border: "rgba(244,114,182,0.20)",
    glow: "rgba(244,114,182,0.07)",
    title: "Personalized For You",
    sub: "Each of our 7 founding partners gets features built around their actual workflow.",
  },
];

const TRUST = [
  { icon: Lock,   label: "Zero spam. Ever." },
  { icon: Zap,    label: "Priority onboarding for accepted founders" },
  { icon: Users,  label: "Limited to 7 founding companies" },
  { icon: Globe,  label: "Built for fast-scaling teams across GCC & Asia" },
];

const HIRING_VOLUMES = ["1–10 / year", "11–50 / year", "51–200 / year", "201–500 / year", "500+ / year"];
const TEAM_SIZES    = ["1–10 people", "11–50 people", "51–200 people", "200+ people"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function EarlyAccessPage() {
  const [form, setForm] = useState({
    name: "", email: "", company: "",
    volume: "", teamSize: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const canSubmit = !!(form.name && form.email && form.company && form.volume && form.teamSize);

  const inputCls =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/25 transition-colors duration-200 focus:border-violet-500/50 focus:bg-white/[0.06]";
  const selectCls =
    "w-full rounded-xl border border-white/[0.08] bg-[#0a101a] px-4 py-3.5 text-sm text-white outline-none transition-colors duration-200 focus:border-violet-500/50 appearance-none cursor-pointer";
  const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/35";

  return (
    <div className="relative min-h-screen" style={{ background: "#03050a" }}>

      {/* Background — same as homepage */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <GlobalBackground />
      </div>

      {/* Fixed treeline */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-0">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full" style={{ height: 220 }}>
          <path d="M0,220 L0,175 L22,145 L44,170 L68,130 L92,160 L118,100 L144,155 L165,120 L190,75 L215,130 L240,100 L268,155 L295,120 L325,68 L358,135 L385,100 L412,155 L440,115 L472,60 L505,128 L532,95 L558,150 L585,108 L618,65 L650,138 L674,100 L700,158 L728,112 L760,62 L793,140 L820,105 L848,162 L875,118 L908,68 L940,142 L966,108 L992,165 L1020,122 L1052,72 L1085,145 L1110,108 L1138,162 L1165,125 L1200,72 L1234,145 L1262,108 L1295,162 L1325,128 L1360,80 L1395,152 L1420,118 L1440,155 L1440,220 Z" fill="#091510" />
        </svg>
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 w-full" style={{ height: 180 }}>
          <path d="M0,180 L0,148 L18,118 L36,142 L55,112 L76,138 L100,88 L126,130 L148,102 L172,58 L198,118 L220,90 L245,138 L272,105 L300,55 L330,122 L352,90 L378,138 L405,100 L432,52 L462,118 L488,88 L514,138 L540,100 L568,55 L598,125 L622,92 L648,140 L672,102 L700,55 L728,128 L752,96 L778,140 L805,100 L835,52 L864,122 L888,90 L914,140 L942,102 L970,55 L998,125 L1022,92 L1048,140 L1074,102 L1104,55 L1132,128 L1156,96 L1182,142 L1208,105 L1240,58 L1268,128 L1292,96 L1320,140 L1348,105 L1378,60 L1408,130 L1440,100 L1440,180 Z" fill="#050d08" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(to top, rgba(60,110,80,0.10) 0%, transparent 100%)", filter: "blur(2px)" }} />
      </div>

      <div className="mx-auto px-4 pb-48" style={{ position: "relative", zIndex: 10, paddingTop: "120px", maxWidth: "1400px" }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: "rgba(239,68,68,0.30)", background: "rgba(239,68,68,0.07)" }}>
            <Flame size={12} className="text-red-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400/85">
              Limited Founder Access
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Get Early Access to the{" "}
            <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-400 bg-clip-text text-transparent">
              Future of Hiring
            </span>
          </h1>

          <p className="mx-auto max-w-lg text-lg leading-relaxed text-white/45">
            Join the waitlist to experience Clavo before public launch and unlock
            founder-only access — limited to 7 companies.
          </p>
        </div>

        {/* ── FORM ─────────────────────────────────────────────────────────── */}
        <div className="relative mb-14 overflow-hidden rounded-3xl border border-white/[0.08] p-8 sm:p-10"
          style={{
            background: "rgba(8,14,24,0.82)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            boxShadow: "0 0 80px rgba(167,139,250,0.08), 0 0 40px rgba(139,92,246,0.06), 0 12px 60px rgba(0,0,0,0.7)",
          }}>

          {/* Top shimmer */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.50) 35%, rgba(167,139,250,0.45) 65%, transparent)" }} />

          {submitted ? (

            /* ── SUCCESS STATE ── */
            <div className="flex flex-col items-center py-10 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                style={{ background: "rgba(110,231,183,0.09)", border: "1px solid rgba(110,231,183,0.25)", boxShadow: "0 0 40px rgba(110,231,183,0.12)" }}>
                <Check size={36} className="text-emerald-400" strokeWidth={2.5} />
              </div>

              <h2 className="mb-2 text-3xl font-extrabold text-white">You&apos;re on the list.</h2>
              <p className="mb-2 max-w-sm text-base leading-relaxed text-white/50">
                We&apos;ll reach out personally when your access window opens.
              </p>
              <p className="mb-8 text-sm text-purple-400/70">
                Founder spots are limited — you&apos;re in early.
              </p>

              <div className="w-full max-w-sm rounded-2xl border border-white/[0.06] p-5 text-left"
                style={{ background: "rgba(255,255,255,0.025)" }}>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/28">What happens next</p>
                {[
                  "Our team reviews your profile within 24 hours",
                  "You'll receive a personal invite to onboard",
                  "We lock in your founder pricing before public launch",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 py-2">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white/40"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-white/55">{step}</p>
                  </div>
                ))}
              </div>
            </div>

          ) : (

            /* ── FORM STATE ── */
            <form onSubmit={async e => {
              e.preventDefault();
              if (!canSubmit) return;
              setLoading(true);
              setError(false);
              try {
                await fetch("https://script.google.com/macros/s/AKfycby2xeoChggM_Hd4747GAXxloooZvQaHQLK-SR_EOxi_ZVvqxj3hmiZxYIR7ZzS77xUlDQ/exec", {
                  method: "POST",
                  mode: "no-cors",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: form.name, email: form.email, company: form.company }),
                });
                setSubmitted(true);
              } catch {
                setError(true);
              } finally {
                setLoading(false);
              }
            }}
              className="flex flex-col gap-5">

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Full Name</label>
                  <input type="text" className={inputCls} placeholder="Sarah Al-Rashid"
                    value={form.name} onChange={e => set("name", e.target.value)} required />
                </div>
                <div>
                  <label className={labelCls}>Work Email</label>
                  <input type="email" className={inputCls} placeholder="sarah@company.com"
                    value={form.email} onChange={e => set("email", e.target.value)} required />
                </div>
              </div>

              <div>
                <label className={labelCls}>Company Name</label>
                <input type="text" className={inputCls} placeholder="Your Company"
                  value={form.company} onChange={e => set("company", e.target.value)} required />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Hiring Volume</label>
                  <div className="relative">
                    <select className={selectCls} value={form.volume}
                      onChange={e => set("volume", e.target.value)} required>
                      <option value="" disabled>Select range</option>
                      {HIRING_VOLUMES.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                    <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30">▾</span>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Team Size</label>
                  <div className="relative">
                    <select className={selectCls} value={form.teamSize}
                      onChange={e => set("teamSize", e.target.value)} required>
                      <option value="" disabled>Select size</option>
                      {TEAM_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30">▾</span>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelCls}>Your biggest hiring challenge <span className="normal-case text-white/20">(optional)</span></label>
                <textarea className={inputCls} rows={3}
                  placeholder="e.g. Screening 200+ CVs per role, slow interview process, inconsistent scoring..."
                  value={form.message} onChange={e => set("message", e.target.value)} style={{ resize: "none" }} />
              </div>

              {error && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="group mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
                style={{
                  background: canSubmit && !loading
                    ? "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #7c3aed 100%)"
                    : "rgba(255,255,255,0.06)",
                  boxShadow: canSubmit && !loading ? "0 0 32px rgba(139,92,246,0.40), 0 0 64px rgba(139,92,246,0.10)" : "none",
                  color: canSubmit && !loading ? "#fff" : "rgba(255,255,255,0.20)",
                  cursor: canSubmit && !loading ? "pointer" : "not-allowed",
                  transition: "background 0.3s, box-shadow 0.3s, color 0.3s",
                }}
              >
                {loading ? "Submitting…" : "Request Early Access"}
                {!loading && <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />}
              </button>

              <p className="text-center text-xs text-white/20">
                No spam. No credit card. We review every application personally.
              </p>
            </form>
          )}
        </div>

        {/* ── FOUNDER OFFER ────────────────────────────────────────────────── */}
        <div className="relative mb-14 overflow-hidden rounded-2xl border p-8 text-center"
          style={{
            borderColor: "rgba(192,132,252,0.22)",
            background: "rgba(139,92,246,0.05)",
            boxShadow: "0 0 50px rgba(139,92,246,0.07)",
          }}>
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(192,132,252,0.55) 50%, transparent)" }} />

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: "rgba(192,132,252,0.25)", background: "rgba(192,132,252,0.07)" }}>
            <Crown size={11} className="text-purple-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400/80">Founder Pricing</span>
          </div>

          <h2 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">
            <span className="text-purple-300">$1,199/month</span>
            {" "}— locked in forever.
          </h2>
          <p className="mx-auto max-w-md text-base leading-relaxed text-white/45">
            The first 7 companies to join receive lifetime access at $1,199/month instead of $1,999/month.
            The price never increases — even as we scale and add features.
          </p>
          <p className="mt-4 text-sm font-semibold text-red-400/60">
            4 of 7 spots remaining.
          </p>
        </div>
        </div>{/* end narrow wrapper */}

        {/* ── WHY JOIN ─────────────────────────────────────────────────────── */}
        <div className="mb-14">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-white/22">
            Why join early
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, width: "100%" }}>
            {BENEFITS.map(({ icon: Icon, color, border, glow, title, sub }) => (
              <div key={title} className="rounded-2xl border p-6"
                style={{ borderColor: border, background: glow }}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${color}15`, border: `1px solid ${color}28`, color }}>
                  <Icon size={18} aria-hidden="true" />
                </div>
                <p className="mb-2 text-sm font-bold text-white">{title}</p>
                <p className="text-sm leading-relaxed text-white/42">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TRUST ────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {TRUST.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={12} className="shrink-0 text-white/25" aria-hidden="true" />
              <span className="text-sm text-white/30">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
