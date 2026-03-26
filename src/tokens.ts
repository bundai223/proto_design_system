import type { Theme, ThemeName } from "./types";
import { kawaiiTheme } from "./themes/tokens.kawaii";
import { monoTheme } from "./themes/tokens.mono";

export { monoTheme, kawaiiTheme };

export const themes: Record<ThemeName, Theme> = {
  mono: monoTheme,
  kawaii: kawaiiTheme,
};
