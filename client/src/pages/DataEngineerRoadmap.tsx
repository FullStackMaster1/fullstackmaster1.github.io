import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";
import { 
  XCircle,
  CheckCircle,
  Database,
  Cloud,
  Target,
  ArrowRight,
  Lightbulb,
  Code,
  Briefcase,
  DollarSign,
  HelpCircle
} from "lucide-react";
import pageData from "@/data/dataEngineerPage.json";
import profileData from "@/data/profile.json";
import VideoTipsCarousel from "@/components/VideoTipsCarousel";

export default function DataEngineerRoadmap() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
        <meta name="keywords" content={pageData.seo.keywords.join(", ")} />
      </Helmet>
      <AnnouncementBar />
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="default" className="mb-4 text-sm px-4 py-1 bg-emerald-600" data-testid="badge-hero">
              <Database className="w-4 h-4 mr-2" />
              {pageData.hero.badge}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-tight">
              {pageData.hero.title}
            </h1>
            <p className="text-3xl md:text-4xl font-bold text-emerald-600 mb-4">
              {pageData.hero.highlight}
            </p>
            <p className="text-xl md:text-2xl font-semibold text-muted-foreground mb-4">
              {pageData.hero.subtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {pageData.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-hero-primary">
                <a href={profileData.contact.bookingLink} target="_blank" rel="noopener noreferrer">
                  Start My Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-hero-secondary">
                <a href="#roadmap">
                  See the Roadmap
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Myth Busters Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Lightbulb className="w-3 h-3 mr-1" />
                {pageData.mythBusters.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.mythBusters.title}</h2>
              <p className="text-muted-foreground">{pageData.mythBusters.subtitle}</p>
            </div>
            <div className="space-y-4">
              {pageData.mythBusters.myths.map((item, idx) => (
                <Card key={idx} className="hover-elevate" data-testid={`card-myth-${idx}`}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex items-start gap-3 md:w-1/2">
                        <XCircle className="w-6 h-6 text-destructive shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-destructive">Myth:</p>
                          <p className="text-muted-foreground">{item.myth}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 md:w-1/2">
                        <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-green-600">Reality:</p>
                          <p>{item.reality}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                {pageData.roadmap.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.roadmap.title}</h2>
              <p className="text-xl text-emerald-600 font-semibold mb-2">{pageData.roadmap.subtitle}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">{pageData.roadmap.description}</p>
            </div>
            
            <div className="space-y-8">
              {pageData.roadmap.phases.map((phase) => (
                <Card key={phase.phase} className="overflow-hidden" data-testid={`card-phase-${phase.phase}`}>
                  <CardHeader className="bg-emerald-500/10 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
                        {phase.phase}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{phase.title}</CardTitle>
                        <CardDescription className="text-emerald-600 font-medium">{phase.duration}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4">{phase.description}</p>
                    
                    {phase.topics && Array.isArray(phase.topics) && phase.topics.length > 0 && (
                      typeof phase.topics[0] === 'object' ? (
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          {(phase.topics as Array<{name: string; items: string[]}>).map((topic, idx) => (
                            <div key={idx} className="bg-muted/50 rounded-lg p-4">
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                {idx === 0 && <Code className="w-4 h-4 text-emerald-600" />}
                                {idx === 1 && <Database className="w-4 h-4 text-emerald-600" />}
                                {idx === 2 && <Cloud className="w-4 h-4 text-emerald-600" />}
                                {topic.name}
                              </h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {topic.items?.map((item: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <CheckCircle className="w-3 h-3 text-green-600 mt-1 shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {(phase.topics as string[]).map((topic, idx) => (
                              <Badge key={idx} variant="outline">{topic}</Badge>
                            ))}
                          </div>
                        </div>
                      )
                    )}

                    {phase.options && (
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        {phase.options.map((option, idx) => (
                          <div key={idx} className="bg-muted/50 rounded-lg p-4">
                            <h4 className="font-semibold text-emerald-600 mb-1">{option.cloud}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{option.services}</p>
                            <p className="text-xs">{option.why}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {phase.tips && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-400">Pro Tips:</h4>
                        <ul className="space-y-1">
                          {phase.tips.map((tip, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-emerald-600 mt-1 shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {phase.framework && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">{phase.framework.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{phase.framework.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {phase.framework.steps.map((step, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{step}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">
                        <CheckCircle className="w-4 h-4 inline mr-2" />
                        Milestone: {phase.milestone}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Target Roles Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Briefcase className="w-3 h-3 mr-1" />
                {pageData.targetRoles.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.targetRoles.title}</h2>
              <p className="text-muted-foreground">{pageData.targetRoles.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {pageData.targetRoles.roles.map((role, idx) => (
                <Card key={idx} className="hover-elevate" data-testid={`card-role-${idx}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <CardTitle>{role.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">{role.level}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 font-bold">
                        <DollarSign className="w-4 h-4" />
                        {role.salary}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {role.companies.map((company, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{company}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Code className="w-3 h-3 mr-1" />
                {pageData.skills.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.skills.title}</h2>
              <p className="text-muted-foreground">{pageData.skills.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {pageData.skills.categories.map((category, idx) => (
                <Card key={idx} data-testid={`card-skill-${idx}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.items.map((item, i) => (
                        <Badge key={i} variant="secondary" className="mr-1 mb-1">{item}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <HelpCircle className="w-3 h-3 mr-1" />
                FAQs
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Common Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about becoming a Data Engineer</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {pageData.faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} data-testid={`faq-${idx}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-emerald-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Database className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.cta.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">{pageData.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-cta-primary">
                <a href={profileData.contact.bookingLink} target="_blank" rel="noopener noreferrer">
                  {pageData.cta.primaryButton}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-cta-secondary">
                <a href="/#success-stories">
                  {pageData.cta.secondaryButton}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <VideoTipsCarousel pageKey="dataEngineer" />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
