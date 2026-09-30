"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export function AppointmentSection() {
  const router = useRouter()

  return (
    <section className="py-20 lg:py-32 bg-[#0d3d3d] text-white relative overflow-hidden">
      {/* Background Image with low opacity */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/banner/banner17.jpeg"
          alt="Interior design background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-[#0d3d3d]/50" />
      </div>

      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a57c00]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#a57c00]/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-white/5 border border-white/10 p-10 md:p-16 lg:p-20 backdrop-blur-sm shadow-2xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#a57c00] font-medium">
              <Sparkles className="w-4 h-4" />
              Book Your Appointment
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-white text-balance drop-shadow-md">
              Let's design your space together.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/90 leading-relaxed drop-shadow">
              Whether you are planning a luxury home, a complete structural renovation, or a contemporary commercial space, our senior design team is ready to guide you.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                onClick={() => router.push("/contact")}
                className="bg-[#a57c00] text-white hover:bg-[#c99a00] rounded-full px-8 py-6 text-sm font-semibold transition-all duration-300 shadow-lg shadow-[#a57c00]/30"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book a Private Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
