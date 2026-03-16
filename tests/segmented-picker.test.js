import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const indexSource = readFileSync(
  new URL("../src/index.mjs", import.meta.url),
  "utf8",
);

const typesSource = readFileSync(
  new URL("../@types/index.d.ts", import.meta.url),
  "utf8",
);

const inputsSource = readFileSync(
  new URL("../src/core/inputs.mjs", import.meta.url),
  "utf8",
);

const cssSource = readFileSync(
  new URL("../src/core/input.css", import.meta.url),
  "utf8",
);

test("SegmentedPicker is exported from the package entrypoint", () => {
  assert.match(indexSource, /export \{ TextInput, TextArea, Select, CheckBox, Switch, SegmentedPicker, Slider \} from "\.\/core\/inputs\.mjs";/);
});

test("SegmentedPicker typings are part of the public type surface", () => {
  assert.match(typesSource, /export interface SegmentedPickerItem \{/);
  assert.match(typesSource, /key: string;/);
  assert.match(typesSource, /text: string;/);
  assert.match(typesSource, /icon\?: string;/);
  assert.match(typesSource, /export interface SegmentedPickerProps extends LayoutProps \{/);
  assert.match(typesSource, /items\?: SegmentedPickerItem\[] \| StateLike<SegmentedPickerItem\[]>;/);
  assert.match(typesSource, /change\?: \(event\?: any\) => void;/);
  assert.match(typesSource, /export const SegmentedPicker: Component<SegmentedPickerProps>;/);
});

test("SegmentedPicker implementation resolves keyed state and renders optional icons", () => {
  assert.match(inputsSource, /const SegmentedPickerCore = \(props, _\) => \{/);
  assert.match(inputsSource, /props\.value\?\.get && props\.value\?\.set/);
  assert.match(inputsSource, /const itemsValue = resolveCollectionState\(props\.items, \[\]\);/);
  assert.match(inputsSource, /const segmentedPickerState = Compute\(/);
  assert.match(inputsSource, /selected: item\.key === selectedKey,/);
  assert.match(inputsSource, /selectedItem: \(resolvedItems \?\? \[\]\)\.find\(\(item\) => item\.key === selectedKey\) \?\? null,/);
  assert.match(inputsSource, /const segmentedPickerItems = segmentedPickerState\.map\(\(state\) => state\.segments\);/);
  assert.match(inputsSource, /ForEach\(segmentedPickerItems, "key", \(item\) =>/);
  assert.match(inputsSource, /if \(props\.disabled \|\| item\.selected\) return;/);
  assert.match(inputsSource, /value\.set\(item\.key\);/);
  assert.match(inputsSource, /props\.change && props\.change\(eventLike\);/);
  assert.match(inputsSource, /props\.input && props\.input\(eventLike\);/);
  assert.match(inputsSource, /item\.selected \? "segmented-picker-segment-selected" : ""/);
  assert.match(inputsSource, /\.\.\.\(item\.icon \? \[Icon\(\{ name: item\.icon, size: 16 \}\)\] : \[\]\)/);
});

test("SegmentedPicker clears invalid selections when items update", () => {
  assert.match(inputsSource, /useEffect\(\(\{ selectedKey, selectedItem \}\) => \{/);
  assert.match(inputsSource, /if \(!selectedKey \|\| selectedItem\) return;/);
  assert.match(inputsSource, /value\.set\(""\);/);
  assert.match(inputsSource, /item: null,/);
});

test("SegmentedPicker CSS hook exists", () => {
  assert.match(cssSource, /\.segmented-picker \{/);
  assert.match(cssSource, /\.segmented-picker-segment \{/);
  assert.match(cssSource, /\.segmented-picker-segment-selected \{/);
  assert.match(cssSource, /\.segmented-picker-disabled \{/);
});
