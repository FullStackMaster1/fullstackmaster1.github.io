import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Target,
  MessageSquare,
  Presentation,
  FileText,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle,
  LucideIcon,
  Lightbulb,
  Code,
  TrendingUp,
  ChevronRight,
  Shield,
  Calendar,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import servicesData from "@/data/services.json";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";

const iconMap: Record<string, LucideIcon> = {
  Target,
  MessageSquare,
  Presentation,
  FileText,
  Users,
  Sparkles,
  Lightbulb,
  Code,
  TrendingUp,
};

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  popular: boolean;
}

interface CaseStudy {
  id: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  before: {
    title: string;
    subtitle: string;
    details: string;
  };
  coaching: {
    sessions: number;
    focus: string[];
    approach: string;
  };
  after: {
    title: string;
    highlight: string;
    details: string;
  };
}

export default function ServicesSection() {
  const { sectionBadge, sectionTitle, sectionTitleHighlight, sectionDescription, services, ctaButtons, caseStudies, caseStudyShowcase, popularBadgeText } = servicesData;
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const studies = caseStudies as CaseStudy[];

  return (
    <section
      id="services"
      className="py-10 md:py-14 bg-muted/30"
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">{sectionBadge}</Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-services-title"
          >
            {sectionTitle} <span className="text-primary">{sectionTitleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        <div className="mb-12" data-testid="card-case-studies">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Badge variant="secondary" className="mb-2">{caseStudyShowcase.badge}</Badge>
              <h3 className="text-2xl font-bold">{caseStudyShowcase.title}</h3>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>{caseStudyShowcase.privacyNote}</span>
            </div>
          </div>
          
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplayPlugin.current]}
            className="w-full"
            setApi={setApi}
            onMouseEnter={() => autoplayPlugin.current.stop()}
            onMouseLeave={() => autoplayPlugin.current.play()}
          >
            <CarouselContent className="-ml-4">
              {studies.map((study) => {
                const IconComponent = iconMap[study.icon] || TrendingUp;
                return (
                  <CarouselItem key={study.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                    <Card className="h-full overflow-hidden hover-elevate" data-testid={`card-case-${study.id}`}>
                      <div className={`bg-gradient-to-r ${study.gradientFrom} ${study.gradientTo} p-4 text-white`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-white/80 text-xs uppercase tracking-wide">Transformation</p>
                            <p className="font-semibold">{study.before.title} → {study.after.title}</p>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="text-center p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Before</p>
                            <p className="font-semibold text-sm text-red-600 dark:text-red-400">{study.before.subtitle}</p>
                          </div>
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg flex flex-col justify-center">
                            <p className="text-xs text-muted-foreground mb-1">Sessions</p>
                            <p className="font-bold text-lg text-primary">{study.coaching.sessions}</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Result</p>
                            <p className="font-semibold text-sm text-green-600 dark:text-green-400">{study.after.highlight}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Challenge</p>
                            <p className="text-sm">{study.before.details}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Coaching Focus</p>
                            <div className="flex flex-wrap gap-1">
                              {study.coaching.focus.map((item) => (
                                <Badge key={item} variant="outline" className="text-xs">{item}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Outcome</p>
                            <p className="text-sm text-green-600 dark:text-green-400 font-medium">{study.after.details}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious 
              className="hidden md:flex -left-4"
              data-testid="button-carousel-prev"
            />
            <CarouselNext 
              className="hidden md:flex -right-4"
              data-testid="button-carousel-next"
            />
          </Carousel>
          
          <div className="flex justify-center gap-2 mt-4">
            {studies.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                data-testid={`button-carousel-dot-${index}`}
              />
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Button asChild>
              <a
                href={caseStudyShowcase.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-book-session-preview"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {caseStudyShowcase.buttonText}
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {(services as Service[]).map((service) => {
            const IconComponent = iconMap[service.icon] || Target;
            return (
              <Card
                key={service.id}
                className={`hover-elevate cursor-pointer transition-all duration-200 relative ${
                  service.popular ? "border-primary/50" : ""
                }`}
                data-testid={`card-service-${service.id}`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-4">
                    <Badge className="bg-primary">{popularBadgeText}</Badge>
                  </div>
                )}
                <CardContent className="p-6 pt-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
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
            );
          })}
        </div>

        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a
                href={ctaButtons.primary.link}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-services-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4 mr-2" />
                {ctaButtons.primary.text}
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
              {ctaButtons.secondary.text}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
