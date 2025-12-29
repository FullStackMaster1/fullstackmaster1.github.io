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
  Zap,
  Clock,
  Users,
  Target,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Shield,
  Star,
  Briefcase,
  Building,
  Cloud,
  Server,
  ClipboardList,
  Search,
  Code,
  MessageCircle,
  Award,
  BookOpen,
  Calendar,
  LucideIcon
} from "lucide-react";
import pageData from "@/data/awsLoopPage.json";
import profileData from "@/data/profile.json";
import emotionalContent from "@/data/emotionalContent.json";
import VideoTipsCarousel from "@/components/VideoTipsCarousel";
import EmotionalConnectionSection from "@/components/EmotionalConnectionSection";

const roleIcons: Record<string, LucideIcon> = {
  Server,
  ClipboardList,
  Building,
  Users,
  Briefcase,
  Cloud
};

const approachIcons: Record<string, LucideIcon> = {
  Search,
  Target,
  Shield,
  Code,
  MessageCircle,
  Briefcase
};

const roleColorClasses: Record<string, { text: string; bg: string }> = {
  orange: { text: "text-orange-600", bg: "bg-orange-500/10" },
  blue: { text: "text-blue-600", bg: "bg-blue-500/10" },
  purple: { text: "text-purple-600", bg: "bg-purple-500/10" },
  green: { text: "text-green-600", bg: "bg-green-500/10" },
  amber: { text: "text-amber-600", bg: "bg-amber-500/10" },
  red: { text: "text-red-600", bg: "bg-red-500/10" }
};

export default function AWSLoopPrep() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
        <meta name="keywords" content={pageData.seo.keywords.join(", ")} />
        <link rel="canonical" href="https://www.fullstackmaster.net/aws-loop" />
        <meta property="og:title" content={pageData.seo.title} />
        <meta property="og:description" content={pageData.seo.description} />
        <meta property="og:url" content="https://www.fullstackmaster.net/aws-loop" />
        <meta property="og:image" content="https://www.fullstackmaster.net/og-image.png" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="FullStack Master" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.seo.title} />
        <meta name="twitter:description" content={pageData.seo.description} />
        <meta name="twitter:image" content="https://www.fullstackmaster.net/og-image.png" />
        <meta name="author" content="Rupesh Tiwari" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <AnnouncementBar />
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-orange-500/10 via-orange-500/5 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="default" className="mb-4 text-sm px-4 py-1 bg-orange-600" data-testid="badge-hero">
              <Zap className="w-4 h-4 mr-2" />
              {pageData.hero.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
              {pageData.hero.title}
            </h1>
            <p className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
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
                  Book Loop Prep Session
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-hero-secondary">
                <a href="#what-is-loop">
                  Read the Guide
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* What is the Loop */}
        <section id="what-is-loop" className="py-16 bg-muted/30 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                {pageData.whatIsLoop.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.whatIsLoop.title}</h2>
              <p className="text-muted-foreground">{pageData.whatIsLoop.subtitle}</p>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 mb-8">
              <p className="text-center">{pageData.whatIsLoop.overview}</p>
            </div>

            {/* Key Facts */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              {pageData.whatIsLoop.keyFacts.map((fact, idx) => (
                <Card key={idx} className="text-center" data-testid={`card-fact-${idx}`}>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-orange-600 mb-1">{fact.value}</div>
                    <h3 className="font-semibold mb-1">{fact.label}</h3>
                    <p className="text-xs text-muted-foreground">{fact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Loop Rounds */}
            <h3 className="text-2xl font-bold mb-6 text-center">The Loop Rounds</h3>
            <div className="space-y-4">
              {pageData.whatIsLoop.rounds.map((round, idx) => (
                <Card key={idx} className="hover-elevate" data-testid={`card-round-${idx}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </div>
                        {round.name}
                      </CardTitle>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        {round.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2"><span className="font-medium">Focus:</span> {round.focus}</p>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                        <span className="font-medium">Pro Tip:</span> {round.tips}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Roles We Coach */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Briefcase className="w-3 h-3 mr-1" />
                {pageData.rolesWeCoach.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.rolesWeCoach.title}</h2>
              <p className="text-muted-foreground">{pageData.rolesWeCoach.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageData.rolesWeCoach.roles.map((role, idx) => {
                const IconComponent = roleIcons[role.icon] || Briefcase;
                const colors = roleColorClasses[role.color] || roleColorClasses.orange;
                return (
                  <Card key={idx} className="hover-elevate" data-testid={`card-role-${idx}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-3 rounded-lg ${colors.bg}`}>
                          <IconComponent className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{role.title}</CardTitle>
                          <Badge variant="secondary" className="mt-1">{role.level}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Focus Areas</p>
                        <ul className="space-y-1">
                          {role.focusAreas.map((area, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-green-600 mt-1 shrink-0" />
                              {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold mb-1">Unique Challenge:</p>
                        <p className="text-xs text-muted-foreground">{role.uniqueChallenges}</p>
                      </div>
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
                        <p className="text-xs">
                          <span className="font-medium">Common Question: </span>
                          <span className="text-muted-foreground">{role.commonQuestion}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bar Raiser */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Shield className="w-3 h-3 mr-1" />
                {pageData.barRaiser.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.barRaiser.title}</h2>
              <p className="text-muted-foreground">{pageData.barRaiser.subtitle}</p>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 mb-8">
              <Shield className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <p className="text-center">{pageData.barRaiser.overview}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {pageData.barRaiser.whatTheyEvaluate.map((item, idx) => (
                <Card key={idx} data-testid={`card-evaluate-${idx}`}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-2">{item.area}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Red Flags */}
              <Card className="border-red-500/30">
                <CardHeader className="bg-red-500/10">
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    Red Flags (Avoid These)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {pageData.barRaiser.redFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Green Flags */}
              <Card className="border-green-500/30">
                <CardHeader className="bg-green-500/10">
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    Green Flags (Do These)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {pageData.barRaiser.greenFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="destructive" className="mb-4">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {pageData.commonMistakes.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.commonMistakes.title}</h2>
              <p className="text-muted-foreground">{pageData.commonMistakes.subtitle}</p>
            </div>
            
            <div className="space-y-4">
              {pageData.commonMistakes.mistakes.map((mistake, idx) => (
                <Card key={idx} className="overflow-hidden" data-testid={`card-mistake-${idx}`}>
                  <CardHeader className="bg-red-500/5 border-b pb-3">
                    <CardTitle className="text-lg flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold">
                        {mistake.number}
                      </div>
                      {mistake.mistake}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          The Reality:
                        </h4>
                        <p className="text-sm text-muted-foreground">{mistake.reality}</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          The Fix:
                        </h4>
                        <p className="text-sm">{mistake.fix}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Principles */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Star className="w-3 h-3 mr-1" />
                {pageData.leadershipPrinciples.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.leadershipPrinciples.title}</h2>
              <p className="text-muted-foreground">{pageData.leadershipPrinciples.subtitle}</p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-2">
              {pageData.leadershipPrinciples.principles.map((lp, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`lp-${idx}`}
                  className="bg-background border rounded-lg px-4"
                  data-testid={`accordion-lp-${idx}`}
                >
                  <AccordionTrigger className="text-left hover:no-underline" data-testid={`trigger-lp-${idx}`}>
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      {lp.name}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      <p className="text-muted-foreground">{lp.description}</p>
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                        <p className="text-sm">
                          <span className="font-medium text-orange-600">Senior Level Expectation: </span>
                          {lp.seniorExpectation}
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm">
                          <span className="font-medium">Sample Question: </span>
                          <span className="text-muted-foreground italic">"{lp.sampleQuestion}"</span>
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Preparation Roadmap */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Calendar className="w-3 h-3 mr-1" />
                {pageData.preparationRoadmap.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.preparationRoadmap.title}</h2>
              <p className="text-lg text-orange-600 font-semibold">{pageData.preparationRoadmap.subtitle}</p>
            </div>
            
            <div className="space-y-6">
              {pageData.preparationRoadmap.weeks.map((week, idx) => (
                <Card key={idx} className="overflow-hidden" data-testid={`card-week-${idx}`}>
                  <CardHeader className="bg-orange-500/10 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center text-xl font-bold">
                        {week.week}
                      </div>
                      <div>
                        <CardTitle>{week.title}</CardTitle>
                        <CardDescription className="text-orange-600 font-medium">{week.focus}</CardDescription>
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

        <EmotionalConnectionSection content={emotionalContent.awsLoop} pageKey="awsLoop" />

        {/* How I Help */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Award className="w-3 h-3 mr-1" />
                {pageData.howIHelp.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.howIHelp.title}</h2>
              <p className="text-muted-foreground">{pageData.howIHelp.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {pageData.howIHelp.approach.map((item, idx) => {
                const IconComponent = approachIcons[item.icon] || Target;
                return (
                  <Card key={idx} className="hover-elevate" data-testid={`card-approach-${idx}`}>
                    <CardContent className="pt-6">
                      <div className="p-3 rounded-lg bg-orange-500/10 w-fit mb-4">
                        <IconComponent className="w-6 h-6 text-orange-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Success Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              {pageData.successRate.stats.map((stat, idx) => (
                <Card key={idx} className="text-center bg-orange-500/5 border-orange-500/20" data-testid={`card-stat-${idx}`}>
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-orange-600 mb-1">{stat.value}</div>
                    <h3 className="font-semibold mb-1">{stat.label}</h3>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Zap className="w-12 h-12 text-orange-600 mx-auto mb-4" />
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
                  <BookOpen className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <VideoTipsCarousel pageKey="awsLoop" />
      </main>
      <Footer />
      <WhatsAppWidget />
      <FloatingSocialShare title="AWS Loop Prep" />
    </div>
  );
}
