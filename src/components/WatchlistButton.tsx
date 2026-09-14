import { addToWatchlist, removeFromWatchlist } from "@/lib/actions";
import type { Show, WatchlistItem } from "@/types/shows";

interface WatchlistButtonProps {
  show: Show;
  isInWatchlist: boolean;
}

export default function WatchlistButton({
  show,
  isInWatchlist,
}: WatchlistButtonProps) {
  if (isInWatchlist) {
    const removeAction = removeFromWatchlist.bind(null, show.id);

    return (
      <form action={removeAction}>
        <button
          type="submit"
          className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Ukloni iz watchliste
        </button>
      </form>
    );
  }

  const item: WatchlistItem = {
    id: show.id,
    name: show.name,
    image: show.image?.medium ?? null,
    status: "planned",
  };
  const addAction = addToWatchlist.bind(null, item);

  return (
    <form action={addAction}>
      <button
        type="submit"
        className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Dodaj u watchlistu
      </button>
    </form>
  );
}
