import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import logoImage from "@assets/fullstack_master_logo_1764259679495.jpeg";
import siteContent from "@/data/siteContent.json";
import { trackCTAClick } from "@/lib/analytics";

interface NavLink {
  label: string;
  href: string;
  isPage: boolean;
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { navigation } = siteContent;
  const navLinks = navigation.links as NavLink[];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [location, setLocation] = useLocation();

  const handleNavClick = (href: string, isPage?: boolean) => {
    setIsOpen(false);
    if (isPage) {
      setLocation(href);
    } else {
      if (location !== "/") {
        setLocation("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-background"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            className="flex items-center gap-2"
            data-testid="link-home"
          >
            <img
              src={logoImage}
              alt={navigation.brandName}
              className="h-10 w-auto rounded"
              data-testid="img-logo"
            />
            <span className="hidden sm:block font-bold text-lg">{navigation.brandName}</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                onClick={() => handleNavClick(link.href, link.isPage)}
                data-testid={`link-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </Button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a
                href={navigation.ctaButtons.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick('nav_whatsapp', navigation.ctaButtons.whatsapp.link)}
                data-testid="button-whatsapp-nav"
              >
                <SiWhatsapp className="w-4 h-4 mr-1 text-green-500" />
                {navigation.ctaButtons.whatsapp.text}
              </a>
            </Button>
            <Button
              size="sm"
              onClick={() => {
                trackCTAClick('nav_book_session', navigation.ctaButtons.book.scrollTo);
                handleNavClick(navigation.ctaButtons.book.scrollTo);
              }}
              data-testid="button-book-now"
            >
              {navigation.ctaButtons.book.text}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-4 bg-background/95 backdrop-blur-sm border-t border-border">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavClick(link.href, link.isPage)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Button>
              ))}
              <div className="flex gap-2 mt-4 px-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <a
                    href={navigation.ctaButtons.whatsapp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-mobile-whatsapp"
                  >
                    <SiWhatsapp className="w-4 h-4 mr-1 text-green-500" />
                    {navigation.ctaButtons.whatsapp.text}
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleNavClick(navigation.ctaButtons.book.scrollTo)}
                  data-testid="button-mobile-book"
                >
                  {navigation.ctaButtons.mobileBook.text}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
