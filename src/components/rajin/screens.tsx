import { useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bike,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  House,
  LockKeyhole,
  Medal,
  Plus,
  Star,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Avatar,
  BottomNav,
  Encouragement,
  KidRow,
  Page,
  ProgressBar,
  SettingLink,
  Stars,
} from "./shared";
import { characters, prayers, useRajin } from "@/lib/rajin-state";
import welcome from "@/assets/welcome.jpg";
import girl from "@/assets/aisyah.png";
import scenery from "@/assets/celebration.jpg";
import { PrayerIcon, MissionMedalIcon } from "./prayer-icon";
import { useServerFn } from "@tanstack/react-start";
import { parentPinSchema } from "@/lib/parent-pin";
import { verifyParentPin } from "@/lib/parent-pin.functions";

export function WelcomeScreen() {
  return (
    <main className="welcome-screen">
      <img
        className="welcome-art"
        src={welcome}
        alt="Anak Muslim tersenyum di taman masjid"
        width={1024}
        height={1536}
        fetchPriority="high"
      />
      <div className="welcome-brand">
        <span className="brand-moon">☾</span>
        <div className="brand-ornament">
          <span>✦</span>
          <span className="little-mosque">♧</span>
          <span>✦</span>
        </div>
        <h1>
          Rajin
          <br />
          Sholat
        </h1>
        <p>7 Hari Menjaga Kebiasaan Baik</p>
        <span className="brand-rule">✧</span>
      </div>
      <div className="welcome-bottom">
        <Button variant="welcome" size="lg" asChild>
          <Link to="/beranda">
            Mulai <ArrowRight size={18} />
          </Link>
        </Button>
        <p>
          Bersama menuju anak yang lebih
          <br />
          dekat dengan Allah <Heart size={14} />
        </p>
      </div>
    </main>
  );
}

export function HomeScreen() {
  const state = useRajin();
  const kid = state.children[state.activeChild] ?? state.children[0];
  const [checked] = useState([true, true, false, false, false]);
  if (!kid) return null;
  return (
    <main className="app-page home-page with-nav">
      <header className="home-header">
        <Link to="/" className="back-dot" aria-label="Kembali ke awal">
          <ChevronLeft size={19} />
        </Link>
        <SettingLink />
        <div className="home-greeting">
          <Avatar character={kid.character} />
          <div>
            <p>Assalamu’alaikum,</p>
            <h1>{kid.name}</h1>
            <span className="tiny-label">Beranda</span>
          </div>
          <span className="greeting-spark">✧</span>
        </div>
      </header>
      <div className="page-content home-content">
        <section className="paper mission-paper">
          <p className="date-label">Senin, 28 April 2025</p>
          <div className="mission-title">
            <MissionMedalIcon />
            <div>
              <h2>Misi Hari Ini</h2>
              <p>Ayo selesaikan 5 waktu sholat hari ini!</p>
            </div>
          </div>
          <div className="prayer-list">
            {prayers.map((prayer, i) => (
              <Button
                variant="prayer"
                key={prayer.name}
                aria-label={`${prayer.name}${checked[i] ? " sudah selesai" : " selesai"}`}
                onClick={() => {
                  state.setCompletedPrayer(prayer.name);
                }}
                asChild
              >
                <Link to="/sholat-selesai">
                  <PrayerIcon name={prayer.name} />
                  <span className="prayer-label">
                    <strong>{prayer.name}</strong>
                    <small>{prayer.time}</small>
                  </span>
                  <span className={`check-circle ${checked[i] ? "done" : ""}`}>
                    {checked[i] && <Check size={19} />}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
          <div className="daily-summary">
            <strong>2 / 5 selesai</strong>
            <div className="progress-line">
              <ProgressBar value={40} />
              <span>40%</span>
            </div>
            <Encouragement>
              Kamu hebat! Terus semangat ya! <Heart size={13} />
            </Encouragement>
          </div>
        </section>
        <Link className="home-challenge-link" to="/challenge">
          <Trophy size={19} />
          <span>Challenge minggu ini</span>
          <span>
            18 / 35 <Star size={14} fill="currentColor" />
          </span>
          <ChevronRight size={17} />
        </Link>
      </div>
      <BottomNav active="Beranda" />
    </main>
  );
}

export function PrayerDoneScreen() {
  const { completedPrayer } = useRajin();
  return (
    <main className="celebration-page">
      <img
        src={scenery}
        className="celebration-scenery"
        alt="Taman masjid dengan bintang emas"
        width={1024}
        height={1536}
      />
      <Button variant="softIcon" size="icon" className="celebration-back" asChild>
        <Link to="/beranda" aria-label="Kembali">
          <ArrowLeft />
        </Link>
      </Button>
      <div className="celebration-heading">
        <span className="floating-star star-one">✦</span>
        <h1>MasyaAllah!</h1>
        <p>
          Kamu sudah menyelesaikan
          <br />
          <strong>Sholat {completedPrayer}</strong> <Star size={16} fill="currentColor" />
        </p>
        <span className="floating-star star-two">✦</span>
      </div>
      <img
        src={girl}
        alt="Aisyah tersenyum bahagia selesai sholat"
        className="celebration-girl"
        width={1024}
        height={1024}
      />
      <div className="celebration-bottom">
        <section className="paper earned-paper">
          <div className="earned-title">
            <span className="big-star">
              <Star size={38} fill="currentColor" />
            </span>
            <h2>+1 Bintang</h2>
          </div>
          <p>
            Satu lagi misi selesai!
            <br />
            Semoga semakin dekat
            <br />
            dengan Allah <Heart size={15} />
          </p>
        </section>
        <Button variant="joy" size="lg" asChild>
          <Link to="/beranda">
            Alhamdulillah <Check size={19} />
          </Link>
        </Button>
      </div>
    </main>
  );
}

const weekRows = [
  [true, true, true, false, false, false, false],
  [true, true, false, false, false, false, false],
  [true, false, false, false, false, false, false],
  [true, true, false, false, false, false, false],
  [true, false, false, false, false, false, false],
];
export function ChallengeScreen() {
  const [week, setWeek] = useState(0);
  const [dateOpen, setDateOpen] = useState(false);
  const [chosenDate, setChosenDate] = useState("2025-04-28");
  return (
    <Page title="Challenge Minggu Ini" active="Challenge">
      <div className="week-switch">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Minggu sebelumnya"
          onClick={() => setWeek(week - 1)}
        >
          <ChevronLeft size={19} />
        </Button>
        <span>
          {week === 0 ? "28 Apr – 4 Mei 2025" : week < 0 ? "21 – 27 April 2025" : "5 – 11 Mei 2025"}
        </span>
        <Button
          variant="softIcon"
          size="icon"
          aria-label="Pilih tanggal"
          onClick={() => setDateOpen(!dateOpen)}
        >
          <CalendarDays size={19} />
        </Button>
      </div>
      {dateOpen && (
        <label className="date-picker-label">
          Tanggal minggu
          <input
            type="date"
            value={chosenDate}
            onChange={(e) => {
              setChosenDate(e.target.value);
              setWeek(e.target.value < "2025-04-28" ? -1 : e.target.value > "2025-05-04" ? 1 : 0);
              setDateOpen(false);
            }}
          />
        </label>
      )}
      <section className="paper challenge-summary">
        <h2>Progress</h2>
        <div className="total-stars">
          {week === 0 ? 18 : week < 0 ? 33 : 0} / 35 <Star fill="currentColor" size={30} />
        </div>
        <div className="progress-line">
          <ProgressBar value={week === 0 ? 51 : week < 0 ? 94 : 0} />
          <span>{week === 0 ? 51 : week < 0 ? 94 : 0}%</span>
        </div>
      </section>
      <section className="week-grid" aria-label="Jadwal sholat mingguan">
        <div className="week-grid-head">
          <span />
          {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        {prayers.map((prayer, row) => (
          <div key={prayer.name} className="week-grid-row">
            <span className="week-prayer">
              <PrayerIcon name={prayer.name} />
              {prayer.name}
            </span>
            {(weekRows[row] ?? []).map((done, col) => (
              <span
                key={col}
                className={`week-cell ${done && week <= 0 ? "complete" : ""}`}
                aria-label={`${prayer.name}, ${["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"][col]}: ${done && week <= 0 ? "selesai" : "belum selesai"}`}
              >
                {done && week <= 0 ? <Check size={13} /> : <span />}
              </span>
            ))}
          </div>
        ))}
      </section>
      <Encouragement>
        Ayo selesaikan misi minggu ini!
        <br />
        <small>Setiap usaha kamu sangat berarti. ♡</small>
      </Encouragement>
      <Link to="/challenge-selesai" className="reward-preview">
        <Gift size={23} />
        <div>
          <strong>Reward minggu ini</strong>
          <span>Lihat perjalanan & hadiahmu</span>
        </div>
        <ChevronRight size={20} />
      </Link>
    </Page>
  );
}

const badges = [
  {
    name: "Aku Mulai",
    desc: "Menyelesaikan challenge pertama",
    icon: House,
    tone: "mint",
    achieved: true,
  },
  {
    name: "Hari Lengkap",
    desc: "5 sholat dalam satu hari",
    icon: Star,
    tone: "gold",
    achieved: true,
  },
  {
    name: "3 Hari Konsisten",
    desc: "Menyelesaikan 3 hari berturut-turut",
    icon: Star,
    tone: "blue",
    achieved: true,
  },
  {
    name: "7 Hari Hebat",
    desc: "Menyelesaikan challenge mingguan",
    icon: Trophy,
    tone: "rose",
    achieved: true,
  },
  {
    name: "14 Hari Luar Biasa",
    desc: "Semangat terus, ya!",
    icon: LockKeyhole,
    tone: "locked",
    achieved: false,
  },
  {
    name: "30 Hari Konsisten",
    desc: "Sedikit demi sedikit jadi terbiasa",
    icon: LockKeyhole,
    tone: "locked",
    achieved: false,
  },
];
export function CollectionScreen() {
  const [filter, setFilter] = useState("Semua");
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Page title="Koleksi Badge" active="Koleksi">
      <div className="segment">
        {["Semua", "Tercapai", "Belum"].map((x) => (
          <Button key={x} variant="segment" data-active={filter === x} onClick={() => setFilter(x)}>
            {x}
          </Button>
        ))}
      </div>
      <div className="badge-grid">
        {badges.map(
          (badge, i) =>
            (filter === "Semua" || (filter === "Tercapai" ? badge.achieved : !badge.achieved)) && (
              <Button key={badge.name} variant="badgeTile" onClick={() => setSelected(i)}>
                <span className={`badge-medallion ${badge.tone}`}>
                  <badge.icon size={31} fill={badge.icon === Star ? "currentColor" : "none"} />
                </span>
                <strong>{badge.name}</strong>
                <span>{badge.desc}</span>
              </Button>
            ),
        )}
      </div>
      {selected !== null && (
        <div className="modal-scrim" onClick={() => setSelected(null)}>
          <section
            className="badge-dialog paper"
            role="dialog"
            aria-modal="true"
            aria-label={badges[selected]?.name}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`badge-medallion ${badges[selected]?.tone}`}>
              <Medal size={36} />
            </span>
            <h2>{badges[selected]?.name}</h2>
            <p>{badges[selected]?.desc}</p>
            <Encouragement>
              {badges[selected]?.achieved
                ? "MasyaAllah, kamu hebat! ⭐"
                : "Terus semangat untuk meraih badge ini! ♡"}
            </Encouragement>
            <Button variant="joy" onClick={() => setSelected(null)}>
              Kembali ke koleksi
            </Button>
          </section>
        </div>
      )}
    </Page>
  );
}

export function ChallengeDoneScreen() {
  const { reward } = useRajin();
  return (
    <main className="celebration-page challenge-done">
      <img
        src={scenery}
        className="celebration-scenery"
        alt="Taman masjid dan bintang perayaan"
        width={1024}
        height={1536}
      />
      <Button variant="softIcon" size="icon" className="celebration-back" asChild>
        <Link to="/challenge" aria-label="Kembali">
          <ArrowLeft />
        </Link>
      </Button>
      <div className="celebration-heading">
        <span className="floating-star star-one">✦</span>
        <h1>MasyaAllah!</h1>
        <p>Challenge minggu ini selesai!</p>
        <span className="floating-star star-two">✦</span>
      </div>
      <img
        className="celebration-girl"
        src={girl}
        alt="Anak Muslim merayakan challenge"
        width={1024}
        height={1024}
      />
      <div className="celebration-bottom">
        <section className="paper weekly-earned">
          <h2>Total Bintang</h2>
          <strong>33 / 35</strong>
          <Stars count={10} />
          <p>
            Hebat! Kamu sudah berusaha
            <br />
            menjaga sholatmu selama satu minggu. ♡
          </p>
        </section>
        <section className="paper unlocked-paper">
          <div className="unlock-title">
            <Gift size={35} />
            <div>
              <span>Reward Kamu</span>
              <h2>
                TERBUKA! <Star size={17} fill="currentColor" />
              </h2>
            </div>
          </div>
          <div className="unlock-copy">
            <p>
              <strong>Waktu bersama Mama</strong>
              <br />
              {reward}
            </p>
            <Bike size={46} />
          </div>
        </section>
        <div className="celebration-actions">
          <Button variant="joy" size="lg" asChild>
            <Link to="/progress">
              Lihat Detail <ArrowRight size={16} />
            </Link>
          </Button>
          <Button variant="welcome" size="icon" asChild>
            <Link to="/beranda" aria-label="Beranda">
              <House size={21} />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export function ParentScreen() {
  const [tab, setTab] = useState("Ringkasan");
  const { children, reward } = useRajin();
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [checking, setChecking] = useState(false);
  const verifyPin = useServerFn(verifyParentPin);

  async function enterParentMode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (checking) return;
    const input = parentPinSchema.safeParse({ pin });
    if (!input.success) {
      setPinError("Masukkan PIN 4 digit.");
      return;
    }
    setChecking(true);
    setPinError("");
    try {
      const result = await verifyPin({ data: input.data });
      setPin("");
      if (result.valid) setUnlocked(true);
      else setPinError("PIN salah, coba lagi.");
    } catch {
      setPinError("PIN belum dapat diperiksa. Coba lagi.");
    } finally {
      setChecking(false);
    }
  }

  if (!unlocked) {
    return (
      <Page title="Mode Orang Tua" back="/beranda" active="Mama">
        <form className="paper parent-pin-form" onSubmit={enterParentMode} noValidate>
          <LockKeyhole size={38} aria-hidden="true" />
          <h2>Masukkan PIN</h2>
          <label className="form-label" htmlFor="parent-pin">PIN Mode Orang Tua</label>
          <input
            id="parent-pin"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            pattern="[0-9]{4}"
            maxLength={4}
            value={pin}
            disabled={checking}
            aria-invalid={Boolean(pinError)}
            aria-describedby={pinError ? "parent-pin-error" : undefined}
            onChange={(event) => {
              setPin(event.target.value.replace(/\D/g, "").slice(0, 4));
              setPinError("");
            }}
          />
          {pinError && <p id="parent-pin-error" className="form-error" role="alert">{pinError}</p>}
          <Button variant="joy" size="lg" type="submit" disabled={checking}>
            {checking ? "Memeriksa…" : "Masuk"}
          </Button>
        </form>
      </Page>
    );
  }
  return (
    <Page title="Mode Orang Tua" action={<SettingLink />} active="Mama">
      <div className="segment">
        {["Ringkasan", "Anak-anak", "Reward"].map((x) => (
          <Button variant="segment" data-active={tab === x} key={x} onClick={() => setTab(x)}>
            {x}
          </Button>
        ))}
      </div>
      {tab !== "Reward" ? (
        <>
          <div className="section-title">
            <h2>Anak-anak</h2>
            <Button variant="sky" size="sm" asChild>
              <Link to="/tambah-anak">
                <Plus size={15} /> Tambah Anak
              </Link>
            </Button>
          </div>
          <div className="kid-list">
            {children.map((_, i) => (
              <KidRow key={i} index={i} />
            ))}
          </div>
          {tab === "Ringkasan" && (
            <>
              <div className="parent-note">
                <Heart size={22} />
                <p>
                  Setiap langkah kecil layak dirayakan.
                  <br />
                  <strong>Terima kasih sudah mendampingi. ♡</strong>
                </p>
              </div>
              <Link to="/reward" className="reward-preview">
                <Gift size={22} />
                <div>
                  <strong>Reward minggu ini</strong>
                  <span>Atur hadiah penuh makna</span>
                </div>
                <ChevronRight size={20} />
              </Link>
            </>
          )}
        </>
      ) : (
        <>
          <section className="paper parent-reward">
            <Gift size={43} />
            <h2>Reward Minggu Ini</h2>
            <p>{reward}</p>
            <span className="tiny-label">Target: 30 bintang</span>
            <Button variant="joy" asChild>
              <Link to="/reward">
                Atur Reward <ChevronRight size={17} />
              </Link>
            </Button>
          </section>
          <Link to="/challenge-selesai" className="reward-preview">
            <Trophy size={23} />
            <div>
              <strong>Perayaan mingguan</strong>
              <span>Lihat bintang dan reward</span>
            </div>
            <ChevronRight size={20} />
          </Link>
        </>
      )}
    </Page>
  );
}

export function ProgressScreen() {
  const { children, activeChild } = useRajin();
  const kid = children[activeChild] ?? children[0];
  const [period, setPeriod] = useState("Minggu Ini");
  if (!kid) return null;
  const pct = Math.round((kid.stars / 35) * 100);
  const amounts =
    period === "Minggu Ini" ? [78, 83, 71, 48, 80, 55, 80] : [65, 73, 85, 56, 92, 85, 95];
  return (
    <Page
      title={`Progress ${kid.name}`}
      back="/orang-tua"
      action={
        <label className="period-select">
          <select
            aria-label="Periode progress"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>Minggu Ini</option>
            <option>Minggu Lalu</option>
          </select>
          <ChevronDown size={14} />
        </label>
      }
    >
      <section className="paper progress-paper">
        <div className="progress-overview">
          <div className="progress-ring">
            <svg viewBox="0 0 100 100" aria-label={`${pct}% selesai`}>
              <circle cx="50" cy="50" r="41" className="ring-track" />
              <circle
                cx="50"
                cy="50"
                r="41"
                className="ring-value"
                strokeDasharray={`${pct * 2.576} 257.6`}
              />
            </svg>
            <Star size={25} />
          </div>
          <div>
            <strong>{kid.stars} / 35</strong>
            <span>{pct}%</span>
          </div>
        </div>
        <div className="prayer-stats">
          {prayers.map((p, i) => (
            <div key={p.name}>
              <PrayerIcon name={p.name} />
              <small>{p.name}</small>
              <strong className={i === 2 ? "incomplete-stat" : ""}>
                {i === 0 || i === 2 ? "6" : "7"} / 7
              </strong>
            </div>
          ))}
        </div>
      </section>
      <section className="paper activity-paper">
        <div className="section-title">
          <h2>Aktivitas Mingguan</h2>
        </div>
        <div className="chart-legend">
          <span>
            <i /> Lengkap
          </span>
          <span>
            <i /> Belum lengkap
          </span>
        </div>
        <div className="activity-chart">
          {amounts.map((amount, i) => (
            <div className="chart-column" key={i}>
              <div className="chart-bar">
                <span style={{ height: `${amount}%` }} />
              </div>
              <small>{["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][i]}</small>
            </div>
          ))}
        </div>
      </section>
      <Link to="/challenge-selesai" className="reward-preview">
        <Trophy size={24} />
        <div>
          <strong>Perjalanan yang luar biasa!</strong>
          <span>Lihat hasil challenge mingguan</span>
        </div>
        <ChevronRight size={20} />
      </Link>
      <Button variant="sky" className="full-width" asChild>
        <Link to="/reward">
          <Gift size={18} /> Atur Reward {kid.name}
        </Link>
      </Button>
    </Page>
  );
}

const rewardTemplates = [
  { icon: "🍦", text: "Pilih jajanan favorit" },
  { icon: "🎮", text: "Tambahan waktu bermain" },
  { icon: "📚", text: "Pilih buku baru" },
  { icon: "🏡", text: "Jalan-jalan bersama keluarga" },
];
export function RewardScreen() {
  const state = useRajin();
  const [enabled, setEnabled] = useState(true);
  const [target, setTarget] = useState("30");
  const [reward, setReward] = useState(state.reward);
  const [saved, setSaved] = useState(false);
  function save() {
    if (!reward.trim()) return;
    state.setReward(reward);
    setSaved(true);
  }
  return (
    <Page
      title="Atur Reward"
      back="/orang-tua"
      action={
        <Button variant="sky" size="sm" onClick={save}>
          {saved ? <Check size={16} /> : null}
          {saved ? "Tersimpan" : "Simpan"}
        </Button>
      }
    >
      <section className="paper reward-form">
        <h2>Reward Minggu Ini</h2>
        <p className="muted-copy">Tentukan reward jika mencapai target bintang.</p>
        <div className="form-row">
          <label htmlFor="reward-active">Aktifkan reward</label>
          <Switch id="reward-active" checked={enabled} onCheckedChange={setEnabled} />
        </div>
        <div className="form-row">
          <label htmlFor="target">Target minimal</label>
          <select
            id="target"
            value={target}
            disabled={!enabled}
            onChange={(e) => {
              setTarget(e.target.value);
              setSaved(false);
            }}
          >
            {[15, 20, 25, 30, 35].map((n) => (
              <option key={n} value={n}>
                {n} bintang
              </option>
            ))}
          </select>
        </div>
        <label className="form-label" htmlFor="reward-text">
          Reward
        </label>
        <div className="reward-text-wrap">
          <textarea
            id="reward-text"
            value={reward}
            disabled={!enabled}
            required
            onChange={(e) => {
              setReward(e.target.value);
              setSaved(false);
            }}
            rows={3}
          />
        </div>
        {!reward.trim() && <p className="form-error">Isi hadiah untuk anak terlebih dahulu.</p>}
      </section>
      <section className="paper reward-templates">
        <h2>
          Pilihan Reward <span>(template)</span>
        </h2>
        {rewardTemplates.map((item) => (
          <Button
            variant="template"
            key={item.text}
            disabled={!enabled}
            onClick={() => {
              setReward(item.text);
              setSaved(false);
            }}
          >
            <span>{item.icon}</span>
            {item.text}
            {reward === item.text && <Check size={15} />}
          </Button>
        ))}
      </section>
      {saved && <Encouragement>Hadiah penuh makna sudah disiapkan. ♡</Encouragement>}
    </Page>
  );
}

export function AddChildScreen() {
  const state = useRajin();
  const navigate = useNavigate();
  const [name, setName] = useState("Aisyah");
  const [character, setCharacter] = useState(0);
  const [color, setColor] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState("");
  const upload = useRef<HTMLInputElement>(null);
  const tones = ["pink", "blue", "mint", "violet", "peach", "gold"];
  function save() {
    if (!name.trim()) {
      setError("Nama anak perlu diisi, ya.");
      return;
    }
    state.addChild({ name: name.trim(), character, color, stars: 0 });
    navigate({ to: "/orang-tua" });
  }
  return (
    <Page
      title="Tambah Anak"
      back="/orang-tua"
      action={
        <Button variant="sky" size="sm" onClick={save}>
          Simpan
        </Button>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
        className="child-form"
      >
        <div className="child-preview">
          <div className={`profile-preview ${tones[color]}`}>
            {photo ? (
              <img src={photo} alt="Foto anak dipilih" />
            ) : (
              <img
                src={(characters[character] ?? characters[0]).image}
                width={1024}
                height={1024}
                alt="Karakter anak yang dipilih"
              />
            )}
          </div>
          <Button
            variant="camera"
            size="icon"
            aria-label="Pilih foto anak"
            onClick={() => upload.current?.click()}
            type="button"
          >
            <Camera size={19} />
          </Button>
          <input
            ref={upload}
            className="hidden"
            type="file"
            accept="image/*"
            aria-label="Unggah foto anak"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPhoto(URL.createObjectURL(file));
            }}
          />
        </div>
        <label className="form-label" htmlFor="child-name">
          Nama Anak
        </label>
        <input
          id="child-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="Masukkan nama anak"
          maxLength={24}
        />
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <fieldset>
          <legend>Pilih Karakter</legend>
          <div className="character-choices">
            {characters.map((c, i) => (
              <Button
                key={c.name}
                variant="character"
                className={character === i ? "chosen" : ""}
                aria-label={`Karakter ${c.name}`}
                aria-pressed={character === i}
                type="button"
                onClick={() => {
                  setCharacter(i);
                  setPhoto(null);
                }}
              >
                <Avatar character={i} />
              </Button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Tema Warna</legend>
          <div className="color-choices">
            {tones.map((tone, i) => (
              <Button
                key={tone}
                variant="swatch"
                className={tone}
                aria-label={`Warna ${["pink", "biru", "hijau", "ungu", "jingga", "kuning"][i]}`}
                aria-pressed={color === i}
                type="button"
                onClick={() => setColor(i)}
              >
                {color === i && <Check size={19} />}
              </Button>
            ))}
          </div>
        </fieldset>
        <Encouragement>Teman kecil untuk perjalanan penuh kebaikan. ♡</Encouragement>
      </form>
    </Page>
  );
}

export function SettingsScreen() {
  const [reminders, setReminders] = useState(true);
  const [times, setTimes] = useState(prayers.map((p) => p.time));
  const [enabled, setEnabled] = useState(prayers.map(() => true));
  const [pinEnabled, setPinEnabled] = useState(true);
  const [pin, setPin] = useState("12345");
  return (
    <Page title="Pengaturan" back="/orang-tua">
      <section className="paper settings-paper">
        <div className="settings-heading">
          <div>
            <h2>Pengingat Sholat</h2>
            <p>Ingatkan anak ketika waktu sholat tiba.</p>
          </div>
          <Switch
            aria-label="Aktifkan pengingat sholat"
            checked={reminders}
            onCheckedChange={setReminders}
          />
        </div>
        <div className="reminder-list">
          {prayers.map((p, i) => (
            <div className="reminder-row" key={p.name}>
              <PrayerIcon name={p.name} />
              <label htmlFor={`time-${i}`}>{p.name}</label>
              <input
                type="time"
                id={`time-${i}`}
                value={times[i]}
                disabled={!reminders}
                onChange={(e) =>
                  setTimes((prev) => prev.map((t, j) => (j === i ? e.target.value : t)))
                }
              />
              <Switch
                aria-label={`Pengingat ${p.name}`}
                checked={enabled[i] ?? false}
                disabled={!reminders}
                onCheckedChange={(val) =>
                  setEnabled((prev) => prev.map((v, j) => (j === i ? val : v)))
                }
              />
            </div>
          ))}
        </div>
      </section>
      <section className="paper pin-paper">
        <div className="settings-heading">
          <LockKeyhole size={24} />
          <div>
            <h2>PIN Orang Tua</h2>
            <p>Gunakan PIN untuk mengakses mode orang tua.</p>
          </div>
          <Switch
            aria-label="Aktifkan PIN orang tua"
            checked={pinEnabled}
            onCheckedChange={setPinEnabled}
          />
        </div>
        <input
          className="pin-input"
          type="password"
          inputMode="numeric"
          maxLength={5}
          value={pin}
          disabled={!pinEnabled}
          aria-label="PIN orang tua"
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          autoComplete="off"
        />
      </section>
      <div className="settings-footer">
        <span className="small-brand">Rajin Sholat</span>
        <p>Langkah kecil, kebaikan besar. ♡</p>
      </div>
    </Page>
  );
}
