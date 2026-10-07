import { put, list, del } from "@vercel/blob"
import { NextResponse } from "next/server"

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
    let fileData: File | Blob | ArrayBuffer | null = null

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      const file = formData.get("file") as File | null
      if (!file) {
        return NextResponse.json({ error: "No file provided in form data" }, { status: 400 })
      }
      filename = file.name || filename
      fileData = file
    } else {
      const { searchParams } = new URL(request.url)
      filename = searchParams.get("filename") || filename
      fileData = await request.blob()
    }

    const blob = await put(filename, fileData, {
      access: "public",
      token: token,
    })

    return NextResponse.json(blob)
  } catch (error: any) {
    console.error("Blob upload error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to upload file to Blob store." },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN
    if (!token) {
      return NextResponse.json(
        { error: "Vercel Blob token missing" },
        { status: 500 }
      )
    }

    const { blobs } = await list({ token })
    return NextResponse.json({ blobs })
  } catch (error: any) {
    console.error("Blob list error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to list blob files." },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url")
    const token = process.env.BLOB_READ_WRITE_TOKEN

    if (!url) {
      return NextResponse.json({ error: "Blob URL is required" }, { status: 400 })
    }

    if (!token) {
      return NextResponse.json({ error: "Vercel Blob token missing" }, { status: 500 })
    }

    await del(url, { token })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Blob delete error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to delete blob." },
      { status: 500 }
    )
  }
}
