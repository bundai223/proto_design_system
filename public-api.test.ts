import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import * as designSystem from "./index";

describe("public api surface", () => {
  it("exposes the supported runtime exports from the root entry point", () => {
    expect(designSystem.themes).toBeDefined();
    expect(designSystem.ThemeProvider).toBeTypeOf("function");
    expect(designSystem.useTheme).toBeTypeOf("function");
    expect(designSystem.Button).toBeTypeOf("function");
    expect(designSystem.Card).toBeTypeOf("function");
    expect(designSystem.Badge).toBeTypeOf("function");
    expect(designSystem.Input).toBeTypeOf("function");
    expect(designSystem.Section).toBeTypeOf("function");
    expect(designSystem.Divider).toBeTypeOf("function");
    expect(designSystem.ThemeSwitcher).toBeTypeOf("function");
  });

  it("supports rendering a consumer example using only the root entry point", () => {
    const html = renderToStaticMarkup(
      createElement(
        designSystem.ThemeProvider as any,
        { defaultTheme: "mono" },
        createElement(
          designSystem.Card as any,
          { title: "Hello", meta: "Demo" },
          createElement(designSystem.Button as any, { variant: "accent" }, "Click"),
          createElement(designSystem.Badge as any, { label: "Supported", variant: "accent" }),
        ),
      ),
    );

    expect(html).toContain("Hello");
    expect(html).toContain("Click");
    expect(html).toContain("Supported");
  });
});
