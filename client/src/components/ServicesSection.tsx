import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  MessageSquare,
  Presentation,
  FileText,
  Users,
  Sparkles,
  ArrowRight,
  Video,
  CheckCircle,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import teachingImage from "@assets/image_1764264908413.png";

const services = [
  {
    title: "System Design for Leaders",
    description: "End-to-end system design coaching for Staff+, Director, and VP-level technical interviews. Learn to communicate architecture decisions under pressure.",
    icon: Target,
    features: ["FAANG-style prompts", "Trade-off analysis", "Scalability patterns"],
    popular: true,
  },
  {
    title: "Behavioral & LP Mastery",
    description: "Master Amazon Leadership Principles and behavioral interviews with real stories, not buzzwords. Bar-raiser ready answers for senior roles.",
    icon: MessageSquare,
    features: ["STAR framework", "Amazon LPs deep-dive", "Story structuring"],
    popular: true,
  },
  {
    title: "Executive Communication",
    description: "Learn to speak to Directors, VPs, and C-suite with confidence. Compress complex ideas into executive-ready narratives.",
    icon: Presentation,
    features: ["Exec-level framing", "Stakeholder influence", "Presentation skills"],
    popular: false,
  },
  {
    title: "Strategic Intro Pitch",
    description: "Craft a compelling 2-minute introduction that positions you as the obvious hire. First impressions that open doors.",
    icon: Sparkles,
    features: ["Value proposition", "Personal branding", "Interview opening"],
    popular: false,
  },
  {
    title: "Resume Optimization",
    description: "Transform your resume to showcase leadership impact, not just tasks. Quantified achievements that pass senior-level screens.",
    icon: FileText,
    features: ["Impact-driven bullets", "ATS optimization", "Role alignment"],
    popular: false,
  },
  {
    title: "5-Session Coaching Package",
    description: "Comprehensive interview prep covering all areas. Book directly and save $105 vs platform pricing. Same quality, better value.",
    icon: Users,
    features: ["$600 total ($120/session)", "Personalized prep plan", "Priority scheduling"],
    popular: true,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-muted/30"
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">For Senior Leaders</Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-services-title"
          >
            Coaching Services for{" "}
            <span className="text-primary">Technical Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Structured, rubric-based coaching for Senior Managers, Directors, and VPs 
            targeting FAANG and top-tier tech companies.
          </p>
        </div>

        <Card className="mb-12 overflow-hidden border-primary/20" data-testid="card-coaching-preview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative aspect-video lg:aspect-auto">
              <img
                src={teachingImage}
                alt="Rupesh Tiwari coaching a student on system design with live whiteboarding"
                className="w-full h-full object-cover"
                data-testid="img-teaching"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white">
                  <Video className="w-3 h-3 mr-1" />
                  Live Session
                </Badge>
              </div>
            </div>
            <CardContent className="p-6 lg:p-8 flex flex-col justify-center">
              <Badge variant="outline" className="w-fit mb-4">How I Coach</Badge>
              <h3 className="text-2xl font-bold mb-4">
                Real-Time System Design Whiteboarding
              </h3>
              <p className="text-muted-foreground mb-6">
                Every session is a live, interactive experience. I use Excalidraw for real-time 
                system design diagrams, walking you through architecture decisions, trade-offs, 
                and the exact patterns FAANG interviewers look for.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>1:1 video sessions via Google Meet</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Live whiteboarding with real-time feedback</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Session recordings for later review</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Post-session notes & action items</span>
                </li>
              </ul>
              <Button asChild className="w-fit">
                <a
                  href="https://wa.me/16094424081?text=Hi%20Rupesh,%20I'd%20like%20to%20book%20a%20coaching%20session."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-book-session-preview"
                >
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  Book Your Session
                </a>
              </Button>
            </CardContent>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <Card
              key={service.title}
              className={`hover-elevate cursor-pointer transition-all duration-200 relative ${
                service.popular ? "border-primary/50" : ""
              }`}
              data-testid={`card-service-${service.title.toLowerCase().replace(/ /g, "-")}`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-4">
                  <Badge className="bg-primary">Popular</Badge>
                </div>
              )}
              <CardContent className="p-6 pt-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a
                href="https://wa.me/16094424081?text=Hi%20Rupesh,%20I'm%20interested%20in%20your%20coaching%20services."
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-services-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4 mr-2" />
                Connect on WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.querySelector("#pricing");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid="button-view-pricing"
            >
              View Pricing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
