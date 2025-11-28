import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Video, BookOpen, Zap, Briefcase, ChevronRight, LucideIcon } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import logoImage from "@assets/fullstack_master_logo_1764259679495.jpeg";
import siteContent from "@/data/siteContent.json";
import profileData from "@/data/profile.json";
import { trackCTAClick } from "@/lib/analytics";

const quickActionIcons: Record<string, LucideIcon> = {
  Video,
  BookOpen,
  Zap,
  Briefcase,
};

interface NavLink {
  label: string;
  href: string;
  isPage: boolean;
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { navigation } = siteContent;
  const { contact } = profileData;
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
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick('nav_whatsapp', contact.whatsappLink)}
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
            <div className="flex flex-col pt-4">
              {/* Quick Actions */}
              {navigation.quickActions && (
                <div className="px-4 mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    {navigation.quickActions.title}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {navigation.quickActions.items.map((action: { label: string; icon: string; href: string; description: string }) => {
                      const IconComponent = quickActionIcons[action.icon] || Briefcase;
                      return (
                        <button
                          key={action.href}
                          onClick={() => handleNavClick(action.href)}
                          className="flex flex-col items-start p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                          data-testid={`quick-action-${action.icon.toLowerCase()}`}
                        >
                          <IconComponent className="w-5 h-5 text-primary mb-1" />
                          <span className="text-sm font-medium leading-tight">{action.label}</span>
                          <span className="text-[10px] text-muted-foreground">{action.description}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="border-t border-border pt-3">
                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Navigate
                </p>
                <div className="flex flex-col gap-0">
                  {navLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      className="justify-between h-10"
                      onClick={() => handleNavClick(link.href, link.isPage)}
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-2 mt-4 px-4 border-t border-border pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <a
                    href={contact.whatsappLink}
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
