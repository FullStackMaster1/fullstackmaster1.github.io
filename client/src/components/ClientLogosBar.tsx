import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { SiAmazon, SiGoogle, SiMeta, SiApple, SiNetflix, SiOracle, SiSalesforce, SiAdobe } from "react-icons/si";
import { Building2, Cloud } from "lucide-react";

const companies = [
  { name: "Amazon", icon: SiAmazon, color: "text-orange-500" },
  { name: "Google", icon: SiGoogle, color: "text-blue-500" },
  { name: "Meta", icon: SiMeta, color: "text-blue-600" },
  { name: "Microsoft", icon: Building2, color: "text-cyan-500" },
  { name: "Apple", icon: SiApple, color: "text-gray-700 dark:text-gray-300" },
  { name: "Netflix", icon: SiNetflix, color: "text-red-600" },
  { name: "Oracle", icon: SiOracle, color: "text-red-500" },
  { name: "IBM", icon: Cloud, color: "text-blue-700" },
  { name: "Salesforce", icon: SiSalesforce, color: "text-blue-500" },
  { name: "Adobe", icon: SiAdobe, color: "text-red-600" },
];

export default function ClientLogosBar() {
  return (
    <section className="py-8 md:py-10 bg-muted/30 border-y border-border/50" data-testid="section-client-logos">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Badge variant="secondary" className="mb-2">
            Trusted by Professionals From
          </Badge>
          <p className="text-sm text-muted-foreground">
            Coached 4,000+ professionals from top tech companies worldwide
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {companies.map((company, index) => {
            const Icon = company.icon;
            return (
              <motion.div
                key={company.name}
                className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                data-testid={`logo-${company.name.toLowerCase()}`}
              >
                <Icon className={`w-8 h-8 md:w-10 md:h-10 ${company.color}`} />
                <span className="text-xs text-muted-foreground hidden md:block">{company.name}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          className="text-center text-xs text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Clients have received offers at Amazon, Google, Meta, Microsoft, and 100+ other companies
        </motion.p>
      </div>
    </section>
  );
}
