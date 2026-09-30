import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/service/architectural/cta'
import { Process } from '@/components/service/architectural/process'
import { DesignTypes } from '@/components/service/architectural/design-type'
import { ServiceOverview } from '@/components/service/architectural/service-overview'
import { FeaturedProject } from '@/components/service/architectural/featured-project'
import { Portfolio } from '@/components/service/architectural/protfolio'
import { ArchitecturalHero,  } from '@/components/service/architectural/hero'
import { ArchitecturalPortfolio } from '@/components/service/architectural/portfolio'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Architectural Interior Design in Bangladesh',
  description: 'Architectural interior design services in Bangladesh with planning, detailing, and execution support.',
  alternates: {
    canonical: '/services/architectural',
  },
}


export default function CommercialServicePage() {
  return (
    <main className="bg-[#f9f7f4]">
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Architectural', path: '/services/architectural' }]} />
    
      
      {/* 1. Hero Section */}
  <ArchitecturalHero/>
      

      {/* 2. Portfolio Section */}
     <ArchitecturalPortfolio/>
      
      {/* 3. Featured Project Section */}
      <FeaturedProject />
      
      {/* 4. Architectural Service Overview */}
      <ServiceOverview />
      
      {/* 5. Types of Architect Design */}
      <DesignTypes />
      
      {/* 6. Our Process (Interior) */}
      <Process />
      
      {/* 7. CTA Section */}
      <CTA />
      

    </main>
  )
}
