import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

type Risk = {
  id: string;
  label: string;
  severity: "high" | "medium" | "low";
  pattern: RegExp;
  hint: string;
};

const RISKS: Risk[] = [
  {
    id: "unilateral",
    label: "Unilateral Changes",
    severity: "high",
    pattern:
      /(we|the company|licensor).{0,50}(may|can).{0,20}(modify|change|amend).{0,50}terms/i,
    hint: "Requires bilateral consent for material changes.",
  },
  {
    id: "auto_renew",
    label: "Auto-Renewal",
    severity: "medium",
    pattern: /(auto[- ]?renew|automatic renewal|renews automatically)/i,
    hint: "Provide clear notice and easy opt-out.",
  },
  {
    id: "indemnity",
    label: "Broad Indemnity",
    severity: "high",
    pattern:
      /(indemnif(y|ies|ication)).{0,50}(any|all).{0,10}(claims|losses|damages)/i,
    hint: "Limit to third-party claims and proportionate fault.",
  },
  {
    id: "liability_cap",
    label: "Liability Cap / Exclusions",
    severity: "high",
    pattern:
      /(liability).{0,40}(excluded|disclaim|no liability)|cap on liability|limit of liability/i,
    hint: "Ensure mutual cap and carve-outs for gross negligence/willful misconduct.",
  },
  {
    id: "termination",
    label: "Termination for Convenience",
    severity: "medium",
    pattern: /(terminate).{0,30}(for convenience|at any time)/i,
    hint: "Add notice period and termination fees if appropriate.",
  },
  {
    id: "arbitration",
    label: "Mandatory Arbitration",
    severity: "low",
    pattern: /binding arbitration|mandatory arbitration|waive.*jury trial/i,
    hint: "Consider forum, rules, and appeal rights.",
  },
  {
    id: "noncompete",
    label: "Non-Compete / Restrictive Covenant",
    severity: "medium",
    pattern:
      /(non[- ]?compete|restrictive covenant|non[- ]?solicit).{0,50}(\d+\s?(months|years))/i,
    hint: "Check scope, geography, duration proportionality.",
  },
  {
    id: "privacy",
    label: "Data Sharing / Privacy",
    severity: "medium",
    pattern: /(share|transfer).{0,20}(data|personal information)|sell.*data/i,
    hint: "Ensure compliance with privacy laws and consent.",
  },
];

const EXAMPLES = [
  {
    id: "saas",
    label: "SaaS Subscription",
    text:
      "The Company may modify or amend these Terms at any time without notice. This Agreement shall auto-renew for successive one-year terms unless Customer provides written notice of non-renewal 30 days prior to the end of the then-current term. Customer agrees to indemnify Company against any and all claims or damages. Company disclaims all liability, and in no event shall Company be liable for any damages. Either party may terminate for convenience. All disputes shall be resolved by binding arbitration and Customer waives their right to a jury trial.",
  },
  {
    id: "employment",
    label: "Employment Agreement",
    text:
      "Employee agrees not to compete with Employer for a period of 12 months following termination and not to solicit any clients for two years. Employer may terminate this Agreement at any time for convenience upon 7 days' notice. Employee agrees to indemnify Employer for any and all losses caused by breach of confidentiality obligations. Any controversy shall be submitted to binding arbitration and the parties waive a jury trial.",
  },
  {
    id: "dpa",
    label: "Data Processing Addendum",
    text:
      "Processor may share personal information with affiliates and third parties for processing activities. The parties agree that the cap on liability for any breach shall not exceed fees paid in the preceding twelve months, and certain categories of liability are excluded. Vendor may modify these terms from time to time by posting an updated policy. Vendor does not sell data, but may transfer data to sub-processors.",
  },
] as const;

function highlight(
  text: string,
  risks: { start: number; end: number; risk: Risk }[],
) {
  const parts: { text: string; risk?: Risk }[] = [];
  let last = 0;
  for (const r of risks.sort((a, b) => a.start - b.start)) {
    if (r.start > last) parts.push({ text: text.slice(last, r.start) });
    parts.push({ text: text.slice(r.start, r.end), risk: r.risk });
    last = r.end;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

export default function ContractAnalyzer() {
  const [text, setText] = useState("");

  const matches = useMemo(() => {
    const spans: { start: number; end: number; risk: Risk }[] = [];
    for (const r of RISKS) {
      let m: RegExpExecArray | null;
      const regex = new RegExp(
        r.pattern.source,
        r.pattern.flags.includes("g") ? r.pattern.flags : r.pattern.flags + "g",
      );
      while ((m = regex.exec(text)) !== null) {
        spans.push({ start: m.index, end: m.index + m[0].length, risk: r });
      }
    }
    return spans;
  }, [text]);

  const parts = useMemo(() => highlight(text, matches), [text, matches]);

  const counts = useMemo(
    () => ({
      high: matches.filter((m) => m.risk.severity === "high").length,
      medium: matches.filter((m) => m.risk.severity === "medium").length,
      low: matches.filter((m) => m.risk.severity === "low").length,
    }),
    [matches],
  );

  return (
    <Layout>
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-legal-100 text-legal-800 mb-3">
              <Sparkles className="w-3 h-3" /> Contract Risk Analysis
            </div>
            <h1 className="text-4xl font-bold text-legal-900">
              Contract Risk Detector
            </h1>
            <p className="text-muted-foreground mt-2">
              Paste a contract below to automatically flag risky or unfair terms
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-legal-900">Contract Text</CardTitle>
                <CardDescription>
                  We scan for risky patterns and highlight them
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste contract text here..."
                  className="min-h-[320px]"
                />
                <div className="flex flex-wrap gap-2">
                  {EXAMPLES.map((ex) => (
                    <Button
                      key={ex.id}
                      variant="outline"
                      onClick={() => setText(ex.text)}
                    >
                      Load {ex.label}
                    </Button>
                  ))}
                  <Button variant="outline" onClick={() => setText("")}>
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-legal-900">Detected Risks</CardTitle>
                <CardDescription>
                  Color-coded highlights and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-red-100 text-red-800">
                    High: {counts.high}
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Medium: {counts.medium}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    Low: {counts.low}
                  </Badge>
                </div>
                <div className="prose max-w-none p-4 bg-white border border-legal-200 rounded-lg min-h-[320px]">
                  {parts.length ? (
                    parts.map((p, i) =>
                      p.risk ? (
                        <mark
                          key={i}
                          className={`${p.risk.severity === "high" ? "bg-red-200" : "bg-yellow-100"} rounded px-0.5`}
                          title={`${p.risk.label}: ${p.risk.hint}`}
                        >
                          {p.text}
                        </mark>
                      ) : (
                        <span key={i}>{p.text}</span>
                      ),
                    )
                  ) : (
                    <p className="text-muted-foreground">
                      Detected risks will be highlighted here.
                    </p>
                  )}
                </div>
                <div className="mt-6 space-y-3">
                  {RISKS.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 border border-legal-200 rounded-lg bg-legal-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-legal-900">
                          {r.label}
                        </div>
                        <Badge
                          className={`${r.severity === "high" ? "bg-red-100 text-red-800" : r.severity === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                        >
                          {r.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {r.hint}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
