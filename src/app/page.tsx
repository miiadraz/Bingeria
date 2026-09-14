import ShowCard from "@/components/ShowCard";
import { getCatalog } from "@/lib/tvmaze";

export default async function Home() {
  const shows = await getCatalog();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Bingeria</h1>
      <p className="mt-2 text-gray-500">Tvoj tracker TV serija</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </main>
  );
}
