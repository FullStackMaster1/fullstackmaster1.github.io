import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { trackEvent } from "@/lib/analytics";

export default function GuaranteeSection() {
  const sectionRef = useSectionTracking({
    sectionName: 'guarantee',
    funnelStep: 'decision'
  });

  const handleBookClick = (source: string) => {
    trackEvent('guarantee_book_click', 'buy_intent', source);
    window.location.href = '/book';
  };

  return (
    <section
      ref={sectionRef}
      id="guarantee"
      className="py-12 md:py-16 bg-gradient-to-br from-green-50/50 via-background to-blue-50/50 dark:from-green-950/20 dark:via-background dark:to-blue-950/20"
      data-testid="section-guarantee"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge className="bg-green-500 mb-4">
            <Shield className="w-3 h-3 mr-1" />
            100% Money-Back Guarantee
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Zero Risk. Maximum Results.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Not happy after your first session? Get a full refund. No questions asked.
          </p>
        </div>

        <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-50/50 to-white dark:from-green-950/30 dark:to-card">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">100% Money-Back Guarantee</h3>
                    <p className="text-sm text-muted-foreground">If you're not satisfied</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Full Refund After Session 1</p>
                      <p className="text-sm text-muted-foreground">
                        Not happy? Get 100% of your money back. No questions, no hassle.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">15 Years of Experience</p>
                      <p className="text-sm text-muted-foreground">
                        Over 4,000 clients coached. Almost nobody asks for a refund because this works.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">92% Success Rate</p>
                      <p className="text-sm text-muted-foreground">
                        Directors, VPs, and Principal Engineers get offers. You will too.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/50 rounded-lg p-6 border border-border">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    <span className="text-2xl font-bold">5.0</span>
                    <span className="text-muted-foreground">/ 5.0</span>
                  </div>
                  <p className="text-sm text-muted-foreground">50+ Verified Reviews</p>
                </div>
                
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Rating</span>
                    <span className="font-semibold">5.0 / 5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Refund Rate</span>
                    <span className="font-semibold text-green-600">&lt; 1%</span>
                  </div>
                </div>
                
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleBookClick('guarantee_section')}
                >
                  Book Your Risk-Free Session
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Protected by our 100% money-back guarantee
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

