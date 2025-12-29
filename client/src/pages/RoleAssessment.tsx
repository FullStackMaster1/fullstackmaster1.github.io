import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import FloatingSocialShare from "@/components/FloatingSocialShare";
import Breadcrumb from "@/components/Breadcrumb";
import RoleAssessmentQuiz from "@/components/RoleAssessmentQuiz";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  CheckCircle, 
  Users, 
  TrendingUp,
  Clock,
  Target
} from "lucide-react";

export default function RoleAssessment() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Find Your Path to Director/VP | Free Role Assessment Quiz | Rupesh Tiwari</title>
        <meta name="description" content="Take our free 7-question assessment to get your personalized roadmap to Director, VP, Senior PM, or Senior TPM roles. Get instant results and a customized action plan." />
        <meta name="keywords" content="director roadmap, VP roadmap, senior PM roadmap, senior TPM roadmap, career assessment, role assessment quiz, director interview prep, VP interview prep" />
        <link rel="canonical" href="https://www.fullstackmaster.net/role-assessment" />
        <meta property="og:title" content="Find Your Path to Director/VP | Free Assessment" />
        <meta property="og:description" content="Get your personalized roadmap to Director, VP, or Senior PM roles in 2 minutes." />
        <meta property="og:url" content="https://www.fullstackmaster.net/role-assessment" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="author" content="Rupesh Tiwari" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
          <div className="container mx-auto px-4">
            <Breadcrumb 
              items={[
                { label: "Home", href: "/" },
                { label: "Role Assessment", href: "/role-assessment" }
              ]}
            />
            
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
                <Sparkles className="w-4 h-4 mr-2" />
                Free Assessment
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Find Your Path to
                <br />
                <span className="text-primary">Director, VP & Senior Roles</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Answer 7 quick questions and get your personalized roadmap with timeline, skills needed, and next steps. Used by 500+ professionals.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2 min</div>
                  <div className="text-sm text-muted-foreground">To complete</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Professionals used this</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Free & personalized</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Target className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Personalized Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get a customized plan based on your current role, target role, and timeline.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Clear Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Know exactly how long it takes and what steps to take to reach your target role.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Salary Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    See salary ranges for your target role and understand the compensation potential.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <RoleAssessmentQuiz />
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h3 className="text-2xl font-bold mb-6">Trusted by Senior Leaders</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Directors & VPs Coached</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">$285K</div>
                <div className="text-sm text-muted-foreground">Avg Salary Increase</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppWidget />
      <FloatingSocialShare title="Role Assessment Quiz" />
    </div>
  );
}

