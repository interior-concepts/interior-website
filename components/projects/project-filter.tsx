"use client"

interface CategoryOption {
  id: string
  label: string
}

interface ProjectFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  counts?: Record<string, number>
}

export function ProjectFilter({ activeFilter, onFilterChange, counts }: ProjectFilterProps) {
  const categories: CategoryOption[] = [
    { id: "all", label: "All Projects" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "renovation", label: "Renovation" },
    { id: "furniture", label: "Furniture" },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 rounded-full bg-[#faf9f6] border border-black/10 shadow-sm max-w-3xl mx-auto">
      {categories.map((category) => {
        const isSelected = activeFilter.toLowerCase() === category.id.toLowerCase()
        const count = counts ? counts[category.id] : null

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onFilterChange(category.id)}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              isSelected
                ? "bg-[#0d3d3d] text-white shadow-md font-semibold"
                : "bg-white text-black/70 border border-black/10 hover:border-[#0d3d3d] hover:text-[#0d3d3d]"
            }`}
          >
            <span>{category.label}</span>
            {count !== null && count !== undefined && (
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? "bg-[#a57c00] text-white" : "bg-black/10 text-black/60"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
