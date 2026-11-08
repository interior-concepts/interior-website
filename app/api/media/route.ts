import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const revalidate = 60 // Cache for 60 seconds at edge CDN

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 50
    const search = searchParams.get("search")

    const items = await prisma.media.findMany({
      where: {
        ...(category && category !== "all" ? { category } : {}),
        ...(search
          ? {
              OR: [
                { filename: { contains: search, mode: "insensitive" } },
                { title: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    })

    const serialized = items.map((m) => ({
      id: m.id.toString(),
      url: m.url,
      pathname: m.pathname,
      filename: m.filename,
      contentType: m.contentType,
      size: Number(m.size ?? 0),
      title: m.title,
      category: m.category,
      createdAt: m.createdAt.toISOString(),
    }))

    return NextResponse.json({
      success: true,
      data: serialized,
      count: serialized.length,
    })
  } catch (error: any) {
    console.error("GET /api/media error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to fetch media from Neon" },
      { status: 500 }
    )
  }
}
