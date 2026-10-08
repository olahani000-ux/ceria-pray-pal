import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, User } from "lucide-react";
import { AVATAR_OPTIONS, ChildAvatarIcon, type AvatarOption } from "@/components/ChildAvatar";
import { useRajin } from "@/lib/rajin-state";

export const Route = createFileRoute("/profil-anak")({
  head: () => ({
    meta: [
      { title: "Profil Anak — Rajin Sholat" },
      {
        name: "description",
        content: "Yuk pilih karakter dan masukkan namamu untuk memulai misi sholat!",
      },
    ],
  }),
  component: ProfilAnakScreen,
});

export function ProfilAnakScreen() {
  const navigate = useNavigate();
  const state = useRajin();
  const [childName, setChildName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  // Jika sudah pernah isi profil, langsung arahkan ke beranda
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("childName");
      const storedAvatar = localStorage.getItem("childAvatar");
      if (storedName && storedAvatar) {
        navigate({ to: "/beranda" });
        return;
      }
      setIsChecking(false);
    }
  }, [navigate]);

  const boys = AVATAR_OPTIONS.filter((a) => a.gender === "laki-laki");
  const girls = AVATAR_OPTIONS.filter((a) => a.gender === "perempuan");

  const isFormValid = childName.trim().length > 0 && selectedAvatar !== null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isFormValid || !selectedAvatar) return;

    const trimmedName = childName.trim();
    localStorage.setItem("childName", trimmedName);
    localStorage.setItem("childAvatar", selectedAvatar.id);
    localStorage.setItem("childGender", selectedAvatar.gender);

    // Sinkronisasi dengan in-memory state Rajin jika tersedia
    const activeKid = state.children[state.activeChild] ?? state.children[0];
    if (activeKid) {
      activeKid.name = trimmedName;
    }

    navigate({ to: "/beranda" });
  };

  if (isChecking) {
    return (
      <main className="app-page flex items-center justify-center min-h-[100dvh]">
        <div className="animate-pulse text-emerald-700 font-semibold text-sm">
          Menyiapkan petualangan sholat...
        </div>
      </main>
    );
  }

  return (
    <main className="app-page min-h-[100dvh] flex flex-col justify-between py-6 px-5 max-w-[440px] mx-auto bg-gradient-to-b from-emerald-50 via-teal-50/50 to-white">
      <div className="w-full">
        {/* Header Branding */}
        <div className="text-center mb-6 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Petualangan Baru</span>
          </div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Halo Teman Sholeh & Sholehah! ✨
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Ketik namamu dan pilih karakter favorit untuk memulai!
          </p>
        </div>

        {/* Input Nama Anak */}
        <div className="mb-6 bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
          <label
            htmlFor="childNameInput"
            className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-2"
          >
            <User className="w-4 h-4 text-emerald-600" />
            <span>Nama Panggilan Anak</span>
          </label>
          <input
            id="childNameInput"
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="Contoh: Aisyah / Ahmad"
            maxLength={25}
            className="w-full px-4 py-3 rounded-xl border-2 border-emerald-200 bg-emerald-50/30 text-gray-800 font-bold text-base placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200/50 transition-all"
          />
        </div>

        {/* Avatar Selection Sections */}
        <div className="space-y-5">
          {/* Laki-laki Sholeh (3 Cowok) */}
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-sky-100 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-sky-100/70 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-200" />
                <h2 className="text-sm font-bold text-sky-900 tracking-wide">
                  Laki-laki Sholeh
                </h2>
              </div>
              <span className="text-[11px] font-medium text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                3 Pilihan
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {boys.map((avatar) => {
                const isSelected = selectedAvatar?.id === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    aria-label={`Pilih ${avatar.label}`}
                    className={`relative flex flex-col items-center p-2 rounded-2xl transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "avatar-selected bg-purple-50/90 ring-4 ring-purple-400/70 border-3 border-purple-500 scale-105 shadow-md"
                        : "bg-white hover:bg-sky-50/60 border-2 border-gray-100 hover:border-sky-200 hover:scale-[1.02]"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white rounded-full p-0.5 shadow-sm animate-scale-in">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                      <ChildAvatarIcon avatarId={avatar.id} size={58} />
                    </div>
                    <span
                      className={`text-xs font-bold mt-2 text-center tracking-tight transition-colors ${
                        isSelected ? "text-purple-700" : "text-gray-700"
                      }`}
                    >
                      {avatar.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Perempuan Sholehah (3 Cewek) */}
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-pink-100 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-pink-100/70 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 ring-2 ring-pink-200" />
                <h2 className="text-sm font-bold text-pink-900 tracking-wide">
                  Perempuan Sholehah
                </h2>
              </div>
              <span className="text-[11px] font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
                3 Pilihan
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {girls.map((avatar) => {
                const isSelected = selectedAvatar?.id === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    aria-label={`Pilih ${avatar.label}`}
                    className={`relative flex flex-col items-center p-2 rounded-2xl transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "avatar-selected bg-purple-50/90 ring-4 ring-purple-400/70 border-3 border-purple-500 scale-105 shadow-md"
                        : "bg-white hover:bg-pink-50/60 border-2 border-gray-100 hover:border-pink-200 hover:scale-[1.02]"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white rounded-full p-0.5 shadow-sm animate-scale-in">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                      <ChildAvatarIcon avatarId={avatar.id} size={58} />
                    </div>
                    <span
                      className={`text-xs font-bold mt-2 text-center tracking-tight transition-colors ${
                        isSelected ? "text-purple-700" : "text-gray-700"
                      }`}
                    >
                      {avatar.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button: Masuk Beranda */}
      <div className="mt-8 pt-2">
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={!isFormValid}
          className={`w-full py-4 px-6 rounded-2xl font-black text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
            isFormValid
              ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white hover:opacity-95 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              : "bg-gray-200 text-gray-400 border border-gray-300/60 cursor-not-allowed opacity-60"
          }`}
        >
          <span>Masuk Beranda</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        {!isFormValid && (
          <p className="text-center text-[11px] text-gray-500 mt-2 font-medium">
            {!childName.trim() && !selectedAvatar
              ? "Ketik nama dan pilih avatar untuk lanjut"
              : !childName.trim()
                ? "Silakan masukkan nama anak terlebih dahulu"
                : "Silakan pilih salah satu avatar di atas"}
          </p>
        )}
      </div>
    </main>
  );
}

export default ProfilAnakScreen;
