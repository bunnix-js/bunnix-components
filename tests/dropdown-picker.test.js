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

test("DropdownPicker and MenuItem are part of the public type surface", () => {
  assert.match(typesSource, /export interface MenuItem \{/);
  assert.match(typesSource, /key: string;/);
  assert.match(typesSource, /divider\?: boolean;/);
  assert.match(typesSource, /export interface DropdownPickerProps extends LayoutProps \{/);
  assert.match(typesSource, /items\?: MenuItem\[] \| StateLike<MenuItem\[]>;/);
  assert.match(typesSource, /anchor\?: MenuAnchor;/);
  assert.match(typesSource, /export const DropdownPicker: Component<DropdownPickerProps>;/);
  assert.match(typesSource, /export const Menu: Component<MenuProps>;/);
});

test("DropdownPicker is exported from the package entrypoint", () => {
  assert.match(
    indexSource,
    /export \{ TextInput, TextArea, DropdownPicker, Select, CheckBox, Slider \} from "\.\/core\/inputs\.mjs";/,
  );
});

test("DropdownPicker composes Menu and updates value on item click", () => {
  assert.match(inputsSource, /const DropdownPickerCore = \(props, _\) => \{/);
  assert.match(inputsSource, /Show\(pickerState, \(\{ selectedItem, menuItems \}\) =>\s*Menu\(\{/m);
  assert.match(inputsSource, /value\.set\(item\.key\);/);
  assert.match(inputsSource, /target: \{ value: item\.key \}/);
  assert.doesNotMatch(inputsSource, /item\.action\(\)/);
});

test("DropdownPicker trigger renders selected icon and text with blank-state support", () => {
  assert.match(inputsSource, /const selectedItem = \(resolvedItems \?\? \[\]\)\.find\(/);
  assert.match(inputsSource, /selectedItem\?\.icon/);
  assert.match(inputsSource, /selectedItem\.text \?\? selectedItem\.key/);
  assert.match(inputsSource, /minHeight: props\.style\?\.minHeight \?\? "32px"/);
  assert.match(inputsSource, /Icon\(\{ name: "chevron-down", size: 16, color: "secondary" \}\)/);
});

test("DropdownPicker CSS hook exists", () => {
  assert.match(inputCssSource, /\.dropdown-picker-trigger \{/);
  assert.match(inputCssSource, /\.dropdown-picker-selection \{/);
});
