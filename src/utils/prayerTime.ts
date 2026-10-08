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

const DEFAULT_SCHEDULES: Record<PrayerId, PrayerSchedule> = {
  subuh: { startHour: 4, startMinute: 30, endHour: 6, endMinute: 0 },
  dzuhur: { startHour: 11, startMinute: 50, endHour: 15, endMinute: 0 },
  ashar: { startHour: 15, startMinute: 10, endHour: 18, endMinute: 0 },
  maghrib: { startHour: 18, startMinute: 5, endHour: 19, endMinute: 15 },
  isya: { startHour: 19, startMinute: 20, endHour: 23, endMinute: 59 },
};

export function getPrayerStatus(prayerId: PrayerId, now: Date = new Date()): PrayerStatusResult {
  const schedule = DEFAULT_SCHEDULES[prayerId];
  if (!schedule) {
    return { status: 'open', message: 'Waktu sholat telah tiba' };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = schedule.startHour * 60 + schedule.startMinute;
  const endMinutes = schedule.endHour * 60 + schedule.endMinute;

  if (currentMinutes < startMinutes) {
    const diff = startMinutes - currentMinutes;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    const countdown = hours > 0 ? `${hours} jam ${minutes} menit lagi` : `${minutes} menit lagi`;
    return {
      status: 'locked',
      message: `Belum masuk waktu (${countdown})`,
    };
  }

  if (currentMinutes > endMinutes) {
    return {
      status: 'late',
      message: 'Waktu sholat sudah lewat, tetap dihitung ya!',
    };
  }

  return {
    status: 'open',
    message: 'Waktu sholat sedang berlangsung',
  };
}
