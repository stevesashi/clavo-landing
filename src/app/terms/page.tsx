"use client";

import Link from "next/link";
import BeachScrollBackground from "@/components/cinematic/BeachScrollBackground";

const LAST_UPDATED = "April 18, 2026";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      {
        body: "By accessing or using Clavo AI (the \"Service\"), you confirm that you have read, understood, and agree to be bound by these Terms of Service (\"Terms\"). If you are using the Service on behalf of a company or organisation, you represent that you have the authority to bind that entity to these Terms.",
      },
      {
        body: "If you do not agree to these Terms, you must not access or use the Service.",
      },
    ],
  },
  {
    id: "use-of-service",
    title: "2. Use of Service",
    content: [
      {
        subtitle: "Permitted use",
        body: "Clavo AI is designed for businesses and hiring teams to assist with recruitment workflows. You may use the Service only for lawful purposes and in accordance with these Terms.",
      },
      {
        subtitle: "Prohibited conduct",
        body: "You agree not to:",
        list: [
          "Use the Service to engage in any unlawful, harmful, or discriminatory hiring practices",
          "Attempt to reverse-engineer, copy, or resell any part of the platform or its AI models",
          "Input or process data that infringes third-party intellectual property or privacy rights",
          "Use automated scripts, bots, or scrapers to extract data from the Service",
          "Interfere with or disrupt the integrity or performance of the platform or its infrastructure",
          "Share access credentials or allow unauthorised parties to access your account",
        ],
      },
      {
        subtitle: "Responsible AI use",
        body: "Clavo AI provides AI-assisted insights and recommendations to support your hiring process. You are solely responsible for how you interpret and act on those outputs. The Service is a decision-support tool — not a substitute for informed human judgement.",
      },
    ],
  },
  {
    id: "accounts",
    title: "3. Accounts",
    content: [
      {
        body: "To access the Service, you must create an account and provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.",
      },
      {
        body: "You must notify us immediately at support@clavoai.com if you suspect any unauthorised access to your account. Clavo AI will not be liable for any loss or damage arising from your failure to maintain adequate account security.",
      },
      {
        body: "We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.",
      },
    ],
  },
  {
    id: "availability",
    title: "4. Service Availability",
    content: [
      {
        body: "We strive to keep Clavo AI available at all times, but we do not guarantee uninterrupted access. The Service may be temporarily unavailable due to scheduled maintenance, technical issues, or circumstances beyond our control.",
      },
      {
        subtitle: "Feature changes",
        body: "We continuously improve the platform. We reserve the right to add, modify, or remove features at any time. Where changes are significant, we will provide reasonable advance notice to active subscribers. Continued use of the Service after such changes constitutes acceptance.",
      },
    ],
  },
  {
    id: "payments",
    title: "5. Payments & Subscriptions",
    content: [
      {
        body: "Clavo AI is offered on a subscription basis. Pricing, billing cycles, and plan details are outlined at the time of purchase and on our Pricing page. All fees are quoted in USD unless otherwise stated.",
      },
      {
        subtitle: "Billing",
        body: "By subscribing, you authorise us to charge your designated payment method on a recurring basis in accordance with your chosen plan. Subscriptions automatically renew unless cancelled before the renewal date.",
      },
      {
        subtitle: "Refunds",
        body: "We do not offer refunds for unused portions of a billing period, except where required by applicable law. If you believe you have been charged in error, please contact us within 14 days at billing@clavoai.com.",
      },
      {
        subtitle: "Founder pricing",
        body: "Any promotional or founder-tier pricing is locked for the duration specified at signup and is non-transferable. Clavo AI reserves the right to discontinue promotional pricing for new sign-ups at any time.",
      },
    ],
  },
  {
    id: "liability",
    title: "6. Limitation of Liability",
    content: [
      {
        body: "To the fullest extent permitted by applicable law, Clavo AI and its directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service.",
      },
      {
        subtitle: "Hiring decisions",
        body: "Clavo AI provides tools and insights to support recruitment — it does not make hiring decisions on your behalf. You retain full responsibility for all employment decisions, including candidate selection, rejection, offers, and compliance with applicable employment and anti-discrimination laws. Clavo AI expressly disclaims any liability for outcomes resulting from hiring decisions made by users of the platform.",
      },
      {
        subtitle: "Cap on liability",
        body: "In any case, our total aggregate liability to you for any claims arising under these Terms shall not exceed the amount you paid to Clavo AI in the three (3) months preceding the event giving rise to the claim.",
      },
    ],
  },
  {
    id: "data-privacy",
    title: "7. Data & Privacy",
    content: [
      {
        body: "Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. We encourage you to read it carefully to understand how we collect, use, and protect your data.",
      },
      {
        body: "By using Clavo AI, you consent to the data practices described in our Privacy Policy.",
        privacyLink: true,
      },
    ],
  },
  {
    id: "termination",
    title: "8. Termination",
    content: [
      {
        body: "You may cancel your account at any time by contacting us or through your account settings. Cancellation takes effect at the end of your current billing period.",
      },
      {
        subtitle: "Termination by Clavo AI",
        body: "We reserve the right to suspend or terminate your access to the Service, with or without notice, if we reasonably believe you have:",
        list: [
          "Violated any provision of these Terms",
          "Engaged in fraudulent, abusive, or illegal activity",
          "Posed a risk to the security or integrity of the platform or other users",
        ],
      },
      {
        body: "Upon termination, your right to use the Service ceases immediately. Provisions of these Terms that by their nature should survive termination — including limitation of liability, data retention, and dispute resolution — will continue to apply.",
      },
    ],
  },
  {
    id: "changes",
    title: "9. Changes to Terms",
    content: [
      {
        body: "We may update these Terms from time to time to reflect changes in our Service, applicable law, or business practices. When we make material changes, we will notify you by email or by posting a prominent notice within the platform at least 14 days before the changes take effect.",
      },
      {
        body: "Your continued use of the Service after the effective date of any updated Terms constitutes your acceptance of those changes. If you do not agree to the updated Terms, you must stop using the Service before the changes take effect.",
      },
    ],
  },
  {
    id: "contact",
    title: "10. Contact Information",
    content: [
      {
        body: "If you have any questions about these Terms or need to get in touch with our team, please contact us:",
        contact: {
          name: "Clavo AI — Legal & Support",
          email: "legal@clavoai.com",
          note: "We aim to respond to all legal enquiries within 5 business days.",
        },
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <div className="relative min-h-screen" style={{ background: "#00060f" }}>

      <BeachScrollBackground />

      {/* Top border */}
      <span aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-10 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(217,119,6,0.40) 35%, rgba(139,92,246,0.35) 65%, transparent)" }} />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-32 pt-28">

        {/* Header */}
        <div className="mb-14 border-b border-white/[0.07] pb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-400/55">Legal</p>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-sm text-white/35">Last updated: {LAST_UPDATED}</p>
          <p className="mt-5 text-base leading-relaxed text-white/50">
            These Terms govern your access to and use of Clavo AI. We have written them to be clear
            and straightforward. Please read them carefully — by using Clavo AI, you agree to be
            bound by these Terms.
          </p>
        </div>

        {/* Table of contents */}
        <nav aria-label="Table of contents" className="mb-14 rounded-2xl border border-white/[0.06] p-6"
          style={{ background: "rgba(255,255,255,0.02)" }}>
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/28">Contents</p>
          <ol className="flex flex-col gap-2">
            {SECTIONS.map(({ id, title }) => (
              <li key={id}>
                <a href={`#${id}`}
                  className="text-sm text-white/45 transition-colors duration-150 hover:text-amber-300/80">
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {SECTIONS.map(({ id, title, content }) => (
            <section key={id} id={id} aria-labelledby={`heading-${id}`}>
              <h2 id={`heading-${id}`} className="mb-5 text-xl font-bold text-white sm:text-2xl">
                {title}
              </h2>
              <div className="flex flex-col gap-4">
                {content.map((block, i) => (
                  <div key={i}>
                    {"subtitle" in block && block.subtitle && (
                      <p className="mb-1.5 text-sm font-semibold text-amber-300/75">{block.subtitle}</p>
                    )}
                    {"body" in block && block.body && (
                      <p className="text-base leading-relaxed text-white/55">{block.body}</p>
                    )}
                    {"privacyLink" in block && block.privacyLink && (
                      <p className="mt-2 text-sm text-white/40">
                        Read our full{" "}
                        <Link href="/privacy"
                          className="text-amber-300/80 underline underline-offset-2 transition-colors hover:text-amber-300">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    )}
                    {"list" in block && block.list && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {block.list.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/50" aria-hidden="true" />
                            <span className="text-base leading-relaxed text-white/55">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {"contact" in block && block.contact && (
                      <div className="mt-4 rounded-xl border border-white/[0.07] p-5"
                        style={{ background: "rgba(255,255,255,0.025)" }}>
                        <p className="text-sm font-semibold text-white/70">{block.contact.name}</p>
                        <a href={`mailto:${block.contact.email}`}
                          className="mt-1 block text-sm text-amber-300/80 transition-colors hover:text-amber-300">
                          {block.contact.email}
                        </a>
                        <p className="mt-3 text-sm text-white/35">{block.contact.note}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 border-t border-white/[0.06] pt-8 text-center">
          <p className="text-sm text-white/25">
            These Terms apply to all Clavo AI products and services. &nbsp;·&nbsp;{" "}
            <Link href="/privacy" className="text-white/35 transition-colors hover:text-white/55">
              Privacy Policy
            </Link>
            &nbsp;·&nbsp;{" "}
            <Link href="/" className="text-white/35 transition-colors hover:text-white/55">
              Back to home
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
