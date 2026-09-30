"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Award, Clock, Star, Users } from "lucide-react"

const stats = [
  { target: 10, suffix: "+", label: "Years of Excellence", icon: Award },
  { target: 350, suffix: "+", label: "Projects Completed", icon: Star },
  { target: 627, suffix: "+", label: "Designs Delivered", icon: Clock },
  { target: 98, suffix: "%", label: "Client Satisfaction", icon: Users },
]

export function CtaSection() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [counters, setCounters] = useState(stats.map(() => 0))
  const sectionRef = useRef<HTMLElement>(null)
  const intervalsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.25 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const interval = setInterval(() => {
          setCounters((prev) => {
            const next = [...prev]
            if (next[index] < stat.target) {
              next[index] = Math.min(next[index] + Math.ceil(stat.target / 40), stat.target)
            } else {
              clearInterval(intervalsRef.current[index])
            }
            return next
          })
        }, 40)
        intervalsRef.current[index] = interval
      })
    }
    return () => intervalsRef.current.forEach((i) => clearInterval(i))
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle teal top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0d3d3d] to-transparent opacity-20" />

      {/* Background decorative shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#a57c00]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#0d3d3d]/4 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main CTA block */}
        <div
          className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block text-xs font-sans tracking-[0.35em] uppercase font-semibold text-[#a57c00] mb-5">
            Begin Your Transformation
          </span>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#a57c00]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#a57c00]" />
            <div className="h-px w-12 bg-[#a57c00]/40" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#0d3d3d] mb-6 text-balance leading-snug">
            Ready to Create Your
            <span className="block text-[#a57c00] italic mt-1">Perfect Interior?</span>
          </h2>
          <p className="text-[#4a4a4a] font-sans text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you&apos;re planning a dream home or transforming a commercial space, our senior design team is
            ready to guide you — every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => router.push("/contact")}
              className="bg-[#a57c00] text-white px-8 py-6 text-sm font-sans font-semibold rounded-full hover:bg-[#c99a00] transition-all duration-300 shadow-lg shadow-[#a57c00]/25 group"
            >
              Book a Private Consultation
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/contact")}
              className="px-8 py-6 text-sm font-sans font-semibold rounded-full border-2 border-[#0d3d3d] text-[#0d3d3d] hover:bg-[#0d3d3d] hover:text-white transition-all duration-300 bg-transparent group"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Us Now
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className={`group relative rounded-2xl p-6 border-2 text-center cursor-default transition-all duration-400 ${
                  hoveredStat === index
                    ? "border-[#a57c00]/40 bg-[#a57c00]/5 -translate-y-1 shadow-lg shadow-[#a57c00]/10"
                    : "border-gray-100 bg-[#faf9f6] hover:border-[#a57c00]/20"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Icon top right */}
                <div
                  className={`absolute top-4 right-4 transition-all duration-300 ${
                    hoveredStat === index ? "opacity-100 text-[#a57c00]" : "opacity-20 text-[#0d3d3d]"
                  }`}
                >
                  <stat.icon className="w-4 h-4" />
                </div>

                <p
                  className={`text-3xl md:text-4xl font-serif mb-1.5 transition-all duration-300 ${
                    hoveredStat === index ? "text-[#a57c00] scale-110" : "text-[#0d3d3d]"
                  }`}
                >
                  {counters[index]}
                  {stat.suffix}
                </p>
                <p className="text-gray-500 font-sans text-xs tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
