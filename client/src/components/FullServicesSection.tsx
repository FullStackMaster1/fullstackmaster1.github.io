import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Target,
  FileText,
  Compass,
  DollarSign,
  Users,
  GraduationCap,
  CheckCircle2,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import fullServicesData from "@/data/fullServices.json";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  FileText,
  Compass,
  DollarSign,
  Users,
  GraduationCap,
};

interface Service {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  stats?: string;
  personalNote?: string;
  highlights: string[];
  mockInterviewTypes?: string[];
  companiesWorkedAt?: string[];
  companiesCoachedFor?: string[];
  targetAudience?: string[];
  specializations?: string[];
  approach?: string[];
  popular: boolean;
}

interface Category {
  id: string;
  title: string;
  description: string;
  services: Service[];
}

export default function FullServicesSection() {
  const {
    sectionBadge,
    sectionTitle,
    sectionTitleHighlight,
    sectionDescription,
    categories,
    ctaSection,
  } = fullServicesData;

  return (
    <section
      id="full-services"
      className="py-20 bg-muted/30"
      data-testid="section-full-services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            {sectionBadge}
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-full-services-title"
          >
            {sectionTitle}{" "}
            <span className="text-primary">{sectionTitleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        {(categories as Category[]).map((category) => (
          <div key={category.id} className="mb-16" data-testid={`category-${category.id}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <div>
                <h3 className="text-2xl font-bold" data-testid={`text-category-title-${category.id}`}>
                  {category.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-category-desc-${category.id}`}>
                  {category.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {category.services.map((service) => {
                const IconComponent = iconMap[service.icon] || Target;
                return (
                  <Card
                    key={service.id}
                    className={`hover-elevate transition-all duration-200 relative ${
                      service.popular ? "border-primary/50" : ""
                    }`}
                    data-testid={`card-full-service-${service.id}`}
                  >
                    {service.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary" data-testid={`badge-popular-${service.id}`}>
                          <Sparkles className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl mb-1" data-testid={`text-service-title-${service.id}`}>
                            {service.title}
                          </CardTitle>
                          <p className="text-sm text-primary font-medium" data-testid={`text-service-tagline-${service.id}`}>
                            {service.tagline}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground" data-testid={`text-service-desc-${service.id}`}>
                        {service.description}
                      </p>

                      {service.stats && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge 
                            variant="outline" 
                            className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
                            data-testid={`badge-stats-${service.id}`}
                          >
                            {service.stats}
                          </Badge>
                        </div>
                      )}

                      {service.personalNote && (
                        <p 
                          className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3"
                          data-testid={`text-note-${service.id}`}
                        >
                          {service.personalNote}
                        </p>
                      )}

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          What you'll get:
                        </p>
                        <ul className="space-y-1.5" data-testid={`list-highlights-${service.id}`}>
                          {service.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                              data-testid={`text-highlight-${service.id}-${index}`}
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {service.mockInterviewTypes && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground">
                            Mock interview types:
                          </p>
                          <div className="flex flex-wrap gap-1.5" data-testid={`list-interview-types-${service.id}`}>
                            {service.mockInterviewTypes
                              .slice(0, 6)
                              .map((type, idx) => (
                                <Badge
                                  key={type}
                                  variant="outline"
                                  className="text-xs"
                                  data-testid={`badge-interview-type-${service.id}-${idx}`}
                                >
                                  {type}
                                </Badge>
                              ))}
                            {service.mockInterviewTypes.length > 6 && (
                              <Badge variant="outline" className="text-xs">
                                +{service.mockInterviewTypes.length - 6} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {service.companiesCoachedFor && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Coached for companies including:
                          </p>
                          <div className="flex flex-wrap gap-1.5" data-testid={`list-companies-${service.id}`}>
                            {service.companiesCoachedFor
                              .slice(0, 5)
                              .map((company, idx) => (
                                <Badge
                                  key={company}
                                  variant="secondary"
                                  className="text-xs"
                                  data-testid={`badge-company-${service.id}-${idx}`}
                                >
                                  {company}
                                </Badge>
                              ))}
                            {service.companiesCoachedFor.length > 5 && (
                              <Badge variant="secondary" className="text-xs">
                                +{service.companiesCoachedFor.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {service.targetAudience && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground">
                            Perfect for:
                          </p>
                          <div className="flex flex-wrap gap-1.5" data-testid={`list-audience-${service.id}`}>
                            {service.targetAudience.map((audience, idx) => (
                              <Badge
                                key={audience}
                                variant="outline"
                                className="text-xs"
                                data-testid={`badge-audience-${service.id}-${idx}`}
                              >
                                {audience}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {service.specializations && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground">
                            Tailored mentorship for:
                          </p>
                          <div className="flex flex-wrap gap-1.5" data-testid={`list-specializations-${service.id}`}>
                            {service.specializations.map((spec, idx) => (
                              <Badge
                                key={spec}
                                variant="outline"
                                className="text-xs"
                                data-testid={`badge-specialization-${service.id}-${idx}`}
                              >
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center mt-12 p-8 bg-card rounded-xl border" data-testid="section-full-services-cta">
          <h3 className="text-2xl font-bold mb-2" data-testid="text-cta-title">{ctaSection.title}</h3>
          <p className="text-muted-foreground mb-6" data-testid="text-cta-desc">{ctaSection.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a
                href={ctaSection.primaryButton.link}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-full-services-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4 mr-2" />
                {ctaSection.primaryButton.text}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.querySelector(
                  ctaSection.secondaryButton.anchor
                );
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid="button-full-services-pricing"
            >
              {ctaSection.secondaryButton.text}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
