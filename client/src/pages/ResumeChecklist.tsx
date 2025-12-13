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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown,
  Building,
  Users,
  Code,
  Database,
  Globe,
  CheckCircle, 
  MessageCircle,
  Calendar,
  ArrowRight,
  FileText,
  HelpCircle,
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollReveal from "@/components/ScrollReveal";
import VideoTipsCarousel from "@/components/VideoTipsCarousel";
import EmotionalConnectionSection from "@/components/EmotionalConnectionSection";
import pageData from "@/data/resumeChecklistPage.json";
import profile from "@/data/profile.json";
import emotionalContent from "@/data/emotionalContent.json";
import { trackEvent } from "@/lib/analytics";

const iconMap: Record<string, typeof Crown> = {
  Crown,
  Building,
  Users,
  Code,
  Database,
  Globe
};

export default function ResumeChecklist() {
  const handleCTAClick = (ctaType: string) => {
    trackEvent("cta_click", "resume_checklist_page", ctaType);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
        <meta name="keywords" content={pageData.seo.keywords.join(", ")} />
        <link rel="canonical" href="https://www.fullstackmaster.net/resume-checklist" />
        <meta property="og:title" content={pageData.seo.title} />
        <meta property="og:description" content={pageData.seo.description} />
        <meta property="og:url" content="https://www.fullstackmaster.net/resume-checklist" />
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
              "@id": "https://www.fullstackmaster.net/resume-checklist"
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
                "name": "Resume Checklist",
                "item": "https://www.fullstackmaster.net/resume-checklist"
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Write a Resume for Senior Tech Roles",
            "description": pageData.seo.description,
            "step": pageData.universalChecklist.items.map((section, idx) => ({
              "@type": "HowToStep",
              "position": idx + 1,
              "name": section.category,
              "text": section.checks.join(". ")
            }))
          })}
        </script>
      </Helmet>

      <Navigation />
      <Breadcrumb items={[
        { label: "Free Guides", href: "/#resources" },
        { label: "Resume Checklist" }
      ]} />

      <main className="pt-20">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <FileText className="w-3 h-3 mr-1" />
                {pageData.hero.badge}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="text-resume-hero-title">
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
                  data-testid="button-resume-whatsapp"
                >
                  <a href={`${profile.contact.whatsappLink}?text=${encodeURIComponent("Hi Rupesh, I'd like to get my resume reviewed for senior-level roles.")}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild
                  onClick={() => handleCTAClick("book_hero")}
                  data-testid="button-resume-book"
                >
                  <a href={profile.contact.bookingLink} target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Resume Review
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ScrollReveal type="fade">
          <section className="py-16 bg-card">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  <Crown className="w-3 h-3 mr-1" />
                  {pageData.roleChecklists.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-resume-roles-title">
                  {pageData.roleChecklists.title}
                </h2>
                <p className="text-muted-foreground">
                  {pageData.roleChecklists.subtitle}
                </p>
              </div>

              <Tabs defaultValue="vp-resume" className="w-full">
                <TabsList className="flex flex-wrap justify-center h-auto gap-2 bg-transparent mb-8">
                  {pageData.roleChecklists.roles.map((role) => {
                    const IconComponent = iconMap[role.icon] || FileText;
                    return (
                      <TabsTrigger 
                        key={role.id} 
                        value={role.id}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2"
                        onClick={() => trackEvent("tab_click", "resume_checklist_page", role.title)}
                        data-testid={`tab-${role.id}`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {role.title.split(" / ")[0]}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {pageData.roleChecklists.roles.map((role) => {
                  const IconComponent = iconMap[role.icon] || FileText;
                  return (
                    <TabsContent key={role.id} value={role.id}>
                      <Card className="hover-elevate" data-testid={`card-role-${role.id}`}>
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-primary/10 rounded-md">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl">{role.title}</CardTitle>
                              <p className="text-muted-foreground mt-1">{role.summary}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-primary" />
                              Must-Have Elements
                            </h3>
                            <div className="grid md:grid-cols-2 gap-2">
                              {role.mustHaves.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 p-2 bg-muted/50 rounded-md">
                                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                              <Lightbulb className="w-5 h-5 text-primary" />
                              Format Tips
                            </h3>
                            <ul className="space-y-2">
                              {role.formatTips.map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                  <span className="text-primary">•</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-4 border-t">
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-destructive">
                              <AlertTriangle className="w-5 h-5" />
                              Common Mistakes to Avoid
                            </h3>
                            <ul className="space-y-2">
                              {role.commonMistakes.map((mistake, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                  <span className="text-destructive">✗</span>
                                  {mistake}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="slide-up">
          <section className="py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {pageData.universalChecklist.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-resume-universal-title">
                  {pageData.universalChecklist.title}
                </h2>
              </div>

              <div className="space-y-6">
                {pageData.universalChecklist.items.map((section, idx) => (
                  <Card key={idx} className="hover-elevate" data-testid={`card-checklist-${idx}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">{section.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {section.checks.map((check, cIdx) => (
                          <div 
                            key={cIdx} 
                            className="flex items-start gap-3 p-3 bg-muted/30 rounded-md"
                          >
                            <div className="w-5 h-5 border-2 border-primary rounded flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{check}</span>
                          </div>
                        ))}
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-resume-faq-title">
                  Resume FAQs for Senior Roles
                </h2>
                <p className="text-muted-foreground">
                  Answers to the questions I hear most about executive-level resumes
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {pageData.faqs.map((faq, idx) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    data-testid={`resume-faq-item-${idx}`}
                  >
                    <AccordionTrigger 
                      className="text-left"
                      onClick={() => trackEvent("faq_open", "resume_checklist_page", faq.question)}
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

        <EmotionalConnectionSection content={emotionalContent.resumeChecklist} pageKey="resumeChecklist" />

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
                A great resume gets you the interview. Now prepare for what comes next with our comprehensive interview guides.
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
                <Button size="lg" variant="outline" asChild data-testid="link-to-exec-comm">
                  <Link href="/executive-communication">
                    <FileText className="w-4 h-4 mr-2" />
                    Executive Communication
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-resume-cta-title">
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
                  data-testid="button-resume-book-bottom"
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
                  data-testid="button-resume-services"
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

        <VideoTipsCarousel pageKey="resumeChecklist" />
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
