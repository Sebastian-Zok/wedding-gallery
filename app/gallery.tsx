"use client";

import { useEffect, useState } from "react";

type ImageFile = {
  id: string;
  name: string;
  thumbnailLink: string;
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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
      <h2 className="col-span-full text-xl font-bold mb-4">Galerie</h2>
      {images.map((img) => (
        <a
          key={img.id}
          href={img.webViewLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`/api/image-proxy?id=${img.id}`}
            alt={img.name}
            className="rounded shadow"
          />
        </a>
      ))}
    </div>
  );
}
