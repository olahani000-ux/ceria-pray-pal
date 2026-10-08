import { z } from "zod";

export const parentPinSchema = z.object({
  pin: z.string().regex(/^\d{4}$/, "Masukkan PIN 4 digit."),
});