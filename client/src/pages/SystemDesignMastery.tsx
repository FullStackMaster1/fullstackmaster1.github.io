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
  Target, 
  CheckCircle, 
  Clock, 
  GraduationCap, 
  Code, 
  Users, 
  Building,
  MessageCircle,
  Calendar,
  ArrowRight,
  Lightbulb,
  HelpCircle,
  Layers
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollReveal from "@/components/ScrollReveal";
import pageData from "@/data/systemDesignPage.json";
import profile from "@/data/profile.json";
import { trackEvent } from "@/lib/analytics";

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  Code,
  Users,
  Building
};

export default function SystemDesignMastery() {
  const handleCTAClick = (ctaType: string) => {
    trackEvent("cta_click", "system_design_page", ctaType);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
        <meta name="keywords" content={pageData.seo.keywords.join(", ")} />
        <link rel="canonical" href="https://www.fullstackmaster.net/system-design" />
        <meta property="og:title" content={pageData.seo.title} />
        <meta property="og:description" content={pageData.seo.description} />
        <meta property="og:url" content="https://www.fullstackmaster.net/system-design" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.fullstackmaster.net/og-image.png" />
        <meta property="og:site_name" content="FullStack Master" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.seo.title} />
        <meta name="twitter:description" content={pageData.seo.description} />
        <meta name="author" content={profile.personal.name} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": pageData.faqs.map(faq => ({
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
            "@type": "Article",
            "headline": pageData.seo.title,
            "description": pageData.seo.description,
            "author": {
              "@type": "Person",
              "name": profile.personal.name,
              "url": "https://www.fullstackmaster.net"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FullStack Master",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.fullstackmaster.net/icon-512.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.fullstackmaster.net/system-design"
            }
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
                "name": "Free Guides",
                "item": "https://www.fullstackmaster.net/#resources"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "System Design Mastery",
                "item": "https://www.fullstackmaster.net/system-design"
              }
            ]
          })}
        </script>
      </Helmet>

      <Navigation />
      <Breadcrumb items={[
        { label: "Free Guides", href: "/#resources" },
        { label: "System Design Mastery" }
      ]} />

      <main className="pt-20">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                {pageData.hero.badge}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="text-sd-hero-title">
                {pageData.hero.title}
              </h1>
              
              <p className="text-xl text-primary font-medium mb-4">
                {pageData.hero.subtitle}
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                {pageData.hero.description}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {pageData.hero.stats.map((stat, idx) => (
                  <div key={idx} className="text-center px-6">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  asChild
                  onClick={() => handleCTAClick("whatsapp_hero")}
                  data-testid="button-sd-whatsapp"
                >
                  <a href={`${profile.contact.whatsappLink}?text=${encodeURIComponent("Hi Rupesh, I'd like to discuss system design interview coaching.")}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild
                  onClick={() => handleCTAClick("book_hero")}
                  data-testid="button-sd-book"
                >
                  <a href={profile.contact.bookingLink} target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Free Discovery Call
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ScrollReveal type="fade">
          <section className="py-16 bg-card">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  <Lightbulb className="w-3 h-3 mr-1" />
                  {pageData.whatIsSystemDesign.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-sd-what-title">
                  {pageData.whatIsSystemDesign.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {pageData.whatIsSystemDesign.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {pageData.whatIsSystemDesign.keyPoints.map((point, idx) => (
                  <Card key={idx} className="hover-elevate">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        {point.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{point.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="slide-up">
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  <Users className="w-3 h-3 mr-1" />
                  {pageData.whoIsThisFor.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-sd-personas-title">
                  {pageData.whoIsThisFor.title}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {pageData.whoIsThisFor.personas.map((persona, idx) => {
                  const IconComponent = iconMap[persona.icon] || Users;
                  return (
                    <Card key={idx} className="hover-elevate" data-testid={`card-persona-${idx}`}>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-md">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-xl">{persona.title}</CardTitle>
                        </div>
                        <p className="text-muted-foreground">{persona.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="font-medium text-sm mb-2">Common Pain Points:</p>
                          <ul className="space-y-1">
                            {persona.painPoints.map((point, pIdx) => (
                              <li key={pIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="font-medium text-sm mb-1 text-primary">How I Help:</p>
                          <p className="text-sm text-muted-foreground">{persona.solution}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="scale">
          <section className="py-16 bg-card">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  <Target className="w-3 h-3 mr-1" />
                  {pageData.methodology.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-sd-framework-title">
                  {pageData.methodology.title}
                </h2>
                <p className="text-primary font-medium mb-4">{pageData.methodology.subtitle}</p>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {pageData.methodology.description}
                </p>
              </div>

              <div className="space-y-4">
                {pageData.methodology.steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-4 p-4 bg-background rounded-md border hover-elevate"
                    data-testid={`step-ifrail-${idx}`}
                  >
                    <div className="w-12 h-12 flex-shrink-0 bg-primary text-primary-foreground rounded-md flex items-center justify-center text-xl font-bold">
                      {step.letter}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{step.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.timeAllocation}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="slide-up">
          <section className="py-16" id="architecture-patterns">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  <Layers className="w-3 h-3 mr-1" />
                  {pageData.architectureDiagrams.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-sd-patterns-title">
                  {pageData.architectureDiagrams.title}
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  {pageData.architectureDiagrams.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {pageData.architectureDiagrams.diagrams.map((diagram, idx) => (
                  <Card key={diagram.id} className="hover-elevate" data-testid={`card-pattern-${idx}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-lg mb-1">{diagram.title}</CardTitle>
                          <p className="text-sm text-primary font-medium">{diagram.subtitle}</p>
                        </div>
                        <Badge 
                          variant={diagram.complexity === "Beginner" ? "secondary" : diagram.complexity === "Intermediate" ? "outline" : "default"}
                          className="text-xs flex-shrink-0"
                        >
                          {diagram.complexity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{diagram.description}</p>
                      
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                          Architecture Flow
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {diagram.components.map((component, cIdx) => (
                            <div key={cIdx} className="flex items-center">
                              <div className="px-2 py-1 bg-background border border-border rounded text-xs font-medium">
                                {component}
                              </div>
                              {cIdx < diagram.components.length - 1 && (
                                <ArrowRight className="w-3 h-3 mx-1 text-muted-foreground flex-shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                          Key Design Points
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {diagram.keyPoints.map((point, pIdx) => (
                            <li key={pIdx} className="text-xs text-muted-foreground flex items-start gap-1.5" data-testid={`keypoint-${diagram.id}-${pIdx}`}>
                              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="slide-up">
          <section className="py-16 bg-card" id="faqs">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  <HelpCircle className="w-3 h-3 mr-1" />
                  Common Questions
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-sd-faq-title">
                  System Design Interview FAQs
                </h2>
                <p className="text-muted-foreground">
                  Answers to the questions I hear most from coaching clients
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {pageData.faqs.map((faq, idx) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    data-testid={`sd-faq-item-${idx}`}
                  >
                    <AccordionTrigger 
                      className="text-left"
                      onClick={() => trackEvent("faq_open", "system_design_page", faq.question)}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="fade">
          <section className="py-16 bg-muted/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Badge variant="secondary" className="mb-4">
                <Users className="w-3 h-3 mr-1" />
                Related Guide
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Also Prepare for Behavioral Interviews
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                System design is just one part of senior-level interviews. Behavioral interviews evaluate your leadership and decision-making. Master both to maximize your offer chances.
              </p>
              <Button size="lg" variant="outline" asChild data-testid="link-to-behavioral">
                <Link href="/behavioral-interview">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Read: Behavioral Interview Mastery
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="fade">
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-sd-cta-title">
                {pageData.cta.title}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {pageData.cta.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  asChild
                  onClick={() => handleCTAClick("book_bottom")}
                  data-testid="button-sd-book-bottom"
                >
                  <a href={profile.contact.bookingLink} target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-4 h-4 mr-2" />
                    {pageData.cta.primaryButton}
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                  data-testid="button-sd-services"
                >
                  <Link href="/#services">
                    {pageData.cta.secondaryButton}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
