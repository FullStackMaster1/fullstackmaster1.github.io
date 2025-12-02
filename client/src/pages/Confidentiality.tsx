import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Lock, 
  FileCheck, 
  UserX, 
  Building2, 
  Trash2,
  Calendar,
  Download,
  CheckCircle,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import confidentialityData from "@/data/confidentiality.json";
import profileData from "@/data/profile.json";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const iconMap: Record<string, any> = {
  Shield,
  Lock,
  FileCheck,
  UserX,
  Building2,
  Trash2
};

export default function Confidentiality() {
  const { page, hero, commitments, ndaSection, processSection, electronicSignature, faq, trustBadges, finalCta } = confidentialityData;
  const { contact } = profileData;

  const ndaWhatsAppMessage = encodeURIComponent(
    "Hi Rupesh, I'm interested in your executive coaching services and would like to request an NDA before we proceed. Please send me the mutual NDA template. Thank you."
  );

  const ndaWhatsAppLink = `${contact.whatsappLink}?text=${ndaWhatsAppMessage}`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="confidentiality" />
      <Navigation />
      
      <main className="pt-20">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/20">
              <Shield className="w-3 h-3 mr-1" />
              {hero.badge}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-confidentiality-title">
              {hero.title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {hero.description}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {trustBadges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              My Confidentiality Commitments
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commitments.map((commitment, index) => {
                const IconComponent = iconMap[commitment.icon] || Shield;
                return (
                  <Card key={index} className="h-full" data-testid={`card-commitment-${index}`}>
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{commitment.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{commitment.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30" id="nda">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-4">
                <FileCheck className="w-3 h-3 mr-1" />
                Formal Protection
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{ndaSection.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{ndaSection.description}</p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">What the NDA Covers:</h3>
                <ul className="space-y-2">
                  {ndaSection.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild data-testid="button-request-nda">
                <a href={ndaWhatsAppLink} target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  Request NDA via WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-email-nda">
                <a href={`mailto:${contact.email}?subject=NDA%20Request%20for%20Executive%20Coaching&body=Hi%20Rupesh,%0A%0AI'm%20interested%20in%20your%20executive%20coaching%20services%20and%20would%20like%20to%20request%20an%20NDA%20before%20we%20proceed.%0A%0APlease%20send%20me%20the%20mutual%20NDA%20template.%0A%0AThank%20you.`}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Request via Email
                </a>
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-3">
              {ndaSection.cta.secondary.description}
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {processSection.title}
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSection.steps.map((step, index) => (
                <div key={index} className="text-center" data-testid={`step-${step.step}`}>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {index < processSection.steps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground mx-auto mt-4 hidden lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {electronicSignature.title}
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {electronicSignature.description}
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {electronicSignature.platforms.map((platform, index) => (
                <Card key={index} className={platform.preferred ? "border-primary" : ""}>
                  <CardContent className="p-4 text-center">
                    {platform.preferred && (
                      <Badge className="mb-2 text-xs">Preferred</Badge>
                    )}
                    <h3 className="font-semibold mb-1">{platform.name}</h3>
                    <p className="text-xs text-muted-foreground">{platform.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              {electronicSignature.note}
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faq.map((item, index) => (
                <Card key={index} data-testid={`faq-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{finalCta.title}</h2>
            <p className="text-muted-foreground mb-8">{finalCta.description}</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild data-testid="button-book-confidential">
                <a href={contact.bookingLink} target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-4 h-4 mr-2" />
                  {finalCta.buttonText}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-green-500 text-green-600" asChild data-testid="button-request-nda-final">
                <a href={ndaWhatsAppLink} target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  {finalCta.ndaButtonText}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
