import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(
  new URL("../playgrounds/src/app.mjs", import.meta.url),
  "utf8",
);

const menuPageSource = readFileSync(
  new URL("../playgrounds/src/pages/menu.mjs", import.meta.url),
  "utf8",
);

test("Playground sidebar groups menu showcases under a nested Menus item", () => {
  assert.match(appSource, /key: "menus",\s*text: "Menus",\s*expanded: true,/m);
  assert.match(appSource, /children: \[\s*\{ key: "menu", text: "Menu", icon: "more-vertical" \},\s*\{ key: "picker", text: "Picker", icon: "square-pencil" \},\s*\]/m);
});

test("Playground app preserves displayed content when a non-page parent item is selected", () => {
  assert.match(appSource, /const displayedPageKey = useState\("home"\);/);
  assert.match(appSource, /if \(contentPageKeys\.has\(selectedKey\)\) displayedPageKey\.set\(selectedKey\);/);
  assert.match(appSource, /Show\(displayedPageKey, \(item\) => \{/);
  assert.doesNotMatch(appSource, /if \(item === "menus"\)/);
});

test("Menu and Picker have separate showcase pages", () => {
  assert.match(appSource, /import \{ MenuPage, PickerPage \} from "\.\/pages\/menu\.mjs";/);
  assert.match(appSource, /if \(item === "menu"\) return MenuPage\(\);/);
  assert.match(appSource, /if \(item === "picker"\) return PickerPage\(\);/);
  assert.match(menuPageSource, /export function MenuPage\(\) \{/);
  assert.match(menuPageSource, /export function PickerPage\(\) \{/);
});
