import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import PricingSection from "@/components/PricingSection";
import CoursesCarousel from "@/components/CoursesCarousel";
import OpenSourceSection from "@/components/OpenSourceSection";
import PlaylistsCarousel from "@/components/PlaylistsCarousel";
import BlogSection from "@/components/BlogSection";
import ArticlesSection from "@/components/ArticlesSection";
import WebinarSection from "@/components/WebinarSection";
import FAQSection from "@/components/FAQSection";
import BookingSection from "@/components/BookingSection";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <ReviewsCarousel />
        <PricingSection />
        <CoursesCarousel />
        <OpenSourceSection />
        <PlaylistsCarousel />
        <BlogSection />
        <ArticlesSection />
        <WebinarSection />
        <FAQSection />
        <BookingSection />
        <SocialSection />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
