import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Zap, Clock, Video, Calendar, MessageCircle, Star, Quote, LucideIcon, ShieldCheck, Lock, BadgeCheck, Gift, Users, TrendingUp, DollarSign, ArrowRight, Infinity, BookOpen, Sparkles } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import packagesData from "@/data/packages.json";
import UrgencyBanner from "@/components/UrgencyBanner";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Clock,
  Video,
  Calendar,
  MessageCircle,
  TrendingUp,
  DollarSign,
  Gift,
  Infinity,
  BookOpen,
  Sparkles,
};

interface TopBenefit {
  icon: string;
  text: string;
  highlight: boolean;
}

interface Package {
  id: string;
  name: string;
  icon: string;
  price: string;
  originalPrice: string | null;
  perSession: string;
  savings: string | null;
  savingsPercent?: string;
  platformComparison?: string;
  badge: string;
  featured: boolean;
  topBenefits?: TopBenefit[];
  features: string[];
  howItWorks?: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  paymentNote: string | null;
  trustBadges?: string[];
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
      className="py-10 md:py-14 gradient-pricing relative"
      data-testid="section-pricing"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-2">{packagesData.sectionBadge}</Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-2"
            data-testid="text-pricing-title"
          >
            {packagesData.sectionTitle} <span className="text-primary">{packagesData.sectionTitleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {packagesData.sectionDescription}
          </p>
        </div>
        
        <UrgencyBanner />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {packages.map((pkg) => {
            const IconComponent = iconMap[pkg.icon] || Zap;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card 
                  className={pkg.featured 
                    ? "border-2 border-primary relative overflow-hidden bg-gradient-to-br from-primary/5 via-card to-green-500/5 shadow-lg" 
                    : "border border-border"
                  }
                >
                  {pkg.featured && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-r from-primary to-green-500 text-white px-6 py-1.5 text-sm font-bold rounded-bl-lg shadow-md">
                        <Sparkles className="w-3 h-3 inline mr-1" />
                        {pkg.badge}
                      </div>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`p-2 rounded-lg ${pkg.featured ? 'bg-primary/10' : 'bg-muted'}`}>
                        <IconComponent className={`w-5 h-5 ${pkg.featured ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-3">
                        <span className={`text-5xl font-bold ${pkg.featured ? 'text-primary' : ''}`}>{pkg.price}</span>
                        {pkg.originalPrice && (
                          <div className="flex flex-col">
                            <span className="text-xl text-muted-foreground line-through decoration-red-500 decoration-2">{pkg.originalPrice}</span>
                            <span className="text-xs text-red-500 font-medium">on platforms</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-muted-foreground">{pkg.perSession}</span>
                        {pkg.platformComparison && (
                          <span className="text-xs text-muted-foreground">({pkg.platformComparison})</span>
                        )}
                      </div>
                      
                      {pkg.savings && pkg.savingsPercent ? (
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold">
                            {pkg.savings}
                          </Badge>
                          <Badge variant="outline" className="border-green-500 text-green-600 font-bold">
                            {pkg.savingsPercent}
                          </Badge>
                        </div>
                      ) : pkg.badge && !pkg.featured ? (
                        <Badge variant="outline" className="mt-2">
                          {pkg.badge}
                        </Badge>
                      ) : null}
                    </div>
                    
                    {pkg.topBenefits && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {pkg.topBenefits.map((benefit, idx) => {
                          const BenefitIcon = iconMap[benefit.icon] || Check;
                          return (
                            <div 
                              key={idx}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                                benefit.highlight 
                                  ? 'bg-primary/10 text-primary border border-primary/20' 
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              <BenefitIcon className="w-3.5 h-3.5" />
                              {benefit.text}
                            </div>
                          );
                        })}
                      </div>
                    )}
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
                    
                    {pkg.howItWorks && (
                      <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
                        <p className="text-xs font-medium text-primary mb-1">How it works:</p>
                        <p className="text-sm text-muted-foreground">{pkg.howItWorks}</p>
                      </div>
                    )}
                    
                    {pkg.featured ? (
                      <>
                        <Button size="lg" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-lg" asChild>
                          <a
                            href={pkg.buttonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`button-${pkg.id}-cta`}
                          >
                            <SiWhatsapp className="w-5 h-5 mr-2" />
                            {pkg.buttonText}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                        
                        {pkg.trustBadges && (
                          <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {pkg.trustBadges.map((badge, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                <Check className="w-3 h-3 mr-1 text-green-500" />
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {pkg.paymentNote && (
                          <p className="mt-4 text-xs text-center text-muted-foreground">
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
              </motion.div>
            );
          })}
        </div>

        {packagesData.roiSection && (
          <motion.div 
            className="mb-12 bg-gradient-to-br from-primary/5 via-card to-primary/5 border border-primary/20 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <Badge variant="secondary" className="mb-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                {packagesData.roiSection.title}
              </Badge>
              <p className="text-sm text-muted-foreground">{packagesData.roiSection.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {packagesData.roiSection.items.map((item: { label: string; value: string; icon: string }, index: number) => {
                const ItemIcon = iconMap[item.icon] || TrendingUp;
                return (
                  <div 
                    key={index}
                    className={`text-center p-4 rounded-lg ${
                      index === 2 ? 'bg-primary/10 border-2 border-primary/30' : 'bg-card'
                    }`}
                  >
                    <ItemIcon className={`w-6 h-6 mx-auto mb-2 ${index === 2 ? 'text-primary' : 'text-muted-foreground'}`} />
                    <p className={`text-2xl font-bold ${index === 2 ? 'text-primary' : ''}`}>{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center space-y-2">
              <p className="font-semibold text-lg">{packagesData.roiSection.calculation}</p>
              <p className="text-sm text-muted-foreground">{packagesData.roiSection.context}</p>
            </div>
          </motion.div>
        )}

        <div className="bg-muted/50 rounded-lg p-6 mb-12">
          <h3 className="font-semibold mb-4 text-center">{packagesData.directBookingProcess.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            {processSteps.map((step, index) => {
              const StepIcon = iconMap[step.icon] || MessageCircle;
              return (
                <div key={index} className="flex items-start gap-3">
                  <StepIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
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

        {packagesData.satisfactionGuarantee && (
          <div className="mt-12 border border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50">
                <ShieldCheck className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{packagesData.satisfactionGuarantee.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {packagesData.satisfactionGuarantee.description}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {packagesData.satisfactionGuarantee.badges.map((badge, index) => {
                  const BadgeIcon = badge.icon === "BadgeCheck" ? BadgeCheck : badge.icon === "ShieldCheck" ? ShieldCheck : Lock;
                  const colorClass = badge.color === "green" ? "text-green-600" : badge.color === "blue" ? "text-blue-600" : "text-purple-600";
                  return (
                    <Badge key={index} variant="outline" className="bg-background">
                      <BadgeIcon className={`w-3 h-3 mr-1 ${colorClass}`} />
                      {badge.text}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {packagesData.referralBanner && (
          <div className="mt-8 bg-gradient-to-r from-primary/90 to-primary rounded-lg p-4 text-primary-foreground">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">{packagesData.referralBanner.title}</p>
                  <p className="text-sm opacity-90">{packagesData.referralBanner.description}</p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="whitespace-nowrap"
                asChild
              >
                <a
                  href={packagesData.referralBanner.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-referral"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  {packagesData.referralBanner.buttonText}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
