export interface Project {
  id: number
  title: string
  category: string
  location: string
  image: string
  galleryImages?: string[]
  description: string
  fullDescription?: string
  clientName?: string
  completionYear?: string
  scopeOfWork?: string[]
  featured?: boolean
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Modern Living Room",
    category: "residential",
    location: "Dhaka, Bangladesh",
    image: "/images/info1.jpg",
    galleryImages: ["/images/info1.jpg", "/images/info11.jpg", "/images/info12.jpg"],
    description:
      "A stunning living room with marble TV panel, floating media unit, crystal chandelier, and elegant display shelves with gold accents.",
    fullDescription:
      "This luxury residential living room project in Gulshan, Dhaka embodies modern elegance with customized Italian marble feature walls, gold-trimmed display cabinetry, custom velvet upholstery, and ambient recessed linear lighting.",
    clientName: "Private Homeowner",
    completionYear: "2025",
    scopeOfWork: ["Space Planning & Layout", "Custom Marble Wall Crafting", "Lighting & Ceiling Design", "Bespoke Furniture"],
    featured: true,
  },
  {
    id: 2,
    title: "Modern Dining Space",
    category: "residential",
    location: "Chittagong, Bangladesh",
    image: "/images/info11.jpg",
    galleryImages: ["/images/info11.jpg", "/images/info16.jpg"],
    description:
      "An elegant dining room featuring marble table, leather chairs, and textured wall panels with ambient LED lighting.",
    fullDescription:
      "Designed for entertaining, this high-end dining area features an imported Italian marble tabletop, custom hand-stitched leather seating, and integrated wine display storage with warm LED backlighting.",
    clientName: "Chittagong Penthouse",
    completionYear: "2024",
    scopeOfWork: ["Dining Room Interior", "Custom Cabinetry", "Acoustic Wall Panels"],
    featured: true,
  },
  {
    id: 3,
    title: "Spacious Living Area",
    category: "residential",
    location: "Sylhet, Bangladesh",
    image: "/images/info12.jpg",
    galleryImages: ["/images/info12.jpg", "/images/info13.jpg"],
    description:
      "A grand living space with marble feature wall, large TV, cream sectional sofa, and designer crystal chandeliers.",
    fullDescription:
      "Spanning over 800 sq ft, this living area prioritizes open spatial flow, premium acoustic wall treatments, and statement lighting design to create an inviting atmosphere.",
    clientName: "Sylhet Villa",
    completionYear: "2025",
    scopeOfWork: ["Full Interior Execution", "Lighting Architecture", "Custom Modular Sofa"],
    featured: true,
  },
  {
    id: 4,
    title: "Family Living Room",
    category: "residential",
    location: "Rajshahi, Bangladesh",
    image: "/images/info13.jpg",
    galleryImages: ["/images/info13.jpg", "/images/info1.jpg"],
    description:
      "A comfortable family living area with marble TV wall, modern sectional sofa, and elegant display shelving.",
    fullDescription:
      "Crafted with warmth and durability in mind, combining kid-friendly materials, concealed storage solutions, and clean minimalist lines.",
    clientName: "Chowdhury Residence",
    completionYear: "2024",
    scopeOfWork: ["Family Room Design", "Storage Solutions", "Custom Soft Furnishings"],
    featured: false,
  },
  {
    id: 5,
    title: "Walk-in Wardrobe",
    category: "furniture",
    location: "Khulna, Bangladesh",
    image: "/images/info15.jpg",
    galleryImages: ["/images/info15.jpg", "/images/info22.jpg"],
    description: "An open walk-in closet system with glass doors, wood shelving, and elegant LED accent lighting.",
    fullDescription:
      "Bespoke modular closet system crafted from premium hardwood with tint-glass doors, sensor-activated LED clothing racks, and dedicated jewelry drawers.",
    clientName: "Khulna Duplex",
    completionYear: "2025",
    scopeOfWork: ["Bespoke Wardrobe Design", "LED Automation", "Glass Door Installation"],
    featured: true,
  },
  {
    id: 6,
    title: "Luxury Dining Room",
    category: "residential",
    location: "Dhaka, Bangladesh",
    image: "/images/info16.jpg",
    galleryImages: ["/images/info16.jpg", "/images/info11.jpg"],
    description:
      "A sophisticated dining space with black glass cabinets, marble dining table, cream chairs, and wine display.",
    fullDescription:
      "A high-contrast contemporary dining suite featuring dark reflective glass, brushed brass hardware, and statement crystal pendant lighting.",
    clientName: "Banani Residence",
    completionYear: "2024",
    scopeOfWork: ["Dining Room Renovation", "Wine Cabinet Fabrication", "Custom Lighting"],
    featured: true,
  },
  {
    id: 7,
    title: "Sculptural Display Wall",
    category: "furniture",
    location: "Comilla, Bangladesh",
    image: "/images/info17.jpg",
    galleryImages: ["/images/info17.jpg", "/images/info19.jpg"],
    description:
      "An artistic display area featuring angel wing sculpture against marble backdrop with floating grey shelf.",
    fullDescription:
      "Custom focal wall featuring bookmatched Calacatta marble, 3D relief artwork, and concealed mood lighting.",
    clientName: "Private Art Collector",
    completionYear: "2025",
    scopeOfWork: ["Feature Wall Crafting", "Lighting Accentuation"],
    featured: false,
  },
  {
    id: 8,
    title: "Contemporary Corporate Lounge",
    category: "commercial",
    location: "Gazipur, Bangladesh",
    image: "/images/info18.jpg",
    galleryImages: ["/images/info18.jpg"],
    description:
      "A modern lounge with grey modular sofa, tan accent chair, round coffee table, and built-in storage cabinets.",
    fullDescription:
      "Executive suite lounge designed for corporate hospitality and client meetings with ergonomic leather seating and noise-dampening wall panels.",
    clientName: "Tech Corporate HQ",
    completionYear: "2025",
    scopeOfWork: ["Commercial Office Interior", "Executive Lounge Furniture", "Acoustics"],
    featured: true,
  },
  {
    id: 9,
    title: "Elegant Entry Display",
    category: "furniture",
    location: "Narayanganj, Bangladesh",
    image: "/images/info19.jpg",
    galleryImages: ["/images/info19.jpg", "/images/info17.jpg"],
    description:
      "A stunning entryway display with sculptural art piece, marble feature wall, and contemporary decor elements.",
    fullDescription:
      "First impressions matter: an opulent foyer console unit featuring custom brass detailing and warm perimeter glow.",
    clientName: "Narayanganj Estate",
    completionYear: "2024",
    scopeOfWork: ["Entry Foyer Design", "Console Fabrication"],
    featured: false,
  },
  {
    id: 10,
    title: "Luxurious Master Bedroom",
    category: "residential",
    location: "Mymensingh, Bangladesh",
    image: "/images/info20.jpg",
    galleryImages: ["/images/info20.jpg", "/images/info23.jpg", "/images/info25.jpg"],
    description:
      "A sophisticated bedroom with upholstered bed, built-in wardrobe with glass doors, and marble flooring.",
    fullDescription:
      "Master suite redesign emphasizing serene neutral tones, plush headboard wall panelling, integrated bedside controls, and floor-to-ceiling drapery.",
    clientName: "Mymensingh Villa",
    completionYear: "2025",
    scopeOfWork: ["Master Bedroom Suite", "Headboard Panelling", "Wardrobe System"],
    featured: true,
  },
  {
    id: 11,
    title: "Modern Dining Corner Renovation",
    category: "renovation",
    location: "Rangpur, Bangladesh",
    image: "/images/info21.jpg",
    galleryImages: ["/images/info21.jpg"],
    description:
      "An elegant dining area with marble accent wall, sideboard cabinet, gold floor mirror, and warm wood flooring.",
    fullDescription:
      "Full transformation of an outdated dining alcove into an airy, reflective contemporary dining nook.",
    clientName: "Rangpur Renovation",
    completionYear: "2024",
    scopeOfWork: ["Full Space Remodel", "Flooring Replacement", "Custom Mirror Installation"],
    featured: false,
  },
  {
    id: 12,
    title: "Designer Closet System",
    category: "furniture",
    location: "Bogra, Bangladesh",
    image: "/images/info22.jpg",
    galleryImages: ["/images/info22.jpg", "/images/info15.jpg"],
    description:
      "A premium walk-in closet with glass display doors, wood shelving, and integrated LED lighting throughout.",
    fullDescription:
      "Custom wardrobe storage solution maximizing vertical space with velvet-lined accessory drawers and smoked glass door fronts.",
    clientName: "Bogra Residence",
    completionYear: "2025",
    scopeOfWork: ["Closet Architecture", "LED Wiring"],
    featured: false,
  },
  {
    id: 13,
    title: "Serene Master Retreat",
    category: "residential",
    location: "Barisal, Bangladesh",
    image: "/images/info23.jpg",
    galleryImages: ["/images/info23.jpg"],
    description:
      "A calm bedroom with dark headboard, ambient backlighting, and a cozy green accent chair by large windows.",
    fullDescription:
      "Tranquil sleeping sanctuary featuring dark oak panelling, ambient warm LED perimeter cove lighting, and plush textiles.",
    clientName: "Barisal Lakeview House",
    completionYear: "2024",
    scopeOfWork: ["Bedroom Interior", "Lighting Design"],
    featured: false,
  },
  {
    id: 14,
    title: "Minimalist Floating Console",
    category: "furniture",
    location: "Jessore, Bangladesh",
    image: "/images/info24.jpg",
    galleryImages: ["/images/info24.jpg"],
    description:
      "A floating console in burgundy and taupe tones with illuminated shelving and contemporary art display.",
    fullDescription:
      "Custom architectural furniture piece with concealed push-to-open hardware and matte lacquer finish.",
    clientName: "Jessore Residence",
    completionYear: "2025",
    scopeOfWork: ["Furniture Design & Crafting"],
    featured: false,
  },
  {
    id: 15,
    title: "Contemporary Bedroom Renovation",
    category: "renovation",
    location: "Dinajpur, Bangladesh",
    image: "/images/info25.jpg",
    galleryImages: ["/images/info25.jpg"],
    description: "A modern bedroom renovation featuring black glass wardrobe doors and decorative illuminated mirror.",
    fullDescription:
      "Comprehensive structural overhaul converting a 20-year-old bedroom layout into a modern luxury suite.",
    clientName: "Dinajpur House",
    completionYear: "2025",
    scopeOfWork: ["Full Renovation", "Electrical & Lighting", "Custom Joinery"],
    featured: true,
  },
  {
    id: 16,
    title: "Traditional Dining Room Remodel",
    category: "residential",
    location: "Cox's Bazar, Bangladesh",
    image: "/images/info8.jpg",
    galleryImages: ["/images/info8.jpg"],
    description:
      "A classic dining space with ornate table cloth, leather chairs, mirror accent wall, and black glass cabinets.",
    fullDescription:
      "Blending traditional hospitality elements with sleek modern storage solutions for coastal family dining.",
    clientName: "Cox's Bazar Beach House",
    completionYear: "2024",
    scopeOfWork: ["Dining Room Redesign", "Mirror Wall Panels"],
    featured: false,
  },
]

const STORAGE_KEY = "interior_projects_data"

export function getStoredProjects(): Project[] {
  if (typeof window === "undefined") return INITIAL_PROJECTS
  try {
    const item = localStorage.getItem(STORAGE_KEY)
    if (!item) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS))
      return INITIAL_PROJECTS
    }
    const parsed = JSON.parse(item)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PROJECTS
  } catch (error) {
    console.error("Error reading projects from localStorage:", error)
    return INITIAL_PROJECTS
  }
}

export function saveStoredProjects(projects: Project[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    window.dispatchEvent(new Event("projects-updated"))
  } catch (error) {
    console.error("Error saving projects to localStorage:", error)
  }
}

export function resetProjectsToDefault(): Project[] {
  if (typeof window === "undefined") return INITIAL_PROJECTS
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS))
    window.dispatchEvent(new Event("projects-updated"))
    return INITIAL_PROJECTS
  } catch (error) {
    console.error("Error resetting projects:", error)
    return INITIAL_PROJECTS
  }
}
