import type { Metadata } from "next"
import { AboutHero } from "@/components/about/about-hero"
import { OurPhilosophy } from "@/components/about/our-philosophy"
import { OurStory } from "@/components/about/our-story"
import { AboutCTA } from "@/components/about/about-cta"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "About Us | Interior Design Studio",
  description:
    "Learn about our interior design philosophy and story. We craft functional and timeless interiors that reflect your lifestyle.",
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
    
      <AboutHero />
      <OurPhilosophy />
      <OurStory />
      <AboutCTA />
    </main>
  )
}
