import { createFileRoute } from '@tanstack/react-router';
import { RewardScreen } from '@/components/rajin/screens';

export const Route = createFileRoute('/reward')({
  head: () => ({ meta: [
    { title: 'Atur Reward — Rajin Sholat' },
    { name: 'description', content: 'Pilih hadiah penuh makna untuk pencapaian bintang mingguan.' },
    { property: 'og:title', content: 'Atur Reward — Rajin Sholat' },
    { property: 'og:description', content: 'Pilih hadiah penuh makna untuk pencapaian bintang mingguan.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: RewardScreen,
});
