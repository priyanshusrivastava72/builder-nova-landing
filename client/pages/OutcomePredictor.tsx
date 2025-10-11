import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { TrendingUp, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

const PRESETS: {
  label: string;
  values: {
    claimType: "contract" | "tort" | "criminal" | "employment" | "ip";
    jurisdiction: "federal" | "state";
    amount: number;
    representation: "plaintiff" | "defendant";
    precedentStrength: number;
    evidenceQuality: number;
    judgeStrictness: number;
  };
}[] = [
  {
    label: "Contract Dispute (Federal)",
    values: {
      claimType: "contract",
      jurisdiction: "federal",
      amount: 250000,
      representation: "plaintiff",
      precedentStrength: 4,
      evidenceQuality: 4,
      judgeStrictness: 2,
    },
  },
  {
    label: "Employment – Wrongful Termination",
    values: {
      claimType: "employment",
      jurisdiction: "state",
      amount: 80000,
      representation: "plaintiff",
      precedentStrength: 3,
      evidenceQuality: 3,
      judgeStrictness: 3,
    },
  },
  {
    label: "Criminal Defense",
    values: {
      claimType: "criminal",
      jurisdiction: "state",
      amount: 0,
      representation: "defendant",
      precedentStrength: 2,
      evidenceQuality: 2,
      judgeStrictness: 4,
    },
  },
  {
    label: "IP – Patent Infringement",
    values: {
      claimType: "ip",
      jurisdiction: "federal",
      amount: 1500000,
      representation: "plaintiff",
      precedentStrength: 3,
      evidenceQuality: 4,
      judgeStrictness: 3,
    },
  },
  {
    label: "Tort – Personal Injury",
    values: {
      claimType: "tort",
      jurisdiction: "state",
      amount: 120000,
      representation: "plaintiff",
      precedentStrength: 2,
      evidenceQuality: 4,
      judgeStrictness: 2,
    },
  },
];

export default function OutcomePredictor() {
  const [values, setValues] = useState({
    claimType: "contract",
    jurisdiction: "federal",
    amount: 250000,
    representation: "plaintiff",
    precedentStrength: 3,
    evidenceQuality: 3,
    judgeStrictness: 3,
  });

  const [caseText, setCaseText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<
    | null
    | {
        prediction: string;
        confidence: number;
        explanation: string;
        ranking: { label: string; score: number }[];
      }
  >(null);

  const features = useMemo(() => {
    const w: Record<string, number> = {
      intercept: -0.2,
      contract: 0.35,
      tort: -0.1,
      criminal: -0.6,
      employment: 0.1,
      ip: 0.2,
      federal: 0.05,
      state: 0,
      amount: -0.0000012,
      plaintiff: 0.15,
      defendant: -0.15,
      precedent: 0.25,
      evidence: 0.35,
      strictness: -0.18,
    };
    const x =
      w.intercept +
      w[values.claimType] +
      (values.jurisdiction === "federal" ? w.federal : w.state) +
      w.amount * values.amount +
      (values.representation === "plaintiff" ? w.plaintiff : w.defendant) +
      w.precedent * values.precedentStrength +
      w.evidence * values.evidenceQuality +
      w.strictness * values.judgeStrictness;
    const p = sigmoid(x);

    const contrib = [
      { label: "Claim Type", value: w[values.claimType] },
      {
        label: "Jurisdiction",
        value: values.jurisdiction === "federal" ? w.federal : w.state,
      },
      { label: "Amount", value: w.amount * values.amount },
      {
        label: "Representation",
        value:
          values.representation === "plaintiff" ? w.plaintiff : w.defendant,
      },
      {
        label: "Precedent Strength",
        value: w.precedent * values.precedentStrength,
      },
      { label: "Evidence Quality", value: w.evidence * values.evidenceQuality },
      {
        label: "Judge Strictness",
        value: w.strictness * values.judgeStrictness,
      },
    ].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

    return { probability: p, logit: x, contributions: contrib };
  }, [values]);

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
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-legal-100 text-legal-800 mb-3">
              <Sparkles className="w-3 h-3" /> Predictive Analytics
            </div>
            <h1 className="text-4xl font-bold text-legal-900">Outcome Predictor</h1>
            <p className="text-muted-foreground mt-2">
              Estimate probability of a plaintiff win with an interpretable model
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-legal-900">Case Parameters</CardTitle>
                <CardDescription>Adjust inputs to see probability update</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-legal-800 mb-2">Quick Scenarios</div>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((p) => (
                      <Button key={p.label} variant="outline" onClick={() => setValues(p.values)}>
                        {p.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Claim Type</Label>
                    <select
                      className="w-full mt-2 px-3 py-2 border border-legal-200 rounded-md"
                      value={values.claimType}
                      onChange={(e) => setValues((v) => ({ ...v, claimType: e.target.value }))}
                    >
                      <option value="contract">Contract</option>
                      <option value="tort">Tort</option>
                      <option value="criminal">Criminal</option>
                      <option value="employment">Employment</option>
                      <option value="ip">Intellectual Property</option>
                    </select>
                  </div>
                  <div>
                    <Label>Jurisdiction</Label>
                    <select
                      className="w-full mt-2 px-3 py-2 border border-legal-200 rounded-md"
                      value={values.jurisdiction}
                      onChange={(e) => setValues((v) => ({ ...v, jurisdiction: e.target.value }))}
                    >
                      <option value="federal">Federal</option>
                      <option value="state">State</option>
                    </select>
                  </div>
                  <div>
                    <Label>Amount in Controversy (USD)</Label>
                    <Input
                      type="number"
                      value={values.amount}
                      onChange={(e) => setValues((v) => ({ ...v, amount: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label>Representation</Label>
                    <select
                      className="w-full mt-2 px-3 py-2 border border-legal-200 rounded-md"
                      value={values.representation}
                      onChange={(e) => setValues((v) => ({ ...v, representation: e.target.value }))}
                    >
                      <option value="plaintiff">Plaintiff</option>
                      <option value="defendant">Defendant</option>
                    </select>
                  </div>
                  <div>
                    <Label>Precedent Strength (1-5)</Label>
                    <Input
                      type="range"
                      min={1}
                      max={5}
                      value={values.precedentStrength}
                      onChange={(e) => setValues((v) => ({ ...v, precedentStrength: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label>Evidence Quality (1-5)</Label>
                    <Input
                      type="range"
                      min={1}
                      max={5}
                      value={values.evidenceQuality}
                      onChange={(e) => setValues((v) => ({ ...v, evidenceQuality: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label>Judge Strictness (1-5)</Label>
                    <Input
                      type="range"
                      min={1}
                      max={5}
                      value={values.judgeStrictness}
                      onChange={(e) => setValues((v) => ({ ...v, judgeStrictness: Number(e.target.value) }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-legal-900">Prediction</CardTitle>
                <CardDescription>Real-time computed probability and drivers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Probability of Plaintiff Win</div>
                  <div className="text-5xl font-bold text-legal-900 mt-1">
                    {(features.probability * 100).toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-legal-800 mb-2">Top Drivers</div>
                  <div className="space-y-2">
                    {features.contributions.slice(0, 5).map((c, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="text-legal-700">{c.label}</div>
                        <div className={`text-sm font-medium ${c.value >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {c.value >= 0 ? "+" : ""}
                          {c.value.toFixed(3)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-4 rounded-lg bg-green-50 text-green-700">
                    <div className="text-xs">Best Case</div>
                    <div className="text-xl font-semibold">{(Math.min(0.99, features.probability + 0.15) * 100).toFixed(0)}%</div>
                  </div>
                  <div className="p-4 rounded-lg bg-legal-50 text-legal-800">
                    <div className="text-xs">Expected</div>
                    <div className="text-xl font-semibold">{(features.probability * 100).toFixed(0)}%</div>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 text-red-700">
                    <div className="text-xs">Worst Case</div>
                    <div className="text-xl font-semibold">{(Math.max(0.01, features.probability - 0.15) * 100).toFixed(0)}%</div>
                  </div>
                </div>
                <Badge className="bg-legal-100 text-legal-800 inline-flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Interpretable Logistic Model
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-legal-900">AI Outcome Prediction</CardTitle>
                <CardDescription>
                  Paste case details and get a predicted outcome (Hugging Face zero-shot)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label htmlFor="case-text">Case Details</Label>
                <Textarea
                  id="case-text"
                  value={caseText}
                  onChange={(e) => setCaseText(e.target.value)}
                  placeholder="Describe the case facts, claims, defenses, and posture..."
                  className="min-h-[160px]"
                />
                <div className="flex gap-2">
                  <Button onClick={predictWithAI} disabled={aiLoading}>
                    {aiLoading ? "Predicting..." : "Predict with AI"}
                  </Button>
                  <Button variant="outline" onClick={() => { setCaseText(""); setAiResult(null); setAiError(null); }}>
                    Clear
                  </Button>
                </div>
                {aiError && <p className="text-sm text-destructive">{aiError}</p>}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-legal-900">AI Prediction Result</CardTitle>
                <CardDescription>Model label, confidence, and explanation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {!aiResult && !aiLoading ? (
                  <div className="text-muted-foreground">No prediction yet.</div>
                ) : aiLoading ? (
                  <div className="text-muted-foreground">Running model...</div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-2xl font-semibold text-legal-900">
                      Outcome: {aiResult!.prediction}
                      <span className="ml-2 text-base text-muted-foreground">({(aiResult!.confidence * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="prose prose-sm max-w-none whitespace-pre-wrap">{aiResult!.explanation}</div>
                    <div>
                      <div className="text-sm font-medium text-legal-800 mb-1">Scores</div>
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
