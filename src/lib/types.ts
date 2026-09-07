//tipovi prema tvmaze APIju

export type ShowImage = {
  medium: string;
  original: string;
} | null;

export type ShowRating = {
  average: number | null;
};

export type Show = {
  id: number;
  name: string;
  type: string;
  language: string | null;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string | null;
  ended: string | null;
  rating: ShowRating;
  image: ShowImage;
  summary: string | null;
};

export type Episode = {
  id: number;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  runtime: number | null;
  rating: ShowRating;
  image: ShowImage;
  summary: string | null;
};
