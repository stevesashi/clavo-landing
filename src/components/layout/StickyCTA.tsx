"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, X, CalendarDays } from "lucide-react";

const SCROLL_THRESHOLD = 900;

export default function StickyCTA() {
  const shouldReduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          role="complementary"
          aria-label="Clavo AI call to action"
          className="fixed bottom-3 md:bottom-6 inset-x-0 z-[200] flex justify-center px-3 md:px-4 pointer-events-none"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={shouldReduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 28 }}
        >
          <div
            className="pointer-events-auto relative flex w-full max-w-lg items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl p-2 pl-3 md:p-3 md:pl-4"
            style={{
              background: "rgba(5, 8, 10, 0.88)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
            }}
          >
            {/* Left amber accent line */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl"
              style={{ background: "linear-gradient(180deg, #f59e0b, #d97706)" }}
            />

            {/* Icon */}
            <div
              className="flex h-7 w-7 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-lg md:rounded-xl"
              style={{ background: "rgba(217,119,6,0.15)", color: "#fbbf24" }}
              aria-hidden="true"
            >
              <CalendarDays size={14} className="md:hidden" />
              <CalendarDays size={17} className="hidden md:block" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-semibold text-white/90 leading-tight truncate">
                See Clavo AI live — 15-min personalised demo
              </p>
              <p className="text-[10px] md:text-[11px] text-white/35 mt-0.5 leading-tight truncate">
                GCC & APAC hiring teams · No credit card required
              </p>
            </div>

            {/* Primary CTA */}
            <motion.a
              href="/book-demo"
              aria-label="Book a live demo of Clavo AI"
              className="group inline-flex shrink-0 cursor-pointer items-center gap-1 md:gap-1.5 rounded-lg md:rounded-xl px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              style={{
                background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                boxShadow: "0 0 16px rgba(217,119,6,0.45)",
                touchAction: "manipulation",
              }}
              whileHover={shouldReduce ? {} : { scale: 1.04, boxShadow: "0 0 26px rgba(217,119,6,0.7)" }}
              whileTap={shouldReduce ? {} : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              Book Demo
              <ArrowRight size={13} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </motion.a>

            {/* Secondary ghost CTA — hidden on very small screens */}
            <motion.a
              href="#features"
              aria-label="See Clavo AI in action"
              className="hidden sm:inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 px-3.5 py-2 text-sm font-medium text-white/55 transition-colors hover:border-white/20 hover:text-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              style={{ touchAction: "manipulation" }}
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              See It Live
            </motion.a>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              aria-label="Dismiss this call to action"
              className="ml-0.5 md:ml-1 flex h-6 w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
