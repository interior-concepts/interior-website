"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Eye,
  CheckCircle2,
  LayoutGrid,
  Search,
  ArrowLeft,
  X,
  Sparkles,
  Layers,
  MapPin,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Project,
  getStoredProjects,
  saveStoredProjects,
  resetProjectsToDefault,
} from "@/lib/projects-data"

export default function AdminSettingsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [successMsg, setSuccessMsg] = useState("")

  // Modal State for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // Form State
  const [formData, setFormData] = useState<{
    title: string
    category: string
    location: string
    image: string
    description: string
    fullDescription: string
    clientName: string
    completionYear: string
    scopeOfWorkStr: string
    featured: boolean
  }>({
    title: "",
    category: "residential",
    location: "",
    image: "",
    description: "",
    fullDescription: "",
    clientName: "",
    completionYear: "2025",
    scopeOfWorkStr: "",
    featured: false,
  })

  useEffect(() => {
    setProjects(getStoredProjects())
  }, [])

  const handleOpenCreateModal = () => {
    setEditingProject(null)
    setFormData({
      title: "",
      category: "residential",
      location: "Dhaka, Bangladesh",
      image: "/images/info1.jpg",
      description: "",
      fullDescription: "",
      clientName: "",
      completionYear: "2025",
      scopeOfWorkStr: "Space Planning, Custom Interior, Lighting",
      featured: false,
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (proj: Project) => {
    setEditingProject(proj)
    setFormData({
      title: proj.title,
      category: proj.category,
      location: proj.location,
      image: proj.image,
      description: proj.description,
      fullDescription: proj.fullDescription || "",
      clientName: proj.clientName || "",
      completionYear: proj.completionYear || "2025",
      scopeOfWorkStr: proj.scopeOfWork ? proj.scopeOfWork.join(", ") : "",
      featured: !!proj.featured,
    })
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    const scopeArray = formData.scopeOfWorkStr
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    let updatedList: Project[] = []

    if (editingProject) {
      // Edit mode
      updatedList = projects.map((p) => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            title: formData.title,
            category: formData.category,
            location: formData.location,
            image: formData.image || "/images/info1.jpg",
            description: formData.description,
            fullDescription: formData.fullDescription,
            clientName: formData.clientName,
            completionYear: formData.completionYear,
            scopeOfWork: scopeArray,
            featured: formData.featured,
          }
        }
        return p
      })
      setSuccessMsg(`Project "${formData.title}" updated successfully!`)
    } else {
      // Create mode
      const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1
      const newProj: Project = {
        id: newId,
        title: formData.title,
        category: formData.category,
        location: formData.location,
        image: formData.image || "/images/info1.jpg",
        description: formData.description,
        fullDescription: formData.fullDescription,
        clientName: formData.clientName,
        completionYear: formData.completionYear,
        scopeOfWork: scopeArray,
        featured: formData.featured,
      }
      updatedList = [newProj, ...projects]
      setSuccessMsg(`New project "${formData.title}" created successfully!`)
    }

    setProjects(updatedList)
    saveStoredProjects(updatedList)
    setIsModalOpen(false)

    setTimeout(() => setSuccessMsg(""), 4000)
  }

  const handleDelete = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = projects.filter((p) => p.id !== id)
      setProjects(updated)
      saveStoredProjects(updated)
      setSuccessMsg(`Project "${title}" deleted successfully.`)
      setTimeout(() => setSuccessMsg(""), 4000)
    }
  }

  const handleReset = () => {
    if (confirm("Reset all project gallery data to initial factory defaults?")) {
      const def = resetProjectsToDefault()
      setProjects(def)
      setSuccessMsg("Project gallery reset to default portfolio dataset.")
      setTimeout(() => setSuccessMsg(""), 4000)
    }
  }

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || p.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Admin Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-zinc-800 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a57c00]/20 border border-[#a57c00]/40 text-[#c99a00] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admin Settings Desk</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-white font-light">
              Project Gallery Manager
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Control, add, edit, and reorder projects displayed on the public portfolio page.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/projects#project-gallery" target="_blank">
              <Button variant="outline" className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 text-xs">
                <Eye className="w-4 h-4 mr-2 text-[#a57c00]" />
                Preview Live Gallery
              </Button>
            </Link>

            <Button onClick={handleReset} variant="outline" className="border-zinc-800 text-zinc-400 hover:bg-red-950/40 hover:text-red-400 text-xs">
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset Defaults
            </Button>

            <Button onClick={handleOpenCreateModal} className="bg-[#a57c00] hover:bg-[#c99a00] text-white font-semibold text-xs rounded-lg px-4 py-2.5 shadow-lg shadow-[#a57c00]/20">
              <Plus className="w-4 h-4 mr-1.5" />
              Add New Project
            </Button>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </motion.div>
        )}

        {/* Dashboard Metric Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Total Projects</span>
            <div className="text-3xl font-serif font-light text-white mt-2">{projects.length}</div>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Residential</span>
            <div className="text-3xl font-serif font-light text-[#a57c00] mt-2">
              {projects.filter((p) => p.category === "residential").length}
            </div>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Commercial</span>
            <div className="text-3xl font-serif font-light text-blue-400 mt-2">
              {projects.filter((p) => p.category === "commercial").length}
            </div>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Featured</span>
            <div className="text-3xl font-serif font-light text-emerald-400 mt-2">
              {projects.filter((p) => p.featured).length}
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#a57c00]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {["all", "residential", "commercial", "renovation", "furniture"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  categoryFilter === cat
                    ? "bg-[#a57c00] text-zinc-950 font-semibold"
                    : "bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={project.image || "/images/info1.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-700 text-[#a57c00] px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider">
                    {project.category}
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-[#a57c00] text-zinc-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg font-medium text-white line-clamp-1">{project.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-[#a57c00]" />
                    <span>{project.location}</span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mt-2">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-zinc-950/60 border-t border-zinc-800 flex items-center justify-between">
                <Button
                  onClick={() => handleOpenEditModal(project)}
                  variant="outline"
                  className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 text-xs px-3 py-1.5 h-auto"
                >
                  <Edit3 className="w-3.5 h-3.5 mr-1.5 text-[#a57c00]" />
                  Edit Project
                </Button>

                <Button
                  onClick={() => handleDelete(project.id, project.title)}
                  variant="outline"
                  className="border-red-950/50 bg-red-950/20 text-red-400 hover:bg-red-900/40 text-xs px-3 py-1.5 h-auto"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800">
            <p className="text-zinc-400">No projects match your search or category filter.</p>
          </div>
        )}

      </div>

      {/* Modal Form for Create / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 text-white rounded-3xl p-6 md:p-8 shadow-2xl z-10 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <h2 className="font-serif text-2xl font-light text-white">
                {editingProject ? `Edit Project #${editingProject.id}` : "Add New Gallery Project"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Modern Minimalist Penthouse"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#a57c00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#a57c00]"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovation">Renovation</option>
                    <option value="furniture">Furniture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Gulshan, Dhaka, Bangladesh"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#a57c00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Main Image Path / URL *
                </label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/info1.jpg or /banner/Banner15.jpeg"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#a57c00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Short Card Summary *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary displayed on portfolio grid card..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#a57c00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Full Project Detail Narrative
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed project story shown inside the 1-click modal view..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#a57c00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Private Villa Owner"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#a57c00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    value={formData.completionYear}
                    onChange={(e) => setFormData({ ...formData, completionYear: e.target.value })}
                    placeholder="e.g. 2025"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#a57c00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Scope of Work (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.scopeOfWorkStr}
                  onChange={(e) => setFormData({ ...formData, scopeOfWorkStr: e.target.value })}
                  placeholder="e.g. Space Planning, Marble Wall Crafting, Lighting Architecture"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#a57c00]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#a57c00] rounded"
                />
                <label htmlFor="featured" className="text-xs font-medium text-zinc-300">
                  Mark as Featured Project
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-800">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                  className="border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#a57c00] hover:bg-[#c99a00] text-white font-semibold px-6"
                >
                  {editingProject ? "Save Changes" : "Create Project"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  )
}
