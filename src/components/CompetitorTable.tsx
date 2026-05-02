"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const features = [
  { name: "AI CV Screening", clavo: true, hirevue: true, eightfold: true, zenhr: false, bayzat: false, jadeer: true },
  { name: "AI Video Interviews 24/7", clavo: true, hirevue: true, eightfold: false, zenhr: false, bayzat: false, jadeer: "limited" },
  { name: "360° Behavioral Reports", clavo: true, hirevue: "limited", eightfold: "limited", zenhr: false, bayzat: false, jadeer: false },
  { name: "Nationalization Compliance Tracking", clavo: true, hirevue: false, eightfold: false, zenhr: "limited", bayzat: "limited", jadeer: false },
  { name: "Penalty Calculator (Nafis/Qiwa)", clavo: true, hirevue: false, eightfold: false, zenhr: false, bayzat: false, jadeer: false },
  { name: "Government Report Auto-Export", clavo: true, hirevue: false, eightfold: false, zenhr: "limited", bayzat: "limited", jadeer: false },
  { name: "Live AI Recruiter Co-Pilot", clavo: true, hirevue: false, eightfold: false, zenhr: false, bayzat: false, jadeer: false },
  { name: "Smart Note Taking + Insights", clavo: true, hirevue: "limited", eightfold: false, zenhr: false, bayzat: false, jadeer: false },
  { name: "GCC Talent Market Mapping", clavo: true, hirevue: false, eightfold: "limited", zenhr: false, bayzat: false, jadeer: "limited" },
  { name: "WhatsApp Candidate Integration", clavo: true, hirevue: false, eightfold: false, zenhr: false, bayzat: true, jadeer: true },
  { name: "Built for GCC Region", clavo: true, hirevue: false, eightfold: false, zenhr: true, bayzat: true, jadeer: true },
  { name: "Transparent Pricing (no $35K+ contracts)", clavo: true, hirevue: false, eightfold: false, zenhr: true, bayzat: true, jadeer: true },
];

const Cell = ({ value }: { value: boolean | string }) => {
  if (value === true) return <span style={{ color: "#f0a500", fontSize: 18, fontWeight: 700 }}>✓</span>;
  if (value === "limited") return <span style={{ color: "#fbbf24", fontSize: 11, fontWeight: 600 }}>Partial</span>;
  return <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 18 }}>—</span>;
};

export default function CompetitorTable() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drops = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 28 + 10,
      speedY: Math.random() * 1.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.08,
      width: Math.random() * 1.2 + 0.4,
      gold: Math.random() > 0.4,
    }));

    let animId: number;
    let lastTime = 0;
    const frameInterval = 1000 / 30;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drops.forEach(d => {
          d.y += d.speedY;
          d.x += d.speedX;
          if (d.y > canvas.height) {
            d.y = -d.length;
            d.x = Math.random() * canvas.width;
          }
          const hue = d.gold ? "240,165,0" : "167,139,250";
          const grad = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
          grad.addColorStop(0, `rgba(${hue},${d.opacity})`);
          grad.addColorStop(0.5, `rgba(${hue},${d.opacity * 0.5})`);
          grad.addColorStop(1, `rgba(${hue},0)`);
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x, d.y + d.length);
          ctx.strokeStyle = grad;
          ctx.lineWidth = d.width;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.width + 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hue},${d.opacity * 1.4})`;
          ctx.fill();
        });
        lastTime = currentTime;
      }
      animId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { animId = requestAnimationFrame(animate); }
        else { cancelAnimationFrame(animId); }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section style={{ position: "relative", padding: "100px 0", background: "#030608", overflow: "hidden" }}>

      {/* Atmospheric glows */}
      <div aria-hidden="true" style={{ pointerEvents: "none", position: "absolute", inset: 0, zIndex: 1 }}>
        <div style={{
          position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
          height: 480, width: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,165,0,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
          height: 480, width: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "20%", width: "60%",
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(240,165,0,0.18), transparent)",
        }} />
      </div>

      {/* Falling ember particles */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }}
      />

      {/* Top fade */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 100, zIndex: 3,
        background: "linear-gradient(to bottom, #030608, transparent)", pointerEvents: "none",
      }} />
      {/* Bottom fade */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 160, zIndex: 3,
        background: "linear-gradient(to top, #030608, transparent)", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1300, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f0a500", marginBottom: 14, textTransform: "uppercase" }}>
            Why Clavo
          </div>
          <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
            Built Different. Built for the GCC.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", maxWidth: 720, margin: "0 auto", lineHeight: 1.7 }}>
            Compare Clavo against the global giants and the GCC&apos;s top recruitment platforms.
          </p>
        </div>

        {/* Table — gold border + glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(240,165,0,0.35)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 0 0 1px rgba(240,165,0,0.10) inset, 0 0 50px rgba(240,165,0,0.12), 0 0 100px rgba(240,165,0,0.06), 0 8px 40px rgba(0,0,0,0.55)",
          }}
        >
          {/* Gold top-edge accent line */}
          <span aria-hidden="true" style={{
            display: "block", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(240,165,0,0.65) 50%, transparent)",
          }} />

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
              <thead>
                <tr style={{ background: "rgba(240,165,0,0.06)", borderBottom: "1px solid rgba(240,165,0,0.18)" }}>
                  <th style={{ padding: "18px 20px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>
                    Feature
                  </th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 13, fontWeight: 800, color: "#f0a500", letterSpacing: 0.5, background: "rgba(240,165,0,0.08)" }}>
                    Clavo AI
                  </th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>HireVue</th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>Eightfold AI</th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>ZenHR</th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>Bayzat</th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>Jadeer.ai</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: i < features.length - 1 ? "1px solid rgba(255,255,255,0.035)" : "none" }}
                  >
                    <td style={{ padding: "15px 20px", fontSize: 13, color: "rgba(255,255,255,0.82)", fontWeight: 500 }}>
                      {f.name}
                    </td>
                    <td style={{ padding: "15px 12px", textAlign: "center", background: "rgba(240,165,0,0.03)" }}>
                      <Cell value={f.clavo} />
                    </td>
                    <td style={{ padding: "15px 12px", textAlign: "center" }}><Cell value={f.hirevue} /></td>
                    <td style={{ padding: "15px 12px", textAlign: "center" }}><Cell value={f.eightfold} /></td>
                    <td style={{ padding: "15px 12px", textAlign: "center" }}><Cell value={f.zenhr} /></td>
                    <td style={{ padding: "15px 12px", textAlign: "center" }}><Cell value={f.bayzat} /></td>
                    <td style={{ padding: "15px 12px", textAlign: "center" }}><Cell value={f.jadeer} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Gold bottom-edge accent line */}
          <span aria-hidden="true" style={{
            display: "block", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(240,165,0,0.35) 50%, transparent)",
          }} />
        </motion.div>

        <div style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          Other tools track your compliance gap.{" "}
          <span style={{ color: "#f0a500", fontWeight: 600 }}>Clavo closes it.</span>
        </div>
      </div>
    </section>
  );
}
