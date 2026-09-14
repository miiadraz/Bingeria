import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-800 bg-gray-950 px-8 py-4 text-gray-100">
      <Link href="/" className="text-xl font-bold hover:text-blue-400">
        Bingeria
      </Link>
      <div className="flex gap-6 text-sm">
        <Link href="/watchlist" className="hover:text-blue-400">
          Moja watchlista
        </Link>
        <Link href="/o-projektu" className="hover:text-blue-400">
          O projektu
        </Link>
        <Link href="/pravila" className="hover:text-blue-400">
          Pravila
        </Link>
      </div>
    </nav>
  );
}
