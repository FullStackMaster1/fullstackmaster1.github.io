import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Mail } from "lucide-react";
import { SiYoutube, SiLinkedin, SiUdemy, SiPluralsight, SiWhatsapp, SiGithub } from "react-icons/si";
import logoImage from "@assets/fullstack_master_logo_1764259679495.jpeg";
import profileData from "@/data/profile.json";
import footerData from "@/data/footer.json";

const socialIconComponents: Record<string, typeof SiWhatsapp> = {
  whatsapp: SiWhatsapp,
  youtube: SiYoutube,
  linkedin: SiLinkedin,
  github: SiGithub,
  udemy: SiUdemy,
  pluralsight: SiPluralsight,
};

const getSocialUrl = (name: string): string => {
  const socialLinks = profileData.socialLinks;
  switch (name) {
    case 'whatsapp': return socialLinks.whatsapp.url;
    case 'youtube': return socialLinks.youtube.channel;
    case 'linkedin': return socialLinks.linkedIn.company;
    case 'github': return socialLinks.github.url;
    case 'udemy': return socialLinks.udemy.url;
    case 'pluralsight': return socialLinks.pluralsight.url;
    default: return '#';
  }
};

export default function Footer() {
  const { personal, contact, brand, socialLinks, descriptions } = profileData;
  const { links, socialIcons, quickLinks, verification, copyright } = footerData;

  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="bg-card border-t border-card-border"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            <div className="space-y-2 text-sm">
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4 text-green-500" />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="w-4 h-4 text-primary" />
                {contact.email}
              </a>
            </div>
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
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex flex-wrap gap-2 mb-4">
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
            <Button variant="outline" size="sm" className="w-full" asChild>
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
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {copyright.showYear ? new Date().getFullYear() : ''} {copyright.text}</p>
          <div className="flex items-center gap-4">
            <a
              href={socialLinks.igotanoffer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
              data-testid="link-igotanoffer-footer"
            >
              {verification.text}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
