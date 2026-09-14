import Image from "next/image";
import WatchlistButton from "@/components/WatchlistButton";
import { getShowById, getShowEpisodes } from "@/lib/tvmaze";
import EpisodeList from "@/components/EpisodeList";
import { stripHtml } from "@/lib/sanitize";

interface ShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShowPage({ params }: ShowPageProps) {
  const { id } = await params;
  const show = await getShowById(id);
  const episodes = await getShowEpisodes(id);

  return (
    <main className="min-h-screen p-8">
      <div className="flex gap-6">
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
          <p className="mt-1 text-gray-600">{show.genres.join(", ")}</p>

          <WatchlistButton show={show} />

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
