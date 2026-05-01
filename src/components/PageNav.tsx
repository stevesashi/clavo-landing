"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Pricing",  href: "/pricing" },
  { label: "About Us", href: "/about"   },
  { label: "Contact",  href: "/contact" },
  { label: "Privacy",  href: "/privacy" },
  { label: "Terms",    href: "/terms"   },
];

export default function PageNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="z-10 xl:top-4 relative">
      <div className="mx-6">
        <div className="flex items-center justify-between pt-4">
          <a href="/" className="inline-flex items-center">
            <img
              src="/logo-purple.png"
              alt="Clavo AI"
              style={{ height: 100, width: "auto", objectFit: "contain" }}
            />
          </a>
          <nav className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/book-demo"
                className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 transition-colors"
              >
                Book Demo
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            </div>
          </nav>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/90">
              {mobileMenuOpen ? (
                <>
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mx-6 pb-4 flex flex-col gap-1">
          {NAV_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/book-demo"
            className="mt-1 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-white/90 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book Demo
          </a>
        </div>
      )}
    </header>
  );
}
