import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Theme, ThemeName } from "./types";
import { themes, monoTheme } from "./tokens";

// ============================================================
// CONTEXT
// ============================================================

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme:     monoTheme,
  themeName: "mono",
  setTheme:  () => {},
});

// ============================================================
// PROVIDER
// ============================================================

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export function ThemeProvider({ children, defaultTheme = "mono" }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const theme = themes[themeName];
  const value = useMemo(
    () => ({
      theme,
      themeName,
      setTheme: setThemeName,
    }),
    [theme, themeName],
  );

  return (
    <ThemeContext.Provider value={value}>
      {/* フォントを動的に読み込む */}
      <style>{`@import url('${theme.fontImport}'); * { box-sizing: border-box; }`}</style>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================================
// HOOK
// ============================================================

/** テーマトークンとsetter を取得するフック */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
