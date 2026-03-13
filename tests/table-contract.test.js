import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const typesSource = readFileSync(
  new URL("../@types/index.d.ts", import.meta.url),
  "utf8",
);

const tableSource = readFileSync(
  new URL("../src/core/table.mjs", import.meta.url),
  "utf8",
);

test("TableProps exposes hideHeaders and renderCell", () => {
  assert.match(typesSource, /hideHeaders\?: boolean;/);
  assert.match(
    typesSource,
    /renderCell\?: \(\s*record: Record<string, any>,\s*rowIndex: number,\s*field: string,\s*\) => BunnixChild;/m,
  );
});

test("Table omits thead when hideHeaders is enabled", () => {
  assert.match(tableSource, /let hideHeaders = finalProps\.hideHeaders \?\? false;/);
  assert.match(tableSource, /delete finalProps\.hideHeaders;/);
  assert.match(tableSource, /\.\.\.\(!hideHeaders \? \[thead\(theaders\)\] : \[\]\),/);
});

test("Table renderCell receives record, row index, and field before fallback", () => {
  assert.match(tableSource, /let renderCell = finalProps\.renderCell;/);
  assert.match(tableSource, /delete finalProps\.renderCell;/);
  assert.match(tableSource, /let renderedCell = renderCell\?\.\(r, rowIndex, h\.key\);/);
  assert.match(
    tableSource,
    /if \(renderedCell !== undefined\) \{\s*return td\(\{ "data-label": h\.content \}, renderedCell\);\s*\}/m,
  );
  assert.match(
    tableSource,
    /if \(!\(h\.key in r\)\) return td\(""\);/,
  );
});
