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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="home" />
      <AnnouncementBar />
      <Navigation />
      <main>
        {/* Above the fold: Hero + Urgency + Trust */}
        <HeroSection />
        <WhyLeadersFailSection />
        <TrustBar />
        
        {/* Social proof: Peer validation before process */}
        <SuccessStoriesSection />
        <ReviewsCarousel />
        
        {/* Decision journey: Process → Services → Investment */}
        <MethodologySection />
        <ServicesSection />
        <PricingSection />
        
        {/* Primary CTA */}
        <BookingSection />
        
        {/* Nurture content: Webinars, Courses, Background */}
        <WebinarSection />
        <CoursesCarousel />
        <PlaylistsCarousel />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppWidget />
      <StickyMobileCTA />
    </div>
  );
}
