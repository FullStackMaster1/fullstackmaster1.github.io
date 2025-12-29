import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Gift, Download, CheckCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import EmailCaptureForm from './EmailCaptureForm';

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('exit_intent_dismissed');
    const dismissedAt = dismissed ? parseInt(dismissed) : 0;
    const daysSinceDismissed = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    
    // Don't show if dismissed within last 7 days
    if (daysSinceDismissed < 7) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger on desktop (mouse leaving top of screen)
      if (e.clientY <= 0 && !hasShown && window.innerWidth > 768) {
        setIsOpen(true);
        setHasShown(true);
        trackEvent('exit_intent_popup_shown', 'lead_capture', 'mouse_leave');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('exit_intent_dismissed', Date.now().toString());
    trackEvent('exit_intent_popup_dismissed', 'lead_capture', 'dismiss');
  };

  const handleSuccess = () => {
    // Keep open for a moment to show success, then close
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-exit-intent">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-green-500">
              <Gift className="w-3 h-3 mr-1" />
              FREE DOWNLOAD
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogTitle className="text-2xl">
            Wait! Don't Leave Empty-Handed
          </DialogTitle>
          <DialogDescription className="text-base">
            Get my FREE STAR Story Framework - the exact templates I use with 4,000+ coaching clients
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>50+ STAR story templates for Amazon Leadership Principles</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>System design interview cheat sheet</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Behavioral question bank (100+ questions)</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Free 15-min strategy call included</span>
          </div>
        </div>

        <EmailCaptureForm
          source="exit_intent"
          leadMagnet="star_framework"
          onSuccess={handleSuccess}
          buttonText="Get Free Framework"
        />
      </DialogContent>
    </Dialog>
  );
}
