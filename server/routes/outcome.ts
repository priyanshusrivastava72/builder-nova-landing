import type { RequestHandler } from "express";

const ZS_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
const SUM_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

export const handleOutcomePredict: RequestHandler = async (req, res) => {
  try {
    const hfKey = process.env.HUGGINGFACE_API_KEY;
    if (!hfKey) {
      res.status(500).json({ error: "Missing HUGGINGFACE_API_KEY" });
      return;
    }

    const { text } = req.body as { text?: string };
    if (!text || typeof text !== "string" || text.trim().length < 20) {
      res
        .status(400)
        .json({ error: "Please provide case details (min 20 characters)." });
      return;
    }

    const candidate_labels = ["plaintiff", "defendant", "settled", "dismissed"];

    // Zero-shot classification for outcome label
    const clsResp = await fetch(ZS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${hfKey}`,
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
          candidate_labels,
          hypothesis_template: "This legal case outcome favors the {}.",
          multi_label: false,
        },
      }),
    });

    if (!clsResp.ok) {
      const body = await safeText(clsResp);
      res
        .status(clsResp.status === 503 ? 503 : 502)
        .json({ error: body.slice(0, 500) });
      return;
    }

    const clsData = (await clsResp.json()) as any;
    const labels: string[] = clsData?.labels || clsData?.[0]?.labels || [];
    const scores: number[] = clsData?.scores || clsData?.[0]?.scores || [];
    if (!labels.length || !scores.length) {
      res.status(502).json({ error: "Classifier returned no scores" });
      return;
    }

    const ranked = labels
      .map((l: string, i: number) => ({ label: l, score: scores[i] || 0 }))
      .sort((a: any, b: any) => b.score - a.score);
    const top = ranked[0];

    // Compose brief explanation via summarization model
    const instruction = `Given the following details of a legal case, predict the likely outcome as ${top.label}. Highlight the main factors influencing this prediction in 2-5 bullet points using plain language.`;
    const sumInput = `${instruction}\n\nCase Details:\n${text}`;

    const sumResp = await fetch(SUM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${hfKey}`,
      },
      body: JSON.stringify({
        inputs: sumInput,
        parameters: { min_length: 60, max_length: 220 },
      }),
    });

    let explanation = "";
    if (sumResp.ok) {
      const sumData = (await sumResp.json()) as
        | Array<{ summary_text?: string }>
        | any;
      explanation = Array.isArray(sumData)
        ? sumData[0]?.summary_text || ""
        : sumData?.summary_text || "";
    } else {
      explanation = `Predicted outcome: ${top.label}. Key factors likely include allegations, strength of evidence, and applicable precedent.`;
    }

    res.json({
      prediction: top.label,
      confidence: top.score,
      ranking: ranked,
      explanation,
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Unexpected error" });
  }
};

async function safeText(r: Response) {
  try {
    return await r.text();
  } catch {
    return "";
  }
}
