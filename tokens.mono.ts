import type { Theme } from "./types";

export const monoTheme: Theme = {
  name: "mono",
  label: "Mono",
  fontImport:
    "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@400;600&display=swap",
  colors: {
    black:      "#0A0A0A",
    gray900:    "#111111",
    gray800:    "#1C1C1C",
    gray700:    "#2E2E2E",
    gray600:    "#444444",
    gray500:    "#737373",
    gray400:    "#A3A3A3",
    gray300:    "#D4D4D4",
    gray200:    "#E5E5E5",
    gray100:    "#F5F5F5",
    white:      "#FAFAFA",
    accent:     "#C8FF00",
    accentHover:"#B3E600",
  },
  typography: {
    display: "'DM Serif Display', Georgia, serif",
    sans:    "'DM Sans', Helvetica, sans-serif",
    mono:    "'IBM Plex Mono', 'Courier New', monospace",
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
    sm:   "4px",
    md:   "8px",
    lg:   "12px",
    full: "9999px",
  },
};
