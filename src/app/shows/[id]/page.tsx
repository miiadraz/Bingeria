import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WatchlistButton from "@/components/WatchlistButton";
import EpisodeList from "@/components/EpisodeList";
import { getShowById, getShowEpisodes } from "@/lib/tvmaze";
import { stripHtml } from "@/lib/sanitize";
import { readWatchlist } from "@/lib/db";

interface ShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShowPage({ params }: ShowPageProps) {
  const { id } = await params;
  const [show, episodes, watchlist] = await Promise.all([
    getShowById(id),
    getShowEpisodes(id),
    readWatchlist(),
  ]);

  if (!show) {
    notFound();
  }

  const isInWatchlist = watchlist.some((item) => item.id === show.id);

  if (!show) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Natrag na katalog
      </Link>

      <div className="mt-4 flex gap-6">
        {show.image && (
          <Image
            src={show.image.original}
            alt={show.name}
            width={210}
            height={295}
            className="rounded-md object-cover"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold">{show.name}</h1>
          <p className="mt-1 text-gray-500">
            {show.premiered ? show.premiered.slice(0, 4) : "Nepoznata godina"}
            {" · "}
            {show.status}
          </p>
          <p className="mt-1 text-gray-500">
            Ocjena: {show.rating.average ?? "N/A"}
          </p>
          <p className="mt-1 text-gray-500">Broj epizoda: {episodes.length}</p>
          <p className="mt-1 text-gray-600">{show.genres.join(", ")}</p>

          <WatchlistButton show={show} isInWatchlist={isInWatchlist} />
          {show.summary && (
            <p className="mt-4 max-w-2xl whitespace-pre-line text-sm text-gray-700">
              {stripHtml(show.summary)}
            </p>
          )}

          <EpisodeList episodes={episodes} />
        </div>
      </div>
    </main>
  );
}
