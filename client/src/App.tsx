import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import StickyBanner from "@/components/StickyBanner";
import SEOStructuredData from "@/components/SEOStructuredData";
import CookieConsent from "@/components/CookieConsent";
import Home from "@/pages/Home";
import Resources from "@/pages/Resources";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Confidentiality from "@/pages/Confidentiality";
import NDADocument from "@/pages/NDADocument";
import Book from "@/pages/Book";
import NotFound from "@/pages/not-found";

function Router() {
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book" component={Book} />
      <Route path="/resources" component={Resources} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/confidentiality" component={Confidentiality} />
      <Route path="/nda-document" component={NDADocument} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      initGA();
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SEOStructuredData />
          <StickyBanner />
          <Toaster />
          <CookieConsent />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
