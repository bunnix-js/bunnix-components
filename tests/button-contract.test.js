import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/core/buttons.css", import.meta.url), "utf8");
const types = readFileSync(new URL("../@types/index.d.ts", import.meta.url), "utf8");
const source = readFileSync(new URL("../src/core/buttons.mjs", import.meta.url), "utf8");
const playground = readFileSync(
  new URL("../playgrounds/src/pages/Buttons.mjs", import.meta.url),
  "utf8",
);

test("flat Button shares tertiary base styling", () => {
  assert.match(css, /\.button\.tertiary,\s*\n\.button\.flat\s*\{/);
  assert.match(
    css,
    /\.button\.tertiary,\s*\n\.button\.flat\s*\{[^}]*background-color:\s*transparent;[^}]*color:\s*var\(--color-fg-primary\);[^}]*border:\s*1px solid transparent;/s,
  );
});

test("flat Button hover uses the Highlight color at 15 percent opacity", () => {
  assert.match(
    css,
    /\.button\.flat:hover:not\(:disabled\)\s*\{\s*background-color:\s*color-mix\(in srgb, Highlight 15%, transparent\);\s*\}/,
  );
});

test("flat is documented in the Button API and playground", () => {
  assert.match(types, /variant\?:[^;]*"flat"/);
  assert.match(source, /"tertiary" \| "flat" \| "danger"/);
  assert.match(playground, /Button\(\{ variant: "flat" \}, "Flat"\)/);
});
