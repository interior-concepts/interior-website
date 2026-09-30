import type { Metadata } from "next"
import { StagesIntro } from "@/components/how-we-work/stages-intro"
import { InteractiveProcess } from "@/components/how-we-work/interactive-process"
import { TeamSection } from "@/components/how-we-work/team-section"
import { CtaSection } from "@/components/how-we-work/cta-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HowWeWorkHero } from "@/components/how-we-work/hero-section"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "How We Work | Interior Concepts Studio",
  description:
    "Discover our meticulous 5-stage design process — from your first consultation to a complimentary photoshoot handover. We craft luxurious interiors with precision, transparency, and care.",
  alternates: {
    canonical: "/how-we-work",
  },
}

const stages = [
  {
    stageNumber: "01",
    title: "We Start With Listening",
    subtitle: "Initial Connection",
    description:
      "Great design begins with deep understanding. We take time to truly listen — learning about your lifestyle, aesthetic preferences, functional needs, and long-term aspirations before a single line is drawn.",
    steps: [
      {
        title: "Share Your Vision",
        description:
          "Complete our thoughtfully crafted discovery form — giving us a window into your world, your tastes, inspirations, must-haves, and spatial goals.",
        icon: "message-square",
      },
      {
        title: "Private Design Consultation",
        description:
          "A senior design consultant meets with you personally to explore your brief in depth, present relevant portfolio work, discuss package options, and establish a realistic initial budget framework.",
        icon: "users",
      },
    ],
    imageSrc: "/modern-interior-design-consultation-meeting.jpg",
  },
  {
    stageNumber: "02",
    title: "We Craft Your Design Concept",
    subtitle: "Design Creation",
    description:
      "With a 5% booking confirmation, our creative team immerses itself in your project — developing photorealistic 3D renders, material boards, and a fully itemised cost plan so you can visualise every decision.",
    steps: [
      {
        title: "Secure Your Project Slot",
        description:
          "A nominal booking fee reserves your dedicated design team and locks in your project start date, ensuring no delays.",
        icon: "file-check",
      },
      {
        title: "3D Design & Concept Refinement",
        description:
          "We present bespoke 3D visualisations of your space, refining the concept through collaborative review rounds until it perfectly captures your vision.",
        icon: "pen-tool",
      },
      {
        title: "Transparent Budget Breakdown",
        description:
          "A detailed, line-by-line cost plan is prepared — covering materials, labour, and finishes — with no hidden charges, so you can plan with complete confidence.",
        icon: "receipt",
      },
    ],
    imageSrc: "/3d-interior-design-rendering-modern-living-room.jpg",
  },
  {
    stageNumber: "03",
    title: "Production Begins",
    subtitle: "Execution Begins",
    description:
      "Upon your approval and a 65% milestone payment, we mobilise the full project team. Detailed working drawings are delivered within 7 days, and site preparation begins on a clear, communicated timeline.",
    steps: [
      {
        title: "Design Sign-Off & Milestone Payment",
        description:
          "You formally approve all working drawings and specifications before a single element enters production — giving you total peace of mind.",
        icon: "check-circle",
      },
      {
        title: "Site Mobilisation & Material Procurement",
        description:
          "Premium materials are sourced and quality-checked. On-site work commences against a Gantt-chart schedule, with regular progress updates and photo reports shared with you.",
        icon: "hammer",
      },
    ],
    imageSrc: "/interior-construction-woodwork-production-site.jpg",
  },
  {
    stageNumber: "04",
    title: "Excellence in Every Detail",
    subtitle: "Installation Phase",
    description:
      "As installation reaches 95% completion, our quality assurance team conducts a rigorous 51-point inspection — scrutinising every joint, finish, and fitting to ensure the result matches the design intent precisely.",
    steps: [
      {
        title: "Precision Installation",
        description:
          "Our specialist craftspeople execute every element — carpentry, painting, lighting, and furnishing — with the exacting standards our clients expect.",
        icon: "hard-hat",
      },
      {
        title: "51-Point Quality Inspection",
        description:
          "Before handover, every aspect of your interior is assessed against our comprehensive 51-point checklist — guaranteeing a flawless finish and a space that feels extraordinary.",
        icon: "eye",
      },
    ],
    imageSrc: "/interior-installation-woodwork-finishing-luxury.jpg",
  },
  {
    stageNumber: "05",
    title: "Welcome to Your New Space",
    subtitle: "Project Handover",
    description:
      "The final 35% milestone is settled upon your complete satisfaction. We then walk you through every corner of your transformed space and celebrate with a complimentary professional photoshoot — your interiors, worthy of a magazine.",
    steps: [
      {
        title: "Guided Final Walkthrough",
        description:
          "Your project team leads you through a room-by-room tour, explaining every finish, operation, and care instruction so you feel fully at home.",
        icon: "home",
      },
      {
        title: "Complimentary Professional Photoshoot",
        description:
          "We commission a professional interior photography session as our gift to you — stunning images of your completed space to treasure and share.",
        icon: "camera",
      },
    ],
    imageSrc: "/completed-luxury-interior-living-room-photoshoot.jpg",
  },
]

export default function HowWeWorkPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] overflow-x-hidden">
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "How We Work", path: "/how-we-work" }]} />
      <HowWeWorkHero />
      <StagesIntro />
      <InteractiveProcess stages={stages} />
      <TeamSection />
      <CtaSection />
    </main>
  )
}
