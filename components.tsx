import { useState } from "react";
import { useTheme } from "./ThemeContext";
import { themes } from "./tokens";
import type {
  BadgeProps,
  ButtonProps,
  CardProps,
  DividerProps,
  InputProps,
  SectionProps,
  ThemeName,
} from "./types";

type ButtonStyleMap = Record<
  NonNullable<ButtonProps["variant"]>,
  {
    bg: string;
    color: string;
    border: string;
    hBg: string;
    hColor?: string;
  }
>;

export function Button({
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  ...buttonProps
}: ButtonProps) {
  const { theme } = useTheme();
  const c = theme.colors;
  const [hovered, setHovered] = useState(false);

  const sizes = {
    sm: { padding: "6px 14px", fontSize: "11px" },
    md: { padding: "10px 22px", fontSize: "12px" },
    lg: { padding: "14px 32px", fontSize: "13px" },
  };

  const base: ButtonStyleMap = {
    primary: {
      bg: c.black,
      color: c.white,
      border: `1.5px solid ${c.black}`,
      hBg: c.gray800,
    },
    secondary: {
      bg: "transparent",
      color: c.black,
      border: `1.5px solid ${c.black}`,
      hBg: c.black,
      hColor: c.white,
    },
    accent: {
      bg: c.accent,
      color: c.black,
      border: `1.5px solid ${c.accent}`,
      hBg: c.accentHover,
    },
    ghost: {
      bg: "transparent",
      color: c.gray500,
      border: `1.5px solid ${c.gray300}`,
      hBg: c.gray100,
    },
  };

  const activeStyle = base[variant];

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: theme.typography.mono,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.15s ease",
        display: "inline-flex",
        alignItems: "center",
        outline: "none",
        opacity: disabled ? 0.35 : 1,
        border: activeStyle.border,
        borderRadius: theme.radius.sm,
        background: hovered && !disabled ? activeStyle.hBg : activeStyle.bg,
        color:
          hovered && !disabled && activeStyle.hColor
            ? activeStyle.hColor
            : activeStyle.color,
        ...sizes[size],
      }}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export function Card({
  variant = "default",
  title,
  meta,
  children,
}: CardProps) {
  const { theme } = useTheme();
  const c = theme.colors;
  const isDark = variant === "dark";
  const variantStyle = {
    default: { background: c.white, border: `1px solid ${c.gray200}` },
    elevated: { background: c.white, boxShadow: "0 4px 24px rgba(0,0,0,0.10)" },
    filled: { background: c.gray100 },
    outlined: { background: "transparent", border: `1.5px solid ${c.black}` },
    dark: { background: c.black },
  }[variant];

  return (
    <div
      style={{
        ...variantStyle,
        borderRadius: theme.radius.md,
        padding: theme.scale.lg,
        display: "flex",
        flexDirection: "column",
        gap: theme.scale.sm,
      }}
    >
      {meta ? (
        <span
          style={{
            fontFamily: theme.typography.mono,
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: isDark ? c.gray500 : c.gray400,
          }}
        >
          {meta}
        </span>
      ) : null}
      {title ? (
        <h3
          style={{
            fontFamily: theme.typography.display,
            fontSize: "22px",
            fontWeight: 400,
            margin: 0,
            color: isDark ? c.white : c.black,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
      ) : null}
      <div
        style={{
          fontFamily: theme.typography.sans,
          fontSize: "14px",
          lineHeight: 1.65,
          color: isDark ? c.gray400 : c.gray600,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function Badge({
  label,
  variant = "default",
  style,
  ...spanProps
}: BadgeProps) {
  const { theme } = useTheme();
  const c = theme.colors;
  const variantStyle = {
    default: { background: c.gray100, color: c.gray700 },
    dark: { background: c.black, color: c.white },
    accent: { background: c.accent, color: c.black },
    outline: {
      background: "transparent",
      color: c.gray600,
      border: `1px solid ${c.gray300}`,
    },
  }[variant];

  return (
    <span
      style={{
        ...variantStyle,
        fontFamily: theme.typography.mono,
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "3px 10px",
        borderRadius: theme.radius.full,
        display: "inline-block",
        ...style,
      }}
      {...spanProps}
    >
      {label}
    </span>
  );
}

export function Input({ label, hint, style, ...inputProps }: InputProps) {
  const { theme } = useTheme();
  const c = theme.colors;
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label ? (
        <label
          style={{
            fontFamily: theme.typography.mono,
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: c.gray600,
          }}
        >
          {label}
        </label>
      ) : null}
      <input
        onFocus={(event) => {
          setFocused(true);
          inputProps.onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          inputProps.onBlur?.(event);
        }}
        style={{
          fontFamily: theme.typography.sans,
          fontSize: "14px",
          padding: "10px 14px",
          border: `1.5px solid ${focused ? c.black : c.gray300}`,
          borderRadius: theme.radius.sm,
          background: c.white,
          color: c.black,
          outline: "none",
          transition: "border-color 0.15s",
          width: "100%",
          ...style,
        }}
        {...inputProps}
      />
      {hint ? (
        <span
          style={{
            fontFamily: theme.typography.sans,
            fontSize: "12px",
            color: c.gray400,
          }}
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export function Section({ label, children }: SectionProps) {
  const { theme } = useTheme();

  return (
    <section style={{ marginBottom: theme.scale.xl }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: theme.scale.md,
          marginBottom: theme.scale.lg,
        }}
      >
        <span
          style={{
            fontFamily: theme.typography.mono,
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: theme.colors.gray400,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        <div style={{ flex: 1, height: "1px", background: theme.colors.gray200 }} />
      </div>
      {children}
    </section>
  );
}

export function Divider({ label }: DividerProps) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: theme.scale.md,
        margin: `${theme.scale.md} 0`,
      }}
    >
      <div style={{ flex: 1, height: "1px", background: theme.colors.gray200 }} />
      {label ? (
        <span
          style={{
            fontFamily: theme.typography.mono,
            fontSize: "10px",
            color: theme.colors.gray400,
            letterSpacing: "0.1em",
          }}
        >
          {label}
        </span>
      ) : null}
      <div style={{ flex: 1, height: "1px", background: theme.colors.gray200 }} />
    </div>
  );
}

export function ThemeSwitcher() {
  const { themeName, setTheme, theme } = useTheme();
  const c = theme.colors;

  return (
    <div
      style={{
        display: "flex",
        gap: "2px",
        background: c.gray100,
        padding: "3px",
        borderRadius: theme.radius.sm,
      }}
    >
      {(Object.keys(themes) as ThemeName[]).map((name) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          style={{
            fontFamily: theme.typography.mono,
            fontSize: "10px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "6px 14px",
            background: themeName === name ? c.black : "transparent",
            color: themeName === name ? c.white : c.gray500,
            border: "none",
            borderRadius: theme.radius.sm === "0px" ? "0px" : "4px",
            cursor: "pointer",
            transition: "all 0.12s ease",
          }}
        >
          {themes[name].label}
        </button>
      ))}
    </div>
  );
}
