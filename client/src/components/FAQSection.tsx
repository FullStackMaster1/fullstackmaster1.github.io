import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import faqsData from "@/data/faqs.json";
import siteContent from "@/data/siteContent.json";
import { trackFAQExpand } from "@/lib/analytics";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const { faq } = siteContent;

  const handleFAQExpand = (value: string) => {
    if (value) {
      const faqItem = (faqsData as FAQ[]).find(item => item.id === value);
      if (faqItem) {
        trackFAQExpand(faqItem.question);
      }
    }
  };

  return (
    <section
      id="faq"
      className="py-10 md:py-14 bg-gradient-to-br from-purple-50/30 via-card to-green-50/30 dark:from-purple-950/20 dark:via-card dark:to-green-950/20"
      data-testid="section-faq"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <HelpCircle className="w-3 h-3 mr-1" />
            {faq.badge}
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-faq-title"
          >
            {faq.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {faq.description}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full" onValueChange={handleFAQExpand}>
          {(faqsData as FAQ[]).map((item, index) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
