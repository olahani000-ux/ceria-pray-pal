export type PrayerId = 'subuh' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya';

export interface PrayerStatusResult {
  status: 'locked' | 'open' | 'late';
  message: string;
}

interface PrayerSchedule {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

/**
 * Jadwal dasar = waktu Batam (sama seperti sebelumnya).
 * Isya sekarang berakhir 04:30 (masuk Subuh), jadi melewati tengah malam.
 */
const DEFAULT_SCHEDULES: Record<PrayerId, PrayerSchedule> = {
  subuh: { startHour: 4, startMinute: 30, endHour: 6, endMinute: 0 },
  dzuhur: { startHour: 11, startMinute: 50, endHour: 15, endMinute: 0 },
  ashar: { startHour: 15, startMinute: 10, endHour: 18, endMinute: 0 },
  maghrib: { startHour: 18, startMinute: 5, endHour: 19, endMinute: 15 },
  isya: { startHour: 19, startMinute: 20, endHour: 4, endMinute: 30 },
};

/* ------------------------------------------------------------------ */
/* Lokasi azan                                                         */
/* ------------------------------------------------------------------ */

export interface PrayerLocation {
  id: string;
  name: string;
  /** Selisih menit terhadap jadwal Batam (negatif = lebih awal). */
  offsetMinutes: number;
}

/**
 * CATATAN: offset ini PERKIRAAN berdasarkan selisih bujur kota terhadap Batam
 * (bukan jadwal resmi Kemenag). Cukup untuk fitur kunci waktu anak-anak.
 */
export const PRAYER_LOCATIONS: PrayerLocation[] = [
  { id: 'batam', name: 'Batam', offsetMinutes: 0 },
  { id: 'jakarta', name: 'Jakarta', offsetMinutes: -11 },
  { id: 'bandung', name: 'Bandung', offsetMinutes: -14 },
  { id: 'yogyakarta', name: 'Yogyakarta', offsetMinutes: -25 },
  { id: 'semarang', name: 'Semarang', offsetMinutes: -26 },
  { id: 'surabaya', name: 'Surabaya', offsetMinutes: -35 },
  { id: 'palembang', name: 'Palembang', offsetMinutes: -3 },
  { id: 'pekanbaru', name: 'Pekanbaru', offsetMinutes: 10 },
  { id: 'padang', name: 'Padang', offsetMinutes: 15 },
  { id: 'medan', name: 'Medan', offsetMinutes: 21 },
  { id: 'makassar', name: 'Makassar (WITA)', offsetMinutes: -1 },
  { id: 'denpasar', name: 'Denpasar (WITA)', offsetMinutes: 15 },
];

const LOCATION_STORAGE_KEY = 'ceria_prayer_location';
const DEFAULT_LOCATION_ID = 'batam';

export function getPrayerLocationId(): string {
  try {
    const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (saved && PRAYER_LOCATIONS.some((l) => l.id === saved)) return saved;
  } catch {
    /* localStorage tidak tersedia */
  }
  return DEFAULT_LOCATION_ID;
}

export function setPrayerLocationId(id: string): void {
  if (!PRAYER_LOCATIONS.some((l) => l.id === id)) return;
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, id);
  } catch {
    /* abaikan */
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ceria:location-changed', { detail: id }));
  }
}

/* ------------------------------------------------------------------ */
/* Helper waktu                                                        */
/* ------------------------------------------------------------------ */

const MINUTES_PER_DAY = 24 * 60;
const normalize = (m: number) => ((m % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;

function getWindow(prayerId: PrayerId, locationId: string): { start: number; end: number } | null {
  const schedule = DEFAULT_SCHEDULES[prayerId];
  if (!schedule) return null;
  const offset = PRAYER_LOCATIONS.find((l) => l.id === locationId)?.offsetMinutes ?? 0;
  return {
    start: normalize(schedule.startHour * 60 + schedule.startMinute + offset),
    end: normalize(schedule.endHour * 60 + schedule.endMinute + offset),
  };
}

/**
 * Kunci "hari sholat" (YYYY-MM-DD). Sebelum Subuh masuk, masih dihitung hari
 * kemarin — jadi Isya yang dikerjakan lewat tengah malam tetap tercatat di
 * hari yang sama dengan Isya jam 19:xx. Pakai ini untuk menyimpan progres misi.
 */
export function getPrayerDayKey(
  now: Date = new Date(),
  locationId: string = getPrayerLocationId()
): string {
  const subuh = getWindow('subuh', locationId);
  const d = new Date(now);
  if (subuh && d.getHours() * 60 + d.getMinutes() < subuh.start) {
    d.setDate(d.getDate() - 1);
  }
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/* ------------------------------------------------------------------ */
/* Status sholat                                                       */
/* ------------------------------------------------------------------ */

export function getPrayerStatus(
  prayerId: PrayerId,
  now: Date = new Date(),
  locationId: string = getPrayerLocationId()
): PrayerStatusResult {
  const win = getWindow(prayerId, locationId);
  if (!win) {
    return { status: 'open', message: 'Waktu sholat telah tiba' };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const { start, end } = win;

  // Rentang yang melewati tengah malam (contoh: Isya 19:20 -> 04:30)
  const wrapsMidnight = end <= start;
  const inWindow = wrapsMidnight
    ? currentMinutes >= start || currentMinutes < end
    : currentMinutes >= start && currentMinutes <= end;

  if (inWindow) {
    return {
      status: 'open',
      message: 'Waktu sholat sedang berlangsung',
    };
  }

  if (currentMinutes < start) {
    const diff = start - currentMinutes;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    const countdown = hours > 0 ? `${hours} jam ${minutes} menit lagi` : `${minutes} menit lagi`;
    return {
      status: 'locked',
      message: `Belum masuk waktu (${countdown})`,
    };
  }

  return {
    status: 'late',
    message: 'Waktu sholat sudah lewat, tetap dihitung ya!',
  };
}
