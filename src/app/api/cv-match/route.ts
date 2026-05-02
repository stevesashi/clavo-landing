import { NextRequest, NextResponse } from "next/server";

// ─── Text Extraction ──────────────────────────────────────────────────────────

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.toLowerCase();

  if (filename.endsWith(".pdf")) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require("pdf-parse");
    const data = await pdfParse(buffer);
    const text = data.text as string;
    console.log(`[cv-match] PDF extracted — ${text.length} chars`);
    return text;
  }

  if (filename.endsWith(".docx") || filename.endsWith(".doc")) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mammoth = require("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value as string;
  }

  // Plain text / txt fallback
  return buffer.toString("utf-8");
}

// ─── Keyword Extraction ───────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  "the","a","an","and","or","but","in","on","at","to","for","of","with",
  "by","from","up","about","into","as","is","are","was","were","be","been",
  "being","have","has","had","do","does","did","will","would","could","should",
  "may","might","shall","can","this","that","these","those","we","you","they",
  "he","she","it","our","your","their","its","my","his","her","not","what",
  "who","which","when","where","why","how","all","each","every","both","few",
  "more","most","other","some","such","than","then","so","if","while","also",
  "any","work","team","role","good","need","using","use","new","high","well",
  "etc","via","per","strong","excellent","proven","ideal","candidate","join",
  "help","build","ensure","manage","create","develop","support","provide",
  "take","working","including","minimum","plus","ability","must","required",
  "preferred","responsibilities","qualifications","experience","skills","will",
  "job","position","company","looking","great","looking","seeking","hiring",
]);

function extractKeywords(text: string, topN = 40): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s/-]/g, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^[-./]|[-./]$/g, ""))
    .filter(
      (w) => w.length >= 3 && !STOP_WORDS.has(w) && !/^\d+$/.test(w)
    );

  const freq: Record<string, number> = {};
  for (const w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word]) => word);
}

function toTitleCase(kw: string): string {
  return kw
    .split(/[-\s]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(kw.includes("-") ? "-" : " ");
}

// ─── Deterministic Scoring ────────────────────────────────────────────────────

interface ScoreBreakdown {
  overall: number;
  keywordScore: number;
  experienceScore: number;
  titleScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
}

function computeScore(cvText: string, jdText: string): ScoreBreakdown {
  const cvLower = cvText.toLowerCase();
  const jdLower = jdText.toLowerCase();

  // 1. Keyword overlap — 50% weight
  const jdKeywords = extractKeywords(jdText, 40);
  const matched = jdKeywords.filter(
    (kw) => cvLower.includes(kw) || cvLower.includes(kw.replace(/-/g, " "))
  );
  const missing = jdKeywords.filter((kw) => !matched.includes(kw));
  const keywordScore =
    jdKeywords.length > 0
      ? Math.round((matched.length / jdKeywords.length) * 100)
      : 50;

  // 2. Experience match — 25% weight
  const jdYears = [...jdLower.matchAll(/(\d+)\+?\s*years?/g)].map((m) =>
    parseInt(m[1])
  );
  const cvYears = [...cvLower.matchAll(/(\d+)\+?\s*years?/g)].map((m) =>
    parseInt(m[1])
  );
  let experienceScore = 60;
  if (jdYears.length && cvYears.length) {
    const reqYears = Math.max(...jdYears);
    const candidateYears = Math.max(...cvYears);
    experienceScore =
      candidateYears >= reqYears
        ? 100
        : Math.round((candidateYears / reqYears) * 100);
  }

  // 3. Title / seniority match — 25% weight
  const roleTitles = [
    "manager","engineer","developer","analyst","director","lead","designer",
    "architect","consultant","specialist","coordinator","administrator",
    "officer","associate","head","vp","founder","cto","ceo","cfo","recruiter",
    "scientist","researcher","writer","marketer","strategist","product",
  ];
  const seniorityLevels = ["senior","junior","principal","staff","lead","mid"];
  let titleScore = 40;
  const roleMatch = roleTitles.some(
    (r) => jdLower.includes(r) && cvLower.includes(r)
  );
  if (roleMatch) {
    titleScore = 80;
    const jdSeniority = seniorityLevels.find((s) => jdLower.includes(s));
    const cvSeniority = seniorityLevels.find((s) => cvLower.includes(s));
    if (jdSeniority && cvSeniority && jdSeniority === cvSeniority) {
      titleScore = 100;
    }
  }

  // 4. Weighted overall (clamp 15–97)
  const raw = keywordScore * 0.5 + experienceScore * 0.25 + titleScore * 0.25;
  const overall = Math.round(Math.max(15, Math.min(97, raw)));

  return {
    overall,
    keywordScore,
    experienceScore,
    titleScore,
    matchedKeywords: matched.slice(0, 15).map(toTitleCase),
    missingKeywords: missing.slice(0, 12).map(toTitleCase),
  };
}

// ─── AI Analysis (Claude) ─────────────────────────────────────────────────────

interface AIAnalysis {
  candidateName: string;
  jobTitle: string;
  strengths: string[];
  weaknesses: string[];
  summary: string;
  recommendation: string;
}

async function getAIAnalysis(
  cvText: string,
  jdText: string,
  scores: ScoreBreakdown
): Promise<AIAnalysis> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.startsWith("your_") || apiKey === "sk-ant-placeholder") {
    console.warn("ANTHROPIC_API_KEY not configured — using deterministic fallback analysis");
    return buildFallbackAnalysis(cvText, jdText, scores);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Anthropic = require("@anthropic-ai/sdk");
    const client = new Anthropic.default({ apiKey });

    const cvSnippet = cvText.slice(0, 2800);
    const jdSnippet = jdText.slice(0, 1500);
    const matchedList = scores.matchedKeywords.slice(0, 8).join(", ");

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 900,
      system: "You are a precise AI recruitment analyst. Return only valid JSON — no prose, no markdown fences.",
      messages: [
        {
          role: "user",
          content: `Analyze this CV against the job description and return a JSON object.

CV:
${cvSnippet}

JOB DESCRIPTION:
${jdSnippet}

Pre-computed match score: ${scores.overall}/100
Matched skills detected: ${matchedList}

Return ONLY this JSON structure (no extra text):
{
  "candidateName": "Full name from CV, or 'Unknown Candidate'",
  "jobTitle": "Exact job title from JD",
  "strengths": ["Specific strength with evidence", "Second strength", "Third strength"],
  "weaknesses": ["Specific gap with context", "Second gap"],
  "summary": "2–3 sentence analytical summary of candidate fit",
  "recommendation": "One clear hiring recommendation sentence"
}`,
        },
      ],
    });

    const rawText =
      message.content[0]?.type === "text" ? message.content[0].text : "";
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in Claude response");
    return JSON.parse(jsonMatch[0]) as AIAnalysis;
  } catch (err) {
    console.error("Claude AI analysis failed, using fallback:", err);
    return buildFallbackAnalysis(cvText, jdText, scores);
  }
}

function buildFallbackAnalysis(
  cvText: string,
  jdText: string,
  scores: ScoreBreakdown
): AIAnalysis {
  // Extract candidate name — look for lines that look like a full name
  const nameMatch = cvText.match(/^([A-Z][a-z]+(?: [A-Z][a-z]+){1,3})\s*$/m);
  const candidateName = nameMatch?.[1] ?? "Candidate";

  // Extract job title from JD first line or "Position:" pattern
  const titlePatterns = [
    /(?:position|job title|role|title)\s*[:\-]\s*([^\n]{5,60})/i,
    /^#+\s*(.{5,60})/m,
    /^([A-Z][^.\n]{5,55})\s*$/m,
  ];
  let jobTitle = "Position";
  for (const pat of titlePatterns) {
    const m = jdText.match(pat);
    if (m) { jobTitle = m[1].trim(); break; }
  }

  const score = scores.overall;
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (scores.keywordScore >= 60 && scores.matchedKeywords.length >= 3) {
    strengths.push(
      `Strong skill alignment — ${scores.matchedKeywords.slice(0, 3).join(", ")} confirmed`
    );
  }
  if (scores.experienceScore >= 80) {
    strengths.push("Experience level meets or exceeds the role requirements");
  }
  if (scores.titleScore >= 80) {
    strengths.push("Role seniority and domain align closely with the position");
  }
  if (scores.matchedKeywords.length >= 5) {
    strengths.push(`Broad coverage across ${scores.matchedKeywords.length} key requirement areas`);
  }
  if (strengths.length === 0) {
    strengths.push("Candidate demonstrates some relevant background for this role");
  }

  if (scores.missingKeywords.length >= 5) {
    weaknesses.push(
      `Gaps in ${scores.missingKeywords.slice(0, 3).join(", ")} — listed as JD requirements`
    );
  }
  if (scores.keywordScore < 50) {
    weaknesses.push("Keyword overlap below threshold — core skills underrepresented in CV");
  }
  if (scores.experienceScore < 70) {
    weaknesses.push("Experience depth may not fully satisfy stated requirements");
  }
  if (weaknesses.length === 0) {
    weaknesses.push("Further evaluation recommended for culture and team fit");
  }

  const summary =
    score >= 75
      ? `This candidate demonstrates strong alignment with the role, matching ${scores.matchedKeywords.length} of the key requirements. Their background and experience level suggest they can contribute effectively from an early stage.`
      : score >= 55
      ? `This candidate is a moderate fit, showing relevant experience in several areas but with notable gaps in ${scores.missingKeywords.slice(0, 2).join(" and ")}. An interview focused on these gaps would help clarify suitability.`
      : `This candidate shows limited alignment with the stated requirements. The CV lacks coverage of several key competencies, particularly ${scores.missingKeywords.slice(0, 3).join(", ")}.`;

  const recommendation =
    score >= 75
      ? "Recommended for first-round interview — strong technical and domain alignment."
      : score >= 55
      ? "Consider for interview; address skill gaps and clarify hands-on experience."
      : "Not recommended at this stage — significant gaps in core requirements.";

  return { candidateName, jobTitle, strengths, weaknesses, summary, recommendation };
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const cvFile = formData.get("cv") as File | null;
    const jdTextRaw = formData.get("jd_text") as string | null;
    const jdFile = formData.get("jd_file") as File | null;

    if (!cvFile) {
      return NextResponse.json({ error: "CV file is required" }, { status: 400 });
    }

    const jdText = jdTextRaw?.trim() ?? "";
    if (!jdText && !jdFile) {
      return NextResponse.json(
        { error: "Job description is required (text or file)" },
        { status: 400 }
      );
    }

    // Extract text from files
    let cvText: string;
    try {
      cvText = await extractTextFromFile(cvFile);
    } catch (e) {
      return NextResponse.json(
        { error: `Failed to read CV file: ${(e as Error).message}` },
        { status: 422 }
      );
    }

    if (!cvText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from CV. Please ensure it is a readable PDF or DOCX." },
        { status: 422 }
      );
    }

    let jdContent = jdText;
    if (!jdContent && jdFile) {
      try {
        jdContent = await extractTextFromFile(jdFile);
      } catch (e) {
        return NextResponse.json(
          { error: `Failed to read JD file: ${(e as Error).message}` },
          { status: 422 }
        );
      }
    }

    if (!jdContent.trim()) {
      return NextResponse.json(
        { error: "Job description is empty or unreadable." },
        { status: 422 }
      );
    }

    // Compute deterministic score
    const scores = computeScore(cvText, jdContent);

    // Generate AI explanation
    const aiAnalysis = await getAIAnalysis(cvText, jdContent, scores);

    // Match label based on overall score
    const matchLabel =
      scores.overall >= 75
        ? "Strong Fit"
        : scores.overall >= 55
        ? "Moderate Fit"
        : "Weak Fit";

    return NextResponse.json({
      candidateName: aiAnalysis.candidateName,
      jobTitle: aiAnalysis.jobTitle,
      overallScore: scores.overall,
      matchLabel,
      strengths: aiAnalysis.strengths,
      weaknesses: aiAnalysis.weaknesses,
      matchedKeywords: scores.matchedKeywords,
      missingKeywords: scores.missingKeywords,
      summary: aiAnalysis.summary,
      recommendation: aiAnalysis.recommendation,
      scoreBreakdown: {
        keywordMatch: scores.keywordScore,
        experienceMatch: scores.experienceScore,
        titleMatch: scores.titleScore,
      },
    });
  } catch (err) {
    console.error("[cv-match] Unhandled error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
