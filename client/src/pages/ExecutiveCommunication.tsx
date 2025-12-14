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
  Code, 
  TrendingUp,
  FileText,
  MessageCircle,
  Calendar,
  ArrowRight,
  Lightbulb,
  HelpCircle,
  Users,
  Presentation,
  AlertTriangle
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import FloatingSocialShare from "@/components/FloatingSocialShare";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollReveal from "@/components/ScrollReveal";
import VideoTipsCarousel from "@/components/VideoTipsCarousel";
import EmotionalConnectionSection from "@/components/EmotionalConnectionSection";
import pageData from "@/data/executiveCommunicationPage.json";
import profile from "@/data/profile.json";
import emotionalContent from "@/data/emotionalContent.json";
import { trackEvent } from "@/lib/analytics";

const iconMap: Record<string, typeof Code> = {
  Code,
  TrendingUp,
  Target,
  FileText
};

export default function ExecutiveCommunication() {
  const handleCTAClick = (ctaType: string) => {
    trackEvent("cta_click", "executive_communication_page", ctaType);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
        <meta name="keywords" content={pageData.seo.keywords.join(", ")} />
        <link rel="canonical" href="https://www.fullstackmaster.net/executive-communication" />
        <meta property="og:title" content={pageData.seo.title} />
        <meta property="og:description" content={pageData.seo.description} />
        <meta property="og:url" content="https://www.fullstackmaster.net/executive-communication" />
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
              "@id": "https://www.fullstackmaster.net/executive-communication"
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
                "name": "Executive Communication",
                "item": "https://www.fullstackmaster.net/executive-communication"
              }
            ]
          })}
        </script>
      </Helmet>

      <Navigation />
      <Breadcrumb items={[
        { label: "Free Guides", href: "/#resources" },
        { label: "Executive Communication" }
      ]} />

      <main className="pt-20">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <Presentation className="w-3 h-3 mr-1" />
                {pageData.hero.badge}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="text-exec-hero-title">
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
                  data-testid="button-exec-whatsapp"
                >
                  <a href={`${profile.contact.whatsappLink}?text=${encodeURIComponent("Hi Rupesh, I'd like to discuss executive presentation coaching for my VP/Director interview.")}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild
                  onClick={() => handleCTAClick("book_hero")}
                  data-testid="button-exec-book"
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
                  {pageData.whatIsExecutiveComm.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-exec-what-title">
                  {pageData.whatIsExecutiveComm.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {pageData.whatIsExecutiveComm.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {pageData.whatIsExecutiveComm.keyPoints.map((point, idx) => (
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
                  <Presentation className="w-3 h-3 mr-1" />
                  {pageData.presentationTypes.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-exec-types-title">
                  {pageData.presentationTypes.title}
                </h2>
                <p className="text-muted-foreground">
                  {pageData.presentationTypes.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {pageData.presentationTypes.types.map((type, idx) => {
                  const IconComponent = iconMap[type.icon] || Presentation;
                  return (
                    <Card key={type.id} className="hover-elevate" data-testid={`card-presentation-type-${idx}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-md">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle className="text-xl">{type.title}</CardTitle>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {type.duration}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{type.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="font-medium text-sm mb-2 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            What They Test:
                          </p>
                          <ul className="space-y-1">
                            {type.whatTheyTest.map((item, pIdx) => (
                              <li key={pIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="font-medium text-sm mb-2 flex items-center gap-1 text-destructive">
                            <AlertTriangle className="w-4 h-4" />
                            Common Mistakes:
                          </p>
                          <ul className="space-y-1">
                            {type.commonMistakes.map((mistake, mIdx) => (
                              <li key={mIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                {mistake}
                              </li>
                            ))}
                          </ul>
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
                  {pageData.framework.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-exec-framework-title">
                  {pageData.framework.title}
                </h2>
                <p className="text-primary font-medium mb-4">{pageData.framework.subtitle}</p>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {pageData.framework.description}
                </p>
              </div>

              <div className="space-y-4">
                {pageData.framework.steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-4 p-4 bg-background rounded-md border hover-elevate"
                    data-testid={`step-clear-${idx}`}
                  >
                    <div className="w-12 h-12 flex-shrink-0 bg-primary text-primary-foreground rounded-md flex items-center justify-center text-xl font-bold">
                      {step.letter}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{step.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.timeAllocation}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.tips.map((tip, tIdx) => (
                          <Badge key={tIdx} variant="secondary" className="text-xs">
                            {tip}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="slide-up">
          <section className="py-16" id="faqs">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  <HelpCircle className="w-3 h-3 mr-1" />
                  Common Questions
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-exec-faq-title">
                  Executive Presentation FAQs
                </h2>
                <p className="text-muted-foreground">
                  Answers to the questions I hear most from executives preparing for leadership interviews
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {pageData.faqs.map((faq, idx) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    data-testid={`exec-faq-item-${idx}`}
                  >
                    <AccordionTrigger 
                      className="text-left"
                      onClick={() => trackEvent("faq_open", "executive_communication_page", faq.question)}
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

        <EmotionalConnectionSection content={emotionalContent.executiveCommunication} pageKey="executiveCommunication" />

        <ScrollReveal type="fade">
          <section className="py-16 bg-muted/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Badge variant="secondary" className="mb-4">
                <Users className="w-3 h-3 mr-1" />
                Related Guides
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Complete Your Interview Preparation
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Executive communication is just one part of senior-level interviews. Master system design, behavioral interviews, and perfect your resume for a complete preparation strategy.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="outline" asChild data-testid="link-to-system-design">
                  <Link href="/system-design">
                    <Code className="w-4 h-4 mr-2" />
                    System Design Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="link-to-behavioral">
                  <Link href="/behavioral-interview">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Behavioral Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="link-to-resume">
                  <Link href="/resume-checklist">
                    <FileText className="w-4 h-4 mr-2" />
                    Resume Checklist
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="fade">
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-exec-cta-title">
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
                  data-testid="button-exec-book-bottom"
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
                  data-testid="button-exec-services"
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

        <VideoTipsCarousel pageKey="executiveCommunication" />
      </main>

      <Footer />
      <WhatsAppWidget />
      <FloatingSocialShare title="Executive Communication" />
    </div>
  );
}
