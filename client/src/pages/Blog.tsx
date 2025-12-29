import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Target,
  Users,
  MessageCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import FloatingSocialShare from "@/components/FloatingSocialShare";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollReveal from "@/components/ScrollReveal";
import { trackEvent, trackBookCall, trackWhatsApp } from "@/lib/analytics";
import { Link } from "wouter";

const blogPosts = [
  {
    id: "aws-director-interview-guide",
    title: "How to Ace Your AWS Director Interview: Complete Guide for L7/L8 Roles",
    description: "Master the AWS Director interview process. Learn what bar raisers look for, how to demonstrate org-level impact, and ace the Leadership Principles at Director level.",
    category: "AWS Interview Prep",
    readTime: "12 min read",
    date: "2025-12-15",
    keywords: ["AWS director interview", "Amazon L7 interview", "AWS bar raiser interview", "Director interview prep"],
    featured: true
  },
  {
    id: "google-l6-l7-interview-prep",
    title: "Google L6 L7 Interview Prep: System Design and Googleyness Guide",
    description: "Complete guide to Google L6 and L7 interviews. Learn how to demonstrate Googleyness, ace system design at scale, and prepare for leadership rounds.",
    category: "Google Interview Prep",
    readTime: "15 min read",
    date: "2025-12-14",
    keywords: ["Google L6 interview", "Google L7 interview", "Googleyness interview", "Google system design"],
    featured: true
  },
  {
    id: "microsoft-principal-engineer-interview",
    title: "Microsoft Principal Engineer Interview: Technical Depth + Leadership",
    description: "How to prepare for Microsoft Principal Engineer interviews. Learn what interviewers evaluate, how to demonstrate technical leadership, and ace the coding + architecture rounds.",
    category: "Microsoft Interview Prep",
    readTime: "10 min read",
    date: "2025-12-13",
    keywords: ["Microsoft principal engineer", "Microsoft L66 interview", "Microsoft system design", "Principal engineer prep"],
    featured: true
  },
  {
    id: "vp-interview-executive-presence",
    title: "VP Interview Prep: How to Demonstrate Executive Presence and Organizational Impact",
    description: "VP interviews test your ability to think at scale and influence across boundaries. Learn how to demonstrate executive presence, strategic thinking, and organizational impact.",
    category: "VP Interview Prep",
    readTime: "14 min read",
    date: "2025-12-12",
    keywords: ["VP interview prep", "Executive presence", "VP interview coaching", "Organizational impact"],
    featured: false
  },
  {
    id: "amazon-leadership-principles-director",
    title: "Amazon Leadership Principles for Directors: Beyond Buzzwords to Org-Level Impact",
    description: "How to answer Leadership Principles questions at Director level. Learn to demonstrate scope, influence, and measurable outcomes - not just buzzwords.",
    category: "Amazon Interview Prep",
    readTime: "11 min read",
    date: "2025-12-11",
    keywords: ["Amazon Leadership Principles", "Director interview", "Amazon LP examples", "Bar raiser interview"],
    featured: false
  },
  {
    id: "system-design-director-level",
    title: "System Design at Director Level: Architecture, Strategy, and Organizational Influence",
    description: "Director-level system design interviews test your ability to design systems AND influence technical direction. Learn how to demonstrate both technical depth and organizational impact.",
    category: "System Design",
    readTime: "13 min read",
    date: "2025-12-10",
    keywords: ["System design director", "Architecture interview", "Technical leadership", "System design L7"],
    featured: false
  }
];

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FAANG Interview Blog | Director VP Interview Prep Articles | Rupesh Tiwari</title>
        <meta name="description" content="Expert articles on FAANG interview prep for Director, VP, and Principal Engineer roles. Learn how to ace AWS, Google, and Microsoft interviews with insider tips and proven strategies." />
        <meta name="keywords" content="FAANG interview blog, Director interview prep, VP interview guide, AWS interview articles, Google interview prep, Microsoft interview guide, Principal engineer interview, System design blog, Leadership interview prep" />
        <link rel="canonical" href="https://www.fullstackmaster.net/blog" />
        <meta property="og:title" content="FAANG Interview Blog | Director VP Interview Prep" />
        <meta property="og:description" content="Expert articles on FAANG interview prep for Director, VP, and Principal Engineer roles." />
        <meta property="og:url" content="https://www.fullstackmaster.net/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.fullstackmaster.net/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="author" content="Rupesh Tiwari" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <Breadcrumb 
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" }
              ]}
            />
            
            <ScrollReveal type="fade" duration={0.6}>
              <div className="max-w-4xl mx-auto text-center mb-12">
                <Badge className="mb-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Interview Prep Blog
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Expert Insights for
                  <br />
                  <span className="text-primary">Director & VP Interviews</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Learn proven strategies, insider tips, and frameworks to ace your FAANG interviews at senior leadership levels.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <ScrollReveal type="fade" duration={0.6}>
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Articles</h2>
                  <p className="text-lg text-muted-foreground">Most popular guides for Director, VP, and Principal Engineer interviews</p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-3 gap-8">
                {featuredPosts.map((post, idx) => (
                  <ScrollReveal key={post.id} type="slide-up" delay={idx * 0.1}>
                    <Card className="hover-elevate h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{post.category}</Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                        <CardDescription>{post.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-end">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/blog/${post.id}`}>
                              Read More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollReveal type="fade" duration={0.6}>
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">All Articles</h2>
                <p className="text-lg text-muted-foreground">Complete library of interview prep guides</p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {blogPosts.map((post, idx) => (
                <ScrollReveal key={post.id} type="slide-up" delay={idx * 0.1}>
                  <Card className="hover-elevate h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/blog/${post.id}`}>
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* External Blog Link Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <ScrollReveal type="fade" duration={0.6}>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-8">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Explore More Tech Content</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Looking for more technical articles, tutorials, and deep dives? Check out my full blog with 300+ articles on system design, cloud architecture, and software engineering.
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <a
                      href="https://blog.rupeshtiwari.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("external_blog_click", "navigation", "blog_page")}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Visit Full Blog (300+ Articles)
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal type="fade" duration={0.6}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ace Your Interview?</h2>
              <p className="text-lg mb-8 opacity-90">Get personalized coaching from an AWS Senior CSM with 85% success rate</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    trackBookCall('blog-cta');
                    window.location.href = '/book';
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Free Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => {
                    trackWhatsApp('blog-cta');
                    window.open(`https://wa.me/16094424081?text=${encodeURIComponent('Hi Rupesh! I read your blog and want to discuss interview prep.')}`, '_blank');
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message on WhatsApp
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppWidget />
      <FloatingSocialShare title="FAANG Interview Blog" />
    </div>
  );
}

