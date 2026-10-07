import { createFileRoute } from "@tanstack/react-router";
import { PrayerDoneScreen } from "@/components/rajin/screens";

export const Route = createFileRoute("/sholat-selesai")({
  head: () => ({
    meta: [
      { title: "Sholat Selesai — Rajin Sholat" },
      { name: "description", content: "Rayakan satu langkah kebaikan dengan satu bintang sholat." },
      { property: "og:title", content: "Sholat Selesai — Rajin Sholat" },
      {
        property: "og:description",
        content: "Rayakan satu langkah kebaikan dengan satu bintang sholat.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrayerDoneScreen,
});
