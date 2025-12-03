import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AnnouncementBar from "@/components/AnnouncementBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import profile from "@/data/profile.json";
import externalLinks from "@/data/externalLinks.json";
import { MessageCircle, Calendar, CheckCircle, Star, Users, Trophy } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Book() {
  const googleCalendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Calendar scheduling script
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  const openGoogleCalendar = () => {
    const target = googleCalendarRef.current;
    if (target && window.calendar?.schedulingButton) {
      window.calendar.schedulingButton.load({
        url: 'https://calendar.google.com/calendar/appointments/AcZssZ2dMNXqXzYcl2NKLpclDV9w0p4-9cp4UvTHii0=?gv=true',
        color: '#039BE5',
        label: 'Book an appointment',
        target,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Book Your 1-on-1 Coaching Session | Rupesh Tiwari"
        description="Schedule your personalized FAANG interview coaching with Rupesh Tiwari. 85%+ success rate. Directors, VPs, Principal Engineers, and Solutions Architects."
        canonical="https://www.fullstackmaster.net/book"
      />
      <AnnouncementBar />
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-sm">AWS Senior CSM</Badge>
              <Badge variant="secondary" className="text-sm">20+ Years Experience</Badge>
              <Badge variant="secondary" className="text-sm">5.0/5.0 Rating</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Book Your {profile.personal.firstName}'s 1-on-1 Coaching
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Get personalized FAANG interview preparation from someone who's lived every role you're interviewing for. 85%+ of my coaches get offers from top companies.
            </p>
          </div>
        </section>

        {/* Booking Options */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Start Your Journey</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* WhatsApp Option */}
              <Card className="p-8 hover-elevate">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Message on WhatsApp</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  For quick questions, NDA requests, or to discuss your specific situation before booking. I prefer WhatsApp for personal communication.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Personal 1-on-1 conversation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Discuss your specific needs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Customize your coaching plan</span>
                  </div>
                </div>
                <a
                  href={profile.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white" data-testid="button-whatsapp-book">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Me on WhatsApp
                  </Button>
                </a>
              </Card>

              {/* Google Calendar Option */}
              <Card className="p-8 hover-elevate">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Book Directly</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Ready to book? Schedule your session directly through Google Calendar. Choose your preferred time and let's get started.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Instant booking confirmation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Multiple time slots available</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Calendar invite sent to email</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={openGoogleCalendar}
                  data-testid="button-google-calendar-book"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule on Google Calendar
                </Button>
                <div ref={googleCalendarRef} className="mt-4" />
              </Card>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Work With Rupesh</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-semibold text-lg">85%+ Success Rate</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Most of my clients receive offers from top tech companies within weeks.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-lg">4,000+ Coached</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  From engineers to directors and VPs at Amazon, Google, Meta, Apple & Netflix.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  <h3 className="font-semibold text-lg">5.0/5.0 Rating</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  50+ verified reviews on IGotAnOffer from real executives and engineers.
                </p>
              </Card>
            </div>

            {/* Key Credentials */}
            <div className="grid md:grid-cols-2 gap-8 border-t pt-12">
              <div>
                <h3 className="font-semibold text-lg mb-4">My Background</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Senior Customer Solutions Manager at AWS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Senior Solutions Architect at AWS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Global Senior Solutions Architect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>ISB CTO Scholar (Indian School of Business)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">What You'll Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Personalized interview coaching tailored to your role</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>System design guidance for senior-level positions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Leadership principles & behavioral interview prep</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Strategies for Director, VP & Principal Engineer roles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Don't leave your FAANG interview preparation to chance. Let's discuss your specific situation and create a winning strategy together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={profile.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white" data-testid="button-whatsapp-cta">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Me
                </Button>
              </a>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto" 
                onClick={openGoogleCalendar}
                data-testid="button-google-calendar-cta"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Now
              </Button>
            </div>
            <div ref={googleCalendarRef} className="mt-8" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
