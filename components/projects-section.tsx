"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Home, Loader2 } from "lucide-react"
import { usePublicProjects } from "@/hooks/use-projects"

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const { projects, loading, error } = usePublicProjects()

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Our Ongoing Projects
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Discover our current developments that showcase innovation, quality, and sustainable living solutions
              across Coimbatore.
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Our Ongoing Projects
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Discover our current developments that showcase innovation, quality, and sustainable living solutions
              across Coimbatore.
            </p>
          </div>
          <div className="text-center py-20">
            <p className="text-muted-foreground">Unable to load projects. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Our Ongoing Projects
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Discover our current developments that showcase innovation, quality, and sustainable living solutions across
            Coimbatore.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedProject(project.id || null)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.images?.[0] || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      className={`absolute top-4 right-4 ${
                        project.status === "Ongoing"
                          ? "bg-primary text-primary-foreground"
                          : project.status === "Completed"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{project.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        {project.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Home className="h-4 w-4 mr-2 text-primary" />
                        {project.units}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        Expected: {project.completion}
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                View All Projects
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
