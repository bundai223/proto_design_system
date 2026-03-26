import {
  Badge,
  Button,
  Card,
  Divider,
  Input,
  Section,
  ThemeProvider,
  ThemeSwitcher,
} from "../index";

function DemoScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "48px 20px",
        background: "linear-gradient(180deg, #f8f7fb 0%, #ffffff 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "grid",
          gap: "32px",
        }}
      >
        <header
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 8px",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#737373",
              }}
            >
              Supported Demo
            </p>
            <h1 style={{ margin: 0, fontSize: "40px", lineHeight: 1 }}>Public API Consumer</h1>
          </div>
          <ThemeSwitcher />
        </header>

        <Section label="Primitives">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <Badge label="Themeable" />
            <Badge label="Reusable" variant="accent" />
            <Badge label="Stable" variant="outline" />
          </div>
        </Section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          <Card title="Root Entry Point" meta="Library">
            このデモは `../index` だけを import し、内部ファイルへ直接依存しません。
          </Card>
          <Card title="Theme Switch" meta="Behavior" variant="filled">
            `mono` と `kawaii` の切り替えで、同じコンポーネントがトークン差し替えだけで変化します。
          </Card>
          <Card title="Validation" meta="Workflow" variant="dark">
            `typecheck`, `test`, `demo:build`, `export:css:all` を揃えて回します。
          </Card>
        </div>

        <Section label="Form">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            <Input label="Name" placeholder="山田 太郎" />
            <Input label="Email" placeholder="hello@example.com" hint="Supported public primitives only" />
          </div>
        </Section>

        <Divider label="public api" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="mono">
      <DemoScreen />
    </ThemeProvider>
  );
}
