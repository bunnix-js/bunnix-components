import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  findNearestSliderStepIndex,
  getSliderStepValue,
  hasSliderStepLabels,
  isValidSliderSteps,
  toSliderNumber,
} from "../src/core/sliderUtils.mjs";

const indexSource = readFileSync(
  new URL("../src/index.mjs", import.meta.url),
  "utf8",
);

const typesSource = readFileSync(
  new URL("../@types/index.d.ts", import.meta.url),
  "utf8",
);

const cssSource = readFileSync(
  new URL("../src/core/input.css", import.meta.url),
  "utf8",
);

test("Slider step configs require ascending unique numeric values", () => {
  assert.equal(
    isValidSliderSteps([
      { value: 10, label: "10K" },
      { value: 100, label: "100K" },
      { value: 1000, label: "1000K" },
    ]),
    true,
  );
  assert.equal(
    isValidSliderSteps([
      { value: 10 },
      { value: 10 },
    ]),
    false,
  );
  assert.equal(isValidSliderSteps([{ value: 10 }]), false);
});

test("Slider snaps non-exact values to the nearest configured custom step", () => {
  const steps = [
    { value: 10, label: "10K" },
    { value: 100, label: "100K" },
    { value: 1000, label: "1000K" },
  ];

  assert.equal(findNearestSliderStepIndex(steps, 15), 0);
  assert.equal(findNearestSliderStepIndex(steps, 140), 1);
  assert.equal(findNearestSliderStepIndex(steps, 990), 2);
});

test("Slider maps between evenly spaced indexes and real step values", () => {
  const steps = [
    { value: 10, label: "10K" },
    { value: 100, label: "100K" },
    { value: 1000, label: "1000K" },
  ];

  assert.equal(getSliderStepValue(steps, 0), 10);
  assert.equal(getSliderStepValue(steps, 1), 100);
  assert.equal(getSliderStepValue(steps, 2), 1000);
  assert.equal(getSliderStepValue(steps, 99), 1000);
});

test("Slider numeric coercion falls back safely for invalid native values", () => {
  assert.equal(toSliderNumber("42", 0), 42);
  assert.equal(toSliderNumber(undefined, 12), 12);
  assert.equal(toSliderNumber("not-a-number", 7), 7);
});

test("Slider detects whether any custom step labels should be rendered", () => {
  assert.equal(hasSliderStepLabels([{ value: 10 }, { value: 100 }]), false);
  assert.equal(
    hasSliderStepLabels([{ value: 10 }, { value: 100, label: "100K" }]),
    true,
  );
});

test("Slider is exported from the package entrypoint", () => {
  assert.match(indexSource, /export \{ TextInput, TextArea, Select, CheckBox, Switch, SegmentedPicker, Slider \} from "\.\/core\/inputs\.mjs";/);
  assert.match(indexSource, /export \{ Picker \} from "\.\/core\/inputs\.mjs";/);
});

test("Slider typings are part of the public type surface", () => {
  assert.match(typesSource, /export interface SliderProps extends LayoutProps \{/);
  assert.match(typesSource, /steps\?: SliderStep\[] \| StateLike<SliderStep\[]>;/);
  assert.match(typesSource, /export const Slider: Component<SliderProps>;/);
});

test("Slider reacts to stateful step collections and resets invalid values", () => {
  const inputsSource = readFileSync(
    new URL("../src/core/inputs.mjs", import.meta.url),
    "utf8",
  );

  assert.match(inputsSource, /const stepsValue = resolveCollectionState\(props\.steps, \[\]\);/);
  assert.match(inputsSource, /const customStepsState = Compute\(stepsValue, \(steps\) =>/);
  assert.match(inputsSource, /const nextStep = customSteps\.find\(\(step\) => step\.value === currentValue\) \?\? customSteps\[0\];/);
  assert.match(inputsSource, /valueState\.set\(nextStep\.value\);/);
  assert.match(inputsSource, /props\.input &&\s*props\.input\(\{\s*target: \{ value: nextStep\.value \},/m);
});

test("Slider CSS hooks exist for the range input and step labels", () => {
  assert.match(cssSource, /\.slider \{/);
  assert.match(cssSource, /\.slider-step-labels \{/);
  assert.match(cssSource, /\.slider-step-label \{/);
});
