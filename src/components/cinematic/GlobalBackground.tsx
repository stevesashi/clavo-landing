"use client";

import { useEffect, useState } from "react";

// ─── Deterministic pseudo-random (no hydration mismatch) ──────────────────────
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10_000;
  return x - Math.floor(x);
}

// ─── Reduced to 4 orbs, blur cut to 24px (was 7 orbs at 56px) ────────────────
const ORBS = [
  { x: 10, y: 18, size: 640, r: 103, g: 232, b: 249, op: 0.06, dur: 28, delay: 0 },
  { x: 84, y: 42, size: 560, r: 167, g: 139, b: 250, op: 0.06, dur: 34, delay: 8 },
  { x: 48, y: 72, size: 720, r: 251, g: 191, b: 36,  op: 0.04, dur: 42, delay: 15 },
  { x: 22, y: 58, size: 600, r: 167, g: 139, b: 250, op: 0.05, dur: 36, delay: 12 },
];

// ─── Reduced to 20 particles, no box-shadow animation ────────────────────────
const FLIES = Array.from({ length: 20 }, (_, i) => {
  const gold = sr(i * 31) > 0.84;
  const cyan = !gold && sr(i * 37) > 0.82;
  const size = 1.2 + sr(i * 3) * 2.0;
  const gr   = gold ? "255,210,90" : cyan ? "120,240,255" : "255,255,255";
  return {
    id:    i,
    x:     sr(i * 7)  * 100,
    y:     sr(i * 13) * 100,
    size,
    color: `rgba(${gr},${0.55 + sr(i * 47) * 0.35})`,
    op1:   0.55 + sr(i * 53) * 0.35,
    op2:   0.05 + sr(i * 59) * 0.08,
    dx:    (sr(i * 19) - 0.5) * 56,
    dy:    (sr(i * 23) - 0.5) * 44,
    dur:   8 + sr(i * 5)  * 14,
    delay: sr(i * 17) * 20,
  };
});

// ─── Component ────────────────────────────────────────────────────────────────
export default function GlobalBackground() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  return (
    <>
      <style>{`
        @keyframes gb-orb {
          0%,100% { transform: translate(-50%,-50%) scale(1); }
          40%      { transform: translate(calc(-50% + 45px),calc(-50% - 30px)) scale(1.08); }
          70%      { transform: translate(calc(-50% - 28px),calc(-50% + 42px)) scale(0.93); }
        }
        @keyframes gb-fly {
          0%,100% {
            transform: translate(0,0);
            opacity: var(--op1);
          }
          45% {
            transform: translate(var(--dx),var(--dy));
            opacity: var(--op2);
          }
        }
        @media (max-width: 767px) {
          .gb-fly { display: none; }
          .gb-orb { opacity: 0.35 !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 1, mixBlendMode: "screen" }}
      >
        {/* Drifting glow orbs — blur reduced from 56px to 24px */}
        {ORBS.map((o, i) => (
          <div
            key={i}
            className="gb-orb absolute rounded-full"
            style={{
              left:           `${o.x}%`,
              top:            `${o.y}%`,
              width:          o.size,
              height:         o.size,
              background:     `radial-gradient(circle, rgba(${o.r},${o.g},${o.b},${o.op}) 0%, transparent 68%)`,
              filter:         "blur(24px)",
              willChange:     "transform",
              animation:      `gb-orb ${o.dur}s ease-in-out infinite`,
              animationDelay: `${o.delay}s`,
            }}
          />
        ))}

        {/* Firefly particles — hidden on mobile to reduce visual overload */}
        {ready && FLIES.map((p) => (
          <div
            key={p.id}
            className="gb-fly absolute rounded-full"
            style={{
              left:           `${p.x}%`,
              top:            `${p.y}%`,
              width:          p.size,
              height:         p.size,
              background:     p.color,
              willChange:     "transform, opacity",
              "--op1":        p.op1,
              "--op2":        p.op2,
              "--dx":         `${p.dx}px`,
              "--dy":         `${p.dy}px`,
              animation:      `gb-fly ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
