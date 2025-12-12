import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, BookOpen, Download, Youtube, Mail, ExternalLink, Sparkles } from "lucide-react";
import { SiLinkedin, SiYoutube, SiGumroad } from "react-icons/si";
import { trackEvent } from "@/lib/analytics";
import articlesData from "@/data/articles.json";
import profile from "@/data/profile.json";

export default function FreeResourcesHighlight() {
  const handleClick = (resource: string) => {
    trackEvent("free_resource_click", "engagement", resource);
  };

  const freeResources = [
    {
      title: "Technical Newsletter",
      description: "System Design, Leadership, Career Growth",
      highlight: "50+ articles on System Design Fundamentals",
      icon: <Mail className="w-6 h-6" />,
      brandIcon: <SiLinkedin className="w-4 h-4" />,
      url: articlesData.newsletterUrl,
      cta: "Subscribe Free",
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
      featured: true
    },
    {
      title: "Interview Frameworks",
      description: "STAR, IFRAIL+T, CAMPERSO & more",
      highlight: "4 proven frameworks for FAANG prep",
      icon: <Download className="w-6 h-6" />,
      brandIcon: <SiGumroad className="w-4 h-4" />,
      url: "https://rupeshtiwari.gumroad.com/l/rupesh-kit",
      cta: "Download Free",
      color: "from-pink-500/20 to-pink-600/10",
      borderColor: "border-pink-500/30",
      featured: false
    },
    {
      title: "YouTube Playlists",
      description: "System Design, AWS, Angular tutorials",
      highlight: "100+ hours of free video content",
      icon: <Youtube className="w-6 h-6" />,
      brandIcon: <SiYoutube className="w-4 h-4" />,
      url: profile.socialLinks.youtube.channel,
      cta: "Watch Free",
      color: "from-red-500/20 to-red-600/10",
      borderColor: "border-red-500/30",
      featured: false
    },
    {
      title: "Technical Articles",
      description: "Deep dives on architecture & interviews",
      highlight: "Weekly insights for senior engineers",
      icon: <BookOpen className="w-6 h-6" />,
      brandIcon: <SiLinkedin className="w-4 h-4" />,
      url: articlesData.companyUrl,
      cta: "Read Free",
      color: "from-emerald-500/20 to-emerald-600/10",
      borderColor: "border-emerald-500/30",
      featured: false
    }
  ];

  return (
    <section 
      id="free-resources" 
      className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5"
      data-testid="section-free-resources"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/20">
            <Gift className="w-3 h-3 mr-1" />
            100% Free - No Credit Card Required
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Free</span> Career Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access my complete library of interview frameworks, system design guides, and technical content - completely free
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <Card className={`h-full hover-elevate transition-all duration-300 overflow-hidden border-2 ${resource.borderColor} ${resource.featured ? 'ring-2 ring-primary/20' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-50`} />
                <CardContent className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background/80 rounded-lg shadow-sm">
                        {resource.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{resource.title}</h3>
                          {resource.featured && (
                            <Badge variant="default" className="bg-primary text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white border-0 shrink-0">
                      FREE
                    </Badge>
                  </div>
                  
                  <p className="text-sm font-medium text-foreground/80 mb-4 pl-1 border-l-2 border-primary/50">
                    {resource.highlight}
                  </p>
                  
                  <Button className="w-full group-hover:bg-primary/90" size="sm">
                    {resource.brandIcon}
                    <span className="ml-2">{resource.cta}</span>
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-gradient-to-r from-primary/10 via-background to-accent/10 border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Technical Newsletter</h3>
                  <p className="text-sm text-muted-foreground">
                    System Design Fundamentals, Leadership, AWS, Architecture
                  </p>
                </div>
              </div>
              <Button size="lg" asChild onClick={() => handleClick("newsletter_highlight")}>
                <a
                  href={articlesData.newsletterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-newsletter-highlight"
                >
                  <SiLinkedin className="w-4 h-4 mr-2" />
                  Subscribe to Newsletter
                  <Badge className="ml-2 bg-green-500 text-white border-0 text-xs">FREE</Badge>
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
