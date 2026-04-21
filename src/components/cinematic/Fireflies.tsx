"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface FireflyDef {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  dx: number;
  dy: number;
}

function Firefly({ x, y, size, delay, duration, dx, dy }: FireflyDef) {
  const shouldReduce = useReducedMotion();
  const glow = `rgba(168,255,90,0.8)`;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: glow }}
      animate={
        shouldReduce
          ? { opacity: 0.35 }
          : {
              x: [0, dx * 0.5, dx, 0],
              y: [0, dy * 0.4, -dy * 0.3, 0],
              opacity: [0, 0.8, 0.5, 0],
            }
      }
      transition={
        shouldReduce
          ? {}
          : { duration, delay, repeat: Infinity, ease: "easeInOut" }
      }
    />
  );
}

// Reduced from 42 to 16 — removed boxShadow animation (causes repaints)
const COUNT = 16;

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function Fireflies() {
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = (e: Event) => setPaused((e as CustomEvent<{ open: boolean }>).detail.open);
    window.addEventListener("clavo:report", handler);
    return () => window.removeEventListener("clavo:report", handler);
  }, []);

  const fireflies = useMemo<FireflyDef[]>(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        x: seededRand(i * 7) * 100,
        y: seededRand(i * 13) * 100,
        size: 2 + seededRand(i * 3) * 2.0,
        delay: seededRand(i * 5) * 6,
        duration: 6 + seededRand(i * 11) * 8,
        dx: (seededRand(i * 17) - 0.5) * 50,
        dy: (seededRand(i * 19) - 0.5) * 36,
      })),
    []
  );

  if (!mounted || paused) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      role="presentation"
    >
      {fireflies.map((f) => (
        <Firefly key={f.id} {...f} />
      ))}
    </div>
  );
}
