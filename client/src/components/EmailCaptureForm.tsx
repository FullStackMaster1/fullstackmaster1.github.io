import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Loader2 } from 'lucide-react';
import { trackEvent, trackLeadGeneration, trackFormComplete } from '@/lib/analytics';

interface EmailCaptureFormProps {
  source: string;
  leadMagnet?: string;
  onSuccess?: () => void;
  className?: string;
  showName?: boolean;
  buttonText?: string;
  compact?: boolean;
}

export default function EmailCaptureForm({ 
  source, 
  leadMagnet = 'star_framework',
  onSuccess,
  className = '',
  showName = true,
  buttonText = 'Get Free Guide',
  compact = false
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          name: name || email.split('@')[0], 
          source, 
          leadMagnet 
        })
      });

      const data = await response.json();

      if (response.ok) {
        trackLeadGeneration(source, 'email');
        trackFormComplete('email_capture');
        trackEvent('email_captured', 'conversion', `${source}_${leadMagnet}`);
        setSubmitted(true);
        onSuccess?.();
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        trackEvent('email_capture_error', 'error', data.error || 'unknown');
      }
    } catch (error) {
      console.error('Email capture error:', error);
      setError('Network error. Please check your connection and try again.');
      trackEvent('email_capture_error', 'error', 'network');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 ${className}`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-700 dark:text-green-300 font-medium">Check your email!</p>
        </div>
        <p className="text-sm text-green-600 dark:text-green-400">
          We sent you the {leadMagnet.replace('_', ' ')}. Check your spam folder if you don't see it.
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`space-y-2 ${className}`}>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !email}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonText}
          </Button>
        </div>
        {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        <p className="text-xs text-muted-foreground text-center">
          No spam. Unsubscribe anytime. USA compliant.
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {showName && (
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={loading || !email}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          buttonText
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to receive emails. No spam. Unsubscribe anytime. 
        <br />
        <span className="text-[10px]">USA compliant (CAN-SPAM, CCPA).</span>
      </p>
    </form>
  );
}

