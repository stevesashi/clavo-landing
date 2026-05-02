"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const FEATURES = [
  {
    id: "screening",
    label: "Smart Screening",
    color: "#f0a500",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>
    ),
    tagline: "Screen 500 CVs in 90 seconds.",
    heading: "Smart Screening",
    description:
      "Clavo reads every CV against your job requirements and scores candidates on skills, experience, and culture fit — automatically, with zero human bias.",
    bullets: [
      "Parses 500+ resumes per minute",
      "Scores against custom scoring rubrics",
      "Flags red-flags and highlights top matches",
      "Works in Arabic and English",
    ],
    stats: [
      { label: "CVs per minute", val: "500+" },
      { label: "Screening time", val: "90 sec" },
      { label: "Bias eliminated", val: "100%" },
    ],
    visual: (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{
          background: "rgba(8,4,20,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0 24px 24px 0",
          padding: 24,
          width: "100%",
          height: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 120, height: 120, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(240,165,0,0.15), transparent 70%)",
            pointerEvents: "none",
          }}/>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 1,
              color: "#f0a500", background: "rgba(240,165,0,0.1)",
              border: "1px solid rgba(240,165,0,0.2)",
              padding: "3px 10px", borderRadius: 20,
            }}>500 CVs · 1m 32s</div>
          </div>

          <div style={{
            fontSize: 11, fontWeight: 800, letterSpacing: 2,
            color: "#f0a500", marginBottom: 12, textTransform: "uppercase" as const,
          }}>Live Screening Queue</div>

          {[
            { name: "Sarah Al-Mansouri", role: "Senior DevOps Engineer", score: 94, tag: "Top Match" },
            { name: "James Thornton", role: "DevOps Engineer", score: 81, tag: "Strong" },
            { name: "Priya Nair", role: "Cloud Infrastructure Lead", score: 78, tag: "Strong" },
            { name: "Mohamed Al-Rashidi", role: "Site Reliability Engineer", score: 62, tag: "Review" },
            { name: "Lucas Petrov", role: "Systems Administrator", score: 41, tag: "Below Bar" },
          ].map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 14px", marginBottom: 6,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                  background: `linear-gradient(135deg, rgba(240,165,0,${0.2 + i * 0.04}), rgba(240,165,0,${0.08 + i * 0.02}))`,
                  border: "1px solid rgba(240,165,0,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, color: "#f0a500",
                }}>{c.name.split(" ").map((n: string) => n[0]).join("")}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{c.role}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  fontSize: 20, fontWeight: 900, letterSpacing: -1,
                  color: c.score >= 80 ? "#4ade80" : c.score >= 60 ? "#f0a500" : "#ef4444",
                }}>{c.score}</div>
                <div style={{
                  fontSize: 9, padding: "3px 9px", borderRadius: 20, fontWeight: 700,
                  background: c.score >= 80 ? "rgba(74,222,128,0.1)" : c.score >= 60 ? "rgba(240,165,0,0.1)" : "rgba(239,68,68,0.1)",
                  border: `1px solid ${c.score >= 80 ? "rgba(74,222,128,0.3)" : c.score >= 60 ? "rgba(240,165,0,0.3)" : "rgba(239,68,68,0.3)"}`,
                  color: c.score >= 80 ? "#4ade80" : c.score >= 60 ? "#f0a500" : "#ef4444",
                }}>{c.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "interviews",
    label: "Automated Interviews",
    color: "#ff3b8b",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    tagline: "Interview every candidate. Hire the best.",
    heading: "Automated Interviews",
    description:
      "Clavo conducts structured async video interviews — asking your questions, evaluating answers, and delivering a behavioural summary before you speak to a single candidate.",
    bullets: [
      "Custom question banks per role",
      "Behavioural scoring (STAR framework)",
      "Sentiment & confidence analysis",
      "24/7 — candidates interview on their schedule",
    ],
    stats: [
      { label: "Question banks", val: "50+" },
      { label: "Score accuracy", val: "89%" },
      { label: "Available", val: "24/7" },
    ],
    visual: (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{
          background: "rgba(8,4,20,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0 24px 24px 0",
          padding: 24,
          width: "100%",
          height: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 120, height: 120, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,59,139,0.15), transparent 70%)",
            pointerEvents: "none",
          }}/>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px #ef4444" }}/>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: 1,
                color: "#ef4444", background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                padding: "3px 10px", borderRadius: 20,
              }}>LIVE</div>
            </div>
          </div>

          <div style={{
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12, padding: "28px 0",
            marginBottom: 16, textAlign: "center",
            position: "relative", overflow: "hidden",
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.015) 20px, rgba(255,255,255,0.015) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.015) 20px, rgba(255,255,255,0.015) 21px)",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", margin: "0 auto 12px",
              background: "radial-gradient(circle at 40% 35%, #ff99cc, #cc0062)",
              boxShadow: "0 0 30px rgba(255,59,139,0.6), 0 0 60px rgba(255,59,139,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22,
            }}>✦</div>
            <div style={{ fontSize: 11, color: "#ff3b8b", fontWeight: 700 }}>Clavo AI Interviewer</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Question 3 of 8 · 4:32 elapsed</div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#ff3b8b", marginBottom: 10, textTransform: "uppercase" as const }}>
            Current Question
          </div>

          <div style={{
            background: "rgba(255,59,139,0.06)",
            border: "1px solid rgba(255,59,139,0.15)",
            borderRadius: 12, padding: "14px 16px",
            fontSize: 13, lineHeight: 1.7,
            color: "rgba(255,255,255,0.8)", fontStyle: "italic" as const,
            marginBottom: 16,
          }}>
            "Describe a time you had to resolve a critical production incident under pressure. What was your process?"
          </div>

          {[
            { trait: "Communication", score: 92 },
            { trait: "Technical Depth", score: 88 },
            { trait: "Confidence", score: 85 },
          ].map((t, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{t.trait}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#ff3b8b" }}>{t.score}</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
                <div style={{
                  height: "100%", borderRadius: 4, width: `${t.score}%`,
                  background: "linear-gradient(to right, #cc0062, #ff3b8b)",
                }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "reports",
    label: "360° Candidate Reports",
    color: "#00e87b",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    tagline: "Hire with evidence, not instinct.",
    heading: "360° Candidate Reports",
    description:
      "Every candidate gets a full behavioural profile — skills heatmap, culture alignment, risk flags, and a one-page hiring recommendation ready to share with your team.",
    bullets: [
      "One-page shareable hiring brief",
      "Skills heatmap vs. role requirements",
      "Red flags and green lights clearly surfaced",
      "Audit trail for every hiring decision",
    ],
    stats: [
      { label: "Profile data points", val: "40+" },
      { label: "Share format", val: "1-page PDF" },
      { label: "Audit trail", val: "Full" },
    ],
    visual: (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{
          background: "rgba(8,4,20,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0 24px 24px 0",
          padding: 24,
          width: "100%",
          height: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 120, height: 120, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,232,123,0.12), transparent 70%)",
            pointerEvents: "none",
          }}/>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 1,
              color: "#00e87b", background: "rgba(0,232,123,0.1)",
              border: "1px solid rgba(0,232,123,0.2)",
              padding: "3px 10px", borderRadius: 20,
            }}>HIRE ✓</div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#00e87b", textTransform: "uppercase" as const, marginBottom: 4 }}>
                360° Report
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>Sarah Al-Mansouri</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>Senior DevOps Engineer</div>
            </div>
            <div style={{ textAlign: "right" as const }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#a78bfa", lineHeight: 1, letterSpacing: -2 }}>91</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>/ 100</div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            {[
              { trait: "Communication", score: 92, color: "#a78bfa" },
              { trait: "Technical Depth", score: 88, color: "#60a5fa" },
              { trait: "Culture Fit", score: 87, color: "#00e87b" },
              { trait: "Leadership", score: 79, color: "#f472b6" },
              { trait: "Problem Solving", score: 85, color: "#34d399" },
            ].map((t, i) => (
              <div key={i} style={{ marginBottom: 9 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>{t.trait}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: t.color }}>{t.score}</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
                  <div style={{ height: "100%", borderRadius: 4, width: `${t.score}%`, background: t.color }}/>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: "rgba(0,232,123,0.06)",
            border: "1px solid rgba(0,232,123,0.15)",
            borderRadius: 10, padding: "10px 14px",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#00e87b", letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" as const }}>
              Green Lights
            </div>
            {["7 yrs progressive DevOps experience", "Led team of 8 engineers at scale", "Strong Kubernetes track record"].map((g, i) => (
              <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 3, display: "flex", gap: 6 }}>
                <span style={{ color: "#00e87b" }}>✓</span>{g}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "gcc",
    label: "GCC Compliance Hub",
    color: "#00c2ff",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    tagline: "Built for UAE, Saudi, and the region.",
    heading: "GCC Compliance Hub",
    description:
      "Nafis, Nitaqat, Omanisation — Clavo tracks every GCC nationalization program, alerts you to compliance risks, and matches you with government-subsidised national talent.",
    bullets: [
      "Nafis, Nitaqat & Omanisation tracking",
      "Government subsidy calculator",
      "National talent matching engine",
      "Automated compliance reports",
    ],
    stats: [
      { label: "Regulations tracked", val: "6+" },
      { label: "GCC countries", val: "4" },
      { label: "Report cycle", val: "Monthly" },
    ],
    visual: (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{
          background: "rgba(8,4,20,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0 24px 24px 0",
          padding: 24,
          width: "100%",
          height: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 120, height: 120, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,194,255,0.15), transparent 70%)",
            pointerEvents: "none",
          }}/>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 1,
              color: "#00c2ff", background: "rgba(0,194,255,0.1)",
              border: "1px solid rgba(0,194,255,0.2)",
              padding: "3px 10px", borderRadius: 20,
            }}>Live Compliance</div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#00c2ff", marginBottom: 12, textTransform: "uppercase" as const }}>
            GCC Compliance Overview
          </div>

          {[
            { flag: "🇦🇪", country: "UAE (Nafis)", target: "6.0%", current: "2.3%", status: "At Risk", color: "#ef4444" },
            { flag: "🇸🇦", country: "Saudi (Nitaqat)", target: "15%", current: "18.2%", status: "Compliant", color: "#4ade80" },
            { flag: "🇴🇲", country: "Oman (Omanisation)", target: "10%", current: "7.8%", status: "Warning", color: "#a78bfa" },
            { flag: "🇶🇦", country: "Qatar", target: "—", current: "—", status: "Monitoring", color: "#00c2ff" },
          ].map((r, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 14px", marginBottom: 7,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{r.flag}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{r.country}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Target: {r.target} · Now: {r.current}</div>
                </div>
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, padding: "4px 11px", borderRadius: 20,
                background: `${r.color}15`, border: `1px solid ${r.color}40`, color: r.color,
              }}>{r.status}</div>
            </div>
          ))}

          <div style={{
            marginTop: 8,
            background: "rgba(0,194,255,0.07)",
            border: "1px solid rgba(0,194,255,0.2)",
            borderRadius: 10, padding: "10px 14px",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#00c2ff", letterSpacing: 1, marginBottom: 3, textTransform: "uppercase" as const }}>
              Subsidy Opportunity
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              Hire 3 Emirati nationals → save AED 108,000/yr + AED 8,000/month subsidy per hire
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "copilot",
    label: "Recruiter Co-Pilot",
    color: "#bf5af2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    tagline: "Your AI hiring partner, always on.",
    heading: "Recruiter Co-Pilot",
    description:
      "Clavo doesn't just automate — it advises. Ask it why a candidate ranked high, how to improve your Nafis score, or what salary band the market is paying. It answers instantly.",
    bullets: [
      "Natural language hiring queries",
      "Proactive compliance alerts",
      "Market salary benchmarking",
      "Continuous learning from your decisions",
    ],
    stats: [
      { label: "Response time", val: "< 2s" },
      { label: "Languages", val: "AR + EN" },
      { label: "Learning cycle", val: "Continuous" },
    ],
    visual: (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{
          background: "rgba(8,4,20,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0 24px 24px 0",
          padding: 24,
          width: "100%",
          height: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 120, height: 120, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(191,90,242,0.15), transparent 70%)",
            pointerEvents: "none",
          }}/>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#bf5af2", boxShadow: "0 0 6px #bf5af2" }}/>
              <div style={{
                fontSize: 10, fontWeight: 700, color: "#bf5af2",
                background: "rgba(191,90,242,0.1)",
                border: "1px solid rgba(191,90,242,0.2)",
                padding: "3px 10px", borderRadius: 20, letterSpacing: 1,
              }}>CO-PILOT ACTIVE</div>
            </div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#bf5af2", marginBottom: 14, textTransform: "uppercase" as const }}>
            Recruiter Co-Pilot
          </div>

          {[
            { role: "user", msg: "Why did Sarah rank #1 for this DevOps role?" },
            { role: "ai", msg: "Sarah scored 94/100 — 7 yrs DevOps, strong Kubernetes track record, 91% culture match. Highest communication score of the cohort." },
            { role: "user", msg: "What's the market salary in Dubai?" },
            { role: "ai", msg: "Senior DevOps in Dubai: AED 22k–35k/month. Sarah's expectation of AED 28k is within market — no negotiation risk flagged." },
          ].map((m, i) => (
            <div key={i} style={{
              display: "flex", gap: 8, marginBottom: 10,
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            }}>
              {m.role === "ai" && (
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                  background: "rgba(191,90,242,0.15)",
                  border: "1px solid rgba(191,90,242,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 800, color: "#bf5af2",
                }}>AI</div>
              )}
              <div style={{
                maxWidth: "78%", padding: "9px 12px",
                borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "2px 12px 12px 12px",
                background: m.role === "user" ? "rgba(191,90,242,0.1)" : "rgba(255,255,255,0.04)",
                borderLeft: m.role === "ai" ? "2px solid rgba(191,90,242,0.4)" : undefined,
                border: m.role === "user" ? "1px solid rgba(191,90,242,0.25)" : "1px solid rgba(255,255,255,0.07)",
                fontSize: 11, color: "rgba(255,255,255,0.8)", lineHeight: 1.6,
              }}>{m.msg}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "notes",
    label: "Smart Note Taking",
    color: "#ff6b35",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    tagline: "Every word captured automatically.",
    heading: "Smart Note Taking",
    description:
      "Clavo transcribes every interview in real time and generates structured summaries, key highlights, and recommended actions — so recruiters never miss a detail.",
    bullets: [
      "Real-time transcript with 97% accuracy",
      "Auto-generated structured summary",
      "Key highlights and action items surfaced",
      "Saves 6+ hours of manual notes per week",
    ],
    stats: [
      { label: "Transcript accuracy", val: "97%" },
      { label: "Summary time", val: "< 10s" },
      { label: "Hours saved / week", val: "6hrs" },
    ],
    visual: (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{
          background: "rgba(8,4,20,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0 24px 24px 0",
          padding: 24,
          width: "100%",
          height: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 120, height: 120, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,107,53,0.15), transparent 70%)",
            pointerEvents: "none",
          }}/>

          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 16,
          }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 1,
              color: "#ff6b35", background: "rgba(255,107,53,0.1)",
              border: "1px solid rgba(255,107,53,0.2)",
              padding: "3px 10px", borderRadius: 20,
            }}>
              Ready in 0:42
            </div>
          </div>

          <div style={{
            fontSize: 11, fontWeight: 800, letterSpacing: 2,
            color: "#ff6b35", marginBottom: 12,
            textTransform: "uppercase" as const,
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span>Auto-Summary</span>
          </div>

          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {["Transcript", "Highlights", "Actions"].map((tab, i) => (
              <div key={tab} style={{
                padding: "5px 14px", borderRadius: 20,
                fontSize: 11, fontWeight: 600,
                background: i === 1 ? "#ff6b35" : "rgba(255,255,255,0.06)",
                color: i === 1 ? "#000" : "rgba(255,255,255,0.5)",
                border: i === 1 ? "none" : "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
              }}>
                {tab}
              </div>
            ))}
          </div>

          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12, padding: "14px 16px",
            fontSize: 13, lineHeight: 1.8,
            color: "rgba(255,255,255,0.75)",
            marginBottom: 16, fontStyle: "italic" as const,
          }}>
            {"...demonstrated strong "}
            <span style={{
              color: "#f472b6", fontWeight: 700, fontStyle: "normal",
              background: "rgba(244,114,182,0.12)",
              padding: "1px 6px", borderRadius: 4,
            }}>leadership</span>
            {" in previous role, managed "}
            <span style={{
              color: "#f472b6", fontWeight: 700, fontStyle: "normal",
              background: "rgba(244,114,182,0.12)",
              padding: "1px 6px", borderRadius: 4,
            }}>team of 12</span>
            {" across "}
            <span style={{
              color: "#f472b6", fontWeight: 700, fontStyle: "normal",
              background: "rgba(244,114,182,0.12)",
              padding: "1px 6px", borderRadius: 4,
            }}>3 regions</span>
            {", delivered "}
            <span style={{
              color: "#f472b6", fontWeight: 700, fontStyle: "normal",
              background: "rgba(244,114,182,0.12)",
              padding: "1px 6px", borderRadius: 4,
            }}>AED 2.3M</span>
            {" project under budget..."}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {["Leadership ✓", "Scale ✓", "Delivery ✓", "Budget ✓"].map(tag => (
              <div key={tag} style={{
                padding: "5px 14px", borderRadius: 20,
                fontSize: 11, fontWeight: 600,
                background: "rgba(244,114,182,0.08)",
                border: "1px solid rgba(244,114,182,0.2)",
                color: "#f472b6",
              }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "market",
    label: "Market Mapping",
    color: "#00ffcc",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    tagline: "Know where the best talent is hiding.",
    heading: "Market Mapping",
    description:
      "Clavo maps the talent landscape across the GCC — tracking competitor hiring, salary benchmarks, candidate movement, and market supply for any role.",
    bullets: [
      "Real-time salary benchmarks across 12+ markets",
      "Competitor hiring activity tracked live",
      "Talent flow and candidate movement insights",
      "50,000+ data points updated continuously",
    ],
    stats: [
      { label: "Markets tracked", val: "12+" },
      { label: "Salary data points", val: "50K+" },
      { label: "Competitor moves", val: "Real-time" },
    ],
    visual: (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{
          background: "rgba(8,4,20,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0 24px 24px 0",
          padding: 24,
          width: "100%",
          height: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 120, height: 120, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,255,204,0.15), transparent 70%)",
            pointerEvents: "none",
          }}/>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 1,
              color: "#00ffcc", background: "rgba(0,255,204,0.1)",
              border: "1px solid rgba(0,255,204,0.2)",
              padding: "3px 10px", borderRadius: 20,
            }}>50K+ data points</div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#00ffcc", marginBottom: 12, textTransform: "uppercase" as const }}>
            Talent Market · Senior Recruiter · UAE
          </div>

          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12, padding: "14px 16px", marginBottom: 14,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" as const }}>
              Salary Benchmark
            </div>
            {[
              { label: "Junior (0-3 yrs)", val: "AED 8,000–12,000", highlight: false },
              { label: "Mid (3-6 yrs)", val: "AED 14,000–20,000", highlight: true },
              { label: "Senior (6+ yrs)", val: "AED 22,000–35,000", highlight: false },
            ].map((r, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: r.highlight ? "7px 10px" : "5px 0",
                marginBottom: 4,
                background: r.highlight ? "rgba(0,255,204,0.08)" : "transparent",
                border: r.highlight ? "1px solid rgba(0,255,204,0.2)" : "none",
                borderRadius: r.highlight ? 8 : 0,
                fontSize: 11,
                color: r.highlight ? "#00ffcc" : "rgba(255,255,255,0.45)",
                fontWeight: r.highlight ? 700 : 400,
              }}>
                <span>{r.label}</span>
                <span>{r.val}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "Active candidates", val: "1,240", color: "#00ffcc" },
              { label: "Avg time to fill", val: "28 days", color: "#60a5fa" },
              { label: "Top source", val: "LinkedIn", color: "#a78bfa" },
              { label: "Competitor hiring", val: "↑ +12%", color: "#ef4444" },
            ].map((s, i) => (
              <div key={i} style={{
                background: `${s.color}0a`,
                border: `1px solid ${s.color}22`,
                borderRadius: 10, padding: "10px 12px",
              }}>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export default function FeaturesSection() {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const active = FEATURES.find(f => f.id === activeId)!;

  return (
    <section style={{ position: "relative", padding: "100px 0", overflow: "hidden" }}>

      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <img
          src="/solar-bg3.jpg"
          alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            animation: "kenBurns3 25s ease-in-out infinite",
          }}
        />

        {/* Purple color tint */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(240,165,0,0.5) 0%, rgba(251,191,36,0.4) 40%, rgba(212,147,10,0.3) 70%, rgba(254,215,170,0.18) 100%)",
          mixBlendMode: "color" as any,
        }}/>

        {/* Purple radial glow */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 60% 40%, rgba(240,165,0,0.25) 0%, rgba(212,147,10,0.15) 40%, transparent 70%)",
        }}/>
      </div>

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to bottom, rgba(3,6,8,0.92) 0%, rgba(3,6,8,0.75) 40%, rgba(3,6,8,0.75) 60%, rgba(3,6,8,0.92) 100%)",
      }}/>

      {/* Glow pulse */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "radial-gradient(ellipse at 80% 40%, rgba(240,165,0,0.08) 0%, transparent 55%)",
        animation: "glowPulse3 7s ease-in-out infinite",
        pointerEvents: "none",
      }}/>

      {/* Top fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 200, zIndex: 3,
        background: "linear-gradient(to bottom, #030608, transparent)",
        pointerEvents: "none",
      }}/>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 200, zIndex: 3,
        background: "linear-gradient(to top, #030608, transparent)",
        pointerEvents: "none",
      }}/>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 56px" }}>

          {/* Heading */}
          <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{
              fontSize: 12, fontWeight: 700, color: "#a78bfa",
              textTransform: "uppercase", letterSpacing: 3, marginBottom: 16,
            }}>
              PLATFORM CAPABILITIES
            </p>
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: "#fff",
              lineHeight: 1.1, marginBottom: 16,
            }}>
              7 Pillars.{" "}
              <span style={{ color: "#a78bfa" }}>Zero Competition.</span>
            </h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 800, margin: "0 auto" }}>
              We didn't enter the market — we created it.
            </p>
          </div>
          </AnimatedSection>

          {/* Tabbed layout */}
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, alignItems: "start" }}>

            {/* ── Left nav ── */}
            <AnimatedSection direction="left" delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {FEATURES.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveId(f.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "14px 16px", borderRadius: 10, cursor: "pointer",
                    border: activeId === f.id
                      ? `1px solid ${f.color}40`
                      : "1px solid transparent",
                    background: activeId === f.id
                      ? `${f.color}14`
                      : "transparent",
                    color: activeId === f.id ? f.color : "rgba(255,255,255,0.5)",
                    textAlign: "left", width: "100%",
                    transition: "all 0.2s",
                    outline: "none",
                  }}
                >
                  <span style={{
                    color: activeId === f.id ? f.color : "rgba(255,255,255,0.3)",
                    flexShrink: 0, transition: "color 0.2s",
                  }}>
                    {f.icon}
                  </span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{f.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>{f.tagline}</div>
                  </div>
                  {activeId === f.id && (
                    <svg style={{ marginLeft: "auto", flexShrink: 0, color: f.color }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
            </AnimatedSection>

            {/* ── Right spotlight ── */}
            <AnimatedSection direction="right" delay={0.3}>
            <div style={{ position: "relative" }}>

              {/* Background glow behind card */}
              <div aria-hidden="true" style={{
                position: "absolute",
                inset: 0,
                borderRadius: 24,
                background: `radial-gradient(ellipse at top right, ${active.color}0d, transparent 60%)`,
                pointerEvents: "none",
                zIndex: 0,
              }}/>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${active.color}26`,
                    borderRadius: 16,
                    overflow: "hidden",
                    minHeight: 560,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Top accent line */}
                  <div aria-hidden="true" style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, height: 1, zIndex: 2,
                    background: `linear-gradient(to right, transparent, ${active.color}66, transparent)`,
                    pointerEvents: "none",
                  }}/>

                  {/* Shimmer overlay */}
                  <div aria-hidden="true" style={{
                    position: "absolute",
                    inset: 0, zIndex: 2,
                    background: `linear-gradient(105deg, transparent 40%, ${active.color}08 50%, transparent 60%)`,
                    animation: "shimmerCard 3s ease-in-out infinite",
                    pointerEvents: "none",
                  }}/>

                  {/* Main 2-col grid: copy left | visual right */}
                  <div style={{ display: "grid", gridTemplateColumns: "45% 55%", gap: 0, flex: 1, minHeight: 0 }}>

                    {/* Left: copy — owns its own padding */}
                    <div style={{
                      padding: "36px 32px",
                      display: "flex", flexDirection: "column", justifyContent: "center",
                    }}>
                      <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 12 }}>
                        {active.heading}
                      </h3>
                      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 24 }}>
                        {active.description}
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                        {active.bullets.map((b, i) => (
                          <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                            <span style={{
                              width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                              background: `${active.color}20`,
                              border: `1px solid ${active.color}40`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              marginTop: 1,
                            }}>
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={active.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: visual fills edge to edge */}
                    <div style={{
                      overflow: "hidden",
                      borderLeft: `1px solid ${active.color}20`,
                      display: "flex",
                    }}>
                      {active.visual}
                    </div>
                  </div>

                  {/* Stats row — full width with padding */}
                  <div style={{
                    padding: "20px 32px 28px 32px",
                    borderTop: `1px solid ${active.color}15`,
                  }}>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${active.stats.length}, 1fr)`,
                      gap: 12,
                    }}>
                      {active.stats.map((s, i) => (
                        <div key={i} style={{
                          background: `${active.color}0f`,
                          border: `1px solid ${active.color}33`,
                          borderRadius: 12,
                          padding: 16,
                        }}>
                          <div style={{ fontSize: 20, fontWeight: 800, color: active.color, marginBottom: 4 }}>{s.val}</div>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
