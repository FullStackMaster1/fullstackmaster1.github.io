import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import PricingSection from "@/components/PricingSection";
import CoursesCarousel from "@/components/CoursesCarousel";
import OpenSourceSection from "@/components/OpenSourceSection";
import PlaylistsCarousel from "@/components/PlaylistsCarousel";
import ArticlesSection from "@/components/ArticlesSection";
import WebinarSection from "@/components/WebinarSection";
import BookingSection from "@/components/BookingSection";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <ReviewsCarousel />
        <PricingSection />
        <CoursesCarousel />
        <OpenSourceSection />
        <PlaylistsCarousel />
        <ArticlesSection />
        <WebinarSection />
        <BookingSection />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
}
