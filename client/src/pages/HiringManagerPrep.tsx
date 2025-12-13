import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { 
  UserCheck,
  Clock,
  Users,
  Target,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  Search,
  Briefcase,
  Building,
  Cloud,
  Server,
  ClipboardList,
  BookOpen,
  Lightbulb,
  LucideIcon
} from "lucide-react";
import pageData from "@/data/hiringManagerPage.json";
import profileData from "@/data/profile.json";
import VideoTipsCarousel from "@/components/VideoTipsCarousel";

const roleIcons: Record<string, LucideIcon> = {
  Users,
  Server,
  ClipboardList,
  Building,
  Briefcase,
  Cloud
};

const approachIcons: Record<string, LucideIcon> = {
  Search,
  Users,
  Target,
  MessageCircle
};

const roleColorClasses: Record<string, { text: string; bg: string }> = {
  orange: { text: "text-orange-600", bg: "bg-orange-500/10" },
  blue: { text: "text-blue-600", bg: "bg-blue-500/10" },
  purple: { text: "text-purple-600", bg: "bg-purple-500/10" },
  green: { text: "text-green-600", bg: "bg-green-500/10" },
  amber: { text: "text-amber-600", bg: "bg-amber-500/10" },
  cyan: { text: "text-cyan-600", bg: "bg-cyan-500/10" }
};

export default function HiringManagerPrep() {
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
        <section className="py-16 md:py-24 bg-gradient-to-b from-purple-500/10 via-purple-500/5 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="default" className="mb-4 text-sm px-4 py-1 bg-purple-600" data-testid="badge-hero">
              <UserCheck className="w-4 h-4 mr-2" />
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
                  Book HM Prep Session
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-hero-secondary">
                <a href="#what-is-hm-round">
                  Read the Guide
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* What is HM Round */}
        <section id="what-is-hm-round" className="py-16 bg-muted/30 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                {pageData.whatIsHMRound.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.whatIsHMRound.title}</h2>
              <p className="text-muted-foreground">{pageData.whatIsHMRound.subtitle}</p>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6 mb-8">
              <p className="text-center">{pageData.whatIsHMRound.overview}</p>
            </div>

            {/* Key Facts */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              {pageData.whatIsHMRound.keyFacts.map((fact, idx) => (
                <Card key={idx} className="text-center" data-testid={`card-fact-${idx}`}>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{fact.value}</div>
                    <h3 className="font-semibold mb-1">{fact.label}</h3>
                    <p className="text-xs text-muted-foreground">{fact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* What HM Evaluates */}
            <h3 className="text-2xl font-bold mb-6 text-center">What the Hiring Manager Evaluates</h3>
            <div className="space-y-4">
              {pageData.whatIsHMRound.whatHMEvaluates.map((item, idx) => (
                <Card key={idx} className="hover-elevate" data-testid={`card-evaluate-${idx}`}>
                  <CardContent className="pt-6">
                    <h4 className="font-bold text-lg mb-2">{item.area}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
                      <p className="text-sm">
                        <span className="font-medium text-purple-600">Example: </span>
                        {item.example}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Role-Specific Prep */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Briefcase className="w-3 h-3 mr-1" />
                {pageData.roleSpecificPrep.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.roleSpecificPrep.title}</h2>
              <p className="text-muted-foreground">{pageData.roleSpecificPrep.subtitle}</p>
            </div>
            
            <div className="space-y-6">
              {pageData.roleSpecificPrep.roles.map((role, idx) => {
                const IconComponent = roleIcons[role.icon] || Briefcase;
                const colors = roleColorClasses[role.color] || roleColorClasses.purple;
                return (
                  <Card key={idx} className="overflow-hidden" data-testid={`card-role-${idx}`}>
                    <CardHeader className={colors.bg}>
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg bg-background/80`}>
                          <IconComponent className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div>
                          <CardTitle>{role.title}</CardTitle>
                          <Badge variant="secondary" className="mt-1">{role.level}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-purple-600" />
                            What the HM Wants
                          </h4>
                          <ul className="space-y-2">
                            {role.hmWants.map((want, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-green-600 mt-1 shrink-0" />
                                {want}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-purple-600" />
                            Key Questions
                          </h4>
                          <ul className="space-y-2">
                            {role.keyQuestions.map((q, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <span className="text-purple-600 font-bold shrink-0">{i + 1}.</span>
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-600">
                          <Lightbulb className="w-4 h-4" />
                          Show Them This
                        </h4>
                        <p className="text-sm">{role.showThem}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Winning Strategies */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                {pageData.winningStrategies.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.winningStrategies.title}</h2>
              <p className="text-muted-foreground">{pageData.winningStrategies.subtitle}</p>
            </div>
            
            <div className="space-y-4">
              {pageData.winningStrategies.strategies.map((s, idx) => (
                <Card key={idx} className="hover-elevate" data-testid={`card-strategy-${idx}`}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </div>
                      {s.strategy}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{s.description}</p>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
                      <p className="text-sm italic">"{s.example}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              {pageData.commonMistakes.mistakes.map((m, idx) => (
                <Card key={idx} className="overflow-hidden" data-testid={`card-mistake-${idx}`}>
                  <CardHeader className="bg-red-500/5 border-b pb-3">
                    <CardTitle className="text-lg flex items-center gap-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      {m.mistake}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          The Reality:
                        </h4>
                        <p className="text-sm text-muted-foreground">{m.reality}</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          The Fix:
                        </h4>
                        <p className="text-sm">{m.fix}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Questions to Ask */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <MessageCircle className="w-3 h-3 mr-1" />
                {pageData.questionsToAsk.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.questionsToAsk.title}</h2>
              <p className="text-muted-foreground">{pageData.questionsToAsk.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {pageData.questionsToAsk.questions.map((q, idx) => (
                <Card key={idx} data-testid={`card-ask-${idx}`}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-2">"{q.question}"</h3>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-purple-600">Why it works: </span>
                      {q.why}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How I Help */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                {pageData.howIHelp.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.howIHelp.title}</h2>
              <p className="text-muted-foreground">{pageData.howIHelp.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pageData.howIHelp.approach.map((item, idx) => {
                const IconComponent = approachIcons[item.icon] || Target;
                return (
                  <Card key={idx} className="hover-elevate" data-testid={`card-approach-${idx}`}>
                    <CardContent className="pt-6">
                      <div className="p-3 rounded-lg bg-purple-500/10 w-fit mb-4">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <UserCheck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
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

        <VideoTipsCarousel pageKey="hiringManager" />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
