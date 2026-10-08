import { createServerFn } from "@tanstack/react-start";
import { parentPinSchema } from "./parent-pin";

// This gate validates entry into the preview UI, not access to persisted data.
// Future private data operations must independently authenticate the parent.
export const verifyParentPin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => parentPinSchema.parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["PARENT_MODE_PIN"];
    if (!expected || !/^\d{4}$/.test(expected)) {
      throw new Error("PIN belum tersedia. Coba lagi nanti.");
    }
    const { timingSafeEqual } = await import("node:crypto");
    return { valid: timingSafeEqual(Buffer.from(data.pin), Buffer.from(expected)) };
  });