import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, ExternalLink, Copy, CheckCircle, MessageSquare, 
  Rocket, Target, Zap, Globe, Hash, ArrowRight 
} from "lucide-react";
import { SiSlack, SiDiscord, SiReddit, SiLinkedin, SiTelegram } from "react-icons/si";

interface Community {
  name: string;
  platform: string;
  icon: any;
  description: string;
  members?: string;
  joinLink: string;
  category: "tech-interview" | "engineering" | "cloud" | "general";
  recommended?: boolean;
}

const communities: Community[] = [
  {
    name: "Blind",
    platform: "App",
    icon: Globe,
    description: "Anonymous tech community - perfect for discussing interviews without revealing identity",
    members: "4M+",
    joinLink: "https://www.teamblind.com/",
    category: "tech-interview",
    recommended: true
  },
  {
    name: "Levels.fyi Discord",
    platform: "Discord",
    icon: SiDiscord,
    description: "Salary discussions, interview experiences, and career advice",
    members: "50K+",
    joinLink: "https://discord.gg/levels",
    category: "tech-interview",
    recommended: true
  },
  {
    name: "Exponent Community",
    platform: "Web",
    icon: Globe,
    description: "PM & Tech interview prep community with practice partners",
    joinLink: "https://www.tryexponent.com/",
    category: "tech-interview"
  },
  {
    name: "r/cscareerquestions",
    platform: "Reddit",
    icon: SiReddit,
    description: "Largest CS career community - great for advice and interview tips",
    members: "1.2M+",
    joinLink: "https://reddit.com/r/cscareerquestions",
    category: "tech-interview",
    recommended: true
  },
  {
    name: "r/experienceddevs",
    platform: "Reddit",
    icon: SiReddit,
    description: "Community for senior developers discussing career growth",
    members: "200K+",
    joinLink: "https://reddit.com/r/experienceddevs",
    category: "engineering"
  },
  {
    name: "r/leetcode",
    platform: "Reddit",
    icon: SiReddit,
    description: "LeetCode discussions, problem solutions, and interview prep",
    members: "300K+",
    joinLink: "https://reddit.com/r/leetcode",
    category: "tech-interview"
  },
  {
    name: "Rands Leadership Slack",
    platform: "Slack",
    icon: SiSlack,
    description: "Engineering management community - great for leadership roles",
    members: "25K+",
    joinLink: "https://randsinrepose.com/welcome-to-rands-leadership-slack/",
    category: "engineering",
    recommended: true
  },
  {
    name: "Engineering Managers Slack",
    platform: "Slack",
    icon: SiSlack,
    description: "Community for engineering managers and tech leads",
    joinLink: "https://engmanagers.github.io/",
    category: "engineering"
  },
  {
    name: "AWS Community Builders",
    platform: "Web",
    icon: Globe,
    description: "Official AWS community for builders and practitioners",
    joinLink: "https://aws.amazon.com/developer/community/community-builders/",
    category: "cloud"
  },
  {
    name: "CloudNative Slack",
    platform: "Slack",
    icon: SiSlack,
    description: "CNCF community for cloud-native technologies",
    members: "100K+",
    joinLink: "https://slack.cncf.io/",
    category: "cloud"
  },
  {
    name: "Dev.to",
    platform: "Web",
    icon: Hash,
    description: "Developer community - great for sharing content anonymously",
    members: "1M+",
    joinLink: "https://dev.to/",
    category: "general"
  },
  {
    name: "Hashnode",
    platform: "Web",
    icon: Hash,
    description: "Developer blogging platform with community features",
    joinLink: "https://hashnode.com/",
    category: "general"
  }
];

const introTemplates = {
  slack: `Hey everyone! 👋 

I'm [Your Name], a [Your Role] with experience at [Company/Background]. 

I'm passionate about helping engineers ace their FAANG interviews. I run a small interview coaching practice and love sharing tips on system design and behavioral interviews.

Looking forward to learning from this community and contributing where I can!`,
  
  reddit: `Hi r/cscareerquestions!

Quick intro - I'm a [Your Role] who's gone through the FAANG interview process and now helps others prepare for it.

I'm not here to spam, just want to genuinely help. Feel free to ask me anything about:
- System design interviews
- Behavioral/Leadership interviews  
- Amazon Loop process
- AWS/cloud architecture roles

Happy to share what worked for me and my coaching clients.`,

  discord: `Hey! 👋

Just joined the community. I'm [Name], working as [Role] at [Company].

I've been coaching people on FAANG interviews for the past few years - happy to answer any questions about:
• System design prep
• Behavioral interviews (STAR method, Amazon LPs)
• Career transitions to big tech

Feel free to DM me if you need any tips!`,

  linkedin: `🎯 Helping engineers land their dream FAANG roles

After years of conducting and preparing for interviews at [Company], I've started coaching others through the process.

If you're preparing for system design or behavioral interviews, I share free tips and frameworks on my website: [Your Link]

Open to connecting with fellow engineers on this journey!`
};

const valuePostTemplates = {
  systemDesign: `📐 System Design Interview Tip: The IFRAIL+T Framework

When approaching any system design question, use this structure:

I - Identify Requirements (functional + non-functional)
F - Features (core functionality)
R - Resources (data model, APIs)
A - Architecture (high-level design)
I - Investigate trade-offs
L - Lock in the design
+T - Talk through edge cases

This framework has helped my coaching clients consistently get positive feedback in their design rounds.

What frameworks do you use? 👇`,

  behavioral: `🎯 STAR Method for Behavioral Interviews - Quick Tips

Many candidates struggle with behavioral interviews because they:
1. Give vague answers without specifics
2. Focus too much on "we" instead of "I"
3. Skip the measurable results

Here's a quick fix - for EVERY story, ask yourself:
- What was MY specific contribution?
- What was the measurable impact?
- What did I learn?

Pro tip: Amazon interviewers want to hear the word "I" not "we"

What's been your biggest behavioral interview challenge?`,

  careerAdvice: `💡 Reality Check: Getting into FAANG isn't about solving 500 LeetCode problems

After coaching 200+ candidates, here's what actually matters:

1. System Design (40%+ of senior interviews)
2. Behavioral Stories (can make or break your offer)
3. Communication skills during coding
4. Understanding the company's bar

Yes, you need LeetCode - but pattern recognition beats quantity every time.

The candidates who succeed focus on QUALITY of preparation, not just grinding.

What's your prep strategy looking like?`
};

export default function CommunityResources() {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const { toast } = useToast();

  const copyTemplate = async (text: string, name: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedTemplate(name);
    setTimeout(() => setCopiedTemplate(null), 2000);
    toast({ title: "Copied!", description: "Template copied to clipboard" });
  };

  const categories = [
    { id: "tech-interview", label: "Interview Prep", icon: Target },
    { id: "engineering", label: "Engineering", icon: Rocket },
    { id: "cloud", label: "Cloud/AWS", icon: Zap },
    { id: "general", label: "General Tech", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Community Resources & Growth Strategies | FullStackMaster"
        description="Join tech communities, find interview prep groups, and grow your coaching practice with our curated resources."
      />
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-purple-500/10 text-purple-600 border-purple-500/20">
            <Users className="w-3 h-3 mr-1" />
            Growth Resources
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Community & Growth Toolkit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the right communities, use proven templates, and grow your reach 
            in the tech interview prep space.
          </p>
        </div>

        <Tabs defaultValue="communities" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="communities" data-testid="tab-communities">Communities</TabsTrigger>
            <TabsTrigger value="intros" data-testid="tab-intros">Intro Templates</TabsTrigger>
            <TabsTrigger value="posts" data-testid="tab-posts">Value Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="communities" className="space-y-8">
            {categories.map((category) => {
              const Icon = category.icon;
              const categoryCommunities = communities.filter(c => c.category === category.id);
              if (categoryCommunities.length === 0) return null;
              
              return (
                <div key={category.id}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    {category.label}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {categoryCommunities.map((community) => {
                      const PlatformIcon = community.icon;
                      return (
                        <Card 
                          key={community.name} 
                          className={community.recommended ? "border-primary/30 bg-primary/5" : ""}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                <PlatformIcon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold">{community.name}</h3>
                                  <Badge variant="outline" className="text-xs">
                                    {community.platform}
                                  </Badge>
                                  {community.recommended && (
                                    <Badge className="text-xs bg-amber-500">
                                      Recommended
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {community.description}
                                </p>
                                {community.members && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    <Users className="w-3 h-3 inline mr-1" />
                                    {community.members} members
                                  </p>
                                )}
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                asChild
                                className="flex-shrink-0"
                              >
                                <a 
                                  href={community.joinLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  data-testid={`link-join-${community.name.toLowerCase().replace(/\s+/g, "-")}`}
                                >
                                  Join
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="intros" className="space-y-6">
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Use these templates when introducing yourself in new communities. 
              Customize them with your details before posting.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(introTemplates).map(([platform, template]) => (
                <Card key={platform}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg capitalize flex items-center gap-2">
                      {platform === "slack" && <SiSlack className="w-4 h-4" />}
                      {platform === "reddit" && <SiReddit className="w-4 h-4" />}
                      {platform === "discord" && <SiDiscord className="w-4 h-4" />}
                      {platform === "linkedin" && <SiLinkedin className="w-4 h-4" />}
                      {platform} Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      value={template} 
                      readOnly 
                      className="min-h-[200px] text-sm font-mono"
                    />
                    <Button 
                      variant="outline" 
                      className="mt-3 w-full"
                      onClick={() => copyTemplate(template, platform)}
                      data-testid={`button-copy-intro-${platform}`}
                    >
                      {copiedTemplate === platform ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Template
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Share these value-first posts to establish credibility. 
              Provide genuine help first, promotion comes naturally after.
            </p>
            
            <div className="space-y-6">
              {Object.entries(valuePostTemplates).map(([type, template]) => (
                <Card key={type}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      {type === "systemDesign" && "System Design Post"}
                      {type === "behavioral" && "Behavioral Interview Post"}
                      {type === "careerAdvice" && "Career Advice Post"}
                    </CardTitle>
                    <CardDescription>
                      Works well on Reddit, LinkedIn, Discord, and Slack
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      value={template} 
                      readOnly 
                      className="min-h-[250px] text-sm"
                    />
                    <Button 
                      variant="outline" 
                      className="mt-3"
                      onClick={() => copyTemplate(template, type)}
                      data-testid={`button-copy-post-${type}`}
                    >
                      {copiedTemplate === type ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Post
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Pro Tip: Be Genuine</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              The best way to grow in these communities is to genuinely help people. 
              Answer questions, share your experiences, and the referrals will come naturally. 
              Avoid spamming links - provide value first.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="py-2 px-4">
                Answer 5 questions before promoting
              </Badge>
              <Badge variant="outline" className="py-2 px-4">
                Share free frameworks & tips
              </Badge>
              <Badge variant="outline" className="py-2 px-4">
                Build relationships first
              </Badge>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
