import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareHeart, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast({
        title: "Please enter your feedback",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // For now, open WhatsApp with the feedback
    const message = `Feedback from ${name || "Anonymous"}${email ? ` (${email})` : ""}:\n\n${feedback}`;
    const whatsappUrl = `https://wa.me/16094424081?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "Thank you for your feedback!",
      description: "Your message has been prepared. Please send it via WhatsApp.",
    });
    
    setIsSubmitting(false);
    setIsOpen(false);
    setName("");
    setEmail("");
    setFeedback("");
  };

  return (
    <>
      <Button
        size="icon"
        className="fixed right-4 bottom-32 z-40 rounded-full shadow-lg bg-purple-600 hover:bg-purple-700 transition-all duration-200"
        onClick={() => setIsOpen(true)}
        data-testid="button-feedback"
        title="Give Feedback"
      >
        <MessageSquareHeart className="w-5 h-5" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquareHeart className="w-5 h-5 text-purple-600" />
              Share Your Feedback
            </DialogTitle>
            <DialogDescription>
              Your feedback helps me improve. Let me know what you think!
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback-name">Name (optional)</Label>
              <Input
                id="feedback-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                data-testid="input-feedback-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback-email">Email (optional)</Label>
              <Input
                id="feedback-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                data-testid="input-feedback-email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback-message">Your Feedback *</Label>
              <Textarea
                id="feedback-message"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts, suggestions, or questions..."
                rows={4}
                data-testid="input-feedback-message"
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                data-testid="button-feedback-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700"
                data-testid="button-feedback-submit"
              >
                {isSubmitting ? "Sending..." : "Send via WhatsApp"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
