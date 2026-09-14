import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Serija nije pronađena</h1>
      <p className="mt-2 text-gray-500">
        Serija s ovim ID-em ne postoji ili je uklonjena.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block text-blue-600 hover:underline"
      >
        ← Natrag na katalog
      </Link>
    </main>
  );
}
