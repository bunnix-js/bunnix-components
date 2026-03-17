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

const tableCssSource = readFileSync(
  new URL("../src/core/table.css", import.meta.url),
  "utf8",
);

test("TableProps exposes type, hideHeaders, renderCell, and reactive data collections", () => {
  assert.match(typesSource, /headers\?: TableHeader\[] \| StateLike<TableHeader\[]>;/);
  assert.match(typesSource, /rows\?: Array<Record<string, any>> \| StateLike<Array<Record<string, any>>>;/);
  assert.match(typesSource, /type\?: "regular" \| "alternate-rows";/);
  assert.match(typesSource, /hideHeaders\?: boolean;/);
  assert.match(
    typesSource,
    /renderCell\?: \(\s*record: Record<string, any>,\s*rowIndex: number,\s*field: string,\s*\) => BunnixChild;/m,
  );
});

test("Table omits thead when hideHeaders is enabled", () => {
  assert.match(tableSource, /const headersValue = resolveCollectionState\(finalProps\.headers, \[\]\);/);
  assert.match(tableSource, /const rowsValue = resolveCollectionState\(finalProps\.rows, \[\]\);/);
  assert.match(tableSource, /let type = finalProps\.type \?\? "regular";/);
  assert.match(tableSource, /delete finalProps\.type;/);
  assert.match(tableSource, /let hideHeaders = finalProps\.hideHeaders \?\? false;/);
  assert.match(tableSource, /delete finalProps\.hideHeaders;/);
  assert.match(tableSource, /colgroup\(ForEach\(headersValue, "key", \(h\) => col\(\{ width: h\.size \?\? 0 \}\)\)\),/);
  assert.match(tableSource, /\.\.\.\(!hideHeaders\s*\?\s*\[thead\(ForEach\(headersValue, "key", \(h\) => td\(h\.content \?\? ""\)\)\)\]\s*:\s*\[\]\),/m);
  assert.match(
    tableSource,
    /class: `table \$\{type !== "regular" \? `table-\$\{type\} ` : ""\}\$\{hideHeaders \? "table-hide-headers " : ""\}\$\{border \? `border-\$\{border\} ` : ""\}\$\{finalProps\.class \|\| ""\}`\.trim\(\),/,
  );
});

test("Table renderCell receives record, row index, and field before fallback", () => {
  assert.match(tableSource, /let renderCell = finalProps\.renderCell;/);
  assert.match(tableSource, /delete finalProps\.renderCell;/);
  assert.match(tableSource, /ForEach\(rowsValue, \{\}, \(r, rowIndex\) =>/);
  assert.match(tableSource, /ForEach\(headersValue, "key", \(h\) => \{/);
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

test("Table alternate-rows CSS removes separators and alternates row backgrounds", () => {
  assert.match(tableCssSource, /\.table thead td,[\s\S]*height: 40px;/m);
  assert.match(tableCssSource, /\.table td \{\s*\n\s*height: 40px;/m);
  assert.match(tableCssSource, /\.table\.table-alternate-rows thead td,/);
  assert.match(tableCssSource, /border-bottom: none;/);
  assert.match(
    tableCssSource,
    /\.table\.table-alternate-rows thead td,[\s\S]*background-color: var\(--color-bg-primary-dimmed\);/m,
  );
  assert.match(
    tableCssSource,
    /\.table\.table-alternate-rows thead \+ tbody tr:nth-child\(even\) td,[\s\S]*background-color: var\(--color-bg-primary-dimmed\);/m,
  );
  assert.match(
    tableCssSource,
    /\.table\.table-alternate-rows\.table-hide-headers tbody tr:nth-child\(odd\) td,[\s\S]*background-color: var\(--color-bg-primary-dimmed\);/m,
  );
});
