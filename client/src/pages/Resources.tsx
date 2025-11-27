import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import CoursesCarousel from "@/components/CoursesCarousel";
import PlaylistsCarousel from "@/components/PlaylistsCarousel";
import ArticlesSection from "@/components/ArticlesSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navigation />
      <main>
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="w-3 h-3 mr-1" />
              Free Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learn & <span className="text-primary">Grow</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Free courses, YouTube content, articles, and open-source projects to accelerate your career growth.
            </p>
          </div>
        </section>
        <CoursesCarousel />
        <PlaylistsCarousel />
        <ArticlesSection />
        <OpenSourceSection />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
