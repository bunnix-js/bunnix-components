import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  getTextAreaHeightMetrics,
  resolveTextAreaLines,
} from "../src/core/textareaUtils.mjs";

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

test("TextArea line counts normalize and clamp safely", () => {
  assert.equal(resolveTextAreaLines(undefined, 3), 3);
  assert.equal(resolveTextAreaLines("not-a-number", 3), 3);
  assert.equal(resolveTextAreaLines(0, 3), 1);
  assert.equal(resolveTextAreaLines(3.8, 3), 3);
  assert.equal(resolveTextAreaLines(6, 3), 6);
});

test("TextArea height metrics clamp between min and max lines", () => {
  assert.deepEqual(
    getTextAreaHeightMetrics({
      lineHeight: 20,
      scrollHeight: 40,
      minLines: 3,
      maxLines: 6,
      verticalInset: 8,
    }),
    {
      minHeight: 68,
      maxHeight: 128,
      nextHeight: 68,
      shouldScroll: false,
    },
  );

  assert.deepEqual(
    getTextAreaHeightMetrics({
      lineHeight: 20,
      scrollHeight: 200,
      minLines: 3,
      maxLines: 6,
      verticalInset: 8,
    }),
    {
      minHeight: 68,
      maxHeight: 128,
      nextHeight: 128,
      shouldScroll: true,
    },
  );
});

test("TextArea is exported from the package entrypoint", () => {
  assert.match(indexSource, /export \{ TextInput, TextArea, Select, CheckBox, Switch, SegmentedPicker, Slider \} from "\.\/core\/inputs\.mjs";/);
  assert.match(indexSource, /export \{ Picker \} from "\.\/core\/inputs\.mjs";/);
});

test("TextArea typings are part of the public type surface", () => {
  assert.match(
    typesSource,
    /export type Component<P = BaseProps> = \{\s*\(\.\.\.children: BunnixChildren\[\]\): any;\s*\(props: P, \.\.\.children: BunnixChildren\[\]\): any;\s*\};/m,
  );
  assert.match(typesSource, /export interface TextInputProps extends LayoutProps \{/);
  assert.match(typesSource, /focused\?: boolean \| StateLike<boolean>;/);
  assert.match(typesSource, /export interface TextAreaProps extends LayoutProps \{/);
  assert.match(typesSource, /value\?: string \| number \| StateLike<any>;/);
  assert.match(typesSource, /focused\?: boolean \| StateLike<boolean>;/);
  assert.match(typesSource, /minLines\?: number;/);
  assert.match(typesSource, /maxLines\?: number;/);
  assert.doesNotMatch(typesSource, /trigger\?: "enter" \| "shift-enter" \| "command-enter";/);
  assert.match(typesSource, /export const TextArea: Component<TextAreaProps>;/);
});

test("TextArea implementation includes resize helpers and state binding", () => {
  assert.match(inputsSource, /function syncFocusedNode\(node, shouldFocus\) \{/);
  assert.match(inputsSource, /let focusedValue = isStateLike\(props\.focused\) \? props\.focused : null;/);
  assert.match(inputsSource, /let shouldAutoFocus = !focusedValue && !!props\.focused;/);
  assert.match(inputsSource, /let inputRef = useRef\(null\);/);
  assert.match(inputsSource, /autofocus: shouldAutoFocus,/);
  assert.match(inputsSource, /ref: inputRef,/);
  assert.match(inputsSource, /focus: \(\) => \{\s*if \(focusedValue\?\.set\) focusedValue\.set\(true\);\s*\}/m);
  assert.match(inputsSource, /blur: \(\) => \{\s*if \(focusedValue\?\.set\) focusedValue\.set\(false\);\s*\}/m);
  assert.match(inputsSource, /syncFocusedNode\(inputRef\.current, !!isFocused\);/);
  assert.match(inputsSource, /const TextAreaCore = \(props, _\) => \{/);
  assert.match(inputsSource, /const focusedValue = isStateLike\(props\.focused\) \? props\.focused : null;/);
  assert.match(inputsSource, /const shouldAutoFocus = !focusedValue && !!props\.focused;/);
  assert.match(inputsSource, /const textAreaRef = useRef\(null\);/);
  assert.match(inputsSource, /const minLines = resolveTextAreaLines\(props\.minLines, 3\);/);
  assert.match(inputsSource, /const maxLines = Math\.max\(minLines, resolveTextAreaLines\(props\.maxLines, 3\)\);/);
  assert.match(inputsSource, /function shouldInsertTextAreaNewline\(event\) \{/);
  assert.match(inputsSource, /function resolveInputFocusClass\(outline\) \{/);
  assert.match(inputsSource, /return outline \? "focus-border-outline focus-outline-dimmed" : "no-outline";/);
  assert.match(inputsSource, /return !!event\.shiftKey && !event\.metaKey && !event\.ctrlKey && !event\.altKey;/);
  assert.match(inputsSource, /const focusClass = resolveInputFocusClass\(props\.outline\);/);
  assert.match(inputsSource, /if \(e\.key === "Enter" && !shouldInsertTextAreaNewline\(e\)\) \{/);
  assert.match(inputsSource, /e\.target\?\.form\?\.requestSubmit\?\.\(\);/);
  assert.match(inputsSource, /resizeTextArea\(textAreaRef\.current, minLines, maxLines\);/);
  assert.match(inputsSource, /const defaultClass =\s*"padding-sm radius-md flex-grow-1 bg-primary text-default";/);
  assert.match(inputsSource, /class: `textarea \$\{defaultClass\} \$\{focusClass\} \$\{props\.class \|\| ""\}`\.trim\(\),/);
  assert.match(inputsSource, /textarea\(\{/);
  assert.match(inputsSource, /autofocus: shouldAutoFocus,/);
  assert.match(inputsSource, /ref: textAreaRef,/);
  assert.match(inputsSource, /syncFocusedNode\(textAreaRef\.current, !!isFocused\);/);
  assert.match(inputsSource, /\)\(\{ textSize: "1rem", border: "primary", \.\.\.props \}, \.\.\.children\),/);
});

test("TextArea CSS hook exists", () => {
  assert.match(cssSource, /\.textarea \{/);
  assert.match(cssSource, /resize: none;/);
  assert.match(cssSource, /\.textarea::placeholder \{/);
});
