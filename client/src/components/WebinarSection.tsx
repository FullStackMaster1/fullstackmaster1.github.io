import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock, Users, Video, Bell, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { SiWhatsapp, SiYoutube } from "react-icons/si";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const upcomingWebinars = [
  {
    id: "system-design-leaders",
    title: "System Design for Senior Leaders",
    description: "Learn the frameworks and communication patterns that Staff+ engineers and Directors use in FAANG interviews.",
    date: "Coming Soon",
    time: "Free Webinar",
    spots: "Register Interest",
    topics: ["Scalability", "Trade-offs", "Communication"],
  },
  {
    id: "amazon-leadership-principles",
    title: "Mastering Amazon Leadership Principles",
    description: "Deep-dive into LPs with real examples. How to structure stories that resonate with bar-raisers.",
    date: "Coming Soon",
    time: "Free Webinar",
    spots: "Register Interest",
    topics: ["STAR Method", "Story Crafting", "Bar-raiser Tips"],
  },
  {
    id: "executive-communication",
    title: "Executive Communication Masterclass",
    description: "How to compress complex technical ideas into executive-ready narratives for VP and C-suite interviews.",
    date: "Coming Soon",
    time: "Free Webinar",
    spots: "Register Interest",
    topics: ["Exec Framing", "Stakeholder Influence", "Brevity"],
  },
];

interface RegistrationFormProps {
  webinar: typeof upcomingWebinars[0];
  onSuccess: () => void;
}

function RegistrationForm({ webinar, onSuccess }: RegistrationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const { toast } = useToast();

  const registerMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/webinar/register", {
        name,
        email,
        phone: phone || null,
        webinarId: webinar.id,
        webinarTitle: webinar.title,
        whatsappOptIn,
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Registration Successful!",
        description: data.message || "You will receive updates about this webinar.",
      });
      onSuccess();
    },
    onError: async (error: Error & { response?: Response }) => {
      let errorMessage = "Failed to register. Please try again.";
      if (error.response) {
        const data = await error.response.json();
        errorMessage = data.error || errorMessage;
      }
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast({
        title: "Please fill required fields",
        description: "Name and email are required.",
        variant: "destructive",
      });
      return;
    }
    registerMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          data-testid="input-registration-name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-testid="input-registration-email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone/WhatsApp (Optional)</Label>
        <Input
          id="phone"
          placeholder="+1 234 567 8900"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          data-testid="input-registration-phone"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="whatsapp-optin"
          checked={whatsappOptIn}
          onCheckedChange={(checked) => setWhatsappOptIn(checked as boolean)}
          data-testid="checkbox-whatsapp-optin"
        />
        <Label htmlFor="whatsapp-optin" className="text-sm text-muted-foreground cursor-pointer">
          Send me webinar reminders via WhatsApp
        </Label>
      </div>
      <Button 
        type="submit" 
        className="w-full" 
        disabled={registerMutation.isPending}
        data-testid="button-submit-registration"
      >
        {registerMutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Registering...
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Register for Free Webinar
          </>
        )}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        You'll receive the Google Meet link closer to the webinar date.
      </p>
    </form>
  );
}

export default function WebinarSection() {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  return (
    <section
      id="webinars"
      className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10"
      data-testid="section-webinars"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Video className="w-3 h-3 mr-1" />
            Free Learning
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-webinars-title"
          >
            Upcoming <span className="text-primary">Free Webinars</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join my free webinars to learn interview strategies, system design patterns, 
            and leadership communication skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {upcomingWebinars.map((webinar) => (
            <Card
              key={webinar.id}
              className="hover-elevate transition-all duration-200"
              data-testid={`card-webinar-${webinar.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {webinar.date}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {webinar.time}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{webinar.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {webinar.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {webinar.topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <Dialog open={openDialogId === webinar.id} onOpenChange={(open) => setOpenDialogId(open ? webinar.id : null)}>
                  <DialogTrigger asChild>
                    <Button className="w-full" data-testid={`button-register-${webinar.id}`}>
                      <Bell className="w-4 h-4 mr-2" />
                      Register Interest
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Register for {webinar.title}</DialogTitle>
                      <DialogDescription>
                        Get notified when this webinar is scheduled. It's free!
                      </DialogDescription>
                    </DialogHeader>
                    <RegistrationForm 
                      webinar={webinar} 
                      onSuccess={() => setOpenDialogId(null)} 
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Stay Updated on All Webinars
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Follow me on WhatsApp or YouTube to never miss a free webinar. 
                I announce new sessions there first!
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a
                    href="https://wa.me/16094424081?text=Hi%20Rupesh,%20please%20notify%20me%20about%20your%20upcoming%20free%20webinars."
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-webinar-whatsapp"
                  >
                    <SiWhatsapp className="w-4 h-4 mr-2" />
                    WhatsApp Updates
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://www.youtube.com/@FullStackMaster?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-webinar-youtube"
                  >
                    <SiYoutube className="w-4 h-4 mr-2 text-red-500" />
                    Subscribe on YouTube
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
