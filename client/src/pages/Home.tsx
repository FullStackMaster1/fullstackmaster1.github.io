import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import USATrustBar from "@/components/USATrustBar";
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
import ArticlesSection from "@/components/ArticlesSection";
import ScrollReveal from "@/components/ScrollReveal";
import RecentlyBookedPopup from "@/components/RecentlyBookedPopup";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import ExecutiveCaseStudies from "@/components/ExecutiveCaseStudies";
import FullServicesSection from "@/components/FullServicesSection";
import ScrollToTop from "@/components/ScrollToTop";
import CompanySection from "@/components/CompanySection";
import FreeResourcesHighlight from "@/components/FreeResourcesHighlight";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="home" />
      <AnnouncementBar />
      <Navigation />
      <main>
        <HeroSection />
        <USATrustBar />
        
        <ScrollReveal type="fade" duration={0.7}>
          <ExecutiveCaseStudies />
        </ScrollReveal>
        
        <ScrollReveal type="slide-up" duration={0.8}>
          <WhyLeadersFailSection />
        </ScrollReveal>
        
        <ScrollReveal type="fade" delay={0.1} duration={0.6}>
          <TrustBar />
        </ScrollReveal>
        
        <ScrollReveal type="scale" duration={0.7}>
          <SuccessStoriesSection />
        </ScrollReveal>
        
        <ScrollReveal type="slide-up" delay={0.1}>
          <ReviewsCarousel />
        </ScrollReveal>
        
        <ScrollReveal type="slide-up" duration={0.8}>
          <MethodologySection />
        </ScrollReveal>
        
        <ScrollReveal type="scale" delay={0.1}>
          <ServicesSection />
        </ScrollReveal>
        
        <ScrollReveal type="fade" duration={0.7}>
          <FullServicesSection />
        </ScrollReveal>
        
        <ScrollReveal type="slide-up" duration={0.7}>
          <PricingSection />
        </ScrollReveal>
        
        <ScrollReveal type="fade" delay={0.1}>
          <BookingSection />
        </ScrollReveal>
        
        <ScrollReveal type="slide-up">
          <WebinarSection />
        </ScrollReveal>
        
        <ScrollReveal type="scale" delay={0.1}>
          <FreeResourcesHighlight />
        </ScrollReveal>
        
        <ScrollReveal type="slide-up" delay={0.1}>
          <ArticlesSection />
        </ScrollReveal>
        
        <ScrollReveal type="scale">
          <CoursesCarousel />
        </ScrollReveal>
        
        <ScrollReveal type="slide-up" delay={0.1}>
          <PlaylistsCarousel />
        </ScrollReveal>
        
        <ScrollReveal type="fade">
          <AboutSection />
        </ScrollReveal>
        
        <ScrollReveal type="scale" delay={0.1}>
          <CompanySection />
        </ScrollReveal>
        
        <ScrollReveal type="slide-up">
          <FAQSection />
        </ScrollReveal>
      </main>
      
      <ScrollReveal type="fade">
        <Footer />
      </ScrollReveal>
      
      <WhatsAppWidget />
      <ScrollToTop />
      <StickyMobileCTA />
      <RecentlyBookedPopup />
      <ExitIntentPopup />
      <PWAInstallPrompt />
    </div>
  );
}
