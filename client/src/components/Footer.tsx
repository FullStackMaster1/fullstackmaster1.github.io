import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Mail, Shield, ArrowUp, Lock, FileCheck, CheckCircle, MapPin, Clock, Star, Phone, Globe } from "lucide-react";
import { SiYoutube, SiLinkedin, SiUdemy, SiPluralsight, SiWhatsapp, SiGithub, SiFacebook } from "react-icons/si";
import { Link } from "wouter";
import logoImage from "@assets/fullstack_master_logo_1764259679495.jpeg";
import profileData from "@/data/profile.json";
import whatsappData from "@/data/whatsapp.json";
import footerData from "@/data/footer.json";

const socialIconComponents: Record<string, any> = {
  personalWebsite: Globe,
  whatsapp: SiWhatsapp,
  youtube: SiYoutube,
  linkedin: SiLinkedin,
  github: SiGithub,
  udemy: SiUdemy,
  pluralsight: SiPluralsight,
  facebook: SiFacebook,
};

const getSocialUrl = (name: string): string => {
  const socialLinks = profileData.socialLinks;
  switch (name) {
    case 'personalWebsite': return socialLinks.personalWebsite.url;
    case 'whatsapp': return `${socialLinks.whatsapp.url}?text=${encodeURIComponent(whatsappData.widget.defaultMessage)}`;
    case 'youtube': return socialLinks.youtube.channel;
    case 'linkedin': return socialLinks.linkedIn.company;
    case 'github': return socialLinks.github.url;
    case 'udemy': return socialLinks.udemy.url;
    case 'pluralsight': return socialLinks.pluralsight.url;
    case 'facebook': return (socialLinks as any).facebook.url;
    default: return '#';
  }
};

export default function Footer() {
  const { personal, contact, brand, socialLinks, descriptions } = profileData;
  const { links, legalLinks, educationalLinks, socialIcons, quickLinks, contact: footerContact, verification, copyright } = footerData;

  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-card border-t border-card-border md:pb-0 pb-24"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoImage}
                alt={brand.logoAlt}
                className="h-12 w-auto rounded"
                data-testid="img-footer-logo"
              />
              <div>
                <h3 className="font-bold text-lg">{brand.name}</h3>
                <p className="text-xs text-muted-foreground">{personal.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              {descriptions.short}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{quickLinks.title}</h3>
            <ul className="space-y-2">
              {links.map((link: { label: string; href: string }) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleScrollTo(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            {educationalLinks && (
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="font-medium text-sm mb-2">Free Guides</h4>
                <ul className="space-y-2">
                  {educationalLinks.map((link: { label: string; href: string }) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/ /g, "-")}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-4">{footerContact.title}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <MapPin className="w-4 h-4 text-blue-500" />
                {(footerContact as any).location || "New Jersey, USA"}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-blue-400" />
                {(footerContact as any).timezone || "Eastern Time (EST)"}
              </div>
              <a
                href={`${contact.whatsappLink}?text=${encodeURIComponent(whatsappData.widget.defaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4 text-green-500" />
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${contact.email.split('@')[0]}@${contact.email.split('@')[1]}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-email"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `mailto:${contact.email}`;
                }}
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>{contact.email.split('@')[0]}<span className="select-none">@</span>{contact.email.split('@')[1]}</span>
              </a>
                            <p className="text-muted-foreground pt-2 text-xs">
                {footerContact.availabilityText}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow FullStack Master</h3>
            <div className="space-y-2 mb-4">
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a
                  href={socialLinks.linkedIn.company}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-footer-linkedin-company"
                >
                  <SiLinkedin className="w-4 h-4 mr-2 text-blue-600" />
                  Follow on LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a
                  href={(socialLinks as any).facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-footer-facebook-page"
                >
                  <SiFacebook className="w-4 h-4 mr-2 text-blue-500" />
                  Follow on Facebook
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a
                  href={socialLinks.youtube.channel}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-footer-youtube-channel"
                >
                  <SiYoutube className="w-4 h-4 mr-2 text-red-500" />
                  Subscribe on YouTube
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a
                  href="https://www.linkedin.com/newsletters/technical-blogs-6871207419859615744/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-footer-newsletter"
                >
                  <SiLinkedin className="w-4 h-4 mr-2 text-blue-600" />
                  Subscribe Newsletter
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {socialIcons.map((social: { name: string; label: string; color: string }) => {
                const IconComponent = socialIconComponents[social.name];
                const url = getSocialUrl(social.name);
                return (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      data-testid={`link-footer-social-${social.label.toLowerCase()}`}
                    >
                      {IconComponent && <IconComponent className={`w-4 h-4 ${social.color}`} />}
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trust & Compliance Badges */}
        <div className="border border-green-500/20 bg-green-500/5 rounded-lg p-4 mt-8" data-testid="trust-badges-section">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="outline" className="bg-background border-green-500/30 text-green-700 dark:text-green-400 px-3 py-1.5">
              <Lock className="w-3 h-3 mr-1.5" />
              SSL Secure
            </Badge>
            <Badge variant="outline" className="bg-background border-green-500/30 text-green-700 dark:text-green-400 px-3 py-1.5">
              <Shield className="w-3 h-3 mr-1.5" />
              256-bit Encryption
            </Badge>
            <Badge variant="outline" className="bg-background border-green-500/30 text-green-700 dark:text-green-400 px-3 py-1.5">
              <FileCheck className="w-3 h-3 mr-1.5" />
              NDA Available
            </Badge>
            <Badge variant="outline" className="bg-background border-green-500/30 text-green-700 dark:text-green-400 px-3 py-1.5">
              <CheckCircle className="w-3 h-3 mr-1.5" />
              GDPR Compliant
            </Badge>
            <Badge variant="outline" className="bg-background border-green-500/30 text-green-700 dark:text-green-400 px-3 py-1.5">
              <CheckCircle className="w-3 h-3 mr-1.5" />
              CCPA Compliant
            </Badge>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-3">
            Your data is protected. We take privacy seriously.
          </p>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {copyright.showYear ? new Date().getFullYear() : ''} {copyright.text}</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {legalLinks?.map((link: { label: string; href: string }) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors flex items-center gap-1"
                data-testid={`link-footer-${link.label.toLowerCase().replace(/ /g, "-")}`}
              >
                <Shield className="w-3 h-3" />
                {link.label}
              </Link>
            ))}
            <a
              href={socialLinks.igotanoffer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
              data-testid="link-igotanoffer-footer"
            >
              <Star className="w-3 h-3 text-yellow-500" />
              {verification.text} ({(verification as any).reviewCount})
              <ExternalLink className="w-3 h-3" />
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleScrollToTop}
              className="ml-4 flex items-center gap-1"
              data-testid="button-footer-scroll-to-top"
            >
              <ArrowUp className="w-3 h-3" />
              <span className="hidden sm:inline">Back to Top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
