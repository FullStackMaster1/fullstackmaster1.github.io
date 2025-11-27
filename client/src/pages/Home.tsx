import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CoursesCarousel from "@/components/CoursesCarousel";
import PlaylistsCarousel from "@/components/PlaylistsCarousel";
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
        <CoursesCarousel />
        <PlaylistsCarousel />
        <BookingSection />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
}
