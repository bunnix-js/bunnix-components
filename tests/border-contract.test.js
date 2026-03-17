import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const typesSource = readFileSync(
  new URL("../@types/index.d.ts", import.meta.url),
  "utf8",
);

const cssSource = readFileSync(
  new URL("../src/core/core.css", import.meta.url),
  "utf8",
);

const layoutSource = readFileSync(
  new URL("../src/core/layout.mjs", import.meta.url),
  "utf8",
);

const tableSource = readFileSync(
  new URL("../src/core/table.mjs", import.meta.url),
  "utf8",
);

test("LayoutProps exposes the resolved border union", () => {
  assert.match(
    typesSource,
    /border\?:\s*"none"\s*\|\s*"primary"\s*\|\s*"secondary"\s*\|\s*"tertiary"\s*\|\s*"transparent";/,
  );
});

test("core.css defines secondary and tertiary border tokens", () => {
  assert.match(
    cssSource,
    /--color-fg-secondary:\s*light-dark\(#737373,\s*#aaa\);/,
  );
  assert.match(
    cssSource,
    /--color-border-secondary:\s*light-dark\(#E0E0E0,\s*#2E2E2E\);/,
  );
  assert.match(
    cssSource,
    /--color-border-tertiary:\s*light-dark\(#ECECEC,\s*#242424\);/,
  );
});

test("core.css exposes secondary and tertiary border selectors", () => {
  assert.match(
    cssSource,
    /\.border-secondary,\s*\n\[border="secondary"\]\s*\{\s*\n\s*border:\s*1px solid var\(--color-border-secondary\);/m,
  );
  assert.match(
    cssSource,
    /\.border-tertiary,\s*\n\[border="tertiary"\]\s*\{\s*\n\s*border:\s*1px solid var\(--color-border-tertiary\);/m,
  );
});

test("Grid preserves extracted style values when adding grid styles", () => {
  assert.match(
    layoutSource,
    /let style = \{ \.\.\.\(props\.style \?\? \{\}\) \};/,
  );
  assert.match(
    layoutSource,
    /style\["--grid-gap"\] = \(typeof gap === "number"\) \? `\$\{gap\}px` : gap;/,
  );
});

test("Table maps border prop to class instead of native table border attribute", () => {
  assert.match(tableSource, /let type = finalProps\.type \?\? "regular";/);
  assert.match(tableSource, /let border = finalProps\.border;/);
  assert.match(tableSource, /delete finalProps\.type;/);
  assert.match(tableSource, /delete finalProps\.border;/);
  assert.match(
    tableSource,
    /class: `table \$\{type !== "regular" \? `table-\$\{type\} ` : ""\}\$\{hideHeaders \? "table-hide-headers " : ""\}\$\{border \? `border-\$\{border\} ` : ""\}\$\{finalProps\.class \|\| ""\}`\.trim\(\),/,
  );
});
