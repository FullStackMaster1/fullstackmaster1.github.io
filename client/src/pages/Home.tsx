import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import USATrustBar from "@/components/USATrustBar";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";
import { Loader2 } from "lucide-react";

const ClientLogosBar = lazy(() => import("@/components/ClientLogosBar"));
const FeaturedOnStrip = lazy(() => import("@/components/FeaturedOnStrip"));
const ExecutiveCaseStudies = lazy(() => import("@/components/ExecutiveCaseStudies"));
const SuccessStoriesSection = lazy(() => import("@/components/SuccessStoriesSection"));
const ReviewsCarousel = lazy(() => import("@/components/ReviewsCarousel"));
const WhyLeadersFailSection = lazy(() => import("@/components/WhyLeadersFailSection"));
const MethodologySection = lazy(() => import("@/components/MethodologySection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const BookingSection = lazy(() => import("@/components/BookingSection"));
const AvailabilityBanner = lazy(() => import("@/components/AvailabilityBanner"));
const SeasonalOffersSection = lazy(() => import("@/components/SeasonalOffersSection"));
const SalaryCalculator = lazy(() => import("@/components/SalaryCalculator"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const WebinarSection = lazy(() => import("@/components/WebinarSection"));
const FreeResourcesHighlight = lazy(() => import("@/components/FreeResourcesHighlight"));
const CoursesCarousel = lazy(() => import("@/components/CoursesCarousel"));
const PlaylistsCarousel = lazy(() => import("@/components/PlaylistsCarousel"));
const InlineShortsCarousel = lazy(() => import("@/components/InlineShortsCarousel"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const LinkedInNewsletterSection = lazy(() => import("@/components/LinkedInNewsletterSection"));
const WhatsAppCommunitySection = lazy(() => import("@/components/WhatsAppCommunitySection"));
const ReferralProgramSection = lazy(() => import("@/components/ReferralProgramSection"));
const RecentlyBookedPopup = lazy(() => import("@/components/RecentlyBookedPopup"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));
const PWAInstallPrompt = lazy(() => import("@/components/PWAInstallPrompt"));
const EmailCapturePopup = lazy(() => import("@/components/EmailCapturePopup"));

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
        {/* HERO & TRUST - First Impressions */}
        <HeroSection />
        <USATrustBar />
        
        <Suspense fallback={<SectionLoader />}>
          <ClientLogosBar />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FeaturedOnStrip />
        </Suspense>
        
        {/* SOCIAL PROOF & RESULTS - Build Credibility Fast */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" duration={0.7}>
            <ExecutiveCaseStudies />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" duration={0.7}>
            <SuccessStoriesSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" delay={0.1}>
            <ReviewsCarousel />
          </ScrollReveal>
        </Suspense>
        
        {/* PROBLEM & SOLUTION - Create Urgency */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" duration={0.8}>
            <WhyLeadersFailSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up" duration={0.8}>
            <MethodologySection />
          </ScrollReveal>
        </Suspense>
        
        {/* SERVICES & PRICING - Drive Conversions */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" delay={0.1}>
            <ServicesSection />
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
        
        {/* URGENCY & OFFERS */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" duration={0.6}>
            <AvailabilityBanner slotsLeft={3} />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" duration={0.7}>
            <SeasonalOffersSection />
          </ScrollReveal>
        </Suspense>
        
        {/* INTERACTIVE & ENGAGEMENT */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" duration={0.6}>
            <SalaryCalculator />
          </ScrollReveal>
        </Suspense>
        
        {/* FAQ - Handle Objections */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up">
            <FAQSection />
          </ScrollReveal>
        </Suspense>
        
        {/* FREE CONTENT & RESOURCES - Value Add */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="slide-up">
            <WebinarSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="scale" delay={0.1}>
            <FreeResourcesHighlight />
          </ScrollReveal>
        </Suspense>
        
        {/* VIDEO CONTENT - Grouped Together */}
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
        
        {/* BLOG & CONTENT */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" duration={0.7}>
            <BlogSection />
          </ScrollReveal>
        </Suspense>
        
        {/* ABOUT & COMMUNITY - Lower Priority */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade">
            <AboutSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" duration={0.6}>
            <LinkedInNewsletterSection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" delay={0.1}>
            <WhatsAppCommunitySection />
          </ScrollReveal>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal type="fade" duration={0.7}>
            <ReferralProgramSection />
          </ScrollReveal>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppWidget />
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
