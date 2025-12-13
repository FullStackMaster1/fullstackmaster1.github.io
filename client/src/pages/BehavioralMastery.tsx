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
  Crown, 
  ArrowUpRight, 
  Building, 
  Globe,
  MessageCircle,
  Calendar,
  ArrowRight,
  Lightbulb,
  HelpCircle,
  Star,
  BookOpen,
  Code
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollReveal from "@/components/ScrollReveal";
import VideoTipsCarousel from "@/components/VideoTipsCarousel";
import pageData from "@/data/behavioralPage.json";
import profile from "@/data/profile.json";
import { trackEvent } from "@/lib/analytics";

const iconMap: Record<string, typeof Crown> = {
  Crown,
  ArrowUpRight,
  Building,
  Globe
};

export default function BehavioralMastery() {
  const handleCTAClick = (ctaType: string) => {
    trackEvent("cta_click", "behavioral_page", ctaType);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
        <meta name="keywords" content={pageData.seo.keywords.join(", ")} />
        <link rel="canonical" href="https://www.fullstackmaster.net/behavioral-interview" />
        <meta property="og:title" content={pageData.seo.title} />
        <meta property="og:description" content={pageData.seo.description} />
        <meta property="og:url" content="https://www.fullstackmaster.net/behavioral-interview" />
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
              "@id": "https://www.fullstackmaster.net/behavioral-interview"
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
                "name": "Behavioral Interview Mastery",
                "item": "https://www.fullstackmaster.net/behavioral-interview"
              }
            ]
          })}
        </script>
      </Helmet>

      <Navigation />
      <Breadcrumb items={[
        { label: "Free Guides", href: "/#resources" },
        { label: "Behavioral Interview Mastery" }
      ]} />

      <main className="pt-20">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                {pageData.hero.badge}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="text-bh-hero-title">
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
                  data-testid="button-bh-whatsapp"
                >
                  <a href={`${profile.contact.whatsappLink}?text=${encodeURIComponent("Hi Rupesh, I'd like to discuss behavioral interview coaching.")}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild
                  onClick={() => handleCTAClick("book_hero")}
                  data-testid="button-bh-book"
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
                  {pageData.whatIsBehavioral.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-bh-what-title">
                  {pageData.whatIsBehavioral.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {pageData.whatIsBehavioral.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {pageData.whatIsBehavioral.keyPoints.map((point, idx) => (
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
                  <Crown className="w-3 h-3 mr-1" />
                  {pageData.whoIsThisFor.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-bh-personas-title">
                  {pageData.whoIsThisFor.title}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {pageData.whoIsThisFor.personas.map((persona, idx) => {
                  const IconComponent = iconMap[persona.icon] || Crown;
                  return (
                    <Card key={idx} className="hover-elevate" data-testid={`card-bh-persona-${idx}`}>
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
                  <Star className="w-3 h-3 mr-1" />
                  {pageData.starMethod.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-bh-star-title">
                  {pageData.starMethod.title}
                </h2>
                <p className="text-primary font-medium mb-4">{pageData.starMethod.subtitle}</p>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {pageData.starMethod.description}
                </p>
              </div>

              <div className="space-y-4">
                {pageData.starMethod.steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className="p-6 bg-background rounded-md border hover-elevate"
                    data-testid={`step-star-${idx}`}
                  >
                    <div className="flex items-start gap-4">
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
                        <p className="text-muted-foreground mb-3">{step.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {step.tips.map((tip, tIdx) => (
                            <Badge key={tIdx} variant="secondary" className="text-xs font-normal">
                              {tip}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
                  <BookOpen className="w-3 h-3 mr-1" />
                  {pageData.amazonLP.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-bh-lp-title">
                  {pageData.amazonLP.title}
                </h2>
                <p className="text-primary font-medium mb-4">{pageData.amazonLP.subtitle}</p>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  {pageData.amazonLP.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pageData.amazonLP.principles.slice(0, 8).map((principle, idx) => (
                  <Card key={idx} className="hover-elevate" data-testid={`card-lp-${idx}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{principle.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{principle.description}</p>
                      <p className="text-xs font-medium mb-1">Example Questions:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {principle.exampleQuestions.slice(0, 1).map((q, qIdx) => (
                          <li key={qIdx} className="italic">"{q}"</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="more-lps">
                  <AccordionTrigger className="text-center justify-center">
                    View All 16 Leadership Principles
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                      {pageData.amazonLP.principles.slice(8).map((principle, idx) => (
                        <Card key={idx + 8} className="hover-elevate">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{principle.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">{principle.description}</p>
                            <p className="text-xs font-medium mb-1">Example Questions:</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {principle.exampleQuestions.slice(0, 1).map((q, qIdx) => (
                                <li key={qIdx} className="italic">"{q}"</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="fade">
          <section className="py-16 bg-card" id="faqs">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  <HelpCircle className="w-3 h-3 mr-1" />
                  Common Questions
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-bh-faq-title">
                  Behavioral Interview FAQs
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
                    data-testid={`bh-faq-item-${idx}`}
                  >
                    <AccordionTrigger 
                      className="text-left"
                      onClick={() => trackEvent("faq_open", "behavioral_page", faq.question)}
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
                <Code className="w-3 h-3 mr-1" />
                Related Guide
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Also Prepare for System Design Interviews
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                For senior engineering roles, system design is equally important. Learn the IFRAILST framework to ace your architecture interviews.
              </p>
              <Button size="lg" variant="outline" asChild data-testid="link-to-system-design">
                <Link href="/system-design">
                  <Code className="w-4 h-4 mr-2" />
                  Read: System Design Mastery
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="scale">
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-bh-cta-title">
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
                  data-testid="button-bh-book-bottom"
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
                  data-testid="button-bh-services"
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

        <VideoTipsCarousel pageKey="behavioral" />
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
