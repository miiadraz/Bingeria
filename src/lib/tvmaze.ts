import type { Show, SearchResult, Episode } from "@/types/shows";

const BASE_URL = "https://api.tvmaze.com";

export async function searchShows(query: string): Promise<Show[]> {
  const res = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`,
  );

  if (!res.ok) {
    throw new Error("Neuspjelo dohvaćanje podataka s TVmaze API-ja");
  }

  const results: SearchResult[] = await res.json();
  return results.map((result) => result.show);
}

export async function getShowById(id: string): Promise<Show> {
  const res = await fetch(`${BASE_URL}/shows/${id}`);

  if (!res.ok) {
    throw new Error("Serija nije pronađena");
  }

  return res.json();
}

export async function getShowEpisodes(id: string): Promise<Episode[]> {
  const res = await fetch(`${BASE_URL}/shows/${id}/episodes`);

  if (!res.ok) {
    throw new Error("Neuspjelo dohvaćanje epizoda");
  }

  return res.json();
}

export async function getCatalog(): Promise<Show[]> {
  // Koristimo ISR (revalidate) umjesto force-cache ili no-store:
  // - no-store bi značio ponovni fetch na svaki request (zabranjeno kriterijem)
  // - force-cache bi zamrznuo katalog do sljedećeg builda/deploya, bez osvježavanja
  // - revalidate: 3600 keš-ira odgovor, ali ga automatski osvježi svakih sat vremena,
  //   što je dovoljno svježe za podatke koji se rijetko mijenjaju (ocjene, žanrovi)
  const res = await fetch(`${BASE_URL}/shows?page=0`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Neuspjelo dohvaćanje kataloga");
  }

  const allShows: Show[] = await res.json();
  return allShows.slice(0, 24);
}
