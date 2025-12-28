import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Gift, Star, FileText, ArrowRight, Sparkles } from "lucide-react";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";
import profileData from "@/data/profile.json";
import starStoriesData from "@/data/starStories.json";
import { trackEvent, trackWhatsApp } from "@/lib/analytics";
import { Helmet } from "react-helmet-async";

export default function StarStoriesDownload() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [, setLocation] = useLocation();
  const { contact, socialLinks } = profileData;
  const { title, highlights, socialProof, categories } = starStoriesData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      trackEvent('star_stories_lead_captured', 'conversion', email);
      setSubmitted(true);
    }
  };

  const whatsappMessage = `Hi Rupesh! I just downloaded the 100 STAR Stories PDF. My name is ${name} and my email is ${email}. I'm preparing for FAANG interviews and would love to discuss coaching!`;

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Download Complete | 100 STAR Stories for FAANG Interviews</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-green-200 dark:border-green-800 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-center text-white">
                <CheckCircle className="w-16 h-16 mx-auto mb-3" />
                <h1 className="text-2xl font-bold mb-1">Download Ready!</h1>
                <p className="opacity-90">Your PDF is ready to download</p>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Thank you, {name}! Click below to download your free STAR Stories guide.
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    asChild
                  >
                    <a
                      href="/star-stories-guide.pdf"
                      download="100-STAR-Stories-FAANG-Interviews.pdf"
                      onClick={() => trackEvent('star_stories_pdf_downloaded', 'conversion', email)}
                      data-testid="button-download-pdf"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download 100 STAR Stories PDF
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF opens in a new tab. Check your spam folder if you also want it emailed.
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-center mb-4">Ready to Fast-Track Your Prep?</h3>
                  <div className="grid gap-3">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                      asChild
                    >
                      <a
                        href={`${contact.whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsApp('star-stories-download')}
                        data-testid="button-download-whatsapp"
                      >
                        <SiWhatsapp className="w-5 h-5 mr-2" />
                        Book Free Strategy Call
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setLocation('/')}
                      data-testid="button-download-home"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Explore More Resources
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <SiLinkedin className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-sm">Follow for Daily Tips</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Join 10,000+ engineers getting weekly FAANG interview insights on LinkedIn.
                  </p>
                  <Button
                    variant="ghost"
                    className="px-0 text-blue-600"
                    asChild
                  >
                    <a
                      href={socialLinks.linkedIn.personal}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('linkedin_followed', 'social', 'star-stories')}
                    >
                      Follow Rupesh on LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Free Download | 100 STAR Stories for FAANG Interviews</title>
        <meta name="description" content="Get 100 real STAR story examples from successful FAANG interview candidates. Organized by Amazon Leadership Principles." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <Badge className="bg-amber-500 text-white mb-4">
                <Gift className="w-3 h-3 mr-1" />
                FREE Resource
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              <p className="text-muted-foreground mb-6">
                Get access to 100 real STAR story examples organized by Amazon Leadership Principles 
                and common behavioral themes.
              </p>

              <div className="flex items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">{socialProof.downloads}</span>
                  <span className="text-muted-foreground">downloads</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{socialProof.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="bg-card rounded-lg p-4 border">
                <p className="text-sm italic text-muted-foreground mb-2">
                  "{socialProof.testimonial}"
                </p>
                <p className="text-sm font-semibold">— {socialProof.author}</p>
              </div>
            </div>

            <Card className="border-2 border-amber-200 dark:border-amber-800 shadow-xl sticky top-8">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Get Your Free Copy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <Input
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      data-testid="input-download-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      data-testid="input-download-email"
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll also send you a backup copy via email
                    </p>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    data-testid="button-submit-download"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get My Free PDF
                  </Button>
                </form>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-center text-muted-foreground">
                    By downloading, you agree to receive occasional interview tips. 
                    Unsubscribe anytime.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">What's Inside</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.slice(0, 10).map((category, index) => (
                <Card key={index} className="text-center p-4">
                  <p className="font-semibold text-sm mb-1">{category.name}</p>
                  <p className="text-2xl font-bold text-amber-600">{category.count}</p>
                  <p className="text-xs text-muted-foreground">stories</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
