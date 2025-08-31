import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Scale, Search, TrendingUp, MessageSquare, Shield, Sparkles, Users, Award, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

import Layout from "@/components/Layout";

export default function Index() {
  const features = [
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Legal Summarizer",
      description: "Transform lengthy court judgments into concise, actionable briefs in seconds",
      color: "from-blue-500 to-blue-600",
      href: "/summarizer"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Case Finder",
      description: "Lightning-fast retrieval of similar past cases with AI-powered search",
      color: "from-purple-500 to-purple-600",
      href: "/case-finder"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Outcome Predictor",
      description: "Data-driven probability analysis for case outcomes and success rates",
      color: "from-green-500 to-green-600",
      href: "/outcome-predictor"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Legal Assistant",
      description: "AI-powered chatbot for instant answers to complex legal questions",
      color: "from-orange-500 to-orange-600",
      href: "/legal-assistant"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Contract Risk Detector",
      description: "Intelligent analysis to identify and flag risky or unfair contract terms",
      color: "from-red-500 to-red-600",
      href: "/contract-analyzer"
    }
  ];

  const stats = [
    { number: "50K+", label: "Cases Analyzed" },
    { number: "98%", label: "Accuracy Rate" },
    { number: "2.5M+", label: "Documents Processed" },
    { number: "24/7", label: "AI Assistance" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Partner",
      firm: "Johnson & Associates",
      quote: "This platform has revolutionized how we handle case research. What used to take hours now takes minutes."
    },
    {
      name: "Michael Chen",
      role: "Corporate Lawyer",
      firm: "Tech Legal Group",
      quote: "The contract risk detector has saved us from numerous potential legal pitfalls. Invaluable tool."
    }
  ];

  return (
    <Layout>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-legal-100 text-legal-800 hover:bg-legal-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by Advanced AI
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-legal-900 mb-6 leading-tight">
            The Future of
            <span className="block bg-gradient-to-r from-legal-600 to-gold-600 bg-clip-text text-transparent">
              Legal Intelligence
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Harness the power of AI to transform your legal practice. From case analysis to contract review, 
            we provide the intelligent tools that modern legal professionals need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-legal-700 hover:bg-legal-800 text-lg px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-legal-200 hover:bg-legal-50">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-legal-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-gold-400">{stat.number}</div>
                <div className="text-legal-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-legal-900 mb-4">
              Complete Legal AI Suite
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Five powerful tools designed to streamline every aspect of your legal workflow
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Link key={index} to={feature.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md group">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-legal-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <div className="flex items-center mt-4 text-legal-600 group-hover:text-legal-700 transition-colors">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-legal-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-legal-900 mb-4">
              Trusted by Legal Professionals
            </h2>
            <p className="text-xl text-muted-foreground">
              See how LegalAI is transforming law practices worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 text-gold-500">★</div>
                    ))}
                  </div>
                  <blockquote className="text-lg text-legal-800 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-legal-500 to-legal-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-legal-900">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.firm}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-legal-800 to-legal-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Legal Practice?
          </h2>
          <p className="text-xl text-legal-200 mb-8 max-w-2xl mx-auto">
            Join thousands of legal professionals who are already using AI to work smarter, not harder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-gold-900 font-semibold text-lg px-8">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-legal-300 text-legal-100 hover:bg-legal-700">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

    </Layout>
  );
}
