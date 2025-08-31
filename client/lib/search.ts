import type { CaseDoc } from "@/data/cases";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export type TfIdfIndex = {
  vocab: Map<string, number>;
  idf: Float64Array;
  docs: CaseDoc[];
  docVectors: Float64Array[];
};

export function buildIndex(docs: CaseDoc[]): TfIdfIndex {
  const vocab = new Map<string, number>();
  const docTokens: string[][] = docs.map((d) =>
    tokenize(`${d.title} ${d.summary} ${d.fullText} ${d.tags.join(" ")}`),
  );

  // Build vocab
  for (const tokens of docTokens) {
    for (const t of new Set(tokens)) {
      if (!vocab.has(t)) vocab.set(t, vocab.size);
    }
  }

  const df = new Float64Array(vocab.size);
  for (const tokens of docTokens) {
    const seen = new Set<number>();
    for (const t of tokens) {
      const id = vocab.get(t)!;
      if (!seen.has(id)) {
        df[id] += 1;
        seen.add(id);
      }
    }
  }
  const N = docs.length;
  const idf = new Float64Array(vocab.size);
  for (let i = 0; i < vocab.size; i++)
    idf[i] = Math.log((N + 1) / (df[i] + 1)) + 1; // smoothed IDF

  const docVectors = docTokens.map((tokens) => tfidf(tokens, vocab, idf));
  return { vocab, idf, docs, docVectors };
}

function tfidf(
  tokens: string[],
  vocab: Map<string, number>,
  idf: Float64Array,
): Float64Array {
  const tf = new Map<number, number>();
  for (const t of tokens) {
    const id = vocab.get(t);
    if (id === undefined) continue;
    tf.set(id, (tf.get(id) || 0) + 1);
  }
  const vec = new Float64Array(idf.length);
  let norm = 0;
  for (const [id, freq] of tf) {
    const w = (1 + Math.log(freq)) * idf[id];
    vec[id] = w;
    norm += w * w;
  }
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < vec.length; i++) vec[i] /= norm;
  return vec;
}

function cosine(a: Float64Array, b: Float64Array): number {
  const len = Math.min(a.length, b.length);
  let sum = 0;
  for (let i = 0; i < len; i++) sum += a[i] * b[i];
  return sum;
}

export type SearchResult = { doc: CaseDoc; score: number };

export function search(
  index: TfIdfIndex,
  query: string,
  k = 5,
): SearchResult[] {
  const qv = tfidf(tokenize(query), index.vocab, index.idf);
  const scores = index.docVectors.map((dv) => cosine(qv, dv));
  const results = index.docs
    .map((doc, i) => ({ doc, score: scores[i] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
  return results;
}
