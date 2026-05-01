"use client";

import { useState, useEffect } from "react";

// ─── Deterministic pseudo-random (no Math.random, SSR-safe) ──────────────────

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─── Precomputed particle data ────────────────────────────────────────────────

const STARS = Array.from({ length: 120 }, (_, i) => ({
  x:          sr(i * 7)  * 100,
  y:          sr(i * 13) * 55,           // upper 55% = sky only
  size:       0.8 + sr(i * 3)  * 1.8,
  op:         0.4 + sr(i * 17) * 0.6,
  dx:         (sr(i * 19) - 0.5) * 28,  // drift X
  dy:         (sr(i * 23) - 0.5) * 18,  // drift Y
  driftDur:   14 + sr(i * 29) * 22,
  driftDelay: sr(i * 37) * 18,
  warm:       i % 7 === 0,
  cool:       i % 5 === 0,
}));

const MOON_GLINTS = Array.from({ length: 18 }, (_, i) => ({
  x:     38 + sr(i * 23) * 24,
  y:     62 + sr(i * 31) * 20,
  size:  1   + sr(i * 41) * 2.5,
  op:    0.3 + sr(i * 43) * 0.6,
  dur:   1.5 + sr(i * 19) * 2.5,
  delay: sr(i * 37) * 4,
}));

// ─── Component ────────────────────────────────────────────────────────────────

export default function BeachScrollBackground() {
  const [mounted, setMounted]   = useState(false);
  const [sp,      setSp]        = useState(0);   // scroll progress 0 → 1

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setSp(Math.min(window.scrollY / 800, 1));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Derived animation values
  const starsOp      = Math.max(0, 1 - sp * 2.2);
  const moonOp       = Math.max(0, 1 - sp * 2.2);
  const moonTransY   = -sp * 110;
  // Ocean & beach slide up from below viewport as sp increases
  const oceanTransY  = (1 - sp) * 50;   // vh — pushes ocean below viewport at sp=0
  const glintOp      = sp > 0.35 ? Math.min((sp - 0.35) / 0.65, 1) : 0;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* ── CSS keyframes (client only) ── */}
      {mounted && (
        <style>{`
          @keyframes bsb-drift {
            0%   { transform: translate(0, 0);                          opacity: var(--op); }
            25%  { opacity: calc(var(--op) * 0.25); }
            50%  { transform: translate(var(--dx), var(--dy));          opacity: var(--op); }
            75%  { opacity: calc(var(--op) * 0.35); }
            100% { transform: translate(0, 0);                          opacity: var(--op); }
          }
          @keyframes bsb-moon   { 0%,100%{opacity:0.92;filter:blur(0px)} 50%{opacity:1;filter:blur(1px)} }
          @keyframes bsb-glint  { 0%,100%{opacity:var(--gop);transform:scale(1)} 50%{opacity:calc(var(--gop)*0.2);transform:scale(0.7)} }
          @keyframes bsb-wave1  {
            0%   { transform: translateX(0)     translateY(0); }
            25%  { transform: translateX(-30px)  translateY(6px); }
            50%  { transform: translateX(-55px)  translateY(0); }
            75%  { transform: translateX(-28px)  translateY(-5px); }
            100% { transform: translateX(0)     translateY(0); }
          }
          @keyframes bsb-wave2  {
            0%   { transform: translateX(0)    translateY(0); }
            30%  { transform: translateX(28px)  translateY(-7px); }
            60%  { transform: translateX(48px)  translateY(4px); }
            100% { transform: translateX(0)    translateY(0); }
          }
          @keyframes bsb-wave3  {
            0%   { transform: translateX(0)     translateY(0); }
            40%  { transform: translateX(-18px)  translateY(5px); }
            70%  { transform: translateX(-32px)  translateY(-3px); }
            100% { transform: translateX(0)     translateY(0); }
          }
        `}</style>
      )}

      {/* ── Sky gradient (always rendered — SSR safe) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #00060f 0%, #000d1a 30%, #001428 55%, #002030 70%, #001a22 85%, #001018 100%)",
        }}
      />

      {/* ── Milky way (always rendered) ── */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 70% 20%, rgba(140,160,255,0.18) 0%, transparent 100%)",
        }}
      />

      {/* ── Stars (client only — fade with scroll) ── */}
      {mounted &&
        STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={
              {
                left:               `${s.x}%`,
                top:                `${s.y}%`,
                width:              s.size,
                height:             s.size,
                background:         s.warm
                  ? "rgba(255,240,200,1)"
                  : s.cool
                  ? "rgba(200,220,255,1)"
                  : "rgba(255,255,255,1)",
                "--op":             s.op * starsOp,
                "--dx":             `${s.dx}px`,
                "--dy":             `${s.dy}px`,
                opacity:            s.op * starsOp,
                animation:          `bsb-drift ${s.driftDur}s ease-in-out infinite`,
                animationDelay:     `${s.driftDelay}s`,
              } as React.CSSProperties
            }
          />
        ))}

      {/* ── Moon (client only — floats up + fades with scroll) ── */}
      {mounted && (
        <div
          className="absolute"
          style={{
            right:     "18%",
            top:       "7%",
            opacity:   moonOp,
            transform: `translateY(${moonTransY}px)`,
          }}
        >
          {/* Body */}
          <div
            className="relative rounded-full"
            style={{
              width:      56,
              height:     56,
              background:
                "radial-gradient(circle at 38% 38%, #fffbe8 0%, #fde68a 40%, #7c3aed 100%)",
              boxShadow:
                "0 0 40px rgba(253,230,138,0.55), 0 0 80px rgba(253,230,138,0.20), 0 0 160px rgba(139,92,246,0.12)",
              animation: "bsb-moon 6s ease-in-out infinite",
            }}
          />
          {/* Outer halo */}
          <div
            className="absolute rounded-full"
            style={{
              width:     136,
              height:    136,
              top:       "50%",
              left:      "50%",
              transform: "translate(-50%,-50%)",
              background:
                "radial-gradient(circle, rgba(253,230,138,0.10) 0%, transparent 70%)",
            }}
          />
          {/* Water reflection column */}
          <div
            className="absolute"
            style={{
              top:        "100%",
              left:       "50%",
              width:      80,
              bottom:     0,
              marginLeft: -12,
              marginTop:  8,
              background:
                "linear-gradient(to bottom, rgba(253,230,138,0.18) 0%, rgba(253,230,138,0.04) 60%, transparent 100%)",
              filter:  "blur(8px)",
              opacity: glintOp,
            }}
          />
        </div>
      )}

      {/* ── Ocean — slides up from below viewport as you scroll ── */}
      <div
        className="absolute inset-x-0"
        style={{
          top:       "56%",
          bottom:    0,
          transform: `translateY(${oceanTransY}vh)`,
        }}
      >
        {/* Deep water base (always rendered) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #001e30 0%, #000d1a 40%, #000810 100%)",
          }}
        />

        {/* Wave layers (client only) */}
        {mounted && (
          <>
            <svg
              className="absolute inset-x-0 top-0 w-[200%]"
              viewBox="0 0 2880 100"
              preserveAspectRatio="none"
              style={{ height: 100, animation: "bsb-wave1 11s ease-in-out infinite" }}
            >
              <path
                d="M0,50 C240,12 480,88 720,50 C960,12 1200,88 1440,50 C1680,12 1920,88 2160,50 C2400,12 2640,88 2880,50 L2880,100 L0,100 Z"
                fill="rgba(0,40,70,0.72)"
              />
            </svg>
            <svg
              className="absolute top-0 w-[220%]"
              style={{ left: "-10%", height: 75, animation: "bsb-wave2 8s ease-in-out infinite", animationDelay: "1.2s" }}
              viewBox="0 0 2880 75"
              preserveAspectRatio="none"
            >
              <path
                d="M0,38 C200,6 440,70 680,38 C920,6 1160,70 1400,38 C1640,6 1880,70 2120,38 C2360,6 2600,70 2880,38 L2880,75 L0,75 Z"
                fill="rgba(0,60,100,0.58)"
              />
            </svg>
            <svg
              className="absolute inset-x-0 top-0 w-[200%]"
              viewBox="0 0 2880 55"
              preserveAspectRatio="none"
              style={{ height: 55, animation: "bsb-wave3 6s ease-in-out infinite", animationDelay: "0.6s" }}
            >
              <path
                d="M0,28 C180,5 360,50 540,28 C720,5 900,50 1080,28 C1260,5 1440,50 1620,28 C1800,5 1980,50 2160,28 C2340,5 2520,50 2700,28 C2760,18 2820,38 2880,28 L2880,55 L0,55 Z"
                fill="rgba(180,230,255,0.12)"
              />
            </svg>
          </>
        )}

        {/* Water surface shimmer */}
        <div
          className="absolute inset-x-0 top-0 h-20"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,100,160,0.15) 0%, transparent 100%)",
          }}
        />

        {/* Moon reflection glints on water (client only) */}
        {mounted &&
          MOON_GLINTS.map((g, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={
                {
                  left:           `${g.x}%`,
                  top:            `${g.y - 62}%`,   // remap — glint data uses absolute page %, ocean is at 56%
                  width:          g.size,
                  height:         g.size * 0.4,
                  background:     "rgba(253,230,138,0.9)",
                  "--gop":        g.op * glintOp,
                  opacity:        g.op * glintOp,
                  animation:      `bsb-glint ${g.dur}s ease-in-out infinite`,
                  animationDelay: `${g.delay}s`,
                  borderRadius:   "50%",
                } as React.CSSProperties
              }
            />
          ))}
      </div>

      {/* ── Beach / sand strip (slides with ocean) ── */}
      <div
        className="absolute inset-x-0"
        style={{
          top:       "54%",
          height:    32,
          transform: `translateY(${oceanTransY}vh)`,
        }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(180deg, #1a0e04 0%, #2d1a08 50%, #3d2410 100%)",
          }}
        />
      </div>

      {/* ── Horizon glow (slides with ocean) ── */}
      <div
        className="absolute inset-x-0"
        style={{
          top:       "53%",
          height:    4,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,120,180,0.25) 30%, rgba(253,230,138,0.15) 60%, transparent 100%)",
          filter:    "blur(2px)",
          transform: `translateY(${oceanTransY}vh)`,
          opacity:   sp,
        }}
      />

      {/* ── Beach glow from moon (slides with ocean) ── */}
      <div
        className="absolute inset-x-0"
        style={{
          top:       "50%",
          height:    80,
          background:
            "radial-gradient(ellipse 50% 100% at 82% 0%, rgba(253,230,138,0.06) 0%, transparent 100%)",
          transform: `translateY(${oceanTransY}vh)`,
        }}
      />

      {/* ── Vignette (always rendered) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* ── Dark overlay — keeps text readable ── */}
      <div className="absolute inset-0" style={{ background: "rgba(0,5,12,0.45)" }} />
    </div>
  );
}
