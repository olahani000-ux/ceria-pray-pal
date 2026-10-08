import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { getPrayerStatus, type PrayerId } from '../utils/prayerTime';

interface PrayerLockButtonProps {
  prayerId: PrayerId;
  done: boolean;
  onToggle: () => void;
  /** Mode orang tua: melewati gembok (untuk testing). Simpan state-nya di komponen induk kartu. */
  isParentMode?: boolean;
  label?: string;
}

/**
 * Tombol aksi untuk kartu sholat dengan Time-Lock.
 * Pakai di dalam kartu sholat yang sudah ada, menggantikan tombol "tandai sholat" lama:
 *
 *   const [isParentMode, setIsParentMode] = useState(false);
 *   <PrayerLockButton prayerId="dzuhur" done={done} onToggle={toggle} isParentMode={isParentMode} />
 */
export default function PrayerLockButton({
  prayerId,
  done,
  onToggle,
  isParentMode = false,
  label = 'Sudah Sholat',
}: PrayerLockButtonProps) {
  const [now, setNow] = useState(() => new Date());

  // Perbarui countdown tiap 30 detik
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const { status, message } = getPrayerStatus(prayerId, now);
  const locked = status === 'locked' && !isParentMode;

  if (done) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="w-full rounded-2xl bg-green-500 px-4 py-3 font-semibold text-white"
      >
        Selesai ✓
      </button>
    );
  }

  if (locked) {
    return (
      <div className="w-full">
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-gray-200 px-4 py-3 font-semibold text-gray-500"
        >
          <Lock size={18} aria-hidden="true" />
          Terkunci 🔒
        </button>
        <p className="mt-1 text-center text-xs text-gray-500">{message}</p>
      </div>
    );
  }

  const styles =
    status === 'late'
      ? 'bg-yellow-400 text-yellow-950'
      : 'bg-green-500 text-white animate-pulse';

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full rounded-2xl px-4 py-3 font-semibold ${styles}`}
      >
        {label}
      </button>
      <p className="mt-1 text-center text-xs text-gray-500">
        {isParentMode && status === 'locked' ? 'Mode orang tua: gembok dilewati' : message}
      </p>
    </div>
  );
}
