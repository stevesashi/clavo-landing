"use client";

import Link from "next/link";
import BeachScrollBackground from "@/components/cinematic/BeachScrollBackground";

const LAST_UPDATED = "April 18, 2026";

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Information you provide directly",
        body: "When you book a demo, request early access, or contact us, we collect your full name, work email address, company name, team size, and hiring volume. You may also voluntarily share details about your hiring challenges or current recruitment setup.",
      },
      {
        subtitle: "Usage and analytics data",
        body: "We automatically collect information about how you interact with our website, including pages visited, time spent, referral sources, browser type, and device information. This data is collected in aggregate and is used solely to improve our product and user experience.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: [
      {
        body: "We use the information we collect for the following purposes:",
        list: [
          "To schedule and deliver personalised product demos",
          "To onboard early access customers and send relevant updates",
          "To communicate about product features, releases, and offers you have opted into",
          "To analyse usage patterns and continuously improve Clavo AI",
          "To respond to support requests and enquiries",
          "To comply with applicable legal obligations",
        ],
      },
      {
        body: "We will never use your information to send unsolicited marketing communications unrelated to Clavo AI. You may opt out of communications at any time.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "3. Data Sharing",
    content: [
      {
        body: "Clavo AI does not sell, rent, or trade your personal data to third parties — ever.",
      },
      {
        subtitle: "Essential service providers",
        body: "We work with a small number of trusted third-party providers to operate our platform, including cloud hosting, email delivery, and website analytics. These providers are contractually obligated to handle your data only as instructed by us and in accordance with applicable privacy laws.",
      },
      {
        subtitle: "Legal requirements",
        body: "We may disclose your information if required to do so by law or in response to valid legal requests from public authorities.",
      },
    ],
  },
  {
    id: "data-security",
    title: "4. Data Security",
    content: [
      {
        body: "We apply industry-standard security measures to protect your personal data, including encrypted data transmission (TLS/HTTPS), access controls, and secure cloud infrastructure. While we take these obligations seriously, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "5. Data Retention",
    content: [
      {
        body: "We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. If you request deletion of your data, we will action this within 30 days, except where retention is required for legal or legitimate business reasons.",
      },
    ],
  },
  {
    id: "user-rights",
    title: "6. Your Rights",
    content: [
      {
        body: "Depending on your location, you may have the following rights regarding your personal data:",
        list: [
          "Access — request a copy of the data we hold about you",
          "Correction — request that inaccurate data be updated",
          "Deletion — request that your data be deleted",
          "Objection — object to how we process your data",
          "Portability — request your data in a structured, machine-readable format",
        ],
      },
      {
        body: "To exercise any of these rights, please contact us at privacy@clavoai.com. We will respond within 30 days.",
      },
    ],
  },
  {
    id: "cookies",
    title: "7. Cookies & Tracking",
    content: [
      {
        body: "Clavo AI uses cookies and similar tracking technologies to improve your browsing experience and understand how our website is used. These include:",
        list: [
          "Essential cookies — required for the website to function correctly",
          "Analytics cookies — help us understand traffic patterns and page performance",
        ],
      },
      {
        body: "You can control or disable cookies through your browser settings. Disabling cookies may affect certain features of the website.",
      },
    ],
  },
  {
    id: "contact",
    title: "8. Contact Us",
    content: [
      {
        body: "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact us:",
        contact: {
          name: "Clavo AI — Privacy Team",
          email: "privacy@clavoai.com",
          note: "We aim to respond to all privacy-related enquiries within 5 business days.",
        },
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen" style={{ background: "#00060f" }}>

      <BeachScrollBackground />

      {/* Top border */}
      <span aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-10 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.40) 35%, rgba(139,92,246,0.35) 65%, transparent)" }} />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-32 pt-28">

        {/* Header */}
        <div className="mb-14 border-b border-white/[0.07] pb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400/55">Legal</p>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-white/35">Last updated: {LAST_UPDATED}</p>
          <p className="mt-5 text-base leading-relaxed text-white/50">
            Clavo AI is committed to protecting your privacy. This policy explains what data we collect,
            how we use it, and the rights you have over your information. We keep this straightforward —
            no legalese where it can be avoided.
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
                  className="text-sm text-white/45 transition-colors duration-150 hover:text-purple-300/80">
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
              <h2 id={`heading-${id}`}
                className="mb-5 text-xl font-bold text-white sm:text-2xl">
                {title}
              </h2>
              <div className="flex flex-col gap-4">
                {content.map((block, i) => (
                  <div key={i}>
                    {"subtitle" in block && block.subtitle && (
                      <p className="mb-1.5 text-sm font-semibold text-purple-300/75">{block.subtitle}</p>
                    )}
                    {"body" in block && block.body && (
                      <p className="text-base leading-relaxed text-white/55">{block.body}</p>
                    )}
                    {"list" in block && block.list && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {block.list.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/50" aria-hidden="true" />
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
                          className="mt-1 block text-sm text-purple-300/80 hover:text-purple-300 transition-colors">
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
            This policy applies to all Clavo AI products and services. &nbsp;·&nbsp;{" "}
            <Link href="/" className="text-white/35 hover:text-white/55 transition-colors">
              Back to home
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
