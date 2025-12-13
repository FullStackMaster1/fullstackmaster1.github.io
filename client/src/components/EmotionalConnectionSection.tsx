import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Shield,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  MessageCircle,
  Calendar,
  ArrowRight
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import profile from "@/data/profile.json";
import { trackWhatsApp, trackBookCall } from "@/lib/analytics";

interface Myth {
  myth: string;
  reality: string;
}

interface Fear {
  fear: string;
  response: string;
}

interface Transformation {
  before: string;
  after: string;
}

interface EmotionalContentData {
  sectionBadge: string;
  sectionTitle: string;
  sectionTitleHighlight: string;
  sectionSubtitle: string;
  myths: Myth[];
  fears: Fear[];
  nervousPoints: string[];
  transformation: Transformation;
  ctaText: string;
  ctaSubtext: string;
}

interface Props {
  content: EmotionalContentData;
  pageKey: string;
}

export default function EmotionalConnectionSection({ content, pageKey }: Props) {
  const handleWhatsAppClick = () => {
    trackWhatsApp(`emotional_section_${pageKey}`);
  };

  const handleBookClick = () => {
    trackBookCall(`emotional_section_${pageKey}`);
  };

  const buildWhatsAppUrl = (message: string) => {
    const url = new URL(profile.contact.whatsappLink);
    url.searchParams.set("text", message);
    return url.toString();
  };

  const whatsAppHref = buildWhatsAppUrl("Hi Rupesh, I've been reading your coaching content and I'd like to discuss my interview preparation.");

  return (
    <>
      <ScrollReveal type="fade">
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Heart className="w-3 h-3 mr-1" />
                {content.sectionBadge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid={`text-${pageKey}-emotional-title`}>
                {content.sectionTitle}{" "}
                <span className="text-primary">{content.sectionTitleHighlight}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {content.sectionSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-destructive/10 rounded-md">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold">Myths You Might Believe</h3>
                </div>
                <div className="space-y-4">
                  {content.myths.map((item, idx) => (
                    <Card key={idx} className="hover-elevate" data-testid={`card-myth-${pageKey}-${idx}`}>
                      <CardContent className="pt-4">
                        <p className="font-medium text-destructive/90 mb-2 flex items-start gap-2">
                          <span className="text-lg">✗</span>
                          <span>"{item.myth}"</span>
                        </p>
                        <p className="text-sm text-muted-foreground pl-6">
                          <span className="font-medium text-primary">Reality:</span> {item.reality}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Fears I Hear Every Week</h3>
                </div>
                <div className="space-y-4">
                  {content.fears.map((item, idx) => (
                    <Card key={idx} className="hover-elevate" data-testid={`card-fear-${pageKey}-${idx}`}>
                      <CardContent className="pt-4">
                        <p className="font-medium mb-2 flex items-start gap-2">
                          <span className="text-lg text-muted-foreground">?</span>
                          <span>"{item.fear}"</span>
                        </p>
                        <p className="text-sm text-muted-foreground pl-6">
                          <span className="font-medium text-primary">My response:</span> {item.response}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-semibold">What Makes Candidates Nervous</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {content.nervousPoints.map((point, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                    data-testid={`nervous-point-${pageKey}-${idx}`}
                  >
                    <span className="text-amber-500 mt-0.5">•</span>
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
              <h3 className="text-lg font-semibold text-center mb-6">The Transformation</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="flex-1 max-w-sm">
                  <div className="flex items-center gap-2 mb-2 justify-center md:justify-end">
                    <span className="text-sm font-medium text-muted-foreground">Before Coaching</span>
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  </div>
                  <p className="text-center md:text-right text-muted-foreground italic">
                    "{content.transformation.before}"
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <ArrowRight className="w-8 h-8 text-primary hidden md:block" />
                  <div className="h-8 w-0.5 bg-primary md:hidden" />
                </div>
                
                <div className="flex-1 max-w-sm">
                  <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">After Coaching</span>
                  </div>
                  <p className="text-center md:text-left font-medium">
                    "{content.transformation.after}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal type="scale">
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" data-testid={`text-${pageKey}-emotional-cta`}>
              {content.ctaText}
            </h2>
            <p className="text-lg opacity-90 mb-6">
              {content.ctaSubtext}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                asChild
                onClick={handleWhatsAppClick}
                data-testid={`button-${pageKey}-emotional-whatsapp`}
              >
                <a 
                  href={whatsAppHref} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground"
                asChild
                onClick={handleBookClick}
                data-testid={`button-${pageKey}-emotional-book`}
              >
                <a href={profile.contact.bookingLink} target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Free Discovery Call
                </a>
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
