import { lazy, Suspense, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import USATrustBar from "@/components/USATrustBar";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";
import SocialShareButtons from "@/components/SocialShareButtons";
import FeedbackButton from "@/components/FeedbackButton";
import { Loader2 } from "lucide-react";
import { 
  initGA, 
  setupScrollTracking, 
  setupExitIntentTracking, 
  setupTimeTracking,
  trackConversionFunnel 
} from "@/lib/analytics";

const FeaturedVideoSection = lazy(() => import("@/components/FeaturedVideoSection"));
const ClientLogosBar = lazy(() => import("@/components/ClientLogosBar"));
const WhoThisIsForSection = lazy(() => import("@/components/WhoThisIsForSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const InterviewQuiz = lazy(() => import("@/components/InterviewQuiz"));
const SuccessStoriesSection = lazy(() => import("@/components/SuccessStoriesSection"));
const ReviewsCarousel = lazy(() => import("@/components/ReviewsCarousel"));
const SalaryCalculator = lazy(() => import("@/components/SalaryCalculator"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const LinkedInGenerator = lazy(() => import("@/components/LinkedInGenerator"));
const ReferralProgramSection = lazy(() => import("@/components/ReferralProgramSection"));
const BookingSection = lazy(() => import("@/components/BookingSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const CoursesCarousel = lazy(() => import("@/components/CoursesCarousel"));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    initGA();
    trackConversionFunnel('awareness', 'homepage_load');
    
    const cleanupScroll = setupScrollTracking();
    const cleanupExit = setupExitIntentTracking('homepage');
    const cleanupTime = setupTimeTracking('homepage');
    
    return () => {
      cleanupScroll?.();
      cleanupExit?.();
      cleanupTime?.();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="home" />
      <Navigation />
      <main>
        {/* ATTENTION: Hero with strong first impression and clear CTA */}
        <section id="hero">
          <HeroSection />
        </section>
        
        {/* TRUST: Location, timezone, client count strip */}
        <section id="trust">
          <USATrustBar />
        </section>
        
        {/* FEATURED: Video introduction from Rupesh */}
        <section id="featured-video">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="fade" duration={0.6}>
              <FeaturedVideoSection />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* CREDIBILITY: Client company logos */}
        <section id="clients">
          <Suspense fallback={<SectionLoader />}>
            <ClientLogosBar />
          </Suspense>
        </section>
        
        {/* INTEREST: Problem framing - Who this coaching is for */}
        <section id="who">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="fade" duration={0.6}>
              <WhoThisIsForSection />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* INTEREST: What services are offered */}
        <section id="services">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="scale" delay={0.1}>
              <ServicesSection />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* VIRAL: Interview Readiness Assessment Quiz */}
        <section id="quiz">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="fade" duration={0.6}>
              <InterviewQuiz />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* DESIRE: Social proof - Success stories */}
        <section id="success-stories">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="scale" duration={0.7}>
              <SuccessStoriesSection />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* DESIRE: More social proof - Reviews carousel */}
        <section id="reviews">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="slide-up" delay={0.1}>
              <ReviewsCarousel />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* VIRAL: Salary Calculator with urgency */}
        <section id="calculator">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="fade" duration={0.6}>
              <SalaryCalculator />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* DECISION: Pricing with guarantee */}
        <section id="pricing">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="slide-up" duration={0.7}>
              <PricingSection />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* VIRAL: LinkedIn Post Generator */}
        <section id="linkedin-generator">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="fade" duration={0.6}>
              <LinkedInGenerator />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* VIRAL: Referral Program with unique links */}
        <section id="referral">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="slide-up" duration={0.6}>
              <ReferralProgramSection />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* ACTION: Direct booking CTA */}
        <section id="booking">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="fade" delay={0.1}>
              <BookingSection />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* OBJECTION HANDLING: FAQ section */}
        <section id="faq">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="slide-up">
              <FAQSection />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* CREDIBILITY: About the coach */}
        <section id="about">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="fade">
              <AboutSection />
            </ScrollReveal>
          </Suspense>
        </section>
        
        {/* EDUCATION: Online courses on Udemy and Pluralsight */}
        <section id="courses">
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal type="slide-up" delay={0.1}>
              <CoursesCarousel />
            </ScrollReveal>
          </Suspense>
        </section>
      </main>
      <Footer />
      <WhatsAppWidget />
      <SocialShareButtons />
      <FeedbackButton />
      <ScrollToTop />
    </div>
  );
}
