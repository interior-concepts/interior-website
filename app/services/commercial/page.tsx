import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CommercialHero } from '@/components/service/commercial/commercialHero'
import { CommercialPortfolio } from '@/components/service/commercial/commercialPortfolio'
import { CommercialFeaturedProject } from '@/components/service/commercial/featured-project'
import { CommercialProcess } from '@/components/service/commercial/commercialProcess'
import { CommercialCTA } from '@/components/service/commercial/cta'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Commercial Interior Design in Bangladesh',
  description: 'Commercial and office interior design in Bangladesh for productive and brand-aligned workplaces.',
  alternates: {
    canonical: '/services/commercial',
  },
}


export default function CommercialServicePage() {
  return (
    <main className="bg-[#f9f7f4]">
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Commercial', path: '/services/commercial' }]} />
      
      {/* 1. Hero Section */}
      <CommercialHero />
      
      {/* 2. Portfolio Section */}
      <CommercialPortfolio />
      
      {/* 3. Featured Project Section */}
      <CommercialFeaturedProject />
      
      {/* 4. Our Process (Commercial) */}
      <CommercialProcess />
      
      {/* 5. CTA Section */}
      <CommercialCTA />
      
   
    </main>
  )
}
