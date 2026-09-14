import Image from "next/image";
import Link from "next/link";
import { readWatchlist } from "@/lib/db";
import { removeFromWatchlist } from "@/lib/actions";
import StatusSelect from "@/components/StatusSelect";

export default async function WatchlistPage() {
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

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Moja watchlista</h1>

      <ul className="mt-6 space-y-3">
        {watchlist.map((item) => {
          const removeAction = removeFromWatchlist.bind(null, item.id);

          return (
            <li
              key={item.id}
              className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 shadow-sm"
            >
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

              <Link href={`/shows/${item.id}`} className="flex-1 font-semibold">
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
            </li>
          );
        })}
      </ul>
    </main>
  );
}
