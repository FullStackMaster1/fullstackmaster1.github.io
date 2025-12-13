import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="hidden md:flex fixed bottom-24 right-4 z-40 flex-col items-center justify-center gap-1 bg-muted/90 hover:bg-muted backdrop-blur-sm rounded-full p-3 shadow-lg border border-border transition-all duration-300 hover:scale-105"
      aria-label="Scroll to top"
      data-testid="button-scroll-to-top"
    >
      <ChevronUp className="w-5 h-5 text-foreground" />
    </button>
  );
}
