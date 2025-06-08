export default function Header() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh] bg-[#fefaf6] px-8  ">
      {/* Textblock */}
      <div className="flex flex-col justify-center items-start space-y-6 max-w-xl mx-auto">
        👰🤵
        <p className="text-sm tracking-widest text-gray-500 uppercase">
          Katrin & Michelle Hochzeit
        </p>
        <h1 className="text-4xl font-serif text-gray-800">
          Unser besonderer Tag
        </h1>
        <p className="text-gray-600 uppercase tracking-wider text-sm">
          8. Juni 2025
        </p>
        <a
          href="https://drive.google.com/drive/folders/15NdKLyfg5SWFoaSS8U7V1luDWuR_k-AK"
          className="inline-block bg-[#9f8c6c] hover:bg-[#8d795f] text-white px-5 py-3 text-sm font-semibold tracking-wider uppercase rounded"
        >
          Galerie ansehen
        </a>
      </div>

      {/* Bild rechts */}
      <div className="hidden md:flex items-center justify-center">
        <div className="aspect-square w-100 max-w-full">
          <img
            src="/km.jpg"
            alt="Katrin & Michelle"
            className="w-full h-full object-cover rounded-xl shadow-inner"
          />
        </div>
      </div>
    </div>
  );
}
