import type { Theme, ThemeName } from "./types";
import { kawaiiTheme } from "./tokens.kawaii";
import { monoTheme } from "./tokens.mono";

export { monoTheme, kawaiiTheme };

export const themes: Record<ThemeName, Theme> = {
  mono: monoTheme,
  kawaii: kawaiiTheme,
};
