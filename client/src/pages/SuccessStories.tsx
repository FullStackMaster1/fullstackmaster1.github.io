import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Award,
  Star,
  CheckCircle,
  ExternalLink,
  Shield,
  Building2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  MessageCircle,
  Info,
} from "lucide-react";
import { SiAmazon, SiGoogle, SiDatabricks, SiRedhat, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import FloatingSocialShare from "@/components/FloatingSocialShare";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollReveal from "@/components/ScrollReveal";
import SalaryCalculator from "@/components/SalaryCalculator";
import successStoriesPageData from "@/data/successStoriesPage.json";
import profile from "@/data/profile.json";
import { trackEvent } from "@/lib/analytics";
import { SectionShareButtons } from "@/components/SocialShare";

const companyIcons: Record<string, typeof SiAmazon | typeof Building2 | typeof Sparkles> = {
  amazon: SiAmazon,
  google: SiGoogle,
  databricks: SiDatabricks,
  redhat: SiRedhat,
  faang: Sparkles,
  draftkings: Building2,
  enterprise: Building2,
  cloud: Building2,
  tech: Building2,
};

const companyColors: Record<string, string> = {
  amazon: "text-orange-500",
  google: "text-blue-500",
  databricks: "text-red-500",
  redhat: "text-red-600",
  faang: "text-purple-500",
  draftkings: "text-green-600",
  enterprise: "text-primary",
  cloud: "text-blue-400",
  tech: "text-primary",
};

const avatarBgColors: Record<string, string> = {
  amazon: "bg-orange-100 dark:bg-orange-900/30",
  google: "bg-blue-100 dark:bg-blue-900/30",
  databricks: "bg-red-100 dark:bg-red-900/30",
  redhat: "bg-red-100 dark:bg-red-900/30",
  faang: "bg-purple-100 dark:bg-purple-900/30",
  draftkings: "bg-green-100 dark:bg-green-900/30",
  enterprise: "bg-primary/10",
  cloud: "bg-blue-100 dark:bg-blue-900/30",
  tech: "bg-primary/10",
};

interface FeaturedStory {
  id: string;
  name: string;
  previousRole: string;
  previousCompany: string;
  newRole: string;
  newCompany: string;
  companyIcon: string;
  outcome: string;
  sessionsInvested: string;
  focusArea: string;
  salaryRange: string;
  salarySource: string;
  review: string;
  coachReply: string | null;
  date: string;
  rating: number;
  verified: boolean;
  verificationLink: string;
  featured: boolean;
}

interface AdditionalStory {
  id: string;
  name: string;
  newRole: string;
  newCompany: string;
  companyIcon: string;
  outcome: string;
  sessionsInvested: string;
  focusArea: string;
  review: string;
  coachReply: string | null;
  date: string;
  rating: number;
  verified: boolean;
}

export default function SuccessStories() {
  const handleCTAClick = (ctaType: string) => {
    trackEvent("cta_click", "success_stories", ctaType);
  };

  const { seo, hero, verifyBanner, salaryDisclaimer, featuredStories, additionalStories, outcomeSummary, cta } =
    successStoriesPageData;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(", ")} />
        <link rel="canonical" href="https://www.fullstackmaster.net/success-stories" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://www.fullstackmaster.net/success-stories" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.fullstackmaster.net/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="author" content={profile.personal.name} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Success Stories",
            "description": seo.description,
            "url": "https://www.fullstackmaster.net/success-stories",
            "author": {
              "@type": "Person",
              "name": profile.personal.name,
            },
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
                "item": "https://www.fullstackmaster.net/",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Success Stories",
                "item": "https://www.fullstackmaster.net/success-stories",
              },
            ],
          })}
        </script>
      </Helmet>

      <Navigation />
      <Breadcrumb items={[{ label: "Success Stories" }]} />
      <FloatingSocialShare />

      <main className="pt-20" data-testid="success-stories-main-content">
        <section
          className="py-16 md:py-24 bg-gradient-to-b from-green-50/50 dark:from-green-950/20 to-background"
          data-testid="section-hero"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-4 bg-green-500 text-white" data-testid="badge-hero">
                <Award className="w-3 h-3 mr-1" />
                {hero.badge}
              </Badge>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                data-testid="text-success-hero-title"
              >
                {hero.title}{" "}
                <span className="text-green-600 dark:text-green-400">{hero.titleHighlight}</span>
              </h1>

              <p
                className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
                data-testid="text-success-hero-subtitle"
              >
                {hero.subtitle}
              </p>

              <div
                className="flex flex-wrap justify-center gap-6 mb-10"
                data-testid="container-hero-stats"
              >
                {hero.stats.map((stat, idx) => (
                  <div key={idx} className="text-center px-4" data-testid={`stat-hero-${idx}`}>
                    <div
                      className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400"
                      data-testid={`text-stat-value-${idx}`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-sm text-muted-foreground"
                      data-testid={`text-stat-label-${idx}`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleCTAClick("hero_book_consultation");
                    window.open(cta.primaryLink, "_blank");
                  }}
                  data-testid="button-hero-book"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {cta.primaryButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-500 text-green-600"
                  onClick={() => {
                    handleCTAClick("hero_verify_reviews");
                    window.open(verifyBanner.link, "_blank");
                  }}
                  data-testid="button-hero-verify"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  {verifyBanner.buttonText}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <SectionShareButtons sectionName="Success Stories" className="mt-6" />
            </div>
          </div>
        </section>

        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-8"
          data-testid="verify-banner"
        >
          <div className="bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">{verifyBanner.text}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-green-500 text-green-600"
                asChild
              >
                <a
                  href={verifyBanner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-verify-reviews"
                >
                  {verifyBanner.buttonText}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <ScrollReveal type="fade">
          <section className="py-12 md:py-16" data-testid="section-outcome-summary">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  data-testid="text-outcome-title"
                >
                  {outcomeSummary.title}
                </h2>
                <p className="text-lg text-muted-foreground">{outcomeSummary.subtitle}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {outcomeSummary.items.map((item, idx) => (
                  <Card key={idx} className="text-center" data-testid={`card-outcome-${idx}`}>
                    <CardContent className="pt-6">
                      <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {item.metric}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="slide-up">
          <section
            className="py-12 md:py-16 bg-card/50"
            data-testid="section-featured-stories"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <Badge className="mb-4 bg-green-500 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Landed Roles
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-featured-title">
                  Featured Success Stories
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Professionals who landed their dream roles after coaching
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {(featuredStories as FeaturedStory[]).map((story) => {
                  const IconComponent = companyIcons[story.companyIcon] || Building2;
                  const colorClass = companyColors[story.companyIcon] || "text-primary";
                  const bgClass = avatarBgColors[story.companyIcon] || "bg-primary/10";

                  return (
                    <Card
                      key={story.id}
                      className="hover-elevate border-green-500/30"
                      data-testid={`card-featured-${story.id}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className={`w-14 h-14 ${bgClass}`}>
                            <AvatarFallback className={`${bgClass} ${colorClass} text-lg font-bold`}>
                              {story.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-lg">{story.name}</span>
                              {story.outcome === "Landed Role" && (
                                <Badge className="bg-green-500 text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Got Offer
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <IconComponent className={`w-4 h-4 ${colorClass}`} />
                              <span className="font-medium">{story.newRole}</span>
                              <span className="text-muted-foreground">at</span>
                              <span className="font-semibold">{story.newCompany}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(story.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          {story.verified && (
                            <Badge
                              variant="outline"
                              className="ml-2 text-xs border-green-500/50 text-green-600"
                            >
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>

                        <blockquote className="text-sm mb-4 italic border-l-2 border-green-500/30 pl-3">
                          "{story.review}"
                        </blockquote>

                        {story.coachReply && (
                          <div className="bg-muted/50 rounded-lg p-3 mb-4">
                            <p className="text-xs text-muted-foreground mb-1">
                              Coach's Note:
                            </p>
                            <p className="text-xs">{story.coachReply}</p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Sessions:</span>
                            <span className="font-medium">{story.sessionsInvested}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Focus:</span>
                            <span className="font-medium">{story.focusArea}</span>
                          </div>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium">Estimated TC Range:</span>
                            </div>
                            <span className="font-bold text-green-600 dark:text-green-400">
                              {story.salaryRange}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            Based on {story.salarySource} for role at {story.newCompany}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <span className="text-xs text-muted-foreground">{story.date}</span>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              data-testid={`share-linkedin-${story.id}`}
                            >
                              <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://fullstackmaster.net/success-stories`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Share on LinkedIn"
                              >
                                <SiLinkedin className="w-3.5 h-3.5 text-blue-600" />
                              </a>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              data-testid={`share-twitter-${story.id}`}
                            >
                              <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${story.name} landed a ${story.newRole} role at ${story.newCompany} after coaching!`)}&url=${encodeURIComponent(`https://fullstackmaster.net/success-stories`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Share on X/Twitter"
                              >
                                <FaXTwitter className="w-3.5 h-3.5" />
                              </a>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              data-testid={`share-whatsapp-${story.id}`}
                            >
                              <a
                                href={`https://wa.me/?text=${encodeURIComponent(`Check out this success story: ${story.name} landed a ${story.newRole} role at ${story.newCompany}! https://fullstackmaster.net/success-stories`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Share on WhatsApp"
                              >
                                <SiWhatsapp className="w-3.5 h-3.5 text-green-600" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Info className="w-3 h-3" />
                  {salaryDisclaimer}
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal type="fade">
          <section className="py-12 md:py-16" data-testid="section-additional-stories">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  data-testid="text-additional-title"
                >
                  More Client Reviews
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Additional verified testimonials from coaching clients
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {(additionalStories as AdditionalStory[]).map((story) => {
                  const IconComponent = companyIcons[story.companyIcon] || Building2;
                  const colorClass = companyColors[story.companyIcon] || "text-primary";
                  const bgClass = avatarBgColors[story.companyIcon] || "bg-primary/10";

                  return (
                    <Card
                      key={story.id}
                      className="hover-elevate"
                      data-testid={`card-additional-${story.id}`}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <Avatar className={`w-10 h-10 ${bgClass}`}>
                            <AvatarFallback className={`${bgClass} ${colorClass} font-bold`}>
                              {story.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold">{story.name}</span>
                              <Badge className="bg-blue-500 text-xs">
                                {story.outcome}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <IconComponent className={`w-3 h-3 ${colorClass}`} />
                              {story.newRole} at {story.newCompany}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5 mb-2">
                          {[...Array(story.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          {story.verified && (
                            <Badge
                              variant="outline"
                              className="ml-2 text-xs border-green-500/50 text-green-600"
                            >
                              Verified
                            </Badge>
                          )}
                        </div>

                        <blockquote className="text-sm italic text-muted-foreground mb-3">
                          "{story.review}"
                        </blockquote>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {story.focusArea}
                          </Badge>
                          <span>{story.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <SalaryCalculator />

        <ScrollReveal type="scale">
          <section
            className="py-16 md:py-24 bg-gradient-to-b from-green-50/50 dark:from-green-950/20 to-background"
            data-testid="section-cta"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Badge className="mb-4 bg-green-500 text-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                Your Turn
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
                {cta.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">{cta.subtitle}</p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleCTAClick("footer_book_consultation");
                    window.open(cta.primaryLink, "_blank");
                  }}
                  data-testid="button-cta-book"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {cta.primaryButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-500 text-green-600"
                  onClick={() => {
                    handleCTAClick("footer_verify_reviews");
                    window.open(cta.secondaryLink, "_blank");
                  }}
                  data-testid="button-cta-verify"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  {cta.secondaryButton}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <SectionShareButtons sectionName="Success Stories" className="mt-6" />
            </div>
          </section>
        </ScrollReveal>
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
