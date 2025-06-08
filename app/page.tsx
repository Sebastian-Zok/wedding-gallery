"use client";

import { useState } from "react";
import Galerie from "./gallery";

export default function Home() {
  const [status, setStatus] = useState("");

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Hochladen…");

    const input = e.currentTarget.file as unknown as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0)
      return setStatus("Bitte mindestens eine Datei auswählen");

    const formData = new FormData();

    for (const file of Array.from(files)) {
      formData.append("file", file); // mehrfacher `file`-Key erlaubt!
    }

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setStatus(res.ok ? "Erfolgreich hochgeladen!" : "Fehler beim Upload");
  };

  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Fotos hochladen</h1>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" accept="image/*" multiple required />
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Hochladen
        </button>
      </form>
      <p className="mt-4">{status}</p>
      <Galerie />
    </main>
  );
}
