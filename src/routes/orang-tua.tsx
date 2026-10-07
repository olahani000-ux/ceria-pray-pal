import { createFileRoute } from "@tanstack/react-router";
import { ParentScreen } from "@/components/rajin/screens";

export const Route = createFileRoute("/orang-tua")({
  head: () => ({
    meta: [
      { title: "Mode Orang Tua — Rajin Sholat" },
      {
        name: "description",
        content: "Dampingi anak dan lihat perkembangan kebiasaan sholat mereka.",
      },
      { property: "og:title", content: "Mode Orang Tua — Rajin Sholat" },
      {
        property: "og:description",
        content: "Dampingi anak dan lihat perkembangan kebiasaan sholat mereka.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ParentScreen,
});
