import { createFileRoute } from '@tanstack/react-router';
import { AddChildScreen } from '@/components/rajin/screens';

export const Route = createFileRoute('/tambah-anak')({
  head: () => ({ meta: [
    { title: 'Tambah Anak — Rajin Sholat' },
    { name: 'description', content: 'Pilih nama, karakter, dan warna untuk teman kecil perjalanan sholat.' },
    { property: 'og:title', content: 'Tambah Anak — Rajin Sholat' },
    { property: 'og:description', content: 'Pilih nama, karakter, dan warna untuk teman kecil perjalanan sholat.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: AddChildScreen,
});
