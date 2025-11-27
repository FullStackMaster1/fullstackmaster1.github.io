import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";

export default function BookingSection() {
  return (
    <section
      id="booking"
      className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/20"
      data-testid="section-booking"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-booking-title"
          >
            Schedule Your Coaching Session
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a 1-on-1 session directly on my calendar. Choose a time that
            works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Flexible Scheduling</h3>
                <p className="text-sm text-muted-foreground">
                  Pick any available slot
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">60-Min Sessions</h3>
                <p className="text-sm text-muted-foreground">
                  Deep-dive coaching time
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Video Call</h3>
                <p className="text-sm text-muted-foreground">
                  Google Meet or Zoom
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <iframe
              src="https://calendar.google.com/calendar/appointments/AcZssZ2dMNXqXzYcl2NKLpclDV9w0p4-9cp4UvTHii0=?gv=true"
              className="w-full h-[600px] md:h-[700px] border-0"
              title="Schedule a coaching session with Rupesh Tiwari"
              data-testid="iframe-calendar"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
