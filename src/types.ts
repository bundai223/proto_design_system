import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

// ============================================================
// DESIGN SYSTEM — TYPE DEFINITIONS
// ============================================================

export type ThemeName = "mono" | "kawaii";

export interface ColorTokens {
  /** 最も暗い色（ほぼ黒） */
  black: string;
  gray900: string;
  gray800: string;
  gray700: string;
  gray600: string;
  gray500: string;
  gray400: string;
  gray300: string;
  gray200: string;
  gray100: string;
  /** 最も明るい色（ほぼ白） */
  white: string;
  /** テーマごとの単一アクセントカラー */
  accent: string;
  /** アクセントのホバー色 */
  accentHover: string;
}

export interface TypographyTokens {
  display: string;
  sans: string;
  mono: string;
}

export type SpaceKey = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type SpacingTokens = Record<SpaceKey, string>;

export type RadiusKey = "none" | "sm" | "md" | "lg" | "full";
export type RadiusTokens = Record<RadiusKey, string>;

export interface Theme {
  name: ThemeName;
  label: string;
  colors: ColorTokens;
  typography: TypographyTokens;
  scale: SpacingTokens;
  radius: RadiusTokens;
  /** Google Fonts の @import URL */
  fontImport: string;
}

// ============================================================
// COMPONENT PROP TYPES
// ============================================================

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  disabled?: boolean;
}

export type CardVariant = "default" | "elevated" | "filled" | "outlined" | "dark";

export interface CardProps {
  variant?: CardVariant;
  title?: string;
  meta?: string;
  children: ReactNode;
}

export type BadgeVariant = "default" | "dark" | "accent" | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  variant?: BadgeVariant;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export interface SectionProps {
  label: string;
  children: ReactNode;
}

export interface DividerProps {
  label?: string;
}
