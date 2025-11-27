import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Zap, Clock, Video, Calendar, MessageCircle, Star, Quote, LucideIcon } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import packagesData from "@/data/packages.json";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Clock,
  Video,
  Calendar,
  MessageCircle,
};

interface Package {
  id: string;
  name: string;
  icon: string;
  price: string;
  originalPrice: string | null;
  perSession: string;
  savings: string | null;
  badge: string;
  featured: boolean;
  features: string[];
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  paymentNote: string | null;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

interface ProcessStep {
  icon: string;
  text: string;
}

export default function PricingSection() {
  const packages = packagesData.packages as Package[];
  const testimonials = packagesData.testimonials.items as Testimonial[];
  const processSteps = packagesData.directBookingProcess.steps as ProcessStep[];

  return (
    <section
      id="pricing"
      className="py-16 md:py-24"
      data-testid="section-pricing"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">{packagesData.sectionBadge}</Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-pricing-title"
          >
            Invest in Your <span className="text-primary">Career Growth</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {packagesData.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {packages.map((pkg) => {
            const IconComponent = iconMap[pkg.icon] || Zap;
            return (
              <Card 
                key={pkg.id}
                className={pkg.featured ? "border-2 border-primary relative overflow-hidden" : ""}
              >
                {pkg.featured && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                    {pkg.badge}
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className="w-5 h-5 text-primary" />
                    <CardTitle>{pkg.name}</CardTitle>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      {pkg.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">{pkg.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{pkg.perSession}</p>
                    {pkg.savings ? (
                      <Badge variant="secondary" className="mt-2">
                        {pkg.savings}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="mt-2">
                        {pkg.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.featured ? (
                    <>
                      <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" asChild>
                        <a
                          href={pkg.buttonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`button-${pkg.id}-cta`}
                        >
                          <SiWhatsapp className="w-4 h-4 mr-2" />
                          {pkg.buttonText}
                        </a>
                      </Button>
                      {pkg.paymentNote && (
                        <p className="text-xs text-center text-muted-foreground mt-3">
                          {pkg.paymentNote}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Button size="lg" variant="outline" className="w-full" asChild>
                        <a
                          href={pkg.buttonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`button-${pkg.id}-cta`}
                        >
                          {pkg.buttonText}
                        </a>
                      </Button>
                      {pkg.secondaryButtonLink && (
                        <Button size="lg" variant="ghost" className="w-full" asChild>
                          <a
                            href={pkg.secondaryButtonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`button-${pkg.id}-secondary`}
                          >
                            <SiWhatsapp className="w-4 h-4 mr-2 text-green-500" />
                            {pkg.secondaryButtonText}
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-muted/50 rounded-lg p-6 text-center mb-12">
          <h3 className="font-semibold mb-2">{packagesData.directBookingProcess.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            {processSteps.map((step, index) => {
              const StepIcon = iconMap[step.icon] || MessageCircle;
              return (
                <div key={index} className="flex items-center justify-center gap-2">
                  <StepIcon className={`w-4 h-4 ${
                    step.icon === "MessageCircle" ? "text-green-500" : 
                    step.icon === "Calendar" ? "text-primary" : "text-blue-500"
                  }`} />
                  <span>{step.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground mb-6">
            {packagesData.testimonials.title}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50" data-testid={`testimonial-pricing-${index}`}>
                <CardContent className="pt-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-primary/30 mb-2" />
                  <p className="text-sm italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
