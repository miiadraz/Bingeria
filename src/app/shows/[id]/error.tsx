"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen p-8">
      <h2 className="text-xl font-semibold text-red-600">
        Nešto je pošlo po krivu
      </h2>
      <p className="mt-2 text-gray-500">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Pokušaj ponovno
      </button>
    </main>
  );
}
