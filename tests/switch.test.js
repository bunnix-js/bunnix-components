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

test("Switch is exported from the package entrypoint", () => {
  assert.match(indexSource, /export \{ TextInput, TextArea, Select, CheckBox, Switch, SegmentedPicker, Slider \} from "\.\/core\/inputs\.mjs";/);
});

test("Switch typings are part of the public type surface", () => {
  assert.match(typesSource, /export interface SwitchProps extends LayoutProps \{/);
  assert.match(typesSource, /checked\?: boolean \| StateLike<boolean>;/);
  assert.match(typesSource, /value\?: boolean \| StateLike<boolean>;/);
  assert.match(typesSource, /export const Switch: Component<SwitchProps>;/);
});

test("Switch implementation resolves boolean state and updates it on change", () => {
  assert.match(inputsSource, /function resolveBooleanState\(propValue\) \{/);
  assert.match(inputsSource, /const SwitchCore = \(props, _\) => \{/);
  assert.match(inputsSource, /let checkedValue = "checked" in props \? props\.checked : props\.value;/);
  assert.match(inputsSource, /let checked = resolveBooleanState\(checkedValue\);/);
  assert.match(inputsSource, /role: "switch",/);
  assert.match(inputsSource, /checked\.set\(!!e\.target\.checked\);/);
  assert.match(inputsSource, /props\.change && props\.change\(e\);/);
  assert.match(inputsSource, /props\.input && props\.input\(e\);/);
  assert.match(inputsSource, /class: `switch \$\{defaultClass\} \$\{outlineClass\} \$\{props\.class \|\| ""\}`\.trim\(\),/);
});

test("Switch CSS hook exists", () => {
  assert.match(cssSource, /\.switch \{/);
  assert.match(cssSource, /\.switch::before \{/);
  assert.match(cssSource, /\.switch:checked \{/);
  assert.match(cssSource, /\.switch:checked::before \{/);
});
