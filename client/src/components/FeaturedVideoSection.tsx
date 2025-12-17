import { Play, CheckCircle, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function FeaturedVideoSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Play className="w-4 h-4" />
              <span>Meet Your Coach</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Hear Directly From Rupesh
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn about my coaching approach and how I help senior engineers and leaders 
              succeed in FAANG interviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[9/16] max-w-[320px] mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src="https://www.youtube.com/embed/gUeYQN5FBQs"
                title="Meet Rupesh - Your FAANG Interview Coach"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                data-testid="video-featured-intro"
              />
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
                <blockquote className="text-lg text-foreground leading-relaxed italic">
                  "I work primarily with senior engineers, engineering managers, directors, 
                  and leadership candidates preparing for system design discussions, 
                  behavioral and loop interviews, and leadership transitions."
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">R</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Rupesh Tiwari</p>
                    <p className="text-sm text-muted-foreground">FAANG Interview Coach</p>
                  </div>
                </div>
              </Card>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">Structured and practical mentoring approach</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">Focus on executive communication & narratives</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">Real hiring outcomes, not coding drills</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">Direct, honest feedback & clear frameworks</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Trusted by 100+ senior professionals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
