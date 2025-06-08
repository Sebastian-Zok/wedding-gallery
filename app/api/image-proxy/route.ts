import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const fileId = req.nextUrl.searchParams.get("id");
  if (!fileId)
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  const drive = google.drive({ version: "v3", auth });

  const result = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  const stream = result.data as any;

  return new NextResponse(stream, {
    headers: {
      "Content-Type": result.headers["content-type"] || "image/jpeg",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
