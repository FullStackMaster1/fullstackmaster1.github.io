import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "I haven't interviewed in years. Is coaching still helpful?",
    answer: "Absolutely! Many of my clients haven't interviewed in 5-10+ years. That's exactly why structured coaching is valuable. I'll help you understand modern interview formats, practice with realistic scenarios, and build confidence through repetition. We focus on rubric-based preparation so you know exactly what interviewers are looking for.",
  },
  {
    question: "Do you coach for specific companies like Amazon, Google, or Meta?",
    answer: "Yes! I have extensive experience coaching for all major tech companies including Amazon, Google, Meta, Microsoft, Apple, and Netflix. As a Senior Customer Solutions Manager at AWS, I deeply understand the Leadership Principles and how they're evaluated. Each company has unique interview styles, and I tailor our sessions accordingly.",
  },
  {
    question: "What's the difference between booking directly vs. through IGotAnOffer?",
    answer: "Booking directly via WhatsApp or calendar gives you a significant discount - $120/session vs $141 on the platform. You get the same high-quality coaching, but with more scheduling flexibility and direct communication. I also offer a 5-session package for $600 (save $105) which isn't available on the platform.",
  },
  {
    question: "What if I'm not satisfied with the coaching?",
    answer: "Your satisfaction is my priority. If you're not happy with our first session, I offer a full refund - no questions asked. My 50+ five-star reviews on IGotAnOffer reflect my commitment to delivering real value. I want every client to feel confident about their investment.",
  },
  {
    question: "How quickly can I see results from coaching?",
    answer: "Most clients see significant improvement within 2-3 sessions. For comprehensive preparation (system design + behavioral), I recommend the 5-session package spread over 2-4 weeks. However, even a single session can provide clarity on your gaps and a clear action plan.",
  },
  {
    question: "I'm a Director/VP level. Is your coaching relevant for senior roles?",
    answer: "Definitely! I specialize in coaching senior technical leaders - Senior Managers, Directors, VPs, and Principal Engineers. At senior levels, interviews focus heavily on leadership, strategic thinking, and executive communication. I help you articulate your impact and demonstrate the scope expected at your target level.",
  },
  {
    question: "What topics do you cover in system design coaching?",
    answer: "I cover everything from fundamentals (scalability, availability, consistency) to advanced topics (distributed systems, microservices, event-driven architectures). For senior roles, I emphasize trade-off discussions, capacity planning, and how to structure your design for maximum interviewer impact.",
  },
  {
    question: "Can I get a free consultation before committing?",
    answer: "Yes! I offer a free 15-minute discovery call where we discuss your goals, assess your current preparation level, and create a personalized coaching roadmap. Book directly through my calendar or reach out via WhatsApp - I typically respond within a few hours.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="py-16 md:py-24 bg-card"
      data-testid="section-faq"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <HelpCircle className="w-3 h-3 mr-1" />
            FAQ
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-faq-title"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Common questions about coaching, pricing, and preparation
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
