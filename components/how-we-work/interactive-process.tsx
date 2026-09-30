"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  MessageSquare,
  Users,
  PenTool,
  FileCheck,
  Receipt,
  Hammer,
  HardHat,
  Eye,
  CheckCircle,
  Camera,
  Home,
} from "lucide-react"

const iconMap = {
  "message-square": MessageSquare,
  users: Users,
  "pen-tool": PenTool,
  "file-check": FileCheck,
  receipt: Receipt,
  hammer: Hammer,
  "hard-hat": HardHat,
  eye: Eye,
  "check-circle": CheckCircle,
  camera: Camera,
  home: Home,
}

interface Step {
  title: string
  description: string
  icon: string
}

interface Stage {
  stageNumber: string
  title: string
  subtitle: string
  description: string
  steps: Step[]
  imageSrc: string
}

interface InteractiveProcessProps {
  stages: Stage[]
}

export function InteractiveProcess({ stages }: InteractiveProcessProps) {
  const [activeStage, setActiveStage] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observers = stages.map((_, index) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(index))
            setActiveStage(index)
          }
        },
        { threshold: 0.25 },
      )
    })

    sectionRefs.current.forEach((ref, index) => {
      if (ref) observers[index].observe(ref)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [stages])

  return (
    <div className="relative">
      {/* Sticky side nav — desktop only */}
      <div className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col items-center gap-1">
          {stages.map((stage, index) => (
            <button
              key={stage.stageNumber}
              onClick={() => sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" })}
              className="group relative flex flex-col items-center"
            >
              {/* Connector line */}
              {index < stages.length - 1 && (
                <div
                  className={`w-px h-6 transition-colors duration-500 ${
                    activeStage > index ? "bg-[#a57c00]" : "bg-gray-200"
                  }`}
                />
              )}
              {/* Dot */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-sans font-semibold border-2 transition-all duration-400 ${
                  activeStage === index
                    ? "bg-[#a57c00] border-[#a57c00] text-white scale-110 shadow-lg shadow-[#a57c00]/30"
                    : activeStage > index
                    ? "bg-[#0d3d3d] border-[#0d3d3d] text-white"
                    : "bg-white border-gray-200 text-gray-400 hover:border-[#0d3d3d]/40"
                }`}
              >
                {stage.stageNumber}
              </div>
              {/* Tooltip */}
              <div className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="text-xs font-sans bg-[#0d3d3d] text-white px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                  {stage.subtitle}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stage Sections */}
      {stages.map((stage, index) => (
        <section
          key={stage.stageNumber}
          id={`stage-${stage.stageNumber}`}
          ref={(el) => { sectionRefs.current[index] = el }}
          className={`py-20 md:py-28 overflow-hidden ${index % 2 === 0 ? "bg-white" : "bg-[#faf9f6]"}`}
        >
          <div className="container mx-auto px-6 lg:px-16">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>

              {/* ── Content ── */}
              <div
                className={`${index % 2 === 1 ? "lg:order-2" : ""} transition-all duration-700 ${
                  visibleSections.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                {/* Stage number watermark */}
                <div className="relative mb-8">
                  <span className="text-[110px] md:text-[160px] font-serif font-bold leading-none text-[#0d3d3d]/[0.04] absolute -top-6 -left-2 select-none pointer-events-none">
                    {stage.stageNumber}
                  </span>
                  <div className="relative">
                    <p className="text-xs font-sans tracking-[0.35em] uppercase font-semibold text-[#a57c00] mb-2">
                      Stage {stage.stageNumber} · {stage.subtitle}
                    </p>
                    {/* Gold accent */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-0.5 bg-[#a57c00]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#a57c00]" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-light text-[#0d3d3d] leading-snug">
                      {stage.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[#4a4a4a] font-sans text-base md:text-lg leading-relaxed mb-10">
                  {stage.description}
                </p>

                {/* Steps */}
                <div className="space-y-4">
                  {stage.steps.map((step, stepIndex) => (
                    <StepCard
                      key={stepIndex}
                      step={step}
                      index={stepIndex}
                      stageNumber={stage.stageNumber}
                    />
                  ))}
                </div>
              </div>

              {/* ── Image ── */}
              <div
                className={`${index % 2 === 1 ? "lg:order-1" : ""} transition-all duration-700 delay-200 ${
                  visibleSections.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                <ImageCard stage={stage} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

/* ─────────────── StepCard ─────────────── */
function StepCard({ step, index, stageNumber }: { step: Step; index: number; stageNumber: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = iconMap[step.icon as keyof typeof iconMap]

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-start gap-5 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-400 ${
        isHovered
          ? "border-[#0d3d3d] bg-[#0d3d3d] shadow-xl shadow-[#0d3d3d]/15 -translate-y-1"
          : "border-gray-100 bg-white hover:border-[#0d3d3d]/15"
      }`}
    >
      {/* Icon */}
      <div className={`relative flex-shrink-0 transition-all duration-400 ${isHovered ? "scale-110" : ""}`}>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-400 ${
            isHovered ? "bg-[#a57c00]" : "bg-[#f5f2ee]"
          }`}
        >
          {Icon ? (
            <Icon className={`w-5 h-5 transition-colors duration-300 ${isHovered ? "text-white" : "text-[#0d3d3d]"}`} />
          ) : (
            <span className={`font-sans font-semibold text-sm ${isHovered ? "text-white" : "text-[#0d3d3d]"}`}>
              {stageNumber}.{index + 1}
            </span>
          )}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 pt-0.5">
        <h4
          className={`font-sans font-semibold text-base mb-1.5 transition-colors duration-300 ${
            isHovered ? "text-white" : "text-[#0d3d3d]"
          }`}
        >
          {step.title}
        </h4>
        <p
          className={`font-sans text-sm leading-relaxed transition-colors duration-300 ${
            isHovered ? "text-white/75" : "text-gray-500"
          }`}
        >
          {step.description}
        </p>
      </div>

      {/* Arrow */}
      <div
        className={`absolute right-5 top-1/2 -translate-y-1/2 transition-all duration-300 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
        }`}
      >
        <svg className="w-5 h-5 text-[#a57c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  )
}

/* ─────────────── ImageCard ─────────────── */
function ImageCard({ stage }: { stage: Stage }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft glow */}
      <div
        className={`absolute -inset-4 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none ${
          isHovered ? "bg-[#a57c00]/15 opacity-100" : "bg-[#0d3d3d]/6 opacity-60"
        }`}
      />

      {/* Image frame */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-100">
        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-16 h-16 z-10 pointer-events-none">
          <div className="absolute top-4 left-0 w-10 h-0.5 bg-[#a57c00]" />
          <div className="absolute top-0 left-4 w-0.5 h-10 bg-[#a57c00]" />
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 z-10 pointer-events-none">
          <div className="absolute bottom-4 right-0 w-10 h-0.5 bg-[#a57c00]" />
          <div className="absolute bottom-0 right-4 w-0.5 h-10 bg-[#a57c00]" />
        </div>

        <Image
          src={stage.imageSrc || "/placeholder.svg"}
          alt={`${stage.title} — Interior Concepts Studio`}
          width={1200}
          height={900}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`w-full h-[400px] md:h-[500px] object-cover transition-all duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

        {/* Subtle overlay */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isHovered ? "bg-[#0d3d3d]/30" : "bg-[#0d3d3d]/10"
          }`}
        />

        {/* Stage badge — top right */}
        <div
          className={`absolute top-5 right-5 transition-all duration-400 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="bg-[#a57c00] text-white px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-widest uppercase shadow-lg">
            Stage {stage.stageNumber}
          </div>
        </div>

        {/* Bottom info card */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${
            isHovered ? "translate-y-0" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="backdrop-blur-md bg-white/92 rounded-xl p-4 border border-white/60 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-sans font-semibold text-[#a57c00] tracking-[0.25em] uppercase mb-0.5">
                  {stage.subtitle}
                </p>
                <p className="font-serif text-lg text-[#0d3d3d] leading-tight">{stage.title}</p>
              </div>
              <div
                className={`w-10 h-10 rounded-full bg-[#0d3d3d] flex items-center justify-center transition-all duration-500 ${
                  isHovered ? "rotate-45 bg-[#a57c00]" : ""
                }`}
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
