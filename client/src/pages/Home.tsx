import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import TeachingDemosSection from "@/components/TeachingDemosSection";
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
      <AnnouncementBar />
      <Navigation />
      <main>
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <TeachingDemosSection />
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
