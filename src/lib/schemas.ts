import { z } from "zod";

export const reviewSchema = z
  .object({
    rating: z.coerce
      .number()
      .int()
      .min(1, "Ocjena mora biti između 1 i 10.")
      .max(10, "Ocjena mora biti između 1 i 10."),
    episodeReached: z.coerce
      .number()
      .int()
      .min(0, "Broj epizode ne može biti negativan."),
    comment: z.string().min(20, "Komentar mora imati barem 20 znakova."),
    containsSpoilers: z.boolean(),
  })
  .refine((data) => !data.containsSpoilers || data.comment.length >= 50, {
    message: "Komentar sa spoilerima mora imati barem 50 znakova.",
    path: ["comment"],
  });

export type ReviewFormValues = z.infer<typeof reviewSchema>;
