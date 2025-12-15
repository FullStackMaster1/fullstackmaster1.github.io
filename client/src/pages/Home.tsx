import { lazy, Suspense, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import USATrustBar from "@/components/USATrustBar";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";
import { Loader2 } from "lucide-react";
import { 
  initGA, 
  setupScrollTracking, 
  setupExitIntentTracking, 
  setupTimeTracking,
  trackConversionFunnel 
} from "@/lib/analytics";

const ClientLogosBar = lazy(() => import("@/components/ClientLogosBar"));
const WhoThisIsForSection = lazy(() => import("@/components/WhoThisIsForSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const SuccessStoriesSection = lazy(() => import("@/components/SuccessStoriesSection"));
const ReviewsCarousel = lazy(() => import("@/components/ReviewsCarousel"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const BookingSection = lazy(() => import("@/components/BookingSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));

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
        <HeroSection />
        
        {/* TRUST: Location, timezone, client count strip */}
        <USATrustBar />
        
        {/* CREDIBILITY: Client company logos */}
        <Suspense fallback={<SectionLoader />}>
          <ClientLogosBar />
        </Suspense>
        
        {/* INTEREST: Problem framing - Who this coaching is for */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" duration={0.6}>
            <WhoThisIsForSection />
          </ScrollReveal>
        </Suspense>
        
        {/* INTEREST: What services are offered */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" delay={0.1}>
            <ServicesSection />
          </ScrollReveal>
        </Suspense>
        
        {/* DESIRE: Social proof - Success stories */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" duration={0.7}>
            <SuccessStoriesSection />
          </ScrollReveal>
        </Suspense>
        
        {/* DESIRE: More social proof - Reviews carousel */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" delay={0.1}>
            <ReviewsCarousel />
          </ScrollReveal>
        </Suspense>
        
        {/* DECISION: Pricing with guarantee */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" duration={0.7}>
            <PricingSection />
          </ScrollReveal>
        </Suspense>
        
        {/* ACTION: Direct booking CTA */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" delay={0.1}>
            <BookingSection />
          </ScrollReveal>
        </Suspense>
        
        {/* OBJECTION HANDLING: FAQ section */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up">
            <FAQSection />
          </ScrollReveal>
        </Suspense>
        
        {/* CREDIBILITY: About the coach */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade">
            <AboutSection />
          </ScrollReveal>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}
