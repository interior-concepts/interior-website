"use client"

import { useState } from "react"
import { Users, BadgeCheck, Gem, Wrench, HeadphonesIcon } from "lucide-react"
import Image from "next/image"

const reasons = [
  {
    icon: Users,
    title: "Experienced designers and project managers",
  },
  {
    icon: BadgeCheck,
    title: "Transparent pricing and clear timelines",
  },
  {
    icon: Gem,
    title: "Quality materials and skilled craftsmanship",
  },
  {
    icon: Wrench,
    title: "One team from design to installation",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated after-sales support",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-sm uppercase tracking-widest text-[#a57c00]">Why Choose Us</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0d3d3d] text-balance">
              Designed with care. Built with precision.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              We don't just design interiors — we take responsibility for delivering them.
            </p>
            <div className="mt-10 space-y-6">
              {reasons.map((reason) => (
                <ReasonItem key={reason.title} reason={reason} />
              ))}
            </div>
          </div>
          <div>
            <Image
              src="/elegant-modern-kitchen-interior-with-marble-counte.jpg"
              alt="Elegant modern kitchen interior with marble countertop"
              width={1200}
              height={1600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-[400px] lg:h-[600px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ReasonItem({ reason }: { reason: (typeof reasons)[0] }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="flex items-center gap-4 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered ? "bg-[#a57c00] scale-110 rotate-12" : "bg-[#0d3d3d]/10"
        }`}
      >
        <reason.icon
          className={`h-5 w-5 transition-all duration-300 ${isHovered ? "text-white" : "text-[#0d3d3d]"}`}
          strokeWidth={1.5}
        />
      </div>
      <span className="text-foreground group-hover:text-[#0d3d3d] transition-colors">{reason.title}</span>
    </div>
  )
}
