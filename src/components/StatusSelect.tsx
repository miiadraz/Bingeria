"use client";

import { useRef } from "react";
import { updateWatchlistStatus } from "@/lib/actions";
import type { WatchlistItem } from "@/types/shows";

const STATUS_LABELS = {
  watching: "Gledam",
  planned: "Planiram",
  completed: "Odgledano",
} as const;

interface StatusSelectProps {
  id: number;
  status: WatchlistItem["status"];
}

export default function StatusSelect({ id, status }: StatusSelectProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const updateAction = updateWatchlistStatus.bind(null, id);

  return (
    <form ref={formRef} action={updateAction}>
      <select
        name="status"
        defaultValue={status}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded-md border border-gray-300 px-2 py-1 text-black"
      >
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </form>
  );
}
