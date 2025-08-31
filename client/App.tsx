import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LegalSummarizer from "./pages/LegalSummarizer";
import CaseFinder from "./pages/CaseFinder";
import OutcomePredictor from "./pages/OutcomePredictor";
import LegalAssistant from "./pages/LegalAssistant";
import ContractAnalyzer from "./pages/ContractAnalyzer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/summarizer" element={<LegalSummarizer />} />
          <Route path="/case-finder" element={<CaseFinder />} />
          <Route path="/outcome-predictor" element={<OutcomePredictor />} />
          <Route path="/legal-assistant" element={<LegalAssistant />} />
          <Route path="/contract-analyzer" element={<ContractAnalyzer />} />
          <Route path="/about" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          <Route path="/careers" element={<NotFound />} />
          <Route path="/privacy" element={<NotFound />} />
          <Route path="/help" element={<NotFound />} />
          <Route path="/docs" element={<NotFound />} />
          <Route path="/api" element={<NotFound />} />
          <Route path="/status" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
