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
  assert.match(indexSource, /export \{ TextInput, TextArea, DropdownPicker, Select, CheckBox, Slider \} from "\.\/core\/inputs\.mjs";/);
});

test("TextArea typings are part of the public type surface", () => {
  assert.match(typesSource, /export interface TextAreaProps extends LayoutProps \{/);
  assert.match(typesSource, /minLines\?: number;/);
  assert.match(typesSource, /maxLines\?: number;/);
  assert.match(typesSource, /newlineTrigger\?: "enter" \| "shift-enter" \| "command-enter";/);
  assert.match(typesSource, /export const TextArea: Component<TextAreaProps>;/);
});

test("TextArea implementation includes resize helpers and state binding", () => {
  assert.match(inputsSource, /const TextAreaCore = \(props, _\) => \{/);
  assert.match(inputsSource, /const textAreaRef = useRef\(null\);/);
  assert.match(inputsSource, /const minLines = resolveTextAreaLines\(props\.minLines, 3\);/);
  assert.match(inputsSource, /const maxLines = Math\.max\(minLines, resolveTextAreaLines\(props\.maxLines, 3\)\);/);
  assert.match(inputsSource, /const newlineTrigger = props\.newlineTrigger \?\? "enter";/);
  assert.match(inputsSource, /function shouldInsertTextAreaNewline\(event, newlineTrigger\) \{/);
  assert.match(inputsSource, /if \(newlineTrigger === "shift-enter"\) \{/);
  assert.match(inputsSource, /if \(newlineTrigger === "command-enter"\) \{/);
  assert.match(inputsSource, /if \(e\.key === "Enter" && !shouldInsertTextAreaNewline\(e, newlineTrigger\)\) \{/);
  assert.match(inputsSource, /resizeTextArea\(textAreaRef\.current, minLines, maxLines\);/);
  assert.match(inputsSource, /textarea\(\{/);
});

test("TextArea CSS hook exists", () => {
  assert.match(cssSource, /\.textarea \{/);
  assert.match(cssSource, /resize: none;/);
  assert.match(cssSource, /\.textarea::placeholder \{/);
});
