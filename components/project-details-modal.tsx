"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Home } from "lucide-react"
import { type Project } from "@/lib/projects"

interface ProjectDetailsModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [project?.id])

  // Auto-slide functionality
  useEffect(() => {
    if (!isOpen || !project || isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      return
    }

    const images = project.images && project.images.length > 0 ? project.images : ["/placeholder.svg"]
    
    // Only start auto-slide if there are multiple images
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, 3000) // Change image every 3 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isOpen, project, isHovered])

  // Clean up interval when component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Handle escape key to close modal and arrow keys for image navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        previousImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  const images = project.images && project.images.length > 0 ? project.images : ["/placeholder.svg"]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
    // Pause auto-slide temporarily when manually navigating
    setIsHovered(true)
    setTimeout(() => setIsHovered(false), 3000)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    // Pause auto-slide temporarily when manually navigating
    setIsHovered(true)
    setTimeout(() => setIsHovered(false), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      {/* Blurred backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background/90 rounded-full"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="p-5 space-y-6">
          {/* Image carousel section */}
          <div className="relative group">
            <div 
              className="relative aspect-video rounded-lg overflow-hidden bg-muted"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              
              {/* Status badge */}
              <Badge
                className={`absolute top-4 left-4 ${
                  project.status === "Ongoing"
                    ? "bg-primary text-primary-foreground"
                    : project.status === "Completed"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {project.status}
              </Badge>

              {/* Navigation arrows - only show if more than 1 image */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={previousImage}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={nextImage}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Image indicators */}
            {images.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index)
                      setIsHovered(true)
                      // Reset hover state after a short delay to resume auto-slide
                      setTimeout(() => setIsHovered(false), 2000)
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Project details */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {project.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project info grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{project.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Units</p>
                  <p className="font-medium">{project.units}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Completion</p>
                  <p className="font-medium">{project.completion}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                Contact Us
              </Button>
              <Button variant="outline" className="flex-1">
                Download Brochure
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}