"use server";

import { revalidatePath } from "next/cache";
import { readWatchlist, writeWatchlist } from "@/lib/db";
import type { WatchlistItem } from "@/types/shows";
import { reviewSchema } from "@/lib/schemas";
import type { Review } from "@/types/shows";

export async function addReview(id: number, formData: FormData) {
  const raw = {
    rating: formData.get("rating"),
    episodeReached: formData.get("episodeReached"),
    comment: formData.get("comment"),
    containsSpoilers: formData.get("containsSpoilers") === "on",
  };

  const parsed = reviewSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Provjeri unesene podatke.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const watchlist = await readWatchlist();
    const updated = watchlist.map((show) =>
      show.id === id ? { ...show, review: parsed.data as Review } : show,
    );
    await writeWatchlist(updated);

    revalidatePath("/watchlist");
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Nešto je pošlo po krivu prilikom spremanja recenzije.",
    };
  }
}

export async function addToWatchlist(item: WatchlistItem) {
  try {
    const watchlist = await readWatchlist();

    const alreadyExists = watchlist.some((show) => show.id === item.id);
    if (alreadyExists) {
      return { success: false, message: "Serija je već na watchlisti." };
    }

    const updated = [...watchlist, item];
    await writeWatchlist(updated);

    revalidatePath("/watchlist");
    revalidatePath(`/shows/${item.id}`);
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Nešto je pošlo po krivu prilikom dodavanja. Pokušaj ponovno.",
    };
  }
}

export async function removeFromWatchlist(id: number) {
  try {
    const watchlist = await readWatchlist();
    const updated = watchlist.filter((show) => show.id !== id);
    await writeWatchlist(updated);

    revalidatePath("/watchlist");
    revalidatePath(`/shows/${id}`);
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Nešto je pošlo po krivu prilikom uklanjanja. Pokušaj ponovno.",
    };
  }
}

export async function updateWatchlistStatus(id: number, formData: FormData) {
  try {
    const status = formData.get("status") as WatchlistItem["status"];

    const watchlist = await readWatchlist();
    const updated = watchlist.map((show) =>
      show.id === id ? { ...show, status } : show,
    );
    await writeWatchlist(updated);

    revalidatePath("/watchlist");
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Nešto je pošlo po krivu prilikom ažuriranja statusa.",
    };
  }
}
