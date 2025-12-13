import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Video, Star, Quote, ArrowRight, CheckCircle, Users, Award } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { trackEvent } from "@/lib/analytics";
import profile from "@/data/profile.json";

const videoTestimonials = [
  {
    id: 1,
    name: "Video Coming Soon",
    title: "Director of Engineering",
    company: "Amazon",
    thumbnail: null,
    videoId: null,
    quote: "Share your success story! If Rupesh helped you land your dream role, record a short video testimonial.",
    result: "Got Director Offer",
    placeholder: true
  },
  {
    id: 2,
    name: "Your Story Here",
    title: "Principal Architect",
    company: "Google",
    thumbnail: null,
    videoId: null,
    quote: "Client video testimonials coming soon. Want to share your experience? Contact Rupesh directly.",
    result: "Got Principal Offer",
    placeholder: true
  },
  {
    id: 3,
    name: "Success Story",
    title: "VP of Engineering",
    company: "Meta",
    thumbnail: null,
    videoId: null,
    quote: "We're collecting video testimonials from successful clients. Your story could inspire others!",
    result: "Got VP Offer",
    placeholder: true
  }
];

const textTestimonials = [
  {
    name: "Verified Client",
    title: "Staff Engineer at Google",
    quote: "Rupesh's system design coaching was game-changing. His IFRAIL+T framework made complex problems manageable.",
    rating: 5
  },
  {
    name: "Verified Client", 
    title: "Director at Amazon",
    quote: "The behavioral interview prep exceeded expectations. I felt fully prepared for every leadership principle question.",
    rating: 5
  }
];

export default function VideoTestimonialsSection() {
  const handleShareStory = () => {
    trackEvent("share_testimonial_click", "engagement", "video_section");
  };

  return (
    <section 
      id="video-testimonials" 
      className="py-12 md:py-16 bg-gradient-to-b from-muted/30 to-background"
      data-testid="section-video-testimonials"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-red-500/20">
              <SiYoutube className="w-3 h-3 mr-1" />
              Video Testimonials
            </Badge>
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
              <Star className="w-3 h-3 mr-1 fill-current" />
              5.0 Rating
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-video-title">
            Hear From <span className="text-primary">Successful Clients</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from professionals who transformed their careers with structured coaching.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {videoTestimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className={`overflow-hidden group ${testimonial.placeholder ? 'border-dashed' : 'hover-elevate'}`}
              data-testid={`card-video-testimonial-${testimonial.id}`}
            >
              <div 
                className={`relative aspect-video ${testimonial.placeholder ? 'bg-muted/50' : 'bg-muted'} flex items-center justify-center`}
              >
                {testimonial.placeholder ? (
                  <div className="text-center p-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
                      <Video className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Video Coming Soon</p>
                  </div>
                ) : (
                  <a 
                    href={`https://www.youtube.com/watch?v=${testimonial.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("video_testimonial_play", "engagement", testimonial.name)}
                    className="block w-full h-full"
                  >
                    <img 
                      src={testimonial.thumbnail || ""} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary fill-current ml-1" />
                      </div>
                    </div>
                  </a>
                )}
                
                {testimonial.result && (
                  <Badge 
                    className="absolute top-3 right-3 bg-green-500 text-white border-0"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {testimonial.result}
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Quote className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  <p className="text-sm text-muted-foreground line-clamp-2 italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.title} • {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {textTestimonials.map((testimonial, idx) => (
            <Card key={idx} className="hover-elevate" data-testid={`card-text-testimonial-${idx}`}>
              <CardContent className="p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm mb-3 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-6 h-6 text-primary" />
                <div className="text-left">
                  <h3 className="font-semibold">Share Your Success Story</h3>
                  <p className="text-sm text-muted-foreground">Got an offer with Rupesh's help? Inspire others!</p>
                </div>
              </div>
              <Button asChild data-testid="button-share-story">
                <a 
                  href={`${profile.contact.whatsappLink}?text=${encodeURIComponent("Hi Rupesh, I want to share my success story as a video testimonial!")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleShareStory}
                >
                  Record Your Testimonial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
