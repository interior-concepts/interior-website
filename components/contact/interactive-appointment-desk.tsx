"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Home,
  Building2,
  RefreshCw,
  Video,
  MapPin,
  ShieldCheck,
  Star,
  Compass,
} from "lucide-react"

const PROJECT_TYPES = [
  {
    id: "residential",
    title: "Luxury Residential",
    icon: Home,
    badge: "Most Popular",
    description: "Bespoke interior design for luxury villas, apartments, and modern living spaces.",
    deliverables: ["Custom 3D Layout & Render", "Material Palette Selection", "Detailed Budget Breakdown"],
  },
  {
    id: "commercial",
    title: "Commercial & Office",
    icon: Building2,
    badge: "High Impact",
    description: "Corporate offices, retail flagships, and hospitality spaces optimized for performance.",
    deliverables: ["Spatial Flow Blueprint", "Brand Architecture", "Ergonomic Layout Plan"],
  },
  {
    id: "renovation",
    title: "Full Renovation",
    icon: RefreshCw,
    badge: "Transformation",
    description: "Complete structural makeover, space planning, and contemporary aesthetic upgrades.",
    deliverables: ["Structural Feasibility", "Before/After Visuals", "Timeline & Vendor Roadmap"],
  },
]

const CONSULTATION_MODES = [
  {
    id: "studio",
    title: "In-Studio Lounge",
    icon: MapPin,
    detail: "Experience materials & moodboards in person at our flagship studio.",
  },
  {
    id: "virtual",
    title: "Virtual 3D Call",
    icon: Video,
    detail: "Screen-share 3D concepts live with our senior architect team.",
  },
  {
    id: "onsite",
    title: "On-Site Assessment",
    icon: Compass,
    detail: "We visit your property for direct spatial measurement and evaluation.",
  },
]

const TIME_SLOTS = ["10:30 AM", "02:00 PM", "04:30 PM", "06:30 PM"]

export function InteractiveAppointmentDesk() {
  const [selectedProjectType, setSelectedProjectType] = useState("residential")
  const [selectedMode, setSelectedMode] = useState("studio")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("02:00 PM")

  const currentProject = PROJECT_TYPES.find((p) => p.id === selectedProjectType) || PROJECT_TYPES[0]

  const handleConfirm = () => {
    const contactFormEl = document.getElementById("contact-form")
    if (contactFormEl) {
      contactFormEl.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#0d3d3d] leading-tight text-balance">
            Book a Design Consultation
          </h2>
          <p className="mt-4 text-base md:text-lg text-black/70 max-w-3xl leading-relaxed">
            Select your project preferences below to customize your session with our principal design leads.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: 3 Selection Steps */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Step 1: Project Scope */}
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-black/10">
                <h3 className="font-serif text-2xl md:text-3xl font-light text-[#0d3d3d] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#a57c00]/15 text-[#a57c00] font-bold text-sm flex items-center justify-center">1</span>
                  Select Project Scope
                </h3>
                <span className="text-sm text-black/50 font-medium">Step 1 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PROJECT_TYPES.map((type) => {
                  const Icon = type.icon
                  const isSelected = selectedProjectType === type.id
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedProjectType(type.id)}
                      className={`relative flex flex-col justify-between p-5 rounded-2xl text-left transition-all border ${
                        isSelected
                          ? "bg-[#a57c00]/5 border-[#a57c00] text-[#0d3d3d] shadow-sm ring-1 ring-[#a57c00]"
                          : "bg-white border-black/10 text-black/70 hover:border-black/30"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-4 right-4 text-[#a57c00]">
                          <CheckCircle2 className="w-5 h-5 fill-[#a57c00] text-white" />
                        </span>
                      )}
                      <div>
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                          isSelected ? "bg-[#0d3d3d] text-white" : "bg-[#a57c00]/10 text-[#a57c00]"
                        }`}>
                          <Icon className="w-5.5 h-5.5" />
                        </div>
                        <h4 className="font-semibold text-[#0d3d3d] text-base md:text-lg">{type.title}</h4>
                      </div>
                      <span className="mt-4 text-xs font-semibold text-[#a57c00] uppercase tracking-wider">
                        {type.badge}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Consultation Format */}
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-black/10">
                <h3 className="font-serif text-2xl md:text-3xl font-light text-[#0d3d3d] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#a57c00]/15 text-[#a57c00] font-bold text-sm flex items-center justify-center">2</span>
                  Choose Consultation Format
                </h3>
                <span className="text-sm text-black/50 font-medium">Step 2 of 3</span>
              </div>

              <div className="space-y-4">
                {CONSULTATION_MODES.map((mode) => {
                  const ModeIcon = mode.icon
                  const isSelected = selectedMode === mode.id
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setSelectedMode(mode.id)}
                      className={`w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all border ${
                        isSelected
                          ? "bg-[#a57c00]/5 border-[#a57c00] text-[#0d3d3d] ring-1 ring-[#a57c00]"
                          : "bg-white border-black/10 text-black/70 hover:border-black/30"
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${isSelected ? "bg-[#0d3d3d] text-white" : "bg-[#a57c00]/10 text-[#a57c00]"}`}>
                        <ModeIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[#0d3d3d] text-base md:text-lg">{mode.title}</h4>
                          {isSelected && <span className="text-xs md:text-sm text-[#a57c00] font-bold">Selected</span>}
                        </div>
                        <p className="text-sm text-black/70 mt-1">{mode.detail}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 3: Time Slot */}
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-black/10">
                <h3 className="font-serif text-2xl md:text-3xl font-light text-[#0d3d3d] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#a57c00]/15 text-[#a57c00] font-bold text-sm flex items-center justify-center">3</span>
                  Select Preferred Time Slot
                </h3>
                <span className="text-sm text-black/50 font-medium">Step 3 of 3</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-4 px-4 rounded-xl text-sm md:text-base font-semibold border text-center transition-all ${
                        isSelected
                          ? "bg-[#0d3d3d] border-[#0d3d3d] text-white shadow-sm"
                          : "bg-white border-black/10 text-black/80 hover:border-black/30"
                      }`}
                    >
                      <Clock className="w-4 h-4 inline-block mr-2 -mt-0.5 opacity-80" />
                      {slot}
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Consultation Overview Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-[#0d3d3d] text-white rounded-3xl p-6 md:p-8 space-y-7 shadow-xl border border-black/10">
              
              <div className="flex items-center justify-between pb-5 border-b border-white/15">
                <div>
                  <span className="text-xs md:text-sm uppercase tracking-widest text-[#a57c00] font-bold">Session Overview</span>
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-white mt-1">Consultation Summary</h3>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold">
                  <Star className="w-4 h-4 fill-[#a57c00] text-[#a57c00]" />
                  <span>4.9 / 5.0</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProjectType + selectedMode + selectedTimeSlot}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="bg-black/25 rounded-2xl p-5 space-y-3.5 border border-white/10">
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-white/70">Project Scope:</span>
                      <span className="text-white font-semibold">{currentProject.title}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-white/70">Meeting Format:</span>
                      <span className="text-[#a57c00] font-bold">
                        {CONSULTATION_MODES.find((m) => m.id === selectedMode)?.title}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-white/70">Preferred Time:</span>
                      <span className="text-white font-semibold">{selectedTimeSlot}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs md:text-sm uppercase tracking-wider text-white/70 mb-3 font-semibold">What's Included:</h4>
                    <ul className="space-y-2.5">
                      {currentProject.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm md:text-base text-white/90">
                          <CheckCircle2 className="w-4 h-4 text-[#a57c00] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/10 border border-white/10 text-xs md:text-sm text-white/90 font-medium">
                      <ShieldCheck className="w-4 h-4 text-[#a57c00] shrink-0" />
                      <span>100% Free Consultation</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/10 border border-white/10 text-xs md:text-sm text-white/90 font-medium">
                      <Calendar className="w-4 h-4 text-[#a57c00] shrink-0" />
                      <span>Zero Obligation</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleConfirm}
                    className="w-full bg-[#a57c00] hover:bg-[#c99a00] text-white font-semibold rounded-xl py-6 text-base md:text-lg transition-all shadow-md"
                  >
                    <span>Proceed to Fill Details</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
