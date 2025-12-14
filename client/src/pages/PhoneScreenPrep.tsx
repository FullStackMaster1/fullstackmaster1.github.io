import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { 
  Phone,
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
  LucideIcon
} from "lucide-react";
import pageData from "@/data/phoneScreenPage.json";
import profileData from "@/data/profile.json";
import emotionalContent from "@/data/emotionalContent.json";
import VideoTipsCarousel from "@/components/VideoTipsCarousel";
import EmotionalConnectionSection from "@/components/EmotionalConnectionSection";

const roleIcons: Record<string, LucideIcon> = {
  Users,
  Server,
  ClipboardList,
  Building,
  Briefcase,
  Cloud
};

const approachIcons: Record<string, LucideIcon> = {
  MessageCircle,
  Phone,
  Target,
  Search
};

const roleColorClasses: Record<string, { text: string; bg: string }> = {
  orange: { text: "text-orange-600", bg: "bg-orange-500/10" },
  blue: { text: "text-blue-600", bg: "bg-blue-500/10" },
  purple: { text: "text-purple-600", bg: "bg-purple-500/10" },
  green: { text: "text-green-600", bg: "bg-green-500/10" },
  amber: { text: "text-amber-600", bg: "bg-amber-500/10" },
  cyan: { text: "text-cyan-600", bg: "bg-cyan-500/10" }
};

export default function PhoneScreenPrep() {
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
        <section className="py-16 md:py-24 bg-gradient-to-b from-blue-500/10 via-blue-500/5 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="default" className="mb-4 text-sm px-4 py-1 bg-blue-600" data-testid="badge-hero">
              <Phone className="w-4 h-4 mr-2" />
              {pageData.hero.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
              {pageData.hero.title}
            </h1>
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
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
                  Book Phone Screen Prep
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-hero-secondary">
                <a href="#what-is-phone-screen">
                  Read the Guide
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* What is Phone Screen */}
        <section id="what-is-phone-screen" className="py-16 bg-muted/30 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                {pageData.whatIsPhoneScreen.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.whatIsPhoneScreen.title}</h2>
              <p className="text-muted-foreground">{pageData.whatIsPhoneScreen.subtitle}</p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-8">
              <p className="text-center">{pageData.whatIsPhoneScreen.overview}</p>
            </div>

            {/* Key Facts */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              {pageData.whatIsPhoneScreen.keyFacts.map((fact, idx) => (
                <Card key={idx} className="text-center" data-testid={`card-fact-${idx}`}>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{fact.value}</div>
                    <h3 className="font-semibold mb-1">{fact.label}</h3>
                    <p className="text-xs text-muted-foreground">{fact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stages */}
            <h3 className="text-2xl font-bold mb-6 text-center">Phone Screen Stages</h3>
            <div className="space-y-4">
              {pageData.whatIsPhoneScreen.stages.map((stage, idx) => (
                <Card key={idx} className="hover-elevate" data-testid={`card-stage-${idx}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </div>
                        {stage.name}
                      </CardTitle>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        {stage.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2"><span className="font-medium">Focus:</span> {stage.focus}</p>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                        <span className="font-medium">Pro Tip:</span> {stage.tips}
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
                const colors = roleColorClasses[role.color] || roleColorClasses.blue;
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
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-blue-600" />
                            Key Questions They'll Ask
                          </h4>
                          <ul className="space-y-2">
                            {role.keyQuestions.map((q, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <span className="text-blue-600 font-bold shrink-0">{i + 1}.</span>
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Must Demonstrate
                          </h4>
                          <ul className="space-y-2">
                            {role.mustDemonstrate.map((item, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-green-600 mt-1 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          Common Mistakes
                        </h4>
                        <ul className="space-y-1">
                          {role.commonMistakes.map((mistake, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <XCircle className="w-3 h-3 text-red-500 mt-1 shrink-0" />
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

        {/* Common Questions */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <MessageCircle className="w-3 h-3 mr-1" />
                {pageData.commonQuestions.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.commonQuestions.title}</h2>
              <p className="text-muted-foreground">{pageData.commonQuestions.subtitle}</p>
            </div>
            
            <div className="space-y-4">
              {pageData.commonQuestions.questions.map((q, idx) => (
                <Card key={idx} data-testid={`card-question-${idx}`}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">"{q.question}"</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      <span className="font-medium text-foreground">What they want: </span>
                      {q.what_they_want}
                    </p>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <p className="text-sm">
                        <span className="font-medium text-green-600">Tip: </span>
                        {q.tip}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Red Flags */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="destructive" className="mb-4">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {pageData.redFlags.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.redFlags.title}</h2>
              <p className="text-muted-foreground">{pageData.redFlags.subtitle}</p>
            </div>
            
            <div className="space-y-4">
              {pageData.redFlags.flags.map((flag, idx) => (
                <Card key={idx} className="border-red-500/30" data-testid={`card-flag-${idx}`}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold flex items-center gap-2 text-red-600 mb-2">
                      <XCircle className="w-5 h-5" />
                      {flag.flag}
                    </h3>
                    <p className="text-sm text-muted-foreground">{flag.why}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Preparation */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Clock className="w-3 h-3 mr-1" />
                {pageData.preparation.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{pageData.preparation.title}</h2>
              <p className="text-muted-foreground">{pageData.preparation.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageData.preparation.steps.map((step, idx) => (
                <Card key={idx} data-testid={`card-prep-${idx}`}>
                  <CardHeader className="bg-blue-500/10">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                        {step.step}
                      </div>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {step.activities.map((activity, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 mt-1 shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <EmotionalConnectionSection content={emotionalContent.phoneScreen} pageKey="phoneScreen" />

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
                      <div className="p-3 rounded-lg bg-blue-500/10 w-fit mb-4">
                        <IconComponent className="w-6 h-6 text-blue-600" />
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
        <section className="py-16 bg-blue-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
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

        <VideoTipsCarousel pageKey="phoneScreen" />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
