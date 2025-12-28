import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, lazy, Suspense } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { useServiceWorker } from "./hooks/use-service-worker";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SEOStructuredData from "@/components/SEOStructuredData";
import PWAUpdateNotification from "@/components/PWAUpdateNotification";
import { Loader2 } from "lucide-react";

const Home = lazy(() => import("@/pages/Home"));
const Resources = lazy(() => import("@/pages/Resources"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const Confidentiality = lazy(() => import("@/pages/Confidentiality"));
const NDADocument = lazy(() => import("@/pages/NDADocument"));
const Book = lazy(() => import("@/pages/Book"));
const SystemDesignMastery = lazy(() => import("@/pages/SystemDesignMastery"));
const BehavioralMastery = lazy(() => import("@/pages/BehavioralMastery"));
const ExecutiveCommunication = lazy(() => import("@/pages/ExecutiveCommunication"));
const ResumeChecklist = lazy(() => import("@/pages/ResumeChecklist"));
const SolutionArchitectRoadmap = lazy(() => import("@/pages/SolutionArchitectRoadmap"));
const SoftSkillsGuide = lazy(() => import("@/pages/SoftSkillsGuide"));
const AWSLoopPrep = lazy(() => import("@/pages/AWSLoopPrep"));
const PhoneScreenPrep = lazy(() => import("@/pages/PhoneScreenPrep"));
const HiringManagerPrep = lazy(() => import("@/pages/HiringManagerPrep"));
const DataEngineerRoadmap = lazy(() => import("@/pages/DataEngineerRoadmap"));
const CohortProgram = lazy(() => import("@/pages/CohortProgram"));
const SuccessStories = lazy(() => import("@/pages/SuccessStories"));
const ReferralProgram = lazy(() => import("@/pages/ReferralProgram"));
const Team = lazy(() => import("@/pages/Team"));
const CommunityResources = lazy(() => import("@/pages/CommunityResources"));
const BrandingAdmin = lazy(() => import("@/pages/BrandingAdmin"));
const StarStoriesDownload = lazy(() => import("@/pages/StarStoriesDownload"));
const NotFound = lazy(() => import("@/pages/not-found"));

const CookieConsent = lazy(() => import("@/components/CookieConsent"));
const LeadMagnetPopup = lazy(() => import("@/components/LeadMagnetPopup"));
const StickyBookingBar = lazy(() => import("@/components/StickyBookingBar"));
const StarStoriesPopup = lazy(() => import("@/components/StarStoriesPopup"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

function Router() {
  useAnalytics();
  
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/book" component={Book} />
        <Route path="/resources" component={Resources} />
        <Route path="/system-design" component={SystemDesignMastery} />
        <Route path="/behavioral-interview" component={BehavioralMastery} />
        <Route path="/executive-communication" component={ExecutiveCommunication} />
        <Route path="/resume-checklist" component={ResumeChecklist} />
        <Route path="/solution-architect" component={SolutionArchitectRoadmap} />
        <Route path="/soft-skills" component={SoftSkillsGuide} />
        <Route path="/aws-loop" component={AWSLoopPrep} />
        <Route path="/phone-screen" component={PhoneScreenPrep} />
        <Route path="/hiring-manager-round" component={HiringManagerPrep} />
        <Route path="/data-engineer" component={DataEngineerRoadmap} />
        <Route path="/cohort" component={CohortProgram} />
        <Route path="/success-stories" component={SuccessStories} />
        <Route path="/referral" component={ReferralProgram} />
        <Route path="/team" component={Team} />
        <Route path="/community-resources" component={CommunityResources} />
        <Route path="/admin/branding" component={BrandingAdmin} />
        <Route path="/downloads/star-stories" component={StarStoriesDownload} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/confidentiality" component={Confidentiality} />
        <Route path="/nda-document" component={NDADocument} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const { registration } = useServiceWorker();

  useEffect(() => {
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      initGA();
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <SEOStructuredData />
            <Toaster />
            <Suspense fallback={null}>
              <CookieConsent />
              <LeadMagnetPopup />
              <StickyBookingBar />
              <StarStoriesPopup />
            </Suspense>
            <PWAUpdateNotification registration={registration} />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
