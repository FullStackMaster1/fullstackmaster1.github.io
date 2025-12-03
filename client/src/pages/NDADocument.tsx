import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Printer,
  ArrowLeft,
  FileText,
  Calendar
} from "lucide-react";
import ndaTemplate from "@/data/ndaTemplate.json";
import profileData from "@/data/profile.json";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function NDADocument() {
  const { document, parties, sections, signatures } = ndaTemplate;
  const { contact, personal } = profileData;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        page="nda"
        customTitle="Mutual NDA - Executive Coaching | Rupesh Tiwari"
        customDescription="Mutual Non-Disclosure Agreement for Executive Interview Coaching Services by Rupesh Tiwari"
      />
      
      <div className="print:hidden bg-muted/30 border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/confidentiality">
            <Button variant="ghost" size="sm" data-testid="button-back-confidentiality">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Confidentiality
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              <FileText className="w-3 h-3 mr-1" />
              Internal Document
            </Badge>
            <Button onClick={handlePrint} size="sm" data-testid="button-print-nda">
              <Printer className="w-4 h-4 mr-2" />
              Print / Save PDF
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 print:py-0 print:px-0">
        <Card className="print:shadow-none print:border-0">
          <CardContent className="p-8 md:p-12 print:p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4 print:hidden">
                <Shield className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2" data-testid="text-nda-title">
                {document.title}
              </h1>
              <p className="text-muted-foreground">{document.subtitle}</p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Effective Date: <span className="font-medium text-foreground">{currentDate}</span></span>
              </div>
            </div>

            <Separator className="my-8" />

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Parties to this Agreement</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{parties.coach.role}</p>
                  <p className="font-semibold">{parties.coach.name}</p>
                  <p className="text-sm text-muted-foreground">{parties.coach.business}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Email: {contact.email}
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{parties.client.role}</p>
                  <p className="font-semibold text-muted-foreground italic">{parties.client.placeholder}</p>
                  <p className="text-sm text-muted-foreground">[Company Name]</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Email: [Client Email]
                  </p>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            <section className="space-y-6">
              {sections.map((section) => (
                <div key={section.number} className="print:break-inside-avoid">
                  <h3 className="font-semibold mb-2">
                    {section.number}. {section.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-6">Acknowledgment and Signatures</h2>
              <p className="text-muted-foreground mb-8">
                By signing below, both parties acknowledge that they have read, understood, and agree to be bound by the terms and conditions of this Mutual Non-Disclosure Agreement.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">{signatures.coach.label}</h4>
                  <div className="border-b-2 border-dashed border-muted-foreground/30 h-12"></div>
                  <div className="space-y-1">
                    <p className="font-semibold">{signatures.coach.name}</p>
                    <p className="text-sm text-muted-foreground">{signatures.coach.title}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="border-b border-muted-foreground/30 flex-1"></span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">{signatures.client.label}</h4>
                  <div className="border-b-2 border-dashed border-muted-foreground/30 h-12"></div>
                  <div className="space-y-1">
                    <p className="font-semibold text-muted-foreground italic">{signatures.client.name}</p>
                    <p className="text-sm text-muted-foreground italic">{signatures.client.title}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="border-b border-muted-foreground/30 flex-1"></span>
                  </div>
                </div>
              </div>
            </section>

            <div className="print:hidden mt-12 p-6 bg-muted/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>How to use this document:</strong> Print this page or save as PDF, fill in the client details, sign, and send to your client for their signature.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button onClick={handlePrint} data-testid="button-print-nda-bottom">
                  <Printer className="w-4 h-4 mr-2" />
                  Print / Save as PDF
                </Button>
                <Button variant="outline" asChild>
                  <a 
                    href={`mailto:?subject=Mutual%20NDA%20for%20Executive%20Coaching&body=Please%20find%20attached%20the%20Mutual%20Non-Disclosure%20Agreement%20for%20our%20coaching%20engagement.%0A%0ABest%20regards,%0A${personal.name}`}
                    data-testid="button-email-nda-template"
                  >
                    Compose Email
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground print:mt-4 print:pt-4">
              <p>FullStack Master Executive Coaching Services</p>
              <p>{contact.email} | fullstackmaster.net</p>
              <p className="mt-2">This agreement is legally binding upon signature by both parties.</p>
            </div>
          </CardContent>
        </Card>
      </main>

      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-0 {
            border: none !important;
          }
          .print\\:py-0 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .print\\:px-0 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .print\\:p-8 {
            padding: 2rem !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          .print\\:mt-4 {
            margin-top: 1rem !important;
          }
          .print\\:pt-4 {
            padding-top: 1rem !important;
          }
        }
      `}</style>
      <WhatsAppWidget />
    </div>
  );
}
