type PrayerName = "Subuh" | "Dzuhur" | "Ashar" | "Maghrib" | "Isya";

/** Small hand-drawn vector scenes, sharing rounded forms and the app palette. */
export function PrayerIcon({ name }: { name: string }) {
  return (
    <span className="prayer-illustration" aria-hidden="true">
      <svg viewBox="0 0 40 40" width="32" height="32" fill="none" strokeLinecap="round" strokeLinejoin="round" focusable="false">
        {name === "Subuh" && <>
          <circle cx="20" cy="21" r="15" className="prayer-art-mint-soft" />
          <path d="M20 5v3M9 11l2 2M31 11l-2 2" className="prayer-art-green-line" strokeWidth="2.2" />
          <path d="M10 25a10 10 0 0 1 20 0" className="prayer-art-green" />
          <path d="M13 24a7 7 0 0 1 7-7" className="prayer-art-light-line" strokeWidth="2" />
          <path d="M5 27c0-2 2-3 4-3 0-3 3-5 6-4 2-3 7-2 8 1 3-1 6 1 6 4h3a3 3 0 0 1 0 6H9c-2 0-4-2-4-4Z" className="prayer-art-cream" />
          <path d="M11 34h18M16 37h8" className="prayer-art-green-line" strokeWidth="2" />
        </>}
        {name === "Dzuhur" && <>
          <circle cx="20" cy="20" r="15" className="prayer-art-gold-soft" />
          <path d="M20 3v4M20 33v4M3 20h4M33 20h4M8 8l3 3M29 29l3 3M8 32l3-3M29 11l3-3" className="prayer-art-gold-line" strokeWidth="2.8" />
          <circle cx="20" cy="20" r="10" className="prayer-art-gold" />
          <path d="M14 18a6 6 0 0 1 6-5" className="prayer-art-light-line" strokeWidth="2.4" />
          <path d="M16 23c2 2 6 2 8 0" className="prayer-art-gold-line" strokeWidth="1.5" />
        </>}
        {name === "Ashar" && <>
          <circle cx="20" cy="21" r="15" className="prayer-art-blue-soft" />
          <path d="M27 3v3M36 9l-2 2M17 7l2 2" className="prayer-art-gold-line" strokeWidth="2.2" />
          <circle cx="26" cy="16" r="8" className="prayer-art-gold" />
          <path d="M23 13c0-1 2-2 3-2" className="prayer-art-light-line" strokeWidth="2" />
          <path d="M5 25c0-3 2-5 5-5 0-5 7-8 11-4 2-1 6 1 6 4 4-1 8 2 8 6 0 3-3 5-6 5H11c-4 0-6-2-6-6Z" className="prayer-art-blue" />
          <path d="M10 24c0-2 2-3 4-3M16 19c2-1 4 0 5 1" className="prayer-art-light-line" strokeWidth="2" />
          <path d="M12 35h16" className="prayer-art-blue-line" strokeWidth="2" />
        </>}
        {name === "Maghrib" && <>
          <circle cx="20" cy="21" r="15" className="prayer-art-rose-soft" />
          <path d="M20 5v3M8 12l3 2M32 12l-3 2" className="prayer-art-rose-line" strokeWidth="2.2" />
          <path d="M10 25a10 10 0 0 1 20 0" className="prayer-art-rose" />
          <path d="M14 22c0-3 3-5 6-5" className="prayer-art-peach-line" strokeWidth="2.2" />
          <path d="M5 27c6-3 9-1 15-1s10-2 15 1v5c-8 4-22 4-30 0Z" className="prayer-art-peach" />
          <path d="M7 28h26M12 33h16M17 37h6" className="prayer-art-rose-line" strokeWidth="2" />
        </>}
        {name === "Isya" && <>
          <circle cx="20" cy="21" r="15" className="prayer-art-night-soft" />
          <path d="M23 6a14 14 0 1 0 10 23C21 32 13 18 23 6Z" className="prayer-art-night" />
          <path d="M12 15c-4 7 0 14 5 16" className="prayer-art-night-light-line" strokeWidth="2.3" />
          <path d="m30 7 1.4 3.6L35 12l-3.6 1.4L30 17l-1.4-3.6L25 12l3.6-1.4Z" className="prayer-art-gold" />
          <circle cx="35" cy="22" r="1.6" className="prayer-art-night-light" />
        </>}
      </svg>
    </span>
  );
}

/** Pastel gold medal with ribbon and sparkles for the "Misi Hari Ini" header. */
export function MissionMedalIcon() {
  return (
    <span className="prayer-illustration mission-medal" aria-hidden="true">
      <svg viewBox="0 0 40 40" width="38" height="38" fill="none" strokeLinecap="round" strokeLinejoin="round" focusable="false">
        <path d="M11 2h8l-2 13-9-3.5Z" className="prayer-art-rose" />
        <path d="M29 2h-8l2 13 9-3.5Z" className="prayer-art-peach" />
        <path d="M11 2h8l-.7 4.5h-6.9Z" className="prayer-art-rose-line" strokeWidth="1" opacity="0.45" />
        <path d="M29 2h-8l.7 4.5h6.9Z" className="prayer-art-rose-line" strokeWidth="1" opacity="0.45" />
        <circle cx="20" cy="26" r="11" className="prayer-art-gold" />
        <circle cx="20" cy="26" r="7.5" className="prayer-art-gold-soft" />
        <path d="m20 21.5 1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5Z" className="prayer-art-cream" />
        <path d="M5.5 12.5v4M3.5 14.5h4" className="prayer-art-gold-line" strokeWidth="2" />
        <path d="M34.5 15.5v3M33 17h3" className="prayer-art-rose-line" strokeWidth="2" />
        <circle cx="34" cy="6.5" r="1.5" className="prayer-art-night-light" />
      </svg>
    </span>
  );
}