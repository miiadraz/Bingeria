"use server";

import { revalidatePath } from "next/cache";
import { readWatchlist, writeWatchlist } from "@/lib/db";
import type { WatchlistItem } from "@/types/shows";

export async function addToWatchlist(item: WatchlistItem) {
  const watchlist = await readWatchlist();

  const alreadyExists = watchlist.some((show) => show.id === item.id);
  if (alreadyExists) {
    return;
  }

  const updated = [...watchlist, item];
  await writeWatchlist(updated);

  // Osvježava sve stranice koje prikazuju watchlist, bez ručnog reloada.
  revalidatePath("/watchlist");
  revalidatePath(`/shows/${item.id}`);
}

export async function removeFromWatchlist(id: number) {
  const watchlist = await readWatchlist();
  const updated = watchlist.filter((show) => show.id !== id);
  await writeWatchlist(updated);

  revalidatePath("/watchlist");
  revalidatePath(`/shows/${id}`);
}

export async function updateWatchlistStatus(
  id: number,
  status: WatchlistItem["status"],
) {
  const watchlist = await readWatchlist();
  const updated = watchlist.map((show) =>
    show.id === id ? { ...show, status } : show,
  );
  await writeWatchlist(updated);

  revalidatePath("/watchlist");
}
