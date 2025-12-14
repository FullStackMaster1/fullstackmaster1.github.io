import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import FloatingSocialShare from "@/components/FloatingSocialShare";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";
import { 
  XCircle,
  CheckCircle,
  Rocket,
  GraduationCap,
  Shield,
  Cloud,
  Target,
  MessageSquare,
  Users,
  BookOpen,
  ArrowRight,
  Star,
  Quote,
  Lightbulb
} from "lucide-react";
import pageData from "@/data/solutionArchitectPage.json";
import profileData from "@/data/profile.json";
import emotionalContent from "@/data/emotionalContent.json";
import VideoTipsCarousel from "@/components/VideoTipsCarousel";
import EmotionalConnectionSection from "@/components/EmotionalConnectionSection";

export default function SolutionArchitectRoadmap() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
        <meta name="keywords" content={pageData.seo.keywords.join(", ")} />
        <meta property="og:title" content={pageData.seo.title} />
        <meta property="og:description" content={pageData.seo.description} />
        <meta property="og:image" content="https://www.fullstackmaster.net/og-image.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.fullstackmaster.net/og-image.png" />
      </Helmet>
      <AnnouncementBar />
      <Navigation />
      <main>
        {/* Hero Section - Motivational */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="default" className="mb-4 text-sm px-4 py-1" data-testid="badge-hero">
              <Rocket className="w-4 h-4 mr-2" />
              {pageData.hero.badge}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {pageData.hero.title}
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-primary mb-4">
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
              <p className="text-xl text-primary font-semibold mb-2">{pageData.roadmap.subtitle}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">{pageData.roadmap.description}</p>
            </div>
            
            <div className="space-y-8">
              {pageData.roadmap.phases.map((phase) => (
                <Card key={phase.phase} className="overflow-hidden" data-testid={`card-phase-${phase.phase}`}>
                  <CardHeader className="bg-primary/5 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                        {phase.phase}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{phase.title}</CardTitle>
                        <CardDescription className="text-primary font-medium">{phase.duration}</CardDescription>
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
                                {idx === 0 && <Cloud className="w-4 h-4 text-primary" />}
                                {idx === 1 && <Shield className="w-4 h-4 text-primary" />}
                                {idx === 2 && <GraduationCap className="w-4 h-4 text-primary" />}
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
                          <div key={idx} className="bg-muted/50 rounded-lg p-4 text-center">
                            <Badge variant="secondary" className="mb-2">{option.cloud}</Badge>
                            <p className="font-semibold text-sm">{option.certification}</p>
                            <p className="text-xs text-muted-foreground mt-1">{option.why}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {phase.tips && (
                      <div className="bg-primary/5 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-primary" />
                          Tips
                        </h4>
                        <ul className="text-sm space-y-1">
                          {phase.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <ArrowRight className="w-3 h-3 text-primary mt-1 shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {phase.framework && (
                      <div className="bg-primary/5 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold mb-2">{phase.framework.name} Framework</h4>
                        <p className="text-sm text-muted-foreground mb-2">{phase.framework.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {phase.framework.steps.map((step, idx) => (
                            <Badge key={idx} variant="secondary">{step}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {phase.skills && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {phase.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                        {phase.tip && (
                          <p className="text-sm text-muted-foreground mt-3 italic">
                            <Lightbulb className="w-3 h-3 inline mr-1" />
                            {phase.tip}
                          </p>
                        )}
                      </div>
                    )}

                    {phase.activities && (
                      <ul className="space-y-2 mb-4">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    )}

                    {phase.freeResources && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {phase.freeResources.map((resource, idx) => (
                          <Button key={idx} variant="outline" size="sm" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <BookOpen className="w-3 h-3 mr-1" />
                              {resource.name}
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}

                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        <Target className="w-4 h-4 inline mr-2" />
                        Milestone: {phase.milestone}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interview FAQs Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <MessageSquare className="w-3 h-3 mr-1" />
                {pageData.interviewFAQs.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.interviewFAQs.title}</h2>
              <p className="text-muted-foreground">{pageData.interviewFAQs.subtitle}</p>
            </div>

            {pageData.interviewFAQs.categories.map((category, catIdx) => (
              <div key={catIdx} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {catIdx === 0 && <Cloud className="w-5 h-5 text-primary" />}
                  {catIdx === 1 && <Cloud className="w-5 h-5 text-primary" />}
                  {catIdx === 2 && <Shield className="w-5 h-5 text-primary" />}
                  {catIdx === 3 && <GraduationCap className="w-5 h-5 text-primary" />}
                  {catIdx === 4 && <Lightbulb className="w-5 h-5 text-primary" />}
                  {category.name}
                </h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id}
                      className="bg-background border rounded-lg px-4"
                      data-testid={`accordion-${faq.id}`}
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        <EmotionalConnectionSection content={emotionalContent.solutionArchitect} pageKey="solutionArchitect" />

        {/* Success Stories / Motivation */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Star className="w-3 h-3 mr-1" />
                {pageData.motivation.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">{pageData.motivation.title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pageData.motivation.stories.map((story, idx) => (
                <Card key={idx} className="hover-elevate" data-testid={`card-story-${idx}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-primary" />
                      <Badge variant="secondary">{story.background}</Badge>
                    </div>
                    <div className="mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600 inline mr-2" />
                      <span className="font-semibold text-green-600">{story.outcome}</span>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Quote className="w-5 h-5 text-muted-foreground mb-2" />
                      <p className="text-sm italic text-muted-foreground">"{story.quote}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                <a href="/resources">
                  {pageData.cta.secondaryButton}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <VideoTipsCarousel pageKey="solutionArchitect" />
      </main>
      <Footer />
      <WhatsAppWidget />
      <FloatingSocialShare title="Solution Architect Roadmap" />
    </div>
  );
}
