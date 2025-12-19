import { Play, CheckCircle, Star, Users, Award, TrendingUp, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FeaturedVideoSection() {
  const handleBookSession = () => {
    window.open("https://topmate.io/rupesh_tiwari/", "_blank");
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              <Users className="w-4 h-4 mr-2" />
              Trusted by 5,000+ Professionals
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Hear Directly From Rupesh
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how I help senior engineers and leaders land offers at 
              Amazon, Google, Meta, Microsoft and more
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative order-1 lg:order-1">
              <div className="relative aspect-[9/16] max-w-[320px] mx-auto rounded-xl overflow-hidden shadow-lg border border-border">
                <iframe
                  src="https://www.youtube.com/embed/4V-_DzBeoFg"
                  title="Meet Rupesh - Your FAANG Interview Coach"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  data-testid="video-featured-intro"
                />
              </div>
            </div>

            <div className="space-y-6 order-2 lg:order-2">
              <Card className="p-6 border border-border bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary-foreground">R</span>
                  </div>
                  <div>
                    <p className="font-bold text-xl text-foreground">Rupesh Tiwari</p>
                    <p className="text-muted-foreground font-medium">FAANG Interview Coach</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">5.0 Rating</span>
                    </div>
                  </div>
                </div>
                
                <blockquote className="mt-4 text-foreground leading-relaxed border-l-4 border-primary pl-4">
                  "I help senior engineers shift from doing the work to thinking and communicating like leaders."
                </blockquote>
              </Card>

              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 text-center border border-border bg-card">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">5,000+</p>
                  <p className="text-sm text-muted-foreground">Clients Coached</p>
                </Card>
                <Card className="p-4 text-center border border-border bg-card">
                  <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">20+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </Card>
                <Card className="p-4 text-center border border-border bg-card">
                  <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">93%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </Card>
              </div>

              <div className="space-y-3 bg-card border border-border rounded-lg p-5">
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  What You'll Get:
                </p>
                {[
                  "Structured frameworks for System Design & Behavioral",
                  "Executive communication & leadership narratives", 
                  "Real hiring outcomes — not coding drills",
                  "Direct, honest feedback from someone who's been there"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleBookSession}
                size="lg"
                className="w-full font-semibold text-lg py-6"
                data-testid="button-book-from-video"
              >
                Book Your Session Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                Limited slots available • Response within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
