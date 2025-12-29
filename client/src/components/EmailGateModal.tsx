import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Gift, CheckCircle } from 'lucide-react';
import EmailCaptureForm from './EmailCaptureForm';
import { trackEvent } from '@/lib/analytics';

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bookingUrl: string;
}

export default function EmailGateModal({ isOpen, onClose, onSuccess, bookingUrl }: EmailGateModalProps) {
  const [emailCaptured, setEmailCaptured] = useState(false);

  const handleEmailSuccess = () => {
    setEmailCaptured(true);
    trackEvent('email_gate_success', 'conversion', 'before_booking');
    
    // Redirect to booking after brief delay
    setTimeout(() => {
      window.open(bookingUrl, '_blank');
      onSuccess();
      onClose();
    }, 1500);
  };

  const handleSkip = () => {
    trackEvent('email_gate_skipped', 'conversion', 'before_booking');
    window.open(bookingUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-email-gate">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Gift className="w-6 h-6 text-primary" />
            Get Free Prep Guide When You Book
          </DialogTitle>
          <DialogDescription className="text-base">
            Enter your email to receive a free interview prep guide when you book your session
          </DialogDescription>
        </DialogHeader>

        {emailCaptured ? (
          <div className="text-center py-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <p className="text-green-700 dark:text-green-300 font-medium">
                Redirecting to booking...
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Check your email for your free prep guide!
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Amazon Leadership Principles cheat sheet</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>System design interview template</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Behavioral question bank (100+ questions)</span>
              </div>
            </div>

            <EmailCaptureForm
              source="booking_email_gate"
              leadMagnet="prep_guide"
              onSuccess={handleEmailSuccess}
              buttonText="Get Guide & Book Session"
              showName={true}
            />

            <button
              onClick={handleSkip}
              className="text-sm text-muted-foreground hover:text-foreground text-center w-full mt-2"
            >
              Skip and book directly
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

