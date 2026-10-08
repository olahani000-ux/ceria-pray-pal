import type { FC, HTMLAttributes } from "react";
import boyBlue from "@/assets/avatars/boy-blue.webp";
import boyGreen from "@/assets/avatars/boy-green.webp";
import boyYellow from "@/assets/avatars/boy-yellow.webp";
import girlPink from "@/assets/avatars/girl-pink.webp";
import girlPurple from "@/assets/avatars/girl-purple.webp";
import girlTeal from "@/assets/avatars/girl-teal.webp";

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

/**
 * Ilustrasi avatar (watercolor). id lama (peci-*, hijab-*) dipertahankan supaya
 * avatar yang sudah tersimpan di localStorage ("childAvatar") tetap valid.
 * bg = warna lingkaran, zoom/originY = pembesaran supaya wajah terlihat jelas.
 */
interface AvatarArt {
  src: string;
  bg: string;
  zoom: number;
  originY: string;
}

const AVATAR_ART: Record<string, AvatarArt> = {
  "peci-biru": { src: boyBlue, bg: "#E0F2FE", zoom: 1.15, originY: "30%" },
  "peci-hijau": { src: boyGreen, bg: "#DCFCE7", zoom: 1.15, originY: "30%" },
  "peci-kuning": { src: boyYellow, bg: "#FEF9C3", zoom: 1.15, originY: "30%" },
  "hijab-pink": { src: girlPink, bg: "#FDF2F8", zoom: 1.4, originY: "27%" },
  "hijab-ungu": { src: girlPurple, bg: "#F5F3FF", zoom: 1.4, originY: "27%" },
  "hijab-toska": { src: girlTeal, bg: "#F0FDFA", zoom: 1.4, originY: "27%" },
};

const DEFAULT_AVATAR_ID = "hijab-toska";

interface ChildAvatarIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  avatarId: string;
  size?: number;
}

export const ChildAvatarIcon: FC<ChildAvatarIconProps> = ({
  avatarId,
  size = 72,
  className = "",
  style,
  ...props
}) => {
  const art = AVATAR_ART[avatarId] ?? AVATAR_ART[DEFAULT_AVATAR_ID];
  const option = AVATAR_OPTIONS.find((o) => o.id === avatarId);

  return (
    <span
      className={className}
      style={{
        display: "block",
        flex: "none",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        background: art.bg,
        ...style,
      }}
      {...props}
    >
      <img
        src={art.src}
        alt={option?.description ?? "Avatar anak"}
        width={512}
        height={512}
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transform: `scale(${art.zoom})`,
          transformOrigin: `50% ${art.originY}`,
        }}
      />
    </span>
  );
};

export default ChildAvatarIcon;
