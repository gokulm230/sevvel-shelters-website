import { supabase, isSupabaseConfigured } from "./supabase"

export interface Project {
  id?: string
  title: string
  description: string
  location: string
  status: "Ongoing" | "Planning" | "Completed"
  units: string
  completion: string
  images: string[]
  visible: boolean
  created_at?: string
  updated_at?: string
  createdAt?: Date
  updatedAt?: Date
}

// Mock data for when Supabase is not configured
const mockProjects: Project[] = [
  {
    id: "1",
    title: "Green Valley Residences",
    description: "Luxury apartments with modern amenities and eco-friendly features in the heart of Coimbatore.",
    location: "RS Puram, Coimbatore",
    status: "Ongoing",
    units: "120 Units",
    completion: "December 2024",
    images: ["/modern-apartment-building.png"],
    visible: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Sevvel Heights",
    description: "Premium residential towers offering panoramic city views and world-class facilities.",
    location: "Gandhipuram, Coimbatore",
    status: "Planning",
    units: "200 Units",
    completion: "June 2025",
    images: ["/luxury-residential-tower.jpg"],
    visible: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "3",
    title: "Shelter Gardens",
    description: "Affordable housing project with beautiful landscaping and community spaces.",
    location: "Peelamedu, Coimbatore",
    status: "Completed",
    units: "80 Units",
    completion: "March 2024",
    images: ["/garden-residential-complex.png"],
    visible: true,
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2024-03-15"),
  },
]

// Format project from Supabase response
const formatProject = (project: any): Project => {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    location: project.location,
    status: project.status,
    units: project.units,
    completion: project.completion,
    images: project.images || [],
    visible: project.visible,
    createdAt: project.created_at ? new Date(project.created_at) : new Date(),
    updatedAt: project.updated_at ? new Date(project.updated_at) : new Date(),
  }
}

// Get all visible projects for public display
export async function getPublicProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) {
    console.log("Supabase not configured, returning mock projects data")
    return mockProjects.filter((project) => project.visible)
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('visible', true)  // This filters to only show visible projects
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return data.map(formatProject)
  } catch (error) {
    console.error("Error fetching public projects:", error)
    return mockProjects.filter((project) => project.visible)
  }
}

// Get all projects for admin panel
export async function getAllProjects(): Promise<Project[]> {
  // Return mock data if Supabase is not configured
  if (!isSupabaseConfigured) {
    console.log("Supabase not configured, returning mock projects data")
    return mockProjects
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')  // No visibility filter here - shows all projects
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return data.map(formatProject)
  } catch (error) {
    console.error("Error fetching all projects:", error)
    return mockProjects
  }
}

// Add new project
export async function addProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<string> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured. Please set up Supabase environment variables to add projects.")
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        title: project.title,
        description: project.description,
        location: project.location,
        status: project.status,
        units: project.units,
        completion: project.completion,
        images: project.images,
        visible: project.visible
      })
      .select()
    
    if (error) {
      throw error
    }

    return data[0].id
  } catch (error) {
    console.error("Error adding project:", error)
    throw error
  }
}

// Update project
export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured. Please set up Supabase environment variables to update projects.")
  }

  try {
    // Remove createdAt and updatedAt from updates if present
    const { createdAt, updatedAt, ...filteredUpdates } = updates

    const { error } = await supabase
      .from('projects')
      .update(filteredUpdates)
      .eq('id', id)
    
    if (error) {
      throw error
    }
  } catch (error) {
    console.error("Error updating project:", error)
    throw error
  }
}

// Delete project
export async function deleteProject(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured. Please set up Supabase environment variables to delete projects.")
  }

  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) {
      throw error
    }
  } catch (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}

// Upload project image
export async function uploadProjectImage(file: File, projectId: string): Promise<string> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured. Please set up Supabase environment variables to upload images.")
  }

  try {
    const timestamp = Date.now()
    const fileName = `${projectId}_${timestamp}_${file.name}`
    const filePath = `projects/${fileName}`
    
    // Upload the file to Supabase Storage
    const { error: uploadError } = await supabase
      .storage
      .from('project-images')
      .upload(filePath, file)
    
    if (uploadError) {
      throw uploadError
    }
    
    // Get the public URL
    const { data } = supabase
      .storage
      .from('project-images')
      .getPublicUrl(filePath)
    
    return data.publicUrl
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

// Delete project image
export async function deleteProjectImage(imageUrl: string): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured. Please set up Supabase environment variables to delete images.")
  }

  try {
    // Extract the file path from the URL
    // The URL format is typically like: https://[project-ref].supabase.co/storage/v1/object/public/project-images/[filePath]
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split('/')
    const bucketIndex = pathParts.findIndex(part => part === 'project-images')
    
    if (bucketIndex === -1) {
      throw new Error("Invalid image URL format")
    }
    
    // Extract the path after the bucket name
    const filePath = pathParts.slice(bucketIndex + 1).join('/')
    
    // Delete the file
    const { error } = await supabase
      .storage
      .from('project-images')
      .remove([filePath])
    
    if (error) {
      throw error
    }
  } catch (error) {
    console.error("Error deleting image:", error)
    throw error
  }
}