import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const typesSource = readFileSync(
  new URL("../@types/index.d.ts", import.meta.url),
  "utf8",
);

const utilsSource = readFileSync(
  new URL("../src/core/utils.mjs", import.meta.url),
  "utf8",
);

const menuSource = readFileSync(
  new URL("../src/core/menu.mjs", import.meta.url),
  "utf8",
);

const sidebarSource = readFileSync(
  new URL("../src/core/sidebar.mjs", import.meta.url),
  "utf8",
);

const inputsSource = readFileSync(
  new URL("../src/core/inputs.mjs", import.meta.url),
  "utf8",
);

test("Shared collection helper preserves state-like sources", () => {
  assert.match(utilsSource, /export const resolveCollectionState = \(value, fallback = \[\]\) =>/);
  assert.match(utilsSource, /isStateLike\(value\) \? value : useState\(value \?\? fallback\)/);
  assert.match(typesSource, /borderRadius\?: number \| string;/);
  assert.match(typesSource, /overflow\?: string;/);
  assert.match(typesSource, /overflowX\?: string;/);
  assert.match(typesSource, /overflowY\?: string;/);
  assert.match(utilsSource, /const resolveBorderRadius = \(value\) => \{/);
  assert.match(utilsSource, /if \(value === "md" \|\| value === "regular"\) return "var\(--radius-md\)";/);
  assert.match(utilsSource, /if \(value === "lg" \|\| value === "large"\) return "var\(--radius-lg\)";/);
  assert.match(utilsSource, /if \(value === "pill"\) return "9999px";/);
  assert.match(utilsSource, /if \(value === "circle"\) return "9999%";/);
  assert.match(utilsSource, /if \("borderRadius" in props\) \{/);
  assert.match(utilsSource, /style\.borderRadius = resolveBorderRadius\(props\.borderRadius\);/);
  assert.match(utilsSource, /if \("fontSize" in props\) \{/);
  assert.match(utilsSource, /typeof props\.fontSize === "number"/);
  assert.match(utilsSource, /if \("overflowX" in props\) \{/);
  assert.match(utilsSource, /style\.overflowX = props\.overflowX;/);
  assert.match(utilsSource, /if \("overflowY" in props\) \{/);
  assert.match(utilsSource, /style\.overflowY = props\.overflowY;/);
  assert.match(utilsSource, /if \("zIndex" in props\) \{/);
  assert.match(utilsSource, /style\.zIndex = props\.zIndex;/);
});

test("Menu renders items reactively from collection state", () => {
  assert.match(menuSource, /const itemsValue = resolveCollectionState\(props\.items, \[\]\);/);
  assert.match(menuSource, /const keyedItemsValue = Compute\(itemsValue, \(resolvedItems\) =>/);
  assert.match(menuSource, /item\?\.divider && \(item\.key === undefined \|\| item\.key === null\)/);
  assert.match(menuSource, /ForEach\(keyedItemsValue, "key", \(item\) => \{/);
  assert.doesNotMatch(menuSource, /props\.items\?\.get && props\.items\?\.set\s*\?\s*props\.items\.get\(\)/);
});

test("Select supports state-like options and clears missing selections", () => {
  assert.match(typesSource, /options\?: SelectOption\[] \| StateLike<SelectOption\[]>;/);
  assert.match(inputsSource, /let optionsValue = resolveCollectionState\(props\.options, \[\]\);/);
  assert.match(inputsSource, /const selectedOptionState = Compute\(\[value, optionsValue\],/);
  assert.match(inputsSource, /if \(!selectedKey \|\| selectedOption\) return;/);
  assert.match(inputsSource, /value\.set\(""\);/);
  assert.match(inputsSource, /option: null,/);
});

test("Sidebar renders reactive items through a single computed view state", () => {
  assert.match(sidebarSource, /let itemsValue = resolveCollectionState\(props\.items, \[\]\);/);
  assert.match(
    sidebarSource,
    /const sidebarState = Compute\(\s*\[itemsValue, expandedItemsValue, selectionValue\],\s*\(resolvedItems, expandedItems, selected\) => \(\{/m,
  );
  assert.match(sidebarSource, /return Show\(sidebarState, \(\{ resolvedItems, expandedItems, selected \}\) =>/);
  assert.doesNotMatch(sidebarSource, /selectionWrapper/);
});
