import { createFileRoute } from '@tanstack/react-router';
import { CollectionScreen } from '@/components/rajin/screens';

export const Route = createFileRoute('/koleksi')({
  head: () => ({ meta: [
    { title: 'Koleksi Badge — Rajin Sholat' },
    { name: 'description', content: 'Koleksi pencapaian dan badge perjalanan sholat anak.' },
    { property: 'og:title', content: 'Koleksi Badge — Rajin Sholat' },
    { property: 'og:description', content: 'Koleksi pencapaian dan badge perjalanan sholat anak.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: CollectionScreen,
});
