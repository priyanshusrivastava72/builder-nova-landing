import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Scale,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CASES, type CaseDoc } from "@/data/cases";
import { buildIndex, search, type TfIdfIndex } from "@/lib/search";

export default function CaseFinder() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<{
    tags: string[];
    court: string | "all";
    year: string | "all";
  }>({ tags: [], court: "all", year: "all" });
  const [results, setResults] = useState<{ doc: CaseDoc; score: number }[]>([]);
  const [index, setIndex] = useState<TfIdfIndex | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(CASES.flatMap((c) => c.tags))).sort(),
    [],
  );
  const allCourts = useMemo(
    () => Array.from(new Set(CASES.map((c) => c.court))).sort(),
    [],
  );
  const allYears = useMemo(
    () => Array.from(new Set(CASES.map((c) => c.year))).sort((a, b) => a - b),
    [],
  );

  useEffect(() => {
    setIndex(buildIndex(CASES));
  }, []);

  const run = () => {
    if (!index) return;
    const q =
      query.trim() ||
      filters.tags.join(" ") ||
      (filters.court !== "all" ? filters.court : "") ||
      (filters.year !== "all" ? String(filters.year) : "");
    const raw = search(
      index,
      q ||
        "contract breach negligence criminal evidence trade secret royalties",
      10,
    );
    const filtered = raw.filter(
      ({ doc }) =>
        (filters.court === "all" || doc.court === filters.court) &&
        (filters.year === "all" || doc.year === Number(filters.year)) &&
        (filters.tags.length === 0 ||
          filters.tags.every((t) => doc.tags.includes(t))),
    );
    setResults(filtered);
  };

  useEffect(() => {
    run();
  }, [index]);

  return (
    <Layout>
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-legal-100 text-legal-800 mb-3">
              <Sparkles className="w-3 h-3" /> AI-Powered Case Retrieval
            </div>
            <h1 className="text-4xl font-bold text-legal-900">Case Finder</h1>
            <p className="text-muted-foreground mt-2">
              Find similar past cases instantly with TF-IDF semantic search
            </p>
          </div>

          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-legal-900">Search</CardTitle>
              <CardDescription>
                Enter a query or use filters to narrow results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-legal-400 h-5 w-5" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. breach of contract damages audit clause"
                    className="pl-10"
                  />
                </div>
                <Button onClick={run} className="min-w-[120px]">
                  Search
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {allTags.map((t) => (
                      <button
                        key={t}
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            tags: f.tags.includes(t)
                              ? f.tags.filter((x) => x !== t)
                              : [...f.tags, t],
                          }))
                        }
                        className={`px-3 py-1 rounded-full border ${filters.tags.includes(t) ? "bg-legal-700 text-white border-legal-700" : "bg-legal-50 border-legal-200 text-legal-700 hover:bg-legal-100"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Court</Label>
                  <select
                    className="w-full mt-2 px-3 py-2 border border-legal-200 rounded-md"
                    value={filters.court}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        court: e.target.value as any,
                      }))
                    }
                  >
                    <option value="all">All</option>
                    {allCourts.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Year</Label>
                  <select
                    className="w-full mt-2 px-3 py-2 border border-legal-200 rounded-md"
                    value={filters.year}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, year: e.target.value as any }))
                    }
                  >
                    <option value="all">All</option>
                    {allYears.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {results.map(({ doc, score }) => (
              <Card key={doc.id} className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-legal-900">
                      {doc.title}
                    </CardTitle>
                    <Badge className="bg-legal-100 text-legal-800">
                      {doc.court} • {doc.year}
                    </Badge>
                  </div>
                  <CardDescription>
                    <span className="font-medium text-legal-700">Match:</span>{" "}
                    {(score * 100).toFixed(1)}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-legal-800">{doc.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {doc.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-legal-200 text-legal-700"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
