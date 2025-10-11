import type { RequestHandler } from "express";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const handleAssistantChat: RequestHandler = async (req, res) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Missing OPENROUTER_API_KEY" });
      return;
    }

    const { query } = req.body as { query?: string };
    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Missing 'query'" });
      return;
    }

    const system =
      "You are a helpful legal research assistant. Provide clear, practical explanations and, when relevant, outline factors, tests, and procedural posture. Do not provide definitive legal advice; include a brief disclaimer that this is not legal advice and encourage consulting a qualified attorney. Keep answers concise unless asked for more detail.";

    const resp = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Title": "LegalAI Assistant",
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [
          { role: "system", content: system },
          { role: "user", content: query },
        ],
        temperature: 0.2,
      }),
    });

    if (!resp.ok) {
      const msg = await safeText(resp);
      res
        .status(502)
        .json({ error: `Upstream error ${resp.status}: ${msg.slice(0, 200)}` });
      return;
    }

    const data = (await resp.json()) as any;
    const text: string = data?.choices?.[0]?.message?.content ?? "";
    res.json({ text });
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
