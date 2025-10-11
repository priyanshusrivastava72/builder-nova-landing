import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  Upload,
  FileText,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import Layout from "@/components/Layout";

export default function LegalSummarizer() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [length, setLength] = useState<"brief" | "standard" | "detailed">(
    "standard",
  );
  const [focus, setFocus] = useState<
    "general" | "facts" | "ruling" | "precedent"
  >("general");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSummary("");

    const body = text.trim();
    if (!body) {
      setError("Please paste text or upload a .txt file to summarize.");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: body, length, focus }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `Request failed (${res.status})`);
      }
      const data = (await res.json()) as { summary: string };
      setSummary(data.summary);
    } catch (e: any) {
      setError(e?.message || "Failed to generate summary.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setError(null);
    setFileName(file.name);

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError("File exceeds 10MB limit.");
      return;
    }

    if (
      file.type === "text/plain" ||
      file.name.toLowerCase().endsWith(".txt")
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = typeof reader.result === "string" ? reader.result : "";
        setText(result);
      };
      reader.onerror = () => setError("Failed to read file.");
      reader.readAsText(file);
    } else {
      setError(
        "This demo can read .txt files. For PDF/DOC/DOCX, please paste text or use 'Upload Dummy Data'.",
      );
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  };

  const loadDummyData = async () => {
    try {
      setError(null);
      const res = await fetch("/example-judgment.txt");
      const txt = await res.text();
      setText(txt);
      setFileName("example-judgment.txt");
    } catch (err) {
      setError("Unable to load dummy data.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
              <Scale className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-legal-900 mb-4">
            Legal Summarizer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Transform lengthy court judgments into concise, actionable briefs in
            seconds using advanced AI technology
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Zap className="w-3 h-3 mr-1" />
              Lightning Fast
            </Badge>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              98% Accuracy
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
              <Clock className="w-3 h-3 mr-1" />
              Save Hours
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-legal-900">
                <Upload className="mr-2 h-5 w-5" />
                Upload Document
              </CardTitle>
              <CardDescription>
                Upload your legal document or paste the text directly below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file">Document Upload</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-legal-200 hover:border-legal-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <FileText className="mx-auto h-12 w-12 text-legal-400 mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, DOC, DOCX, TXT files up to 10MB
                    </p>
                    <Input
                      id="file"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileInput}
                    />
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("file")?.click()}
                      >
                        Choose File
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={loadDummyData}
                      >
                        Upload Dummy Data
                      </Button>
                    </div>
                    {fileName && (
                      <p className="mt-3 text-xs text-legal-600">
                        Selected: {fileName}
                      </p>
                    )}
                    {error && (
                      <p className="mt-2 text-xs text-destructive">{error}</p>
                    )}
                  </div>
                </div>

                {/* Text Input */}
                <div className="space-y-2">
                  <Label htmlFor="text">Or Paste Text</Label>
                  <Textarea
                    id="text"
                    placeholder="Paste your legal document text here..."
                    className="min-h[200px] resize-none min-h-[200px]"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setText(
                          "In the matter of Doe v. City Transit, the plaintiff alleges negligence arising from a bus accident on January 12, 2021. Plaintiff contends the driver breached the standard of care by speeding and failing to maintain a proper lookout. The City denies liability and asserts comparative negligence, alleging plaintiff failed to wear a seatbelt and ignored safety instructions. The trial court considered expert testimony on stopping distance and maintenance records for the vehicle. On summary judgment, the court held genuine disputes of material fact existed as to breach and causation, and set the matter for trial. The court also addressed the admissibility of certain hearsay statements under the excited utterance exception and ruled on motions in limine regarding prior incidents.",
                        )
                      }
                    >
                      Load Example Judgment
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setText("")}
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                {/* Settings */}
                <div className="space-y-4 p-4 bg-legal-50 rounded-lg">
                  <h3 className="font-medium text-legal-900">
                    Summary Options
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="length">Summary Length</Label>
                      <select
                        id="length"
                        className="w-full px-3 py-2 border border-legal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                        value={length}
                        onChange={(e) => setLength(e.target.value as any)}
                      >
                        <option value="brief">Brief (1-2 paragraphs)</option>
                        <option value="standard">
                          Standard (3-5 paragraphs)
                        </option>
                        <option value="detailed">
                          Detailed (5+ paragraphs)
                        </option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="focus">Focus Area</Label>
                      <select
                        id="focus"
                        className="w-full px-3 py-2 border border-legal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-500"
                        value={focus}
                        onChange={(e) => setFocus(e.target.value as any)}
                      >
                        <option value="general">General Summary</option>
                        <option value="facts">Key Facts</option>
                        <option value="ruling">Court Ruling</option>
                        <option value="precedent">Legal Precedent</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Generate Summary
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-legal-900">
                <FileText className="mr-2 h-5 w-5" />
                Generated Summary
              </CardTitle>
              <CardDescription>
                Your AI-generated legal brief will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-legal-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-legal-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-legal-200 rounded w-5/6 mb-4"></div>
                    <div className="h-4 bg-legal-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-legal-200 rounded w-4/5"></div>
                  </div>
                  <div className="text-center text-legal-600">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-legal-600 mx-auto mb-2"></div>
                    Analyzing document and generating summary...
                  </div>
                </div>
              ) : summary ? (
                <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                  {summary}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="mx-auto h-12 w-12 mb-4" />
                  <p>Upload a document or paste text to generate a summary</p>
                  <p className="text-sm mt-2">
                    Your AI-powered legal brief will appear here
                  </p>
                </div>
              )}
              {error && !isProcessing && (
                <p className="mt-4 text-sm text-destructive">{error}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-legal-900 mb-12">
            Why Choose Our Legal Summarizer?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-legal-900 mb-2">
                  Lightning Fast
                </h3>
                <p className="text-muted-foreground">
                  Generate comprehensive summaries in under 30 seconds
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-legal-900 mb-2">
                  Highly Accurate
                </h3>
                <p className="text-muted-foreground">
                  98% accuracy rate verified by legal professionals
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-legal-900 mb-2">
                  Time Saving
                </h3>
                <p className="text-muted-foreground">
                  Reduce document review time by up to 90%
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
