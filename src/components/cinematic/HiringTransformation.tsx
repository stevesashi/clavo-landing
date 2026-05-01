"use client";

import { motion } from "framer-motion";
import { Mail, AlertTriangle, FileSpreadsheet } from "lucide-react";

// ─── Static keyframes ─────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes ht-shake {
    0%,100% { transform: rotate(-1.5deg) translateY(0px); }
    50%      { transform: rotate(-1.5deg) translateY(-6px); }
    91%      { transform: rotate(-1.5deg) translate(-2px, 0px); }
    93%      { transform: rotate(-1.5deg) translate(-2px, 1px); }
    95%      { transform: rotate(-1.5deg) translate(2px, -1px); }
    97%      { transform: rotate(-1.5deg) translate(-1px, -2px); }
  }
  @keyframes ht-glitch {
    0%,86%,100% { opacity:0; }
    88%          { opacity:0.65; }
    90%          { opacity:0.18; }
    92%          { opacity:0.50; }
    94%          { opacity:0; }
  }
  @keyframes ht-float-b {
    0%,100% { transform: rotate(1.5deg) translateY(0px); }
    50%      { transform: rotate(1.5deg) translateY(-5px); }
  }
  @keyframes ht-float-c {
    0%,100% { transform: rotate(2.5deg) translateY(0px); }
    50%      { transform: rotate(2.5deg) translateY(-4px); }
  }
  @keyframes ht-float-d {
    0%,100% { transform: rotate(-0.8deg) translateY(0px); }
    50%      { transform: rotate(-0.8deg) translateY(-5px); }
  }
  @keyframes ht-glow-pulse {
    0%,100% { opacity: 0; }
    50%      { opacity: 1; }
  }
  @keyframes ht-divider-glow {
    0%,100% { opacity: 0.50; }
    50%      { opacity: 1; }
  }
  @keyframes ht-signal {
    0%   { opacity: 0; transform: translateX(-18px) scale(0.4); }
    18%  { opacity: 1; }
    82%  { opacity: 1; }
    100% { opacity: 0; transform: translateX(18px) scale(0.4); }
  }
  @keyframes ht-blink {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.15; }
  }
  @keyframes ht-msg-in {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const VIEWPORT = { once: true, amount: 0.2 } as const;
const SPRING   = { type: "spring", stiffness: 180, damping: 26 } as const;

// Signal particles that cross the divider seam left → right
const SIGNALS = [
  { y: 14, dur: 2.1, delay: 0.0, color: "rgba(168,85,247,0.95)" },
  { y: 29, dur: 1.8, delay: 0.8, color: "rgba(192,132,252,0.90)"  },
  { y: 47, dur: 2.4, delay: 1.6, color: "rgba(168,85,247,0.80)"  },
  { y: 63, dur: 2.0, delay: 0.4, color: "rgba(103,232,249,0.85)" },
  { y: 79, dur: 1.9, delay: 2.2, color: "rgba(192,132,252,0.85)"  },
  { y: 91, dur: 2.3, delay: 1.1, color: "rgba(168,85,247,0.70)"  },
];

// Inner pentagon ring — animateMotion path
// Nodes: Screening(150,80) Interview(217,128) Scoring(191,207) Notes(109,207) Ranking(83,128)
const RING = "M150,80 Q197,72 217,128 Q225,175 191,207 Q150,222 109,207 Q75,175 83,128 Q75,72 150,80";

// Outer square ring — animateMotion for secondary data dot
// Nodes: AI Notes(231,69) 360 Report(231,231) Comp Map(69,231) Insights(69,69)
const OUTER_RING = "M231,69 Q258,150 231,231 Q150,258 69,231 Q42,150 69,69 Q150,42 231,69";

// Inner segment paths for flowing dash animation
const SEGS = [
  "M150,80 Q197,72 217,128",
  "M217,128 Q225,175 191,207",
  "M191,207 Q150,222 109,207",
  "M109,207 Q75,175 83,128",
  "M83,128 Q75,72 150,80",
];

// Outer segment paths for flowing dash animation
const OUTER_SEGS = [
  "M231,69 Q258,150 231,231",
  "M231,231 Q150,258 69,231",
  "M69,231 Q42,150 69,69",
  "M69,69 Q150,42 231,69",
];

// Spoke connections outer → inner (x1,y1 = outer node, x2,y2 = inner node)
const SPOKES: [number, number, number, number][] = [
  [231,  69, 150,  80],  // AI Notes    → Screening
  [231,  69, 217, 128],  // AI Notes    → Interview
  [231, 231, 217, 128],  // 360 Report  → Interview
  [231, 231, 191, 207],  // 360 Report  → Scoring
  [ 69, 231, 109, 207],  // Comp Map    → Notes
  [ 69, 231,  83, 128],  // Comp Map    → Ranking
  [ 69,  69,  83, 128],  // Insights    → Ranking
  [ 69,  69, 150,  80],  // Insights    → Screening
];

const FEED = [
  { text: "CV parsed · Sarah Chen",         color: "rgba(52,211,153,0.9)",  fresh: true  },
  { text: "Interview scheduled · 2:00 PM",  color: "rgba(139,92,246,0.8)",  fresh: false },
  { text: "360 report generated",           color: "rgba(192,132,252,0.8)",  fresh: false },
  { text: "Candidate shortlisted · 94%",    color: "rgba(52,211,153,0.7)",  fresh: false },
];

// ─── Left panel: chaos ────────────────────────────────────────────────────────
// Card positions are percentages of the LEFT PANEL width (50% of total)

function ChaosPanel() {
  return (
    <>
      {/* Glitch scan-line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 h-px"
        style={{
          top: "40%",
          background: "rgba(239,68,68,0.65)",
          animation: "ht-glitch 5s ease-in-out infinite",
        }}
      />

      {/* Email inbox */}
      <div
        className="absolute rounded-xl p-4"
        style={{
          top: "7%", left: "7%", width: "82%",
          background: "rgba(239,68,68,0.13)",
          border: "1px solid rgba(239,68,68,0.28)",
          animation: "ht-shake 7s ease-in-out infinite",
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl"
          style={{ background: "rgba(239,68,68,0.09)", animation: "ht-glow-pulse 4s ease-in-out infinite" }} />
        <span aria-hidden="true"
          className="absolute -top-3 right-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
          style={{ background: "rgba(239,68,68,0.88)", color: "rgba(255,210,210,0.95)", border: "1px solid rgba(239,68,68,0.45)" }}>
          Missed candidate
        </span>
        <div className="relative mb-2 flex items-center gap-2">
          <Mail size={13} className="shrink-0 text-red-400/80" />
          <span className="text-xs font-semibold text-red-300/80">Gmail · Recruiting</span>
          <span className="ml-auto rounded-full px-2 py-px text-[11px] font-bold text-red-400"
            style={{ background: "rgba(239,68,68,0.22)" }}>48</span>
        </div>
        {["Re: Follow up??", "Application — Sarah C.", "URGENT: References"].map((s) => (
          <div key={s} className="relative truncate border-b border-white/[0.04] py-1 text-[11px] text-white/35">{s}</div>
        ))}
      </div>

      {/* Spreadsheet */}
      <div
        className="absolute rounded-xl p-4"
        style={{
          top: "33%", left: "5%", width: "84%",
          background: "rgba(234,88,12,0.12)",
          border: "1px solid rgba(234,88,12,0.25)",
          animation: "ht-float-b 8s ease-in-out infinite",
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl"
          style={{ background: "rgba(234,88,12,0.08)", animation: "ht-glow-pulse 5s ease-in-out infinite", animationDelay: "1.2s" }} />
        <span aria-hidden="true"
          className="absolute -top-3 right-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
          style={{ background: "rgba(234,88,12,0.85)", color: "rgba(255,220,200,0.95)", border: "1px solid rgba(234,88,12,0.40)" }}>
          Delayed response
        </span>
        <div className="relative mb-2 flex items-center gap-2">
          <FileSpreadsheet size={13} className="shrink-0 text-orange-400/80" />
          <span className="truncate text-[11px] font-medium text-orange-300/75">Candidates_FINAL_v3.xlsx</span>
        </div>
        <div className="relative grid grid-cols-3 gap-px text-[10px] text-white/28">
          {["Name","Stage","Score","Sarah C.","??","—","Marcus J.","Pending","—","James T.","Phone","72?"].map((c, i) => (
            <div key={i} className="rounded px-1.5 py-1" style={{ background: "rgba(255,255,255,0.03)" }}>{c}</div>
          ))}
        </div>
      </div>

      {/* Sticky note */}
      <div
        className="absolute rounded-lg p-3"
        style={{
          top: "62%", left: "7%", width: "72%",
          background: "rgba(161,98,7,0.15)",
          border: "1px solid rgba(202,138,4,0.26)",
          animation: "ht-float-c 9s ease-in-out infinite",
        }}
      >
        <p className="font-mono text-[11px] leading-relaxed text-yellow-300/60">
          "Call Sarah back??<br />Check refs first!<br />Or was it Thursday?"
        </p>
      </div>

      {/* ATS confusion */}
      <div
        className="absolute rounded-xl p-4"
        style={{
          bottom: "6%", left: "5%", width: "82%",
          background: "rgba(239,68,68,0.11)",
          border: "1px solid rgba(239,68,68,0.22)",
          animation: "ht-float-d 7.5s ease-in-out infinite",
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl"
          style={{ background: "rgba(239,68,68,0.08)", animation: "ht-glow-pulse 4.5s ease-in-out infinite", animationDelay: "2.3s" }} />
        <span aria-hidden="true"
          className="absolute -top-3 right-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
          style={{ background: "rgba(239,68,68,0.80)", color: "rgba(255,210,210,0.95)", border: "1px solid rgba(239,68,68,0.38)" }}>
          Multiple tools
        </span>
        <div className="relative mb-2 flex items-center gap-1.5">
          <AlertTriangle size={12} className="shrink-0 text-red-400/75" />
          <span className="text-[11px] font-semibold text-red-300/70">3 ATS — not in sync</span>
        </div>
        <div className="relative flex flex-wrap gap-1.5">
          {["Greenhouse", "Workday", "Taleo"].map((t) => (
            <span key={t} className="rounded px-2 py-0.5 text-[10px]"
              style={{ background: "rgba(239,68,68,0.10)", color: "rgba(252,165,165,0.55)", border: "1px solid rgba(239,68,68,0.14)" }}>
              {t}
            </span>
          ))}
        </div>
        <p className="relative mt-1.5 text-[10px] text-red-300/35">2 duplicate candidates found</p>
      </div>
    </>
  );
}

// ─── Right panel: live AI system ──────────────────────────────────────────────

function LiveSystemPanel() {
  return (
    <div className="absolute inset-0 flex flex-col py-4 pl-4 pr-5">

      {/* Live indicator */}
      <div className="mb-1 flex items-center gap-2">
        <div aria-hidden="true" className="h-2 w-2 rounded-full"
          style={{ background: "rgba(52,211,153,0.9)", animation: "ht-blink 1.4s ease-in-out infinite" }} />
        <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300/55">
          Clavo AI · Live Processing
        </span>
      </div>

      {/* ── Node graph — fills most of the panel ── */}
      <div className="relative min-h-0 flex-1">
        <svg viewBox="0 0 300 300" width="100%" height="100%"
          aria-hidden="true" style={{ overflow: "visible" }}>

          {/* ── Depth layers (back to front) ── */}

          {/* Outer guide circle (very faint) */}
          <circle cx="150" cy="150" r="108" fill="none"
            stroke="rgba(139,92,246,0.05)" strokeWidth="1" />

          {/* Inner guide circle */}
          <circle cx="150" cy="150" r="72" fill="none"
            stroke="rgba(139,92,246,0.05)" strokeWidth="1" />

          {/* Spoke connections: outer → inner (dimmest layer) */}
          {SPOKES.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(139,92,246,0.10)" strokeWidth="1"
              strokeDasharray="3 4">
              <animate attributeName="strokeDashoffset"
                from="0" to="-7" dur="1.4s" repeatCount="indefinite"
                begin={`${i * 0.18}s`} />
            </line>
          ))}

          {/* Outer ring segments with flowing dashes */}
          {OUTER_SEGS.map((d, i) => (
            <path key={i} d={d} fill="none"
              stroke="rgba(139,92,246,0.18)" strokeWidth="1.2"
              strokeDasharray="4 4">
              <animate attributeName="strokeDashoffset"
                from="0" to="-8" dur="1.1s" repeatCount="indefinite"
                begin={`${i * 0.28}s`} />
            </path>
          ))}

          {/* Inner ring segments with flowing dashes (brighter) */}
          {SEGS.map((d, i) => (
            <path key={i} d={d} fill="none"
              stroke="rgba(139,92,246,0.35)" strokeWidth="1.8"
              strokeDasharray="5 3">
              <animate attributeName="strokeDashoffset"
                from="0" to="-8" dur="0.5s" repeatCount="indefinite"
                begin={`${i * 0.1}s`} />
            </path>
          ))}

          {/* ── Central core: Clavo AI Engine ── */}
          {/* Outer glow ring */}
          <circle cx="150" cy="150" r="26" fill="none" stroke="rgba(168,85,247,0.18)">
            <animate attributeName="r" values="26;36;26" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.18;0;0.18" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Mid glow ring */}
          <circle cx="150" cy="150" r="20" fill="none" stroke="rgba(168,85,247,0.22)">
            <animate attributeName="r" values="20;28;20" dur="3s" repeatCount="indefinite" begin="-0.9s" />
            <animate attributeName="opacity" values="0.22;0;0.22" dur="3s" repeatCount="indefinite" begin="-0.9s" />
          </circle>
          {/* Core body */}
          <circle cx="150" cy="150" r="20" fill="rgba(88,28,220,0.22)"
            stroke="rgba(168,85,247,0.55)" strokeWidth="1.5">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="2.5s" repeatCount="indefinite" />
          </circle>
          {/* Core inner fill */}
          <circle cx="150" cy="150" r="13" fill="rgba(139,92,246,0.35)"
            stroke="rgba(192,132,252,0.45)" strokeWidth="1" />
          {/* Core label */}
          <text x="150" y="147" textAnchor="middle" fontSize={8}
            fill="rgba(216,180,254,0.95)" fontFamily="monospace" fontWeight="bold">AI</text>
          <text x="150" y="156" textAnchor="middle" fontSize={5.5}
            fill="rgba(216,180,254,0.70)" fontFamily="monospace">CORE</text>
          {/* "Clavo AI Engine" label below core */}
          <text x="150" y="178" textAnchor="middle" fontSize={6}
            fill="rgba(168,85,247,0.42)" fontFamily="monospace">CLAVO AI ENGINE</text>

          {/* ── Animated candidate dots ── */}
          {/* Inner ring — dot 1 (purple, primary) */}
          <circle r="3.5" fill="rgba(168,85,247,0.92)">
            <animateMotion dur="9s" repeatCount="indefinite" path={RING} />
          </circle>
          {/* Inner ring — dot 2 (purple, trailing) */}
          <circle r="2.5" fill="rgba(168,85,247,0.50)">
            <animateMotion dur="9s" repeatCount="indefinite" begin="-4.5s" path={RING} />
          </circle>
          {/* Inner ring — amber priority candidate */}
          <circle r="4" fill="rgba(192,132,252,0.96)">
            <animateMotion dur="13s" repeatCount="indefinite" begin="-3s" path={RING} />
          </circle>
          {/* Outer ring — data packet dot (cyan) */}
          <circle r="2.5" fill="rgba(103,232,249,0.75)">
            <animateMotion dur="18s" repeatCount="indefinite" path={OUTER_RING} />
          </circle>

          {/* ── Inner pentagon nodes ── */}

          {/* Screening — top (150, 80) */}
          <circle cx="150" cy="80" r="14" fill="rgba(139,92,246,0.18)"
            stroke="rgba(139,92,246,0.55)" strokeWidth="1.5">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <text x="150" y="84.5" textAnchor="middle" fontSize={7.5}
            fill="rgba(192,132,252,0.88)" fontFamily="monospace" fontWeight="bold">SCR</text>
          <text x="150" y="62" textAnchor="middle" fontSize={7}
            fill="rgba(168,85,247,0.52)" fontFamily="monospace">SCREENING</text>

          {/* Interview — right (217, 128) */}
          <circle cx="217" cy="128" r="13" fill="rgba(103,232,249,0.14)"
            stroke="rgba(103,232,249,0.48)" strokeWidth="1.5">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="4s" repeatCount="indefinite" begin="-1s" />
          </circle>
          <text x="217" y="132.5" textAnchor="middle" fontSize={7}
            fill="rgba(103,232,249,0.85)" fontFamily="monospace" fontWeight="bold">INT</text>
          <text x="235" y="128" textAnchor="start" fontSize={6.5}
            fill="rgba(103,232,249,0.48)" fontFamily="monospace" dominantBaseline="middle">INTERVIEW</text>

          {/* Notes — bottom left (109, 207) */}
          <circle cx="109" cy="207" r="13" fill="rgba(139,92,246,0.14)"
            stroke="rgba(139,92,246,0.45)" strokeWidth="1.5">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3.8s" repeatCount="indefinite" begin="-2s" />
          </circle>
          <text x="109" y="211.5" textAnchor="middle" fontSize={7}
            fill="rgba(192,132,252,0.82)" fontFamily="monospace" fontWeight="bold">NOT</text>
          <text x="109" y="228" textAnchor="middle" fontSize={6.5}
            fill="rgba(168,85,247,0.45)" fontFamily="monospace">NOTES</text>

          {/* Ranking — left (83, 128) */}
          <circle cx="83" cy="128" r="13" fill="rgba(52,211,153,0.12)"
            stroke="rgba(52,211,153,0.42)" strokeWidth="1.5">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="4.2s" repeatCount="indefinite" begin="-1.5s" />
          </circle>
          <text x="83" y="132.5" textAnchor="middle" fontSize={7}
            fill="rgba(52,211,153,0.85)" fontFamily="monospace" fontWeight="bold">RNK</text>
          <text x="64" y="128" textAnchor="end" fontSize={6.5}
            fill="rgba(52,211,153,0.45)" fontFamily="monospace" dominantBaseline="middle">RANKING</text>

          {/* Scoring — TOP MATCH ★ (191, 207) */}
          <circle cx="191" cy="207" r="26" fill="none" stroke="rgba(192,132,252,0.20)">
            <animate attributeName="r" values="26;38;26" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.20;0;0.20" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="191" cy="207" r="19" fill="none" stroke="rgba(192,132,252,0.16)">
            <animate attributeName="r" values="19;27;19" dur="2.4s" repeatCount="indefinite" begin="-0.7s" />
            <animate attributeName="opacity" values="0.16;0;0.16" dur="2.4s" repeatCount="indefinite" begin="-0.7s" />
          </circle>
          <circle cx="191" cy="207" r="16" fill="rgba(120,80,0,0.35)"
            stroke="rgba(192,132,252,0.75)" strokeWidth="2" />
          <text x="191" y="212" textAnchor="middle" fontSize={12}
            fill="rgba(192,132,252,0.94)" fontFamily="monospace">★</text>
          <text x="191" y="231" textAnchor="middle" fontSize={7}
            fill="rgba(192,132,252,0.65)" fontFamily="monospace">SCORING</text>
          <text x="191" y="239" textAnchor="middle" fontSize={6.5}
            fill="rgba(192,132,252,0.45)" fontFamily="monospace">TOP MATCH</text>

          {/* ── Outer square nodes ── */}

          {/* AI Notes — upper right (231, 69) */}
          <circle cx="231" cy="69" r="11" fill="rgba(103,232,249,0.10)"
            stroke="rgba(103,232,249,0.35)" strokeWidth="1.2">
            <animate attributeName="opacity" values="0.75;1;0.75" dur="5s" repeatCount="indefinite" begin="-0.5s" />
          </circle>
          <text x="231" y="73" textAnchor="middle" fontSize={6.5}
            fill="rgba(103,232,249,0.75)" fontFamily="monospace" fontWeight="bold">AIN</text>
          <text x="246" y="66" textAnchor="start" fontSize={6.5}
            fill="rgba(103,232,249,0.40)" fontFamily="monospace">AI NOTES</text>

          {/* 360 Report — lower right (231, 231) */}
          <circle cx="231" cy="231" r="11" fill="rgba(192,132,252,0.10)"
            stroke="rgba(192,132,252,0.32)" strokeWidth="1.2">
            <animate attributeName="opacity" values="0.75;1;0.75" dur="4.5s" repeatCount="indefinite" begin="-1.8s" />
          </circle>
          <text x="231" y="235" textAnchor="middle" fontSize={6.5}
            fill="rgba(192,132,252,0.72)" fontFamily="monospace" fontWeight="bold">360</text>
          <text x="246" y="234" textAnchor="start" fontSize={6.5}
            fill="rgba(192,132,252,0.38)" fontFamily="monospace">360 REPORT</text>

          {/* Competitor Mapping — lower left (69, 231) */}
          <circle cx="69" cy="231" r="11" fill="rgba(239,68,68,0.08)"
            stroke="rgba(239,68,68,0.28)" strokeWidth="1.2">
            <animate attributeName="opacity" values="0.75;1;0.75" dur="5.5s" repeatCount="indefinite" begin="-3s" />
          </circle>
          <text x="69" y="235" textAnchor="middle" fontSize={6.5}
            fill="rgba(252,165,165,0.70)" fontFamily="monospace" fontWeight="bold">CMP</text>
          <text x="54" y="234" textAnchor="end" fontSize={6.5}
            fill="rgba(252,165,165,0.36)" fontFamily="monospace">COMP MAP</text>

          {/* Insights — upper left (69, 69) */}
          <circle cx="69" cy="69" r="11" fill="rgba(52,211,153,0.09)"
            stroke="rgba(52,211,153,0.30)" strokeWidth="1.2">
            <animate attributeName="opacity" values="0.75;1;0.75" dur="4.8s" repeatCount="indefinite" begin="-2.2s" />
          </circle>
          <text x="69" y="73" textAnchor="middle" fontSize={6.5}
            fill="rgba(52,211,153,0.70)" fontFamily="monospace" fontWeight="bold">INS</text>
          <text x="54" y="66" textAnchor="end" fontSize={6.5}
            fill="rgba(52,211,153,0.36)" fontFamily="monospace">INSIGHTS</text>

        </svg>
      </div>

      {/* Activity feed */}
      <div className="mt-2 space-y-1.5 rounded-xl px-4 py-3"
        style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.12)" }}>
        {FEED.map(({ text, color, fresh }, i) => (
          <div key={text} className="flex items-center gap-2"
            style={{
              opacity: fresh ? 1 : 0.55 - i * 0.08,
              animation: fresh ? "ht-msg-in 0.4s ease-out both" : undefined,
              animationDelay: fresh ? "0.2s" : undefined,
            }}>
            <div aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: color, animation: fresh ? "ht-blink 1.6s ease-in-out infinite" : undefined }} />
            <span className="truncate text-[11px] text-white/65">{text}</span>
            <span className="ml-auto shrink-0 text-[10px] text-white/20">
              {i === 0 ? "now" : i === 1 ? "2m" : i === 2 ? "5m" : "8m"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function HiringTransformation() {
  return (
    <section
      aria-labelledby="transform-heading"
      className="relative overflow-hidden px-4 py-16"
      style={{ background: "linear-gradient(180deg, #04090c 0%, #030608 100%)" }}
    >
      <style>{KEYFRAMES}</style>

      {/* Headline */}
      <motion.div
        className="relative z-10 mb-8 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={SPRING}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/25">
          The Transformation
        </p>
        <h2
          id="transform-heading"
          className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
        >
          Hiring is Broken.{" "}
          <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
            Clavo Fixes It.
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-white/40">
          From scattered tools to one intelligent system.
        </p>
      </motion.div>

      {/* Split visual — fixed 50/50, no scroll-driven resizing */}
      <motion.div
        className="relative mx-auto max-w-[1400px] overflow-hidden rounded-2xl"
        style={{ height: 600 }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ ...SPRING, delay: 0.15 }}
      >
        {/* LEFT panel — fixed 50% */}
        <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #130404 0%, #0c0302 100%)" }}>
          <ChaosPanel />
        </div>

        {/* RIGHT panel — fixed 50% */}
        <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #080318 0%, #0a0422 100%)" }}>
          <LiveSystemPanel />
        </div>

        {/* Divider — fixed at exact center, content-only animation */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 top-0 z-20"
          style={{ left: "50%", width: "0" }}
        >
          {/* Outer glow halo */}
          <div
            className="absolute inset-y-0"
            style={{
              width: "20px",
              left: "-10px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(168,85,247,0.50) 22%, rgba(192,132,252,0.40) 78%, transparent 100%)",
              animation: "ht-divider-glow 2.8s ease-in-out infinite",
            }}
          />
          {/* Core beam */}
          <div
            className="absolute inset-y-0"
            style={{
              width: "1px",
              left: "-0.5px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(168,85,247,0.95) 18%, rgba(192,132,252,0.92) 82%, transparent 100%)",
            }}
          />
          {/* Data signal particles crossing chaos → clarity */}
          {SIGNALS.map(({ y, dur, delay, color }, i) => (
            <div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                top: `${y}%`,
                left: "-3px",
                marginTop: "-3px",
                background: color,
                boxShadow: `0 0 4px ${color}`,
                animation: `ht-signal ${dur}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          ))}
          {/* Diamond handle */}
          <div
            className="absolute h-4 w-4 rotate-45"
            style={{
              top: "50%",
              left: "-8px",
              marginTop: "-8px",
              background: "linear-gradient(135deg, #c084fc, #c084fc)",
              boxShadow:
                "0 0 12px rgba(192,132,252,1), 0 0 24px rgba(192,132,252,0.55), 0 0 8px rgba(192,132,252,0.75)",
            }}
          />
        </div>

        {/* Panel labels */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-5 z-30 flex justify-between px-7"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-red-400/55">
            Before
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-purple-300/55">
            With Clavo
          </span>
        </div>
      </motion.div>

    </section>
  );
}
