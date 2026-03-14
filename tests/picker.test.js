import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const typesSource = readFileSync(
  new URL("../@types/index.d.ts", import.meta.url),
  "utf8",
);

const inputsSource = readFileSync(
  new URL("../src/core/inputs.mjs", import.meta.url),
  "utf8",
);

const inputCssSource = readFileSync(
  new URL("../src/core/input.css", import.meta.url),
  "utf8",
);

const indexSource = readFileSync(
  new URL("../src/index.mjs", import.meta.url),
  "utf8",
);

test("Picker and MenuItem are part of the public type surface", () => {
  assert.match(typesSource, /export interface MenuItem \{/);
  assert.match(typesSource, /key: string;/);
  assert.match(typesSource, /divider\?: boolean;/);
  assert.match(typesSource, /export interface PickerProps extends LayoutProps \{/);
  assert.match(typesSource, /items\?: MenuItem\[] \| StateLike<MenuItem\[]>;/);
  assert.match(typesSource, /anchor\?: MenuAnchor;/);
  assert.match(typesSource, /export const Picker: Component<PickerProps>;/);
  assert.match(typesSource, /export const Menu: Component<MenuProps>;/);
  assert.doesNotMatch(typesSource, /DropdownPicker/);
});

test("Picker is exported from the package entrypoint", () => {
  assert.match(
    indexSource,
    /export \{ Picker \} from "\.\/core\/inputs\.mjs";/,
  );
  assert.doesNotMatch(indexSource, /DropdownPicker/);
});

test("Picker composes Menu and updates value on item click", () => {
  assert.match(inputsSource, /const PickerCore = \(props, _\) => \{/);
  assert.match(inputsSource, /Show\(pickerState, \(\{ selectedItem, menuItems \}\) =>\s*Menu\(\{/m);
  assert.match(inputsSource, /value\.set\(item\.key\);/);
  assert.match(inputsSource, /target: \{ value: item\.key \}/);
  assert.doesNotMatch(inputsSource, /item\.action\(\)/);
  assert.doesNotMatch(inputsSource, /DropdownPicker/);
});

test("Picker trigger renders selected icon and text with blank-state support", () => {
  assert.match(inputsSource, /const selectedItem = \(resolvedItems \?\? \[\]\)\.find\(/);
  assert.match(inputsSource, /selectedItem\?\.icon/);
  assert.match(inputsSource, /selectedItem\.text \?\? selectedItem\.key/);
  assert.match(inputsSource, /minHeight: props\.style\?\.minHeight \?\? "32px"/);
  assert.match(inputsSource, /Icon\(\{ name: "chevron-down", size: 16, color: "secondary" \}\)/);
});

test("Picker CSS hook exists", () => {
  assert.match(inputCssSource, /\.picker-trigger \{/);
  assert.match(inputCssSource, /\.picker-selection \{/);
  assert.doesNotMatch(inputCssSource, /dropdown-picker/);
});
