import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
  Video,
  CheckCircle,
  LucideIcon,
  Lightbulb,
  Code,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import servicesData from "@/data/services.json";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";

import lpImage from "@assets/2_1764272631453.png";
import sysDesignImage from "@assets/1_1764272631453.png";
import resumeImage from "@assets/3_1764272631453.png";
import codingImage from "@assets/image_1764273039071.png";

const iconMap: Record<string, LucideIcon> = {
  Target,
  MessageSquare,
  Presentation,
  FileText,
  Users,
  Sparkles,
  Lightbulb,
  Code,
};

const imageMap: Record<string, string> = {
  "2_1764272631453.png": lpImage,
  "1_1764272631453.png": sysDesignImage,
  "3_1764272631453.png": resumeImage,
  "image_1764273039071.png": codingImage,
};

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  popular: boolean;
}

interface SessionDemo {
  id: string;
  title: string;
  subtitle: string;
  imagePath: string;
  icon: string;
  showcaseTitle: string;
  showcaseDescription: string;
  showcaseFeatures: string[];
}

export default function ServicesSection() {
  const { sectionBadge, sectionTitle, sectionTitleHighlight, sectionDescription, liveSessionShowcase, services, ctaButtons, sessionDemos, popularBadgeText } = servicesData;
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
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

  const currentDemo = (sessionDemos as SessionDemo[])[currentIndex];

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-muted/30"
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

        <Card className="mb-12 overflow-hidden border-primary/20" data-testid="card-coaching-preview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative">
              <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[autoplayPlugin.current]}
                className="w-full"
                setApi={setApi}
                onMouseEnter={() => autoplayPlugin.current.stop()}
                onMouseLeave={() => autoplayPlugin.current.play()}
              >
                <CarouselContent>
                  {(sessionDemos as SessionDemo[]).map((demo) => {
                    const IconComponent = iconMap[demo.icon] || Presentation;
                    const imageSrc = imageMap[demo.imagePath];
                    return (
                      <CarouselItem key={demo.id}>
                        <div className="relative aspect-video">
                          <img
                            src={imageSrc}
                            alt={demo.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <Badge className="bg-red-500 text-white">
                              <Video className="w-3 h-3 mr-1" />
                              {liveSessionShowcase.liveBadge}
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4 text-white" />
                                <span className="text-white font-medium text-sm">{demo.title}</span>
                                <span className="text-white/70 text-xs">• {demo.subtitle}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            </div>
            <CardContent className="p-6 lg:p-8 flex flex-col justify-center">
              <Badge variant="outline" className="w-fit mb-4">{liveSessionShowcase.badge}</Badge>
              <h3 className="text-2xl font-bold mb-4 transition-all duration-300" data-testid="text-showcase-title">
                {currentDemo?.showcaseTitle}
              </h3>
              <p className="text-muted-foreground mb-6 transition-all duration-300">
                {currentDemo?.showcaseDescription}
              </p>
              <ul className="space-y-3 mb-6">
                {currentDemo?.showcaseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-fit">
                <a
                  href={liveSessionShowcase.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-book-session-preview"
                >
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  {liveSessionShowcase.buttonText}
                </a>
              </Button>
            </CardContent>
          </div>
        </Card>

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
