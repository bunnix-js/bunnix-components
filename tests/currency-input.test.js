import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  formatCurrency,
  getFractionDigits,
  isIncompleteDecimal,
  parseCurrency,
  resolveCurrency,
  resolveLocale,
  toEditableString,
} from "../src/core/currencyUtils.mjs";

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

test("CurrencyInput formats pt-BR/BRL and en-US/USD round-trips", () => {
  const brl = formatCurrency(404.25, { locale: "pt-BR", currency: "BRL" });
  assert.match(brl, /404,25/);
  assert.match(brl, /R\$/);

  const usd = formatCurrency(1404.25, { locale: "en-US", currency: "USD" });
  assert.match(usd, /1,404\.25/);
  assert.match(usd, /\$/);

  assert.equal(parseCurrency("404,25", { locale: "pt-BR" }).value, 404.25);
  assert.equal(parseCurrency("1.404,25", { locale: "pt-BR" }).value, 1404.25);
  assert.equal(parseCurrency("1,404.25", { locale: "en-US" }).value, 1404.25);
});

test("CurrencyInput editable string omits currency symbol and groups", () => {
  const brlEditable = toEditableString(1404.25, { locale: "pt-BR", currency: "BRL" });
  assert.equal(brlEditable, "1404,25");
  assert.doesNotMatch(brlEditable, /R\$/);

  const usdEditable = toEditableString(1404.25, { locale: "en-US", currency: "USD" });
  assert.equal(usdEditable, "1404.25");
  assert.doesNotMatch(usdEditable, /\$/);
});

test("CurrencyInput parses cross-locale separators with last occurrence winning", () => {
  assert.equal(parseCurrency("1,404.25", { locale: "pt-BR" }).value, 1404.25);
  assert.equal(parseCurrency("1.404,25", { locale: "en-US" }).value, 1404.25);
  assert.equal(parseCurrency("R$ 1.404,25", { locale: "en-US" }).value, 1404.25);
  assert.equal(parseCurrency("$1,404.25", { locale: "pt-BR" }).value, 1404.25);
});

test("CurrencyInput keeps incomplete decimals unemitted and maps empty to null", () => {
  assert.equal(isIncompleteDecimal("404,", { locale: "pt-BR" }), true);
  assert.equal(isIncompleteDecimal("404.", { locale: "en-US" }), true);
  assert.equal(isIncompleteDecimal("404,0", { locale: "pt-BR" }), true);
  assert.equal(isIncompleteDecimal("404.25", { locale: "en-US" }), false);

  assert.deepEqual(parseCurrency("", { locale: "en-US" }), { value: null, valid: true });
  assert.deepEqual(parseCurrency("   ", { locale: "pt-BR" }), { value: null, valid: true });
  assert.equal(parseCurrency("abc", { locale: "en-US" }).valid, false);
});

test("CurrencyInput resolves JPY zero digits and USD fallback", () => {
  assert.equal(getFractionDigits("JPY", "en-US"), 0);
  assert.equal(getFractionDigits("USD", "en-US"), 2);
  assert.equal(getFractionDigits("BRL", "pt-BR"), 2);
  assert.equal(resolveCurrency(undefined, "en-US"), "USD");
  assert.equal(resolveCurrency("brl", "pt-BR"), "BRL");
  assert.ok(typeof resolveLocale("pt-BR") === "string");
});

test("CurrencyInput is exported from the package entrypoint", () => {
  assert.match(indexSource, /export \{ TextInput, TextArea, Select, CheckBox, Switch, SegmentedPicker, Slider, CurrencyInput \} from "\.\/core\/inputs\.mjs";/);
});

test("CurrencyInput typings are part of the public type surface", () => {
  assert.match(typesSource, /export interface CurrencyInputProps extends LayoutProps \{/);
  assert.match(typesSource, /value\?: number \| null \| StateLike<number \| null>;/);
  assert.match(typesSource, /currency\?: string;/);
  assert.match(typesSource, /locale\?: string;/);
  assert.match(typesSource, /export const CurrencyInput: Component<CurrencyInputProps>;/);
});

test("CurrencyInput implementation syncs state and normalizes paste", () => {
  assert.match(inputsSource, /const CurrencyInputCore = \(props, _\) => \{/);
  assert.match(inputsSource, /const valueState = isStateLike\(props\.value\)/);
  assert.match(inputsSource, /const display = useState\(""\);/);
  assert.match(inputsSource, /inputmode: "decimal",/);
  assert.match(inputsSource, /autocomplete: "off",/);
  assert.match(inputsSource, /parseCurrency\(raw, readOptions\(\)\)/);
  assert.match(inputsSource, /toEditableString\(val/);
  assert.match(inputsSource, /formatCurrency\(val, readOptions\(\)\)/);
  assert.match(inputsSource, /paste: \(e\) => \{/);
  assert.match(inputsSource, /clipboardData\?\.getData\?\.\("text"\)/);
  assert.match(inputsSource, /export const CurrencyInput = withNormalizedArgs\(\(props/);
});
