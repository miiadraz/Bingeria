import { promises as fs } from "fs";
import path from "path";
import type { WatchlistItem } from "@/types/shows";

const DB_PATH = path.join(process.cwd(), "data", "watchlist.json");

export async function readWatchlist(): Promise<WatchlistItem[]> {
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function writeWatchlist(items: WatchlistItem[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(items, null, 2), "utf-8");
}
