import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const typesSource = readFileSync(
  new URL("../@types/index.d.ts", import.meta.url),
  "utf8",
);

const sidebarSource = readFileSync(
  new URL("../src/core/sidebar.mjs", import.meta.url),
  "utf8",
);

test("Sidebar type surface exposes nested item support", () => {
  assert.match(typesSource, /children\?: SidebarItem\[];/);
  assert.match(typesSource, /expanded\?: boolean;/);
  assert.match(typesSource, /selection\?: string \| null \| StateLike<string \| null>;/);
});

test("Sidebar renders chevrons and recursive nested children", () => {
  assert.match(sidebarSource, /name: isExpanded \? "chevron-down" : "chevron-right"/);
  assert.match(sidebarSource, /\.\.\.\(level === 0 && item\.icon/);
  assert.match(
    sidebarSource,
    /\.\.\.item\.children\.map\(\(child(?:, childIndex)?\) =>\s*renderSidebarItem\(\{/m,
  );
});

test("Sidebar parent click selects the parent key and toggles expansion", () => {
  assert.match(
    sidebarSource,
    /click: \(\) => \{\s*setSelection\(item\.key\);\s*if \(hasChildren\) toggleExpanded\(item\.key\);\s*\}/m,
  );
  assert.match(sidebarSource, /const selectionWrapper = Compute\(selectionValue, \(selected\) => \(\{ selected \}\)\);/);
});

test("Sidebar seeds nested expansion state from item.expanded", () => {
  assert.match(sidebarSource, /const buildExpansionState = \(items = \[\], currentState = \{\}\) => \{/);
  assert.match(sidebarSource, /nextState\[item\.key\] = item\.expanded \?\? false;/);
  assert.match(sidebarSource, /expandedItemsValue = useState\(buildExpansionState\(itemsValue\.get\?\.\(\) \?\? props\.items \?\? \[\]\)\);/);
});
