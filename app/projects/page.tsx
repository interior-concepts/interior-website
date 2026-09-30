import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { ProjectGallery } from "@/components/projects/project-gallery"
import { FeaturedProjects } from "@/components/projects/featured-projects"
import { ProjectCTA } from "@/components/projects/project-cta"
import { ProjectsHero } from "@/components/projects/project-hero"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Our Projects | Interior Concepts Studio",
  description:
    "Explore our portfolio of residential, commercial, and renovation projects. Every space tells a story of thoughtful design.",
  alternates: {
    canonical: "/projects",
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]} />
      <ProjectsHero />
      <ProjectGallery />
      <FeaturedProjects />
      <ProjectCTA />
    </main>
  )
}
