"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Home } from "lucide-react"
import { type Project } from "@/lib/projects"

interface AutoSlidingProjectCardProps {
  project: Project
  onOpenModal: (project: Project) => void
}

export function AutoSlidingProjectCard({ project, onOpenModal }: AutoSlidingProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const images = project.images && project.images.length > 0 ? project.images : ["/placeholder.svg"]

  // Auto-slide functionality
  useEffect(() => {
    if (isHovered || images.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      return
    }

    // Start auto-slide if there are multiple images
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 4000) // Change image every 4 seconds (slightly slower for cards)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered, images.length])

  // Clean up interval when component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onOpenModal(project)}
    >
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={images[currentImageIndex]}
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-500"
          style={{
            transition: 'transform 500ms ease-in-out, opacity 300ms ease-in-out'
          }}
        />
        
        {/* Status Badge */}
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

        {/* Image indicators - show on hover if multiple images */}
        {images.length > 1 && isHovered && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {currentImageIndex + 1}/{images.length}
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>

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

        <Button 
          className="w-full mt-4 bg-primary hover:bg-primary/90"
          onClick={(e) => {
            e.stopPropagation()
            onOpenModal(project)
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}