import type { Metadata } from "next"
import { CTASection } from "@/components/service/residential-projects/cta-section";
import { ResedentialHero } from "@/components/service/residential-projects/resedential-hero";
import { ResidentialPortfolio } from "@/components/service/residential-projects/resedential-portfolio";
import { TrustSection } from "@/components/service/residential-projects/trust-section";
import { m } from "framer-motion";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
    title: "Residential Interior Design in Bangladesh",
    description: "Premium residential interior design services in Bangladesh for apartments and houses.",
    alternates: {
        canonical: "/services/residential",
    },
}

export default function ResidentialPage() {
    return(
        <main className="bg-[#f9f7f4]">
            <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Residential", path: "/services/residential" }]} />
            <ResedentialHero/>
            <ResidentialPortfolio/>
            <TrustSection/>
          
            
        </main>
    )
}
