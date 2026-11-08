import { put, list, del } from "@vercel/blob"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || ""
    const token = process.env.BLOB_READ_WRITE_TOKEN

    if (!token) {
      return NextResponse.json(
        { error: "Vercel Blob token is missing in environment variables." },
        { status: 500 }
      )
    }

    let filename = `upload-${Date.now()}`
    let fileBuffer: Buffer | null = null
    let category = "general"
    let title = ""

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      const file = formData.get("file") as File | null
      if (!file) {
        return NextResponse.json({ error: "No file provided in form data" }, { status: 400 })
      }
      filename = file.name || filename
      category = (formData.get("category") as string) || category
      title = (formData.get("title") as string) || filename
      const arrayBuffer = await file.arrayBuffer()
      fileBuffer = Buffer.from(arrayBuffer)
    } else {
      const { searchParams } = new URL(request.url)
      filename = searchParams.get("filename") || filename
      category = searchParams.get("category") || category
      title = searchParams.get("title") || filename
      const arrayBuffer = await request.arrayBuffer()
      fileBuffer = Buffer.from(arrayBuffer)
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      return NextResponse.json({ error: "Uploaded file is empty" }, { status: 400 })
    }

    // Clean up filename to remove invalid characters while preserving extension
    const cleanFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, "_")

    // 1. Upload binary file to Vercel Blob (serves via Global Edge CDN)
    const blob = await put(cleanFilename, fileBuffer, {
      access: "public",
      token: token,
      addRandomSuffix: true,
    })

    // 2. Persist media metadata in Neon PostgreSQL
    const mediaRecord = await prisma.media.create({
      data: {
        url: blob.url,
        pathname: blob.pathname,
        filename: cleanFilename,
        contentType: blob.contentType || "image/jpeg",
        size: BigInt(fileBuffer.length),
        title: title || cleanFilename,
        category: category || "general",
      },
    })

    return NextResponse.json(
      {
        id: mediaRecord.id.toString(),
        url: mediaRecord.url,
        pathname: mediaRecord.pathname,
        filename: mediaRecord.filename,
        size: Number(mediaRecord.size ?? 0),
        contentType: mediaRecord.contentType,
        title: mediaRecord.title,
        category: mediaRecord.category,
        uploadedAt: mediaRecord.createdAt.toISOString(),
        createdAt: mediaRecord.createdAt.toISOString(),
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Blob/Neon upload error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to upload file and save to Neon." },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sync = searchParams.get("sync") === "true"
    const token = process.env.BLOB_READ_WRITE_TOKEN

    // Query Neon PostgreSQL database
    let media = await prisma.media.findMany({
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
      orderBy: { createdAt: "desc" },
    })

    // If database is empty or sync requested, backfill existing Vercel Blobs into Neon
    if ((media.length === 0 || sync) && token) {
      try {
        const { blobs } = await list({ token })
        for (const b of blobs) {
          const exists = await prisma.media.findUnique({
            where: { url: b.url },
          })
          if (!exists) {
            await prisma.media.create({
              data: {
                url: b.url,
                pathname: b.pathname,
                filename: b.pathname.split("/").pop() || b.pathname,
                size: BigInt(b.size || 0),
                createdAt: new Date(b.uploadedAt),
                category: "general",
                title: b.pathname.split("/").pop() || b.pathname,
              },
            })
          }
        }

        media = await prisma.media.findMany({
          where: category && category !== "all" ? { category } : undefined,
          orderBy: { createdAt: "desc" },
        })
      } catch (syncErr) {
        console.warn("Backfill from blob to Neon warning:", syncErr)
      }
    }

    const blobs = media.map((m) => ({
      id: m.id.toString(),
      url: m.url,
      pathname: m.pathname,
      filename: m.filename,
      size: Number(m.size ?? 0),
      contentType: m.contentType,
      title: m.title,
      category: m.category,
      uploadedAt: m.createdAt.toISOString(),
      createdAt: m.createdAt.toISOString(),
    }))

    return NextResponse.json(
      { blobs, total: blobs.length },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      }
    )
  } catch (error: any) {
    console.error("Neon/Blob list error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to list media files." },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url")
    const id = searchParams.get("id")
    const token = process.env.BLOB_READ_WRITE_TOKEN

    if (!url && !id) {
      return NextResponse.json({ error: "Blob URL or ID is required" }, { status: 400 })
    }

    const record = url
      ? await prisma.media.findUnique({ where: { url } })
      : await prisma.media.findUnique({ where: { id: BigInt(id!) } })

    const targetUrl = url || record?.url

    // 1. Delete from Vercel Blob store
    if (targetUrl && token) {
      try {
        await del(targetUrl, { token })
      } catch (blobErr) {
        console.warn("Blob store deletion error:", blobErr)
      }
    }

    // 2. Delete from Neon database
    if (targetUrl) {
      await prisma.media.deleteMany({
        where: { url: targetUrl },
      })
    } else if (id) {
      await prisma.media.delete({
        where: { id: BigInt(id) },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Deleted from Blob storage and Neon database successfully",
    })
  } catch (error: any) {
    console.error("Media delete error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to delete media." },
      { status: 500 }
    )
  }
}
