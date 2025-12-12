import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Download } from "lucide-react";

export default function GumroadSection() {
  const resources = [
    {
      title: "CAMPERSO Framework",
      description: "Data Engineering Interviews",
      details: "Capture, Audit, Model, Persist, Expose, Resilience, Security, Observability",
      icon: "📘"
    },
    {
      title: "IFRAIL+T System Design",
      description: "FAANG-Level SDE + Architect Interviews",
      details: "Inputs, Functional Requirements, Resilience, Architecture, Integration, Latency, Tech Tradeoffs",
      icon: "🧱"
    },
    {
      title: "Behavioral STAR Builder",
      description: "Amazon Leadership Principles",
      details: "Craft impact-driven stories → Ownership, Dive Deep, Deliver Results, and more",
      icon: "🎯"
    },
    {
      title: "Senior Resume Booster",
      description: "Bar-Raising Impact Checklist",
      details: "Turn your resume into a compelling story of impact and scope",
      icon: "📄"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-4">
            <Badge variant="secondary">
              <Download className="w-3 h-3 mr-1" />
              Career Coaching Vault
            </Badge>
            <Badge className="bg-green-500 text-white border-0 animate-pulse">
              100% FREE
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Free</span> Frameworks & Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download my proven frameworks and checklists used to coach 4,000+ professionals through FAANG interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{resource.icon}</span>
                  <Badge variant="outline">{index + 1}</Badge>
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription className="text-sm">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{resource.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white">
            <a
              href="https://rupeshtiwari.gumroad.com/l/rupesh-kit"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-download-gumroad"
            >
              <Download className="w-4 h-4 mr-2" />
              Download All Frameworks Now
              <Badge className="ml-2 bg-white text-green-600 border-0 text-xs font-bold">FREE</Badge>
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No payment required. No credit card needed. Instant download.
          </p>
        </div>
      </div>
    </section>
  );
}
