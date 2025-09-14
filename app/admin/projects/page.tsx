"use client"

import React from 'react'
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useAllProjects } from "@/hooks/use-projects"

export default function ProjectsPage() {
  const { projects, loading, error } = useAllProjects()

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground">Manage your real estate projects</p>
          </div>
          <Link href="/admin/projects/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
          </Link>
        </div>

        {/* Projects List */}
        <div className="grid gap-6">
          {loading ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Loading projects...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-destructive">Error loading projects</p>
              </CardContent>
            </Card>
          ) : projects.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No projects found. Create your first project!</p>
              </CardContent>
            </Card>
          ) : (
            projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/4 bg-muted">
                    <img 
                      src={project.images?.[0] || "/placeholder.svg"} 
                      alt={project.title}
                      className="w-full h-full object-cover aspect-video sm:aspect-auto"
                    />
                  </div>
                  <div className="sm:w-3/4 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="text-muted-foreground text-sm">{project.location}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/projects/edit/${project.id}`}>
                          <Button size="sm" variant="outline">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        project.status === "Ongoing" 
                          ? "bg-primary/10 text-primary" 
                          : project.status === "Completed" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                      }`}>
                        {project.status}
                      </span>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        project.visible ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {project.visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
