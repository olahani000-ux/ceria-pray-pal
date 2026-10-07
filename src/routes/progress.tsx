import { createFileRoute } from "@tanstack/react-router";
import { ProgressScreen } from "@/components/rajin/screens";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress Anak — Rajin Sholat" },
      { name: "description", content: "Perkembangan sholat dan aktivitas mingguan anak." },
      { property: "og:title", content: "Progress Anak — Rajin Sholat" },
      { property: "og:description", content: "Perkembangan sholat dan aktivitas mingguan anak." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgressScreen,
});
