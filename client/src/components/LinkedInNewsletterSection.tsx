import { SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp } from "lucide-react";
import articlesData from "@/data/articles.json";
import { trackEvent } from "@/lib/analytics";

export default function LinkedInNewsletterSection() {
  const { newsletterName, newsletterTagline, newsletterUrl } = articlesData;

  const benefits = [
    {
      icon: BookOpen,
      text: "Weekly system design insights"
    },
    {
      icon: TrendingUp,
      text: "Career growth strategies"
    },
    {
      icon: Users,
      text: "Join 5,000+ tech professionals"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-[#0077B5]/5 via-background to-[#0077B5]/5" data-testid="section-linkedin-newsletter">
      <div className="container mx-auto px-4">
        <Card className="border-[#0077B5]/20 bg-gradient-to-br from-card via-card to-[#0077B5]/5 overflow-visible">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0077B5] flex items-center justify-center shadow-lg">
                  <SiLinkedin className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2" data-testid="text-newsletter-title">
                  Subscribe to "{newsletterName}"
                </h2>
                <p className="text-muted-foreground mb-4" data-testid="text-newsletter-tagline">
                  {newsletterTagline}
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <benefit.icon className="w-4 h-4 text-[#0077B5]" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#0077B5] hover:bg-[#006097] text-white shadow-lg gap-2"
                  data-testid="button-subscribe-newsletter"
                >
                  <a 
                    href={newsletterUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('newsletter_subscribe_click', 'engagement', 'linkedin_newsletter')}
                  >
                    <SiLinkedin className="w-5 h-5" />
                    Subscribe Free
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
