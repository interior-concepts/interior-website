import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const revalidate = 0

function serializeProject(project: any) {
  return {
    ...project,
    id: Number(project.id),
    createdAt: project.createdAt instanceof Date ? project.createdAt.toISOString() : project.createdAt,
    updatedAt: project.updatedAt instanceof Date ? project.updatedAt.toISOString() : project.updatedAt,
  }
}

// GET - List all projects from Neon DB
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined

    const where: any = {}
    if (category && category.toLowerCase() !== "all") {
      where.category = {
        equals: category,
        mode: "insensitive",
      }
    }
    if (featured !== null && featured !== undefined) {
      where.featured = featured === "true"
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    return NextResponse.json(projects.map(serializeProject))
  } catch (error: any) {
    console.error("GET /api/projects error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to fetch projects from Neon" },
      { status: 500 }
    )
  }
}

// POST - Create or Update Project in Neon DB
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      title,
      category,
      location,
      image,
      galleryImages,
      description,
      fullDescription,
      clientName,
      completionYear,
      scopeOfWork,
      featured,
    } = body

    if (!title || !image) {
      return NextResponse.json(
        { error: "Title and main image are required" },
        { status: 400 }
      )
    }

    // If ID is provided, check if we should update an existing project
    if (id) {
      const existing = await prisma.project.findUnique({
        where: { id: BigInt(id) },
      })

      if (existing) {
        const updated = await prisma.project.update({
          where: { id: BigInt(id) },
          data: {
            title,
            category: category || existing.category,
            location: location ?? existing.location,
            image,
            galleryImages: Array.isArray(galleryImages) ? galleryImages : existing.galleryImages,
            description: description ?? existing.description,
            fullDescription: fullDescription ?? existing.fullDescription,
            clientName: clientName ?? existing.clientName,
            completionYear: completionYear ?? existing.completionYear,
            scopeOfWork: Array.isArray(scopeOfWork) ? scopeOfWork : existing.scopeOfWork,
            featured: typeof featured === "boolean" ? featured : existing.featured,
          },
        })
        return NextResponse.json(serializeProject(updated), { status: 200 })
      }
    }

    // Otherwise create a new project
    const created = await prisma.project.create({
      data: {
        title,
        category: category || "residential",
        location: location || "Dhaka, Bangladesh",
        image,
        galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
        description: description || "",
        fullDescription: fullDescription || "",
        clientName: clientName || "",
        completionYear: completionYear || "2025",
        scopeOfWork: Array.isArray(scopeOfWork) ? scopeOfWork : [],
        featured: Boolean(featured),
      },
    })

    return NextResponse.json(serializeProject(created), { status: 201 })
  } catch (error: any) {
    console.error("POST /api/projects error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to save project in Neon" },
      { status: 500 }
    )
  }
}

// PUT - Update existing project in Neon DB
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
    }

    const updated = await prisma.project.update({
      where: { id: BigInt(id) },
      data,
    })

    return NextResponse.json(serializeProject(updated))
  } catch (error: any) {
    console.error("PUT /api/projects error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to update project" },
      { status: 500 }
    )
  }
}

// DELETE - Delete project from Neon DB
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
    }

    await prisma.project.delete({
      where: { id: BigInt(id) },
    })

    return NextResponse.json({ success: true, message: "Project deleted successfully" })
  } catch (error: any) {
    console.error("DELETE /api/projects error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to delete project" },
      { status: 500 }
    )
  }
}
