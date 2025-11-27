import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Target, Map, Video, MessageCircle, CheckCircle, LucideIcon } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import methodologyData from "@/data/methodology.json";

const iconMap: Record<string, LucideIcon> = {
  Phone,
  Target,
  Map,
  Video,
  MessageCircle,
};

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  free: boolean;
}

export default function MethodologySection() {
  const { sectionBadge, sectionTitle, sectionTitleHighlight, sectionDescription, steps, transparency, cta } = methodologyData;

  return (
    <section
      id="methodology"
      className="py-16 md:py-24 bg-muted/30"
      data-testid="section-methodology"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">{sectionBadge}</Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-methodology-title"
          >
            {sectionTitle} <span className="text-primary">{sectionTitleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
          
          <div className="space-y-8">
            {(steps as Step[]).map((step, index) => {
              const IconComponent = iconMap[step.icon] || Phone;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={step.number}
                  className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <Card className="inline-block w-full max-w-md hover-elevate">
                      <CardContent className="p-6">
                        <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : ""}`}>
                          <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                          <div>
                            <h3 className="font-semibold text-lg">{step.title}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{step.duration}</span>
                              {step.free && (
                                <Badge variant="secondary" className="text-xs">Free</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-primary-foreground" />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
          <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900 max-w-md">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">
                {transparency.title}
              </h3>
              <ul className="space-y-2">
                {transparency.points.map((point, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button size="lg" asChild>
            <a
              href={cta.link}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-methodology-cta"
            >
              <SiWhatsapp className="w-4 h-4 mr-2" />
              {cta.text}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
