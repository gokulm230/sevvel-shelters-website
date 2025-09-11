import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Hammer, FileText, Users, Wrench, Shield } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Building2,
      title: "Residential Development",
      description:
        "Premium apartments, villas, and gated communities designed for modern living with all essential amenities.",
    },
    {
      icon: Hammer,
      title: "Commercial Projects",
      description:
        "Office complexes, retail spaces, and commercial buildings that meet business requirements and growth needs.",
    },
    {
      icon: FileText,
      title: "Property Consultation",
      description:
        "Expert guidance on property investment, legal documentation, and market analysis for informed decisions.",
    },
    {
      icon: Users,
      title: "Project Management",
      description:
        "End-to-end project management services ensuring timely delivery and quality construction standards.",
    },
    {
      icon: Wrench,
      title: "Construction Services",
      description:
        "Complete construction solutions from foundation to finishing with modern techniques and quality materials.",
    },
    {
      icon: Shield,
      title: "After-Sales Support",
      description:
        "Comprehensive maintenance and support services to ensure long-term satisfaction and property value.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">Our Services</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Comprehensive real estate solutions tailored to meet your needs, from initial consultation to project
            completion and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
