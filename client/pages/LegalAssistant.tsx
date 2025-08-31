import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Sparkles, BookOpen, Link as LinkIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CASES } from "@/data/cases";
import { buildIndex, search } from "@/lib/search";

interface Msg { role: 'user' | 'assistant'; text: string; sources?: { title: string; snippet: string }[] }

export default function LegalAssistant() {
  const [messages, setMessages] = useState<Msg[]>([{
    role: 'assistant',
    text: 'Hello! I\'m your Legal Assistant. Ask me about legal concepts, precedents, or contract clauses. I\'ll cite relevant cases when possible.'
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const idxRef = useRef<ReturnType<typeof buildIndex> | null>(null);

  useEffect(() => { idxRef.current = buildIndex(CASES); }, []);

  const ask = async () => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    setMessages((m)=> [...m, { role: 'user', text: q }]);
    setLoading(true);

    // Retrieve relevant cases
    const idx = idxRef.current!;
    const retrieved = search(idx, q, 3);

    // Craft a heuristic answer using retrieved snippets
    const sources = retrieved.map(r => ({
      title: r.doc.title,
      snippet: pickSnippet(r.doc.fullText, q)
    }));

    const answer = buildAnswer(q, sources);

    await new Promise(r => setTimeout(r, 400));
    setMessages((m)=> [...m, { role: 'assistant', text: answer, sources }]);
    setLoading(false);
  };

  return (
    <Layout>
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-legal-100 text-legal-800 mb-3">
              <Sparkles className="w-3 h-3" /> Conversational Legal AI
            </div>
            <h1 className="text-4xl font-bold text-legal-900">Legal Assistant</h1>
            <p className="text-muted-foreground mt-2">Ask questions and get answers with citations to related cases</p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-legal-900">Chat</CardTitle>
              <CardDescription>We\'ll retrieve relevant cases and compose an answer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[420px] overflow-y-auto space-y-4 p-4 bg-legal-50 rounded-lg border border-legal-200">
                {messages.map((m, i)=> (
                  <div key={i} className={`max-w-[85%] ${m.role==='user'? 'ml-auto text-right':''}`}>
                    <div className={`inline-block px-4 py-3 rounded-2xl ${m.role==='user'? 'bg-legal-700 text-white':'bg-white border border-legal-200 text-legal-900'}`}>
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    </div>
                    {m.sources && m.sources.length>0 && (
                      <div className="mt-2 space-y-2">
                        {m.sources.map((s, j)=> (
                          <div key={j} className="text-sm p-3 bg-white border border-legal-200 rounded-lg">
                            <div className="font-medium text-legal-900 flex items-center gap-2"><BookOpen className="w-4 h-4"/> {s.title}</div>
                            <div className="text-muted-foreground mt-1">{s.snippet}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="text-sm text-muted-foreground">Thinking…</div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <Input value={input} onChange={(e)=> setInput(e.target.value)} placeholder="e.g. What is an audit clause and how is it enforced?" onKeyDown={(e)=> { if (e.key==='Enter') ask(); }} />
                <Button onClick={ask} disabled={loading}>Send</Button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {['breach of contract damages','probable cause for search','comparative negligence','trade secret injunction'].map((s)=> (
                  <button key={s} onClick={()=> setInput(s)} className="px-3 py-1 rounded-full bg-legal-50 border border-legal-200 text-legal-700 hover:bg-legal-100 text-sm">{s}</button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

function pickSnippet(text: string, q: string) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  let best = sentences[0] || text.slice(0, 140);
  let bestScore = -1;
  for (const s of sentences) {
    const sc = terms.reduce((acc, t)=> acc + (s.toLowerCase().includes(t)? 1: 0), 0) + s.length/500;
    if (sc > bestScore) { bestScore = sc; best = s; }
  }
  return best;
}

function buildAnswer(q: string, sources: { title: string; snippet: string }[]) {
  const intro = `Here\'s what applies to your question: ${q}`;
  const bullets = sources.map((s)=> `- ${s.title}: ${s.snippet}`);
  const outro = `These cases provide guidance. Always interpret in your jurisdictional context.`;
  return [intro, '', ...bullets, '', outro].join("\n");
}
