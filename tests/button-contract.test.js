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

test("quaternary Button shares tertiary base styling", () => {
  assert.match(css, /\.button\.tertiary,\s*\n\.button\.quaternary\s*\{/);
  assert.match(
    css,
    /\.button\.tertiary,\s*\n\.button\.quaternary\s*\{[^}]*background-color:\s*transparent;[^}]*color:\s*var\(--color-fg-primary\);[^}]*border:\s*1px solid transparent;/s,
  );
});

test("quaternary Button hover blends a design token with transparency", () => {
  assert.match(
    css,
    /\.button\.quaternary:hover:not\(:disabled\)\s*\{[^}]*background-color:\s*var\(--color-bg-primary-dimmed\);[^}]*background-color:\s*color-mix\(in srgb, var\(--color-fg-primary\) 15%, transparent\);[^}]*\}/s,
  );
  assert.doesNotMatch(css, /Highlight/);
  assert.doesNotMatch(css, /--color-link[^;]*transparent/);
});

test("flat variant no longer exists in the Button API", () => {
  assert.doesNotMatch(css, /\.button\.flat/);
  assert.doesNotMatch(types, /"flat"/);
  assert.doesNotMatch(source, /"flat"/);
  assert.doesNotMatch(playground, /variant: "flat"/);
});

test("quaternary is documented in the Button API and playground", () => {
  assert.match(types, /variant\?:[^;]*"quaternary"/);
  assert.match(source, /"tertiary" \| "quaternary" \| "danger"/);
  assert.match(playground, /Button\(\{ variant: "quaternary" \}, "Quaternary"\)/);
});
