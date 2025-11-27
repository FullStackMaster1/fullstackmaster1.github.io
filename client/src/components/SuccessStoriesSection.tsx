import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Award, CheckCircle } from "lucide-react";
import { SiWhatsapp, SiAmazon } from "react-icons/si";
import successStoriesData from "@/data/successStories.json";

interface SuccessStory {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogo: string;
  outcome: string;
  review: string;
  coachReply?: string;
  sessionType: string;
  date: string;
  rating: number;
  featured: boolean;
}

export default function SuccessStoriesSection() {
  const {
    sectionBadge,
    sectionTitle,
    sectionTitleHighlight,
    sectionDescription,
    sourceNote,
    sourceLink,
    labels,
    overallRating,
    successStories,
    ctaButton,
  } = successStoriesData;

  const featuredStories = (successStories as SuccessStory[]).filter(s => s.featured);

  return (
    <section
      id="success-stories"
      className="py-16 md:py-24 bg-gradient-to-b from-green-500/5 to-background"
      data-testid="section-success-stories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            {sectionDescription}
          </p>
          <a
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            data-testid="link-source"
          >
            {sourceNote}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredStories.map((story) => (
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
                      {story.role} • {story.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-sm mb-4 italic border-l-2 border-primary/30 pl-3">
                  "{story.review}"
                </blockquote>

                {story.coachReply && (
                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-muted-foreground mb-1">{labels.coachNote}</p>
                    <p className="text-xs">{story.coachReply}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {story.sessionType}
                  </Badge>
                  <span>{story.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
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
                <SiWhatsapp className="w-4 h-4 mr-2" />
                {ctaButton.text}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href={sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-view-all-reviews"
              >
                {labels.viewAllReviews}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
