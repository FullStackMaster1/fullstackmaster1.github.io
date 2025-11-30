import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import WhyLeadersFailSection from "@/components/WhyLeadersFailSection";
import AboutSection from "@/components/AboutSection";
import MethodologySection from "@/components/MethodologySection";
import ServicesSection from "@/components/ServicesSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CoursesCarousel from "@/components/CoursesCarousel";
import PlaylistsCarousel from "@/components/PlaylistsCarousel";
import WebinarSection from "@/components/WebinarSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import SEOHead from "@/components/SEOHead";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="home" />
      <AnnouncementBar />
      <Navigation />
      <main>
        <HeroSection />
        
        <ScrollReveal>
          <WhyLeadersFailSection />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <TrustBar />
        </ScrollReveal>
        
        <ScrollReveal>
          <SuccessStoriesSection />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <ReviewsCarousel />
        </ScrollReveal>
        
        <ScrollReveal>
          <MethodologySection />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <ServicesSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <PricingSection />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <BookingSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <WebinarSection />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <CoursesCarousel />
        </ScrollReveal>
        
        <ScrollReveal>
          <PlaylistsCarousel />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <AboutSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <FAQSection />
        </ScrollReveal>
      </main>
      
      <ScrollReveal>
        <Footer />
      </ScrollReveal>
      
      <WhatsAppWidget />
      <StickyMobileCTA />
    </div>
  );
}
