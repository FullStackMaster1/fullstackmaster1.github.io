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
  Zap,
  Lightbulb
} from "lucide-react";
import { SiGoogle } from "react-icons/si";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import FloatingSocialShare from "@/components/FloatingSocialShare";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollReveal from "@/components/ScrollReveal";
import { trackEvent, trackBookCall, trackWhatsApp } from "@/lib/analytics";

const pageData = {
  seo: {
    title: "Google Interview Prep | L6 L7 Director VP Coaching | Rupesh Tiwari",
    description: "Master Google interviews for L6, L7 Director, and VP roles. Expert coaching on system design, behavioral interviews (Googleyness), and leadership rounds. 85% success rate. Book your prep session.",
    keywords: ["Google interview prep", "Google L6 interview", "Google L7 interview", "Google director interview", "Google VP interview", "Googleyness interview", "Google system design interview", "Google behavioral interview", "Google principal engineer interview", "Google staff engineer interview", "USA Google interview coach"]
  },
  hero: {
    badge: "Google Interview Specialist",
    title: "Ace Your Google Interview",
    subtitle: "L6, L7, Director & VP Roles",
    description: "Google interviews are unique - they test technical depth, system design, and 'Googleyness' (collaboration, impact, leadership). I've helped 40+ senior engineers and leaders land offers at Google with an 85% success rate.",
    stats: [
      { value: "85%", label: "Success Rate" },
      { value: "40+", label: "L6/L7 Coached" },
      { value: "L6-L8", label: "Levels Supported" }
    ]
  },
  whyGoogle: {
    title: "Why Google Interviews Are Unique",
    subtitle: "What makes Google interviews different for senior roles",
    points: [
      {
        icon: "Lightbulb",
        title: "Googleyness Matters",
        description: "Google evaluates 'Googleyness' - your ability to collaborate, show impact, and lead with ambiguity. At L6/L7, you need to demonstrate organizational influence."
      },
      {
        icon: "Target",
        title: "System Design at Scale",
        description: "Google system design interviews test your ability to design for billions of users. You need to think about scalability, reliability, and global distribution."
      },
      {
        icon: "Users",
        title: "Leadership Rounds",
        description: "For Director/VP roles, you'll have dedicated leadership interviews focusing on organizational strategy, cross-functional influence, and technical vision."
      },
      {
        icon: "Award",
        title: "Coding + Architecture",
        description: "Google expects both coding excellence and architectural thinking. You need to write clean code AND design scalable systems."
      }
    ]
  },
  process: {
    title: "How We Prepare You",
    subtitle: "A proven framework for Google success",
    steps: [
      {
        number: "01",
        title: "System Design Mastery",
        description: "Learn to design systems for billions of users. We cover scalability, reliability, global distribution, and trade-offs that Google interviewers expect."
      },
      {
        number: "02",
        title: "Googleyness Prep",
        description: "Build compelling stories that demonstrate collaboration, impact, and leadership. We map your experiences to Google's evaluation criteria."
      },
      {
        number: "03",
        title: "Coding + Architecture",
        description: "Practice coding interviews with architectural thinking. Learn to write clean code while discussing system design implications."
      },
      {
        number: "04",
        title: "Leadership Round Prep",
        description: "For Director/VP roles, we focus on organizational strategy, technical vision, and demonstrating scope of impact at Google scale."
      }
    ]
  },
  roles: {
    title: "Roles We Coach For",
    roles: [
      {
        title: "Staff Engineer (L6)",
        level: "L6",
        focus: "Technical depth, system design, cross-team influence",
        salary: "$350K - $500K"
      },
      {
        title: "Senior Staff Engineer (L7)",
        level: "L7",
        focus: "Architectural leadership, organizational impact, technical strategy",
        salary: "$450K - $650K"
      },
      {
        title: "Director of Engineering",
        level: "L7-L8",
        focus: "Organizational strategy, technical vision, cross-functional leadership",
        salary: "$500K - $750K"
      },
      {
        title: "VP of Engineering",
        level: "L8",
        focus: "Executive presence, organizational influence, strategic thinking",
        salary: "$600K - $900K"
      }
    ]
  },
  faqs: [
    {
      question: "What is 'Googleyness' and how do I demonstrate it?",
      answer: "Googleyness is Google's evaluation of your ability to collaborate, show impact, and lead with ambiguity. It includes collaboration, impact, leadership, and Googleyness (yes, it's recursive!). We help you build stories that demonstrate these qualities with measurable outcomes."
    },
    {
      question: "How are Google L6/L7 interviews different from lower levels?",
      answer: "L6/L7 interviews focus heavily on system design at scale, organizational influence, and technical leadership. You're evaluated on your ability to impact multiple teams, design systems for billions of users, and influence technical direction across the organization."
    },
    {
      question: "What's the Google interview process for Director/VP roles?",
      answer: "Director/VP interviews include system design, coding (if technical), behavioral interviews focusing on Googleyness, and dedicated leadership rounds. The leadership rounds evaluate your ability to set technical vision, influence cross-functionally, and demonstrate organizational impact."
    },
    {
      question: "How many sessions do I need for Google prep?",
      answer: "Most L6/L7 candidates need 5-6 sessions: 2 for system design, 1-2 for Googleyness/behavioral, 1-2 for coding+architecture, and 1 for leadership prep (if applicable). We customize based on your level and timeline."
    }
  ],
  cta: {
    title: "Ready to Ace Your Google Interview?",
    subtitle: "Book a free 15-minute consultation to discuss your Google interview prep",
    buttonText: "Book Google Prep Session",
    whatsappText: "Message About Google Prep"
  }
};

export default function GoogleInterviewPrep() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
        <meta name="keywords" content={pageData.seo.keywords.join(", ")} />
        <link rel="canonical" href="https://www.fullstackmaster.net/google-interview-prep" />
        <meta property="og:title" content={pageData.seo.title} />
        <meta property="og:description" content={pageData.seo.description} />
        <meta property="og:url" content="https://www.fullstackmaster.net/google-interview-prep" />
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
                { label: "Google Interview Prep", href: "/google-interview-prep" }
              ]}
            />
            
            <ScrollReveal type="fade" duration={0.6}>
              <div className="max-w-4xl mx-auto text-center mb-12">
                <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-500/30">
                  <SiGoogle className="w-4 h-4 mr-2" />
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
                      trackBookCall('google-page-hero');
                      window.location.href = '/book';
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {pageData.cta.buttonText}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50"
                    onClick={() => {
                      trackWhatsApp('google-page-hero');
                      window.open(`https://wa.me/16094424081?text=${encodeURIComponent('Hi Rupesh! I want to discuss Google interview prep for an L6/L7 role.')}`, '_blank');
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

        {/* Why Google Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollReveal type="fade" duration={0.6}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.whyGoogle.title}</h2>
                <p className="text-lg text-muted-foreground">{pageData.whyGoogle.subtitle}</p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {pageData.whyGoogle.points.map((point, idx) => {
                const IconComponent = Lightbulb;
                return (
                  <ScrollReveal key={idx} type="slide-up" delay={idx * 0.1}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-blue-600" />
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
                        <div className="text-4xl font-bold text-blue-600">{step.number}</div>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Google Interview FAQs</h2>
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
                    trackBookCall('google-page-cta');
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
                    trackWhatsApp('google-page-cta');
                    window.open(`https://wa.me/16094424081?text=${encodeURIComponent('Hi Rupesh! I want to discuss Google interview prep.')}`, '_blank');
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
      <FloatingSocialShare title="Google Interview Prep" />
    </div>
  );
}

