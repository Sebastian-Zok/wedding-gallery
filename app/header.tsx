export default function Header() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh] bg-[#fefaf6] px-6 py-12 gap-6">
      {/* Textblock */}
      <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 max-w-xl mx-auto">
        <div className="text-2xl">👰🤵</div>
        <p className="text-sm tracking-widest text-gray-500 uppercase">
          Katrin & Michelle Hochzeit
        </p>
        <h1 className="text-4xl font-serif text-gray-800 leading-tight">
          Unser besonderer Tag
        </h1>
        <p className="text-gray-600 uppercase tracking-wider text-sm">
          8. Juni 2025
        </p>
        <a
          href="https://drive.google.com/drive/folders/15NdKLyfg5SWFoaSS8U7V1luDWuR_k-AK"
          className="mt-4 inline-block bg-[#9f8c6c] hover:bg-[#8d795f] text-white px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded transition"
        >
          Galerie ansehen
        </a>
      </div>

      {/* Bild */}
      <div className="flex justify-center items-center">
        <img
          src="/km.jpg"
          alt="Katrin & Michelle"
          className="w-full max-w-xs md:max-w-sm h-auto object-cover rounded-xl shadow-inner"
        />
      </div>
    </div>
  );
}
