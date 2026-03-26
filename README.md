# proto_design_system

React 向けの個人用デザインシステムです。テーマトークン、`ThemeProvider`、基本コンポーネント、Hugo向けCSS変数エクスポートをまとめています。

consumer が依存してよい面はルート公開エントリポイントだけです。`components.tsx` や `tokens.mono.ts` のような内部ファイルへの直接 import はサポートしません。

## Files

- `index.ts`: React向け公開エントリポイント
- `types.ts`: トークンとコンポーネント props の型定義
- `tokens.ts`: `mono` / `kawaii` テーマの公開
- `ThemeContext.tsx`: `ThemeProvider` と `useTheme`
- `components.tsx`: `Button`, `Card`, `Badge`, `Input`, `Section`, `Divider`, `ThemeSwitcher`
- `export-css.ts`: Hugo 向けに CSS カスタムプロパティを生成する CLI
- `DesignSystem.tsx`: ライブラリを使ったショーケースコンポーネント
- `demo/`: `npm run demo` で起動する、`index.ts` だけを使う supported demo

## Usage

```tsx
import { ThemeProvider, Button, Card } from "design-system";

export function App() {
  return (
    <ThemeProvider defaultTheme="mono">
      <Card title="Hello" meta="Demo">
        <Button variant="accent">Click</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## Supported Surface

- 使う側は `index.ts` 経由の export だけを利用する
- サポート対象の primitives は `Button`, `Card`, `Badge`, `Input`, `Section`, `Divider`, `ThemeSwitcher`
- デモは supported consumer として `demo/App.tsx` からこの公開面だけを使う

## Scripts

```bash
npm install
npm run typecheck
npm test
npm run demo
npm run validate
npm run export:css:all
```

`npm run demo` でブラウザ確認用のショーケースを起動できます。静的出力が必要なら `npm run demo:build` を使います。
`npm run validate` は `typecheck`、`test`、`demo:build`、`export:css:all` を順に実行します。

## Hugo 連携

```bash
npm run export:css:all
```

生成された `dist/tokens.css` を Hugo 側で読み込み、`<html data-theme="mono">` のようにテーマを切り替えます。
