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
}

export const INITIAL_PROJECTS: Project[] = []

const STORAGE_KEY = "interior_projects_data"

export function getStoredProjects(): Project[] {
  if (typeof window === "undefined") return INITIAL_PROJECTS
  try {
    const item = localStorage.getItem(STORAGE_KEY)
    if (!item) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
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
