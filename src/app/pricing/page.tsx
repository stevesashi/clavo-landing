import ClavoPricingBlocks from "@/components/ui/pricing-blocks";
import StickyCTA from "@/components/layout/StickyCTA";
import { Check, Shield, Zap, Clock, Users, BarChart3, MessageSquare, Award } from "lucide-react";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Pricing — Clavo AI",
  description:
    "Simple, transparent pricing for GCC hiring teams. Starting at $499/month. No hidden fees.",
};

// ─── "Included in every plan" items ──────────────────────────────────────────

const UNIVERSAL = [
  { icon: <Shield size={14} />,      label: "Bias-Free AI Scoring"     },
  { icon: <Zap size={14} />,         label: "4-Hour Screening Speed"   },
  { icon: <Clock size={14} />,       label: "15-Day Hiring Cycle"       },
  { icon: <Users size={14} />,       label: "Golden Top-5 Ranking"     },
  { icon: <BarChart3 size={14} />,   label: "Pipeline Analytics"       },
  { icon: <MessageSquare size={14} />, label: "WhatsApp Alerts"        },
  { icon: <Award size={14} />,       label: "360° Candidate Reports"   },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ = [
  {
    q: "Are these monthly or annual plans?",
    a: "All prices are billed monthly. Annual billing is available at a 20% discount — contact us to set this up.",
  },
  {
    q: "Can I upgrade or downgrade at any time?",
    a: "Yes. Plan changes take effect immediately on your next billing cycle. Unused credit is prorated.",
  },
  {
    q: "Is there a free trial?",
    a: "We offer a 7-day pilot for qualified teams. Book a live demo and our team will walk you through the setup.",
  },
  {
    q: "What regions does Clavo AI cover?",
    a: "Clavo AI is purpose-built for fast-scaling teams across the GCC — UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.",
  },
  {
    q: "How does the Enterprise plan work?",
    a: "Enterprise pricing is custom-scoped to your team size, role volume, and required integrations. Schedule a call and we'll build a proposal within 24 hours.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #030608 0%, #050b14 40%, #030608 100%)" }}
    >
      {/* ── Background ambient glows ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(139,92,246,0.05)" }}
        />
        <div
          className="absolute right-1/4 top-1/2 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(139,92,246,0.05)" }}
        />
      </div>

      <div className="relative z-10">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <section className="px-4 pb-12 pt-36 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400/60">
            Pricing
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Invest in{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #f0a500 0%, #fbbf24 40%, #c084fc 100%)",
              }}
            >
              Smarter Hiring
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/40">
            Transparent plans for every stage of your GCC recruiting journey.
            No hidden fees. Cancel anytime.
          </p>

          {/* Trust chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {[
              "15-day hiring cycle",
              "No setup fees",
              "Cancel anytime",
              "GCC focused",
            ].map((chip) => (
              <span
                key={chip}
                className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-white/45"
              >
                <Check size={10} className="text-emerald-400/70" aria-hidden="true" />
                {chip}
              </span>
            ))}
          </div>
        </section>

        {/* ── PRICING CARDS ──────────────────────────────────────────────── */}
        <ClavoPricingBlocks />

        {/* ── INCLUDED IN EVERY PLAN ─────────────────────────────────────── */}
        <section
          className="mx-auto max-w-4xl px-4 py-14"
          aria-labelledby="universal-heading"
        >
          <p
            id="universal-heading"
            className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-white/28"
          >
            Included in every plan
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/[0.06] p-6"
            style={{ background: "rgba(255,255,255,0.02)" }}
            role="list"
            aria-label="Features included in all plans"
          >
            {UNIVERSAL.map(({ icon, label }) => (
              <span
                key={label}
                role="listitem"
                className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-white/55"
              >
                <span className="text-purple-400/70" aria-hidden="true">{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* ── COMPARISON TABLE ───────────────────────────────────────────── */}
        <section
          className="pricing-table-wrap mx-auto max-w-4xl overflow-x-auto px-4 pb-16"
          aria-label="Plan feature comparison"
        >
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="pb-4 text-left text-[11px] font-semibold uppercase tracking-widest text-white/28">
                  Feature
                </th>
                {["Core", "Scale", "Enterprise"].map((name, i) => (
                  <th
                    key={name}
                    className="pb-4 text-center text-[11px] font-bold uppercase tracking-widest"
                    style={{
                      color: i === 0 ? "#818cf8" : i === 1 ? "#f0a500" : "#34d399",
                    }}
                  >
                    {name}
                    {i === 1 && (
                      <span className="ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-extrabold" style={{ background: "rgba(240,165,0,0.15)", color: "#f0a500" }}>
                        Popular
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                ["Active Roles",                  "5",          "10",           "Unlimited"      ],
                ["Recruiter Seats",               "2",          "5",            "Custom"         ],
                ["AI CV Screening",               "Unlimited",  "Unlimited",    "Unlimited"      ],
                ["AI Video Interviews",           "—",          "2,500 min/mo", "Unlimited"      ],
                ["Candidate Reports",             "Basic",      "360° Advanced","360° Advanced"  ],
                ["Nationalization Dashboard",     "1 Country",  "6 Countries",  "6 Countries"    ],
                ["Penalty Calculator & ROI",      "✓",          "✓",            "✓"              ],
                ["Government Report Export",      "✓",          "✓",            "✓"              ],
                ["Smart Notes + Insights",        "—",          "✓",            "✓"              ],
                ["Talent Mapping",                "—",          "✓",            "✓"              ],
                ["AI Co-Pilot (Live Interviews)", "—",          "✓",            "✓"              ],
                ["WhatsApp Integration",          "—",          "✓",            "✓"              ],
                ["Analytics",                     "Basic",      "Advanced",     "Advanced"       ],
                ["AI Sourcing Agent",             "—",          "—",            "✓"              ],
                ["Custom AI Models",              "—",          "—",            "✓"              ],
                ["ATS Integrations",              "✓",          "✓",            "✓"              ],
                ["Custom Workflows",              "—",          "—",            "✓"              ],
                ["White-Label Option",            "—",          "—",            "✓"              ],
                ["Dedicated Account Manager",     "—",          "—",            "✓"              ],
                ["Support",                       "Email",      "Priority",     "Dedicated + SLA"],
              ] as string[][]).map(([feature, ...cols]) => (
                <tr
                  key={feature}
                  className="border-b"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                >
                  <td className="py-3 text-xs text-white/50">{feature}</td>
                  {cols.map((val, ci) => {
                    const isPremium =
                      val === "✓" ||
                      val === "Unlimited" ||
                      val === "360° Advanced" ||
                      val === "Full" ||
                      val === "Advanced" ||
                      val === "Custom" ||
                      val === "Dedicated + SLA";
                    const isMuted =
                      val === "Basic" ||
                      val === "View Only" ||
                      val === "Email";
                    const isDash = val === "—";
                    const colAccent = ci === 0 ? "#818cf8" : ci === 1 ? "#f0a500" : "#34d399";
                    const color = isDash
                      ? "rgba(255,255,255,0.2)"
                      : isPremium
                      ? colAccent
                      : isMuted
                      ? "rgba(255,255,255,0.5)"
                      : "#ffffff";
                    const fontWeight = isDash || isMuted ? 400 : 700;
                    return (
                      <td
                        key={ci}
                        className="py-3 text-center text-xs"
                        style={{ color, fontWeight }}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section
          className="mx-auto max-w-2xl px-4 pb-20"
          aria-labelledby="faq-heading"
        >
          <h2
            id="faq-heading"
            className="mb-8 text-center text-2xl font-extrabold tracking-tight text-white"
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 open:pb-5"
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white/80 hover:text-white">
                  {q}
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/30 transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[13px] leading-relaxed text-white/42">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA STRIP ───────────────────────────────────────────── */}
        <section
          className="px-4 pb-24"
          aria-label="Call to action"
        >
          <div
            className="mx-auto max-w-3xl rounded-3xl border border-white/[0.07] p-10 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.07) 0%, rgba(139,92,246,0.08) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 0 80px rgba(139,92,246,0.08), 0 0 0 1px rgba(255,255,255,0.04) inset",
            }}
          >
            {/* Top accent line */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-3xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(139,92,246,0.6) 40%, rgba(139,92,246,0.4) 70%, transparent)",
              }}
            />
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-purple-400/60">
              Still deciding?
            </p>
            <h2 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">
              See Clavo AI in a 15-min live demo
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/40">
              Our team will show you exactly how Clavo replaces your screening
              bottleneck — live, with your actual job description.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="/book-demo"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                  boxShadow: "0 0 24px rgba(139,92,246,0.45)",
                  touchAction: "manipulation",
                }}
              >
                Book a Live Demo
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/#features"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/55 transition-colors hover:border-white/20 hover:text-white/85"
                style={{ touchAction: "manipulation" }}
              >
                See Clavo in Action
              </a>
            </div>
          </div>
        </section>

      </div>

      <StickyCTA />
    </main>
  );
}
