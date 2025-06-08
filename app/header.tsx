export default function Header() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh] bg-[#fefaf6] px-6 py-12 gap-6">
      {/* Textblock */}
      <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 max-w-xl mx-auto">
        <div className="text-2xl">👰🤵</div>
        <p className="text-sm tracking-widest text-gray-500 uppercase">
          Katrin & Michele Hochzeit
        </p>
        <h1 className="text-4xl font-serif text-gray-800 leading-tight">
          Unser besonderer Tag
        </h1>
        <p className="text-gray-600 uppercase tracking-wider text-sm">
          14. Juni 2025
        </p>
      </div>

      {/* Bild */}
      <div className="flex justify-center items-center">
        <img
          src="/km.jpg"
          alt="Katrin & Michele"
          className="w-full max-w-xs md:max-w-sm h-auto object-cover rounded-xl shadow-inner"
        />
      </div>
    </div>
  );
}
