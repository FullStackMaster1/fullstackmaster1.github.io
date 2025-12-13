import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Lightbulb, Gift, ArrowRight, CheckCircle, TrendingUp, Clock, Zap, Calendar, Share2, Percent, Star, Sparkles, Copy } from "lucide-react";
import { SiWhatsapp, SiLinkedin, SiTwitter } from "react-icons/si";
import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

const MEMBER_COUNT = 500;
const SPOTS_LEFT = 47;
const GENERAL_CHAT_LINK = "https://chat.whatsapp.com/Jeuap5XBXIqCQ52ZSrZ0iX";

const benefits = [
  {
    icon: Users,
    title: "Network with Peers",
    description: "Connect with senior engineers, architects, and leaders preparing for FAANG"
  },
  {
    icon: Lightbulb,
    title: "Interview Tip Tuesday",
    description: "Get weekly actionable tips every Tuesday to boost your prep",
    highlight: true
  },
  {
    icon: MessageCircle,
    title: "Monthly Live Q&A",
    description: "Ask Rupesh anything in monthly live sessions - free for members"
  },
  {
    icon: Gift,
    title: "Member-Only Discounts",
    description: "Exclusive 20% off coaching sessions for community members"
  }
];

const communityGroups = [
  { name: "General Chat", members: "200+", link: "https://chat.whatsapp.com/Jeuap5XBXIqCQ52ZSrZ0iX", description: "Welcome & networking" },
  { name: "System Design Tips", members: "180+", link: "https://chat.whatsapp.com/Is6VetflBqVG5nQmyTm9Zl", description: "Daily questions & answers" },
  { name: "Behavioral Prep", members: "150+", link: "https://chat.whatsapp.com/CLIUiMo2Xkd6lo1MRJFmEp", description: "STAR & Amazon LPs" },
  { name: "Job Postings", members: "200+", link: "https://chat.whatsapp.com/CX7rDnioRC51AqAeZhX23J", description: "Opportunities & referrals" },
  { name: "Success Stories", members: "90+", link: "https://chat.whatsapp.com/G6qP8XBBIZU7KzEvwfoQSR", description: "Celebrate wins" },
  { name: "Ask Rupesh", members: "VIP", link: "https://chat.whatsapp.com/IhjKvkdty0ACYtxIuXz6ZO", description: "Direct Q&A" },
];

const shareableQuotes = [
  "System Design Tip: Always start with requirements before jumping into architecture.",
  "Behavioral Interview Tip: Use STAR method - Situation, Task, Action, Result.",
  "FAANG Prep Tip: Focus on one company's interview style at a time.",
  "Leadership Principle: Customer Obsession - Start with the customer and work backwards.",
];

export default function WhatsAppCommunitySection() {
  const [copied, setCopied] = useState(false);
  const [currentQuote] = useState(() => shareableQuotes[Math.floor(Math.random() * shareableQuotes.length)]);

  const handleJoinClick = () => {
    trackEvent("whatsapp_community_join", "homepage", "cta_click");
  };

  const handleShareClick = (platform: string) => {
    trackEvent("community_share", "homepage", platform);
    const shareText = `Join FullStackMaster WhatsApp Community - Free FAANG interview prep tips, networking, and job postings! ${GENERAL_CHAT_LINK}`;
    
    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(GENERAL_CHAT_LINK)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(GENERAL_CHAT_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section 
      id="community" 
      className="py-12 md:py-16 bg-gradient-to-b from-green-500/5 to-background"
      data-testid="section-community"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
              <SiWhatsapp className="w-3 h-3 mr-1" />
              Free Community
            </Badge>
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20 animate-pulse">
              <TrendingUp className="w-3 h-3 mr-1" />
              {MEMBER_COUNT}+ Members
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
              <Calendar className="w-3 h-3 mr-1" />
              Tip Tuesday Weekly
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-community-title">
            Join <span className="text-green-600">FullStackMaster</span> WhatsApp Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Connect with {MEMBER_COUNT}+ senior professionals preparing for FAANG interviews. 
            Get free weekly tips, exclusive discounts, and accelerate your career growth.
          </p>
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium"
            data-testid="text-spots-left"
          >
            <Clock className="w-4 h-4" />
            <span>Only {SPOTS_LEFT} spots left this month - Join now!</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <Card 
                  key={idx} 
                  className={`hover-elevate ${benefit.highlight ? 'border-amber-500/30 bg-amber-500/5' : ''}`} 
                  data-testid={`card-benefit-${idx}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${benefit.highlight ? 'bg-amber-500/10' : 'bg-green-500/10'}`}>
                        <benefit.icon className={`w-5 h-5 ${benefit.highlight ? 'text-amber-600' : 'text-green-600'}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1 flex items-center gap-1">
                          {benefit.title}
                          {benefit.highlight && (
                            <Badge variant="secondary" className="text-[10px] px-1 py-0 bg-amber-500/10 text-amber-600 border-amber-500/20">
                              NEW
                            </Badge>
                          )}
                        </h3>
                        <p className="text-xs text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Percent className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Exclusive Member Discount</h3>
                    <p className="text-xs text-muted-foreground">Community members get 20% off all coaching packages</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-600 font-medium">
                  <Star className="w-3 h-3" />
                  <span>Use code: COMMUNITY20 when booking</span>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>100% Free to join</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Weekly Interview Tip Tuesday posts</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Monthly live AMA with Rupesh</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Job postings from FAANG network</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Join Specific Groups (click to join):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {communityGroups.map((group, idx) => (
                  <a
                    key={idx}
                    href={group.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_group_join", "homepage", group.name)}
                    className="group p-2 rounded-lg border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors text-left"
                    data-testid={`link-group-${idx}`}
                  >
                    <div className="flex items-center gap-2">
                      <SiWhatsapp className="w-4 h-4 text-green-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{group.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{group.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-4">
            <Card className="overflow-hidden border-green-500/20">
              <div className="bg-green-600 text-white text-center py-2 text-sm font-medium">
                <span className="animate-pulse">Join {MEMBER_COUNT}+ professionals today</span>
              </div>
              <CardContent className="p-6 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <SiWhatsapp className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Start Here</h3>
                  <p className="text-sm text-muted-foreground">
                    Join the General Chat to get started, then explore other groups!
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white group"
                    asChild
                    onClick={handleJoinClick}
                  >
                    <a 
                      href={GENERAL_CHAT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-join-community"
                    >
                      <SiWhatsapp className="w-5 h-5 mr-2" />
                      Join General Chat
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full border-green-500/30 text-green-600"
                    asChild
                    onClick={() => trackEvent("whatsapp_ask_rupesh", "homepage", "cta_click")}
                  >
                    <a 
                      href="https://chat.whatsapp.com/IhjKvkdty0ACYtxIuXz6ZO"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-ask-rupesh"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Ask Rupesh Directly
                    </a>
                  </Button>
                  
                  <p className="text-xs text-muted-foreground pt-2">
                    Click to join instantly - no approval needed
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

            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold">Invite 2 Friends & Unlock Bonus</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Share with friends who are preparing for interviews. When 2 friends join, get a free 15-min resume review!
                </p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => handleShareClick('linkedin')}
                    data-testid="button-share-linkedin"
                  >
                    <SiLinkedin className="w-3 h-3 mr-1 text-blue-600" />
                    LinkedIn
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => handleShareClick('twitter')}
                    data-testid="button-share-twitter"
                  >
                    <SiTwitter className="w-3 h-3 mr-1 text-sky-500" />
                    Twitter
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => handleShareClick('copy')}
                    data-testid="button-share-copy"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold">Today's Shareable Tip</span>
                </div>
                <blockquote className="text-sm italic text-muted-foreground border-l-2 border-amber-500 pl-3 mb-3">
                  "{currentQuote}"
                </blockquote>
                <p className="text-[10px] text-muted-foreground">
                  Share this on LinkedIn and tag @FullStackMaster for a feature!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
