import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-8 py-4">
      <Link href="/" className="text-xl font-bold">
        Bingeria
      </Link>
      <Link href="/watchlist" className="text-blue-600 hover:underline">
        Moja watchlista
      </Link>
    </nav>
  );
}
