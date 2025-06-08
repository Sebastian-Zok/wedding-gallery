"use client";

import { useEffect, useState } from "react";

type ImageFile = {
  id: string;
  name: string;
  webViewLink: string;
};

export default function Galerie() {
  const [images, setImages] = useState<ImageFile[]>([]);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error("Antwort ist kein Array:", data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12" id="galerie">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        <h2 className="text-2xl sm:text-3xl font-serif text-black text-center sm:text-left">
          Letzte 10 Bilder
        </h2>
        <a
          href="https://drive.google.com/drive/folders/15NdKLyfg5SWFoaSS8U7V1luDWuR_k-AK"
          className="inline-block bg-[#9f8c6c] hover:bg-[#8d795f] text-white px-5 py-3 text-sm font-semibold tracking-wider uppercase rounded text-center"
        >
          Komplette Galerie ansehen
        </a>
      </div>
      {images.length === 0 ? (
        <p className="text-center text-gray-500">
          Noch keine Bilder hochgeladen.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {images.map((img) => (
            <a
              key={img.id}
              href={`https://drive.google.com/uc?id=${img.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={`/api/image-proxy?id=${img.id}`}
                alt={img.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
