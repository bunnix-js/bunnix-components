import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(
  new URL("../playgrounds/src/app.mjs", import.meta.url),
  "utf8",
);

const layoutPageSource = readFileSync(
  new URL("../playgrounds/src/pages/Layout.mjs", import.meta.url),
  "utf8",
);

const typographyPageSource = readFileSync(
  new URL("../playgrounds/src/pages/Typography.mjs", import.meta.url),
  "utf8",
);

const buttonsPageSource = readFileSync(
  new URL("../playgrounds/src/pages/Buttons.mjs", import.meta.url),
  "utf8",
);

const mediaPageSource = readFileSync(
  new URL("../playgrounds/src/pages/Media.mjs", import.meta.url),
  "utf8",
);

const inputsPageSource = readFileSync(
  new URL("../playgrounds/src/pages/inputs.mjs", import.meta.url),
  "utf8",
);

const menuPageSource = readFileSync(
  new URL("../playgrounds/src/pages/menu.mjs", import.meta.url),
  "utf8",
);

test("Playground sidebar groups multi-component pages into nested items", () => {
  assert.match(appSource, /key: "layout",\s*text: "Layout",[\s\S]*children: \[[\s\S]*key: "column", text: "Column"[\s\S]*key: "row", text: "Row"[\s\S]*key: "spacer", text: "Spacer"[\s\S]*key: "alignment", text: "Alignment"[\s\S]*\]/m);
  assert.match(appSource, /key: "typography",\s*text: "Typography",[\s\S]*children: \[[\s\S]*key: "heading", text: "Heading"[\s\S]*key: "text", text: "Text"[\s\S]*\]/m);
  assert.match(appSource, /key: "buttons",\s*text: "Buttons",[\s\S]*children: \[[\s\S]*key: "button", text: "Button"[\s\S]*key: "link-button", text: "LinkButton"[\s\S]*\]/m);
  assert.match(appSource, /key: "media",\s*text: "Media",[\s\S]*children: \[[\s\S]*key: "media-display", text: "Media"[\s\S]*key: "icon", text: "Icon"[\s\S]*key: "spinner", text: "Spinner"[\s\S]*key: "avatar", text: "Avatar"[\s\S]*\]/m);
  assert.match(appSource, /key: "inputs",\s*text: "Inputs",[\s\S]*children: \[[\s\S]*key: "text-input", text: "TextInput"[\s\S]*key: "text-area", text: "TextArea"[\s\S]*key: "select", text: "Select"[\s\S]*key: "checkbox", text: "CheckBox"[\s\S]*key: "switch", text: "Switch"[\s\S]*key: "segmented-picker", text: "SegmentedPicker"[\s\S]*key: "slider", text: "Slider"[\s\S]*\]/m);
  assert.match(appSource, /key: "menus",\s*text: "Menus",[\s\S]*children: \[[\s\S]*key: "menu", text: "Menu"[\s\S]*key: "picker", text: "Picker"[\s\S]*\]/m);
  assert.doesNotMatch(appSource, /expanded: true/);
});

test("Playground app preserves displayed content when a non-page parent item is selected", () => {
  assert.match(appSource, /const displayedPageKey = useState\("house"\);/);
  assert.match(appSource, /if \(contentPageKeys\.has\(selectedKey\)\) displayedPageKey\.set\(selectedKey\);/);
  assert.doesNotMatch(appSource, /"layout",\s*"grid"/);
  assert.doesNotMatch(appSource, /"typography",\s*"icon-registry"/);
  assert.doesNotMatch(appSource, /"buttons",\s*"sidebar"/);
  assert.doesNotMatch(appSource, /"media",\s*"text-input"/);
  assert.doesNotMatch(appSource, /"inputs",\s*"table"/);
  assert.doesNotMatch(appSource, /"menus",\s*"outline"/);
  assert.doesNotMatch(appSource, /if \(item === "layout"\)/);
  assert.doesNotMatch(appSource, /if \(item === "typography"\)/);
  assert.doesNotMatch(appSource, /if \(item === "buttons"\)/);
  assert.doesNotMatch(appSource, /if \(item === "media"\)/);
  assert.doesNotMatch(appSource, /if \(item === "inputs"\)/);
  assert.doesNotMatch(appSource, /if \(item === "menus"\)/);
});

test("Playground app routes every nested child key to its dedicated page builder", () => {
  assert.match(appSource, /if \(item === "column"\) return ColumnPage\(\);/);
  assert.match(appSource, /if \(item === "row"\) return RowPage\(\);/);
  assert.match(appSource, /if \(item === "spacer"\) return SpacerPage\(\);/);
  assert.match(appSource, /if \(item === "alignment"\) return AlignmentPage\(\);/);
  assert.match(appSource, /if \(item === "heading"\) return HeadingPage\(\);/);
  assert.match(appSource, /if \(item === "text"\) return TextPage\(\);/);
  assert.match(appSource, /if \(item === "button"\) return ButtonPage\(\);/);
  assert.match(appSource, /if \(item === "link-button"\) return LinkButtonPage\(\);/);
  assert.match(appSource, /if \(item === "media-display"\) return MediaPage\(\);/);
  assert.match(appSource, /if \(item === "icon"\) return IconPage\(\);/);
  assert.match(appSource, /if \(item === "spinner"\) return SpinnerPage\(\);/);
  assert.match(appSource, /if \(item === "avatar"\) return AvatarPage\(\);/);
  assert.match(appSource, /if \(item === "text-input"\) return TextInputPage\(\);/);
  assert.match(appSource, /if \(item === "text-area"\) return TextAreaPage\(\);/);
  assert.match(appSource, /if \(item === "select"\) return SelectPage\(\);/);
  assert.match(appSource, /if \(item === "checkbox"\) return CheckBoxPage\(\);/);
  assert.match(appSource, /if \(item === "switch"\) return SwitchPage\(\);/);
  assert.match(appSource, /if \(item === "segmented-picker"\) return SegmentedPickerPage\(\);/);
  assert.match(appSource, /if \(item === "slider"\) return SliderPage\(\);/);
  assert.match(appSource, /if \(item === "menu"\) return MenuPage\(\);/);
  assert.match(appSource, /if \(item === "picker"\) return PickerPage\(\);/);
});

test("Split playground page files export the expected child page builders", () => {
  assert.match(layoutPageSource, /export function ColumnPage\(\) \{/);
  assert.match(layoutPageSource, /export function RowPage\(\) \{/);
  assert.match(layoutPageSource, /export function SpacerPage\(\) \{/);
  assert.match(layoutPageSource, /export function AlignmentPage\(\) \{/);

  assert.match(typographyPageSource, /export function HeadingPage\(\) \{/);
  assert.match(typographyPageSource, /export function TextPage\(\) \{/);

  assert.match(buttonsPageSource, /export function ButtonPage\(\) \{/);
  assert.match(buttonsPageSource, /export function LinkButtonPage\(\) \{/);

  assert.match(mediaPageSource, /export function MediaPage\(\) \{/);
  assert.match(mediaPageSource, /export function IconPage\(\) \{/);
  assert.match(mediaPageSource, /export function SpinnerPage\(\) \{/);
  assert.match(mediaPageSource, /export function AvatarPage\(\) \{/);

  assert.match(inputsPageSource, /export function TextInputPage\(\) \{/);
  assert.match(inputsPageSource, /export function TextAreaPage\(\) \{/);
  assert.match(inputsPageSource, /export function SelectPage\(\) \{/);
  assert.match(inputsPageSource, /export function CheckBoxPage\(\) \{/);
  assert.match(inputsPageSource, /export function SwitchPage\(\) \{/);
  assert.match(inputsPageSource, /export function SegmentedPickerPage\(\) \{/);
  assert.match(inputsPageSource, /export function SliderPage\(\) \{/);

  assert.match(menuPageSource, /export function MenuPage\(\) \{/);
  assert.match(menuPageSource, /export function PickerPage\(\) \{/);
});
