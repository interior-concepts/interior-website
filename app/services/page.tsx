import type { Metadata } from "next"
import { AboutCTA } from "@/components/about/about-cta";
import { PartnersSection } from "@/components/home/partners-section";
import { ProcessSection } from "@/components/home/process-section";
import { ProjectSection } from "@/components/home/projects-section";
import { CommercialCTA } from "@/components/service/commercial/cta";
import { ServiceHero } from "@/components/service/service-hero";
import { ServicesSection } from "@/components/home/services-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { TrustFiguresSection } from "@/components/home/trust-figure-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Interior Design Services in Bangladesh",
  description:
    "Explore residential, commercial, and architectural interior design services in Bangladesh by Interior Concepts Studio.",
  alternates: {
    canonical: "/services",
  },
}


export default function ServicePage() {
  return (
    <main className="bg-[#f9f7f4]">
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
    
      <ServiceHero/>
    <ServicesSection/>
      <ProcessSection/>
      {/* <ProjectSection/> */}
      <PartnersSection/>
      <TrustFiguresSection/>
      {/* <TestimonialsSection/> */}
      <CommercialCTA/>
      

    </main>
  )
}
