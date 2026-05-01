"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Upload,
  FileText,
  Zap,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  X,
  TrendingUp,
  TrendingDown,
  Target,
  Sparkles,
  BookOpen,
  ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MatchResult {
  candidateName: string;
  jobTitle: string;
  overallScore: number;
  matchLabel: "Strong Fit" | "Moderate Fit" | "Weak Fit";
  strengths: string[];
  weaknesses: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  summary: string;
  recommendation: string;
  scoreBreakdown: {
    keywordMatch: number;
    experienceMatch: number;
    titleMatch: number;
  };
}

type Stage = "idle" | "loading" | "result" | "error";

const LOADING_STEPS = [
  "Extracting CV text…",
  "Parsing job requirements…",
  "Computing keyword overlap…",
  "Scoring experience & role fit…",
  "Generating AI insights…",
];

const MATCH_COLORS: Record<string, string> = {
  "Strong Fit": "#6ee7b7",
  "Moderate Fit": "#c084fc",
  "Weak Fit": "#f87171",
};

const MATCH_BG: Record<string, string> = {
  "Strong Fit": "rgba(110,231,183,0.10)",
  "Moderate Fit": "rgba(192,132,252,0.10)",
  "Weak Fit": "rgba(248,113,113,0.10)",
};

const MATCH_BORDER: Record<string, string> = {
  "Strong Fit": "rgba(110,231,183,0.25)",
  "Moderate Fit": "rgba(192,132,252,0.25)",
  "Weak Fit": "rgba(248,113,113,0.25)",
};

const SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;
const VIEWPORT = { once: false, amount: 0.2 } as const;

// ─── Animated Score Ring ──────────────────────────────────────────────────────

function ScoreRing({
  score,
  color,
  size = 120,
}: {
  score: number;
  color: string;
  size?: number;
}) {
  const r = (size - 14) / 2;
  const circ = 2 * Math.PI * r;
  const shouldReduce = useReducedMotion();

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        aria-hidden="true"
        className="absolute inset-0 -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={8}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{
            strokeDashoffset: shouldReduce ? 0 : circ - (score / 100) * circ,
          }}
          transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 10px ${color}70)` }}
        />
      </svg>
      <div className="relative flex flex-col items-center">
        <motion.span
          className="text-3xl font-extrabold leading-none"
          style={{
            background: `linear-gradient(135deg, ${color}, white)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 280, damping: 20 }}
          aria-label={`${score} percent match`}
        >
          {score}%
        </motion.span>
      </div>
    </div>
  );
}

// ─── Score Sub-bar ────────────────────────────────────────────────────────────

function SubScoreBar({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 shrink-0 text-right text-[11px] text-white/45">
        {label}
      </span>
      <div className="relative flex-1 h-1.5 rounded-full overflow-hidden bg-white/[0.05]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 6px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
      <span
        className="w-8 shrink-0 text-[11px] font-bold"
        style={{ color }}
      >
        {value}%
      </span>
    </div>
  );
}

// ─── Keyword Chip ─────────────────────────────────────────────────────────────

function KeywordChip({
  label,
  matched,
}: {
  label: string;
  matched: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border"
      style={{
        background: matched ? "rgba(110,231,183,0.08)" : "rgba(248,113,113,0.08)",
        borderColor: matched ? "rgba(110,231,183,0.20)" : "rgba(248,113,113,0.20)",
        color: matched ? "#6ee7b7" : "#f87171",
      }}
    >
      {matched ? "✓" : "✗"} {label}
    </span>
  );
}

// ─── File Drop Zone ───────────────────────────────────────────────────────────

function FileDropZone({
  label,
  accept,
  file,
  onFile,
  hint,
  icon: Icon,
  accentColor,
}: {
  label: string;
  accept: string;
  file: File | null;
  onFile: (f: File) => void;
  hint: string;
  icon: React.ElementType;
  accentColor: string;
}) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduce = useReducedMotion();

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDrag(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) onFile(dropped);
    },
    [onFile]
  );

  return (
    <div
      className="relative flex-1 min-h-[140px] cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-3 p-5 text-center"
      style={{
        borderColor: drag
          ? accentColor + "70"
          : file
          ? accentColor + "40"
          : "rgba(255,255,255,0.10)",
        background: drag
          ? `${accentColor}06`
          : file
          ? `${accentColor}04`
          : "rgba(255,255,255,0.01)",
      }}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        aria-label={label}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      {file ? (
        <>
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `${accentColor}18`, color: accentColor }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <FileText size={20} />
          </motion.div>
          <div>
            <p className="text-sm font-semibold text-white/80 truncate max-w-[160px]">
              {file.name}
            </p>
            <p className="text-xs text-white/30 mt-0.5">
              {(file.size / 1024).toFixed(0)} KB
            </p>
          </div>
        </>
      ) : (
        <>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `${accentColor}12`, color: accentColor }}
          >
            <Icon size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-white/60">
              {hint}
            </p>
            <p className="text-[11px] text-white/25 mt-0.5">PDF, DOCX — 5 MB max</p>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AIScreeningDemo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);
  const shouldReduce = useReducedMotion();

  const canAnalyze = !!cvFile && (jdText.trim().length > 30 || !!jdFile);

  const analyze = async () => {
    if (!cvFile) return;
    setStage("loading");
    setLoadingStep(0);
    setErrorMsg("");

    // Animate loading steps
    const stepDuration = shouldReduce ? 50 : 700;
    for (let i = 1; i < LOADING_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, stepDuration));
      setLoadingStep(i);
    }

    try {
      const fd = new FormData();
      fd.append("cv", cvFile);
      if (jdText.trim()) fd.append("jd_text", jdText.trim());
      if (jdFile) fd.append("jd_file", jdFile);

      const res = await fetch("/api/cv-match", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Analysis failed");
      }

      setResult(data as MatchResult);
      setStage("result");
    } catch (err) {
      setErrorMsg((err as Error).message ?? "Something went wrong");
      setStage("error");
    }
  };

  const reset = () => {
    setStage("idle");
    setCvFile(null);
    setJdFile(null);
    setJdText("");
    setResult(null);
    setErrorMsg("");
    setLoadingStep(0);
  };

  const matchColor = result ? MATCH_COLORS[result.matchLabel] ?? "#6ee7b7" : "#6ee7b7";

  return (
    <>
      <section
        id="cv-screener"
        aria-labelledby="cv-screener-heading"
        className="relative overflow-hidden py-28 px-4"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 90% 80%, rgba(167,139,250,0.09) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 10% 20%, rgba(124,58,237,0.07) 0%, transparent 50%), #020508",
        }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="h-[800px] w-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(52,211,153,0.05) 0%, rgba(124,58,237,0.03) 50%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* ── Header ── */}
          <motion.div
            className="mb-14 text-center"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={SPRING}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-400/60">
              Live CV Screener
            </p>
            <h2
              id="cv-screener-heading"
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Screen Any CV Against{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-purple-300 bg-clip-text text-transparent">
                a Real Job Description
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40">
              Upload a CV and paste or upload a job description. Get a real AI
              match score, keyword analysis, and a hiring recommendation in
              seconds.
            </p>
          </motion.div>

          {/* ── Main Card ── */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/[0.08]"
            style={{
              background: "rgba(6,14,18,0.95)",
              boxShadow:
                "0 0 80px rgba(52,211,153,0.07), 0 8px 64px rgba(0,0,0,0.70)",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ ...SPRING, delay: 0.1 }}
          >
            {/* Top edge glow */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(52,211,153,0.55) 40%, rgba(124,58,237,0.40) 65%, transparent)",
              }}
            />

            <div className="p-6 md:p-10">
              <AnimatePresence mode="wait">
                {/* ════════════════════════════════════
                    IDLE — Input stage
                ════════════════════════════════════ */}
                {stage === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-8"
                  >
                    {/* Two-column inputs */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* ── CV Upload ── */}
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">
                          Step 1 — Upload CV
                        </label>
                        <FileDropZone
                          label="Upload a CV file"
                          accept=".pdf,.doc,.docx"
                          file={cvFile}
                          onFile={setCvFile}
                          hint="Drop CV here, or browse"
                          icon={Upload}
                          accentColor="#6ee7b7"
                        />
                        {cvFile && (
                          <button
                            onClick={() => setCvFile(null)}
                            className="self-start flex items-center gap-1 text-[11px] text-white/30 hover:text-white/55 transition-colors"
                          >
                            <X size={11} /> Remove
                          </button>
                        )}
                      </div>

                      {/* ── JD Input ── */}
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">
                          Step 2 — Job Description
                        </label>

                        <textarea
                          value={jdText}
                          onChange={(e) => setJdText(e.target.value)}
                          placeholder="Paste the job description here…&#10;&#10;e.g. We are looking for a Senior React Developer with 5+ years of experience in TypeScript, Node.js, and AWS…"
                          rows={6}
                          className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm text-white/75 placeholder-white/20 outline-none transition-all duration-200 focus:border-emerald-400/30 focus:bg-white/[0.04]"
                          style={{ fontFamily: "inherit" }}
                        />

                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-px bg-white/[0.05]" />
                          <span className="text-[10px] text-white/20">or upload JD file</span>
                          <div className="flex-1 h-px bg-white/[0.05]" />
                        </div>

                        <FileDropZone
                          label="Upload a JD file (optional)"
                          accept=".pdf,.doc,.docx,.txt"
                          file={jdFile}
                          onFile={setJdFile}
                          hint="Drop JD file (optional)"
                          icon={BookOpen}
                          accentColor="#a78bfa"
                        />
                        {jdFile && (
                          <button
                            onClick={() => setJdFile(null)}
                            className="self-start flex items-center gap-1 text-[11px] text-white/30 hover:text-white/55 transition-colors"
                          >
                            <X size={11} /> Remove
                          </button>
                        )}
                      </div>
                    </div>

                    {/* ── Analyze Button ── */}
                    <div className="flex flex-col items-center gap-3">
                      <motion.button
                        onClick={analyze}
                        disabled={!canAnalyze}
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-10 py-4 text-base font-bold text-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          background: canAnalyze
                            ? "linear-gradient(135deg, #059669 0%, #0e7490 100%)"
                            : "rgba(255,255,255,0.06)",
                          boxShadow: canAnalyze
                            ? "0 0 28px rgba(5,150,105,0.35)"
                            : "none",
                        }}
                        whileHover={
                          canAnalyze && !shouldReduce
                            ? { scale: 1.04, boxShadow: "0 0 40px rgba(5,150,105,0.55)" }
                            : {}
                        }
                        whileTap={canAnalyze && !shouldReduce ? { scale: 0.97 } : {}}
                        transition={{ type: "spring", stiffness: 340, damping: 22 }}
                        aria-label="Analyze CV against job description"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-2xl"
                          style={{
                            background:
                              "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, transparent 55%)",
                          }}
                        />
                        <Zap size={20} aria-hidden="true" className="relative" />
                        <span className="relative">Analyze Match</span>
                        <ChevronRight
                          size={16}
                          aria-hidden="true"
                          className="relative transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </motion.button>

                      {!canAnalyze && (
                        <p className="text-xs text-white/25">
                          {!cvFile
                            ? "Upload a CV to get started"
                            : "Add a job description (paste or upload)"}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ════════════════════════════════════
                    LOADING
                ════════════════════════════════════ */}
                {stage === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-8 py-12"
                    aria-live="polite"
                  >
                    <div
                      className="flex h-20 w-20 animate-spin items-center justify-center rounded-2xl"
                      style={{ background: "rgba(52,211,153,0.12)", color: "#6ee7b7", animationDuration: "1.2s" }}
                      aria-hidden="true"
                    >
                      <Zap size={34} />
                    </div>

                    <div className="text-center">
                      <p className="text-xl font-bold text-white/85">
                        Analyzing…
                      </p>
                      <motion.p
                        key={loadingStep}
                        className="mt-2 text-sm text-white/40"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        aria-live="polite"
                      >
                        {LOADING_STEPS[loadingStep]}
                      </motion.p>
                    </div>

                    {/* Step list */}
                    <div className="flex flex-col gap-2 w-full max-w-xs">
                      {LOADING_STEPS.map((step, i) => (
                        <motion.div
                          key={step}
                          className="flex items-center gap-2.5"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: i <= loadingStep ? 1 : 0.2, x: 0 }}
                          transition={{ delay: i * 0.12, duration: 0.3 }}
                        >
                          {i < loadingStep ? (
                            <CheckCircle2
                              size={14}
                              className="text-emerald-400 shrink-0"
                            />
                          ) : i === loadingStep ? (
                            <div
                              className="h-3.5 w-3.5 rounded-full shrink-0"
                              style={{ background: "#6ee7b7" }}
                            />
                          ) : (
                            <div className="h-3.5 w-3.5 rounded-full border border-white/15 shrink-0" />
                          )}
                          <span
                            className="text-xs"
                            style={{ color: i <= loadingStep ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.2)" }}
                          >
                            {step}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="w-full max-w-xs overflow-hidden rounded-full bg-white/[0.05] h-1">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #6ee7b7, #a78bfa)",
                        }}
                        initial={{ width: "5%" }}
                        animate={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* ════════════════════════════════════
                    ERROR
                ════════════════════════════════════ */}
                {stage === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-6 py-12 text-center"
                    aria-live="assertive"
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{ background: "rgba(248,113,113,0.12)", color: "#f87171" }}
                    >
                      <AlertCircle size={30} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white/80">Analysis Failed</p>
                      <p className="mt-1.5 text-sm text-white/40 max-w-sm">{errorMsg}</p>
                    </div>
                    <button
                      onClick={reset}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/[0.08]"
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}

                {/* ════════════════════════════════════
                    RESULT
                ════════════════════════════════════ */}
                {stage === "result" && result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-7"
                    aria-live="polite"
                  >
                    {/* ── Header row: score + identity ── */}
                    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                      {/* Score ring */}
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <ScoreRing
                          score={result.overallScore}
                          color={matchColor}
                          size={120}
                        />
                        <motion.span
                          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold"
                          style={{
                            background: MATCH_BG[result.matchLabel],
                            borderColor: MATCH_BORDER[result.matchLabel],
                            color: matchColor,
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                            delay: 1,
                          }}
                        >
                          <Target size={10} aria-hidden="true" />
                          {result.matchLabel}
                        </motion.span>
                      </div>

                      {/* Candidate details */}
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                          <CheckCircle2
                            size={14}
                            className="text-emerald-400"
                            aria-hidden="true"
                          />
                          <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400/65">
                            Analysis Complete
                          </span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-white leading-tight">
                          {result.candidateName}
                        </h3>
                        <p className="mt-0.5 text-sm text-white/45">
                          vs. {result.jobTitle}
                        </p>

                        {/* Sub-score bars */}
                        <div className="mt-4 flex flex-col gap-2">
                          <SubScoreBar
                            label="Keyword Overlap"
                            value={result.scoreBreakdown.keywordMatch}
                            color="#6ee7b7"
                            delay={0.3}
                          />
                          <SubScoreBar
                            label="Experience Fit"
                            value={result.scoreBreakdown.experienceMatch}
                            color="#a78bfa"
                            delay={0.42}
                          />
                          <SubScoreBar
                            label="Role Alignment"
                            value={result.scoreBreakdown.titleMatch}
                            color="#67e8f9"
                            delay={0.54}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── AI Summary ── */}
                    <div
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={13} className="text-purple-400" aria-hidden="true" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-purple-400/70">
                          AI Summary
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-white/65">
                        {result.summary}
                      </p>
                    </div>

                    {/* ── Strengths & Weaknesses ── */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Strengths */}
                      <div className="rounded-2xl border border-emerald-400/[0.12] bg-emerald-400/[0.03] p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp size={14} className="text-emerald-400" />
                          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400/70">
                            Strengths
                          </span>
                        </div>
                        <ul className="flex flex-col gap-2">
                          {result.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400/60 shrink-0" />
                              <span className="text-xs leading-relaxed text-white/60">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Weaknesses */}
                      <div className="rounded-2xl border border-red-400/[0.12] bg-red-400/[0.03] p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingDown size={14} className="text-red-400" />
                          <span className="text-[11px] font-bold uppercase tracking-widest text-red-400/70">
                            Gaps / Weaknesses
                          </span>
                        </div>
                        <ul className="flex flex-col gap-2">
                          {result.weaknesses.map((w, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400/60 shrink-0" />
                              <span className="text-xs leading-relaxed text-white/60">{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* ── Keyword Chips ── */}
                    <div className="flex flex-col gap-3">
                      {result.matchedKeywords.length > 0 && (
                        <div>
                          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-400/60">
                            Matched Keywords
                          </p>
                          <div className="flex flex-wrap gap-1.5" role="list">
                            {result.matchedKeywords.map((kw) => (
                              <KeywordChip key={kw} label={kw} matched={true} />
                            ))}
                          </div>
                        </div>
                      )}
                      {result.missingKeywords.length > 0 && (
                        <div>
                          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-red-400/60">
                            Missing Keywords
                          </p>
                          <div className="flex flex-wrap gap-1.5" role="list">
                            {result.missingKeywords.map((kw) => (
                              <KeywordChip key={kw} label={kw} matched={false} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ── Recommendation ── */}
                    <div
                      className="flex items-start gap-3 rounded-2xl border px-5 py-4"
                      style={{
                        borderColor: MATCH_BORDER[result.matchLabel],
                        background: MATCH_BG[result.matchLabel],
                      }}
                    >
                      <Target size={16} style={{ color: matchColor }} className="shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: matchColor + "aa" }}>
                          Hiring Recommendation
                        </p>
                        <p className="text-sm font-semibold" style={{ color: matchColor }}>
                          {result.recommendation}
                        </p>
                      </div>
                    </div>

                    {/* ── CTA ── */}
                    <div className="pt-1">
                      {/* Book Demo */}
                      <motion.a
                        href="#pricing"
                        className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-6 py-3.5 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
                        style={{
                          background: "linear-gradient(135deg, #059669 0%, #0e7490 100%)",
                          boxShadow: "0 0 20px rgba(5,150,105,0.30)",
                        }}
                        whileHover={
                          !shouldReduce
                            ? { scale: 1.03, boxShadow: "0 0 32px rgba(5,150,105,0.50)" }
                            : {}
                        }
                        whileTap={!shouldReduce ? { scale: 0.97 } : {}}
                        transition={{ type: "spring", stiffness: 340, damping: 22 }}
                        aria-label="Book a live demo of Clavo AI"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-2xl"
                          style={{
                            background:
                              "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, transparent 55%)",
                          }}
                        />
                        <span className="relative">Book a Live Demo</span>
                        <ArrowRight
                          size={14}
                          className="relative transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </motion.a>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={reset}
                        className="text-sm font-medium text-white/30 underline underline-offset-2 hover:text-white/55 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/30"
                      >
                        ← Screen another CV
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Bottom note */}
          <motion.p
            className="mt-5 text-center text-xs text-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Real analysis · No data stored after session · Results powered by AI + deterministic scoring
          </motion.p>
        </div>
      </section>
    </>
  );
}
