import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, BookOpen, Download, Youtube, Mail, ExternalLink, Sparkles, Target, Users, ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { SiLinkedin, SiYoutube, SiGumroad, SiWhatsapp } from "react-icons/si";
import { useLocation } from "wouter";
import { trackEvent, trackBookCall } from "@/lib/analytics";
import articlesData from "@/data/articles.json";
import profile from "@/data/profile.json";

export default function FreeResourcesHighlight() {
  const [, setLocation] = useLocation();
  
  const handleClick = (resource: string) => {
    trackEvent("free_resource_click", "engagement", resource);
  };

  const educationalGuides = [
    {
      title: "System Design Mastery",
      subtitle: "IFRAIL+T Framework",
      description: "Learn the exact framework used by Amazon, Google & Meta engineers to ace system design interviews",
      highlights: [
        "Step-by-step IFRAIL+T methodology",
        "Real FAANG interview examples",
        "Common mistakes to avoid",
        "Role-specific guidance"
      ],
      icon: <Target className="w-8 h-8" />,
      href: "/system-design",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-500/5",
      borderColor: "border-blue-500/30",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600"
    },
    {
      title: "Behavioral Interview Guide",
      subtitle: "STAR Method + 16 Amazon LPs",
      description: "Master behavioral interviews with the STAR method and understand all 16 Amazon Leadership Principles",
      highlights: [
        "STAR method deep dive",
        "All 16 Leadership Principles explained",
        "Interview signal framework",
        "Story preparation templates"
      ],
      icon: <Users className="w-8 h-8" />,
      href: "/behavioral-interview",
      color: "from-green-600 to-green-700",
      bgColor: "bg-green-500/5",
      borderColor: "border-green-500/30",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-600"
    }
  ];

  const freeResources = [
    {
      title: "Technical Newsletter",
      description: "System Design, Leadership, Career Growth",
      icon: <Mail className="w-5 h-5" />,
      brandIcon: <SiLinkedin className="w-4 h-4" />,
      url: articlesData.newsletterUrl,
      cta: "Subscribe",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Interview Frameworks PDF",
      description: "STAR, IFRAIL+T, CAMPERSO templates",
      icon: <Download className="w-5 h-5" />,
      brandIcon: <SiGumroad className="w-4 h-4" />,
      url: "https://rupeshtiwari.gumroad.com/l/rupesh-kit",
      cta: "Download",
      borderColor: "border-pink-500/20"
    },
    {
      title: "YouTube Tutorials",
      description: "100+ hours of free content",
      icon: <Youtube className="w-5 h-5" />,
      brandIcon: <SiYoutube className="w-4 h-4" />,
      url: profile.socialLinks.youtube.channel,
      cta: "Watch",
      borderColor: "border-red-500/20"
    },
    {
      title: "Tech Articles",
      description: "Deep dives on architecture",
      icon: <BookOpen className="w-5 h-5" />,
      brandIcon: <SiLinkedin className="w-4 h-4" />,
      url: articlesData.companyUrl,
      cta: "Read",
      borderColor: "border-emerald-500/20"
    }
  ];

  return (
    <section 
      id="free-resources" 
      className="py-16 md:py-24 bg-gradient-to-br from-amber-500/5 via-background to-primary/5"
      data-testid="section-free-resources"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/30 hover:bg-amber-500/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Free Knowledge - No Signup Required
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn My <span className="text-primary">Interview Frameworks</span> for Free
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Before we work together, explore the exact frameworks I teach to Directors and VPs preparing for FAANG interviews
          </p>
        </div>

        {/* Featured Educational Guides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {educationalGuides.map((guide, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden hover-elevate transition-all duration-300 border-2 ${guide.borderColor} ${guide.bgColor}`}
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${guide.iconBg}`}>
                    <div className={guide.iconColor}>{guide.icon}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl md:text-2xl font-bold">{guide.title}</h3>
                      <Badge className="bg-green-500 text-white border-0">FREE</Badge>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mt-1">{guide.subtitle}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{guide.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {guide.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={`w-4 h-4 ${guide.iconColor} shrink-0`} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full bg-gradient-to-r ${guide.color} hover:opacity-90 text-white`}
                  size="lg"
                  onClick={() => {
                    handleClick(guide.title);
                    setLocation(guide.href);
                  }}
                  data-testid={`button-guide-${index}`}
                >
                  Read Free Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section - Book After Learning */}
        <Card className="mb-10 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-primary/20 overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1 text-center lg:text-left">
                <Badge className="mb-3 bg-primary/10 text-primary border-primary/30">
                  Ready for Personalized Coaching?
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Get 1-on-1 Feedback on <span className="text-primary">Your</span> Answers
                </h3>
                <p className="text-muted-foreground max-w-xl">
                  Frameworks give you the structure. But personalized coaching finds your blind spots, 
                  fixes your weaknesses, and turns "good enough" into "offer-winning."
                </p>
                <div className="flex items-center gap-4 mt-4 justify-center lg:justify-start flex-wrap">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Mock interviews with real-time feedback</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Story refinement for your background</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => {
                    trackBookCall('free-resources-section');
                    setLocation('/book');
                  }}
                  data-testid="button-book-after-learning"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book 1-on-1 Session
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <a
                    href={`${profile.contact.whatsappLink}?text=${encodeURIComponent("Hi Rupesh, I read your free guides and have questions about coaching.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleClick("whatsapp_after_guides")}
                    data-testid="button-whatsapp-after-learning"
                  >
                    <SiWhatsapp className="w-4 h-4 mr-2 text-green-500" />
                    Ask Questions First
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* More Free Resources */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-muted-foreground">More Free Resources</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {freeResources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick(resource.title)}
              className="block group"
              data-testid={`link-free-resource-${index}`}
            >
              <Card className={`h-full hover-elevate transition-all duration-300 border ${resource.borderColor}`}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-muted rounded-lg">
                      {resource.icon}
                    </div>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{resource.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{resource.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {resource.brandIcon}
                    <span className="ml-2">{resource.cta}</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
