import Image from "next/image";
import Link from "next/link";
import { readWatchlist } from "@/lib/db";
import { removeFromWatchlist } from "@/lib/actions";
import StatusSelect from "@/components/StatusSelect";
import ReviewForm from "@/components/ReviewForm";
import ReviewDisplay from "@/components/ReviewDisplay";
import WatchlistStats from "@/components/WatchlistStats";
import SortButtons from "@/components/SortButtons";

interface WatchlistPageProps {
  searchParams: Promise<{ sort?: string }>;
}

export default async function WatchlistPage({
  searchParams,
}: WatchlistPageProps) {
  const { sort } = await searchParams;
  const currentSort = sort === "rating" ? "rating" : "date";

  const watchlist = await readWatchlist();

  if (watchlist.length === 0) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold">Moja watchlista</h1>
        <p className="mt-4 text-gray-500">
          Još nema dodanih serija. Pretraži i dodaj neku!
        </p>
      </main>
    );
  }

  // Kopiramo niz prije sortiranja — .sort() mutira original na mjestu,
  // a podatak koji smo dohvatile ne smijemo mijenjati izravno.
  const sortedWatchlist = [...watchlist].sort((a, b) => {
    if (currentSort === "rating") {
      const ratingA = a.review?.rating ?? -1;
      const ratingB = b.review?.rating ?? -1;
      return ratingB - ratingA;
    }
    return b.addedAt - a.addedAt;
  });

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Moja watchlista</h1>

      <div className="mt-4">
        <WatchlistStats watchlist={watchlist} />
      </div>

      <div className="mt-4">
        <SortButtons currentSort={currentSort} />
      </div>

      <ul className="mt-6 space-y-3">
        {sortedWatchlist.map((item) => {
          async function removeAction(_formData: FormData) {
            "use server";
            await removeFromWatchlist(item.id);
          }

          return (
            <li
              key={item.id}
              className="rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={84}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-[84px] w-[60px] items-center justify-center rounded-md bg-gray-200 text-xs text-gray-500">
                    Nema slike
                  </div>
                )}

                <Link
                  href={`/shows/${item.id}`}
                  className="flex-1 font-semibold"
                >
                  {item.name}
                </Link>

                <StatusSelect id={item.id} status={item.status} />

                <form action={removeAction}>
                  <button
                    type="submit"
                    className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                  >
                    Ukloni
                  </button>
                </form>
              </div>

              {item.review ? (
                <ReviewDisplay review={item.review} />
              ) : (
                <ReviewForm showId={item.id} />
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
