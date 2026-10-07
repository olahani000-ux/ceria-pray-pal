import { createFileRoute } from '@tanstack/react-router';
import { HomeScreen } from '@/components/rajin/screens';

export const Route = createFileRoute('/beranda')({
  head: () => ({ meta: [
    { title: 'Beranda — Rajin Sholat' },
    { name: 'description', content: 'Misi lima waktu sholat hari ini dan perjalanan bintang anak.' },
    { property: 'og:title', content: 'Beranda — Rajin Sholat' },
    { property: 'og:description', content: 'Misi lima waktu sholat hari ini dan perjalanan bintang anak.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: HomeScreen,
});
