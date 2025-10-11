import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function OutcomePredictor() {
  const [caseText, setCaseText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<null | {
    prediction: string;
    confidence: number;
    explanation: string;
    ranking: { label: string; score: number }[];
  }>(null);

  const predictWithAI = async () => {
    const payload = caseText.trim();
    if (!payload) {
      setAiError("Please paste case details.");
      return;
    }
    setAiError(null);
    setAiResult(null);
    setAiLoading(true);
    try {
      const res = await fetch("/api/outcome/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: payload }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `Request failed (${res.status})`);
      }
      const data = (await res.json()) as any;
      setAiResult(data);
    } catch (e: any) {
      setAiError(e?.message || "Prediction failed.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-legal-100 text-legal-800 mb-3">
              <Sparkles className="w-3 h-3" /> AI Outcome Prediction
            </div>
            <h1 className="text-4xl font-bold text-legal-900">
              Outcome Predictor
            </h1>
            <p className="text-muted-foreground mt-2">
              Paste case details and get a predicted outcome with confidence and
              explanation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-legal-900">Case Details</CardTitle>
                <CardDescription>
                  Describe the facts, claims, defenses, and procedural posture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label htmlFor="case-text">Input</Label>
                <Textarea
                  id="case-text"
                  value={caseText}
                  onChange={(e) => setCaseText(e.target.value)}
                  placeholder="e.g., Plaintiff alleges breach of contract for failure to deliver goods... Defendant argues force majeure due to government shutdowns..."
                  className="min-h-[200px]"
                />
                <div className="flex gap-2">
                  <Button onClick={predictWithAI} disabled={aiLoading}>
                    {aiLoading ? "Predicting..." : "Predict with AI"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCaseText("");
                      setAiResult(null);
                      setAiError(null);
                    }}
                  >
                    Clear
                  </Button>
                </div>
                {aiError && (
                  <p className="text-sm text-destructive">{aiError}</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-legal-900">
                  Prediction Result
                </CardTitle>
                <CardDescription>
                  Model label, confidence, and explanation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {!aiResult && !aiLoading ? (
                  <div className="text-muted-foreground">
                    No prediction yet.
                  </div>
                ) : aiLoading ? (
                  <div className="text-muted-foreground">Running model...</div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-2xl font-semibold text-legal-900">
                      Outcome: {aiResult!.prediction}
                      <span className="ml-2 text-base text-muted-foreground">
                        ({(aiResult!.confidence * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                      {aiResult!.explanation}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-legal-800 mb-1">
                        Scores
                      </div>
                      <div className="grid grid-cols-2 gap-y-1">
                        {aiResult!.ranking.map((r) => (
                          <div key={r.label} className="flex justify-between">
                            <span className="capitalize">{r.label}</span>
                            <span>{(r.score * 100).toFixed(1)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
