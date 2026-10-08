import type { FC, SVGProps } from "react";

export interface AvatarOption {
  id: string;
  label: string;
  gender: "laki-laki" | "perempuan";
  description: string;
  themeColor: string;
  bgGradient: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  // 3 Laki-laki Sholeh
  {
    id: "peci-biru",
    label: "Peci Biru",
    gender: "laki-laki",
    description: "Avatar cowok peci biru",
    themeColor: "#2563EB",
    bgGradient: "from-blue-100 to-sky-200",
  },
  {
    id: "peci-hijau",
    label: "Peci Hijau",
    gender: "laki-laki",
    description: "Avatar cowok peci hijau",
    themeColor: "#16A34A",
    bgGradient: "from-emerald-100 to-green-200",
  },
  {
    id: "peci-kuning",
    label: "Peci Kuning",
    gender: "laki-laki",
    description: "Avatar cowok peci kuning",
    themeColor: "#EAB308",
    bgGradient: "from-amber-100 to-yellow-200",
  },
  // 3 Perempuan Sholehah
  {
    id: "hijab-pink",
    label: "Hijab Pink",
    gender: "perempuan",
    description: "Avatar cewek hijab pink",
    themeColor: "#EC4899",
    bgGradient: "from-pink-100 to-rose-200",
  },
  {
    id: "hijab-ungu",
    label: "Hijab Ungu",
    gender: "perempuan",
    description: "Avatar cewek hijab ungu",
    themeColor: "#8B5CF6",
    bgGradient: "from-purple-100 to-violet-200",
  },
  {
    id: "hijab-toska",
    label: "Hijab Toska",
    gender: "perempuan",
    description: "Avatar cewek hijab toska",
    themeColor: "#0D9488",
    bgGradient: "from-teal-100 to-cyan-200",
  },
];

interface ChildAvatarIconProps extends SVGProps<SVGSVGElement> {
  avatarId: string;
  size?: number;
}

export const ChildAvatarIcon: FC<ChildAvatarIconProps> = ({
  avatarId,
  size = 72,
  className = "",
  ...props
}) => {
  // Boys: peci-biru, peci-hijau, peci-kuning
  if (avatarId === "peci-biru" || avatarId === "peci-hijau" || avatarId === "peci-kuning") {
    const isBlue = avatarId === "peci-biru";
    const isGreen = avatarId === "peci-hijau";

    const peciMain = isBlue ? "#1D4ED8" : isGreen ? "#15803D" : "#CA8A04";
    const peciLight = isBlue ? "#3B82F6" : isGreen ? "#22C55E" : "#EAB308";
    const peciTrim = isBlue ? "#93C5FD" : isGreen ? "#86EFAC" : "#FEF08A";
    const shirtColor = isBlue ? "#2563EB" : isGreen ? "#16A34A" : "#D97706";
    const shirtLight = isBlue ? "#DBEAFE" : isGreen ? "#DCFCE7" : "#FEF3C7";
    const bgFill = isBlue ? "#E0F2FE" : isGreen ? "#DCFCE7" : "#FEF9C3";

    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {/* Background circle */}
        <circle cx="50" cy="50" r="48" fill={bgFill} />

        {/* Baju Koko & Pundak */}
        <path
          d="M24 95 C24 76, 36 71, 50 71 C64 71, 76 76, 76 95 Z"
          fill={shirtColor}
        />
        {/* Kerah Baju Koko */}
        <path
          d="M44 71 L50 82 L56 71 Z"
          fill={shirtLight}
        />
        <circle cx="50" cy="86" r="1.5" fill="#FFFFFF" />

        {/* Leher */}
        <rect x="44" y="62" width="12" height="12" rx="4" fill="#FCD3B6" />

        {/* Telinga */}
        <circle cx="31" cy="52" r="5" fill="#FCD3B6" />
        <circle cx="69" cy="52" r="5" fill="#FCD3B6" />
        <circle cx="31" cy="52" r="2.5" fill="#F8B486" />
        <circle cx="69" cy="52" r="2.5" fill="#F8B486" />

        {/* Wajah / Kepala */}
        <ellipse cx="50" cy="51" rx="20" ry="19" fill="#FEE4D0" />

        {/* Rambut samping / pelipis */}
        <path
          d="M31 46 C32 40, 36 37, 40 37 C42 41, 40 46, 38 48 Z"
          fill="#372722"
        />
        <path
          d="M69 46 C68 40, 64 37, 60 37 C58 41, 60 46, 62 48 Z"
          fill="#372722"
        />

        {/* Peci / Songkok */}
        <path
          d="M32 38 C32 24, 68 24, 68 38 Z"
          fill={peciMain}
        />
        {/* Lengkungan atas peci */}
        <path
          d="M35 34 C43 27, 57 27, 65 34"
          stroke={peciLight}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* List bawah peci */}
        <rect x="31" y="36" width="38" height="5.5" rx="2" fill={peciMain} />
        <rect x="32" y="37" width="36" height="2" rx="1" fill={peciTrim} />

        {/* Ornamen Bintang/Bulan kecil di peci */}
        <circle cx="50" cy="31" r="2.5" fill="#FDE047" />

        {/* Alis */}
        <path d="M40 45 Q43 43 46 45" stroke="#5C3D2E" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M54 45 Q57 43 60 45" stroke="#5C3D2E" strokeWidth="1.5" strokeLinecap="round" />

        {/* Mata ceria */}
        <ellipse cx="43" cy="50" rx="2.5" ry="3" fill="#261A15" />
        <circle cx="42" cy="49" r="0.9" fill="#FFFFFF" />
        <ellipse cx="57" cy="50" rx="2.5" ry="3" fill="#261A15" />
        <circle cx="56" cy="49" r="0.9" fill="#FFFFFF" />

        {/* Hidung mungil */}
        <circle cx="50" cy="53" r="1.2" fill="#E89F77" />

        {/* Pipi Merona / Blush */}
        <ellipse cx="37" cy="53.5" rx="3.5" ry="2" fill="#F87171" opacity="0.45" />
        <ellipse cx="63" cy="53.5" rx="3.5" ry="2" fill="#F87171" opacity="0.45" />

        {/* Senyum Bahagia */}
        <path
          d="M45 56 Q50 62 55 56"
          fill="none"
          stroke="#991B1B"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Girls: hijab-pink, hijab-ungu, hijab-toska
  const isPink = avatarId === "hijab-pink";
  const isPurple = avatarId === "hijab-ungu";

  const hijabMain = isPink ? "#EC4899" : isPurple ? "#8B5CF6" : "#0D9488";
  const hijabDark = isPink ? "#DB2777" : isPurple ? "#7C3AED" : "#0F766E";
  const hijabLight = isPink ? "#F472B6" : isPurple ? "#A78BFA" : "#14B8A6";
  const pinColor = isPink ? "#FEF08A" : isPurple ? "#FBCFE8" : "#FEF08A";
  const dressColor = isPink ? "#FCE7F3" : isPurple ? "#EDE9FE" : "#CCFBF1";
  const bgFill = isPink ? "#FDF2F8" : isPurple ? "#F5F3FF" : "#F0FDFA";

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill={bgFill} />

      {/* Hijab belakang / Bahu */}
      <path
        d="M21 95 C21 68, 32 64, 50 64 C68 64, 79 68, 79 95 Z"
        fill={hijabDark}
      />
      {/* Baju / Gamis bagian dada */}
      <path
        d="M36 82 C42 80, 58 80, 64 82 L67 95 L33 95 Z"
        fill={dressColor}
      />

      {/* Hijab utama kepala */}
      <path
        d="M26 53 C26 31, 35 22, 50 22 C65 22, 74 31, 74 53 C74 68, 67 76, 50 76 C33 76, 26 68, 26 53 Z"
        fill={hijabMain}
      />

      {/* Lipatan / highlight hijab atas */}
      <path
        d="M34 32 C43 25, 57 25, 66 32"
        stroke={hijabLight}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Ciput / inner kerudung */}
      <path
        d="M37 38 Q50 34 63 38"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Bukaan Wajah oval */}
      <ellipse cx="50" cy="52" rx="16" ry="17" fill="#FEE4D0" />

      {/* Juntaian hijab depan bawah dagu */}
      <path
        d="M40 68 C44 72, 56 72, 60 68 C58 75, 42 75, 40 68 Z"
        fill={hijabDark}
      />

      {/* Bros / Jepit Bunga Manis di hijab */}
      <g transform="translate(64, 39)">
        <circle cx="0" cy="0" r="4" fill={pinColor} />
        <circle cx="0" cy="0" r="1.8" fill="#F59E0B" />
      </g>

      {/* Alis rapi */}
      <path d="M41 45 Q44 43 47 45" stroke="#5C3D2E" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M53 45 Q56 43 59 45" stroke="#5C3D2E" strokeWidth="1.3" strokeLinecap="round" />

      {/* Mata berbinar dan bulu mata manis */}
      <ellipse cx="44" cy="50" rx="2.5" ry="3.2" fill="#261A15" />
      <circle cx="43" cy="49" r="1" fill="#FFFFFF" />
      {/* Bulu mata kiri */}
      <path d="M42 47 L40 45" stroke="#261A15" strokeWidth="1.2" strokeLinecap="round" />

      <ellipse cx="56" cy="50" rx="2.5" ry="3.2" fill="#261A15" />
      <circle cx="55" cy="49" r="1" fill="#FFFFFF" />
      {/* Bulu mata kanan */}
      <path d="M58 47 L60 45" stroke="#261A15" strokeWidth="1.2" strokeLinecap="round" />

      {/* Hidung mungil */}
      <circle cx="50" cy="53.5" r="1" fill="#E89F77" />

      {/* Pipi Merona / Pink Blush manis */}
      <ellipse cx="38" cy="54" rx="3.5" ry="2" fill="#EC4899" opacity="0.45" />
      <ellipse cx="62" cy="54" rx="3.5" ry="2" fill="#EC4899" opacity="0.45" />

      {/* Senyum manis */}
      <path
        d="M45.5 57 Q50 62.5 54.5 57"
        fill="none"
        stroke="#BE185D"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ChildAvatarIcon;
