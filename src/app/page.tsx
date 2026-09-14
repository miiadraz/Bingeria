import { Suspense } from "react";
import ShowCard from "@/components/ShowCard";
import SearchBar from "@/components/SearchBar";
import { getCatalog, searchShows } from "@/lib/tvmaze";

interface HomeProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const shows = query ? await searchShows(query) : await getCatalog();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Bingeria</h1>
      <p className="mt-2 text-gray-500">Tvoj tracker TV serija</p>

      <div className="mt-6 max-w-md">
        <Suspense
          fallback={
            <div className="h-10 w-full rounded-md border border-gray-300" />
          }
        >
          <SearchBar />
        </Suspense>
      </div>

      <h2 className="mt-8 text-xl font-semibold">
        {query ? `Rezultati pretrage za "${query}"` : "Katalog"}
      </h2>

      {query && shows.length === 0 && (
        <p className="mt-4 text-gray-500">Nema rezultata za tu pretragu.</p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </main>
  );
}
