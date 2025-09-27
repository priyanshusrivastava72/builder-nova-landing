import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Users, Award, Shield } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-legal-900">About LegalAI</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              We build AI-first tools that elevate legal practice. Our mission
              is to make research, drafting, and decision-making faster, more
              accurate, and more accessible.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-legal-700 text-white mx-auto flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <CardTitle className="text-legal-900">Privacy-first</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built with enterprise-grade security and data protection at
                  the core.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-legal-700 text-white mx-auto flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle className="text-legal-900">Expert-led</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Developed with input from experienced attorneys and
                  researchers.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-legal-700 text-white mx-auto flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <CardTitle className="text-legal-900">
                  Quality & Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Interpretable outputs and rigorous evaluation ensure trust.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
