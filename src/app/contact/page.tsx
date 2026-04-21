"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Zap, Globe2 } from "lucide-react";

// ─── Static background ────────────────────────────────────────────────────────

function ContactBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #020508 0%, #030a12 45%, #04080f 100%)" }} />
      {/* Purple edge bloom — left */}
      <div className="absolute inset-y-0 left-0 w-[40%]"
        style={{ background: "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(109,40,217,0.07) 0%, transparent 70%)" }} />
      {/* Purple edge bloom — right */}
      <div className="absolute inset-y-0 right-0 w-[40%]"
        style={{ background: "radial-gradient(ellipse 80% 60% at 100% 50%, rgba(109,40,217,0.06) 0%, transparent 70%)" }} />
      {/* Gold center glow */}
      <div className="absolute"
        style={{
          top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 560, height: 560,
          background: "radial-gradient(circle, rgba(217,119,6,0.055) 0%, transparent 65%)",
          filter: "blur(40px)",
        }} />
      {/* Subtle grid */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }} />
      {/* Vignette */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 110% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

type FormState = { name: string; email: string; company: string; message: string };

function ContactForm() {
  const [form, setForm]         = useState<FormState>({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]   = useState<string | null>(null);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const canSubmit = form.name && form.email && form.company && form.message;

  const inputBase =
    "w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/25 transition-all duration-200";

  const inputStyle = (field: string) => ({
    borderColor: focused === field ? "rgba(167,139,250,0.45)" : "rgba(255,255,255,0.08)",
    background:  focused === field ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
    boxShadow:   focused === field ? "0 0 0 3px rgba(139,92,246,0.10)" : "none",
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-14 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(110,231,183,0.10)", border: "1px solid rgba(110,231,183,0.22)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(110,231,183)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <p className="text-xl font-bold text-white">Message sent!</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/45">
            We'll get back to you within 24 hours. Check your inbox.
          </p>
        </div>
        <button
          onClick={() => { setForm({ name: "", email: "", company: "", message: "" }); setSubmitted(false); }}
          className="text-xs text-white/30 underline underline-offset-4 hover:text-white/55 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={e => { e.preventDefault(); if (canSubmit) setSubmitted(true); }}
      className="flex flex-col gap-4"
      noValidate
    >
      {/* Row: name + email */}
      <div className="grid gap-4 sm:grid-cols-2">
        {(["name", "email"] as const).map(field => (
          <div key={field}>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/30">
              {field === "name" ? "Full Name" : "Work Email"}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              className={inputBase}
              placeholder={field === "name" ? "Sarah Johnson" : "sarah@company.com"}
              value={form[field]}
              onChange={set(field)}
              onFocus={() => setFocused(field)}
              onBlur={() => setFocused(null)}
              style={inputStyle(field)}
              required
            />
          </div>
        ))}
      </div>

      {/* Company */}
      <div>
        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/30">
          Company
        </label>
        <input
          type="text"
          className={inputBase}
          placeholder="Acme Corp"
          value={form.company}
          onChange={set("company")}
          onFocus={() => setFocused("company")}
          onBlur={() => setFocused(null)}
          style={inputStyle("company")}
          required
        />
      </div>

      {/* Message */}
      <div>
        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/30">
          Message
        </label>
        <textarea
          rows={5}
          className={inputBase + " resize-none"}
          placeholder="Tell us about your hiring challenges, what you're looking for, or any questions you have…"
          value={form.message}
          onChange={set("message")}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          style={inputStyle("message")}
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="group mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
        style={{
          background:  canSubmit ? "linear-gradient(135deg, #d97706 0%, #b45309 55%, #7c3aed 100%)" : "rgba(255,255,255,0.06)",
          boxShadow:   canSubmit ? "0 0 28px rgba(217,119,6,0.32)" : "none",
          color:       canSubmit ? "#fff" : "rgba(255,255,255,0.22)",
          cursor:      canSubmit ? "pointer" : "not-allowed",
          transition:  "background 0.3s, box-shadow 0.3s, color 0.3s",
        }}
      >
        Send Message
        <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "General & Support",
    value: "hello@clavo-ai.com",
    href: "mailto:hello@clavo-ai.com",
    color: "#a78bfa",
  },
  {
    icon: Zap,
    label: "Sales & Partnerships",
    value: "sales@clavo-ai.com",
    href: "mailto:sales@clavo-ai.com",
    color: "#fbbf24",
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen" style={{ background: "#020508" }}>
      <ContactBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-28 pt-32">

        {/* ── HERO ── */}
        <div className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: "rgba(167,139,250,0.22)", background: "rgba(167,139,250,0.07)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden="true"
              style={{ boxShadow: "0 0 6px rgba(167,139,250,0.8)" }} />
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300/75">
              We're here to help
            </span>
          </div>

          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white sm:text-6xl"
            style={{ lineHeight: 1.07, textShadow: "0 0 60px rgba(217,119,6,0.15)" }}>
            Get in Touch
          </h1>

          <p className="mx-auto max-w-lg text-lg leading-relaxed text-white/45">
            Questions about Clavo, demos, partnerships, or early access?
            We&apos;d love to hear from you.
          </p>
        </div>

        {/* ── TWO-COLUMN ── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_480px] lg:items-start">

          {/* LEFT — contact info */}
          <div className="flex flex-col gap-8 lg:pt-2">

            {/* Contact cards */}
            <div className="flex flex-col gap-4">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, color }) => (
                <a key={href} href={href}
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] p-5 transition-all duration-200 hover:border-white/[0.13]"
                  style={{ background: "rgba(255,255,255,0.025)" }}>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${color}14`, border: `1px solid ${color}28` }}>
                    <Icon size={18} style={{ color }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30">{label}</p>
                    <p className="mt-0.5 text-base font-semibold text-white/80 transition-colors group-hover:text-white">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Trust copy */}
            <div className="rounded-2xl border border-white/[0.06] p-6"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <p className="text-base leading-relaxed text-white/50">
                Whether you're a recruiter, HR lead, or founder — we take every message seriously.
                No generic auto-replies, no runaround.
              </p>
              <p className="mt-4 text-sm font-medium text-white/35">
                We usually reply within{" "}
                <span className="font-bold text-amber-400/70">24 hours.</span>
              </p>
            </div>

            {/* Region note */}
            <div className="flex items-center gap-3">
              <Globe2 size={15} className="shrink-0 text-white/20" aria-hidden="true" />
              <p className="text-sm text-white/28">
                Serving fast-scaling teams across GCC &amp; Asia Pacific
              </p>
            </div>
          </div>

          {/* RIGHT — form card */}
          <div className="relative rounded-2xl p-7"
            style={{
              background: "rgba(4,8,16,0.88)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(167,139,250,0.12)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 60px rgba(109,40,217,0.12), 0 12px 48px rgba(0,0,0,0.65)",
            }}>
            {/* Top shimmer */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.45) 40%, rgba(217,119,6,0.40) 60%, transparent)" }} />

            <div className="mb-6">
              <p className="text-lg font-bold text-white">Send us a message</p>
              <p className="mt-1 text-sm text-white/35">Fill in the form and we'll get back to you shortly.</p>
            </div>

            <ContactForm />
          </div>
        </div>

        {/* ── DEMO CTA ── */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-white/[0.07] p-8 text-center sm:p-10"
          style={{
            background: "linear-gradient(145deg, rgba(6,10,18,0.85), rgba(109,40,217,0.06))",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 0 40px rgba(109,40,217,0.07)",
          }}>
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.35) 50%, transparent)" }} />

          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-violet-400/55">
            Want a faster response?
          </p>
          <h2 className="mb-5 text-2xl font-extrabold text-white sm:text-3xl">
            Talk to us{" "}
            <span className="bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">
              live.
            </span>
          </h2>

          <Link
            href="/book-demo"
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            style={{
              background: "linear-gradient(135deg, #d97706 0%, #b45309 55%, #7c3aed 100%)",
              boxShadow: "0 0 24px rgba(217,119,6,0.38), 0 0 48px rgba(217,119,6,0.10)",
            }}
            aria-label="Book a live demo with Clavo AI"
          >
            Book a Live Demo
            <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ── FOOTER REASSURANCE ── */}
        <div className="mt-14 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-white/22">
            Built for fast-scaling hiring teams across GCC &amp; Asia
          </p>
          <div className="flex items-center gap-4 text-xs text-white/18">
            <Link href="/privacy" className="hover:text-white/35 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white/35 transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link href="/" className="hover:text-white/35 transition-colors">Back to home</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
