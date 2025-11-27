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
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navigation />
      <main>
        <HeroSection />
        <TrustBar />
        <WhyLeadersFailSection />
        <AboutSection />
        <MethodologySection />
        <ServicesSection />
        <SuccessStoriesSection />
        <ReviewsCarousel />
        <PricingSection />
        <FAQSection />
        <BookingSection />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
