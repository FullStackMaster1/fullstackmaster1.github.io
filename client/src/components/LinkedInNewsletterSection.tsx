import { SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, Target, Brain, Rocket, CheckCircle } from "lucide-react";
import articlesData from "@/data/articles.json";
import { trackEvent } from "@/lib/analytics";

export default function LinkedInNewsletterSection() {
  const { newsletterName, newsletterUrl } = articlesData;

  const benefits = [
    {
      icon: Target,
      text: "System Design Mastery"
    },
    {
      icon: Brain,
      text: "Behavioral Interview Prep"
    },
    {
      icon: BookOpen,
      text: "AWS & Cloud Fundamentals"
    },
    {
      icon: TrendingUp,
      text: "Career Growth Strategies"
    },
    {
      icon: Rocket,
      text: "FAANG Interview Success"
    },
    {
      icon: Users,
      text: "5,000+ Tech Leaders"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-[#0077B5]/5 via-background to-[#0077B5]/5" data-testid="section-linkedin-newsletter">
      <div className="container mx-auto px-4">
        <Card className="border-[#0077B5]/20 bg-gradient-to-br from-card via-card to-[#0077B5]/5 overflow-visible">
          <CardContent className="p-6 md:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#0077B5] to-[#005885] flex items-center justify-center shadow-xl">
                  <SiLinkedin className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-[#0077B5]/10 text-[#0077B5] px-3 py-1 rounded-full text-xs font-semibold mb-3">
                  <CheckCircle className="w-3 h-3" />
                  FREE Weekly Newsletter
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3" data-testid="text-newsletter-title">
                  Accelerate Your Tech Career with "{newsletterName}"
                </h2>
                
                <p className="text-muted-foreground mb-5 text-base md:text-lg max-w-2xl" data-testid="text-newsletter-tagline">
                  Stop struggling with interviews and career growth. Get weekly deep-dives on <span className="text-foreground font-medium">System Design</span>, <span className="text-foreground font-medium">Behavioral Interviews</span>, <span className="text-foreground font-medium">AWS Architecture</span>, and proven strategies to land your dream role at top tech companies.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-6 h-6 rounded-full bg-[#0077B5]/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-3.5 h-3.5 text-[#0077B5]" />
                      </div>
                      <span className="text-foreground">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 w-full lg:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="w-full lg:w-auto bg-[#0077B5] hover:bg-[#006097] text-white shadow-lg gap-2 px-8 py-6 text-base"
                  data-testid="button-subscribe-newsletter"
                >
                  <a 
                    href={newsletterUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('newsletter_subscribe_click', 'engagement', 'linkedin_newsletter')}
                  >
                    <SiLinkedin className="w-5 h-5" />
                    Subscribe for Free
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Join 5,000+ architects & developers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
