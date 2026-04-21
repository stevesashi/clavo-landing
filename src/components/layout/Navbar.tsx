"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Pricing",   href: "/pricing"   },
  { label: "About Us",  href: "/about"     },
  { label: "Contact",   href: "/contact"   },
  { label: "Privacy",   href: "/privacy"   },
  { label: "Terms",     href: "/terms"     },
];

export default function Navbar() {
  const shouldReduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header
      role="banner"
      aria-label="Clavo AI site navigation"
      className="fixed inset-x-0 top-0 z-[100] px-4 py-3"
    >
      {/* Glass pill */}
      <motion.div
        className="relative z-50 mx-auto flex h-20 max-w-6xl items-center justify-between rounded-2xl px-5"
        animate={{
          background: scrolled ? "rgba(5, 8, 10, 0.82)" : "rgba(5, 8, 10, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: scrolled
            ? "0 0 0 1px rgba(255,255,255,0.07) inset, 0 8px 32px rgba(0,0,0,0.5)"
            : "0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Clavo AI — go to homepage"
          className="relative inline-flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-visible focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(217,119,6,0.35) 0%, transparent 70%)", filter: "blur(6px)" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/clavo-icon.png"
            alt="Clavo AI"
            className="relative z-10 block h-[60px] w-[60px] object-contain scale-[0.86]"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/50 transition-colors duration-150 hover:bg-white/[0.05] hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/book-demo"
            aria-label="Book a live demo of Clavo AI"
            className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            style={{
              background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
              boxShadow: "0 0 16px rgba(217,119,6,0.40)",
              touchAction: "manipulation",
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-xl"
              style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.18) 0%, transparent 60%)" }}
            />
            <span className="relative">Book Demo</span>
            <ArrowRight size={14} aria-hidden="true" className="relative transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          style={{ touchAction: "manipulation" }}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.div>

      {/* Mobile menu */}
      <motion.div
        id="mobile-menu"
        aria-label="Mobile navigation"
        role="navigation"
        className="relative z-50 mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl md:hidden"
        style={{
          background: "rgba(5, 8, 10, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
        initial={false}
        animate={
          shouldReduce
            ? { opacity: menuOpen ? 1 : 0, display: menuOpen ? "block" : "none" }
            : { height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }
        }
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-1 p-3">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/book-demo"
            onClick={() => setMenuOpen(false)}
            className="mt-1 rounded-xl px-4 py-3 text-center text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            style={{
              background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
              boxShadow: "0 0 16px rgba(217,119,6,0.35)",
            }}
          >
            Book Demo
          </Link>
        </div>
      </motion.div>
    </header>
  );
}
