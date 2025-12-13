import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, CheckCircle, ExternalLink, Shield, Building2, Sparkles, Share2 } from "lucide-react";
import { SiAmazon, SiGoogle, SiDatabricks, SiRedhat, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import successStoriesData from "@/data/successStories.json";

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

interface SuccessStory {
  id: string;
  name: string;
  role: string;
  company: string;
  companyIcon: string;
  outcome: string;
  review: string;
  coachReply?: string;
  sessionType: string;
  date: string;
  rating: number;
  featured: boolean;
  verified?: boolean;
}

// Helper to parse date strings like "Sep 2025" to Date objects
const parseStoryDate = (dateStr: string): Date => {
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

export default function SuccessStoriesSection() {
  const {
    sectionBadge,
    sectionTitle,
    sectionTitleHighlight,
    sectionDescription,
    sourceNote,
    sourceLink,
    verifyBanner,
    labels,
    overallRating,
    offerHighlights,
    successStories,
    ctaButton,
  } = successStoriesData;

  // Sort by date (newest first) then filter for featured
  const sortedStories = [...(successStories as SuccessStory[])].sort((a, b) => 
    parseStoryDate(b.date).getTime() - parseStoryDate(a.date).getTime()
  );
  const featuredStories = sortedStories.filter(s => s.featured);

  return (
    <section
      id="success-stories"
      className="py-10 md:py-14 bg-gradient-to-b from-green-500/5 to-background"
      data-testid="section-success-stories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge className="bg-green-500 mb-4">
            <Award className="w-3 h-3 mr-1" />
            {sectionBadge}
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-success-title"
          >
            {sectionTitle}{" "}
            <span className="text-green-500">{sectionTitleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 border border-green-500/20 rounded-lg p-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">{verifyBanner.text}</span>
            </div>
            <Button size="sm" variant="outline" className="border-green-500 text-green-600" asChild>
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

        {offerHighlights && offerHighlights.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {offerHighlights.map((offer, index) => {
                const IconComponent = companyIcons[offer.companyIcon] || Building2;
                const colorClass = companyColors[offer.companyIcon] || "text-primary";
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-card border border-green-500/30 rounded-lg px-4 py-3 shadow-sm"
                    data-testid={`offer-highlight-${index}`}
                  >
                    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${colorClass}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{offer.name}</span>
                        <Badge className="bg-green-500 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {labels.gotOffer}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {labels.landedAt} <span className="font-medium text-foreground">{offer.company}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredStories.map((story) => {
            const IconComponent = companyIcons[story.companyIcon] || Building2;
            const colorClass = companyColors[story.companyIcon] || "text-primary";
            return (
              <Card
                key={story.id}
                className={`hover-elevate transition-all duration-200 ${
                  story.outcome === "Landed Role"
                    ? "border-green-500/50 bg-green-500/5"
                    : ""
                }`}
                data-testid={`card-success-${story.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{story.name}</span>
                          {story.outcome === "Landed Role" && (
                            <Badge className="bg-green-500 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {labels.gotOffer}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {story.role}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          {story.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    {story.verified && (
                      <Badge variant="outline" className="ml-2 text-xs border-green-500/50 text-green-600">
                        <Shield className="w-3 h-3 mr-1" />
                        {labels.verified}
                      </Badge>
                    )}
                  </div>

                  <blockquote className="text-sm mb-4 italic border-l-2 border-primary/30 pl-3">
                    "{story.review}"
                  </blockquote>

                  {story.outcome === "Landed Role" && (
                    <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 rounded-md px-3 py-2 mb-4">
                      <span className="text-sm font-medium">{story.name} got an offer at</span>
                      <div className="flex items-center gap-1.5 bg-white dark:bg-card rounded px-2 py-1">
                        <IconComponent className={`w-4 h-4 ${colorClass}`} />
                        <span className="text-sm font-semibold text-foreground">{story.company}</span>
                      </div>
                    </div>
                  )}

                  {story.coachReply && (
                    <div className="bg-muted/50 rounded-lg p-3 mb-4">
                      <p className="text-xs text-muted-foreground mb-1">{labels.coachNote}</p>
                      <p className="text-xs">{story.coachReply}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <Badge variant="outline" className="text-xs">
                      {story.sessionType}
                    </Badge>
                    <span>{story.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Share2 className="w-3 h-3" />
                      Share this win
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        data-testid={`share-linkedin-${story.id}`}
                      >
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://fullstackmaster.net?story=${story.id}`)}`}
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
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${story.name} landed a ${story.role} role at ${story.company} after coaching with @FullStackMaster! Check out their success story:`)}&url=${encodeURIComponent(`https://fullstackmaster.net`)}`}
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
                          href={`https://wa.me/?text=${encodeURIComponent(`Check out this success story: ${story.name} landed a ${story.role} role at ${story.company} after coaching! https://fullstackmaster.net`)}`}
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

        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-muted/50 rounded-full">
            <span className="text-2xl font-bold text-primary">{overallRating.score}</span>
            <div className="flex items-center gap-0.5">
              {[...Array(overallRating.stars)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{labels.ratingText}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a
                href={ctaButton.link}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-join-success"
              >
                {ctaButton.text}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-green-500 text-green-600" asChild>
              <a
                href={sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-view-all-reviews"
              >
                <Shield className="w-4 h-4 mr-2" />
                {labels.viewAllReviews}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            <a
              href={sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors"
              data-testid="link-source"
            >
              {sourceNote}
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
