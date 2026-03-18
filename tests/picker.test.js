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
  assert.match(typesSource, /key\?: string;/);
  assert.match(typesSource, /divider\?: boolean;/);
  assert.match(typesSource, /export interface PickerProps extends LayoutProps \{/);
  assert.match(typesSource, /options\?: MenuItem\[] \| StateLike<MenuItem\[]>;/);
  assert.match(typesSource, /outline\?: boolean;/);
  assert.match(typesSource, /disabled\?: boolean \| StateLike<boolean>;/);
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
  assert.match(inputsSource, /const optionsValue = resolveCollectionState\(props\.options \?\? props\.items, \[\]\);/);
  assert.match(inputsSource, /const focusClass = resolveInputFocusClass\(props\.outline\);/);
  assert.match(inputsSource, /div\(\s*\{\},\s*Show\(pickerState, \(\{ displayItem, menuOptions, isDisabled \}\) =>\s*withExtractedStyles\(\(finalTriggerProps\) =>\s*Menu\(\{/m);
  assert.match(inputsSource, /value\.set\(option\.key\);/);
  assert.match(inputsSource, /target: \{ value: option\.key \}/);
  assert.doesNotMatch(inputsSource, /item\.action\(\)/);
  assert.doesNotMatch(inputsSource, /DropdownPicker/);
});

test("Picker trigger renders selected icon and text with blank-state support", () => {
  assert.match(inputsSource, /const disabledValue = resolveBooleanState\(props\.disabled\);/);
  assert.match(inputsSource, /const triggerProps = \{ \.\.\.props \};/);
  assert.match(inputsSource, /delete triggerProps\.options;/);
  assert.match(inputsSource, /delete triggerProps\.items;/);
  assert.match(inputsSource, /withExtractedStyles\(\(finalTriggerProps\) =>/);
  assert.match(inputsSource, /\)\(\{ minHeight: 32, textSize: "1rem", \.\.\.triggerProps \}\),/);
  assert.match(inputsSource, /class: `picker-trigger \$\{defaultClass\} \$\{focusClass\} \$\{/);
  assert.match(inputsSource, /const selectedItem = \(resolvedOptions \?\? \[\]\)\.find\(/);
  assert.match(inputsSource, /const firstSelectableOption = \(resolvedOptions \?\? \[\]\)\.find\(/);
  assert.match(inputsSource, /displayItem: selectedItem \?\? firstSelectableOption \?\? null,/);
  assert.match(inputsSource, /const pickerState = Compute\(\[value, optionsValue, disabledValue\],/);
  assert.match(inputsSource, /useEffect\(\(\{ selectedItem, firstSelectableOption \}\) => \{/);
  assert.match(inputsSource, /if \(selectedItem\) return;/);
  assert.match(inputsSource, /if \(!firstSelectableOption\) \{/);
  assert.match(inputsSource, /value\.set\(firstSelectableOption\.key\);/);
  assert.match(inputsSource, /target: \{ value: firstSelectableOption\.key \},/);
  assert.match(inputsSource, /option: firstSelectableOption,/);
  assert.match(inputsSource, /option: null,/);
  assert.match(inputsSource, /disabled: disabledValue,/);
  assert.match(inputsSource, /click: \(\) => \{\s*if \(isDisabled\) return;\s*toggle\(\);\s*\}/m);
  assert.match(inputsSource, /isDisabled \? "picker-trigger-disabled" : ""/);
  assert.match(inputsSource, /const triggerColor = finalTriggerProps\.style\?\.color;/);
  assert.match(inputsSource, /displayItem\?\.icon/);
  assert.match(inputsSource, /triggerColor \? \{ color: triggerColor \} : \{\}/);
  assert.match(inputsSource, /Text\(\s*\{\s*weight: "heavy",\s*\.\.\.\(triggerColor \? \{ color: triggerColor \} : \{\}\),/m);
  assert.match(inputsSource, /displayItem\.text \?\? displayItem\.key/);
  assert.match(inputsSource, /name: "chevron_down"/);
  assert.match(inputsSource, /\.\.\.\(triggerColor \? \{ color: triggerColor \} : \{ color: "secondary" \}\)/);
});

test("Picker CSS hook exists", () => {
  assert.match(inputCssSource, /\.picker-trigger \{/);
  assert.match(inputCssSource, /\.picker-selection \{/);
  assert.doesNotMatch(inputCssSource, /dropdown-picker/);
});
