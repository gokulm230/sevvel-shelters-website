"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { getProjectById, updateProject, uploadProjectImage, deleteProjectImage } from "@/lib/projects"
import type { Project } from "@/lib/projects"

export default function EditProject() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string

  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState("")
  const [uploadingImages, setUploadingImages] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [project, setProject] = useState<Project | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    status: "Planning" as Project["status"],
    units: "",
    completion: "",
    visible: true,
  })

  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) return

      setInitialLoading(true)
      try {
        const projectData = await getProjectById(projectId)
        if (projectData) {
          setProject(projectData)
          setFormData({
            title: projectData.title,
            description: projectData.description,
            location: projectData.location,
            status: projectData.status,
            units: projectData.units,
            completion: projectData.completion,
            visible: projectData.visible,
          })
          setImages(projectData.images || [])
        } else {
          setError("Project not found")
        }
      } catch (error) {
        console.error("Error loading project:", error)
        setError("Failed to load project")
      } finally {
        setInitialLoading(false)
      }
    }

    loadProject()
  }, [projectId])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploadingImages(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        return await uploadProjectImage(file, projectId)
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      setImages((prev) => [...prev, ...uploadedUrls])
    } catch (error) {
      console.error("Error uploading images:", error)
      setError("Failed to upload images. Please try again.")
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = async (index: number) => {
    const imageUrl = images[index]
    try {
      // Only attempt to delete from storage if it's a full URL
      if (imageUrl.startsWith('http')) {
        await deleteProjectImage(imageUrl)
      }
    } catch (error) {
      console.error("Error deleting image:", error)
      // Continue anyway - remove from local state
    }
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const updates = {
        ...formData,
        images,
      }

      await updateProject(projectId, updates)
      router.push("/admin/projects")
    } catch (error) {
      console.error("Error updating project:", error)
      setError("Failed to update project. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    )
  }

  if (!project) {
    return (
      <AdminLayout>
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/projects">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Project Not Found</h1>
              <p className="text-muted-foreground">The requested project could not be found.</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/admin/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Project</h1>
            <p className="text-muted-foreground">Update project details for "{project.title}"</p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter project location"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter project description"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="units">Units *</Label>
                  <Input
                    id="units"
                    value={formData.units}
                    onChange={(e) => handleInputChange("units", e.target.value)}
                    placeholder="e.g., 120 Units"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="completion">Expected Completion *</Label>
                  <Input
                    id="completion"
                    value={formData.completion}
                    onChange={(e) => handleInputChange("completion", e.target.value)}
                    placeholder="e.g., Dec 2024"
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <Label>Project Images</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={uploadingImages}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      {uploadingImages ? (
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                      ) : (
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                      )}
                      <p className="text-muted-foreground">
                        {uploadingImages ? "Uploading images..." : "Click to add more project images"}
                      </p>
                      <p className="text-sm text-muted-foreground">PNG, JPG, JPEG up to 10MB each</p>
                    </div>
                  </label>
                </div>

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Project image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>



              {/* Submit Button */}
              <div className="flex space-x-4">
                <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating Project...
                    </>
                  ) : (
                    "Update Project"
                  )}
                </Button>
                <Link href="/admin/projects">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}