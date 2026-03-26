# proto_design_system

React 向けの個人用デザインシステムです。テーマトークン、`ThemeProvider`、基本コンポーネント、Hugo向けCSS変数エクスポートに加えて、Hugo ブログテーマのテンプレート断片も同じリポジトリで管理しています。

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
- `layouts/`, `assets/css/`, `static/theme/`, `theme.toml`: Hugo テーマ実装

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

## Hugo Theme

このリポジトリには、実ブログへ組み込むための Hugo テーマ実装も含めています。

- `layouts/_default/baseof.html`: 共通 shell
- `layouts/index.html`: home / landing
- `layouts/posts/list.html`: 記事一覧
- `layouts/posts/single.html`: 記事詳細
- `layouts/tags/` と `layouts/categories/`: taxonomy
- `layouts/page/single.html`: non-post page
- `layouts/partials/`: header / footer / meta / taxonomy / toc / card
- `assets/css/theme.css`, `assets/css/prose.css`: shared styling
- `static/theme/tokens.css`: Hugo がそのまま配信する token CSS

### Theme Setup

```bash
npm install
npm run export:css:all
cp dist/tokens.css static/theme/tokens.css
```

Hugo site 側では theme を有効化し、`layouts/`, `assets/css/`, `static/theme/`, `theme.toml` を配置します。`baseof.html` は `site.Params.theme` または page front matter の `theme` を見て `data-theme` を決めるので、未指定時は `mono` が使われます。

### Validation

repository 側:

```bash
npm run export:css:all
```

Hugo site 側:

```bash
hugo
hugo server
```

確認ポイント:

- home と post list に primary navigation がある
- list view は `.Title` / `.Date` / `.Summary` を使い、raw filename を見せない
- draft post が通常の published-facing view に出ない
- post detail で title/date/body、optional tags/categories、`toc: true`、shortcode、`/images/...` が読める
- tags / categories が辿れる
- non-post page でも同じ header / footer / tone が維持される
