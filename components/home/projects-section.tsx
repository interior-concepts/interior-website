"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProjectFilter } from "../projects/project-filter"
import { ProjectCard } from "../projects/project-card"
import { ProjectDetailModal } from "../projects/project-detail-modal"
import { Sparkles, ArrowRight, FolderOpen } from "lucide-react"
import { Project, getStoredProjects } from "@/lib/projects-data"

const INITIAL_HOMEPAGE_COUNT = 10

const ROW_SPAN_PATTERNS = [
  "col-span-12 md:col-span-7",
  "col-span-12 md:col-span-5",
  "col-span-12 md:col-span-6",
  "col-span-12 md:col-span-6",
  "col-span-12",
  "col-span-12 md:col-span-5",
  "col-span-12 md:col-span-7",
  "col-span-12 md:col-span-6",
  "col-span-12 md:col-span-6",
  "col-span-12",
]

export function ProjectSection() {
  const [projectsList, setProjectsList] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const loadProjects = () => {
    setProjectsList(getStoredProjects())
  }

  useEffect(() => {
    loadProjects()

    const handleProjectsUpdated = () => {
      loadProjects()
    }

    window.addEventListener("projects-updated", handleProjectsUpdated)
    return () => {
      window.removeEventListener("projects-updated", handleProjectsUpdated)
    }
  }, [])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: projectsList.length,
      residential: 0,
      commercial: 0,
      renovation: 0,
      furniture: 0,
    }
    projectsList.forEach((p) => {
      const cat = p.category.toLowerCase()
      if (counts[cat] !== undefined) {
        counts[cat] += 1
      }
    })
    return counts
  }, [projectsList])

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projectsList
    return projectsList.filter(
      (project) => project.category.toLowerCase() === activeFilter.toLowerCase()
    )
  }, [projectsList, activeFilter])

  const displayedProjects = filteredProjects.slice(0, INITIAL_HOMEPAGE_COUNT)

  return (
    <section className="py-20 md:py-32 bg-[#faf9f6] text-[#0d3d3d] border-t border-black/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a57c00]/10 text-[#a57c00] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Featured Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#0d3d3d] text-balance">
            Explore Our Completed Works
          </h2>
          <p className="text-black/70 mt-4 text-base md:text-lg leading-relaxed text-balance">
            Discover our collection of {projectsList.length}+ completed projects across Bangladesh. Hover over any image to reveal details, or click to open full specifications.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mb-14">
          <ProjectFilter
            activeFilter={activeFilter}
            onFilterChange={(filter) => setActiveFilter(filter)}
            counts={categoryCounts}
          />
        </div>

        {/* Asymmetrical 12-Column Image Grid */}
        <motion.div layout className="grid grid-cols-12 gap-6 md:gap-8 items-start">
          <AnimatePresence>
            {displayedProjects.map((project, index) => {
              const spanClass = ROW_SPAN_PATTERNS[index % ROW_SPAN_PATTERNS.length]
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  spanClass={spanClass}
                  onClick={(proj) => setSelectedProject(proj)}
                />
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/10 max-w-xl mx-auto shadow-sm">
            <FolderOpen className="w-10 h-10 text-[#a57c00] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-2xl text-[#0d3d3d]">No Projects Found</h3>
            <p className="text-black/60 text-sm mt-1">Select another category to view our showcase.</p>
          </div>
        )}

        {/* Redirect to Full Projects Page */}
        <div className="flex justify-center mt-16">
          <Link href="/projects">
            <Button
              className="bg-[#0d3d3d] text-white hover:bg-[#092b2b] rounded-full px-10 py-6 text-sm font-semibold shadow-lg transition-all duration-300 group"
            >
              <span>Explore All Projects Portfolio</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

      </div>

      {/* One-Click Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
