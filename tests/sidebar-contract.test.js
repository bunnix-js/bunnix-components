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
  assert.match(sidebarSource, /name: isExpanded \? "chevron_down" : "chevron_right"/);
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
  assert.match(
    sidebarSource,
    /const sidebarState = Compute\(\s*\[itemsValue, expandedItemsValue, selectionValue\],\s*\(resolvedItems, expandedItems, selected\) => \(\{/m,
  );
});

test("Sidebar seeds nested expansion state from item.expanded", () => {
  assert.match(sidebarSource, /const buildExpansionState = \(items = \[\], currentState = \{\}, selectedKey = ""\) => \{/);
  assert.match(sidebarSource, /nextState\[item\.key\] = item\.key === selectedKey \|\| \(item\.expanded \?\? false\);/);
  assert.match(sidebarSource, /const initialSelection = resolveSelectionValue\(props\.selection\);/);
  assert.match(sidebarSource, /buildExpansionState\(itemsValue\.get\?\.\(\) \?\? props\.items \?\? \[\], \{\}, initialSelection\)/);
  assert.match(
    sidebarSource,
    /buildExpansionState\(\s*nextItems \?\? \[\],\s*currentState,\s*resolveSelectionValue\(selectionValue\),\s*\)/m,
  );
});

test("Sidebar does not auto-expand ancestors for selected child keys", () => {
  assert.doesNotMatch(sidebarSource, /descendant/i);
  assert.doesNotMatch(sidebarSource, /child.*selected.*expand/i);
  assert.match(sidebarSource, /item\.key === selectedKey \|\| \(item\.expanded \?\? false\)/);
});

test("Sidebar clears missing selections when items update", () => {
  assert.match(sidebarSource, /const hasSidebarItem = \(items = \[\], key\) => \{/);
  assert.match(sidebarSource, /let itemsValue = resolveCollectionState\(props\.items, \[\]\);/);
  assert.match(sidebarSource, /if \(resolvedSelection && !hasSidebarItem\(nextItems \?\? \[\], resolvedSelection\)\) \{/);
  assert.match(sidebarSource, /selectionValue\.set && selectionValue\.set\(null\);/);
  assert.match(sidebarSource, /return Show\(sidebarState, \(\{ resolvedItems, expandedItems, selected \}\) =>/);
});
