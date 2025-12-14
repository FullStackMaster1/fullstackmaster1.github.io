import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Users, 
  ArrowRight,
  Check,
  X,
  Video,
  Clock,
  Brain,
  AlertCircle,
  Layers,
  MessageSquare,
  Mic,
  Star,
  DollarSign,
  Award,
  MessageCircle,
  ChevronRight,
  Sparkles,
  BookOpen
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollReveal from "@/components/ScrollReveal";
import cohortData from "@/data/cohortProgram.json";
import profile from "@/data/profile.json";
import { trackEvent } from "@/lib/analytics";
import { SectionShareButtons } from "@/components/SocialShare";

const painIconMap: Record<string, typeof Video> = {
  Video,
  Clock,
  Users,
  Brain,
  AlertCircle
};

const pillarIconMap: Record<string, typeof Layers> = {
  Layers,
  MessageSquare,
  Mic
};

export default function CohortProgram() {
  const handleCTAClick = (ctaType: string) => {
    trackEvent("cta_click", "cohort_program", ctaType);
  };

  const handleFAQClick = (faqIndex: number) => {
    trackEvent("faq_toggle", "cohort_program", `faq_${faqIndex}`);
  };

  const whatsappMessage = encodeURIComponent("Hi Rupesh, I'm interested in the Cohort Program. Can you tell me more about upcoming dates?");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{cohortData.seo.title}</title>
        <meta name="description" content={cohortData.seo.description} />
        <meta name="keywords" content={cohortData.seo.keywords.join(", ")} />
        <link rel="canonical" href="https://www.fullstackmaster.net/cohort" />
        <meta property="og:title" content={cohortData.seo.title} />
        <meta property="og:description" content={cohortData.seo.description} />
        <meta property="og:url" content="https://www.fullstackmaster.net/cohort" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.fullstackmaster.net/og-image.png" />
        <meta property="og:site_name" content="FullStack Master" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={cohortData.seo.title} />
        <meta name="twitter:description" content={cohortData.seo.description} />
        <meta name="author" content={profile.personal.name} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "FAANG Interview Cohort Program",
            "description": cohortData.seo.description,
            "provider": {
              "@type": "Person",
              "name": profile.personal.name,
              "url": "https://www.fullstackmaster.net"
            },
            "offers": {
              "@type": "Offer",
              "price": cohortData.pricing.price,
              "priceCurrency": cohortData.pricing.currency,
              "availability": "https://schema.org/LimitedAvailability"
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "duration": "P5W"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": cohortData.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.fullstackmaster.net/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://www.fullstackmaster.net/#services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Cohort Program",
                "item": "https://www.fullstackmaster.net/cohort"
              }
            ]
          })}
        </script>
      </Helmet>

      <Navigation />
      <Breadcrumb items={[
        { label: "Services", href: "/#services" },
        { label: "Cohort Program" }
      ]} />

      <main className="pt-20" data-testid="cohort-main-content">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background" data-testid="section-hero">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4" data-testid="badge-hero">
                <Users className="w-3 h-3 mr-1" />
                {cohortData.hero.badge}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="text-cohort-hero-title">
                {cohortData.hero.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-primary font-medium mb-4" data-testid="text-cohort-hero-subtitle">
                {cohortData.hero.subtitle}
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="text-cohort-hero-description">
                {cohortData.hero.description}
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-10" data-testid="container-hero-stats">
                {cohortData.hero.stats.map((stat, idx) => (
                  <div key={idx} className="text-center px-4" data-testid={`stat-hero-${idx}`}>
                    <div className="text-3xl md:text-4xl font-bold text-primary" data-testid={`text-stat-value-${idx}`}>{stat.value}</div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-stat-label-${idx}`}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => {
                    handleCTAClick("hero_reserve_spot");
                    window.open(`${profile.contact.whatsappLink}?text=${whatsappMessage}`, "_blank");
                  }}
                  data-testid="button-cohort-hero-cta"
                >
                  {cohortData.cta.primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    handleCTAClick("hero_whatsapp");
                    window.open(`${profile.contact.whatsappLink}?text=${whatsappMessage}`, "_blank");
                  }}
                  data-testid="button-cohort-hero-whatsapp"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {cohortData.cta.secondary}
                </Button>
              </div>

              <p className="mt-6 text-sm text-muted-foreground" data-testid="text-cohort-urgency">
                {cohortData.cta.urgency}
              </p>
              
              <SectionShareButtons sectionName="FAANG Interview Cohort Program" className="mt-6" />
            </div>
          </div>
        </section>

        <ScrollReveal type="slide-up">
          <section className="py-16 bg-card/50" data-testid="section-pain-points">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-pain-points-title">
                  {cohortData.painPoints.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-pain-points-subtitle">
                  {cohortData.painPoints.subtitle}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cohortData.painPoints.items.map((item, idx) => {
                  const IconComponent = painIconMap[item.icon] || AlertCircle;
                  return (
                    <Card key={idx} className="hover-elevate" data-testid={`card-pain-${idx}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-destructive/10">
                            <IconComponent className="h-5 w-5 text-destructive" />
                          </div>
                          <div>
                            <p className="font-medium mb-2" data-testid={`text-pain-${idx}`}>{item.pain}</p>
                            <p className="text-sm text-muted-foreground" data-testid={`text-reality-${idx}`}>{item.reality}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="fade">
          <section className="py-16" data-testid="section-transformation">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-transformation-title">
                  {cohortData.transformation.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-transformation-subtitle">
                  {cohortData.transformation.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-destructive/20 bg-destructive/5" data-testid="card-before">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive" data-testid="text-before-title">
                      <X className="h-5 w-5" />
                      Before the Cohort
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {cohortData.transformation.before.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3" data-testid={`item-before-${idx}`}>
                          <X className="h-4 w-4 mt-1 text-destructive shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-primary/5" data-testid="card-after">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary" data-testid="text-after-title">
                      <Check className="h-5 w-5" />
                      After 5 Saturdays
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {cohortData.transformation.after.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3" data-testid={`item-after-${idx}`}>
                          <Check className="h-4 w-4 mt-1 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="scale">
          <section className="py-16 bg-card/50" data-testid="section-curriculum">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-curriculum-title">
                  {cohortData.curriculum.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-curriculum-subtitle">
                  {cohortData.curriculum.subtitle}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {cohortData.curriculum.pillars.map((pillar) => {
                  const IconComponent = pillarIconMap[pillar.icon] || Layers;
                  return (
                    <Card key={pillar.id} className="hover-elevate" data-testid={`card-pillar-${pillar.id}`}>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant="secondary" data-testid={`badge-weeks-${pillar.id}`}>{pillar.weeks}</Badge>
                        </div>
                        <CardTitle className="text-xl" data-testid={`text-pillar-name-${pillar.id}`}>{pillar.name}</CardTitle>
                        <p className="text-sm text-muted-foreground" data-testid={`text-pillar-desc-${pillar.id}`}>{pillar.description}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {pillar.topics.map((topic, topicIdx) => (
                            <li key={topicIdx} className="flex items-start gap-2 text-sm" data-testid={`item-topic-${pillar.id}-${topicIdx}`}>
                              <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="slide-up">
          <section className="py-16" data-testid="section-schedule">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-schedule-title">
                  {cohortData.schedule.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-schedule-subtitle">
                  {cohortData.schedule.subtitle}
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
                  
                  {cohortData.schedule.weeks.map((week) => (
                    <div key={week.week} className="relative pl-12 pb-8 last:pb-0" data-testid={`schedule-week-${week.week}`}>
                      <div className="absolute left-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold" data-testid={`badge-week-${week.week}`}>
                        {week.week}
                      </div>
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="text-lg font-semibold mb-2" data-testid={`text-week-title-${week.week}`}>{week.title}</h3>
                          <p className="text-muted-foreground mb-3" data-testid={`text-week-focus-${week.week}`}>{week.focus}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="font-medium">Deliverable:</span>
                            <span className="text-muted-foreground" data-testid={`text-week-deliverable-${week.week}`}>{week.deliverable}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="fade">
          <section className="py-16 bg-card/50" data-testid="section-who-is-this-for">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-who-title">
                  {cohortData.whoIsThisFor.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-who-subtitle">
                  {cohortData.whoIsThisFor.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="border-primary/20" data-testid="card-ideal-for">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary" data-testid="text-ideal-title">
                      <Check className="h-5 w-5" />
                      Perfect For You If...
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {cohortData.whoIsThisFor.idealFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3" data-testid={`item-ideal-${idx}`}>
                          <Check className="h-4 w-4 mt-1 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-muted" data-testid="card-not-for">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-muted-foreground" data-testid="text-notfor-title">
                      <X className="h-5 w-5" />
                      Not the Right Fit If...
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {cohortData.whoIsThisFor.notFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3" data-testid={`item-notfor-${idx}`}>
                          <X className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="scale">
          <section className="py-16" data-testid="section-pricing">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-pricing-title">
                  {cohortData.pricing.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-pricing-subtitle">
                  {cohortData.pricing.subtitle}
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="border-primary overflow-hidden" data-testid="card-pricing">
                  <div className="bg-primary text-primary-foreground p-6 text-center">
                    <p className="text-sm uppercase tracking-wide mb-2" data-testid="text-pricing-label">Complete 5-Week Program</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold" data-testid="text-pricing-amount">${cohortData.pricing.price}</span>
                      <span className="text-primary-foreground/80">USD</span>
                    </div>
                    <p className="text-sm mt-2 text-primary-foreground/80" data-testid="text-per-session">
                      That's just ${cohortData.pricing.comparison.perSession}/session
                    </p>
                  </div>

                  <CardContent className="pt-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2" data-testid="text-includes-title">
                          <Check className="h-5 w-5 text-primary" />
                          What's Included
                        </h3>
                        <ul className="space-y-3">
                          {cohortData.pricing.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm" data-testid={`item-includes-${idx}`}>
                              <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2" data-testid="text-value-title">
                          <DollarSign className="h-5 w-5 text-primary" />
                          Value Breakdown
                        </h3>
                        <ul className="space-y-2">
                          {cohortData.pricing.valueBreakdown.map((item, idx) => (
                            <li key={idx} className="flex items-center justify-between text-sm" data-testid={`item-value-${idx}`}>
                              <span className="text-muted-foreground">{item.item}</span>
                              <span className="font-medium">{item.value}</span>
                            </li>
                          ))}
                          <li className="flex items-center justify-between pt-2 border-t" data-testid="item-total-value">
                            <span className="font-semibold">Total Value</span>
                            <span className="font-bold text-primary">{cohortData.pricing.totalValue}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/10" data-testid="card-guarantee">
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-sm" data-testid="text-guarantee-title">Satisfaction Guarantee</p>
                          <p className="text-sm text-muted-foreground" data-testid="text-guarantee-desc">{cohortData.pricing.guarantee}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                      <Button 
                        size="lg"
                        className="w-full sm:w-auto"
                        onClick={() => {
                          handleCTAClick("pricing_reserve_spot");
                          window.open(`${profile.contact.whatsappLink}?text=${whatsappMessage}`, "_blank");
                        }}
                        data-testid="button-pricing-cta"
                      >
                        {cohortData.cta.primary}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <p className="mt-4 text-sm text-muted-foreground" data-testid="text-pricing-urgency">
                        {cohortData.cta.urgency}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-8 text-center">
                  <Card className="inline-block" data-testid="card-comparison">
                    <CardContent className="py-4 px-6">
                      <p className="text-sm" data-testid="text-comparison">
                        <span className="font-medium">Compare:</span> 1-on-1 coaching for the same content = 
                        <span className="text-muted-foreground line-through ml-2">${cohortData.pricing.comparison.oneOnOneEquivalent}+</span>
                        <span className="text-primary font-semibold ml-2">Save ${cohortData.pricing.comparison.savings}</span>
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="fade">
          <section className="py-16 bg-card/50" data-testid="section-instructor">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-instructor-title">
                  {cohortData.instructor.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-instructor-subtitle">
                  {cohortData.instructor.subtitle}
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card data-testid="card-instructor">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0" data-testid="avatar-instructor">
                        <span className="text-3xl font-bold text-primary">
                          {profile.personal.firstName.charAt(0)}{profile.personal.lastName.charAt(0)}
                        </span>
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl font-semibold" data-testid="text-instructor-name">{profile.personal.name}</h3>
                        <p className="text-muted-foreground" data-testid="text-instructor-role">{profile.personal.title}</p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                          {cohortData.instructor.highlights.slice(0, 3).map((highlight, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs" data-testid={`badge-highlight-${idx}`}>
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t" data-testid="container-instructor-stats">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div data-testid="stat-coached">
                          <div className="text-2xl font-bold text-primary">{profile.stats.professionalsCoached.value}</div>
                          <div className="text-xs text-muted-foreground">{profile.stats.professionalsCoached.label}</div>
                        </div>
                        <div data-testid="stat-years">
                          <div className="text-2xl font-bold text-primary">{profile.stats.yearsCoaching.value}</div>
                          <div className="text-xs text-muted-foreground">{profile.stats.yearsCoaching.label}</div>
                        </div>
                        <div data-testid="stat-success">
                          <div className="text-2xl font-bold text-primary">{profile.stats.offerSuccessRate.value}</div>
                          <div className="text-xs text-muted-foreground">{profile.stats.offerSuccessRate.label}</div>
                        </div>
                        <div data-testid="stat-rating">
                          <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                            <Star className="h-5 w-5 fill-primary" />
                            {profile.stats.rating.value}
                          </div>
                          <div className="text-xs text-muted-foreground">{profile.stats.rating.label}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="slide-up">
          <section className="py-16" data-testid="section-faq">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq">
                {cohortData.faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} data-testid={`faq-item-${idx}`}>
                    <AccordionTrigger 
                      className="text-left" 
                      onClick={() => handleFAQClick(idx)}
                      data-testid={`button-faq-${idx}`}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground" data-testid={`text-faq-answer-${idx}`}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="fade">
          <section className="py-16 bg-card/50" data-testid="section-glossary">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4" data-testid="badge-glossary">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Quick Reference
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-glossary-title">
                  {cohortData.glossary.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-glossary-subtitle">
                  {cohortData.glossary.subtitle}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {cohortData.glossary.terms.map((item, idx) => (
                  <Card key={idx} className="hover-elevate" data-testid={`card-glossary-${idx}`}>
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="shrink-0 font-mono" data-testid={`badge-term-${idx}`}>
                          {item.term}
                        </Badge>
                        <p className="text-sm text-muted-foreground" data-testid={`text-definition-${idx}`}>
                          {item.definition}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <section className="py-16 bg-primary text-primary-foreground" data-testid="section-final-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-final-cta-title">
              Ready to Transform Your Interview Game?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/80" data-testid="text-final-cta-desc">
              Join the next cohort and prepare alongside peers who understand your journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => {
                  handleCTAClick("footer_reserve_spot");
                  window.open(`${profile.contact.whatsappLink}?text=${whatsappMessage}`, "_blank");
                }}
                data-testid="button-footer-cta"
              >
                {cohortData.cta.primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => {
                  handleCTAClick("footer_whatsapp");
                  window.open(`${profile.contact.whatsappLink}?text=${whatsappMessage}`, "_blank");
                }}
                data-testid="button-footer-whatsapp"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Ask a Question
              </Button>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/60" data-testid="text-final-urgency">
              {cohortData.cta.urgency}
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
