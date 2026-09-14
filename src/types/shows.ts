export interface Show {
  id: number;
  name: string;
  summary: string | null;
  status: string;
  premiered: string | null;
  rating: {
    average: number | null;
  };
  genres: string[];
  image: {
    medium: string;
    original: string;
  } | null;
  network: {
    name: string;
  } | null;
}

export interface SearchResult {
  score: number;
  show: Show;
}

export interface Review {
  rating: number;
  episodeReached: number;
  comment: string;
  containsSpoilers: boolean;
}

export interface WatchlistItem {
  id: number;
  name: string;
  image: string | null;
  status: "watching" | "planned" | "completed";
  addedAt: number;
  review?: Review;
}

export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  summary: string | null;
}
