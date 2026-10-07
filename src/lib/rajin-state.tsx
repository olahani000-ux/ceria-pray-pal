import { createContext, useContext, useState, type ReactNode } from 'react';
import girl from '@/assets/aisyah.png';
import boy from '@/assets/ahmad.png';

export const prayers = [
  { name: 'Subuh', time: '05:00', symbol: '◔', tone: 'blue' },
  { name: 'Dzuhur', time: '12:00', symbol: '☀', tone: 'gold' },
  { name: 'Ashar', time: '15:30', symbol: '▰', tone: 'blue' },
  { name: 'Maghrib', time: '18:00', symbol: '♨', tone: 'rose' },
  { name: 'Isya', time: '19:00', symbol: '☾', tone: 'violet' },
];
export const characters = [{ image: girl, name: 'Aisyah', tone: 'pink' }, { image: boy, name: 'Ahmad', tone: 'mint' }, { image: girl, name: 'Fatimah', tone: 'peach' }, { image: girl, name: 'Maryam', tone: 'blue' }];
export type Child = { name: string; stars: number; character: number; color: number };
type AppState = { children: Child[]; addChild: (child: Child) => void; activeChild: number; setActiveChild: (n: number) => void; reward: string; setReward: (s: string) => void; completedPrayer: string; setCompletedPrayer: (s: string) => void };
const Context = createContext<AppState | null>(null);
export function RajinProvider({ children }: { children: ReactNode }) {
  const [kids, setKids] = useState<Child[]>([{ name: 'Aisyah', stars: 33, character: 0, color: 0 }, { name: 'Ahmad', stars: 28, character: 1, color: 2 }, { name: 'Fatimah', stars: 31, character: 2, color: 0 }]);
  const [activeChild, setActiveChild] = useState(0);
  const [reward, setReward] = useState('Jalan-jalan naik sepeda bersama Mama ♡');
  const [completedPrayer, setCompletedPrayer] = useState('Dzuhur');
  return <Context.Provider value={{ children: kids, addChild: child => setKids(prev => [...prev, child]), activeChild, setActiveChild, reward, setReward, completedPrayer, setCompletedPrayer }}>{children}</Context.Provider>;
}
export function useRajin() { const value = useContext(Context); if (!value) throw new Error('RajinProvider is required'); return value; }
