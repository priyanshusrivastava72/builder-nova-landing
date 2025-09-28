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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    toast({
      title: `Thanks, ${String(data.get("name") || "") || "we'll be in touch"}`,
      description: "Your message has been received.",
    });
    e.currentTarget.reset();
  };
  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-legal-900">Contact Us</h1>
            <p className="text-muted-foreground mt-2">
              We\'ll respond within 1 business day
            </p>
          </div>
          <div className="mb-8 p-6 rounded-2xl border border-legal-200 bg-white/70 shadow-sm">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-legal-100 text-legal-800 flex items-center justify-center"><Mail className="w-5 h-5"/></div>
                <div>
                  <div className="font-medium text-legal-900">Email</div>
                  <div>contact@legalai.app</div>
                  <div className="text-sm text-muted-foreground">support@legalai.app</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-legal-100 text-legal-800 flex items-center justify-center"><Phone className="w-5 h-5"/></div>
                <div>
                  <div className="font-medium text-legal-900">Phone</div>
                  <div>+1 (415) 555-0132</div>
                  <div className="text-sm text-muted-foreground">Mon–Fri, 9:00–18:00 PT</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-legal-100 text-legal-800 flex items-center justify-center"><MapPin className="w-5 h-5"/></div>
                <div>
                  <div className="font-medium text-legal-900">Office</div>
                  <div>123 Market St, San Francisco, CA</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-legal-100 text-legal-800 flex items-center justify-center"><Clock className="w-5 h-5"/></div>
                <div>
                  <div className="font-medium text-legal-900">Hours</div>
                  <div>Mon–Fri</div>
                  <div className="text-sm text-muted-foreground">9:00 AM – 6:00 PM (PT)</div>
                </div>
              </div>
            </div>
          </div>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-legal-900">Send a message</CardTitle>
              <CardDescription>Tell us about your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" name="name" required placeholder="Jane Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="jane@firm.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+1 415 555 0132" />
                  </div>
                  <div>
                    <Label htmlFor="org">Firm / Company</Label>
                    <Input id="org" name="org" placeholder="Acme Legal" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell us about your needs..."
                    className="min-h-[140px]"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-legal-700 hover:bg-legal-800"
                  >
                    Send message
                  </Button>
                  <Button asChild variant="outline">
                    <a href="/#features">Explore features</a>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
