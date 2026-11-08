export interface Project {
  id: number
  title: string
  category: string
  location: string
  image: string
  galleryImages?: string[]
  description: string
  fullDescription?: string
  clientName?: string
  completionYear?: string
  scopeOfWork?: string[]
  featured?: boolean
  createdAt?: string
  updatedAt?: string
}

export const INITIAL_PROJECTS: Project[] = []

const STORAGE_KEY = "interior_projects_data"

// Fetch projects from Neon PostgreSQL via /api/projects
export async function fetchProjectsFromDatabase(category?: string): Promise<Project[]> {
  try {
    const url =
      category && category !== "all"
        ? `/api/projects?category=${encodeURIComponent(category)}`
        : `/api/projects`
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) throw new Error("Failed to fetch projects")
    const data: Project[] = await res.json()
    if (Array.isArray(data)) {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        window.dispatchEvent(new Event("projects-updated"))
      }
      return data
    }
    return []
  } catch (error) {
    console.error("Error fetching projects from database:", error)
    return getStoredProjects()
  }
}

// Save project to Neon PostgreSQL
export async function saveProjectToDatabase(projectData: Partial<Project>): Promise<Project> {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || "Failed to save project to Neon database")
  }
  const saved: Project = await res.json()
  if (typeof window !== "undefined") {
    fetchProjectsFromDatabase()
  }
  return saved
}

// Delete project from Neon PostgreSQL
export async function deleteProjectFromDatabase(id: number): Promise<boolean> {
  const res = await fetch(`/api/projects?id=${id}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    throw new Error("Failed to delete project from database")
  }
  if (typeof window !== "undefined") {
    fetchProjectsFromDatabase()
  }
  return true
}

export function getStoredProjects(): Project[] {
  if (typeof window === "undefined") return INITIAL_PROJECTS
  try {
    const item = localStorage.getItem(STORAGE_KEY)
    if (!item) {
      return []
    }
    const parsed = JSON.parse(item)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error("Error reading projects from localStorage:", error)
    return []
  }
}

export function saveStoredProjects(projects: Project[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    window.dispatchEvent(new Event("projects-updated"))
  } catch (error) {
    console.error("Error saving projects to localStorage:", error)
  }
}

export function resetProjectsToDefault(): Project[] {
  if (typeof window === "undefined") return []
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    window.dispatchEvent(new Event("projects-updated"))
    return []
  } catch (error) {
    console.error("Error resetting projects:", error)
    return []
  }
}
