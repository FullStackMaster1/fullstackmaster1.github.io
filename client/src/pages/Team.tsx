import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Award, Briefcase, GraduationCap, Star, ArrowRight, Mail } from "lucide-react";
import { SiLinkedin, SiWhatsapp } from "react-icons/si";
import { useLocation } from "wouter";
import profileData from "@/data/profile.json";

interface Coach {
  id: string;
  name: string;
  title: string;
  image?: string;
  experience: string;
  specialties: string[];
  companies: string[];
  bio: string;
  linkedin?: string;
  isLead?: boolean;
  available: boolean;
}

const coaches: Coach[] = [
  {
    id: "rupesh",
    name: "Rupesh Tiwari",
    title: "Lead Coach & Founder",
    experience: "18+ years",
    specialties: ["System Design", "Behavioral Interviews", "AWS Architecture", "Leadership Coaching"],
    companies: ["Amazon", "Microsoft"],
    bio: "AWS Senior Customer Solutions Manager with 18+ years of experience. Helped 200+ professionals land roles at FAANG companies.",
    linkedin: "https://www.linkedin.com/in/nicevision/",
    isLead: true,
    available: true
  }
];

const futureCoachBenefits = [
  "Work with motivated FAANG aspirants",
  "Flexible scheduling - coach on your own time",
  "Competitive compensation per session",
  "Be part of a growing coaching community",
  "Share your expertise and give back"
];

export default function Team() {
  const [, setLocation] = useLocation();
  const { contact } = profileData;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Our Coaching Team | FullStackMaster"
        description="Meet our expert coaching team. Experienced FAANG professionals helping you land your dream job."
      />
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-blue-500/10 text-blue-600 border-blue-500/20">
            <Users className="w-3 h-3 mr-1" />
            Our Team
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Expert Coaches, Real Results
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from professionals who've been there. Our coaches have collectively helped 
            hundreds of candidates land offers at top tech companies.
          </p>
        </div>

        <div className="grid gap-8 mb-16">
          {coaches.map((coach) => (
            <Card key={coach.id} className={coach.isLead ? "border-primary/30 bg-primary/5" : ""}>
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 text-center md:text-left">
                    <Avatar className="w-24 h-24 mx-auto md:mx-0 border-2 border-primary/20">
                      {coach.image ? (
                        <AvatarImage src={coach.image} alt={coach.name} />
                      ) : null}
                      <AvatarFallback className="text-2xl">
                        {coach.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {coach.isLead && (
                      <Badge className="mt-3 bg-amber-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Lead Coach
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{coach.name}</h3>
                      {coach.available ? (
                        <Badge variant="outline" className="text-green-600 border-green-500/30">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Fully Booked
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">{coach.title}</p>
                    
                    <p className="text-sm mb-4">{coach.bio}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Experience</p>
                          <p className="text-sm font-medium">{coach.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Past Companies</p>
                          <div className="flex flex-wrap gap-1">
                            {coach.companies.map((company) => (
                              <Badge key={company} variant="secondary" className="text-xs">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Specialties</p>
                      <div className="flex flex-wrap gap-2">
                        {coach.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {coach.available && (
                        <Button 
                          onClick={() => setLocation("/book")}
                          data-testid={`button-book-${coach.id}`}
                        >
                          Book Session
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                      {coach.linkedin && (
                        <Button variant="outline" asChild>
                          <a 
                            href={coach.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            data-testid={`link-linkedin-${coach.id}`}
                          >
                            <SiLinkedin className="w-4 h-4 mr-2" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-dashed border-2 bg-muted/30">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Become an Associate Coach</CardTitle>
            <CardDescription className="text-base max-w-xl mx-auto">
              Are you a FAANG professional passionate about helping others succeed? 
              Join our growing team of coaches and make an impact.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-2xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {futureCoachBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {benefit}
                </div>
              ))}
            </div>
            
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                We're looking for coaches with experience at FAANG/Big Tech companies 
                who can help with system design, behavioral interviews, or technical coding rounds.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a 
                    href={`${contact.whatsappLink}?text=${encodeURIComponent("Hi Rupesh, I'm interested in becoming an associate coach at FullStackMaster. I have experience at [Company] and would love to discuss this opportunity.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-apply-coach"
                  >
                    <SiWhatsapp className="w-4 h-4 mr-2" />
                    Apply via WhatsApp
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a 
                    href="mailto:fullstackmaster1@gmail.com?subject=Associate Coach Application"
                    data-testid="button-email-coach"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Application
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
