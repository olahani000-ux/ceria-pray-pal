import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";

type Timings = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
};

interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: Timings;
    date: {
      readable: string;
      hijri: {
        date: string;
        day: string;
        month: {
          en: string;
          ar: string;
        };
        year: string;
      };
      gregorian: {
        date: string;
        weekday: {
          en: string;
        };
      };
    };
  };
}

export function JadwalSholatBatam() {
  const [timings, setTimings] = useState<Timings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Batam&country=Indonesia&method=20")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data jadwal sholat");
        return res.json() as Promise<AladhanResponse>;
      })
      .then((data) => {
        if (isMounted) {
          if (data?.data?.timings) {
            setTimings(data.data.timings);
          } else {
            setError("Format data tidak sesuai");
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Gagal memuat jadwal sholat");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 shadow-sm animate-pulse">
        <div className="flex items-center gap-2 font-medium text-sm">
          <Clock className="w-4 h-4 animate-spin text-emerald-600" />
          <span>Memuat jadwal sholat Batam...</span>
        </div>
      </div>
    );
  }

  if (error || !timings) {
    return (
      <div className="p-4 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200 text-sm">
        <p className="font-semibold">⚠️ Gagal memuat jadwal sholat Batam</p>
        <p className="text-xs text-rose-600 mt-1">{error || "Silakan periksa koneksi internet."}</p>
      </div>
    );
  }

  const prayerList = [
    { nama: "Subuh", waktu: timings.Fajr },
    { nama: "Dzuhur", waktu: timings.Dhuhr },
    { nama: "Ashar", waktu: timings.Asr },
    { nama: "Maghrib", waktu: timings.Maghrib },
    { nama: "Isya", waktu: timings.Isha },
  ];

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>Batam, Kepulauan Riau (Kemenag)</span>
          </div>
          <h3 className="text-base font-bold tracking-tight mt-0.5">🕌 Jadwal Sholat Hari Ini</h3>
        </div>
        {currentTime && (
          <div className="text-right">
            <div className="text-[11px] text-emerald-100 font-medium">WIB</div>
            <div className="font-bold text-sm tracking-wide">{currentTime}</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {prayerList.map((item) => (
          <div
            key={item.nama}
            className="bg-white/15 backdrop-blur-sm rounded-xl p-2 text-center border border-white/10 flex flex-col justify-center items-center shadow-xs"
          >
            <span className="text-[11px] font-semibold text-emerald-100">{item.nama}</span>
            <span className="text-xs sm:text-sm font-bold mt-0.5 tracking-tight">{item.waktu}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JadwalSholatBatam;
