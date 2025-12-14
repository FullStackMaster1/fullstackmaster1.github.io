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
  MessageSquare,
  BarChart,
  Lightbulb,
  Heart,
  ListChecks,
  ThumbsUp,
  Hand,
  RotateCcw,
  DoorOpen,
  ArrowRight,
  CheckCircle,
  Users,
  Target,
  Star,
  Sparkles,
  Eye,
  Mic,
  FileText,
  Calendar,
  BookOpen,
  Brain
} from "lucide-react";
import pageData from "@/data/softSkillsPage.json";
import profileData from "@/data/profile.json";
import emotionalContent from "@/data/emotionalContent.json";
import VideoTipsCarousel from "@/components/VideoTipsCarousel";
import EmotionalConnectionSection from "@/components/EmotionalConnectionSection";

const personalityIcons: Record<string, typeof BarChart> = {
  BarChart,
  Lightbulb,
  Heart,
  ListChecks
};

const signalIcons: Record<string, typeof ThumbsUp> = {
  ThumbsUp,
  Hand,
  RotateCcw,
  DoorOpen
};

export default function SoftSkillsGuide() {
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
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-purple-500/10 via-purple-500/5 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="default" className="mb-4 text-sm px-4 py-1 bg-purple-600" data-testid="badge-hero">
              <MessageSquare className="w-4 h-4 mr-2" />
              {pageData.hero.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
              {pageData.hero.title}
            </h1>
            <p className="text-3xl md:text-4xl font-bold text-purple-600 mb-4">
              {pageData.hero.highlight}
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              {pageData.hero.subtitle}
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {pageData.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-hero-primary">
                <a href={profileData.contact.bookingLink} target="_blank" rel="noopener noreferrer">
                  Get Coaching
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-hero-secondary">
                <a href="#personality-types">
                  Read the Guide
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Why It Matters - The 55-38-7 Rule */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Eye className="w-3 h-3 mr-1" />
                {pageData.whyItMatters.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.whyItMatters.title}</h2>
              <p className="text-muted-foreground">{pageData.whyItMatters.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {pageData.whyItMatters.stats.map((stat, idx) => (
                <Card key={idx} className="text-center hover-elevate" data-testid={`card-stat-${idx}`}>
                  <CardContent className="pt-6">
                    <div className="text-5xl font-bold text-purple-600 mb-2">{stat.percentage}</div>
                    <h3 className="font-semibold mb-1">{stat.label}</h3>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6 text-center">
              <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-lg font-medium">{pageData.whyItMatters.insight}</p>
            </div>
          </div>
        </section>

        {/* Personality Types */}
        <section id="personality-types" className="py-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Users className="w-3 h-3 mr-1" />
                {pageData.personalityTypes.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.personalityTypes.title}</h2>
              <p className="text-muted-foreground">{pageData.personalityTypes.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {pageData.personalityTypes.types.map((type, idx) => {
                const IconComponent = personalityIcons[type.icon] || Users;
                return (
                  <Card key={idx} className="hover-elevate" data-testid={`card-personality-${idx}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-purple-500/10">
                          <IconComponent className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle>{type.name}</CardTitle>
                          <CardDescription>{type.signs}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="font-medium text-sm text-purple-600 mb-1">Your Approach:</p>
                        <p className="text-muted-foreground">{type.approach}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {type.keywords.map((keyword, i) => (
                          <Badge key={i} variant="secondary">{keyword}</Badge>
                        ))}
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm">
                          <span className="font-medium">Example: </span>
                          <span className="text-muted-foreground">{type.example}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Body Language */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Eye className="w-3 h-3 mr-1" />
                {pageData.bodyLanguage.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.bodyLanguage.title}</h2>
              <p className="text-muted-foreground">{pageData.bodyLanguage.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {pageData.bodyLanguage.signals.map((signal, idx) => {
                const IconComponent = signalIcons[signal.icon] || Eye;
                return (
                  <Card key={idx} className="hover-elevate" data-testid={`card-signal-${idx}`}>
                    <CardContent className="pt-6">
                      <IconComponent className="w-8 h-8 text-purple-600 mb-3" />
                      <h3 className="font-bold mb-1">{signal.signal}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{signal.meaning}</p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          <ArrowRight className="w-3 h-3 inline mr-1" />
                          {signal.action}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-purple-600" />
                  {pageData.bodyLanguage.yourBody.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-2">
                  {pageData.bodyLanguage.yourBody.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interview Techniques */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                {pageData.interviewTechniques.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">{pageData.interviewTechniques.title}</h2>
            </div>
            
            <div className="space-y-6">
              {pageData.interviewTechniques.techniques.map((technique, idx) => (
                <Card key={idx} className="hover-elevate" data-testid={`card-technique-${idx}`}>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </div>
                      {technique.name}
                    </CardTitle>
                    <CardDescription>{technique.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-purple-600" />
                          How to do it:
                        </h4>
                        <p className="text-sm text-muted-foreground">{technique.how}</p>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-purple-600" />
                          Example:
                        </h4>
                        <p className="text-sm">{technique.example}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Common Questions */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <FileText className="w-3 h-3 mr-1" />
                {pageData.commonQuestions.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">{pageData.commonQuestions.title}</h2>
            </div>
            
            {pageData.commonQuestions.categories.map((category, catIdx) => (
              <div key={catIdx} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  {category.name}
                </h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((q) => (
                    <AccordionItem 
                      key={q.id} 
                      value={q.id}
                      className="bg-background border rounded-lg px-4"
                      data-testid={`accordion-${q.id}`}
                    >
                      <AccordionTrigger className="text-left hover:no-underline" data-testid={`trigger-${q.id}`}>
                        {q.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-purple-600 border-purple-600">
                              Framework: {q.framework}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{q.answer}</p>
                          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                            <p className="text-sm">
                              <span className="font-medium">Example Answer: </span>
                              {q.example}
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* What Managers Want */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Star className="w-3 h-3 mr-1" />
                {pageData.whatManagersWant.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.whatManagersWant.title}</h2>
              <p className="text-muted-foreground">{pageData.whatManagersWant.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pageData.whatManagersWant.qualities.map((item, idx) => (
                <Card key={idx} className="hover-elevate" data-testid={`card-quality-${idx}`}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">{item.quality}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                        {item.howToShow}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Practical Tips */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <CheckCircle className="w-3 h-3 mr-1" />
                {pageData.practicalTips.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">{pageData.practicalTips.title}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {pageData.practicalTips.sections.map((section, idx) => (
                <Card key={idx} data-testid={`card-tips-${idx}`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <EmotionalConnectionSection content={emotionalContent.softSkills} pageKey="softSkills" />

        {/* Soft Skills Roadmap */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Calendar className="w-3 h-3 mr-1" />
                {pageData.roadmap.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.roadmap.title}</h2>
              <p className="text-lg text-purple-600 font-semibold">{pageData.roadmap.subtitle}</p>
            </div>
            
            <div className="space-y-6">
              {pageData.roadmap.weeks.map((week, idx) => (
                <Card key={idx} className="overflow-hidden" data-testid={`card-week-${idx}`}>
                  <CardHeader className="bg-purple-500/10 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold">
                        {week.week}
                      </div>
                      <div>
                        <CardTitle>{week.title}</CardTitle>
                        <CardDescription className="text-purple-600 font-medium">{week.focus}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {week.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
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
                <a href="/solution-architect">
                  {pageData.cta.secondaryButton}
                  <BookOpen className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <VideoTipsCarousel pageKey="softSkills" />
      </main>
      <Footer />
      <WhatsAppWidget />
      <FloatingSocialShare title="Soft Skills Guide" />
    </div>
  );
}
