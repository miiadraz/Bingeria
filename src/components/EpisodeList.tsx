import type { Episode } from "@/types/shows";

interface EpisodeListProps {
  episodes: Episode[];
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  if (episodes.length === 0) {
    return <p className="mt-4 text-gray-500">Nema podataka o epizodama.</p>;
  }

  const seasons = new Map<number, Episode[]>();
  for (const episode of episodes) {
    const existing = seasons.get(episode.season) ?? [];
    seasons.set(episode.season, [...existing, episode]);
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Epizode</h2>

      {Array.from(seasons.entries()).map(([season, seasonEpisodes]) => (
        <div key={season} className="mt-4">
          <h3 className="font-semibold text-gray-700">Sezona {season}</h3>
          <ul className="mt-2 space-y-1">
            {seasonEpisodes.map((episode) => (
              <li key={episode.id} className="text-sm text-gray-600">
                <span className="font-medium">
                  {episode.number}. {episode.name}
                </span>
                {episode.airdate && (
                  <span className="text-gray-400"> — {episode.airdate}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
