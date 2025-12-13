import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Video, BookOpen, Zap, Briefcase, ChevronRight, Calendar, Search, LucideIcon, Target, Users, Sparkles, ChevronDown } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import logoImage from "@assets/fullstack_master_logo_1764259679495.jpeg";
import siteContent from "@/data/siteContent.json";
import profileData from "@/data/profile.json";
import whatsappData from "@/data/whatsapp.json";
import { trackWhatsApp, trackBookCall, trackSectionView } from "@/lib/analytics";

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
  external?: boolean;
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { navigation } = siteContent;
  const { contact } = profileData;
  const navLinks = navigation.links as NavLink[];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 20);
      
      // PWA-style header hide/show behavior
      // Show header when scrolling up or at top, hide when scrolling down
      if (currentScrollY < 50) {
        // Always show at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide header (only after scrolling past 100px)
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show header
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [location, setLocation] = useLocation();

  const handleNavClick = (href: string, isPage?: boolean, external?: boolean) => {
    setIsOpen(false);
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
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
      } ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo and Search */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              data-testid="link-home"
            >
              <img
                src={logoImage}
                alt={navigation.brandName}
                className="h-10 w-auto rounded"
                data-testid="img-logo"
              />
              <span className="hidden sm:block font-bold text-lg">{navigation.brandName}</span>
            </button>
            
            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => {
                // Scroll to FAQ section for now as search destination
                const element = document.querySelector('#faq');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Search frequently asked questions"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                onClick={() => handleNavClick(link.href, link.isPage, link.external)}
                data-testid={`link-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </Button>
            ))}
            
            {/* Free Guides Dropdown with visual highlight */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative group"
                  data-testid="dropdown-free-guides"
                >
                  <Sparkles className="w-4 h-4 mr-1 text-amber-500" />
                  Free Guides
                  <Badge variant="secondary" className="ml-1.5 px-1.5 py-0 text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/20">
                    NEW
                  </Badge>
                  <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem
                  className="flex items-start gap-3 p-3 cursor-pointer"
                  onClick={() => handleNavClick('/system-design', true)}
                  data-testid="link-system-design-nav"
                >
                  <div className="p-2 rounded-md bg-blue-500/10">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">System Design Mastery</div>
                    <div className="text-xs text-muted-foreground">IFRAILST Framework Guide</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-start gap-3 p-3 cursor-pointer"
                  onClick={() => handleNavClick('/behavioral-interview', true)}
                  data-testid="link-behavioral-nav"
                >
                  <div className="p-2 rounded-md bg-green-500/10">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Behavioral Interview Guide</div>
                    <div className="text-xs text-muted-foreground">STAR Method & Amazon LPs</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Center CTA - Book Session button */}
          <div className="flex md:hidden items-center">
            <Button
              size="sm"
              onClick={() => {
                trackBookCall('mobile-nav-center');
                setLocation('/book');
              }}
              data-testid="button-mobile-book-center"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Book Session
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a
                href={`${contact.whatsappLink}?text=${encodeURIComponent(whatsappData.widget.defaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp('navigation')}
                data-testid="button-whatsapp-nav"
              >
                <SiWhatsapp className="w-4 h-4 mr-1 text-green-500" />
                {navigation.ctaButtons.whatsapp.text}
              </a>
            </Button>
            <Button
              size="sm"
              onClick={() => {
                trackBookCall('navigation');
                setLocation('/book');
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

              {/* Free Guides - Highlighted Section */}
              <div className="px-4 mb-4 border-t border-border pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                    Free Guides
                  </p>
                  <Badge variant="secondary" className="px-1.5 py-0 text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/20">
                    NEW
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleNavClick('/system-design', true)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 hover:bg-blue-500/10 transition-colors text-left"
                    data-testid="mobile-link-system-design"
                  >
                    <div className="p-2 rounded-md bg-blue-500/10">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium">System Design Mastery</span>
                      <span className="block text-[10px] text-muted-foreground">IFRAILST Framework Guide</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/behavioral-interview', true)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20 hover:bg-green-500/10 transition-colors text-left"
                    data-testid="mobile-link-behavioral"
                  >
                    <div className="p-2 rounded-md bg-green-500/10">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium">Behavioral Interview Guide</span>
                      <span className="block text-[10px] text-muted-foreground">STAR Method & Amazon LPs</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

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
                      onClick={() => handleNavClick(link.href, link.isPage, link.external)}
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
                  onClick={() => {
                    trackBookCall('mobile-nav');
                    setLocation('/book');
                  }}
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
