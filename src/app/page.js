import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Тоглоомын цэс
        </h1>

        <div className="grid gap-4">
          <Link href="/apple" className="w-full">
            <button className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-colors shadow-md">
              Алимны тоглоом
            </button>
          </Link>

          <Link href="/letter" className="w-full">
            <button className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-colors shadow-md">
              Үсгийн тоглоом
            </button>
          </Link>

          <Link href="/math" className="w-full">
            <button className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-colors shadow-md">
              Математикийн тоглоом
            </button>
          </Link>
        </div>
        <p className="mt-8 text-center text-gray-600">
          Тоглоомоо сонгоод эхлүүлнэ үү!
        </p>
      </div>
    </div>
  );
}
