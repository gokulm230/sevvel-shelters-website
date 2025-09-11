import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Building, Leaf } from "lucide-react"

export function AboutSection() {
  const achievements = [
    {
      icon: Building,
      title: "50+ Projects",
      description: "Successfully completed residential and commercial projects",
    },
    {
      icon: Users,
      title: "1000+ Families",
      description: "Happy families living in our quality homes",
    },
    {
      icon: Award,
      title: "15+ Years",
      description: "Of excellence in real estate development",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Sustainable construction practices and green building",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            About Sevvel Shelters
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Located in the heart of Coimbatore, we are committed to delivering exceptional real estate solutions that
            combine modern living with sustainable practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground text-sm">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Our Commitment to Excellence</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                At Sevvel Shelters, we believe that every family deserves a home that reflects their dreams and
                aspirations. Since our establishment, we have been dedicated to creating spaces that combine comfort,
                functionality, and aesthetic appeal.
              </p>
              <p>
                Our team of experienced professionals works tirelessly to ensure that every project meets the highest
                standards of quality and craftsmanship. From initial planning to final delivery, we maintain
                transparency and keep our clients informed at every step.
              </p>
              <p>
                We are proud to be part of Coimbatore's growth story, contributing to the city's development while
                maintaining our commitment to environmental sustainability and community welfare.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/modern-office-building-with-green-architecture-and.jpg"
              alt="Sevvel Shelters Office"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
