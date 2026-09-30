import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { InteractiveAppointmentDesk } from "@/components/contact/interactive-appointment-desk"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Contact Us | Interior Concepts Studio",
  description: "Get in touch with our design team. We're here to bring your interior design vision to life.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      
      <div className="pt-16 lg:pt-20">
        {/* Interactive Appointment Consultation Desk */}
        <InteractiveAppointmentDesk />

        {/* Contact Form and Information Grid */}
        <div id="contact-form" className="mx-auto max-w-7xl px-6 lg:px-8 py-12 md:py-16 border-t border-black/10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </main>
  )
}
