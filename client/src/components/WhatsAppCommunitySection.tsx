import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Lightbulb, Gift, ArrowRight, CheckCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import profileData from "@/data/profile.json";
import { trackEvent } from "@/lib/analytics";

const benefits = [
  {
    icon: Users,
    title: "Network with Peers",
    description: "Connect with senior engineers, architects, and leaders preparing for FAANG"
  },
  {
    icon: Lightbulb,
    title: "Free Weekly Tips",
    description: "Get actionable interview tips, system design patterns, and career advice"
  },
  {
    icon: MessageCircle,
    title: "Direct Access",
    description: "Ask questions and get answers from Rupesh and the community"
  },
  {
    icon: Gift,
    title: "Exclusive Content",
    description: "Early access to new resources, webinars, and coaching discounts"
  }
];

export default function WhatsAppCommunitySection() {
  const handleJoinClick = () => {
    trackEvent("whatsapp_community_join", "homepage", "cta_click");
  };

  return (
    <section 
      id="community" 
      className="py-12 md:py-16 bg-gradient-to-b from-green-500/5 to-background"
      data-testid="section-community"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 bg-green-500/10 text-green-600 border-green-500/20">
            <SiWhatsapp className="w-3 h-3 mr-1" />
            Free Community
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-community-title">
            Join <span className="text-green-600">FullStackMaster</span> WhatsApp Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with 500+ senior professionals preparing for FAANG interviews. 
            Get free tips, ask questions, and accelerate your career growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="hover-elevate" data-testid={`card-benefit-${idx}`}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <benefit.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
                        <p className="text-xs text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>100% Free to join</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No spam, only valuable content</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Leave anytime with one click</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Card className="overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-green-500/30">
                    <div className="text-center p-4">
                      <SiWhatsapp className="w-12 h-12 mx-auto text-green-600 mb-3" />
                      <p className="text-sm text-muted-foreground">
                        QR Code Coming Soon
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Scan to join instantly
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium">Or join via link:</p>
                  <Button 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    asChild
                    onClick={handleJoinClick}
                  >
                    <a 
                      href={profileData.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-join-community"
                    >
                      <SiWhatsapp className="w-5 h-5 mr-2" />
                      Join Free Community
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Click to message Rupesh and get the community invite link
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
