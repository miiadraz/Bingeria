"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  reviewSchema,
  type ReviewFormInput,
  type ReviewFormOutput,
} from "@/lib/schemas";
import { addReview } from "@/lib/actions";

interface ReviewFormProps {
  showId: number;
}

interface ActionState {
  success: boolean;
  message?: string;
}

const initialState: ActionState = { success: false };

export default function ReviewForm({ showId }: ReviewFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      episodeReached: 0,
      comment: "",
      containsSpoilers: false,
    },
  });

  const [state, dispatch, isPending] = useActionState(
    async (_prevState: ActionState, values: ReviewFormOutput) => {
      const result = await addReview(showId, values);
      if (result.success) {
        router.push("/watchlist");
      }
      return result;
    },
    initialState,
  );

  return (
    <form
      onSubmit={handleSubmit((values) => dispatch(values as ReviewFormOutput))}
      className="mt-4 max-w-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium">Ocjena (1–10)</label>
        <input
          type="number"
          {...register("rating")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-black"
        />
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">
          Do koje si epizode došao/došla
        </label>
        <input
          type="number"
          {...register("episodeReached")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-black"
        />
        {errors.episodeReached && (
          <p className="mt-1 text-sm text-red-600">
            {errors.episodeReached.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Komentar</label>
        <textarea
          {...register("comment")}
          rows={4}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-black"
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="containsSpoilers"
          {...register("containsSpoilers")}
        />
        <label htmlFor="containsSpoilers" className="text-sm">
          Sadrži spoilere
        </label>
      </div>

      {state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Spremanje..." : "Spremi recenziju"}
      </button>
    </form>
  );
}
