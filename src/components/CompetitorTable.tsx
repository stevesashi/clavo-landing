"use client";
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
  if (value === true) return <span style={{ color: "#a78bfa", fontSize: 18, fontWeight: 700 }}>✓</span>;
  if (value === "limited") return <span style={{ color: "#fbbf24", fontSize: 11, fontWeight: 600 }}>Partial</span>;
  return <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 18 }}>—</span>;
};

export default function CompetitorTable() {
  return (
    <section style={{ position: "relative", padding: "100px 0", background: "#030608", overflow: "hidden" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#a78bfa", marginBottom: 14, textTransform: "uppercase" }}>
            Why Clavo
          </div>
          <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
            Built Different. Built for the GCC.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", maxWidth: 720, margin: "0 auto", lineHeight: 1.7 }}>
            Compare Clavo against the global giants and the GCC&apos;s top recruitment platforms.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(167,139,250,0.15)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(167,139,250,0.08)",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
              <thead>
                <tr style={{ background: "rgba(167,139,250,0.08)", borderBottom: "1px solid rgba(167,139,250,0.2)" }}>
                  <th style={{ padding: "18px 20px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: 1, textTransform: "uppercase" }}>
                    Feature
                  </th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 13, fontWeight: 800, color: "#a78bfa", letterSpacing: 0.5, background: "rgba(167,139,250,0.12)" }}>
                    Clavo AI
                  </th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                    HireVue
                  </th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                    Eightfold AI
                  </th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                    ZenHR
                  </th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                    Bayzat
                  </th>
                  <th style={{ padding: "18px 12px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                    Jadeer.ai
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={i} style={{ borderBottom: i < features.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <td style={{ padding: "16px 20px", fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                      {f.name}
                    </td>
                    <td style={{ padding: "16px 12px", textAlign: "center", background: "rgba(167,139,250,0.04)" }}>
                      <Cell value={f.clavo} />
                    </td>
                    <td style={{ padding: "16px 12px", textAlign: "center" }}><Cell value={f.hirevue} /></td>
                    <td style={{ padding: "16px 12px", textAlign: "center" }}><Cell value={f.eightfold} /></td>
                    <td style={{ padding: "16px 12px", textAlign: "center" }}><Cell value={f.zenhr} /></td>
                    <td style={{ padding: "16px 12px", textAlign: "center" }}><Cell value={f.bayzat} /></td>
                    <td style={{ padding: "16px 12px", textAlign: "center" }}><Cell value={f.jadeer} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          Other tools track your compliance gap. <span style={{ color: "#a78bfa", fontWeight: 600 }}>Clavo closes it.</span>
        </div>
      </div>
    </section>
  );
}
