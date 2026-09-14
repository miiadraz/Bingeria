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
    async function removeAction(_formData: FormData) {
      "use server";
      await removeFromWatchlist(show.id);
    }

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

  async function addAction(_formData: FormData) {
    "use server";
    const item: WatchlistItem = {
      id: show.id,
      name: show.name,
      image: show.image?.medium ?? null,
      status: "planned",
      addedAt: Date.now(),
    };
    await addToWatchlist(item);
  }

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
