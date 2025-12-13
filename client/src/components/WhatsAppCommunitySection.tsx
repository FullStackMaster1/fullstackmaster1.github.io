import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Lightbulb, Gift, ArrowRight, CheckCircle, TrendingUp, Clock, Zap } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import profileData from "@/data/profile.json";
import { trackEvent } from "@/lib/analytics";

const MEMBER_COUNT = 500;
const SPOTS_LEFT = 47;

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

const communityGroups = [
  { name: "System Design Tips", members: "180+" },
  { name: "Behavioral Interview Prep", members: "150+" },
  { name: "Job Postings & Referrals", members: "200+" },
  { name: "Success Stories", members: "90+" },
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
              <SiWhatsapp className="w-3 h-3 mr-1" />
              Free Community
            </Badge>
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20 animate-pulse">
              <TrendingUp className="w-3 h-3 mr-1" />
              {MEMBER_COUNT}+ Members
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-community-title">
            Join <span className="text-green-600">FullStackMaster</span> WhatsApp Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Connect with {MEMBER_COUNT}+ senior professionals preparing for FAANG interviews. 
            Get free tips, ask questions, and accelerate your career growth.
          </p>
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium"
            data-testid="text-spots-left"
          >
            <Clock className="w-4 h-4" />
            <span>Only {SPOTS_LEFT} spots left this month - Join now!</span>
          </div>
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

            <div className="mt-6">
              <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Community Groups Inside:
              </p>
              <div className="flex flex-wrap gap-2">
                {communityGroups.map((group, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="text-xs py-1"
                    data-testid={`badge-group-${idx}`}
                  >
                    {group.name}
                    <span className="ml-1 text-muted-foreground">({group.members})</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Card className="overflow-hidden border-green-500/20">
              <div className="bg-green-600 text-white text-center py-2 text-sm font-medium">
                <span className="animate-pulse">Join {MEMBER_COUNT}+ professionals today</span>
              </div>
              <CardContent className="p-8 text-center">
                <div className="mb-6" id="community-qr">
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
                    className="w-full bg-green-600 hover:bg-green-700 text-white group"
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
                      Join Free Community Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Click to message Rupesh and get your invite link
                  </p>
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {MEMBER_COUNT}+ members
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        Active daily
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
