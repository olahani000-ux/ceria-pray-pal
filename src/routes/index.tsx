import { createFileRoute } from "@tanstack/react-router";
import { WelcomeScreen } from "@/components/rajin/screens";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rajin Sholat — Langkah Kecil, Kebaikan Besar" },
      {
        name: "description",
        content:
          "Teman perjalanan anak untuk menjaga kebiasaan sholat selama tujuh hari bersama keluarga.",
      },
      { property: "og:title", content: "Rajin Sholat — Langkah Kecil, Kebaikan Besar" },
      {
        property: "og:description",
        content:
          "Teman perjalanan anak untuk menjaga kebiasaan sholat selama tujuh hari bersama keluarga.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WelcomeScreen,
});
