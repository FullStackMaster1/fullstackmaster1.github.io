import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { SiYoutube, SiLinkedin, SiUdemy, SiPluralsight } from "react-icons/si";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Courses", href: "#courses" },
  { label: "YouTube", href: "#youtube" },
  { label: "Book Session", href: "#booking" },
];

const socialIcons = [
  {
    icon: SiYoutube,
    url: "https://www.youtube.com/@FullStackMaster",
    label: "YouTube",
  },
  {
    icon: SiLinkedin,
    url: "https://www.linkedin.com/company/fullstack-master",
    label: "LinkedIn",
  },
  {
    icon: SiUdemy,
    url: "https://www.udemy.com/user/rupesh-k-tiwari/",
    label: "Udemy",
  },
  {
    icon: SiPluralsight,
    url: "https://www.pluralsight.com/authors/rupesh-tiwari",
    label: "Pluralsight",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Rupesh Tiwari</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Senior Customer Solutions Manager at AWS. Helping engineers and
              leaders ace their interviews and accelerate their careers.
            </p>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://www.igotanoffer.com/en/coaching/rupesh-tiwari"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-igotanoffer"
              >
                View on IGotAnOffer
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            </Button>
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
            <div className="flex gap-2">
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
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rupesh Tiwari. All rights reserved.</p>
          <p>
            Coaching powered by{" "}
            <a
              href="https://www.igotanoffer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
              data-testid="link-igotanoffer-credit"
            >
              IGotAnOffer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
