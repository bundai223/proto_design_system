/**
 * export-css.test.ts
 *
 * export-css.ts のユニット＆スナップショットテスト。
 *
 * 実行:
 *   npx vitest run
 *   npx vitest run --reporter=verbose
 *
 * スナップショット更新:
 *   npx vitest run --update-snapshots
 */

import { describe, it, expect } from "vitest";
import { monoTheme } from "./tokens.mono";
import { kawaiiTheme } from "./tokens.kawaii";
import {
  toKebabCase,
  themeToCssVars,
  buildSingleTheme,
  buildAllThemes,
  parseArgs,
  themes,
} from "./export-css";
import type { Theme } from "./types";

// テスト用に固定タイムスタンプを使う（スナップショットを安定させるため）
const FIXED_TS = "2024-01-01T00:00:00.000Z";

// ============================================================
// toKebabCase
// ============================================================
describe("toKebabCase", () => {
  it("通常のキーはそのまま返す", () => {
    expect(toKebabCase("black")).toBe("black");
    expect(toKebabCase("accent")).toBe("accent");
  });

  it("camelCase を kebab-case に変換する", () => {
    expect(toKebabCase("accentHover")).toBe("accent-hover");
    expect(toKebabCase("gray100")).toBe("gray100"); // 数字は変換しない
  });

  it("複数の大文字を含む場合も正しく変換する", () => {
    expect(toKebabCase("backgroundColor")).toBe("background-color");
    expect(toKebabCase("borderTopRadius")).toBe("border-top-radius");
  });
});

// ============================================================
// themeToCssVars
// ============================================================
describe("themeToCssVars", () => {
  describe("mono テーマ", () => {
    const vars = themeToCssVars(monoTheme);

    it("--ds-color- プレフィックスで色変数が含まれる", () => {
      expect(vars).toContain("--ds-color-black:");
      expect(vars).toContain("--ds-color-accent:");
      expect(vars).toContain("--ds-color-accent-hover:"); // camelCase 変換の確認
      expect(vars).toContain("--ds-color-white:");
    });

    it("--ds-font- プレフィックスでフォント変数が含まれる", () => {
      expect(vars).toContain("--ds-font-display:");
      expect(vars).toContain("--ds-font-sans:");
      expect(vars).toContain("--ds-font-mono:");
    });

    it("--ds-scale- プレフィックスでスペーシング変数が含まれる", () => {
      expect(vars).toContain("--ds-scale-xs:");
      expect(vars).toContain("--ds-scale-md:");
      expect(vars).toContain("--ds-scale-xl:");
    });

    it("--ds-radius- プレフィックスでボーダーラジウス変数が含まれる", () => {
      expect(vars).toContain("--ds-radius-none:");
      expect(vars).toContain("--ds-radius-sm:");
      expect(vars).toContain("--ds-radius-full:");
    });

    it("--ds-font-import が含まれる", () => {
      expect(vars).toContain("--ds-font-import: url(");
    });

    it("トークンの値が正しく反映されている", () => {
      expect(vars).toContain(`--ds-color-accent: ${monoTheme.colors.accent};`);
      expect(vars).toContain(`--ds-scale-md: ${monoTheme.scale.md};`);
      expect(vars).toContain(`--ds-radius-full: ${monoTheme.radius.full};`);
    });
  });

  describe("kawaii テーマ", () => {
    const vars = themeToCssVars(kawaiiTheme);

    it("mono と異なるアクセントカラーを持つ", () => {
      const monoVars = themeToCssVars(monoTheme);
      expect(vars).not.toContain(`--ds-color-accent: ${monoTheme.colors.accent}`);
      expect(vars).toContain(`--ds-color-accent: ${kawaiiTheme.colors.accent}`);
    });

    it("kawaii は mono より大きい radius-sm を持つ", () => {
      // mono: 4px, kawaii: 12px
      expect(vars).toContain(`--ds-radius-sm: ${kawaiiTheme.radius.sm};`);
      expect(kawaiiTheme.radius.sm).not.toBe(monoTheme.radius.sm);
    });
  });

  it("全テーマで同じ変数キーセットが揃っている（Hugo側で変数が欠落しないことの保証）", () => {
    // 変数名（値を除いた部分）を抽出するヘルパー
    const extractVarNames = (css: string) =>
      css
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("--ds-"))
        .map((line) => line.split(":")[0].trim())
        .sort();

    const monoVarNames   = extractVarNames(themeToCssVars(monoTheme));
    const kawaiiVarNames = extractVarNames(themeToCssVars(kawaiiTheme));

    expect(monoVarNames).toEqual(kawaiiVarNames);
  });
});

// ============================================================
// buildSingleTheme
// ============================================================
describe("buildSingleTheme", () => {
  it(":root セレクタを含む", () => {
    const css = buildSingleTheme(monoTheme, FIXED_TS);
    expect(css).toContain(":root {");
  });

  it("コメントヘッダーにテーマ名が含まれる", () => {
    const css = buildSingleTheme(monoTheme, FIXED_TS);
    expect(css).toContain(`Design System Tokens — ${monoTheme.label}`);
  });

  it("スナップショット — mono", () => {
    const css = buildSingleTheme(monoTheme, FIXED_TS);
    expect(css).toMatchSnapshot();
  });

  it("スナップショット — kawaii", () => {
    const css = buildSingleTheme(kawaiiTheme, FIXED_TS);
    expect(css).toMatchSnapshot();
  });
});

// ============================================================
// buildAllThemes
// ============================================================
describe("buildAllThemes", () => {
  it("デフォルトテーマは :root と [data-theme] の両方に出力される", () => {
    const css = buildAllThemes(themes, "mono", FIXED_TS);
    expect(css).toContain(`:root,`);
    expect(css).toContain(`[data-theme="mono"]`);
  });

  it("非デフォルトテーマは [data-theme] のみに出力される", () => {
    const css = buildAllThemes(themes, "mono", FIXED_TS);
    // kawaii は :root, と一緒には出てこない
    const kawaiiBlock = css.split(`[data-theme="kawaii"]`)[1] ?? "";
    expect(css).toContain(`[data-theme="kawaii"]`);
    // :root, の直後に kawaii のセレクタが来ないことを確認
    expect(css).not.toContain(`:root,\n[data-theme="kawaii"]`);
  });

  it("全テーマのブロックが含まれる", () => {
    const css = buildAllThemes(themes, "mono", FIXED_TS);
    for (const name of Object.keys(themes)) {
      expect(css).toContain(`[data-theme="${name}"]`);
    }
  });

  it("スナップショット — 全テーマ", () => {
    const css = buildAllThemes(themes, "mono", FIXED_TS);
    expect(css).toMatchSnapshot();
  });

  it("カスタムテーママップでも正しく動作する", () => {
    const miniTheme: Theme = {
      ...monoTheme,
      name: "mono",
      label: "Mini",
      colors: { ...monoTheme.colors, accent: "#FF0000", accentHover: "#CC0000" },
    };
    const css = buildAllThemes({ mini: miniTheme }, "mini", FIXED_TS);
    expect(css).toContain(`:root,`);
    expect(css).toContain(`[data-theme="mini"]`);
    expect(css).toContain("--ds-color-accent: #FF0000;");
  });
});

// ============================================================
// parseArgs
// ============================================================
describe("parseArgs", () => {
  it("引数なしはデフォルト値を返す", () => {
    expect(parseArgs(["node", "script.ts"])).toEqual({
      theme: "mono",
      out:   "./dist/tokens.css",
      all:   false,
    });
  });

  it("--theme オプションを解釈する", () => {
    const result = parseArgs(["node", "script.ts", "--theme", "kawaii"]);
    expect(result.theme).toBe("kawaii");
  });

  it("--out オプションを解釈する", () => {
    const result = parseArgs(["node", "script.ts", "--out", "../blog/assets/css/tokens.css"]);
    expect(result.out).toBe("../blog/assets/css/tokens.css");
  });

  it("--all フラグを解釈する", () => {
    const result = parseArgs(["node", "script.ts", "--all"]);
    expect(result.all).toBe(true);
  });

  it("複数オプションを同時に解釈する", () => {
    const result = parseArgs(["node", "script.ts", "--all", "--out", "./out/tokens.css"]);
    expect(result).toEqual({ theme: "mono", out: "./out/tokens.css", all: true });
  });
});

// ============================================================
// 統合: Hugo との整合性チェック
// ============================================================
describe("Hugo との整合性", () => {
  it("全テーマの全変数が --ds- プレフィックスで始まる（Hugo CSS 変数参照の規約確認）", () => {
    for (const [name, theme] of Object.entries(themes)) {
      const vars = themeToCssVars(theme);
      const varLines = vars
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("--"));

      for (const line of varLines) {
        expect(line, `[${name}] "${line}" は --ds- で始まるべき`).toMatch(/^--ds-/);
      }
    }
  });

  it("カラー変数の値が有効な16進数カラーコードである", () => {
    const hexColor = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    for (const [name, theme] of Object.entries(themes)) {
      for (const [key, value] of Object.entries(theme.colors)) {
        expect(value, `[${name}] colors.${key} = "${value}" は有効な hex カラーであるべき`).toMatch(hexColor);
      }
    }
  });

  it("スペーシング・ラジウスの値が px 単位である", () => {
    const pxValue = /^\d+px$/;
    for (const [name, theme] of Object.entries(themes)) {
      for (const [key, value] of Object.entries(theme.scale)) {
        expect(value, `[${name}] scale.${key} = "${value}" は px 単位であるべき`).toMatch(pxValue);
      }
      for (const [key, value] of Object.entries(theme.radius)) {
        expect(value, `[${name}] radius.${key} = "${value}" は px 単位であるべき`).toMatch(pxValue);
      }
    }
  });
});
