"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { X, MapPin, Calendar, User, CheckCircle2, ArrowRight, Sparkles } from "lucide-react"
import { Project } from "@/lib/projects-data"
import { Button } from "@/components/ui/button"

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const router = useRouter()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (!project) return null

  const images = project.galleryImages && project.galleryImages.length > 0 
    ? project.galleryImages 
    : [project.image]

  const handleBookConsultation = () => {
    onClose()
    router.push(`/contact?project=${encodeURIComponent(project.title)}`)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-white text-[#0d3d3d] rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div className="overflow-y-auto flex-1 p-6 md:p-10 space-y-8">
            
            {/* Main Image Gallery Preview */}
            <div className="space-y-4">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-100 shadow-inner">
                <Image
                  src={images[activeImageIndex] || project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#0d3d3d] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {project.category}
                </div>
              </div>

              {/* Thumbnails if multiple images */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? "border-[#a57c00] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`${project.title} thumb ${idx}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Key Meta */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#a57c00] font-bold inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Project Showcase
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#0d3d3d] mt-1 font-light">
                {project.title}
              </h2>

              <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-black/70 pb-6 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#a57c00]" />
                  <span>{project.location}</span>
                </div>
                {project.completionYear && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#a57c00]" />
                    <span>Completed {project.completionYear}</span>
                  </div>
                )}
                {project.clientName && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#a57c00]" />
                    <span>Client: {project.clientName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description & Narrative */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-light text-[#0d3d3d]">Project Story</h3>
              <p className="text-black/70 leading-relaxed text-base">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Scope of Work */}
            {project.scopeOfWork && project.scopeOfWork.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="font-serif text-xl font-light text-[#0d3d3d]">Scope of Deliverables</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.scopeOfWork.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#a57c00]/5 border border-[#a57c00]/20 text-sm font-medium text-[#0d3d3d]">
                      <CheckCircle2 className="w-4 h-4 text-[#a57c00] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Box */}
            <div className="p-6 rounded-2xl bg-[#0d3d3d] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-xl font-light">Inspired by this project?</h4>
                <p className="text-xs text-white/70 mt-1">Book a consultation with our architects to create a custom space tailored for you.</p>
              </div>
              <Button
                onClick={handleBookConsultation}
                className="bg-[#a57c00] hover:bg-[#c99a00] text-white font-semibold rounded-full px-6 py-5 text-sm shrink-0"
              >
                <span>Inquire About Similar Design</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
