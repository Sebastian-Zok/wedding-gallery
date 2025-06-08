import { google } from "googleapis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID!;
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      orderBy: "createdTime desc",
      pageSize: 10,
      fields: "files(id, name, thumbnailLink, webViewLink)",
    });

    return NextResponse.json(res.data.files);
  } catch (err) {
    console.error("Fehler beim Listen von Bildern:", err);
    return NextResponse.json({ error: "Fehler beim Abrufen" }, { status: 500 });
  }
}
