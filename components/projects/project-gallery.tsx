"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectFilter } from "./project-filter"
import { ProjectCard } from "./project-card"
import { ProjectDetailModal } from "./project-detail-modal"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Search, FolderOpen, Sparkles } from "lucide-react"
import { Project, getStoredProjects } from "@/lib/projects-data"

const INITIAL_DISPLAY_COUNT = 10

// Asymmetrical row span pattern: mix of 2-image rows, 1-image full-width rows, and wide/narrow pairs
const ROW_SPAN_PATTERNS = [
  "col-span-12 md:col-span-7", // Row 1: Image 1 (Wide - 2 per row)
  "col-span-12 md:col-span-5", // Row 1: Image 2 (Narrow)
  "col-span-12 md:col-span-6", // Row 2: Image 3 (Equal - 2 per row)
  "col-span-12 md:col-span-6", // Row 2: Image 4 (Equal)
  "col-span-12",              // Row 3: Image 5 (1 Full-Width Image!)
  "col-span-12 md:col-span-5", // Row 4: Image 6 (Narrow - 2 per row)
  "col-span-12 md:col-span-7", // Row 4: Image 7 (Wide)
  "col-span-12 md:col-span-6", // Row 5: Image 8 (Equal - 2 per row)
  "col-span-12 md:col-span-6", // Row 5: Image 9 (Equal)
  "col-span-12",              // Row 6: Image 10 (1 Full-Width Image!)
]

export function ProjectGallery() {
  const [projectsList, setProjectsList] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAll, setShowAll] = useState(false)
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

  // Dynamic category counts
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

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      const matchesCategory =
        activeFilter === "all" || project.category.toLowerCase() === activeFilter.toLowerCase()
      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [projectsList, activeFilter, searchQuery])

  // Display initial 10 projects or show all if expanded
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_DISPLAY_COUNT)
  const hasMoreProjects = filteredProjects.length > INITIAL_DISPLAY_COUNT

  return (
    <section id="project-gallery" className="py-20 md:py-32 bg-[#faf9f6] text-[#0d3d3d] border-t border-black/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a57c00]/10 text-[#a57c00] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#0d3d3d] text-balance">
            Explore Our Architectural & Interior Projects
          </h2>
          <p className="text-black/70 mt-4 text-base md:text-lg leading-relaxed text-balance">
            Discover our showcase of {projectsList.length}+ completed spaces. Hover over any image to reveal project scope, or click to open full details.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-6 mb-14">
          {/* Light Theme Category Pills */}
          <ProjectFilter
            activeFilter={activeFilter}
            onFilterChange={(filter) => {
              setActiveFilter(filter)
              setShowAll(false)
            }}
            counts={categoryCounts}
          />

          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              placeholder="Search by space title or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-black/15 rounded-full pl-11 pr-4 py-2.5 text-sm text-[#0d3d3d] focus:outline-none focus:border-[#0d3d3d] shadow-sm"
            />
          </div>
        </div>

        {/* Asymmetrical 12-Column Image Grid (Alternating 2 images per row & 1 image full-width) */}
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
            <p className="text-black/60 text-sm mt-1">Try searching for a different keyword or selecting another category.</p>
          </div>
        )}

        {/* Show More Button (Appears after 10 projects if more exist) */}
        {hasMoreProjects && (
          <div className="flex justify-center mt-16">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="bg-[#0d3d3d] text-white hover:bg-[#092b2b] border-none font-semibold text-sm rounded-full px-10 py-6 shadow-lg transition-all duration-300"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Show More ({filteredProjects.length - INITIAL_DISPLAY_COUNT} More Projects){" "}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Project Counter */}
        <div className="text-center mt-6">
          <p className="text-black/50 text-xs">
            Showing {displayedProjects.length} of {filteredProjects.length} projects
          </p>
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
