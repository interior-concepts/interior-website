"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, ArrowUpRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Project } from "@/lib/projects-data"

interface ProjectCardProps {
  project: Project
  index: number
  spanClass?: string
  onClick?: (project: Project) => void
}

export function ProjectCard({ project, index, spanClass = "", onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
      onClick={() => onClick && onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 h-[380px] sm:h-[420px] md:h-[460px] w-full bg-zinc-900 border border-black/10",
        spanClass
      )}
    >
      {/* 100% Full Edge-to-Edge Image */}
      <Image
        src={project.image || "/placeholder.svg"}
        alt={`${project.title} in ${project.location}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 100vw"
        className={cn(
          "w-full h-full object-cover transition-transform duration-700 ease-out",
          isHovered ? "scale-108" : "scale-100"
        )}
      />

      {/* Quiet Default Bottom Label (Visible when NOT hovered) */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 pointer-events-none z-10 flex items-center justify-between",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      >
        <div>
          <span className="text-[#a57c00] text-xs uppercase tracking-widest font-semibold block mb-0.5">
            {project.category}
          </span>
          <h3 className="font-serif text-xl font-light text-white drop-shadow-md">
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-white/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10">
          <MapPin className="w-3 h-3 text-[#a57c00]" />
          <span>{project.location}</span>
        </div>
      </div>

      {/* Hover Overlay Reveal (Fades & slides in on Hover) */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 p-6 md:p-8 flex flex-col justify-end transition-all duration-500 z-20",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-[#a57c00] text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
              {project.category}
            </span>
            {project.featured && (
              <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#a57c00]" /> Featured
              </span>
            )}
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-light text-white leading-tight">
            {project.title}
          </h3>

          <div className="flex items-center gap-2 text-xs md:text-sm text-white/80">
            <MapPin className="w-4 h-4 text-[#a57c00]" />
            <span>{project.location}</span>
            {project.completionYear && (
              <span className="text-white/60">• Completed {project.completionYear}</span>
            )}
          </div>

          <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-3 font-light">
            {project.description}
          </p>

          <div className="pt-2 flex items-center text-xs md:text-sm font-semibold text-[#a57c00] tracking-wider uppercase">
            <span>Click to View Full Project Details</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5" />
          </div>
        </div>
      </div>

    </motion.div>
  )
}
