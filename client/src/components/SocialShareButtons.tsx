import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, X, Check, Copy } from "lucide-react";
import { SiLinkedin, SiX, SiFacebook, SiWhatsapp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

export default function SocialShareButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const pageTitle = "FullStack Master - Full Stack & Cloud Coaching";
  const shareText = "Check out FullStack Master for expert interview coaching and cloud training!";

  const shareLinks = [
    {
      name: "LinkedIn",
      icon: SiLinkedin,
      color: "bg-[#0A66C2] hover:bg-[#004182]",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    },
    {
      name: "X",
      icon: SiX,
      color: "bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Facebook",
      icon: SiFacebook,
      color: "bg-[#1877F2] hover:bg-[#0d5fc7]",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    },
    {
      name: "WhatsApp",
      icon: SiWhatsapp,
      color: "bg-[#25D366] hover:bg-[#128C7E]",
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + pageUrl)}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The page URL has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually.",
        variant: "destructive",
      });
    }
  };

  const handleShare = (url: string, name: string) => {
    window.open(url, `share-${name}`, "width=600,height=400,scrollbars=yes");
  };

  return (
    <div className="fixed left-4 bottom-32 z-40 flex flex-col items-center gap-2">
      {isOpen && (
        <div className="flex flex-col gap-2 mb-2 animate-in slide-in-from-bottom-2 duration-200">
          {shareLinks.map((link) => (
            <Button
              key={link.name}
              size="icon"
              className={`${link.color} text-white rounded-full shadow-lg transition-transform hover:scale-110`}
              onClick={() => handleShare(link.url, link.name)}
              data-testid={`button-share-${link.name.toLowerCase()}`}
              title={`Share on ${link.name}`}
            >
              <link.icon className="w-4 h-4" />
            </Button>
          ))}
          <Button
            size="icon"
            variant="outline"
            className="rounded-full shadow-lg bg-background transition-transform hover:scale-110"
            onClick={copyToClipboard}
            data-testid="button-copy-link"
            title="Copy link"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}

      <Button
        size="icon"
        className={`rounded-full shadow-lg transition-all duration-200 ${
          isOpen 
            ? "bg-muted-foreground hover:bg-muted-foreground/80" 
            : "bg-primary hover:bg-primary/90"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-share-toggle"
        title={isOpen ? "Close share menu" : "Share this page"}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Share2 className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
