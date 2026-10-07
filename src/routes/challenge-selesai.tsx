import { createFileRoute } from '@tanstack/react-router';
import { ChallengeDoneScreen } from '@/components/rajin/screens';

export const Route = createFileRoute('/challenge-selesai')({
  head: () => ({ meta: [
    { title: 'Challenge Selesai — Rajin Sholat' },
    { name: 'description', content: 'Rayakan bintang mingguan dan hadiah bersama keluarga.' },
    { property: 'og:title', content: 'Challenge Selesai — Rajin Sholat' },
    { property: 'og:description', content: 'Rayakan bintang mingguan dan hadiah bersama keluarga.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ChallengeDoneScreen,
});
