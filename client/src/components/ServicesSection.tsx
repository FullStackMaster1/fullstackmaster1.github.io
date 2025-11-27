import { Card, CardContent } from "@/components/ui/card";
import {
  Cloud,
  Database,
  Package,
  Users,
  ClipboardList,
  Cog,
  Server,
  Building2,
  Code2,
  FileCheck,
} from "lucide-react";

const services = [
  {
    role: "Cloud Engineer",
    description: "AWS, Azure, GCP cloud architecture and certifications",
    icon: Cloud,
  },
  {
    role: "Data Engineer",
    description: "Data pipelines, ETL, and big data technologies",
    icon: Database,
  },
  {
    role: "Product Manager",
    description: "Product strategy, roadmaps, and stakeholder management",
    icon: Package,
  },
  {
    role: "Engineering Manager",
    description: "Team leadership, hiring, and engineering culture",
    icon: Users,
  },
  {
    role: "Manager of TPMs",
    description: "TPM leadership and program excellence",
    icon: ClipboardList,
  },
  {
    role: "Program Manager",
    description: "Cross-functional programs and delivery excellence",
    icon: FileCheck,
  },
  {
    role: "Site Reliability Engineer",
    description: "SRE practices, observability, and incident management",
    icon: Server,
  },
  {
    role: "Solutions Architect",
    description: "System design, AWS architecture, and customer solutions",
    icon: Building2,
  },
  {
    role: "Staff Software Engineer",
    description: "Technical leadership and system design at scale",
    icon: Code2,
  },
  {
    role: "Technical Program Manager",
    description: "Technical delivery, risk management, and execution",
    icon: Cog,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-muted/30"
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-services-title"
          >
            Coaching Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized interview preparation and career coaching for technical
            and leadership roles at top tech companies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.role}
              className="hover-elevate cursor-pointer transition-all duration-200"
              data-testid={`card-service-${service.role.toLowerCase().replace(/ /g, "-")}`}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.role}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
