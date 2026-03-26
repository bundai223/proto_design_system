import type { Theme } from "../types";

export const kawaiiTheme: Theme = {
  name: "kawaii",
  label: "Kawaii ✿",
  fontImport:
    "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Quicksand:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap",
  colors: {
    black:      "#2D1B3D",   // 深紫 (黒代わり)
    gray900:    "#3D2550",
    gray800:    "#5C3D6E",
    gray700:    "#7D5A8A",
    gray600:    "#9E78AA",
    gray500:    "#BF9FCB",
    gray400:    "#D4BCE0",
    gray300:    "#E8D8F0",
    gray200:    "#F3EAF8",
    gray100:    "#FAF5FD",
    white:      "#FEFAFF",
    accent:     "#FF6EB4",   // ホットピンク
    accentHover:"#FF4DA6",
  },
  typography: {
    display: "'Nunito', 'Arial Rounded MT Bold', sans-serif",
    sans:    "'Quicksand', 'Trebuchet MS', sans-serif",
    mono:    "'Space Mono', monospace",
  },
  scale: {
    xs:   "4px",
    sm:   "8px",
    md:   "16px",
    lg:   "24px",
    xl:   "40px",
    "2xl":"64px",
    "3xl":"104px",
  },
  radius: {
    none: "0px",
    sm:   "12px",   // kawaiiは全体的に丸め
    md:   "20px",
    lg:   "28px",
    full: "9999px",
  },
};
