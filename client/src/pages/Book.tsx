import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AnnouncementBar from "@/components/AnnouncementBar";
import WhatsAppWidget from "@/components/WhatsAppWidget";
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
  TrendingUp, Award
} from "lucide-react";
import { useLocation } from "wouter";
import rupeshPhoto from "@assets/rupesh-seating-confidently_1764278393371.png";
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
  const topReviews = reviews.filter(r => r.gotOffer).slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % topReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [topReviews.length]);

  const review = topReviews[current];

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
            <p className="text-sm mb-4 italic">"{review.text}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.title} at {review.company}</p>
              </div>
              {review.gotOffer && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Got Offer
                </Badge>
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

  const handleCalendarClick = (source: string) => {
    trackBookCall(`book_page_${source}`);
    trackEvent("book_calendar_click", "buy_intent", source);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        customTitle="Book Your 1-on-1 Coaching Session | Rupesh Tiwari"
        customDescription="Schedule your personalized FAANG interview coaching with Rupesh Tiwari. 85%+ success rate. Directors, VPs, Principal Engineers, and Solutions Architects."
      />
      <AnnouncementBar />
      <Navigation />

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

        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 flex justify-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-sm">
                  <Clock className="w-3 h-3 mr-1" />
                  Limited Slots Available
                </Badge>
                <Badge variant="secondary" className="text-sm bg-green-600 text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  85% Get Offers
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Book Your 1-on-1 Coaching
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Get personalized FAANG interview preparation from someone who's lived every role you're interviewing for.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter end={4000} suffix="+" />
                  </div>
                  <div className="text-xs text-slate-400">Coached</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter end={85} suffix="%" />
                  </div>
                  <div className="text-xs text-slate-400">Success Rate</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter end={20} suffix="+" />
                  </div>
                  <div className="text-xs text-slate-400">Years Exp</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl md:text-3xl font-bold text-white">5.0</div>
                  <div className="text-xs text-slate-400">Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Choose How to Connect</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Both options lead to the same quality coaching. Choose what works best for you.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div>
                <Card className="p-8 h-full border-green-200 dark:border-green-800 hover-elevate transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">WhatsApp Me</h3>
                      <Badge variant="outline" className="text-xs">Recommended</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    For quick questions, NDA requests, or to discuss your specific situation before booking.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Personal 1-on-1 conversation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Discuss your specific needs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Get instant answers</span>
                    </div>
                  </div>
                  <a
                    href={`${profile.contact.whatsappLink}?text=${encodeURIComponent(whatsappData.widget.defaultMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleWhatsAppClick("card")}
                  >
                    <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white" data-testid="button-whatsapp-book">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message Me on WhatsApp
                    </Button>
                  </a>
                </Card>
              </div>

              <div>
                <Card className="p-8 h-full border-blue-200 dark:border-blue-800 hover-elevate transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Book Directly</h3>
                      <Badge variant="outline" className="text-xs">Instant Confirm</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Ready to start? Schedule your session directly through Google Calendar.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Instant booking confirmation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Multiple time slots available</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Calendar invite to your email</span>
                    </div>
                  </div>
                  <a
                    href="https://calendar.google.com/calendar/appointments/AcZssZ2dMNXqXzYcl2NKLpclDV9w0p4-9cp4UvTHii0=?gv=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCalendarClick("card")}
                  >
                    <Button size="lg" className="w-full" data-testid="button-google-calendar-book">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule on Google Calendar
                    </Button>
                  </a>
                </Card>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-600" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-primary" />
                <span>NDA Available</span>
              </div>
            </div>
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
                <a
                  href="https://calendar.google.com/calendar/appointments/AcZssZ2dMNXqXzYcl2NKLpclDV9w0p4-9cp4UvTHii0=?gv=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCalendarClick("cta")}
                >
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-google-calendar-cta">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Now
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppWidget />
      
      <AnimatePresence>
        {showExitPopup && (
          <BookPageExitPopup onClose={() => setShowExitPopup(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
