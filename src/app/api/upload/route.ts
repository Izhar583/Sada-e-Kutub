import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      fileId: `file-${Date.now()}`,
      fileName: file.name,
      sizeBytes: file.size,
      mimeType: file.type,
      status: "uploaded",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
