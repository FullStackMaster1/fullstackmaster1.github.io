import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AnnouncementBar from "@/components/AnnouncementBar";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import FloatingSocialShare from "@/components/FloatingSocialShare";
import USATrustBar from "@/components/USATrustBar";
import EmailGateModal from "@/components/EmailGateModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import profile from "@/data/profile.json";
import whatsappData from "@/data/whatsapp.json";
import reviews from "@/data/reviews.json";
import { 
  MessageCircle, Calendar, CheckCircle, Star, Users, Trophy, ArrowLeft, 
  Linkedin, Clock, Shield, Zap, ChevronLeft, ChevronRight, X, Gift,
  TrendingUp, Award, MapPin, ExternalLink, Sparkles, Play, ArrowRight,
  Video, Download, FileText, MessageSquare, Repeat, BookOpen, Headphones,
  Infinity, DollarSign
} from "lucide-react";
import { SiAmazon } from "react-icons/si";
import { useLocation, Link } from "wouter";
import rupeshPhoto from "@assets/rupesh-headshot_1764261897457.png";
import { trackEvent, trackWhatsApp, trackBookCall } from "@/lib/analytics";

function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  // Show top 5 reviews - prioritize ones with company (likely got offers) or just top rated ones
  const topReviews = reviews
    .sort((a, b) => {
      // Prioritize reviews with company (likely got offers)
      if (a.company && !b.company) return -1;
      if (!a.company && b.company) return 1;
      // Then sort by rating (all are 5, but keep this for consistency)
      return b.rating - a.rating;
    })
    .slice(0, 5);

  useEffect(() => {
    if (topReviews.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % topReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [topReviews.length]);

  if (topReviews.length === 0) {
    return (
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <p className="text-sm text-muted-foreground">No testimonials available yet.</p>
      </Card>
    );
  }

  const review = topReviews[current];
  if (!review) return null;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <p className="text-sm mb-4 italic">"{review.text || 'Great coaching experience!'}"</p>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-sm">{review.name || 'Client'}</p>
                <p className="text-xs text-muted-foreground">{review.title || ''} {review.title && review.company ? 'at' : ''} {review.company || ''}</p>
              </div>
              {review.company && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  {review.company}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 pt-4 border-t">
              <Link href="/success-stories">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => trackEvent("testimonial_view_stories_click", "engagement", "book_page")}
                >
                  <Trophy className="w-3 h-3" />
                  View Success Stories
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
              {(review as any).videoUrl && (
                <a
                  href={(review as any).videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("testimonial_video_click", "engagement", "book_page")}
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2"
                  >
                    <Play className="w-3 h-3" />
                    Watch Video
                  </Button>
                </a>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-center gap-2 mt-4">
        {topReviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            data-testid={`testimonial-dot-${i}`}
          />
        ))}
      </div>
    </div>
  );
}

function BookPageExitPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            data-testid="button-close-book-exit"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-6 h-6" />
            <Badge className="bg-white/20 text-white border-0">FREE Resource</Badge>
          </div>
          
          <h3 className="text-xl font-bold mb-2">Wait! Get My Free Interview Kit</h3>
          <p className="text-white/90 text-sm">
            Before you go, grab my complete FAANG interview preparation checklist - absolutely free.
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">30+ page interview preparation guide</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">System design cheat sheets</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Behavioral interview STAR templates</span>
            </div>
          </div>
          
          <a
            href={profile.socialLinks.gumroad.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent("exit_popup_gumroad_click", "buy_intent", "book_page");
              onClose();
            }}
          >
            <Button className="w-full bg-amber-600 hover:bg-amber-700" size="lg" data-testid="button-get-free-kit">
              <Gift className="w-4 h-4 mr-2" />
              Get Free Kit Now
            </Button>
          </a>
          
          <p className="text-xs text-center text-muted-foreground">
            No email required. Instant download on Gumroad.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Book() {
  const [, setLocation] = useLocation();
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    trackEvent("book_page_view", "browse_intent", "book_page");
    
    const timer = setInterval(() => {
      setTimeOnPage((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeOnPage === 30) {
      trackEvent("book_page_engaged_30s", "browse_intent", "time_milestone");
    }
    if (timeOnPage === 60) {
      trackEvent("book_page_engaged_60s", "browse_intent", "time_milestone");
    }
  }, [timeOnPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const depth = Math.round((currentScroll / scrollHeight) * 100);
      
      if (depth > scrollDepth) {
        setScrollDepth(depth);
        if (depth === 25 || depth === 50 || depth === 75 || depth === 100) {
          trackEvent("book_page_scroll", "browse_intent", `${depth}%`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDepth]);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("book-exit-shown");
    if (alreadyShown) {
      setHasShownExitPopup(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitPopup) {
        setShowExitPopup(true);
        setHasShownExitPopup(true);
        sessionStorage.setItem("book-exit-shown", "true");
        trackEvent("book_exit_intent_shown", "engagement", "popup");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownExitPopup]);

  const handleWhatsAppClick = (source: string) => {
    trackWhatsApp(`book_page_${source}`);
    trackEvent("book_whatsapp_click", "contact_intent", source);
  };

  const [showEmailGate, setShowEmailGate] = useState(false);
  const [emailGateSource, setEmailGateSource] = useState('');
  const BOOKING_URL = "https://calendar.google.com/calendar/appointments/AcZssZ2dMNXqXzYcl2NKLpclDV9w0p4-9cp4UvTHii0=?gv=true";

  const handleCalendarClick = (source: string) => {
    trackBookCall(`book_page_${source}`);
    trackEvent("book_calendar_click", "buy_intent", source);
    
    // Check if user has already provided email
    const hasEmail = localStorage.getItem('email-subscribed');
    
    if (!hasEmail) {
      // Show email gate
      setEmailGateSource(source);
      setShowEmailGate(true);
    } else {
      // Direct redirect
      window.open(BOOKING_URL, '_blank');
    }
  };

  const handleEmailGateSuccess = () => {
    trackEvent("email_gate_completed", "conversion", emailGateSource);
    setShowEmailGate(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        customTitle="Book Director & VP Interview Coaching | AWS, Google, Microsoft Interview Prep | USA-Based"
        customDescription="Schedule 1-on-1 interview coaching for Director, VP, and Principal Engineer roles at AWS, Google, Microsoft, Amazon. USA-based coach with 85% success rate. EST/PST scheduling available. Book your session today."
      />
      <AnnouncementBar />
      <Navigation />
      <USATrustBar />

      <main className="flex-1">
        <div className="px-4 md:px-8 py-4 border-b">
          <div className="max-w-5xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/")}
              data-testid="button-back-to-home"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>

        {/* Profile Header Section - iGotAnOffer Style */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-background border-b">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
              {/* Profile Photo & Stats */}
              <div className="flex flex-col items-center md:items-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative mb-6"
                >
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl bg-background">
                    <img
                      src={rupeshPhoto}
                      alt={profile.personal.name}
                      className="w-full h-full object-cover"
                      data-testid="img-profile-headshot"
                    />
                  </div>
                  <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 shadow-lg whitespace-nowrap">
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    SuperCoach
                  </Badge>
                </motion.div>
                
                {/* Key Stats */}
                <div className="space-y-3 w-full">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{profile.personal.location.country} ({profile.personal.location.timezone})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500 flex-shrink-0" />
                    <span className="font-semibold">5.0</span>
                    <span className="text-sm text-muted-foreground">(53 reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">67 clients (31% rebook rate)</span>
                  </div>
                </div>
              </div>

              {/* Bio & Info */}
              <div>
                <div className="mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">{profile.personal.name}</h1>
                  <Badge variant="secondary" className="mb-3 text-sm">
                    {profile.personal.title}
                  </Badge>
                  <div className="flex items-center gap-2 mb-4">
                    <SiAmazon className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{profile.personal.company}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {profile.descriptions.medium}
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Engineering manager", "Product manager", "Solutions architect", "Technical program manager"].map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Your Investment</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the package that fits your needs. All sessions include recordings, notes, and follow-up support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Single Session */}
              <Card className="p-6 border-2 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Single Deep-Dive</h3>
                    <Badge variant="outline" className="text-xs mt-1">Try First</Badge>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$130</span>
                    <span className="text-muted-foreground">/session</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">60 focused minutes</p>
                </div>
                <div className="space-y-2 mb-6">
                  {[
                    "One gap. One hour. Fixed.",
                    "Pick your weakest area",
                    "Walk out with clear action items",
                    "Follow-up notes via WhatsApp"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCalendarClick("pricing_single");
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Single Session
                </Button>
              </Card>

              {/* 5-Session Package */}
              <Card className="p-6 border-2 border-primary hover:shadow-xl transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold rounded-bl-lg">
                  MOST POPULAR
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Complete Interview Mastery</h3>
                    <Badge className="text-xs mt-1 bg-primary text-primary-foreground">Best Value</Badge>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-primary">$600</span>
                    <div className="flex flex-col">
                      <span className="text-xl text-muted-foreground line-through decoration-red-500 decoration-2">$705</span>
                      <span className="text-xs text-red-500 font-medium">on platforms</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-muted-foreground">$120/session</span>
                    <Badge variant="secondary" className="text-xs">SAVE $105</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">vs $175/session on coaching platforms</p>
                </div>
                <div className="space-y-2 mb-6">
                  {[
                    "5 deep-dive sessions (60 min each)",
                    "System Design + Behavioral + Leadership",
                    "Resume & LinkedIn pitch overhaul",
                    "Personalized homework after each session",
                    "WhatsApp access for quick questions",
                    "You book when YOU'RE ready — no rush",
                    "Session notes + action items delivered"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    <Infinity className="w-3 h-3 mr-1" />
                    Never Expires
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    Book Anytime
                  </Badge>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCalendarClick("pricing_package");
                  }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start My Transformation
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Pay after our first call. Zelle, PayPal, or Card accepted.
                </p>
              </Card>
            </div>

            {/* ROI Section */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">The ROI Math for Directors & VPs</h3>
                <p className="text-sm text-muted-foreground">What our executive clients typically unlock:</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-background rounded-lg border">
                  <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Avg Director/VP Comp Increase</p>
                  <p className="text-xl font-bold">$285K/year</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Typical Signing Bonus</p>
                  <p className="text-xl font-bold">$80K-200K</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <Gift className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Your Investment</p>
                  <p className="text-xl font-bold">$600</p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg mb-1">
                  Your $600 investment can unlock $285K+ in annual compensation gains.
                </p>
                <p className="text-sm text-muted-foreground">
                  That's a 475x return. Based on 50+ Director/VP placements. This isn't an expense — it's due diligence.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Booking Options Section - iGotAnOffer Style */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Book Your Session</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Choose your preferred booking method. All options lead to the same quality coaching.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* WhatsApp Option */}
              <Card className="p-6 h-full border-2 hover:border-green-300 dark:hover:border-green-700 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">WhatsApp</h3>
                    <Badge variant="outline" className="text-xs mt-1">Recommended</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick questions, NDA requests, or discuss your situation before booking.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs">Personal 1-on-1</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs">Instant answers</span>
                  </div>
                </div>
                <a
                  href={`${profile.contact.whatsappLink}?text=${encodeURIComponent(whatsappData.widget.defaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsAppClick("card")}
                >
                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white" data-testid="button-whatsapp-book">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Me
                  </Button>
                </a>
              </Card>

              {/* Google Calendar Option - Personal Booking with Benefits */}
              <Card className="p-6 h-full border-2 border-blue-500 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                  BEST VALUE
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Book Directly</h3>
                    <Badge variant="outline" className="text-xs mt-1 bg-blue-50 dark:bg-blue-950">Personal Session</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule your personal 1-on-1 session directly. Get exclusive benefits not available on platforms.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <Video className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium">All calls recorded & shared personally</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Download className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium">Download recordings anytime</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium">Reply & learn from sessions anytime</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium">Personalized session notes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Repeat className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium">Follow-up support via email</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium">Access to exclusive resources</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Headphones className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium">Priority support between sessions</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid="button-google-calendar-book"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCalendarClick("card");
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Now
                </Button>
              </Card>

              {/* iGotAnOffer Option */}
              <Card className="p-6 h-full border-2 hover:border-primary transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ExternalLink className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">iGotAnOffer</h3>
                    <Badge variant="outline" className="text-xs mt-1">Platform</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Book through iGotAnOffer platform with credit system and flexible scheduling.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs">3 credits per session</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs">Platform verified</span>
                  </div>
                </div>
                <a
                  href={profile.socialLinks.igotanoffer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("igotanoffer_book_click", "buy_intent", "book_page")}
                >
                  <Button size="sm" variant="outline" className="w-full" data-testid="button-igotanoffer-book">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Book on iGotAnOffer
                  </Button>
                </a>
              </Card>
            </div>

            {/* Personal Booking Benefits Section */}
            <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold">Exclusive Benefits with Personal Booking</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Why Book Directly?</h3>
                  <p className="text-muted-foreground">
                    Get more value and personalized support when you book directly with me
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-blue-100 dark:border-blue-900">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Recorded Sessions</h4>
                      <p className="text-sm text-muted-foreground">
                        Every call is recorded and shared personally with you via email. No platform limitations or restrictions.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-blue-100 dark:border-blue-900">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Lifetime Access</h4>
                      <p className="text-sm text-muted-foreground">
                        Download recordings anytime, anywhere. Keep them forever for reference and continuous learning.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-blue-100 dark:border-blue-900">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Reply & Learn Anytime</h4>
                      <p className="text-sm text-muted-foreground">
                        Ask follow-up questions via email. I'll personally respond to help you understand concepts better.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-blue-100 dark:border-blue-900">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Personalized Notes</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive detailed session notes with action items, key takeaways, and personalized feedback.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-blue-100 dark:border-blue-900">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Repeat className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Follow-Up Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Get email support between sessions. I'll help clarify doubts and provide additional resources.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-blue-100 dark:border-blue-900">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Exclusive Resources</h4>
                      <p className="text-sm text-muted-foreground">
                        Access to private templates, frameworks, and study materials not available elsewhere.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-blue-100 dark:border-blue-900">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Headphones className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Priority Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Faster response times and priority scheduling for your follow-up sessions.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-blue-100 dark:border-blue-900">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Flexible Scheduling</h4>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred time slots. Reschedule easily with 24-hour notice.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCalendarClick("benefits_section");
                    }}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Your Personal Session Now
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    All benefits included at no extra cost
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-8 border-t">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Use credits with any coach</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Credits never expire</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>100% risk-free trial</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-primary/5 to-accent/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Schedule Your Session
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose a time that works for you. Sessions available in EST/PST friendly timings.
            </p>
            <Card className="overflow-hidden" data-testid="card-inline-calendar">
              <div className="rounded-lg overflow-hidden">
                <iframe 
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0sqWPJCaFAjSg4aCNEPXKC03tzsyobzsyV6t_JC5M9SGXKvH3sTLj-x_FFFs_N-WjU0s8zEv6g?gv=true"
                  style={{ border: 0 }}
                  width="100%"
                  height="600"
                  title="Book a coaching session with Rupesh"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  referrerPolicy="no-referrer-when-downgrade"
                  data-testid="iframe-calendar-book"
                />
              </div>
            </Card>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 md:px-8 bg-muted/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Clients Say</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <TestimonialCarousel />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">$285K Average Comp Increase</p>
                    <p className="text-sm text-muted-foreground">For Directors & VPs coached</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">50+ Directors & VPs Coached</p>
                    <p className="text-sm text-muted-foreground">To FAANG offers</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold">50+ Verified Reviews</p>
                    <p className="text-sm text-muted-foreground">5.0/5.0 on IGotAnOffer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <img
                    src={rupeshPhoto}
                    alt={profile.personal.name}
                    className="rounded-lg shadow-lg w-full max-w-sm h-auto"
                    data-testid="img-rupesh-coach"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-md font-semibold">
                    AWS Senior CSM
                  </div>
                </motion.div>
              </div>
              
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet {profile.personal.firstName}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {profile.descriptions.medium}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>20+ years in tech - from Software Engineer to AWS Senior CSM</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Coached 4,000+ professionals - 85% landing FAANG offers</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>5.0/5.0 rating from 50+ verified reviews</span>
                  </div>
                </div>
                
                <a
                  href={profile.socialLinks.linkedIn.personal}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("linkedin_click", "contact_intent", "book_page")}
                >
                  <Button variant="outline" className="gap-2">
                    <Linkedin className="w-4 h-4" />
                    Connect on LinkedIn
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4">Ready to Start?</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Get You That Offer</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't leave your FAANG interview to chance. I've helped 4,000+ professionals land their dream roles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`${profile.contact.whatsappLink}?text=${encodeURIComponent(whatsappData.widget.defaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsAppClick("cta")}
                >
                  <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white" data-testid="button-whatsapp-cta">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Me
                  </Button>
                </a>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto" 
                  data-testid="button-google-calendar-cta"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCalendarClick("cta");
                  }}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Now
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppWidget />
      <FloatingSocialShare title="Book Coaching Session" />
      
      <AnimatePresence>
        {showExitPopup && (
          <BookPageExitPopup onClose={() => setShowExitPopup(false)} />
        )}
      </AnimatePresence>
      
      <EmailGateModal
        isOpen={showEmailGate}
        onClose={() => setShowEmailGate(false)}
        onSuccess={handleEmailGateSuccess}
        bookingUrl={BOOKING_URL}
      />
    </div>
  );
}
