import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import USATrustBar from "@/components/USATrustBar";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";
import { Loader2 } from "lucide-react";

const TrustBar = lazy(() => import("@/components/TrustBar"));
const WhyLeadersFailSection = lazy(() => import("@/components/WhyLeadersFailSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const MethodologySection = lazy(() => import("@/components/MethodologySection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const SuccessStoriesSection = lazy(() => import("@/components/SuccessStoriesSection"));
const ReviewsCarousel = lazy(() => import("@/components/ReviewsCarousel"));
const CoursesCarousel = lazy(() => import("@/components/CoursesCarousel"));
const PlaylistsCarousel = lazy(() => import("@/components/PlaylistsCarousel"));
const WebinarSection = lazy(() => import("@/components/WebinarSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const BookingSection = lazy(() => import("@/components/BookingSection"));
const ArticlesSection = lazy(() => import("@/components/ArticlesSection"));
const RecentlyBookedPopup = lazy(() => import("@/components/RecentlyBookedPopup"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));
const PWAInstallPrompt = lazy(() => import("@/components/PWAInstallPrompt"));
const ExecutiveCaseStudies = lazy(() => import("@/components/ExecutiveCaseStudies"));
const FullServicesSection = lazy(() => import("@/components/FullServicesSection"));
const CompanySection = lazy(() => import("@/components/CompanySection"));
const FreeResourcesHighlight = lazy(() => import("@/components/FreeResourcesHighlight"));
const SeasonalOffersSection = lazy(() => import("@/components/SeasonalOffersSection"));
const WhatsAppCommunitySection = lazy(() => import("@/components/WhatsAppCommunitySection"));
const InlineShortsCarousel = lazy(() => import("@/components/InlineShortsCarousel"));
const EmailCapturePopup = lazy(() => import("@/components/EmailCapturePopup"));
const AvailabilityBanner = lazy(() => import("@/components/AvailabilityBanner"));
const BlogSection = lazy(() => import("@/components/BlogSection"));

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
      <AnnouncementBar />
      <Navigation />
      <main>
        <HeroSection />
        <USATrustBar />
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" duration={0.7}>
            <ExecutiveCaseStudies />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" duration={0.8}>
            <WhyLeadersFailSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" delay={0.1} duration={0.6}>
            <TrustBar />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" duration={0.7}>
            <SuccessStoriesSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" duration={0.6}>
            <AvailabilityBanner slotsLeft={3} />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" delay={0.1}>
            <ReviewsCarousel />
          </ScrollReveal>
        </Suspense>
        
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" duration={0.8}>
            <MethodologySection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" delay={0.1}>
            <FreeResourcesHighlight />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" delay={0.1}>
            <ServicesSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" duration={0.7}>
            <FullServicesSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" duration={0.7}>
            <SeasonalOffersSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" duration={0.7}>
            <PricingSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" delay={0.1}>
            <BookingSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up">
            <WebinarSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" delay={0.1}>
            <ArticlesSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale">
            <CoursesCarousel />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" delay={0.1}>
            <PlaylistsCarousel />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" delay={0.1}>
            <InlineShortsCarousel />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" duration={0.7}>
            <BlogSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" delay={0.1}>
            <WhatsAppCommunitySection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade">
            <AboutSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" delay={0.1}>
            <CompanySection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up">
            <FAQSection />
          </ScrollReveal>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppWidget />
      <StickyMobileCTA />
      <ScrollToTop />
      <Suspense fallback={null}>
        <RecentlyBookedPopup />
      </Suspense>
      <Suspense fallback={null}>
        <ExitIntentPopup />
      </Suspense>
      <Suspense fallback={null}>
        <PWAInstallPrompt />
      </Suspense>
      <Suspense fallback={null}>
        <EmailCapturePopup />
      </Suspense>
    </div>
  );
}
