import { Play, CheckCircle, Star, Users, Award, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FeaturedVideoSection() {
  const handleBookSession = () => {
    window.open("https://topmate.io/rupesh_tiwari/", "_blank");
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              5000+ Professionals Coached
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Hear Directly From </span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Rupesh
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how I help senior engineers and leaders land offers at 
              <span className="text-primary font-semibold"> Amazon, Google, Meta, Microsoft</span> and more
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative order-1 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-60" />
              
              <div className="relative aspect-[9/16] max-w-[340px] mx-auto rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
                <iframe
                  src="https://www.youtube.com/embed/4V-_DzBeoFg"
                  title="Meet Rupesh - Your FAANG Interview Coach"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  data-testid="video-featured-intro"
                />
              </div>
              
              <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4">
                <Card className="p-3 bg-green-500/90 text-white shadow-lg border-0 animate-pulse">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-bold text-sm">93% Success Rate</span>
                  </div>
                </Card>
              </div>
            </div>

            <div className="space-y-6 order-2 lg:order-2">
              <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary-foreground">R</span>
                  </div>
                  <div>
                    <p className="font-bold text-xl text-foreground">Rupesh Tiwari</p>
                    <p className="text-primary font-medium">FAANG Interview Coach</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">(5.0)</span>
                    </div>
                  </div>
                </div>
                
                <blockquote className="mt-4 text-lg text-foreground leading-relaxed border-l-4 border-primary pl-4 italic">
                  "I help senior engineers shift from <span className="text-primary font-semibold">doing the work</span> to 
                  <span className="text-accent font-semibold"> thinking and communicating like leaders</span>."
                </blockquote>
              </Card>

              <div className="grid grid-cols-3 gap-3">
                <Card className="p-4 text-center bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                  <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">5000+</p>
                  <p className="text-xs text-muted-foreground">Clients Coached</p>
                </Card>
                <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                  <Award className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">20+</p>
                  <p className="text-xs text-muted-foreground">Years Experience</p>
                </Card>
                <Card className="p-4 text-center bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                  <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">$50K+</p>
                  <p className="text-xs text-muted-foreground">Avg Salary Increase</p>
                </Card>
              </div>

              <div className="space-y-3 bg-muted/30 rounded-xl p-5">
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
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleBookSession}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold text-lg py-6 shadow-lg"
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
