import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import USATrustBar from "@/components/USATrustBar";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";
import { Loader2 } from "lucide-react";

const ClientLogosBar = lazy(() => import("@/components/ClientLogosBar"));
const SuccessStoriesSection = lazy(() => import("@/components/SuccessStoriesSection"));
const ReviewsCarousel = lazy(() => import("@/components/ReviewsCarousel"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const BookingSection = lazy(() => import("@/components/BookingSection"));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="home" />
      <Navigation />
      <main>
        {/* HERO - Strong first impression with clear CTA */}
        <HeroSection />
        
        {/* TRUST BAR - Location, timezone, client count */}
        <USATrustBar />
        
        {/* CLIENT LOGOS - Build credibility */}
        <Suspense fallback={<SectionLoader />}>
          <ClientLogosBar />
        </Suspense>
        
        {/* SUCCESS STORIES - Featured wins with verified reviews */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" duration={0.7}>
            <SuccessStoriesSection />
          </ScrollReveal>
        </Suspense>
        
        {/* REVIEWS CAROUSEL - More social proof */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" delay={0.1}>
            <ReviewsCarousel />
          </ScrollReveal>
        </Suspense>
        
        {/* SERVICES - What you offer */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" delay={0.1}>
            <ServicesSection />
          </ScrollReveal>
        </Suspense>
        
        {/* PRICING - Clear pricing options */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" duration={0.7}>
            <PricingSection />
          </ScrollReveal>
        </Suspense>
        
        {/* BOOKING - Direct booking CTA */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" delay={0.1}>
            <BookingSection />
          </ScrollReveal>
        </Suspense>
        
        {/* FAQ - Handle objections */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up">
            <FAQSection />
          </ScrollReveal>
        </Suspense>
        
        {/* ABOUT - Brief introduction */}
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
