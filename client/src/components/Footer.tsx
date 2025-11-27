import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { SiYoutube, SiLinkedin, SiUdemy, SiPluralsight, SiWhatsapp, SiGithub } from "react-icons/si";
import logoImage from "@assets/fullstack_master_logo_1764259679495.jpeg";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
  { label: "Courses", href: "#courses" },
  { label: "Articles", href: "#articles" },
  { label: "Book Session", href: "#booking" },
];

const socialIcons = [
  {
    icon: SiWhatsapp,
    url: "https://wa.me/16094424081",
    label: "WhatsApp",
    color: "text-green-500",
  },
  {
    icon: SiYoutube,
    url: "https://www.youtube.com/@FullStackMaster",
    label: "YouTube",
    color: "text-red-500",
  },
  {
    icon: SiLinkedin,
    url: "https://www.linkedin.com/company/fullstack-master",
    label: "LinkedIn",
    color: "text-blue-600",
  },
  {
    icon: SiGithub,
    url: "https://github.com/FullStackMaster1",
    label: "GitHub",
    color: "",
  },
  {
    icon: SiUdemy,
    url: "https://www.udemy.com/user/rupesh-k-tiwari/",
    label: "Udemy",
    color: "text-purple-600",
  },
  {
    icon: SiPluralsight,
    url: "https://www.pluralsight.com/authors/rupesh-tiwari",
    label: "Pluralsight",
    color: "text-pink-600",
  },
];

export default function Footer() {
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
                alt="FullStack Master"
                className="h-12 w-auto rounded"
                data-testid="img-footer-logo"
              />
              <div>
                <h3 className="font-bold text-lg">FullStack Master</h3>
                <p className="text-xs text-muted-foreground">by Rupesh Tiwari</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Senior Customer Solutions Manager at AWS with 20+ years of experience. 
              Helping engineers, architects, and leaders ace FAANG interviews with 
              structured, rubric-based coaching.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="https://wa.me/16094424081"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4 text-green-500" />
                +1-609-442-4081
              </a>
              <a
                href="mailto:rupesh@fullstackmaster.net"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="w-4 h-4 text-primary" />
                rupesh@fullstackmaster.net
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
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
              {socialIcons.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    data-testid={`link-footer-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className={`w-4 h-4 ${social.color}`} />
                  </a>
                </Button>
              ))}
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
          <p>&copy; {new Date().getFullYear()} FullStack Master by Rupesh Tiwari. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://igotanoffer.com/en/coach/rupesh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
              data-testid="link-igotanoffer-footer"
            >
              Verified on IGotAnOffer
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
