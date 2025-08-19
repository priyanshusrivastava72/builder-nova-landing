import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, ArrowLeft, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-legal-50/30 to-gold-50/20">
      {/* Header - Same as Index.tsx */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-legal-600 to-legal-700 rounded-lg flex items-center justify-center">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-legal-800">LegalAI</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <a href="/#features" className="text-muted-foreground hover:text-legal-700 transition-colors">Features</a>
            <a href="/#about" className="text-muted-foreground hover:text-legal-700 transition-colors">About</a>
            <a href="/#contact" className="text-muted-foreground hover:text-legal-700 transition-colors">Contact</a>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="text-legal-700">Sign In</Button>
            <Button className="bg-legal-700 hover:bg-legal-800">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="text-center max-w-2xl mx-auto">
          <Card className="p-8 border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-legal-500 to-legal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                <MessageSquare className="h-10 w-10" />
              </div>
              <CardTitle className="text-3xl text-legal-900">Page Coming Soon</CardTitle>
              <CardDescription className="text-lg mt-4">
                This feature is currently in development. We're building something amazing!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-legal-50 rounded-lg p-6 border border-legal-200">
                <h3 className="font-semibold text-legal-800 mb-2">Want this page built?</h3>
                <p className="text-muted-foreground mb-4">
                  Continue the conversation with our AI assistant to have this specific feature page designed and implemented for you.
                </p>
                <div className="flex items-center justify-center text-sm text-legal-600">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask the AI to build this page in the chat
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className="bg-legal-700 hover:bg-legal-800 min-w-[140px]">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Button variant="outline" className="border-legal-200 hover:bg-legal-50 min-w-[140px]">
                  View All Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer - Simplified */}
      <footer className="bg-legal-950 text-legal-200 py-8 px-4 mt-auto">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-6 w-6 bg-gradient-to-br from-legal-600 to-legal-700 rounded-lg flex items-center justify-center">
              <Scale className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">LegalAI</span>
          </div>
          <p className="text-legal-300">&copy; 2024 LegalAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
