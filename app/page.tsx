import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HomeHeroSection } from "@/components/home/home-hero-section"
import { AboutSection } from "@/components/home/about-section"
import { ProcessSection } from "@/components/home/process-section"
import { TrustFiguresSection } from "@/components/home/trust-figure-section"
import { ServicesSection } from "@/components/home/services-section"
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section"

import { VideoGallerySection } from "@/components/home/video-gallery-section"
import { AppointmentSection } from "@/components/home/appointment-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CtaSection } from "@/components/home/cta-section"
import { PartnersSection } from "@/components/home/partners-section"
import { Footer } from "@/components/footer"
import { ProjectSection } from "@/components/home/projects-section"
import { CommercialCTA } from "@/components/service/commercial/cta"
import { HowWeWorkHero } from "@/components/how-we-work/hero-section"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Home Interior Design in Bangladesh",
  description:
    "Home interior design in Bangladesh by Interior Concepts Studio. Residential and office interior planning, cost guidance, and full project execution.",
  keywords: [
    "home interior design in bangladesh",
    "interior design in bangladesh",
    "বাসা ইন্টেরিয়রের খরচ কত",
    "বাসা ইন্টেরিয়র করতে সর্বনিম্ন কত টাকা লাগবে",
    "অফিস ইন্টেরিয়র করতে কত টাকা লাগবে",
    "বাসার ইন্টেরিয়র বা অন্দরসজ্জা",
  ],
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <FaqJsonLd />
     
      <HomeHeroSection />
      <ProcessSection />
      <TrustFiguresSection />
      <ServicesSection />
      <ProjectSection />
      <PartnersSection />
    
      
      <AppointmentSection />
      {/* <TestimonialsSection /> */}
      <CtaSection />
    </main>
  )
}
