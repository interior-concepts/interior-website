"use client"

import { useEffect, useRef, useState } from "react"
import { Compass, Users, ClipboardCheck, Shield, Ruler, Sparkles } from "lucide-react"

const teamMembers = [
  {
    title: "Lead Design Architect",
    role: "Creative Direction",
    description:
      "Shapes the entire design vision — translating your lifestyle, aspirations, and personality into breathtaking interiors that feel distinctly yours.",
    icon: Compass,
    highlight: "Concept to Blueprint",
  },
  {
    title: "Client Experience Manager",
    role: "Client Relations",
    description:
      "Your single point of contact throughout the project. Ensures seamless communication, timely updates, and that every decision reflects your needs.",
    icon: Users,
    highlight: "End-to-End Support",
  },
  {
    title: "Site Execution Lead",
    role: "On-Site Delivery",
    description:
      "Commands the on-ground team with precision — managing timelines, quality control, and the 51-point inspection that guarantees a flawless handover.",
    icon: ClipboardCheck,
    highlight: "51-Point QC",
  },
  {
    title: "Material Specialist",
    role: "Sourcing & Finishes",
    description:
      "Curates premium materials, textures, and finishes that align with your design concept and long-term durability requirements.",
    icon: Ruler,
    highlight: "Premium Sourcing",
  },
  {
    title: "Quality Assurance Lead",
    role: "Standards & Compliance",
    description:
      "Monitors every phase of production and installation against our quality benchmarks to ensure zero-compromise delivery.",
    icon: Shield,
    highlight: "Zero Compromise",
  },
  {
    title: "Interior Stylist",
    role: "Final Curation",
    description:
      "The finishing artist who assembles décor, lighting, and accessories to bring your space to life — ready for the handover photoshoot.",
    icon: Sparkles,
    highlight: "Perfect Finish",
  },
]

export function TeamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#faf9f6]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block text-xs font-sans tracking-[0.35em] uppercase font-semibold text-[#a57c00] mb-5">
            Your Dedicated Team
          </span>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#a57c00]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#a57c00]" />
            <div className="h-px w-12 bg-[#a57c00]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#0d3d3d] mb-4 text-balance">
            The People Behind Your Space
          </h2>
          <p className="text-[#4a4a4a] font-sans text-base max-w-xl mx-auto leading-relaxed">
            A hand-picked team of professionals — each an expert in their discipline — working together to deliver
            an interior that exceeds expectations.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={member.title}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`relative rounded-2xl p-7 border-2 cursor-pointer h-full transition-all duration-400 overflow-hidden ${
                  hoveredIndex === index
                    ? "border-[#0d3d3d] bg-[#0d3d3d] shadow-2xl shadow-[#0d3d3d]/15 -translate-y-2"
                    : "border-gray-100 bg-white hover:border-[#0d3d3d]/20"
                }`}
              >
                {/* Watermark number */}
                <span
                  className={`absolute -top-4 -right-2 text-8xl font-serif font-bold select-none pointer-events-none transition-all duration-400 ${
                    hoveredIndex === index ? "text-white/[0.06]" : "text-[#0d3d3d]/[0.04]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-400 ${
                    hoveredIndex === index ? "bg-[#a57c00] scale-110 rotate-3" : "bg-[#f5f2ee]"
                  }`}
                >
                  <member.icon
                    className={`w-7 h-7 transition-colors duration-300 ${
                      hoveredIndex === index ? "text-white" : "text-[#0d3d3d]"
                    }`}
                  />
                </div>

                {/* Role badge */}
                <p
                  className={`text-xs font-sans tracking-widest uppercase font-semibold mb-1.5 transition-colors duration-300 ${
                    hoveredIndex === index ? "text-[#a57c00]" : "text-[#a57c00]/70"
                  }`}
                >
                  {member.role}
                </p>

                {/* Title */}
                <h3
                  className={`text-lg font-serif font-light mb-3 transition-colors duration-300 ${
                    hoveredIndex === index ? "text-white" : "text-[#0d3d3d]"
                  }`}
                >
                  {member.title}
                </h3>

                {/* Divider */}
                <div
                  className={`w-8 h-0.5 mb-4 transition-all duration-400 ${
                    hoveredIndex === index ? "bg-[#a57c00] w-12" : "bg-gray-200"
                  }`}
                />

                {/* Description */}
                <p
                  className={`font-sans text-sm leading-relaxed transition-colors duration-300 ${
                    hoveredIndex === index ? "text-white/75" : "text-gray-500"
                  }`}
                >
                  {member.description}
                </p>

                {/* Highlight tag */}
                <div
                  className={`mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium transition-all duration-400 ${
                    hoveredIndex === index
                      ? "bg-[#a57c00]/20 text-[#a57c00]"
                      : "bg-[#0d3d3d]/5 text-[#0d3d3d]/60"
                  }`}
                >
                  <div className="w-1 h-1 rounded-full bg-current" />
                  {member.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
