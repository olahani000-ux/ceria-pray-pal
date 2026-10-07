import { createFileRoute } from "@tanstack/react-router";
import { ChallengeScreen } from "@/components/rajin/screens";

export const Route = createFileRoute("/challenge")({
  head: () => ({
    meta: [
      { title: "Challenge Minggu Ini — Rajin Sholat" },
      { name: "description", content: "Lihat perjalanan lima waktu sholat dalam tujuh hari." },
      { property: "og:title", content: "Challenge Minggu Ini — Rajin Sholat" },
      {
        property: "og:description",
        content: "Lihat perjalanan lima waktu sholat dalam tujuh hari.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChallengeScreen,
});
