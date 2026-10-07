import { createFileRoute } from '@tanstack/react-router';
import { SettingsScreen } from '@/components/rajin/screens';

export const Route = createFileRoute('/pengaturan')({
  head: () => ({ meta: [
    { title: 'Pengaturan — Rajin Sholat' },
    { name: 'description', content: 'Atur tampilan pengingat sholat dan PIN orang tua.' },
    { property: 'og:title', content: 'Pengaturan — Rajin Sholat' },
    { property: 'og:description', content: 'Atur tampilan pengingat sholat dan PIN orang tua.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: SettingsScreen,
});
