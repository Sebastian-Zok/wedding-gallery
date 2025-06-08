"use client";

import { useState } from "react";
import Galerie from "./gallery";
import Header from "./header";

export default function Home() {
  const [status, setStatus] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setSelectedFiles(Array.from(files));
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFiles.length === 0)
      return setStatus("Bitte zuerst Dateien auswählen");

    setStatus("Hochladen…");

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("file", file));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setStatus(res.ok ? "🎉 Erfolgreich hochgeladen!" : "❌ Fehler beim Upload");
    if (res.ok) setSelectedFiles([]);
  };

  return (
    <main className="min-h-screen   p-8 text-center">
      <Header />
      <h1 className="text-4xl font-serif text-gray-800 mb-2">
        💍 Hochzeitsfotos teilen
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Teile deine schönsten Erinnerungen mit uns – direkt vom Handy oder
        Laptop 💖
      </p>

      <form
        onSubmit={handleUpload}
        className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-pink-100"
      >
        <label
          htmlFor="file-upload"
          className="block w-full border-2 border-dashed border-[#9f8c6c] rounded-xl p-6 text-center cursor-pointer hover:bg-[#f5f3f0] transition"
        >
          <p className="text-[#9f8c6c] font-medium">
            Dateien hier ablegen oder klicken zum Auswählen
          </p>
          <input
            id="file-upload"
            type="file"
            name="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {selectedFiles.length > 0 && (
          <div className="text-left text-sm text-gray-600">
            <p className="font-semibold mb-1">Ausgewählte Dateien:</p>
            <ul className="list-disc list-inside">
              {selectedFiles.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="w-full bg-[#9f8c6c] hover:bg-[#8d795f] text-white px-6 py-3 rounded-2xl shadow-md transition text-lg"
          type="submit"
        >
          Jetzt hochladen 🕊️
        </button>

        <p className="text-sm text-green-700">{status}</p>
      </form>

      <div id="galerie" className="mt-16">
        <Galerie />
      </div>
    </main>
  );
}
