"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, Eye, EyeOff, MapPin, Calendar, Home, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAllProjects } from "@/hooks/use-projects"
import { updateProject, deleteProject } from "@/lib/projects"
import type { Project } from "@/lib/projects"

export default function ProjectsManagement() {
  const { projects, loading, refetch } = useAllProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [updatingProject, setUpdatingProject] = useState<string | null>(null)

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleVisibility = async (project: Project) => {
    if (!project.id) return

    setUpdatingProject(project.id)
    try {
      await updateProject(project.id, { visible: !project.visible })
      await refetch()
    } catch (error) {
      console.error("Error updating project visibility:", error)
    } finally {
      setUpdatingProject(null)
    }
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return
    }

    setUpdatingProject(projectId)
    try {
      await deleteProject(projectId)
      await refetch()
    } catch (error) {
      console.error("Error deleting project:", error)
    } finally {
      setUpdatingProject(null)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects Management</h1>
            <p className="text-muted-foreground">Manage your real estate projects</p>
          </div>
          <Link href="/admin/projects/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="text-center py-20">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No projects found matching your search."
                  : "No projects found. Add your first project to get started."}
              </p>
              {!searchTerm && (
                <Link href="/admin/projects/new">
                  <Button className="mt-4 bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Project
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={project.images?.[0] || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Badge
                      className={`${
                        project.status === "Ongoing"
                          ? "bg-primary text-primary-foreground"
                          : project.status === "Completed"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {project.status}
                    </Badge>
                    <Badge variant={project.visible ? "default" : "secondary"}>
                      {project.visible ? "Visible" : "Hidden"}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
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
                      {project.completion}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link href={`/admin/projects/${project.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleVisibility(project)}
                      disabled={updatingProject === project.id}
                    >
                      {updatingProject === project.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : project.visible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => project.id && handleDelete(project.id)}
                      disabled={updatingProject === project.id}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
