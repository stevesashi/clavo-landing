"use client";
import { useRef, useEffect } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function ScrollSection() {
  const particleRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedY: Math.random() * 0.3 + 0.1,
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">

      {/* Background image wrapper — overflow hidden keeps Ken Burns clean */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <img
          src="/hero-bg2.jpg"
          alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            animation: "kenBurns2 22s ease-in-out infinite",
          }}
        />

        {/* Purple color tint */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(88,28,220,0.55) 0%, rgba(124,58,237,0.45) 40%, rgba(167,139,250,0.35) 70%, rgba(196,181,253,0.2) 100%)",
          mixBlendMode: "color" as any,
        }}/>

        {/* Purple radial glow */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 60% 40%, rgba(139,92,246,0.25) 0%, rgba(109,40,217,0.15) 40%, transparent 70%)",
        }}/>

        {/* Glow pulse overlay */}
        <div style={{
          position: "absolute", inset: 0,
          pointerEvents: "none", zIndex: 3,
          background: "radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.12) 0%, transparent 55%)",
          animation: "glowPulse2 7s ease-in-out infinite",
        }}/>

        {/* Floating lavender particles */}
        <canvas
          ref={particleRef}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 4,
          }}
        />
      </div>

      {/* Dark gradient overlay — edges fade into page, center stays vivid */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(3,6,8,0.95) 0%, rgba(3,6,8,0.4) 30%, rgba(3,6,8,0.4) 70%, rgba(3,6,8,0.95) 100%)",
        zIndex: 3,
      }}/>

      {/* Top fade — blends in from hero above */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "200px",
        background: "linear-gradient(to bottom, #030608, transparent)",
        pointerEvents: "none", zIndex: 5,
      }}/>

      {/* Bottom fade — blends into next section */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "200px",
        background: "linear-gradient(to top, #030608, transparent)",
        pointerEvents: "none", zIndex: 5,
      }}/>

      {/* Content sits above all overlays */}
      <div style={{ position: "relative", zIndex: 10 }}>
      <ContainerScroll
        titleComponent={
          <div className="relative z-10 text-center">
            <p className="text-sm font-semibold text-[#a78bfa] uppercase tracking-widest mb-4">
              GCC NATIONALIZATION COMPLIANCE
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              The Only Recruitment Platform With<br/>
              <span className="text-[#a78bfa]">Built-In National Compliance</span>
            </h2>
          </div>
        }
      >
        <div
          className="w-full h-full rounded-2xl overflow-auto"
          style={{
            background: "rgba(8,6,20,0.98)",
            border: "1px solid rgba(255,255,255,0.06)",
            fontFamily: "system-ui, sans-serif",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            fontSize: 11,
          }}
        >
          {/* Top header */}
          <div style={{
            padding: "10px 20px 8px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(15,10,30,0.9)",
          }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Nationalization Hub</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                GCC workforce nationalization tracking and compliance
              </div>
            </div>
            <div style={{
              fontSize: 10, color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6, padding: "4px 10px",
              cursor: "pointer",
            }}>
              ⚙ Reconfigure Compliance
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex", gap: 6, padding: "6px 16px",
            marginBottom: 0,
            minHeight: 40,
            overflow: "visible",
            opacity: 1,
            zIndex: 1,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            {[
              { label: "Compliance Dashboard", active: true },
              { label: "National Talent Pool", badge: "0" },
              { label: "University Pipeline" },
              { label: "Government Reports" },
              { label: "Benchmarking" },
              { label: "AI Advisor" },
            ].map((tab, i) => (
              <div key={i} style={{
                padding: "6px 12px", borderRadius: 6, fontSize: 11,
                whiteSpace: "nowrap", cursor: "pointer",
                background: tab.active ? "rgba(124,58,237,0.2)" : "transparent",
                border: tab.active ? "1px solid rgba(124,58,237,0.4)" : "1px solid transparent",
                color: tab.active ? "#a78bfa" : "rgba(255,255,255,0.5)",
                display: "flex", alignItems: "center", gap: 5,
              }}>
                {tab.label}
                {tab.badge !== undefined && (
                  <span style={{
                    background: "rgba(124,58,237,0.3)", borderRadius: 10,
                    padding: "1px 5px", fontSize: 9,
                  }}>{tab.badge}</span>
                )}
              </div>
            ))}
          </div>

          {/* Country tabs */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginRight: 4 }}>COUNTRIES</span>
            {["UAE", "Saudi Arabia", "Oman", "Qatar", "Bahrain", "Kuwait"].map((c, i) => (
              <div key={i} style={{
                padding: "3px 10px", borderRadius: 20, fontSize: 10,
                background: i === 0 ? "rgba(167,139,250,0.15)" : "transparent",
                border: i === 0 ? "1px solid rgba(167,139,250,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color: i === 0 ? "#a78bfa" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
              }}>{c}</div>
            ))}
            <div style={{
              padding: "3px 10px", borderRadius: 20, fontSize: 10,
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.3)", cursor: "pointer",
            }}>+ Add Country</div>
          </div>

          {/* Alert banner */}
          <div style={{
            margin: "6px 16px", padding: "6px 10px",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderLeft: "3px solid #ef4444",
            borderRadius: 6,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#fca5a5" }}>
              🇦🇪 Nafis Compliance Alert
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
              Current 2.3% vs target 6.0% · AED 9,000 / month · Audit cycle: Monthly
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>
              Govt pays AED 8,000/month subsidy per Emirati hired
            </div>
            <div style={{
              display: "inline-block", marginTop: 4,
              fontSize: 10, color: "#ef4444",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 4, padding: "2px 8px", cursor: "pointer",
            }}>Fix Now →</div>
          </div>

          {/* Stats row */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(5,1fr)",
            gap: 6, padding: "0 16px 6px",
          }}>
            {[
              { label: "CURRENT EMIRATISATION %", val: "2.3%", sub: "Target 6.0%", color: "#ef4444" },
              { label: "NAFIS EMPLOYEES", val: "0", sub: "Hired nationals", color: "#fff" },
              { label: "MONTHLY PENALTY", val: "AED 9,000", sub: "MOHRE + Nafis Portal", color: "#a78bfa" },
              { label: "DAYS TO AUDIT", val: "—", sub: "Set audit date →", color: "#a78bfa" },
              { label: "NATIONALS IN PIPELINE", val: "0", sub: "Not hired/rejected", color: "#fff" },
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginBottom: 4, letterSpacing: 0.5 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Bottom panels */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 2fr 1fr",
            gap: 6, padding: "0 16px 8px", flex: 1,
          }}>
            {/* Nafis Compliance */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 8, padding: "8px 10px",
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Nafis Compliance</div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  border: "4px solid rgba(255,255,255,0.06)",
                  borderTop: "4px solid #ef4444",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#ef4444" }}>2.3%</div>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)" }}>target 6.0%</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, textAlign: "center" }}>
                {[["CURRENT","5"],["NEEDED","9"],["TARGET","6.0%"]].map(([l,v],i) => (
                  <div key={i}>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)" }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1,
                  color: "rgba(255,255,255,0.35)", marginBottom: 6,
                  textTransform: "uppercase" }}>
                  Sector Targets
                </div>
                {[
                  { sector: "Banking", current: "2.3%", target: "10.0%", status: "below" },
                  { sector: "Insurance", current: "0.3%", target: "5.0%", status: "below" },
                  { sector: "Retail", current: "6.2%", target: "6.0%", status: "met" },
                  { sector: "Technology", current: "1.8%", target: "8.0%", status: "below" },
                ].map((s, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "4px 0",
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>
                      {s.sector}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{
                        fontSize: 9, fontWeight: 600,
                        color: s.status === "met" ? "#4ade80" : "#ef4444"
                      }}>
                        {s.current}
                      </span>
                      <span style={{ fontSize: 8, color: "rgba(255,255,255,0.25)" }}>
                        / {s.target}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8, padding: "8px 10px", flex: 1,
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>
                  National Talent Matches (AI Recommended)
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { name: "Fatima Al-Zahra", role: "Senior Recruiter", match: "94%", flag: "🇦🇪" },
                    { name: "Ahmed Al-Mansoori", role: "Talent Partner", match: "89%", flag: "🇦🇪" },
                    { name: "Sara Al-Hashemi", role: "HR Specialist", match: "82%", flag: "🇦🇪" },
                  ].map((c, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "6px 8px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 6,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 12 }}>{c.flag}</span>
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>{c.name}</div>
                          <div style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>{c.role}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#a78bfa" }}>{c.match}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Penalty Calculator & ROI</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  <div style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 6, padding: "8px",
                  }}>
                    <div style={{ fontSize: 9, color: "#fca5a5", marginBottom: 4 }}>If you do NOTHING</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>AED 108,000 / yr</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>Annual impact</div>
                  </div>
                  <div style={{
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    borderRadius: 6, padding: "8px",
                  }}>
                    <div style={{ fontSize: 9, color: "#4ade80", marginBottom: 4 }}>Hire 3 Nationals NOW</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>AED 0 penalty</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>Govt pays AED 8,000/month subsidy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Compliance Roadmap</div>
                {[
                  { dot: "#ef4444", label: "NOW", desc: "Current: 2.3% vs 6.0%" },
                  { dot: "#a78bfa", label: "+30 days", desc: "Hire 9 nationals to reach 6%" },
                  { dot: "#60a5fa", label: "+90 days", desc: "Audit milestone" },
                  { dot: "#4ade80", label: "Q3 2026", desc: "Full compliance target" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "flex-start" }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: r.dot, marginTop: 2, flexShrink: 0,
                    }}/>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600 }}>{r.label}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Government Reports</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Submit via Nafis Portal</div>
                {["Nafis Monthly Report", "Board Compliance Summary"].map((r, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: 6,
                    fontSize: 10, color: "rgba(255,255,255,0.6)",
                  }}>
                    <span>{r}</span>
                    <span style={{ color: "#60a5fa", fontSize: 9 }}>↓ Export</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>

      <div style={{
        position: "relative",
        zIndex: 10,
        textAlign: "center",
        maxWidth: 700,
        margin: "-80px auto 40px",
      }}>
        <p style={{
          fontSize: 17,
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.7,
        }}>
          Track Emiratisation targets, calculate penalties, match national
          talent, and generate government reports — across UAE, Saudi Arabia,
          Oman, Qatar, Bahrain, and Kuwait.
        </p>
      </div>
      </div>
    </div>
  );
}
