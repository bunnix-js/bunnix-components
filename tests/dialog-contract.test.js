import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const typesSource = readFileSync(
  new URL("../@types/index.d.ts", import.meta.url),
  "utf8",
);

const dialogSource = readFileSync(
  new URL("../src/core/dialog.mjs", import.meta.url),
  "utf8",
);

const dialogCssSource = readFileSync(
  new URL("../src/core/dialog.css", import.meta.url),
  "utf8",
);

test("Dialog type surface exposes shared action config and optional secondary action", () => {
  assert.match(typesSource, /export interface DialogAction \{/);
  assert.match(typesSource, /padding\?: number \| string;/);
  assert.match(typesSource, /width\?: number \| string;/);
  assert.match(typesSource, /height\?: number \| string;/);
  assert.match(typesSource, /secondary\?: DialogAction;/);
  assert.match(typesSource, /confirmation\?: DialogAction;/);
});

test("Dialog state and showDialog store layout props and merge optional secondary button defaults", () => {
  assert.match(dialogSource, /padding: "regular",/);
  assert.match(dialogSource, /width: null,/);
  assert.match(dialogSource, /height: null,/);
  assert.match(dialogSource, /secondary: null,/);
  assert.match(
    dialogSource,
    /const defaultSecondary = \{ text: "Cancel", variant: "secondary", action: null \};/,
  );
  assert.match(
    dialogSource,
    /const mergedSecondary = secondary \? \{ \.\.\.defaultSecondary, \.\.\.secondary \} : null;/,
  );
  assert.match(dialogSource, /padding = "regular",/);
  assert.match(dialogSource, /width = null,/);
  assert.match(dialogSource, /height = null,/);
});

test("Dialog footer renders secondary button before spacer and confirmation button", () => {
  assert.match(
    dialogSource,
    /Row\(\s*\{[\s\S]*?paddingBottom: state\.padding,[\s\S]*?\},\s*\.\.\.\(state\.secondary \? \[[\s\S]*?Button\([\s\S]*?\] : \[\]\),[\s\S]*?Spacer\(\),[\s\S]*?Button\(/m,
  );
});

test("Dialog rendering uses section padding and scrollable contents wrapper", () => {
  assert.match(dialogSource, /gap: 12,/);
  assert.match(dialogSource, /paddingX: state\.padding,/);
  assert.match(dialogSource, /paddingTop: state\.padding,/);
  assert.match(dialogSource, /paddingBottom: state\.padding,/);
  assert.match(dialogSource, /bgColor: "primary",/);
  assert.match(dialogSource, /style: \{\s*\.\.\.\(state\.height \? \{ overflowY: "auto" \} : \{\}\),\s*\},/m);
  assert.match(dialogSource, /flexGrow: state\.height \? 1 : 0,/);
  assert.match(dialogSource, /\.\.\.\(state\.height \? \{ fillHeight: true \} : \{\}\),/);
  assert.match(dialogCssSource, /background-color: var\(--color-bg-primary\);/);
  assert.match(dialogCssSource, /overflow: hidden;/);
});
