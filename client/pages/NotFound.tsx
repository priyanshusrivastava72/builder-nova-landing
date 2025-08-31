import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, ArrowLeft, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>

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

    </Layout>
  );
}
