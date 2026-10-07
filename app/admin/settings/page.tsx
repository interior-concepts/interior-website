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
  const modalFileInputRef = useRef<HTMLInputElement>(null)

  // Modal State for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isModalUploading, setIsModalUploading] = useState(false)

  // Active Tab: Projects vs Blob Storage
  const [activeTab, setActiveTab] = useState<"projects" | "blob">("projects")

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

  const handleBlobFileUpload = async (file: File, isModal = false) => {
    if (!file) return

    if (isModal) {
      setIsModalUploading(true)
    } else {
      setIsUploadingBlob(true)
    }
    setUploadProgress(`Uploading ${file.name}...`)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to upload file to Vercel Blob")
      }

      const uploadedBlob = await res.json()

      if (uploadedBlob?.url) {
        if (isModal) {
          setFormData((prev) => ({ ...prev, image: uploadedBlob.url }))
          setSuccessMsg(`Image uploaded to Vercel Blob! URL set successfully.`)
        } else {
          setSuccessMsg(`File "${file.name}" uploaded to Vercel Blob successfully!`)
          fetchBlobs()
        }
      }
    } catch (err: any) {
      console.error("Blob upload error:", err)
      setErrorMsg(err.message || "Upload failed. Please check your Blob connection token.")
      setTimeout(() => setErrorMsg(""), 6000)
    } finally {
      setIsUploadingBlob(false)
      setIsModalUploading(false)
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
    if (confirm("Reset all project gallery data to initial defaults?")) {
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
    <main className="min-h-screen bg-black text-white pt-24 pb-24 font-sans border-t-2 border-white/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Admin Header Bar - Black & White High Contrast */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b-2 border-white/20 mb-10">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4" />
              <span>ADMIN CONTROL CENTER</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
              Project & Data Desk
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl font-medium mt-3 max-w-3xl leading-relaxed">
              Upload assets directly to Vercel Blob Storage, manage portfolio projects, and customize settings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/projects#project-gallery" target="_blank">
              <Button className="bg-zinc-900 border-2 border-white text-white hover:bg-white hover:text-black font-bold text-sm md:text-base px-5 py-3 rounded-xl transition-all">
                <Eye className="w-5 h-5 mr-2" />
                Live Gallery
              </Button>
            </Link>

            <Button
              onClick={handleReset}
              className="bg-black border-2 border-zinc-700 text-zinc-300 hover:border-white hover:text-white font-bold text-sm md:text-base px-5 py-3 rounded-xl transition-all"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Defaults
            </Button>

            <Button
              onClick={handleOpenCreateModal}
              className="bg-white text-black hover:bg-zinc-200 font-extrabold text-sm md:text-base px-6 py-3 rounded-xl shadow-xl transition-all"
            >
              <Plus className="w-5 h-5 mr-2 stroke-[3]" />
              Add New Project
            </Button>
          </div>
        </div>

        {/* Alerts & Notifications */}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 rounded-2xl bg-white text-black border-2 border-white font-bold text-base flex items-center justify-between shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 shrink-0 text-black fill-white" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg("")} className="text-black hover:opacity-70">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 rounded-2xl bg-zinc-900 text-white border-2 border-white font-bold text-base flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6 shrink-0 text-white" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg("")} className="text-white hover:opacity-70">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Metric Cards Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          <div className="bg-zinc-950 border-2 border-zinc-800 hover:border-white rounded-2xl p-6 transition-all">
            <span className="text-sm font-extrabold text-zinc-400 uppercase tracking-wider block">
              Total Projects
            </span>
            <div className="text-4xl md:text-5xl font-black text-white mt-2">
              {projects.length}
            </div>
          </div>

          <div className="bg-zinc-950 border-2 border-zinc-800 hover:border-white rounded-2xl p-6 transition-all">
            <span className="text-sm font-extrabold text-zinc-400 uppercase tracking-wider block">
              Residential
            </span>
            <div className="text-4xl md:text-5xl font-black text-white mt-2">
              {projects.filter((p) => p.category === "residential").length}
            </div>
          </div>

          <div className="bg-zinc-950 border-2 border-zinc-800 hover:border-white rounded-2xl p-6 transition-all">
            <span className="text-sm font-extrabold text-zinc-400 uppercase tracking-wider block">
              Commercial
            </span>
            <div className="text-4xl md:text-5xl font-black text-white mt-2">
              {projects.filter((p) => p.category === "commercial").length}
            </div>
          </div>

          <div className="bg-zinc-950 border-2 border-white rounded-2xl p-6 bg-gradient-to-br from-zinc-900 to-black transition-all">
            <span className="text-sm font-extrabold text-white uppercase tracking-wider block">
              Vercel Blob Storage
            </span>
            <div className="text-4xl md:text-5xl font-black text-white mt-2">
              {blobs.length} <span className="text-lg font-normal text-zinc-400">files</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs: Projects vs Vercel Blob */}
        <div className="flex items-center gap-3 border-b-2 border-zinc-800 mb-8 pb-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`text-lg md:text-xl font-extrabold px-6 py-3 rounded-xl transition-all flex items-center gap-2.5 ${
              activeTab === "projects"
                ? "bg-white text-black"
                : "bg-zinc-950 text-zinc-400 hover:text-white border-2 border-zinc-800"
            }`}
          >
            <Database className="w-5 h-5" />
            <span>Project Portfolio ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("blob")}
            className={`text-lg md:text-xl font-extrabold px-6 py-3 rounded-xl transition-all flex items-center gap-2.5 ${
              activeTab === "blob"
                ? "bg-white text-black"
                : "bg-zinc-950 text-zinc-400 hover:text-white border-2 border-zinc-800"
            }`}
          >
            <CloudUpload className="w-5 h-5" />
            <span>Vercel Blob Files ({blobs.length})</span>
          </button>
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === "projects" && (
          <div>
            {/* Search & Category Filter Toolbar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-zinc-950 p-5 rounded-2xl border-2 border-zinc-800">
              <div className="relative w-full md:w-96">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search projects by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border-2 border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-base font-medium text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                />
              </div>

              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
                {["all", "residential", "commercial", "renovation", "furniture"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-extrabold uppercase tracking-wider capitalize transition-all shrink-0 ${
                      categoryFilter === cat
                        ? "bg-white text-black"
                        : "bg-black text-zinc-300 hover:text-white border-2 border-zinc-800 hover:border-zinc-500"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-zinc-950 border-2 border-zinc-800 hover:border-white rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border-b-2 border-zinc-800">
                      <Image
                        src={project.image || "/images/info1.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-black/90 border-2 border-white text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
                        {project.category}
                      </div>
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-white text-black font-black px-3 py-1.5 rounded-lg text-xs uppercase tracking-widest">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-2xl font-bold text-white leading-tight line-clamp-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                        <MapPin className="w-4 h-4 text-white shrink-0" />
                        <span>{project.location}</span>
                      </div>
                      <p className="text-base text-zinc-300 line-clamp-3 leading-relaxed pt-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-5 bg-black border-t-2 border-zinc-800 flex items-center justify-between gap-3">
                    <Button
                      onClick={() => handleOpenEditModal(project)}
                      className="flex-1 bg-zinc-900 border-2 border-zinc-700 text-white hover:bg-white hover:text-black font-bold text-sm py-2.5 h-auto rounded-xl transition-all"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="bg-black border-2 border-zinc-800 text-zinc-400 hover:border-white hover:text-white font-bold text-sm py-2.5 px-4 h-auto rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20 bg-zinc-950 rounded-3xl border-2 border-zinc-800">
                <p className="text-xl font-bold text-zinc-400">No projects match your filter.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: VERCEL BLOB STORAGE MANAGER */}
        {activeTab === "blob" && (
          <div className="space-y-10">
            {/* Blob Connection Header Card */}
            <div className="bg-zinc-950 border-2 border-white rounded-3xl p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-2 border-zinc-800">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white text-black font-black text-xs uppercase tracking-widest mb-3">
                    VERCEL BLOB INTEGRATED
                  </div>
                  <h2 className="text-3xl font-extrabold text-white">Blob Store Manager</h2>
                  <p className="text-zinc-300 text-base mt-2">
                    Upload images and documents directly to your Vercel Blob storage bucket. Use generated URLs anywhere in your site!
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={fetchBlobs}
                    disabled={isLoadingBlobs}
                    className="bg-zinc-900 border-2 border-zinc-700 text-white hover:border-white font-bold text-sm px-5 py-3 rounded-xl transition-all"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingBlobs ? "animate-spin" : ""}`} />
                    Refresh Files
                  </Button>
                </div>
              </div>

              {/* Upload Box */}
              <div className="bg-black border-2 border-dashed border-zinc-700 hover:border-white rounded-2xl p-8 text-center transition-all">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleBlobFileUpload(file)
                  }}
                />

                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-xl">
                    <CloudUpload className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Upload New File to Blob</h3>
                    <p className="text-zinc-400 text-sm mt-1">
                      Images (PNG, JPG, WEBP), PDFs, or documents up to 50MB
                    </p>
                  </div>

                  {uploadProgress && (
                    <div className="flex items-center justify-center gap-2 text-white font-bold text-base py-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{uploadProgress}</span>
                    </div>
                  )}

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingBlob}
                    className="bg-white text-black hover:bg-zinc-200 font-extrabold text-base px-8 py-3.5 rounded-xl shadow-2xl transition-all"
                  >
                    {isUploadingBlob ? "Uploading File..." : "Select & Upload File"}
                  </Button>
                </div>
              </div>
            </div>

            {/* List of Blobs */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Uploaded Blob Assets ({blobs.length})
              </h3>

              {isLoadingBlobs ? (
                <div className="py-20 text-center text-zinc-400 font-bold flex items-center justify-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                  <span>Loading Vercel Blob assets...</span>
                </div>
              ) : blobs.length === 0 ? (
                <div className="p-12 text-center bg-zinc-950 rounded-3xl border-2 border-zinc-800 text-zinc-400 font-medium text-lg">
                  No files uploaded yet. Upload a file above to get started!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blobs.map((blob) => {
                    const isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(blob.pathname)
                    return (
                      <div
                        key={blob.url}
                        className="bg-zinc-950 border-2 border-zinc-800 hover:border-white rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all"
                      >
                        <div className="space-y-3">
                          {isImage ? (
                            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-zinc-800">
                              <Image
                                src={blob.url}
                                alt={blob.pathname}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-video w-full rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                              <FileText className="w-12 h-12 text-zinc-500" />
                            </div>
                          )}

                          <div>
                            <p className="text-base font-bold text-white truncate" title={blob.pathname}>
                              {blob.pathname}
                            </p>
                            <p className="text-xs font-semibold text-zinc-400 mt-1">
                              Size: {formatFileSize(blob.size)} • {new Date(blob.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="pt-3 border-t border-zinc-800 flex items-center gap-2">
                          <Button
                            onClick={() => handleCopyUrl(blob.url)}
                            className="flex-1 bg-white text-black hover:bg-zinc-200 font-extrabold text-xs py-2 rounded-lg transition-all"
                          >
                            {copiedUrl === blob.url ? (
                              <>
                                <Check className="w-3.5 h-3.5 mr-1" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 mr-1" />
                                Copy URL
                              </>
                            )}
                          </Button>

                          <a
                            href={blob.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <Button
                            onClick={() => handleDeleteBlob(blob.url, blob.pathname)}
                            className="p-2 rounded-lg bg-black text-zinc-400 hover:text-white hover:border-white border border-zinc-800"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* CREATE / EDIT PROJECT MODAL - BLACK & WHITE HIGH CONTRAST */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-3xl bg-black border-2 border-white text-white rounded-3xl p-6 md:p-10 shadow-2xl z-10 my-8">
            <div className="flex items-center justify-between pb-6 border-b-2 border-zinc-800 mb-8">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-1">
                  PORTFOLIO MODAL
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  {editingProject ? `Edit Project #${editingProject.id}` : "Add New Gallery Project"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-zinc-900 border-2 border-zinc-700 text-white hover:bg-white hover:text-black flex items-center justify-center font-bold transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-extrabold text-white uppercase tracking-wider mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Luxury Minimalist Penthouse"
                  className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-5 py-3.5 text-base font-semibold text-white focus:outline-none focus:border-white placeholder-zinc-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-extrabold text-white uppercase tracking-wider mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-5 py-3.5 text-base font-semibold text-white focus:outline-none focus:border-white"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovation">Renovation</option>
                    <option value="furniture">Furniture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-white uppercase tracking-wider mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Gulshan, Dhaka, Bangladesh"
                    className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-5 py-3.5 text-base font-semibold text-white focus:outline-none focus:border-white placeholder-zinc-500"
                  />
                </div>
              </div>

              {/* Main Image Input & Vercel Blob Uploader */}
              <div className="space-y-2">
                <label className="block text-sm font-extrabold text-white uppercase tracking-wider">
                  Main Image Path or Vercel Blob URL *
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/images/info1.jpg or https://...public.blob.vercel-storage.com/..."
                    className="flex-1 bg-zinc-950 border-2 border-zinc-700 rounded-xl px-5 py-3.5 text-base font-semibold text-white focus:outline-none focus:border-white placeholder-zinc-500"
                  />
                  <input
                    type="file"
                    ref={modalFileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleBlobFileUpload(file, true)
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => modalFileInputRef.current?.click()}
                    disabled={isModalUploading}
                    className="bg-white text-black hover:bg-zinc-200 font-extrabold text-sm px-5 py-3.5 rounded-xl shrink-0 transition-all"
                  >
                    {isModalUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Upload to Blob
                  </Button>
                </div>
                {formData.image && (
                  <div className="mt-3 relative aspect-video w-full max-w-xs rounded-xl overflow-hidden border-2 border-zinc-700 bg-zinc-950">
                    <Image src={formData.image} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-extrabold text-white uppercase tracking-wider mb-2">
                  Short Card Summary *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary displayed on portfolio grid card..."
                  className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-5 py-3.5 text-base font-semibold text-white focus:outline-none focus:border-white placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-white uppercase tracking-wider mb-2">
                  Full Project Detail Narrative
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed project story shown inside the modal view..."
                  className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-5 py-3.5 text-base font-semibold text-white focus:outline-none focus:border-white placeholder-zinc-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-extrabold text-white uppercase tracking-wider mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Private Villa Owner"
                    className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-5 py-3.5 text-base font-semibold text-white focus:outline-none focus:border-white placeholder-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-white uppercase tracking-wider mb-2">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    value={formData.completionYear}
                    onChange={(e) => setFormData({ ...formData, completionYear: e.target.value })}
                    placeholder="e.g. 2025"
                    className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-5 py-3.5 text-base font-semibold text-white focus:outline-none focus:border-white placeholder-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-white uppercase tracking-wider mb-2">
                  Scope of Work (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.scopeOfWorkStr}
                  onChange={(e) => setFormData({ ...formData, scopeOfWorkStr: e.target.value })}
                  placeholder="e.g. Space Planning, Marble Wall Crafting, Lighting Architecture"
                  className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-5 py-3.5 text-base font-semibold text-white focus:outline-none focus:border-white placeholder-zinc-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 accent-white rounded cursor-pointer"
                />
                <label htmlFor="featured" className="text-base font-extrabold text-white cursor-pointer">
                  Mark as Featured Project
                </label>
              </div>

              <div className="flex items-center justify-end gap-4 pt-8 border-t-2 border-zinc-800">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-zinc-950 border-2 border-zinc-700 text-zinc-300 hover:text-white font-bold text-base px-6 py-3.5 rounded-xl transition-all"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-white text-black hover:bg-zinc-200 font-extrabold text-base px-8 py-3.5 rounded-xl shadow-2xl transition-all"
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
