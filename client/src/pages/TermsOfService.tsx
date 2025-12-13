import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileText, Mail, Phone, CheckCircle, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import termsData from "@/data/termsOfService.json";
import profileData from "@/data/profile.json";
import WhatsAppWidget from "@/components/WhatsAppWidget";

interface SubSection {
  subtitle: string;
  items: string[];
}

interface Section {
  id: string;
  title: string;
  content?: string[];
  items?: string[];
  subsections?: SubSection[];
  contactInfo?: {
    company: string;
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
  };
}

export default function TermsOfService() {
  const { lastUpdated, companyName, sections } = termsData;
  const { brand } = profileData;

  return (
    <>
      <Helmet>
        <title>Terms of Service | {brand.name}</title>
        <meta name="description" content={`Terms of Service for ${brand.name} professional interview coaching services. Review our booking policies, cancellation terms, and service guidelines.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://fullstackmaster.net/terms-of-service" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-terms-title">
                  Terms of Service
                </h1>
                <p className="text-sm text-muted-foreground">
                  Last Updated: {lastUpdated}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary">
                Professional Coaching Services
              </Badge>
              <Badge variant="outline">
                New Jersey, USA
              </Badge>
            </div>
          </div>

          <div className="space-y-8">
            {(sections as Section[]).map((section) => (
              <Card key={section.id} id={section.id}>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{section.title}</h2>

                  {section.content && (
                    <div className="space-y-3 text-muted-foreground">
                      {section.content.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {section.items && (
                    <ul className="space-y-2 mt-4">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subsections && (
                    <div className="space-y-6 mt-4">
                      {section.subsections.map((sub, idx) => (
                        <div key={idx}>
                          <h3 className="font-medium mb-3">{sub.subtitle}</h3>
                          <ul className="space-y-2">
                            {sub.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.contactInfo && (
                    <div className="mt-4 space-y-4">
                      <div className="grid gap-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <span>{section.contactInfo.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-primary" />
                          <a 
                            href={`mailto:${section.contactInfo.email}`}
                            className="text-primary hover:underline"
                            data-testid="link-terms-email"
                          >
                            {section.contactInfo.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-primary" />
                          <span>{section.contactInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <SiWhatsapp className="w-5 h-5 text-green-500" />
                          <a 
                            href={section.contactInfo.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline"
                            data-testid="link-terms-whatsapp"
                          >
                            WhatsApp: {section.contactInfo.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-8" />

          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
            <p className="mt-2">
              Questions? Contact us at{" "}
              <a href="mailto:rupesh@fullstackmaster.net" className="text-primary hover:underline">
                rupesh@fullstackmaster.net
              </a>
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              <Link href="/confidentiality" className="text-primary hover:underline">
                Confidentiality & NDA
              </Link>
            </div>
          </div>
        </div>
      </div>
      <WhatsAppWidget />
    </>
  );
}
