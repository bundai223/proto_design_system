# proto_design_system

React 向けの個人用デザインシステムです。テーマトークン、`ThemeProvider`、基本コンポーネント、Hugo向けCSS変数エクスポートに加えて、Hugo ブログテーマのテンプレート断片も同じリポジトリで管理しています。

consumer が依存してよい面はルート公開エントリポイントだけです。`src/react/components.tsx` や `src/themes/tokens.mono.ts` のような内部ファイルへの直接 import はサポートしません。

## Structure

- `index.ts`: React向け公開エントリポイント
- `src/types.ts`: トークンとコンポーネント props の型定義
- `src/tokens.ts`: `mono` / `kawaii` テーマの公開
- `src/themes/`: テーマ定義
- `src/react/ThemeContext.tsx`: `ThemeProvider` と `useTheme`
- `src/react/components.tsx`: `Button`, `Card`, `Badge`, `Input`, `Section`, `Divider`, `ThemeSwitcher`
- `export-css.ts`: Hugo 向けに CSS カスタムプロパティを生成する CLI
- `demo/`: `npm run demo` で起動する supported demo とショーケース
- `hugo_themes/proto_design_system/`: Hugo テーマ実装

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

## GitHub Pages Showcase

このリポジトリの interactive showcase は GitHub Pages で公開する前提です。想定 URL は `https://bundai223.github.io/proto_design_system/` です。

### Build Contract

```bash
npm run demo:build
```

- publish 対象は `dist/demo/`
- entry point は `dist/demo/index.html`
- default base path は `/proto_design_system/`
- 別の公開先に変える場合は build 時に `PAGES_BASE_PATH` で上書きする

```bash
PAGES_BASE_PATH=/custom-path/ npm run demo:build
```

`vite.config.ts` が build-time で base path を解決するので、`demo/` 配下の React コンポーネント側を修正せずに公開先を切り替えられます。

### GitHub Actions Deployment

GitHub Pages 用 workflow は `.github/workflows/deploy-pages.yml` です。

- `main` への push で自動 deploy する
- Actions タブから manual dispatch でも再実行できる
- GitHub Actions 上では `dist/demo/` だけを Pages artifact として publish する

Repository Settings > Pages では source を `GitHub Actions` に設定します。

### Verification

local:

```bash
npm run demo:build
sed -n '1,40p' dist/demo/index.html
```

確認ポイント:

- built asset URL が `/proto_design_system/assets/...` のように repo path 配下を向く
- `dist/demo/index.html` と `dist/demo/assets/` が生成される
- `PAGES_BASE_PATH` を変えても `demo/` 配下のコードを編集せずに build できる

hosted:

- `main` へ merge または push して workflow を走らせる
- 必要なら Actions から manual dispatch で再 deploy する
- 公開 URL を開いて blank screen や broken asset が無いことを確認する

## Hugo 連携

```bash
npm run export:css:all
```

生成された `dist/tokens.css` を Hugo 側で読み込み、`<html data-theme="mono">` のようにテーマを切り替えます。

## Hugo Theme

このリポジトリには、実ブログへ組み込むための Hugo テーマ実装も含めています。

- `hugo_themes/proto_design_system/layouts/_default/baseof.html`: 共通 shell
- `hugo_themes/proto_design_system/layouts/index.html`: home / landing
- `hugo_themes/proto_design_system/layouts/posts/list.html`: 記事一覧
- `hugo_themes/proto_design_system/layouts/posts/single.html`: 記事詳細
- `hugo_themes/proto_design_system/layouts/tags/` と `hugo_themes/proto_design_system/layouts/categories/`: taxonomy
- `hugo_themes/proto_design_system/layouts/page/single.html`: non-post page
- `hugo_themes/proto_design_system/layouts/partials/`: header / footer / meta / taxonomy / toc / card / discussion
- `hugo_themes/proto_design_system/assets/css/theme.css`, `hugo_themes/proto_design_system/assets/css/prose.css`: shared styling
- `hugo_themes/proto_design_system/static/theme/tokens.css`: Hugo がそのまま配信する token CSS。`export-css.ts` 由来の生成物
- `hugo_themes/proto_design_system/theme.toml`: theme metadata

### Theme Setup

```bash
npm install
npm run export:css:all
cp dist/tokens.css hugo_themes/proto_design_system/static/theme/tokens.css
```

`hugo_themes/proto_design_system/static/theme/tokens.css` は手編集しません。`export-css.ts` で生成した `dist/tokens.css` を同期する前提です。

別リポジトリへ持っていくときは、`hugo_themes/proto_design_system/` ディレクトリごとコピーするか、そのまま submodule / subtree で取り込みます。ブログ側では `themes/proto_design_system/` に置いて `theme = "proto_design_system"` を指定します。`baseof.html` は `site.Params.theme` または page front matter の `theme` を見て `data-theme` を決めるので、未指定時は `mono` が使われます。

### Use As Theme

別リポジトリの Hugo ブログに反映する最小手順です。

1. このリポジトリ側で token CSS を生成して同期する

```bash
npm install
npm run export:css:all
cp dist/tokens.css hugo_themes/proto_design_system/static/theme/tokens.css
```

2. ブログリポジトリへ theme を配置する

```bash
cp -R hugo_themes/proto_design_system /path/to/your-blog/themes/proto_design_system
```

3. ブログ側の `hugo.toml` か `config.toml` に theme を設定する

```toml
theme = "proto_design_system"

[params]
  theme = "mono"

[taxonomies]
  tag = "tags"
  category = "categories"
```

4. ブログ側で必要な前提を確認する

- posts は `content/posts/*.md`
- 記事本文は `.Content` で通常表示できること
- shortcode を使うならブログ側に shortcode 実装があること
- `/images/...` を使うなら `static/images/` などに実体があること

### Discussion Support

Hugo theme の post detail では、published post に対して discussion block を article body の後ろに表示できます。表示可否は site-level default と per-post override で制御します。

ブログ側 config 例:

```toml
[params]
  theme = "mono"
  discussionEnabled = true
  disqusShortname = "your-shortname"
```

post front matter 例:

```toml
title = "My Post"
date = 2026-03-30T00:00:00+09:00
discussion = false
```

- `params.discussionEnabled = true` で supported published post に discussion を出す
- page front matter の `discussion = false` でその post だけ disable できる
- page front matter の `discussion = true` を使うと site default が false でもその post だけ enable できる
- discussion 対応は initial scope では published post のみ
- discussion block は article body の後ろに出る
- `disqusShortname` が未設定、または embed script が読めない場合は embed を出さずに短い unavailable message を表示する

5. ブログ側で起動して確認する

```bash
hugo
hugo server
```

6. `kawaii` を使いたい場合はブログ側 config の `params.theme` を切り替える

```toml
[params]
  theme = "kawaii"
```

運用上は、theme 本体は `themes/proto_design_system/` にまとめて持ち込み、見た目調整時だけこのリポジトリで更新して再同期するのが扱いやすいです。

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
- post detail で discussion を有効にした published post は body の後ろに post-specific discussion が出る
- site default と per-post override で discussion 表示を制御できる
- unavailable 時は embed が隠れ、短い unavailable message が出る
- tags / categories が辿れる
- non-post page でも同じ header / footer / tone が維持される
