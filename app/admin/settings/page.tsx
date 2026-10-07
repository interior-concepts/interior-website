"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Eye,
  CheckCircle2,
  Search,
  X,
  Sparkles,
  Upload,
  Copy,
  ExternalLink,
  FileText,
  ImageIcon,
  Database,
  Check,
  Loader2,
  CloudUpload,
  MapPin,
  RefreshCw,
  Info,
  Star,
  Images,
  FolderPlus,
  SlidersHorizontal,
  ArrowRight,
  Building2,
  Home,
  Wrench,
  Sofa,
  CheckCheck,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Project,
  getStoredProjects,
  saveStoredProjects,
  resetProjectsToDefault,
} from "@/lib/projects-data"

interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: string
}

export default function AdminSettingsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  // Vercel Blob State
  const [blobs, setBlobs] = useState<BlobFile[]>([])
  const [isLoadingBlobs, setIsLoadingBlobs] = useState(false)
  const [isUploadingBlob, setIsUploadingBlob] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const modalMultipleFileInputRef = useRef<HTMLInputElement>(null)

  // Modal State for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isModalUploading, setIsModalUploading] = useState(false)
  const [manualPhotoUrl, setManualPhotoUrl] = useState("")

  // Active Tab: Projects vs Blob Storage
  const [activeTab, setActiveTab] = useState<"projects" | "blob">("projects")

  // Form State
  const [formData, setFormData] = useState<{
    title: string
    category: string
    location: string
    image: string
    galleryImages: string[]
    description: string
    fullDescription: string
    clientName: string
    completionYear: string
    scopeOfWorkStr: string
    featured: boolean
  }>({
    title: "",
    category: "residential",
    location: "Dhaka, Bangladesh",
    image: "",
    galleryImages: [],
    description: "",
    fullDescription: "",
    clientName: "",
    completionYear: "2025",
    scopeOfWorkStr: "Space Planning, Custom Interior, Lighting",
    featured: false,
  })

  useEffect(() => {
    setProjects(getStoredProjects())
    fetchBlobs()
  }, [])

  const fetchBlobs = async () => {
    setIsLoadingBlobs(true)
    try {
      const res = await fetch("/api/upload")
      if (res.ok) {
        const data = await res.json()
        if (data.blobs) {
          setBlobs(data.blobs)
        }
      }
    } catch (err) {
      console.error("Error fetching blobs:", err)
    } finally {
      setIsLoadingBlobs(false)
    }
  }

  // Upload single or multiple files to Vercel Blob
  const handleBlobMultipleFilesUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return

    setIsModalUploading(true)
    setUploadProgress(`Uploading ${files.length} photo(s) to Vercel Blob...`)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const data = new FormData()
        data.append("file", file)
        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        })
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}))
          throw new Error(errBody.error || `Failed to upload ${file.name}`)
        }
        return (await res.json()) as { url: string }
      })

      const results = await Promise.all(uploadPromises)
      const newUrls = results.map((r) => r.url).filter(Boolean)

      if (newUrls.length > 0) {
        setFormData((prev) => {
          const updatedGallery = [...prev.galleryImages, ...newUrls]
          const updatedMainImage = prev.image ? prev.image : newUrls[0]
          return {
            ...prev,
            image: updatedMainImage,
            galleryImages: updatedGallery,
          }
        })
        setSuccessMsg(`Successfully uploaded ${newUrls.length} photo(s) to Vercel Blob!`)
        fetchBlobs()
      }
    } catch (err: any) {
      console.error("Multiple upload error:", err)
      setErrorMsg(err.message || "Failed uploading photos to Blob store.")
      setTimeout(() => setErrorMsg(""), 6000)
    } finally {
      setIsModalUploading(false)
      setUploadProgress(null)
      setTimeout(() => setSuccessMsg(""), 5000)
    }
  }

  const handleBlobSingleFileUpload = async (file: File) => {
    if (!file) return

    setIsUploadingBlob(true)
    setUploadProgress(`Uploading ${file.name}...`)

    try {
      const data = new FormData()
      data.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to upload file to Vercel Blob")
      }

      const uploadedBlob = await res.json()

      if (uploadedBlob?.url) {
        setSuccessMsg(`File "${file.name}" uploaded to Vercel Blob successfully!`)
        fetchBlobs()
      }
    } catch (err: any) {
      console.error("Blob upload error:", err)
      setErrorMsg(err.message || "Upload failed. Please check your Vercel Blob connection token.")
      setTimeout(() => setErrorMsg(""), 6000)
    } finally {
      setIsUploadingBlob(false)
      setUploadProgress(null)
      setTimeout(() => setSuccessMsg(""), 5000)
    }
  }

  const handleDeleteBlob = async (blobUrl: string, pathname: string) => {
    if (!confirm(`Are you sure you want to delete "${pathname}" from Vercel Blob?`)) return

    try {
      const res = await fetch(`/api/upload?url=${encodeURIComponent(blobUrl)}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setSuccessMsg(`File deleted from Vercel Blob.`)
        setBlobs((prev) => prev.filter((b) => b.url !== blobUrl))
      } else {
        throw new Error("Failed to delete file")
      }
    } catch (err: any) {
      setErrorMsg("Could not delete blob file.")
      setTimeout(() => setErrorMsg(""), 4000)
    } finally {
      setTimeout(() => setSuccessMsg(""), 4000)
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 3000)
  }

  const handleOpenCreateModal = () => {
    setEditingProject(null)
    setFormData({
      title: "",
      category: "residential",
      location: "Dhaka, Bangladesh",
      image: "",
      galleryImages: [],
      description: "",
      fullDescription: "",
      clientName: "",
      completionYear: "2025",
      scopeOfWorkStr: "Space Planning, Custom Interior, Lighting Architecture",
      featured: false,
    })
    setManualPhotoUrl("")
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (proj: Project) => {
    setEditingProject(proj)
    const gallery = proj.galleryImages && proj.galleryImages.length > 0 
      ? proj.galleryImages 
      : (proj.image ? [proj.image] : [])

    setFormData({
      title: proj.title,
      category: proj.category,
      location: proj.location,
      image: proj.image,
      galleryImages: gallery,
      description: proj.description,
      fullDescription: proj.fullDescription || "",
      clientName: proj.clientName || "",
      completionYear: proj.completionYear || "2025",
      scopeOfWorkStr: proj.scopeOfWork ? proj.scopeOfWork.join(", ") : "",
      featured: !!proj.featured,
    })
    setManualPhotoUrl("")
    setIsModalOpen(true)
  }

  const handleAddManualPhoto = () => {
    if (!manualPhotoUrl.trim()) return
    const url = manualPhotoUrl.trim()
    setFormData((prev) => ({
      ...prev,
      image: prev.image ? prev.image : url,
      galleryImages: prev.galleryImages.includes(url) ? prev.galleryImages : [...prev.galleryImages, url],
    }))
    setManualPhotoUrl("")
  }

  const handleRemovePhoto = (urlToRemove: string) => {
    setFormData((prev) => {
      const newGallery = prev.galleryImages.filter((u) => u !== urlToRemove)
      const newMain = prev.image === urlToRemove ? (newGallery[0] || "") : prev.image
      return {
        ...prev,
        image: newMain,
        galleryImages: newGallery,
      }
    })
  }

  const handleSetCoverPhoto = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    const scopeArray = formData.scopeOfWorkStr
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    const mainCover = formData.image || (formData.galleryImages.length > 0 ? formData.galleryImages[0] : "/placeholder.svg")
    const fullGallery = formData.galleryImages.length > 0 ? formData.galleryImages : [mainCover]

    let updatedList: Project[] = []

    if (editingProject) {
      updatedList = projects.map((p) => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            title: formData.title,
            category: formData.category,
            location: formData.location,
            image: mainCover,
            galleryImages: fullGallery,
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
      const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1
      const newProj: Project = {
        id: newId,
        title: formData.title,
        category: formData.category,
        location: formData.location,
        image: mainCover,
        galleryImages: fullGallery,
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

  const handleClearAllProjects = () => {
    if (confirm("Are you sure you want to remove ALL projects from the codebase? This action will set project count to 0.")) {
      const emptyList = resetProjectsToDefault()
      setProjects(emptyList)
      setSuccessMsg("All projects removed successfully. Portfolio is now empty.")
      setTimeout(() => setSuccessMsg(""), 4000)
    }
  }

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      categoryFilter === "all" || p.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <main className="min-h-screen bg-[#071919] text-white pt-24 pb-28 font-sans selection:bg-[#a57c00] selection:text-white">
      {/* Subtle Background Glow Elements */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-[#a57c00]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#0d3d3d]/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Admin Header Section */}
        <div className="relative border-b border-white/10 pb-10 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#a57c00]/15 border border-[#a57c00]/30 text-[#e6c660] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#a57c00]" />
                <span>Interior Concepts Control Desk</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight">
                Project & Asset Management
              </h1>
              <p className="text-white/70 text-base sm:text-lg font-light max-w-2xl leading-relaxed">
                Add projects with multiple high-resolution photos uploaded directly to Vercel Blob Storage.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/projects#project-gallery" target="_blank">
                <Button className="bg-white/5 border border-white/15 text-white hover:bg-white/10 font-medium text-sm px-5 py-6 rounded-full transition-all flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#a57c00]" />
                  View Live Site
                </Button>
              </Link>

              <Button
                onClick={handleClearAllProjects}
                className="bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-900/60 hover:text-white font-medium text-sm px-5 py-6 rounded-full transition-all flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
                Clear All Projects
              </Button>

              <Button
                onClick={handleOpenCreateModal}
                className="bg-[#a57c00] hover:bg-[#c99a00] text-white font-semibold text-sm px-7 py-6 rounded-full shadow-lg hover:shadow-[#a57c00]/25 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
                New Project
              </Button>
            </div>
          </div>
        </div>

        {/* System Alert Messages */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-5 rounded-2xl bg-[#0d3d3d] border border-[#a57c00]/40 text-white font-medium text-sm flex items-center justify-between shadow-xl"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#a57c00] shrink-0" />
                <span>{successMsg}</span>
              </div>
              <button onClick={() => setSuccessMsg("")} className="text-white/60 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-5 rounded-2xl bg-red-950/70 border border-red-500/50 text-red-200 font-medium text-sm flex items-center justify-between shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button onClick={() => setErrorMsg("")} className="text-red-300 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Analytics & Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#a57c00] font-semibold block">
              Total Projects
            </span>
            <div className="text-3xl sm:text-4xl font-serif text-white font-light">
              {projects.length}
            </div>
            <p className="text-xs text-white/50">Active in database</p>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#a57c00] font-semibold block">
              Residential
            </span>
            <div className="text-3xl sm:text-4xl font-serif text-white font-light">
              {projects.filter((p) => p.category === "residential").length}
            </div>
            <p className="text-xs text-white/50">Homes & Villas</p>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#a57c00] font-semibold block">
              Commercial
            </span>
            <div className="text-3xl sm:text-4xl font-serif text-white font-light">
              {projects.filter((p) => p.category === "commercial").length}
            </div>
            <p className="text-xs text-white/50">Offices & Lounges</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0d3d3d] to-black border border-[#a57c00]/30 backdrop-blur-md space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#e6c660] font-semibold block flex items-center gap-1.5">
              <CloudUpload className="w-3.5 h-3.5 text-[#a57c00]" /> Vercel Blob
            </span>
            <div className="text-3xl sm:text-4xl font-serif text-white font-light">
              {blobs.length} <span className="text-xs font-sans text-white/50">files</span>
            </div>
            <p className="text-xs text-[#a57c00]/90">Cloud asset bucket</p>
          </div>
        </div>

        {/* Tab Selector: Projects vs Blob Storage */}
        <div className="flex items-center gap-3 border-b border-white/10 mb-10 pb-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center gap-2.5 ${
              activeTab === "projects"
                ? "bg-[#0d3d3d] text-white border border-[#a57c00]/50 shadow-md"
                : "bg-black/30 text-white/60 hover:text-white border border-white/5"
            }`}
          >
            <Database className="w-4 h-4 text-[#a57c00]" />
            <span>Portfolio Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("blob")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center gap-2.5 ${
              activeTab === "blob"
                ? "bg-[#0d3d3d] text-white border border-[#a57c00]/50 shadow-md"
                : "bg-black/30 text-white/60 hover:text-white border border-white/5"
            }`}
          >
            <CloudUpload className="w-4 h-4 text-[#a57c00]" />
            <span>Vercel Blob Bucket ({blobs.length})</span>
          </button>
        </div>

        {/* TAB 1: PORTFOLIO PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            {/* Filter & Search Controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search project title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#a57c00] transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                {["all", "residential", "commercial", "renovation", "furniture"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider capitalize transition-all shrink-0 ${
                      categoryFilter === cat
                        ? "bg-[#a57c00] text-white"
                        : "bg-white/5 text-white/70 hover:text-white border border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const photoCount = (project.galleryImages && project.galleryImages.length > 0)
                  ? project.galleryImages.length
                  : (project.image ? 1 : 0)

                return (
                  <div
                    key={project.id}
                    className="bg-black/50 border border-white/10 hover:border-[#a57c00]/60 rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xl"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/80 border-b border-white/10">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-[#0d3d3d]/90 backdrop-blur-md border border-white/15 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                          {project.category}
                        </div>

                        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/20 text-white/90 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                          <Images className="w-3.5 h-3.5 text-[#a57c00]" />
                          <span>{photoCount} Photos</span>
                        </div>

                        {project.featured && (
                          <div className="absolute top-4 right-4 bg-[#a57c00] text-white font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-md">
                            Featured
                          </div>
                        )}
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className="font-serif text-2xl font-light text-white leading-snug line-clamp-1">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-medium text-[#a57c00]">
                          <MapPin className="w-3.5 h-3.5 text-[#a57c00] shrink-0" />
                          <span>{project.location}</span>
                        </div>
                        <p className="text-sm text-white/70 line-clamp-2 leading-relaxed font-light pt-1">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-5 bg-black/80 border-t border-white/10 flex items-center justify-between gap-3">
                      <Button
                        onClick={() => handleOpenEditModal(project)}
                        className="flex-1 bg-[#0d3d3d] border border-white/15 text-white hover:bg-[#1a5a5a] font-medium text-xs py-2.5 h-auto rounded-full transition-all flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#a57c00]" />
                        Edit & Photos
                      </Button>

                      <Button
                        onClick={() => handleDelete(project.id, project.title)}
                        className="bg-white/5 border border-white/10 text-white/60 hover:text-red-400 hover:border-red-500/40 font-medium text-xs py-2.5 px-4 h-auto rounded-full transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-24 bg-black/30 rounded-3xl border border-white/10 space-y-4 max-w-xl mx-auto">
                <FolderPlus className="w-12 h-12 text-[#a57c00] mx-auto opacity-70" />
                <h3 className="font-serif text-2xl font-light text-white">No Projects Found</h3>
                <p className="text-sm font-light text-white/60 max-w-md mx-auto">
                  Your portfolio is currently empty. Click below to add a new interior project with photos on Vercel Blob!
                </p>
                <Button
                  onClick={handleOpenCreateModal}
                  className="bg-[#a57c00] hover:bg-[#c99a00] text-white font-semibold text-sm px-8 py-3 rounded-full transition-all shadow-lg mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Project
                </Button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: VERCEL BLOB ASSETS */}
        {activeTab === "blob" && (
          <div className="space-y-10">
            {/* Blob Upload Box */}
            <div className="bg-black/50 border border-white/10 rounded-3xl p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a57c00]/15 text-[#e6c660] text-xs font-semibold uppercase tracking-wider mb-2">
                    Vercel Blob Storage Integration
                  </div>
                  <h2 className="font-serif text-3xl font-light text-white">Cloud Storage Bucket</h2>
                  <p className="text-white/60 text-sm font-light mt-1">
                    Directly upload high-resolution images to Vercel Blob. Copy URLs instantly for use anywhere.
                  </p>
                </div>

                <Button
                  onClick={fetchBlobs}
                  disabled={isLoadingBlobs}
                  className="bg-white/5 border border-white/15 text-white hover:bg-white/10 font-medium text-xs px-5 py-3 rounded-full transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 mr-2 text-[#a57c00] ${isLoadingBlobs ? "animate-spin" : ""}`} />
                  Refresh Assets
                </Button>
              </div>

              {/* Drag and Drop Zone */}
              <div className="bg-white/5 border border-dashed border-white/20 hover:border-[#a57c00] rounded-2xl p-10 text-center transition-all">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleBlobSingleFileUpload(file)
                  }}
                />

                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#0d3d3d] border border-[#a57c00]/40 text-[#a57c00] flex items-center justify-center mx-auto shadow-lg">
                    <CloudUpload className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-white">Upload Asset to Vercel Blob</h3>
                    <p className="text-white/50 text-xs mt-1">
                      Supports JPG, PNG, WEBP images & files up to 50MB
                    </p>
                  </div>

                  {uploadProgress && (
                    <div className="flex items-center justify-center gap-2 text-white font-medium text-xs py-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#a57c00]" />
                      <span>{uploadProgress}</span>
                    </div>
                  )}

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingBlob}
                    className="bg-[#a57c00] hover:bg-[#c99a00] text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
                  >
                    {isUploadingBlob ? "Uploading..." : "Select File"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Blob File Cards */}
            <div>
              <h3 className="font-serif text-2xl font-light text-white mb-6">
                Uploaded Blob Assets ({blobs.length})
              </h3>

              {isLoadingBlobs ? (
                <div className="py-20 text-center text-white/50 font-light flex items-center justify-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-[#a57c00]" />
                  <span>Loading cloud assets...</span>
                </div>
              ) : blobs.length === 0 ? (
                <div className="p-12 text-center bg-black/30 rounded-3xl border border-white/10 text-white/50 font-light text-sm">
                  No files stored yet. Use the upload box above to add images.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blobs.map((blob) => {
                    const isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(blob.pathname)
                    return (
                      <div
                        key={blob.url}
                        className="bg-black/50 border border-white/10 hover:border-[#a57c00]/60 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all shadow-lg"
                      >
                        <div className="space-y-3">
                          {isImage ? (
                            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10">
                              <Image
                                src={blob.url}
                                alt={blob.pathname}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-video w-full rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                              <FileText className="w-10 h-10 text-white/40" />
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-medium text-white truncate" title={blob.pathname}>
                              {blob.pathname}
                            </p>
                            <p className="text-xs text-white/40 mt-1">
                              Size: {formatFileSize(blob.size)} • {new Date(blob.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                          <Button
                            onClick={() => handleCopyUrl(blob.url)}
                            className="flex-1 bg-white/10 text-white hover:bg-white/20 font-medium text-xs py-2 rounded-full transition-all flex items-center justify-center gap-1.5"
                          >
                            {copiedUrl === blob.url ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#a57c00]" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-[#a57c00]" />
                                Copy URL
                              </>
                            )}
                          </Button>

                          <a
                            href={blob.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/5 text-white hover:bg-white/15 border border-white/10"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <Button
                            onClick={() => handleDeleteBlob(blob.url, blob.pathname)}
                            className="p-2 rounded-full bg-white/5 text-white/60 hover:text-red-400 hover:border-red-500/40 border border-white/10"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* CREATE / EDIT PROJECT MODAL WITH MULTI-PHOTO BLOB UPLOAD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-4xl bg-[#091e1e] border border-[#a57c00]/40 text-white rounded-3xl p-6 md:p-10 shadow-2xl z-10 my-8">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#a57c00] font-semibold block mb-1">
                  Interior Concepts Portfolio Editor
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-white">
                  {editingProject ? `Edit Project #${editingProject.id}` : "Create New Project"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 flex items-center justify-center font-bold transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Luxury Minimalist Penthouse"
                  className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#a57c00] placeholder-white/30 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0d3d3d] border border-white/15 rounded-2xl px-5 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#a57c00] transition-colors"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovation">Renovation</option>
                    <option value="furniture">Furniture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Gulshan-1, Dhaka, Bangladesh"
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#a57c00] placeholder-white/30 transition-colors"
                  />
                </div>
              </div>

              {/* MULTIPLE PHOTOS & VERCEL BLOB UPLOADER */}
              <div className="space-y-4 p-6 bg-black/40 border border-white/10 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white uppercase tracking-wider">
                      Project Photos (Vercel Blob Storage)
                    </label>
                    <p className="text-xs text-white/60 font-light mt-0.5">
                      Select multiple photos to upload at once directly to Vercel Blob.
                    </p>
                  </div>

                  <input
                    type="file"
                    ref={modalMultipleFileInputRef}
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleBlobMultipleFilesUpload(e.target.files)
                      }
                    }}
                  />

                  <Button
                    type="button"
                    onClick={() => modalMultipleFileInputRef.current?.click()}
                    disabled={isModalUploading}
                    className="bg-[#a57c00] hover:bg-[#c99a00] text-white font-medium text-xs px-5 py-3 rounded-full shrink-0 transition-all shadow-md flex items-center gap-2"
                  >
                    {isModalUploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Uploading to Blob...
                      </>
                    ) : (
                      <>
                        <CloudUpload className="w-3.5 h-3.5" />
                        Upload Multiple Photos
                      </>
                    )}
                  </Button>
                </div>

                {uploadProgress && (
                  <div className="p-3 bg-[#0d3d3d] rounded-xl border border-white/10 text-xs text-white/80 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#a57c00]" />
                    <span>{uploadProgress}</span>
                  </div>
                )}

                {/* Manual URL input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={manualPhotoUrl}
                    onChange={(e) => setManualPhotoUrl(e.target.value)}
                    placeholder="Or paste photo URL manually..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#a57c00]"
                  />
                  <Button
                    type="button"
                    onClick={handleAddManualPhoto}
                    className="bg-white/10 text-white hover:bg-white/20 font-medium text-xs px-4 py-2.5 rounded-xl transition-all"
                  >
                    Add URL
                  </Button>
                </div>

                {/* Attached Gallery Photos */}
                <div className="pt-2">
                  <span className="text-xs uppercase tracking-wider text-[#a57c00] font-semibold block mb-3">
                    Attached Project Photos ({formData.galleryImages.length})
                  </span>

                  {formData.galleryImages.length === 0 ? (
                    <div className="p-6 text-center border border-dashed border-white/15 rounded-xl text-white/40 text-xs font-light">
                      No photos attached. Click "Upload Multiple Photos" above to select images.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {formData.galleryImages.map((imgUrl, index) => {
                        const isMain = formData.image === imgUrl
                        return (
                          <div
                            key={index}
                            className={`relative aspect-square rounded-xl overflow-hidden border bg-black group transition-all ${
                              isMain ? "border-[#a57c00] ring-2 ring-[#a57c00]/50" : "border-white/10 hover:border-white/30"
                            }`}
                          >
                            <Image src={imgUrl} alt={`Photo ${index + 1}`} fill className="object-cover" />
                            
                            {isMain && (
                              <div className="absolute top-1.5 left-1.5 bg-[#a57c00] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
                                Cover
                              </div>
                            )}

                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 p-1.5 transition-opacity">
                              {!isMain && (
                                <button
                                  type="button"
                                  onClick={() => handleSetCoverPhoto(imgUrl)}
                                  className="w-full bg-[#a57c00] text-white font-medium text-[10px] py-1 rounded-full hover:bg-[#c99a00] transition-all flex items-center justify-center gap-1"
                                >
                                  <Star className="w-3 h-3 fill-white" />
                                  Make Cover
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(imgUrl)}
                                className="w-full bg-red-600/90 text-white font-medium text-[10px] py-1 rounded-full hover:bg-red-600 transition-all flex items-center justify-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                Remove
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                  Short Card Summary *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary displayed on portfolio grid card..."
                  className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#a57c00] placeholder-white/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                  Full Project Detail Story
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed project narrative shown inside the detail modal..."
                  className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#a57c00] placeholder-white/30 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Private Villa Owner"
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#a57c00] placeholder-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    value={formData.completionYear}
                    onChange={(e) => setFormData({ ...formData, completionYear: e.target.value })}
                    placeholder="e.g. 2025"
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#a57c00] placeholder-white/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                  Scope of Work (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.scopeOfWorkStr}
                  onChange={(e) => setFormData({ ...formData, scopeOfWorkStr: e.target.value })}
                  placeholder="e.g. Space Planning, Marble Wall Crafting, Lighting Architecture"
                  className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#a57c00] placeholder-white/30 transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#a57c00] rounded cursor-pointer"
                />
                <label htmlFor="featured" className="text-sm font-medium text-white cursor-pointer">
                  Mark as Featured Project
                </label>
              </div>

              <div className="flex items-center justify-end gap-4 pt-8 border-t border-white/10">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white/5 border border-white/15 text-white/70 hover:text-white font-medium text-sm px-6 py-3.5 rounded-full transition-all"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#a57c00] hover:bg-[#c99a00] text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
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
