import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage, isFirebaseConfigured } from "./firebase"

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
  createdAt: Date
  updatedAt: Date
}

// Mock data for when Firebase is not configured
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

// Get all visible projects for public display
export async function getPublicProjects(): Promise<Project[]> {
  // Return mock data if Firebase is not configured
  if (!isFirebaseConfigured || !db) {
    console.log("Firebase not configured, returning mock projects data")
    return mockProjects.filter((project) => project.visible)
  }

  try {
    const q = query(collection(db, "projects"), where("visible", "==", true), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Project,
    )
  } catch (error) {
    console.error("Error fetching public projects:", error)
    // Return mock data as fallback
    return mockProjects.filter((project) => project.visible)
  }
}

// Get all projects for admin panel
export async function getAllProjects(): Promise<Project[]> {
  // Return mock data if Firebase is not configured
  if (!isFirebaseConfigured || !db) {
    console.log("Firebase not configured, returning mock projects data")
    return mockProjects
  }

  try {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Project,
    )
  } catch (error) {
    console.error("Error fetching all projects:", error)
    // Return mock data as fallback
    return mockProjects
  }
}

// Add new project
export async function addProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<string> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase not configured. Please set up Firebase environment variables to add projects.")
  }

  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding project:", error)
    throw error
  }
}

// Update project
export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase not configured. Please set up Firebase environment variables to update projects.")
  }

  try {
    const projectRef = doc(db, "projects", id)
    await updateDoc(projectRef, {
      ...updates,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error("Error updating project:", error)
    throw error
  }
}

// Delete project
export async function deleteProject(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase not configured. Please set up Firebase environment variables to delete projects.")
  }

  try {
    await deleteDoc(doc(db, "projects", id))
  } catch (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}

// Upload project image
export async function uploadProjectImage(file: File, projectId: string): Promise<string> {
  if (!isFirebaseConfigured || !storage) {
    throw new Error("Firebase not configured. Please set up Firebase environment variables to upload images.")
  }

  try {
    const timestamp = Date.now()
    const fileName = `${projectId}_${timestamp}_${file.name}`
    const storageRef = ref(storage, `projects/${fileName}`)

    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)

    return downloadURL
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

// Delete project image
export async function deleteProjectImage(imageUrl: string): Promise<void> {
  if (!isFirebaseConfigured || !storage) {
    throw new Error("Firebase not configured. Please set up Firebase environment variables to delete images.")
  }

  try {
    const imageRef = ref(storage, imageUrl)
    await deleteObject(imageRef)
  } catch (error) {
    console.error("Error deleting image:", error)
    throw error
  }
}
