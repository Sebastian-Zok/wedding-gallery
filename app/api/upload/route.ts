import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import formidable, { File, Fields, Files } from "formidable";
import fs from "fs";
import { IncomingMessage } from "http";
import { Readable } from "stream";

export const dynamic = "force-dynamic";

// Hilfsfunktion: NextRequest → IncomingMessage (für formidable)
function toNodeReadable(req: NextRequest): IncomingMessage {
  const headers = Object.fromEntries(req.headers.entries());
  const readable = Readable.fromWeb(req.body as any) as IncomingMessage;
  readable.headers = headers;
  return readable;
}

// Manuell getypte Promisify-Variante
function parseForm(
  req: IncomingMessage
): Promise<{ fields: Fields; files: Files }> {
  const form = formidable({ multiples: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const nodeReq = toNodeReadable(req);
    const { files } = await parseForm(nodeReq);

    const fileField = files.file;
    const file = Array.isArray(fileField) ? fileField[0] : fileField;
    if (!file) {
      return NextResponse.json(
        { error: "Keine Datei empfangen" },
        { status: 400 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });
    const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file];

    for (const file of uploadedFiles) {
      if (file === undefined) {
        return NextResponse.json({ error: "Dateipfad fehlt" }, { status: 400 });
      }

      const metadata = {
        name: file.originalFilename ?? "upload.jpg",
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
        role: "reader",
        type: "anyone",
      };

      const media = {
        mimeType: file.mimetype ?? "application/octet-stream",
        body: fs.createReadStream(file.filepath),
      };

      const uploaded = await drive.files.create({
        requestBody: metadata,
        media,
        fields: "id",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Upload fehlgeschlagen:", error);
    return NextResponse.json(
      { error: "Upload fehlgeschlagen" },
      { status: 500 }
    );
  }
}
