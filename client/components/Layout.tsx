import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const scrollTo = (hash: string) => {
    if (location.pathname === "/") {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/${hash}`;
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-legal-50/30 to-gold-50/20">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-legal-600 to-legal-700 rounded-lg flex items-center justify-center">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-legal-800">LegalAI</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => scrollTo("#features")}
              className="text-muted-foreground hover:text-legal-700 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo("#about")}
              className="text-muted-foreground hover:text-legal-700 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="text-muted-foreground hover:text-legal-700 transition-colors"
            >
              Contact
            </button>
          </nav>
          <div className="flex items-center space-x-2">
            <a href="/#contact">
              <Button variant="ghost" className="text-legal-700">Sign In</Button>
            </a>
            <a href="/#contact">
              <Button className="bg-legal-700 hover:bg-legal-800">Get Started</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-legal-950 text-legal-200 py-12 px-4 mt-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-br from-legal-600 to-legal-700 rounded-lg flex items-center justify-center">
                  <Scale className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">LegalAI</span>
              </div>
              <p className="text-legal-300">
                Empowering legal professionals with cutting-edge AI technology
                for a more efficient practice.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/summarizer"
                    className="hover:text-white transition-colors"
                  >
                    Legal Summarizer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/case-finder"
                    className="hover:text-white transition-colors"
                  >
                    Case Finder
                  </Link>
                </li>
                <li>
                  <Link
                    to="/outcome-predictor"
                    className="hover:text-white transition-colors"
                  >
                    Outcome Predictor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal-assistant"
                    className="hover:text-white transition-colors"
                  >
                    Legal Assistant
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contract-analyzer"
                    className="hover:text-white transition-colors"
                  >
                    Contract Analyzer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/#about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/help"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs"
                    className="hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/api"
                    className="hover:text-white transition-colors"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    to="/status"
                    className="hover:text-white transition-colors"
                  >
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-legal-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 LegalAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
