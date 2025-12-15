import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Gift, Users, Copy, CheckCircle, TrendingUp, DollarSign, Share2, ArrowRight, Sparkles } from "lucide-react";
import { SiWhatsapp, SiLinkedin, SiX } from "react-icons/si";
import profileData from "@/data/profile.json";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email")
});

type FormData = z.infer<typeof formSchema>;

interface ReferralData {
  id: string;
  referrerName: string;
  referrerEmail: string;
  referralCode: string;
  referralCount: string;
  createdAt: string;
}

interface ReferralStats {
  total: number;
  pending: number;
  enrolled: number;
}

export default function ReferralProgram() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { contact } = profileData;

  useEffect(() => {
    const savedCode = localStorage.getItem("referralCode");
    if (savedCode) {
      setReferralCode(savedCode);
    }
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" }
  });

  const createReferral = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/referral/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email })
      });
      return response.json();
    },
    onSuccess: (data) => {
      setReferralCode(data.referral.referralCode);
      localStorage.setItem("referralCode", data.referral.referralCode);
      localStorage.setItem("referralEmail", data.referral.referrerEmail);
      toast({
        title: data.isNew ? "Referral Code Created!" : "Welcome Back!",
        description: data.message
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create referral code. Please try again.",
        variant: "destructive"
      });
    }
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/referral/stats", referralCode],
    enabled: !!referralCode,
    queryFn: async () => {
      const response = await fetch(`/api/referral/stats/${referralCode}`);
      if (!response.ok) return null;
      return response.json();
    }
  });

  const referralLink = referralCode 
    ? `${window.location.origin}?ref=${referralCode}` 
    : "";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Referral link copied to clipboard" });
  };

  const shareOnWhatsApp = () => {
    const message = `Join me for interview coaching with Rupesh Tiwari! Use my referral link: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(referralLink);
    const title = encodeURIComponent("Interview Coaching Referral");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`I'm preparing for FAANG interviews with @RupeshTiwari. Use my referral link to get started: ${referralLink}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const onSubmit = (data: FormData) => {
    createReferral.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Referral Program - Earn Rewards | FullStackMaster"
        description="Refer friends to interview coaching and earn rewards. Help others land their dream jobs at FAANG companies."
      />
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
            <Gift className="w-3 h-3 mr-1" />
            Referral Program
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Share the Success, Earn Rewards
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Know someone preparing for FAANG interviews? Refer them to get $50 off their first session, 
            and you'll earn $50 credit for each successful referral!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                <Share2 className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">1. Share Your Link</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get your unique referral code and share it with friends preparing for interviews
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">2. They Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                When they book their first session using your link, they get $50 off
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center mb-2">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
              <CardTitle className="text-lg">3. You Earn</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You get $50 credit towards your next session for each successful referral
              </p>
            </CardContent>
          </Card>
        </div>

        {!referralCode ? (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Get Your Referral Code
              </CardTitle>
              <CardDescription>
                Enter your details to generate your unique referral link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} data-testid="input-referral-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} data-testid="input-referral-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={createReferral.isPending}
                    data-testid="button-create-referral"
                  >
                    {createReferral.isPending ? "Creating..." : "Get My Referral Code"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Your Referral Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Your Referral Code</p>
                  <div className="flex gap-2">
                    <code className="flex-1 px-4 py-3 bg-muted rounded-lg font-mono text-lg" data-testid="text-referral-code">
                      {referralCode}
                    </code>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={copyToClipboard}
                      data-testid="button-copy-code"
                    >
                      {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Your Referral Link</p>
                  <div className="flex gap-2">
                    <Input 
                      value={referralLink} 
                      readOnly 
                      className="flex-1 font-mono text-sm"
                      data-testid="input-referral-link"
                    />
                    <Button 
                      variant="outline" 
                      onClick={copyToClipboard}
                      data-testid="button-copy-link"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">Share via</p>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-green-500/30 text-green-600 hover:bg-green-500/10"
                      onClick={shareOnWhatsApp}
                      data-testid="button-share-whatsapp"
                    >
                      <SiWhatsapp className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-blue-500/30 text-blue-600 hover:bg-blue-500/10"
                      onClick={shareOnLinkedIn}
                      data-testid="button-share-linkedin"
                    >
                      <SiLinkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={shareOnTwitter}
                      data-testid="button-share-twitter"
                    >
                      <SiX className="w-4 h-4 mr-2" />
                      X
                    </Button>
                  </div>
                </div>

                {stats && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Your Stats</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary" data-testid="text-total-referrals">
                          {stats.stats?.total || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">Total Referrals</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-amber-600" data-testid="text-pending-referrals">
                          {stats.stats?.pending || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">Pending</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600" data-testid="text-enrolled-referrals">
                          {stats.stats?.enrolled || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">Enrolled</div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                      Potential earnings: <strong className="text-green-600">${(stats.stats?.enrolled || 0) * 50}</strong>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => {
                  localStorage.removeItem("referralCode");
                  localStorage.removeItem("referralEmail");
                  setReferralCode(null);
                }}
                className="text-sm text-muted-foreground"
                data-testid="button-use-different-email"
              >
                Use a different email
              </Button>
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Reach out on WhatsApp for any questions about the referral program
          </p>
          <Button asChild>
            <a 
              href={`${contact.whatsappLink}?text=${encodeURIComponent("Hi Rupesh, I have a question about the referral program.")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-referral-whatsapp"
            >
              <SiWhatsapp className="w-4 h-4 mr-2" />
              Ask on WhatsApp
            </a>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
