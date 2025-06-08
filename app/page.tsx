"use client";

import { useState, useRef } from "react";
import Galerie from "./gallery";
import Header from "./header";

type FileWithStatus = {
  file: File;
  status: "pending" | "uploading" | "success" | "error";
};

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<FileWithStatus[]>([]);
  const [globalStatus, setGlobalStatus] = useState("");
  const galerieRef = useRef<{ refresh: () => void }>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setSelectedFiles(
      Array.from(files).map((file) => ({ file, status: "pending" }))
    );
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setGlobalStatus("Bitte zuerst Dateien auswählen");
      return;
    }
    setGlobalStatus("");
    let anySuccess = false;

    // Upload jede Datei einzeln
    const updatedFiles = await Promise.all(
      selectedFiles.map(async (item, idx) => {
        let newStatus: FileWithStatus["status"] = "uploading";
        setSelectedFiles((prev) =>
          prev.map((f, i) => (i === idx ? { ...f, status: "uploading" } : f))
        );
        const formData = new FormData();
        formData.append("file", item.file);

        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          if (res.ok) {
            newStatus = "success";
            anySuccess = true;
          } else {
            newStatus = "error";
          }
        } catch {
          newStatus = "error";
        }
        setSelectedFiles((prev) =>
          prev.map((f, i) => (i === idx ? { ...f, status: newStatus } : f))
        );
        return { ...item, status: newStatus };
      })
    );

    if (anySuccess) {
      setGlobalStatus("🎉 Erfolgreich hochgeladen!");
      setTimeout(() => {
        setSelectedFiles([]);
        galerieRef.current?.refresh();
      }, 1000);
    } else {
      setGlobalStatus("❌ Fehler beim Upload");
    }
  };

  return (
    <main className="min-h-screen p-4 sm:p-8 text-center">
      <Header />
      <h1 className="text-3xl sm:text-4xl font-serif text-gray-800 mb-2">
        Hochzeitsfotos teilen
      </h1>
      <p className="text-base sm:text-lg text-gray-700 mb-6">
        Teile deine schönsten Erinnerungen mit uns 💌
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
              {selectedFiles.map((item, i) => (
                <li key={i}>
                  {item.file.name}{" "}
                  {item.status === "uploading" && (
                    <span className="text-blue-500 ml-2">⏳ Hochladen…</span>
                  )}
                  {item.status === "success" && (
                    <span className="text-green-600 ml-2">✔️ Erfolgreich</span>
                  )}
                  {item.status === "error" && (
                    <span className="text-red-600 ml-2">❌ Fehler</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="w-full bg-[#9f8c6c] hover:bg-[#8d795f] text-white px-6 py-3 rounded-2xl shadow-md transition text-lg"
          type="submit"
          disabled={selectedFiles.some((f) => f.status === "uploading")}
        >
          Jetzt hochladen 🕊️
        </button>

        <p className="text-sm text-green-700">{globalStatus}</p>
      </form>

      <div id="galerie" className="mt-8">
        <Galerie ref={galerieRef} />
      </div>
    </main>
  );
}
