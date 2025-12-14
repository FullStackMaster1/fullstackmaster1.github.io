import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, CheckCircle, Mail, Trophy, Calendar, GraduationCap, Building2, LucideIcon, Crown, TrendingUp, Shield, Download, FileCheck } from "lucide-react";
import { SiWhatsapp, SiAmazon, SiGoogle, SiMeta, SiApple, SiNetflix, SiLinkedin } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import profileImage from "@assets/image_1764282508840.png";
import siteContent from "@/data/siteContent.json";
import profileData from "@/data/profile.json";
import { trackBookCall, trackWhatsApp, trackEmailClick, trackLinkedInClick } from "@/lib/analytics";
import AnimatedCounter from "@/components/AnimatedCounter";

const companyIcons: Record<string, typeof SiAmazon | typeof FaMicrosoft | typeof Building2> = {
  Amazon: SiAmazon,
  Google: SiGoogle,
  Meta: SiMeta,
  Apple: SiApple,
  Netflix: SiNetflix,
  microsoft: FaMicrosoft,
  google: SiGoogle,
  amazon: SiAmazon,
};

const badgeIcons: Record<string, typeof SiAmazon | LucideIcon> = {
  SiAmazon,
  Award,
  GraduationCap,
  Crown,
  TrendingUp,
  Trophy,
};

const proofIcons: Record<string, LucideIcon> = {
  Users,
  Trophy,
  Star,
  Calendar,
  Crown,
  TrendingUp,
};

interface HeroBadge {
  icon: string;
  text: string;
  variant: string;
}

interface ProofPoint {
  icon: string;
  value: string;
  label: string;
}

export default function HeroSection() {
  const { hero } = siteContent;
  const { personal, contact, socialLinks } = profileData;

  return (
    <section
      className="py-8 lg:py-12 gradient-hero relative overflow-hidden"
      data-testid="section-hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-start">
          <div className="order-2 lg:order-1">
            {hero.executiveTagline && (
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3" data-testid="text-executive-tagline">
                {hero.executiveTagline}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {(hero.badges as HeroBadge[]).map((badge, index) => {
                const IconComponent = badgeIcons[badge.icon];
                const isAmazon = badge.variant === "amazon";
                const isExecutive = badge.variant === "executive";
                const isSuccess = badge.variant === "success";
                return (
                  <Badge
                    key={index}
                    className={
                      isAmazon 
                        ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" 
                        : isExecutive
                        ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                        : isSuccess
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                        : ""
                    }
                    variant={isAmazon || isExecutive || isSuccess ? "default" : "secondary"}
                  >
                    {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
                    {badge.text}
                  </Badge>
                );
              })}
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              data-testid="text-hero-title"
            >
              {hero.titleLine1}{" "}
              <span className="text-primary">{hero.titleHighlight}</span>{" "}
              {hero.titleLine2}
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
              data-testid="text-hero-description"
            >
              {hero.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-gradient-to-r from-primary/5 via-purple-500/5 to-green-500/5 rounded-lg border border-primary/10">
              {(hero.proofPoints as ProofPoint[]).map((point) => {
                const IconComponent = proofIcons[point.icon] || Users;
                const match = point.value.trim().match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
                const prefix = match ? match[1].trim() : "";
                const numericStr = match ? match[2].replace(/,/g, '') : "0";
                const numericValue = parseFloat(numericStr);
                const suffix = match ? match[3].trim() : "";
                const decimals = numericStr.includes('.') ? (numericStr.split('.')[1]?.length || 0) : 0;
                return (
                  <div key={point.label} className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <IconComponent className="w-4 h-4 text-primary" />
                      <AnimatedCounter 
                        end={numericValue} 
                        prefix={prefix}
                        suffix={suffix} 
                        decimals={decimals}
                        className="text-2xl font-bold"
                        duration={2000}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{point.label}</p>
                  </div>
                );
              })}
            </div>

            {hero.passedInterviews && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-orange-500/10 rounded-lg border border-primary/10">
                <p className="text-xs text-muted-foreground mb-3 text-center font-medium uppercase tracking-wide">
                  {hero.passedInterviews.title}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {hero.passedInterviews.companies.map((company: { name: string; role: string; icon: string; status: string; highlight?: boolean }) => {
                    const IconComponent = companyIcons[company.icon];
                    return (
                      <div 
                        key={company.name}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                          company.highlight 
                            ? "bg-orange-500/20 border border-orange-500/30" 
                            : "bg-card/50"
                        }`}
                        data-testid={`passed-interview-${company.name.toLowerCase()}`}
                      >
                        {IconComponent && (
                          <IconComponent className={`w-5 h-5 ${
                            company.icon === 'microsoft' ? 'text-[#00a4ef]' :
                            company.icon === 'google' ? 'text-[#4285f4]' :
                            company.icon === 'amazon' ? 'text-orange-500' : 'text-primary'
                          }`} />
                        )}
                        <div>
                          <p className="text-sm font-semibold">{company.name}</p>
                          <p className="text-xs text-muted-foreground">{company.role}</p>
                        </div>
                        <Badge 
                          className={`text-xs ml-1 ${
                            company.highlight 
                              ? "bg-orange-500 text-white" 
                              : "bg-green-500/20 text-green-600 border-green-500/30"
                          }`}
                          variant={company.highlight ? "default" : "outline"}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {company.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2 italic">
                  {hero.passedInterviews.subtitle}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-8">
              {hero.coachingAreas.map((area) => (
                <Badge
                  key={area}
                  variant="outline"
                  className="text-xs"
                  data-testid={`badge-area-${area.toLowerCase().replace(/ /g, "-")}`}
                >
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  {area}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  trackBookCall('hero-primary');
                  window.location.href = '/book';
                }}
                data-testid="button-hero-primary"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {hero.buttons.primary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                asChild
              >
                <a
                  href={`${contact.whatsappLink}?text=${encodeURIComponent(contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsApp('hero')}
                  data-testid="button-hero-secondary"
                >
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  {hero.buttons.secondary}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-[#0077b5] text-[#0077b5] hover:bg-blue-50 dark:hover:bg-blue-950"
                asChild
              >
                <a
                  href={socialLinks.linkedIn.personal}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLinkedInClick('hero')}
                  data-testid="button-hero-linkedin"
                >
                  <SiLinkedin className="w-4 h-4 mr-2" />
                  Message on LinkedIn
                </a>
              </Button>
            </div>

            {hero.leadCapture && (
              <div className="mb-3 p-3 bg-card/50 rounded-lg border border-border/50">
                <p className="text-sm font-medium mb-1">{hero.leadCapture.title}</p>
                <p className="text-xs text-muted-foreground mb-2">{hero.leadCapture.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className={`w-full sm:w-auto ${hero.leadCapture.type === 'whatsapp' ? 'border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950' : ''}`}
                  asChild
                >
                  <a
                    href={hero.leadCapture.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-lead-capture"
                  >
                    {hero.leadCapture.type === 'whatsapp' ? (
                      <SiWhatsapp className="w-4 h-4 mr-2" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    {hero.leadCapture.buttonText}
                  </a>
                </Button>
              </div>
            )}

            {hero.confidentiality && (
              <div className="flex flex-wrap items-center gap-3 mb-3" data-testid="confidentiality-badge">
                <a 
                  href="/confidentiality"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="font-medium">{hero.confidentiality.badge}</span>
                  <span className="text-xs">- {hero.confidentiality.text}</span>
                </a>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <a href="/confidentiality#nda" data-testid="button-request-nda-hero">
                    <FileCheck className="w-3 h-3 mr-1" />
                    Request NDA
                  </a>
                </Button>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4 text-green-500" />
                WhatsApp
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4 text-primary" />
                {contact.email}
              </a>
              <a
                href={socialLinks.linkedIn.personal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="w-4 h-4 text-[#0077b5]" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            {/* Desktop: Photo + Highlights side by side, aligned at top */}
            <div className="hidden lg:flex lg:items-start lg:gap-4">
              {/* Photo Column */}
              <div className="flex-shrink-0">
                <div className="relative w-fit">
                  <div className="w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                    <img
                      src={profileImage}
                      alt={`${personal.name} - ${personal.title}`}
                      className="w-full h-full object-cover"
                      data-testid="img-profile"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-card rounded-lg p-3 shadow-lg border border-border">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-500 text-yellow-500"
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold">{hero.ratingBadge.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {hero.ratingBadge.text}
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlights Column - aligned at top with photo */}
              <div className="flex flex-col gap-2 w-64" data-testid="coach-highlights">
              {/* Experience Card */}
              <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-orange-500" />
                  <h3 className="font-semibold text-sm">Current Role</h3>
                </div>
                <p className="text-xs font-medium text-foreground mb-1">AWS Senior CSM</p>
                <p className="text-xs text-muted-foreground mb-3">Since 2021</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Helping senior engineers, architects, managers, directors, and VPs succeed at FAANG companies.
                </p>
              </div>

              {/* Credentials Card */}
              <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm">Credentials</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs bg-orange-500/10 border-orange-500/20">
                    <SiAmazon className="w-3 h-3 mr-1 text-orange-500" />
                    AWS Certified
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-blue-500/10 border-blue-500/20">
                    <SiGoogle className="w-3 h-3 mr-1 text-blue-500" />
                    GCP Certified
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ISB CTO Scholar
                  </Badge>
                </div>
              </div>

              {/* Coaching Stats Card */}
              <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold text-sm">Coaching Stats</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">100+ Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">32% Rebook</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-muted-foreground">92% Success</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-muted-foreground">5.0 Rating</span>
                  </div>
                </div>
              </div>

              {/* Services Preview Card */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm">Services</h3>
                </div>
                <div className="space-y-2.5 text-xs mb-4">
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground font-medium">Mock Interview</span>
                    <Badge variant="outline" className="text-xs">60 min</Badge>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground font-medium">Resume Review</span>
                    <Badge variant="outline" className="text-xs">45 min</Badge>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground font-medium">Career Strategy</span>
                    <Badge variant="outline" className="text-xs">60 min</Badge>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground font-medium">System Design</span>
                    <Badge variant="outline" className="text-xs">90 min</Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    trackBookCall('coach-highlights');
                    window.location.href = '/book';
                  }}
                  data-testid="button-coach-highlights-book"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </div>

              {/* Quick WhatsApp CTA */}
              <div className="bg-green-500/10 rounded-lg border border-green-500/20 p-4">
                <p className="text-sm font-medium mb-2">Have questions first?</p>
                <p className="text-xs text-muted-foreground mb-3">Message me directly - I respond personally.</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                  asChild
                >
                  <a
                    href={`${contact.whatsappLink}?text=${encodeURIComponent(contact.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsApp('coach-highlights')}
                    data-testid="button-coach-highlights-whatsapp"
                  >
                    <SiWhatsapp className="w-4 h-4 mr-2" />
                    WhatsApp Me
                  </a>
                </Button>
              </div>
            </div>
          </div>

            {/* Mobile Photo - shown only on smaller screens */}
            <div className="flex justify-center lg:hidden">
              <div className="relative w-fit">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <img
                    src={profileImage}
                    alt={`${personal.name} - ${personal.title}`}
                    className="w-full h-full object-cover"
                    data-testid="img-profile-mobile"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-card rounded-lg p-3 shadow-lg border border-border">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold">{hero.ratingBadge.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {hero.ratingBadge.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-4">
            {hero.companiesText}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {hero.targetCompanies.map((company) => {
              const IconComponent = companyIcons[company];
              if (!IconComponent) return null;
              return (
                <div
                  key={company}
                  className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                  data-testid={`company-${company.toLowerCase()}`}
                >
                  <IconComponent className="w-6 h-6" />
                  <span className="font-medium">{company}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
