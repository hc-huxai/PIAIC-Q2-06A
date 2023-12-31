export default function CardPage() {
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-8 py-12 px-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="h-[350px] bg-gray-700 text-white rounded-lg flex items-center justify-center p-4 text-9xl font-black hover:font-bold hover:bg-gray-800 transition-all select-none">
          {item}
        </div>
      ))}
    </div>
  );
}
