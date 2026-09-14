import Image from "next/image";
import type { Show } from "@/types/shows";
import Link from "next/link";

interface ShowCardProps {
  show: Show;
}

export default function ShowCard({ show }: ShowCardProps) {
  return (
    <Link
      href={`/shows/${show.id}`}
      className="flex gap-4 rounded-lg border border-gray-200 p-4 shadow-sm hover:bg-gray-50"
    >
      {show.image ? (
        <Image
          src={show.image.medium}
          alt={show.name}
          width={100}
          height={140}
          className="rounded-md object-cover"
        />
      ) : (
        <div className="flex h-[140px] w-[100px] items-center justify-center rounded-md bg-gray-200 text-xs text-gray-500">
          Nema slike
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold">{show.name}</h2>
        <p className="text-sm text-gray-500">
          {show.premiered ? show.premiered.slice(0, 4) : "Nepoznata godina"}
        </p>
        <p className="text-sm text-gray-500">
          Ocjena: {show.rating.average ?? "N/A"}
        </p>
        <p className="mt-1 text-sm text-gray-600">{show.genres.join(", ")}</p>
      </div>
    </Link>
  );
}
