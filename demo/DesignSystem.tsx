import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Divider,
  Input,
  Section,
  ThemeProvider,
  ThemeSwitcher,
  themes,
  useTheme,
} from "../index";
import type { ThemeName } from "../src/types";

const TABS = ["overview", "colors", "type", "components", "spacing"] as const;
type Tab = (typeof TABS)[number];

function ShowcaseShell() {
  const { theme, themeName } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const colors = theme.colors;
  const stats = [
    { label: "Themes", value: String(Object.keys(themes).length), detail: "Mono / Kawaii" },
    { label: "Components", value: "7", detail: "Button, Card, Badge..." },
    { label: "Scales", value: "3", detail: "Type, spacing, radius" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          themeName === "mono"
            ? "linear-gradient(180deg, #f5f5f5 0%, #fafafa 18%, #ffffff 100%)"
            : "linear-gradient(180deg, #fff9ff 0%, #fdf3fb 20%, #fffdfd 100%)",
        color: colors.black,
        fontFamily: theme.typography.sans,
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(12px)",
          background:
            themeName === "mono" ? "rgba(250,250,250,0.88)" : "rgba(254,250,255,0.82)",
          borderBottom: `1px solid ${colors.gray200}`,
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: `${theme.scale.lg} ${theme.scale.lg}`,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: theme.scale.md,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: theme.typography.mono,
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: colors.gray500,
                marginBottom: "6px",
              }}
            >
              Proto Design System
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: theme.scale.sm,
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontFamily: theme.typography.display,
                  fontWeight: 400,
                  fontSize: "28px",
                  lineHeight: 1,
                }}
              >
                Interactive Showcase
              </h1>
              <span
                style={{
                  fontFamily: theme.typography.mono,
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: colors.gray400,
                }}
              >
                / {themes[themeName].label}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: theme.scale.md }}>
            <ThemeSwitcher />
            <nav style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: theme.radius.full,
                    fontFamily: theme.typography.mono,
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: activeTab === tab ? colors.black : "transparent",
                    color: activeTab === tab ? colors.white : colors.gray500,
                  }}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: `${theme.scale.xl} ${theme.scale.lg} ${theme.scale["3xl"]}`,
        }}
      >
        {activeTab === "overview" ? <Overview stats={stats} /> : null}
        {activeTab === "colors" ? <ColorsPanel /> : null}
        {activeTab === "type" ? <TypographyPanel /> : null}
        {activeTab === "components" ? <ComponentsPanel /> : null}
        {activeTab === "spacing" ? <SpacingPanel /> : null}
      </main>
    </div>
  );
}

function Overview({
  stats,
}: {
  stats: Array<{ label: string; value: string; detail: string }>;
}) {
  const { theme, themeName } = useTheme();
  const colors = theme.colors;

  return (
    <>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(300px, 0.9fr)",
          gap: theme.scale.lg,
          alignItems: "stretch",
          marginBottom: theme.scale["2xl"],
        }}
      >
        <div
          style={{
            padding: `clamp(24px, 4vw, 48px)`,
            borderRadius: theme.radius.lg,
            background:
              themeName === "mono"
                ? "linear-gradient(140deg, #111111 0%, #2e2e2e 60%, #444444 100%)"
                : "linear-gradient(140deg, #7d5a8a 0%, #ff6eb4 52%, #ffd7ec 100%)",
            color: themeName === "mono" ? colors.white : "#2d1b3d",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "-48px",
              top: "-32px",
              width: "180px",
              height: "180px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.12)",
            }}
          />
          <div
            style={{
              fontFamily: theme.typography.mono,
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.8,
              marginBottom: theme.scale.md,
            }}
          >
            Theme-aware React UI kit
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: theme.typography.display,
              fontSize: "clamp(44px, 9vw, 88px)",
              fontWeight: 400,
              lineHeight: 0.94,
              maxWidth: "7ch",
            }}
          >
            Components that shift with the theme.
          </h2>
          <p
            style={{
              margin: `${theme.scale.lg} 0 0`,
              maxWidth: "44ch",
              fontSize: "16px",
              lineHeight: 1.75,
              color: themeName === "mono" ? "rgba(250,250,250,0.84)" : "#452a58",
            }}
          >
            React 用のテーマトークンと Hugo 向け CSS 変数エクスポートを同居させた、
            個人用デザインシステムのショーケースです。
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: theme.scale.md,
          }}
        >
          {stats.map((item) => (
            <Card key={item.label} title={item.value} meta={item.label} variant="elevated">
              {item.detail}
            </Card>
          ))}
        </div>
      </section>

      <Section label="Starter">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(280px, 0.9fr)",
            gap: theme.scale.lg,
          }}
        >
          <Card title="Quick Start" meta="React">
            <pre
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                fontFamily: theme.typography.mono,
                fontSize: "11px",
                lineHeight: 1.8,
                color: colors.gray700,
              }}
            >
              {`import { ThemeProvider, Button } from "design-system";

export function App() {
  return (
    <ThemeProvider defaultTheme="mono">
      <Button variant="accent">Launch</Button>
    </ThemeProvider>
  );
}`}
            </pre>
          </Card>
          <Card title="Why This Exists" meta="Intent" variant="filled">
            Claude 由来の断片を、トークン、React コンポーネント、Hugo 連携、実動デモの
            4 層に整理しています。テーマ変更はトークン差し替えのみで成立します。
          </Card>
        </div>
      </Section>
    </>
  );
}

function ColorsPanel() {
  const { theme } = useTheme();
  const colors = theme.colors;
  const palette = Object.entries(colors) as Array<[keyof typeof colors, string]>;

  return (
    <>
      <Section label="Palette">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: theme.scale.md,
          }}
        >
          {palette.map(([name, value]) => (
            <div key={name}>
              <div
                style={{
                  height: "96px",
                  borderRadius: theme.radius.md,
                  background: value,
                  border: value === colors.white ? `1px solid ${colors.gray200}` : "none",
                  marginBottom: theme.scale.sm,
                }}
              />
              <div
                style={{
                  fontFamily: theme.typography.mono,
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: colors.gray600,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontFamily: theme.typography.mono,
                  fontSize: "11px",
                  color: colors.gray400,
                  marginTop: "4px",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Usage">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: theme.scale.md,
          }}
        >
          <Card title="Accent" meta="CTA">
            強いアクション、リンク、切り替えなどの目線誘導に使用。
          </Card>
          <Card title="Gray Scale" meta="Surfaces" variant="outlined">
            背景、罫線、静かな補助情報を段階的に表現するための基礎パレット。
          </Card>
          <Card title="Black / White" meta="Contrast" variant="dark">
            タイポグラフィとコントラストの主役。テーマ切替後も役割は維持されます。
          </Card>
        </div>
      </Section>
    </>
  );
}

function TypographyPanel() {
  const { theme } = useTheme();
  const colors = theme.colors;

  return (
    <>
      <Section label="Display">
        <div
          style={{
            fontFamily: theme.typography.display,
            fontSize: "clamp(40px, 8vw, 84px)",
            lineHeight: 0.96,
            marginBottom: theme.scale.lg,
          }}
        >
          Make the system look authored.
        </div>
        <Card title="Display Voice" meta="Hero / Feature">
          キービジュアル、記事タイトル、ヒーロー領域向け。情報量より印象を優先します。
        </Card>
      </Section>

      <Section label="Sans">
        {[
          { size: "18px", text: "Readable body copy for articles, UI descriptions, and helper text." },
          { size: "16px", text: "素早い茶色のキツネが怠け者の犬を飛び越える。本文用の基本サイズ。" },
          { size: "14px", text: "Compact but still breathable. Useful for labels and secondary UI copy." },
        ].map((sample) => (
          <p
            key={sample.size}
            style={{
              margin: `0 0 ${theme.scale.sm}`,
              fontSize: sample.size,
              lineHeight: 1.7,
              color: colors.gray700,
            }}
          >
            {sample.size} {sample.text}
          </p>
        ))}
      </Section>

      <Section label="Mono">
        <div
          style={{
            display: "grid",
            gap: theme.scale.sm,
          }}
        >
          {[
            "const { themeName, setTheme } = useTheme();",
            "document.documentElement.dataset.theme = 'kawaii';",
            "npm run export:css:all",
          ].map((line) => (
            <code
              key={line}
              style={{
                display: "block",
                padding: `${theme.scale.sm} ${theme.scale.md}`,
                borderRadius: theme.radius.sm,
                background: colors.gray100,
                color: colors.gray700,
                fontFamily: theme.typography.mono,
                fontSize: "12px",
              }}
            >
              {line}
            </code>
          ))}
        </div>
      </Section>
    </>
  );
}

function ComponentsPanel() {
  const { theme } = useTheme();

  return (
    <>
      <Section label="Actions">
        <div style={{ display: "flex", flexWrap: "wrap", gap: theme.scale.md, marginBottom: theme.scale.md }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: theme.scale.md }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      <Section label="Content">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: theme.scale.md,
          }}
        >
          <Card title="Default Card" meta="Default">
            余白、境界線、タイポグラフィの基本形です。
          </Card>
          <Card title="Filled Card" meta="Filled" variant="filled">
            視線を止めたいセクションや注意書きに向いています。
          </Card>
          <Card title="Dark Card" meta="Dark" variant="dark">
            トーンを切り替えることで、同じ構造でも印象を大きく変えられます。
          </Card>
        </div>
      </Section>

      <Section label="Small UI">
        <div style={{ display: "flex", flexWrap: "wrap", gap: theme.scale.sm, marginBottom: theme.scale.lg }}>
          <Badge label="Default" />
          <Badge label="Accent" variant="accent" />
          <Badge label="Dark" variant="dark" />
          <Badge label="Outline" variant="outline" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: theme.scale.md,
          }}
        >
          <Input label="Name" placeholder="山田 太郎" />
          <Input label="Email" placeholder="hello@example.com" hint="公開されることはありません" />
        </div>
      </Section>

      <Section label="Separators">
        <Divider />
        <Divider label="or" />
      </Section>
    </>
  );
}

function SpacingPanel() {
  const { theme, themeName } = useTheme();
  const colors = theme.colors;

  return (
    <>
      <Section label="Spacing">
        <div style={{ display: "grid", gap: theme.scale.md }}>
          {Object.entries(theme.scale).map(([key, value]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: theme.scale.lg }}>
              <span
                style={{
                  width: "44px",
                  fontFamily: theme.typography.mono,
                  fontSize: "11px",
                  color: colors.gray500,
                }}
              >
                {key}
              </span>
              <div
                style={{
                  width: value,
                  minWidth: "4px",
                  height: "22px",
                  borderRadius: theme.radius.full,
                  background: themeName === "mono" ? colors.black : colors.accent,
                }}
              />
              <span
                style={{
                  fontFamily: theme.typography.mono,
                  fontSize: "11px",
                  color: colors.gray400,
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Radius">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: theme.scale.lg,
            alignItems: "end",
          }}
        >
          {Object.entries(theme.radius).map(([key, value]) => (
            <div key={key} style={{ textAlign: "center" }}>
              <div
                style={{
                  height: "88px",
                  background: colors.gray100,
                  border: `1px solid ${colors.gray300}`,
                  borderRadius: value,
                  marginBottom: theme.scale.sm,
                }}
              />
              <div
                style={{
                  fontFamily: theme.typography.mono,
                  fontSize: "10px",
                  textTransform: "uppercase",
                  color: colors.gray500,
                }}
              >
                {key}
              </div>
              <div
                style={{
                  fontFamily: theme.typography.mono,
                  fontSize: "10px",
                  color: colors.gray400,
                  marginTop: "4px",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export default function DesignSystem({
  defaultTheme = "mono",
}: {
  defaultTheme?: ThemeName;
}) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <ShowcaseShell />
    </ThemeProvider>
  );
}
