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
  Code
} from "lucide-react";
import { SiMicrosoft } from "react-icons/si";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import FloatingSocialShare from "@/components/FloatingSocialShare";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollReveal from "@/components/ScrollReveal";
import { trackEvent, trackBookCall, trackWhatsApp } from "@/lib/analytics";

const pageData = {
  seo: {
    title: "Microsoft Interview Prep | Principal Engineer Director VP Coaching | Rupesh Tiwari",
    description: "Master Microsoft interviews for Principal Engineer, Director, and VP roles. Expert coaching on system design, coding interviews, and leadership rounds. 85% success rate. Book your prep session.",
    keywords: ["Microsoft interview prep", "Microsoft principal engineer interview", "Microsoft director interview", "Microsoft VP interview", "Microsoft system design interview", "Microsoft coding interview", "Microsoft leadership interview", "Microsoft L66 L67 interview", "Microsoft L68 interview", "USA Microsoft interview coach"]
  },
  hero: {
    badge: "Microsoft Interview Specialist",
    title: "Master Your Microsoft Interview",
    subtitle: "Principal Engineer, Director & VP Roles",
    description: "Microsoft interviews combine technical depth with leadership evaluation. I've helped 35+ Principal Engineers and Directors land offers at Microsoft with an 85% success rate.",
    stats: [
      { value: "85%", label: "Success Rate" },
      { value: "35+", label: "Principals & Directors Coached" },
      { value: "L66-L68", label: "Levels Supported" }
    ]
  },
  whyMicrosoft: {
    title: "Why Microsoft Interviews Are Unique",
    subtitle: "What makes Microsoft interviews different for senior roles",
    points: [
      {
        icon: "Code",
        title: "Technical + Leadership",
        description: "Microsoft evaluates both technical excellence and leadership ability. You need to demonstrate coding skills AND organizational influence."
      },
      {
        icon: "Target",
        title: "System Design Focus",
        description: "Microsoft system design interviews test your ability to design enterprise-scale systems. You need to think about Azure, scalability, and cloud architecture."
      },
      {
        icon: "Users",
        title: "Leadership Evaluation",
        description: "For Principal/Director roles, Microsoft evaluates your ability to influence technical direction, mentor engineers, and drive organizational change."
      },
      {
        icon: "Award",
        title: "Cultural Fit",
        description: "Microsoft values growth mindset, collaboration, and customer obsession. You need to demonstrate these values through your stories and examples."
      }
    ]
  },
  process: {
    title: "How We Prepare You",
    subtitle: "A proven framework for Microsoft success",
    steps: [
      {
        number: "01",
        title: "System Design Mastery",
        description: "Learn to design enterprise-scale systems. We cover Azure architecture, scalability patterns, and trade-offs that Microsoft interviewers expect."
      },
      {
        number: "02",
        title: "Coding Excellence",
        description: "Practice coding interviews with focus on clean code, algorithms, and data structures. Microsoft expects strong coding skills even at Principal level."
      },
      {
        number: "03",
        title: "Leadership Stories",
        description: "Build compelling stories that demonstrate technical leadership, mentorship, and organizational influence. We map your experiences to Microsoft's evaluation criteria."
      },
      {
        number: "04",
        title: "Principal/Director Prep",
        description: "For Principal/Director roles, we focus on technical vision, cross-team influence, and demonstrating scope of impact at Microsoft scale."
      }
    ]
  },
  roles: {
    title: "Roles We Coach For",
    roles: [
      {
        title: "Principal Software Engineer",
        level: "L66-L67",
        focus: "Technical depth, architectural leadership, mentorship",
        salary: "$350K - $550K"
      },
      {
        title: "Partner Software Engineer",
        level: "L68",
        focus: "Technical vision, organizational influence, strategic thinking",
        salary: "$450K - $700K"
      },
      {
        title: "Director of Engineering",
        level: "L67-L68",
        focus: "Organizational strategy, technical vision, cross-functional leadership",
        salary: "$500K - $750K"
      },
      {
        title: "VP of Engineering",
        level: "L68+",
        focus: "Executive presence, organizational influence, strategic direction",
        salary: "$600K - $900K"
      }
    ]
  },
  faqs: [
    {
      question: "What makes Microsoft interviews different for Principal/Director roles?",
      answer: "Microsoft interviews at senior levels combine technical depth with leadership evaluation. You're assessed on coding ability, system design, AND organizational influence. Principal/Director roles require demonstrating technical vision, mentorship, and cross-team impact."
    },
    {
      question: "Do I need to know Azure for Microsoft interviews?",
      answer: "While Azure knowledge helps, Microsoft interviews focus more on system design principles, scalability, and architectural thinking. We help you understand Azure patterns, but the core focus is on demonstrating strong system design skills."
    },
    {
      question: "What's the Microsoft interview process for Principal/Director roles?",
      answer: "Principal/Director interviews include coding rounds, system design interviews, behavioral interviews focusing on leadership and mentorship, and dedicated leadership rounds. The process evaluates both technical excellence and organizational influence."
    },
    {
      question: "How many sessions do I need for Microsoft prep?",
      answer: "Most Principal/Director candidates need 5-6 sessions: 2 for system design, 1-2 for coding, 1-2 for leadership/behavioral, and 1 for Principal/Director-specific prep. We customize based on your level and timeline."
    }
  ],
  cta: {
    title: "Ready to Ace Your Microsoft Interview?",
    subtitle: "Book a free 15-minute consultation to discuss your Microsoft interview prep",
    buttonText: "Book Microsoft Prep Session",
    whatsappText: "Message About Microsoft Prep"
  }
};

export default function MicrosoftInterviewPrep() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
        <meta name="keywords" content={pageData.seo.keywords.join(", ")} />
        <link rel="canonical" href="https://www.fullstackmaster.net/microsoft-interview-prep" />
        <meta property="og:title" content={pageData.seo.title} />
        <meta property="og:description" content={pageData.seo.description} />
        <meta property="og:url" content="https://www.fullstackmaster.net/microsoft-interview-prep" />
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
                { label: "Microsoft Interview Prep", href: "/microsoft-interview-prep" }
              ]}
            />
            
            <ScrollReveal type="fade" duration={0.6}>
              <div className="max-w-4xl mx-auto text-center mb-12">
                <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-500/30">
                  <SiMicrosoft className="w-4 h-4 mr-2" />
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
                      trackBookCall('microsoft-page-hero');
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
                      trackWhatsApp('microsoft-page-hero');
                      window.open(`https://wa.me/16094424081?text=${encodeURIComponent('Hi Rupesh! I want to discuss Microsoft interview prep for a Principal/Director role.')}`, '_blank');
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

        {/* Why Microsoft Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollReveal type="fade" duration={0.6}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.whyMicrosoft.title}</h2>
                <p className="text-lg text-muted-foreground">{pageData.whyMicrosoft.subtitle}</p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {pageData.whyMicrosoft.points.map((point, idx) => {
                const IconComponent = Code;
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Microsoft Interview FAQs</h2>
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
                    trackBookCall('microsoft-page-cta');
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
                    trackWhatsApp('microsoft-page-cta');
                    window.open(`https://wa.me/16094424081?text=${encodeURIComponent('Hi Rupesh! I want to discuss Microsoft interview prep.')}`, '_blank');
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
      <FloatingSocialShare title="Microsoft Interview Prep" />
    </div>
  );
}

