"use client"

import { useState, useEffect } from "react"
import {
  type Project, 
  getPublicProjects, 
  getAllProjects,
  getProjectById,
  deleteProject
} from "@/lib/projects"

export function usePublicProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getPublicProjects()
      setProjects(data)
    } catch (err) {
      setError("Failed to fetch projects")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return { projects, loading, error, refetch: fetchProjects }
}

export function useAllProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getAllProjects()
      setProjects(data)
    } catch (err) {
      setError("Failed to fetch projects")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id)
      // Refetch projects after successful deletion
      await fetchProjects()
    } catch (err) {
      setError("Failed to delete project")
      console.error(err)
      throw err // Re-throw to allow the component to handle it
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return { 
    projects, 
    loading, 
    error, 
    refetch: fetchProjects, 
    deleteProject: handleDeleteProject 
  }
}

export function useProject(id: string | null) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setProject(null)
      setLoading(false)
      return
    }

    const fetchProject = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getProjectById(id)
        setProject(data)
      } catch (err) {
        setError("Failed to fetch project")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  return { project, loading, error }
}
