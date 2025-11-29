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
import { Calendar, Clock, Users, Video, Bell, ArrowRight, CheckCircle, Loader2, ThumbsUp, ThumbsDown } from "lucide-react";
import { SiWhatsapp, SiYoutube } from "react-icons/si";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import webinarsData from "@/data/webinars.json";
import { trackWebinarRegister, trackFormStart } from "@/lib/analytics";

function getOrCreateSessionId(): string {
  const key = "webinar_session_id";
  let sessionId = localStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(key, sessionId);
  }
  return sessionId;
}

interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  spots: string;
  topics: string[];
  active: boolean;
  interested?: number;
}

interface WebinarStats {
  registrations: number;
  upvotes: number;
  downvotes: number;
  userVote: string | null;
}

interface RegistrationFormProps {
  webinar: Webinar;
  onSuccess: () => void;
}

interface WebinarCardProps {
  webinar: Webinar;
  sessionId: string;
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
      trackWebinarRegister(webinar.title);
      toast({
        title: "Registration Successful!",
        description: data.message || "You will receive updates about this webinar.",
      });
      onSuccess();
    },
    onError: (error: Error) => {
      let errorMessage = "Failed to register. Please try again.";
      if (error.message) {
        errorMessage = error.message;
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

function WebinarCard({ webinar, sessionId }: WebinarCardProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useQuery<WebinarStats>({
    queryKey: ["/api/webinar/stats", webinar.id, sessionId || "anon"],
    queryFn: async () => {
      const url = sessionId 
        ? `/api/webinar/stats/${webinar.id}?sessionId=${sessionId}`
        : `/api/webinar/stats/${webinar.id}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const voteMutation = useMutation({
    mutationFn: async (vote: "upvote" | "downvote") => {
      const res = await apiRequest("POST", "/api/webinar/vote", {
        webinarId: webinar.id,
        sessionId,
        vote,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/webinar/stats", webinar.id, sessionId] });
    },
    onError: () => {
      toast({
        title: "Vote Failed",
        description: "Could not record your vote. Try again.",
        variant: "destructive",
      });
    },
  });

  const handleVote = (vote: "upvote" | "downvote") => {
    voteMutation.mutate(vote);
  };

  const totalInterest = (stats?.registrations || 0) + (stats?.upvotes || 0);
  const displayCount = totalInterest > 0 ? totalInterest : (webinar.interested || 0);

  return (
    <Card
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
        
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-xs text-primary font-medium">
            <Users className="w-3 h-3" />
            {statsLoading ? "..." : `${displayCount}+ people interested`}
          </div>
          {sessionId && (
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant={stats?.userVote === "upvote" ? "default" : "ghost"}
                className="h-7 px-2"
                onClick={() => handleVote("upvote")}
                disabled={voteMutation.isPending}
                data-testid={`button-upvote-${webinar.id}`}
              >
                <ThumbsUp className="w-3 h-3" />
                {stats?.upvotes ? <span className="ml-1 text-xs">{stats.upvotes}</span> : null}
              </Button>
              <Button
                size="sm"
                variant={stats?.userVote === "downvote" ? "default" : "ghost"}
                className="h-7 px-2"
                onClick={() => handleVote("downvote")}
                disabled={voteMutation.isPending}
                data-testid={`button-downvote-${webinar.id}`}
              >
                <ThumbsDown className="w-3 h-3" />
                {stats?.downvotes ? <span className="ml-1 text-xs">{stats.downvotes}</span> : null}
              </Button>
            </div>
          )}
        </div>

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
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="w-full" data-testid={`button-register-${webinar.id}`}>
              <Bell className="w-4 h-4 mr-2" />
              {webinar.spots}
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
              onSuccess={() => {
                setOpenDialog(false);
                if (sessionId) {
                  queryClient.invalidateQueries({ queryKey: ["/api/webinar/stats", webinar.id, sessionId] });
                }
              }} 
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default function WebinarSection() {
  const [sessionId, setSessionId] = useState<string>("");
  const activeWebinars = (webinarsData.webinars as Webinar[]).filter(w => w.active);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  return (
    <section
      id="webinars"
      className="py-10 md:py-14 bg-gradient-to-br from-primary/5 via-background to-accent/10"
      data-testid="section-webinars"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Video className="w-3 h-3 mr-1" />
            {webinarsData.sectionBadge}
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-webinars-title"
          >
            Upcoming <span className="text-primary">Free Webinars</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {webinarsData.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {activeWebinars.map((webinar) => (
            <WebinarCard key={webinar.id} webinar={webinar} sessionId={sessionId} />
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                {webinarsData.stayUpdatedTitle}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {webinarsData.stayUpdatedDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a
                    href={webinarsData.socialLinks.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-webinar-whatsapp"
                  >
                    <SiWhatsapp className="w-4 h-4 mr-2" />
                    {webinarsData.socialLinks.whatsapp.label}
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={webinarsData.socialLinks.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-webinar-youtube"
                  >
                    <SiYoutube className="w-4 h-4 mr-2 text-red-500" />
                    {webinarsData.socialLinks.youtube.label}
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
