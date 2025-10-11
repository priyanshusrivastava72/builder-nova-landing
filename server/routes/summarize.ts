import type { RequestHandler } from "express";

const HF_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

export const handleSummarize: RequestHandler = async (req, res) => {
  try {
    const hfKey = process.env.HUGGINGFACE_API_KEY;
    if (!hfKey) {
      res.status(500).json({ error: "Missing HUGGINGFACE_API_KEY" });
      return;
    }

    const {
      text,
      length = "standard",
      focus = "general",
    } = req.body as {
      text?: string;
      length?: "brief" | "standard" | "detailed";
      focus?: "general" | "facts" | "ruling" | "precedent";
    };

    if (!text || typeof text !== "string" || text.trim().length < 20) {
      res
        .status(400)
        .json({
          error: "Please provide the document text (min 20 characters).",
        });
      return;
    }

    const promptFocus =
      focus === "facts"
        ? "Focus on key facts and parties' positions."
        : focus === "ruling"
          ? "Focus on the court's ruling, reasoning, and standard applied."
          : focus === "precedent"
            ? "Focus on legal precedent, tests, and how they apply."
            : "Provide a balanced general summary.";

    const instruction =
      "Summarize the following legal document in clear, concise language, highlighting the main points, obligations, and important clauses. Make the summary understandable for someone without a legal background.";

    const fullInput = `${instruction}\n${promptFocus}\n\nDocument:\n${text}`;

    const len = mapLength(length);

    const resp = await callHuggingFace(
      HF_URL,
      hfKey,
      fullInput,
      len.min,
      len.max,
    );

    if (!resp.ok) {
      // If model is loading, HF may return 503 with info
      const body = await safeText(resp);
      res
        .status(resp.status === 503 ? 503 : 502)
        .json({ error: body.slice(0, 500) });
      return;
    }

    const data = (await resp.json()) as Array<{ summary_text?: string }> | any;
    const summary = Array.isArray(data)
      ? data[0]?.summary_text
      : data?.summary_text;

    if (!summary) {
      res.status(502).json({ error: "No summary returned from model" });
      return;
    }

    res.json({ summary });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Unexpected error" });
  }
};

function mapLength(length: "brief" | "standard" | "detailed") {
  switch (length) {
    case "brief":
      return { min: 40, max: 130 };
    case "detailed":
      return { min: 120, max: 350 };
    default:
      return { min: 80, max: 220 };
  }
}

async function callHuggingFace(
  url: string,
  key: string,
  inputs: string,
  min_length: number,
  max_length: number,
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ inputs, parameters: { min_length, max_length } }),
  });
}

async function safeText(r: Response) {
  try {
    return await r.text();
  } catch {
    return "";
  }
}
