import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Target, 
  ArrowRight,
  Shield,
  Award,
  TrendingUp,
  MessageCircle,
  Calendar,
  Star,
  Building,
  Zap
} from "lucide-react";
import { SiAmazon } from "react-icons/si";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import FloatingSocialShare from "@/components/FloatingSocialShare";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollReveal from "@/components/ScrollReveal";
import { trackEvent, trackBookCall, trackWhatsApp } from "@/lib/analytics";
import profile from "@/data/profile.json";

const pageData = {
  seo: {
    title: "AWS Interview Prep | Director, VP, Principal Engineer Coaching | Rupesh Tiwari",
    description: "Master AWS/Amazon interviews for Director, VP, and Principal Engineer roles. AWS Senior CSM with insider knowledge of Leadership Principles, bar raiser interviews, and loop process. 85% success rate. Book your prep session.",
    keywords: ["AWS interview prep", "Amazon interview coaching", "AWS director interview", "Amazon VP interview", "AWS principal engineer interview", "Amazon bar raiser interview", "AWS loop interview prep", "Amazon Leadership Principles", "AWS Senior CSM coach", "Amazon L7 L8 interview", "AWS solutions architect interview", "Amazon interview success rate", "USA AWS interview coach"]
  },
  hero: {
    badge: "AWS Interview Specialist",
    title: "Crack Your AWS Interview",
    subtitle: "Director, VP & Principal Engineer Roles",
    description: "As a current AWS Senior CSM and former Amazon Solutions Architect, I know exactly what bar raisers look for. I've helped 50+ Directors and VPs land offers at AWS with an 85% success rate.",
    stats: [
      { value: "85%", label: "Success Rate" },
      { value: "50+", label: "Directors & VPs Coached" },
      { value: "L7-L8", label: "Levels Supported" }
    ]
  },
  whyAWS: {
    title: "Why AWS Interviews Are Different",
    subtitle: "What makes AWS interviews unique for senior roles",
    points: [
      {
        icon: "Shield",
        title: "Leadership Principles Are Everything",
        description: "Every answer must demonstrate Amazon's 16 Leadership Principles. At Director/VP level, you need to show org-level impact, not just technical depth."
      },
      {
        icon: "Target",
        title: "Bar Raiser Sets the Standard",
        description: "The bar raiser interview is the most critical. They're trained to maintain Amazon's high standards and will evaluate you against future peers."
      },
      {
        icon: "Users",
        title: "Loop Process is Rigorous",
        description: "4-6 back-to-back interviews with hiring manager, bar raiser, peers, and cross-functional partners. Each interviewer submits independent feedback."
      },
      {
        icon: "Award",
        title: "Executive Presence Matters",
        description: "At Director/VP level, you're evaluated on strategic thinking, organizational influence, and ability to work backwards from customer needs."
      }
    ]
  },
  process: {
    title: "How We Prepare You",
    subtitle: "A proven framework for AWS success",
    steps: [
      {
        number: "01",
        title: "Leadership Principles Deep Dive",
        description: "We map your experiences to all 16 Leadership Principles with org-level impact stories. No buzzwords - real examples."
      },
      {
        number: "02",
        title: "Bar Raiser Prep",
        description: "Mock interviews with bar raiser scenarios. Learn what they evaluate and how to demonstrate you raise the bar."
      },
      {
        number: "03",
        title: "Loop Simulation",
        description: "Full loop simulation with 4-6 mock interviews covering all rounds. Get feedback on communication, technical depth, and leadership."
      },
      {
        number: "04",
        title: "Executive Presence Coaching",
        description: "For Director/VP roles, we focus on strategic communication, stakeholder influence, and demonstrating scope of impact."
      }
    ]
  },
  roles: {
    title: "Roles We Coach For",
    roles: [
      {
        title: "Director of Engineering",
        level: "L7",
        focus: "Organizational impact, cross-functional leadership, strategic vision",
        salary: "$350K - $500K"
      },
      {
        title: "VP of Engineering",
        level: "L8",
        focus: "Executive presence, organizational strategy, customer obsession at scale",
        salary: "$450K - $700K"
      },
      {
        title: "Principal Engineer",
        level: "L7",
        focus: "Technical depth, architectural influence, engineering culture",
        salary: "$400K - $600K"
      },
      {
        title: "Senior Solutions Architect",
        level: "L6-L7",
        focus: "Customer engagement, technical strategy, solution design",
        salary: "$300K - $450K"
      }
    ]
  },
  faqs: [
    {
      question: "What makes AWS interviews different for Director/VP roles?",
      answer: "AWS interviews at senior levels focus heavily on Leadership Principles, organizational impact, and executive presence. The bar raiser evaluates you against future peers, not just the role requirements. You need to demonstrate scope of influence, strategic thinking, and customer obsession at scale."
    },
    {
      question: "How many sessions do I need for AWS Director/VP prep?",
      answer: "Most Director/VP candidates need 5-6 sessions: 2 for Leadership Principles mapping, 1-2 for bar raiser prep, 1-2 for loop simulation, and 1 for executive presence coaching. We customize based on your timeline and experience."
    },
    {
      question: "What's the bar raiser interview and how do I prepare?",
      answer: "The bar raiser is an Amazon employee trained to maintain hiring standards. They evaluate whether you raise the bar for the team. They'll ask tough questions about your biggest failures, how you've raised the bar, and your ability to influence without authority. We do extensive mock bar raiser interviews."
    },
    {
      question: "Can you help with AWS Leadership Principles at Director level?",
      answer: "Absolutely. I help you build compelling STAR stories that demonstrate org-level impact for each Leadership Principle. We focus on scope (team size, budget, customer impact), influence (cross-functional work), and measurable outcomes. No buzzwords - real examples."
    }
  ],
  cta: {
    title: "Ready to Ace Your AWS Interview?",
    subtitle: "Book a free 15-minute consultation to discuss your AWS interview prep",
    buttonText: "Book AWS Prep Session",
    whatsappText: "Message About AWS Prep"
  }
};

export default function AWSInterviewPrep() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
        <meta name="keywords" content={pageData.seo.keywords.join(", ")} />
        <link rel="canonical" href="https://www.fullstackmaster.net/aws-interview-prep" />
        <meta property="og:title" content={pageData.seo.title} />
        <meta property="og:description" content={pageData.seo.description} />
        <meta property="og:url" content="https://www.fullstackmaster.net/aws-interview-prep" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.fullstackmaster.net/og-image.png" />
        <meta property="og:site_name" content="FullStack Master" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.seo.title} />
        <meta name="twitter:description" content={pageData.seo.description} />
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
                { label: "AWS Interview Prep", href: "/aws-interview-prep" }
              ]}
            />
            
            <ScrollReveal type="fade" duration={0.6}>
              <div className="max-w-4xl mx-auto text-center mb-12">
                <Badge className="mb-4 bg-orange-500/10 text-orange-600 border-orange-500/30">
                  <SiAmazon className="w-4 h-4 mr-2" />
                  {pageData.hero.badge}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  {pageData.hero.title}
                  <br />
                  <span className="text-primary">{pageData.hero.subtitle}</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {pageData.hero.description}
                </p>
                
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                  {pageData.hero.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => {
                      trackBookCall('aws-page-hero');
                      window.location.href = '/book';
                    }}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {pageData.cta.buttonText}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50"
                    onClick={() => {
                      trackWhatsApp('aws-page-hero');
                      window.open(`https://wa.me/16094424081?text=${encodeURIComponent('Hi Rupesh! I want to discuss AWS interview prep for a Director/VP role.')}`, '_blank');
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {pageData.cta.whatsappText}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Why AWS Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollReveal type="fade" duration={0.6}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.whyAWS.title}</h2>
                <p className="text-lg text-muted-foreground">{pageData.whyAWS.subtitle}</p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {pageData.whyAWS.points.map((point, idx) => {
                const IconComponent = Shield; // Simplified for now
                return (
                  <ScrollReveal key={idx} type="slide-up" delay={idx * 0.1}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-orange-600" />
                          </div>
                          <CardTitle>{point.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{point.description}</p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal type="fade" duration={0.6}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.process.title}</h2>
                <p className="text-lg text-muted-foreground">{pageData.process.subtitle}</p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {pageData.process.steps.map((step, idx) => (
                <ScrollReveal key={idx} type="slide-up" delay={idx * 0.1}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-4xl font-bold text-orange-600">{step.number}</div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollReveal type="fade" duration={0.6}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.roles.title}</h2>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {pageData.roles.roles.map((role, idx) => (
                <ScrollReveal key={idx} type="slide-up" delay={idx * 0.1}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle>{role.title}</CardTitle>
                        <Badge variant="outline">{role.level}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">{role.focus}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">{role.salary}</span>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <ScrollReveal type="fade" duration={0.6}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">AWS Interview FAQs</h2>
              </div>
            </ScrollReveal>
            
            <Accordion type="single" collapsible className="space-y-4">
              {pageData.faqs.map((faq, idx) => (
                <ScrollReveal key={idx} type="slide-up" delay={idx * 0.1}>
                  <AccordionItem value={`faq-${idx}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal type="fade" duration={0.6}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.cta.title}</h2>
              <p className="text-lg mb-8 opacity-90">{pageData.cta.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    trackBookCall('aws-page-cta');
                    window.location.href = '/book';
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {pageData.cta.buttonText}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => {
                    trackWhatsApp('aws-page-cta');
                    window.open(`https://wa.me/16094424081?text=${encodeURIComponent('Hi Rupesh! I want to discuss AWS interview prep.')}`, '_blank');
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {pageData.cta.whatsappText}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppWidget />
      <FloatingSocialShare title="AWS Interview Prep" />
    </div>
  );
}

