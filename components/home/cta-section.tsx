"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, CheckCircle } from "lucide-react"

const highlights = [
  "Free Initial Consultation",
  "51-Point Quality Inspection",
  "Complimentary Photoshoot",
]

export function CtaSection() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden min-h-[520px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/banner/Banner12.png"
          alt="Luxury interior design — Interior Concepts Studio"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center"
        />
        {/* Gradient overlay: strong on left for text, fades to semi-transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e2e]/92 via-[#0d3d3d]/80 to-[#0d3d3d]/50" />
      </div>

      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#a57c00] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-xl">
          {/* Label */}
          <span className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.3em] uppercase text-[#a57c00] mb-5">
            <span className="w-6 h-px bg-[#a57c00]" />
            Begin Your Journey
          </span>

          {/* Heading */}
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 text-balance">
            Your Dream Space
            <span className="block italic text-[#a57c00] mt-1">Starts Here.</span>
          </h2>

          {/* Description */}
          <p className="text-white/75 font-sans text-base md:text-lg leading-relaxed mb-8 max-w-md">
            From a single conversation to a stunning handover — we guide you through every stage with full transparency, expert craftsmanship, and zero compromise on quality.
          </p>

          {/* Highlights */}
          <ul className="space-y-2.5 mb-10">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/80 font-sans text-sm">
                <CheckCircle className="w-4 h-4 text-[#a57c00] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              onClick={() => router.push("/contact")}
              className="bg-[#a57c00] text-white hover:bg-[#c99a00] rounded-full px-8 py-6 text-sm font-semibold font-sans transition-all duration-300 shadow-lg shadow-[#a57c00]/30 group"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/contact")}
              className="rounded-full px-8 py-6 text-sm font-semibold font-sans border-2 border-white/40 text-white hover:bg-white hover:text-[#0d3d3d] transition-all duration-300 bg-transparent group"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Us Now
            </Button>
          </div>
        </div>
      </div>

      {/* Gold bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#a57c00] to-transparent" />
    </section>
  )
}
