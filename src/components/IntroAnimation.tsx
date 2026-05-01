"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"black" | "sweep" | "done">("black");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("sweep"), 300);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#000",
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* The light sweep — a bright golden band that sweeps top to bottom */}
          {phase === "sweep" && (
            <motion.div
              initial={{ top: "-30%", opacity: 0 }}
              animate={{ top: "120%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: "absolute",
                left: "-20%",
                right: "-20%",
                height: "35%",
                background: `
                  radial-gradient(ellipse 80% 50% at 50% 50%,
                    rgba(255,220,100,0.25) 0%,
                    rgba(167,139,250,0.15) 30%,
                    rgba(109,40,217,0.08) 60%,
                    transparent 100%
                  )
                `,
                filter: "blur(8px)",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Thin bright light line at the leading edge of the sweep */}
          {phase === "sweep" && (
            <motion.div
              initial={{ top: "-2%" }}
              animate={{ top: "102%" }}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(to right, transparent, rgba(255,220,100,0.8), rgba(255,255,255,0.9), rgba(255,220,100,0.8), transparent)",
                boxShadow: "0 0 30px 8px rgba(167,139,250,0.4), 0 0 60px 20px rgba(167,139,250,0.15)",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Radial glow that follows the sweep line */}
          {phase === "sweep" && (
            <motion.div
              initial={{ top: "-20%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
                height: "40%",
                background: "radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, transparent 70%)",
                filter: "blur(20px)",
                pointerEvents: "none",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
