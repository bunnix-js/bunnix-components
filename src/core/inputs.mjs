/**
 * Input Components (Next-Gen Core)
 *
 * Simplified input primitives with reactive state binding and inline style extraction.
 *
 * Components:
 * - TextInput: Single-line text input with optional placeholder and state binding
 * - Picker: Menu-backed selection input with a selector-style trigger
 * - SegmentedPicker: iOS-style segmented selection control with optional icons
 * - Select: Dropdown input with mapped options
 * - CheckBox: Simple checkbox input with optional state binding
 * - Switch: OS-style boolean toggle with optional state binding
 *
 * Features:
 * - Two-way binding with useState objects
 * - Automatic style extraction (width, height, gap, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - Outline focus states via core.css utilities
 */
import Bunnix, { Compute, useState, useEffect, useRef, ForEach, Show } from "@bunnix/core";
import {
  withNormalizedArgs,
  withExtractedStyles,
  isStateLike,
  resolveCollectionState,
} from "./utils.mjs";
import { Column, Row, Spacer } from "./layout.mjs";
import { Heading, Text } from "./typography.mjs";
import { Icon } from "./media.mjs";
import { Menu } from "./menu.mjs";
import {
  findNearestSliderStepIndex,
  getSliderStepValue,
  hasSliderStepLabels,
  isValidSliderSteps,
  toSliderNumber,
} from "./sliderUtils.mjs";
import {
  getTextAreaHeightMetrics,
  resolveTextAreaLines,
} from "./textareaUtils.mjs";
import "./input.css";

const { input, textarea, select, option, div, button } = Bunnix;

/**
 * Wraps a component in a Column with a Heading label if props.label exists.
 * Mutates props by deleting the label property.
 *
 * @param {Object} props - Props object, may contain a label property
 * @param {*} component - The component to potentially wrap
 * @returns {*} Column with label and component, or just the component
 */
function wrapIntoLabel(props, component) {
  if (props.label) {
    let label = props.label;
    delete props.label;

    return Column(
      Heading({ h4: true, color: "secondary", weight: "heavy" }, label),
      component,
    );
  }
  return component;
}

/**
 * Wraps checkbox in a Row with label text when props.label exists.
 * Mutates props by deleting the label property.
 *
 * @param {Object} props - Props object, may contain a label property
 * @param {*} component - Checkbox component
 * @returns {*} Row with checkbox then label, or just the component
 */
function wrapCheckBoxIntoLabel(props, component) {
  if (props.label) {
    let label = props.label;
    delete props.label;

    return Row(
      component,
      Heading({ h4: true, color: "secondary", weight: "heavy" }, label),
    );
  }
  return component;
}

function resolveNumericState(propValue, fallback) {
  return isStateLike(propValue)
    ? propValue
    : useState(toSliderNumber(propValue, fallback));
}

function resolveBooleanState(propValue) {
  return isStateLike(propValue)
    ? propValue
    : useState(!!propValue);
}

function resolveInputFocusClass(outline) {
  return outline ? "focus-border-outline focus-outline-dimmed" : "no-outline";
}

function syncFocusedNode(node, shouldFocus) {
  if (!node || typeof node.focus !== "function" || typeof node.blur !== "function") return;
  if (shouldFocus) {
    if (typeof document === "undefined" || document.activeElement !== node) {
      node.focus();
    }
    return;
  }

  if (typeof document === "undefined" || document.activeElement === node) {
    node.blur();
  }
}

function getLineHeightPx(node) {
  if (!node || typeof window === "undefined") return 20;

  const computed = window.getComputedStyle(node);
  const lineHeight = Number.parseFloat(computed.lineHeight);

  if (Number.isFinite(lineHeight)) return lineHeight;

  const fontSize = Number.parseFloat(computed.fontSize);
  if (Number.isFinite(fontSize)) return fontSize * 1.5;

  return 20;
}

function getTextAreaVerticalInset(node) {
  if (!node || typeof window === "undefined") return 0;

  const computed = window.getComputedStyle(node);
  const values = [
    computed.paddingTop,
    computed.paddingBottom,
    computed.borderTopWidth,
    computed.borderBottomWidth,
  ];

  return values.reduce((total, value) => {
    const nextValue = Number.parseFloat(value);
    return total + (Number.isFinite(nextValue) ? nextValue : 0);
  }, 0);
}

function resizeTextArea(node, minLines, maxLines) {
  if (!node) return;

  const metrics = getTextAreaHeightMetrics({
    lineHeight: getLineHeightPx(node),
    scrollHeight: node.scrollHeight,
    minLines,
    maxLines,
    verticalInset: getTextAreaVerticalInset(node),
  });

  node.style.height = "auto";
  node.style.height = `${metrics.nextHeight}px`;
  node.style.overflowY = metrics.shouldScroll ? "auto" : "hidden";
}

function shouldInsertTextAreaNewline(event) {
  if (event.key !== "Enter" || event.isComposing) return true;
  return !!event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey;
}

/** Text Input core component and logic */
const TextInputCore = (props, _) => {
  let value =
    props.value?.get && props.value?.set
      ? props.value
      : useState(props.value ?? "");
  let focusedValue = isStateLike(props.focused) ? props.focused : null;
  let shouldAutoFocus = !focusedValue && !!props.focused;
  let inputRef = useRef(null);
  let placeholder = props.placeholder ?? "";
  let focusClass = resolveInputFocusClass(props.outline);
  let defaultClass =
    "padding-sm border-primary radius-md flex-grow-1 bg-primary text-default";

  delete props.outline;
  delete props.focused;

  let rawValue = useState("");

  useEffect((val) => {
    if (props.type === "date" && val instanceof Date) {
      rawValue.set(val.toISOString().substring(0, 10));
    } else {
      rawValue.set(val);
    }
  }, value);

  if (focusedValue) {
    useEffect((isFocused) => {
      syncFocusedNode(inputRef.current, !!isFocused);
    }, focusedValue);
  }

  const convertRawValue = (val) => {
    rawValue.set(val);
    let prevVal = value.get();

    if (props.type === "date" && prevVal instanceof Date) {
      let dateParts = val.split("-");
      value.set(
        new Date(
          Number(dateParts[0]),
          Number(dateParts[1] - 1),
          Number(dateParts[2]),
        ),
      );
    } else {
      value.set(val);
    }
  };

  return wrapIntoLabel(
    props,
    input({
      ...props,
      ref: inputRef,
      autofocus: shouldAutoFocus,
      value: rawValue,
      disabled: props.disabled,
      focus: () => {
        if (focusedValue?.set) focusedValue.set(true);
      },
      blur: () => {
        if (focusedValue?.set) focusedValue.set(false);
      },
      input: (e) => {
        convertRawValue(e.target.value ?? "");
        // value.set(e.target.value ?? "");
        props.input && props.input(e);
      },
      placeholder: placeholder,
      class: `${defaultClass} ${focusClass} ${props.class || ""}`,
    }),
  );
};

const TextAreaCore = (props, _) => {
  const value =
    props.value?.get && props.value?.set
      ? props.value
      : useState(props.value ?? "");
  const focusedValue = isStateLike(props.focused) ? props.focused : null;
  const shouldAutoFocus = !focusedValue && !!props.focused;
  const rawValue = useState(value.get?.() ?? props.value ?? "");
  const textAreaRef = useRef(null);
  const minLines = resolveTextAreaLines(props.minLines, 3);
  const maxLines = Math.max(minLines, resolveTextAreaLines(props.maxLines, 3));
  const placeholder = props.placeholder ?? "";
  const focusClass = resolveInputFocusClass(props.outline);
  const defaultClass =
    "padding-sm radius-md flex-grow-1 bg-primary text-default";

  delete props.outline;
  delete props.focused;
  delete props.minLines;
  delete props.maxLines;

  useEffect((nextValue) => {
    rawValue.set(nextValue ?? "");
    resizeTextArea(textAreaRef.current, minLines, maxLines);
  }, value);

  useEffect(() => {
    resizeTextArea(textAreaRef.current, minLines, maxLines);
  }, []);

  if (focusedValue) {
    useEffect((isFocused) => {
      syncFocusedNode(textAreaRef.current, !!isFocused);
    }, focusedValue);
  }

  return wrapIntoLabel(
    props,
    textarea({
      ...props,
      ref: textAreaRef,
      autofocus: shouldAutoFocus,
      rows: minLines,
      value: rawValue,
      disabled: props.disabled,
      placeholder,
      class: `textarea ${defaultClass} ${focusClass} ${props.class || ""}`.trim(),
      focus: () => {
        if (focusedValue?.set) focusedValue.set(true);
      },
      blur: () => {
        if (focusedValue?.set) focusedValue.set(false);
      },
      keydown: (e) => {
        if (e.key === "Enter" && !shouldInsertTextAreaNewline(e)) {
          e.preventDefault();
          e.target?.form?.requestSubmit?.();
        }

        props.keydown && props.keydown(e);
      },
      input: (e) => {
        const nextValue = e.target.value ?? "";
        rawValue.set(nextValue);
        value.set(nextValue);
        resizeTextArea(e.target, minLines, maxLines);
        props.input && props.input(e);
      },
    }),
  );
};

const PickerCore = (props, _) => {
  const value =
    props.value?.get && props.value?.set
      ? props.value
      : useState(props.value ?? "");
  const optionsValue = resolveCollectionState(props.options ?? props.items, []);
  const disabledValue = resolveBooleanState(props.disabled);
  const labelProps = props.label ? { label: props.label } : {};
  const anchor = props.anchor;
  const focusClass = resolveInputFocusClass(props.outline);
  const defaultClass =
    "padding-sm border-primary radius-md flex-grow-1 bg-primary text-default";
  const pickerState = Compute([value, optionsValue, disabledValue], (selectedKey, resolvedOptions, isDisabled) => {
    const firstSelectableOption = (resolvedOptions ?? []).find(
      (option) => !option.divider && option.key !== undefined && option.key !== null,
    );
    const selectedItem = (resolvedOptions ?? []).find(
      (option) => !option.divider && option.key === selectedKey,
    );

    const menuOptions = (resolvedOptions ?? []).map((option) => {
      if (option.divider) return option;

      return {
        ...option,
        action: () => {
          value.set(option.key);
          props.input &&
            props.input({
              target: { value: option.key },
              currentTarget: { value: option.key },
              option,
            });
        },
      };
    });

    return { selectedItem, firstSelectableOption, menuOptions, isDisabled: !!isDisabled };
  });

  useEffect(({ selectedItem, firstSelectableOption }) => {
    const selectedKey = value.get();
    if (selectedKey && selectedItem) return;
    if (!firstSelectableOption) {
      value.set("");
      props.input &&
        props.input({
          target: { value: "" },
          currentTarget: { value: "" },
          option: null,
        });
      return;
    }

    value.set(firstSelectableOption.key);
    props.input &&
      props.input({
        target: { value: firstSelectableOption.key },
        currentTarget: { value: firstSelectableOption.key },
        option: firstSelectableOption,
      });
  }, pickerState);

  const triggerProps = { ...props };
  delete triggerProps.value;
  delete triggerProps.options;
  delete triggerProps.items;
  delete triggerProps.label;
  delete triggerProps.input;
  delete triggerProps.anchor;
  delete triggerProps.disabled;
  delete triggerProps.outline;

  return wrapIntoLabel(
    labelProps,
    div(
      {},
      Show(pickerState, ({ selectedItem, menuOptions, isDisabled }) =>
        withExtractedStyles((finalTriggerProps) =>
          Menu({
            ...(anchor ? { anchor } : {}),
            items: menuOptions,
            trigger: ({ toggle }) => {
              const triggerColor = finalTriggerProps.style?.color;

              return button(
                {
                  ...finalTriggerProps,
                  type: "button",
                  disabled: disabledValue,
                  click: () => {
                    if (isDisabled) return;
                    toggle();
                  },
                  class: `picker-trigger ${defaultClass} ${focusClass} ${
                    isDisabled ? "picker-trigger-disabled" : ""
                  } ${finalTriggerProps.class || ""}`.trim(),
                },
                Row(
                  { fillWidth: true, alignItems: "center", gap: "small" },
                  div(
                    { class: "picker-selection" },
                    ...(selectedItem?.icon
                      ? [
                          Icon({
                            name: selectedItem.icon,
                            size: 16,
                            ...(triggerColor ? { color: triggerColor } : {}),
                          }),
                        ]
                      : []),
                    ...(selectedItem
                      ? [
                          Text(
                            {
                              weight: "heavy",
                              ...(triggerColor ? { color: triggerColor } : {}),
                            },
                            selectedItem.text ?? selectedItem.key,
                          ),
                        ]
                      : []),
                  ),
                  Spacer(),
                  Icon({
                    name: "chevron_down",
                    size: 16,
                    ...(triggerColor ? { color: triggerColor } : { color: "secondary" }),
                  }),
                ),
              );
            },
          })
        )({ minHeight: 32, textSize: "1rem", ...triggerProps }),
      ),
    ),
  );
};

const SegmentedPickerCore = (props, _) => {
  const value =
    props.value?.get && props.value?.set
      ? props.value
      : useState(props.value ?? "");
  const itemsValue = resolveCollectionState(props.items, []);
  const focusClass = resolveInputFocusClass(props.outline);
  const segmentedPickerState = Compute(
    [value, itemsValue],
    (selectedKey, resolvedItems) =>
      ({
        selectedKey,
        selectedItem: (resolvedItems ?? []).find((item) => item.key === selectedKey) ?? null,
        segments: (resolvedItems ?? []).map((item) => ({
          ...item,
          selected: item.key === selectedKey,
        })),
      }),
  );
  const segmentedPickerItems = segmentedPickerState.map((state) => state.segments);

  useEffect(({ selectedKey, selectedItem }) => {
    if (!selectedKey || selectedItem) return;

    value.set("");

    const eventLike = {
      target: { value: "" },
      currentTarget: { value: "" },
      item: null,
    };

    props.change && props.change(eventLike);
    props.input && props.input(eventLike);
  }, segmentedPickerState);

  delete props.outline;
  delete props.items;

  return wrapIntoLabel(
    props,
    div(
      {
        class: `segmented-picker border-primary bg-primary-dimmed radius-lg ${
          props.disabled ? "segmented-picker-disabled" : ""
        } ${focusClass} ${props.class || ""}`.trim(),
      },
      ForEach(segmentedPickerItems, "key", (item) =>
        button(
          {
            type: "button",
            disabled: !!props.disabled,
            click: () => {
              if (props.disabled || item.selected) return;

              value.set(item.key);

              const eventLike = {
                target: { value: item.key },
                currentTarget: { value: item.key },
                item,
              };

              props.change && props.change(eventLike);
              props.input && props.input(eventLike);
            },
            class: `segmented-picker-segment ${
              item.selected ? "segmented-picker-segment-selected" : ""
            }`,
          },
          Row(
            {
              class: "segmented-picker-segment-content",
              alignItems: "center",
              justifyContent: "center",
              gap: item.icon ? "small" : 0,
              width: "100%",
            },
            ...(item.icon ? [Icon({ name: item.icon, size: 16 })] : []),
            Text({ weight: "heavy" }, item.text),
          ),
        ),
      ),
    ),
  );
};

/** Select core component and logic */
const SelectCore = (props, _) => {
  let value =
    props.value?.get && props.value?.set
      ? props.value
      : useState(props.value ?? "");
  let optionsValue = resolveCollectionState(props.options, []);
  let focusClass = resolveInputFocusClass(props.outline);
  const selectedOptionState = Compute([value, optionsValue], (selectedKey, resolvedOptions) => {
    const options = resolvedOptions ?? [];
    const selectedOption = options.find((option) => option.key === selectedKey);
    return { selectedKey, selectedOption };
  });

  useEffect(({ selectedKey, selectedOption }) => {
    if (!selectedKey || selectedOption) return;

    value.set("");
    props.input &&
      props.input({
        target: { value: "" },
        currentTarget: { value: "" },
        option: null,
      });
  }, selectedOptionState);

  delete props.options;
  delete props.outline;

  // Use ForEach for reactive option rendering - updates when value changes
  let childrenOptions = ForEach(optionsValue, "key", (o, index) =>
    option(
      {
        value: o.key ?? `option ${index + 1}`,
        selected: o.key === value.get(),
      },
      o.content ?? ``,
    ),
  );

  let defaultClass = `appearance-none padding-sm bg-primary border-primary radius-md flex-grow-1 ${focusClass}`;

  return wrapIntoLabel(
    props,
    select(
      {
        ...props,
        value: value,
        input: (e) => {
          value.set(e.target.value ?? "");
          props.input && props.input(e);
        },
        class: `select ${defaultClass} ${props.class}`,
      },
      childrenOptions,
    ),
  );
};

/** Checkbox core component and logic */
const CheckBoxCore = (props, _) => {
  let checkedValue = "checked" in props ? props.checked : props.value;
  let checked = resolveBooleanState(checkedValue);
  let focusClass = resolveInputFocusClass(props.outline);
  let defaultClass =
    "cursor-pointer border-primary radius-md bg-primary";
  delete props.outline;
  delete props.checked;
  delete props.value;

  return wrapCheckBoxIntoLabel(
    props,
    input({
      ...props,
      type: "checkbox",
      checked: !!checked.get(),
      change: (e) => {
        checked.set(!!e.target.checked);
        props.change && props.change(e);
        props.input && props.input(e);
      },
      class: `checkbox ${defaultClass} ${focusClass} ${props.class || ""}`,
    }),
  );
};

const SwitchCore = (props, _) => {
  let checkedValue = "checked" in props ? props.checked : props.value;
  let checked = resolveBooleanState(checkedValue);
  let focusClass = resolveInputFocusClass(props.outline);
  let defaultClass =
    "cursor-pointer border-primary bg-primary";
  delete props.outline;
  delete props.checked;
  delete props.value;

  return wrapCheckBoxIntoLabel(
    props,
    input({
      ...props,
      type: "checkbox",
      role: "switch",
      checked: !!checked.get(),
      change: (e) => {
        checked.set(!!e.target.checked);
        props.change && props.change(e);
        props.input && props.input(e);
      },
      class: `switch ${defaultClass} ${focusClass} ${props.class || ""}`.trim(),
    }),
  );
};

const SliderCore = (props, _) => {
  const focusClass = resolveInputFocusClass(props.outline);
  const stepsValue = resolveCollectionState(props.steps, []);
  const customStepsState = Compute(stepsValue, (steps) =>
    isValidSliderSteps(steps) ? steps : null,
  );
  const minState = resolveNumericState(props.min, 0);
  const maxState = resolveNumericState(props.max, 100);
  const stepState = resolveNumericState(props.step, 1);
  const initialCustomSteps = customStepsState.get();
  const initialValue = initialCustomSteps
    ? initialCustomSteps[0].value
    : toSliderNumber(props.value, toSliderNumber(minState.get(), 0));
  const valueState = resolveNumericState(props.value, initialValue);
  const sliderValue = useState(
    initialCustomSteps
      ? findNearestSliderStepIndex(initialCustomSteps, valueState.get())
      : toSliderNumber(valueState.get(), toSliderNumber(minState.get(), 0)),
  );
  const sliderBoundsState = Compute(
    [customStepsState, minState, maxState, stepState],
    (steps, min, max, step) => ({
      min: steps ? 0 : min,
      max: steps ? steps.length - 1 : max,
      step: steps ? 1 : step,
    }),
  );
  const sliderStepLabels = Compute(customStepsState, (steps) =>
    steps && hasSliderStepLabels(steps)
      ? steps.map((step, index) => ({
          ...step,
          position: steps.length === 1 ? 0 : (index / (steps.length - 1)) * 100,
          alignment:
            index === 0
              ? "slider-step-label-start"
              : index === steps.length - 1
                ? "slider-step-label-end"
                : "slider-step-label-center",
        }))
      : [],
  );
  const shouldRenderLabels = sliderStepLabels.map((steps) => steps.length > 0);

  delete props.outline;
  delete props.min;
  delete props.max;
  delete props.step;
  delete props.steps;
  delete props.value;

  useEffect((nextValue) => {
    const customSteps = customStepsState.get();
    if (customSteps) {
      sliderValue.set(findNearestSliderStepIndex(customSteps, nextValue));
      return;
    }

    sliderValue.set(toSliderNumber(nextValue, toSliderNumber(minState.get(), 0)));
  }, valueState);

  useEffect((customSteps) => {
    const currentValue = toSliderNumber(valueState.get(), toSliderNumber(minState.get(), 0));

    if (customSteps) {
      const nextStep = customSteps.find((step) => step.value === currentValue) ?? customSteps[0];
      sliderValue.set(findNearestSliderStepIndex(customSteps, nextStep.value));

      if (nextStep.value !== currentValue) {
        valueState.set(nextStep.value);
        props.input &&
          props.input({
            target: { value: nextStep.value },
            currentTarget: { value: nextStep.value },
            step: nextStep,
          });
      }
      return;
    }

    sliderValue.set(currentValue);
  }, customStepsState);

  return wrapIntoLabel(
    props,
    Column(
      { gap: "small", class: "slider-field" },
      input({
        ...props,
        type: "range",
        min: sliderBoundsState.map((bounds) => bounds.min),
        max: sliderBoundsState.map((bounds) => bounds.max),
        step: sliderBoundsState.map((bounds) => bounds.step),
        value: sliderValue,
        disabled: props.disabled,
        class: `slider ${focusClass} ${props.class || ""}`.trim(),
        input: (e) => {
          const rawValue = toSliderNumber(e.target.value, sliderValue.get());
          const customSteps = customStepsState.get();
          const nextValue = customSteps
            ? getSliderStepValue(customSteps, rawValue)
            : rawValue;

          sliderValue.set(customSteps ? findNearestSliderStepIndex(customSteps, nextValue) : nextValue);

          if (typeof valueState.set === "function") valueState.set(nextValue);
          props.input && props.input(e);
        },
      }),
      Show(shouldRenderLabels, () =>
        div(
          {
            class: "slider-step-labels",
          },
          ForEach(sliderStepLabels, "value", (step) =>
            div(
              {
                class: `slider-step-label ${step.alignment}`,
                style: {
                  left: `${step.position}%`,
                },
              },
              step.label
                ? Text({ weight: "heavy", color: "secondary" }, step.label)
                : "",
            ),
          ),
        ),
      ),
    ),
  );
};

// Exports

/**
 * Single-line text input with optional placeholder and state binding.
 *
 * @param {Object} props - Component props
 * @param {Object|string} [props.value] - Input value (useState object or string)
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.outline] - Show focus outline (default: false)
 * @param {string} [props.label] - Label text (wraps in Column with Heading)
 * @param {boolean} [props.disabled] - Disabled state
 * @param {Function} [props.input] - Input event handler
 * @param {number} [props.height=32] - Input height in pixels
 * @param {number} [props.width] - Input width in pixels
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements (ignored)
 * @returns {*} TextBox component
 */
export const TextInput = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    TextInputCore(finalProps, ...children),
  )({ minHeight: 32, textSize: "1rem", ...props }, ...children),
);

/**
 * Multiline text input with optional auto-growing height.
 *
 * @param {Object} props - Component props
 * @param {Object|string|number} [props.value] - Textarea value (useState object or string)
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.label] - Label text (wraps in Column with Heading)
 * @param {boolean} [props.outline] - Show focus outline (default: false)
 * @param {boolean} [props.disabled] - Disabled state
 * @param {number} [props.minLines=3] - Minimum visible lines
 * @param {number} [props.maxLines=3] - Maximum visible lines before scrolling
 * Shift+Enter inserts a newline. Enter submits the parent form when available.
 * @param {Function} [props.input] - Input event handler
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements (ignored)
 * @returns {*} TextArea component
 */
export const TextArea = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    TextAreaCore(finalProps, ...children),
  )({ textSize: "1rem", border: "primary", ...props }, ...children),
);

/**
 * Menu-backed selector with input-like trigger rendering.
 *
 * @param {Object} props - Component props
 * @param {Object|string} [props.value] - Selected item key (useState object or string)
 * @param {Array<{key: string, text?: string, icon?: string, action?: Function, divider?: boolean}>} [props.options] - Menu-style options array
 * @param {string} [props.label] - Label text (wraps in Column with Heading)
 * @param {boolean} [props.outline] - Show focus outline
 * @param {boolean} [props.disabled] - Disabled state
 * @param {string} [props.anchor="bottom-left"] - Menu anchor position
 * @param {Function} [props.input] - Called with an event-like object after selection
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements (ignored)
 * @returns {*} Picker component
 */
export const Picker = withNormalizedArgs((props, ...children) =>
  PickerCore(props, ...children),
);

/**
 * iOS-style segmented picker with single keyed selection.
 *
 * @param {Object} props - Component props
 * @param {Object|string} [props.value] - Selected segment key (useState object or string)
 * @param {Array<{key: string, text: string, icon?: string}>} [props.items] - Segmented picker items
 * @param {string} [props.label] - Label text (wraps in Column with Heading)
 * @param {boolean} [props.outline] - Show focus outline
 * @param {boolean} [props.disabled] - Disabled state
 * @param {Function} [props.change] - Called with an event-like object after selection
 * @param {Function} [props.input] - Called with an event-like object after selection
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements (ignored)
 * @returns {*} SegmentedPicker component
 */
export const SegmentedPicker = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    SegmentedPickerCore(finalProps, ...children),
  )({ textSize: "1rem", ...props }, ...children),
);

/**
 * Dropdown select input with options.
 *
 * @param {Object} props - Component props
 * @param {Array<{key: string, content: string}>} props.options - Select options array
 * @param {boolean} [props.outline] - Show focus outline
 * @param {string} [props.label] - Label text (wraps in Column with Heading)
 * @param {number} [props.height=32] - Select height in pixels
 * @param {number} [props.width] - Select width in pixels
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements (ignored)
 * @returns {*} Select component
 */
export const Select = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    SelectCore(finalProps, ...children),
  )({ minHeight: 32, textSize: "1rem", ...props }, ...children),
);

/**
 * Simple checkbox input with state binding.
 *
 * @param {Object} props - Component props
 * @param {Object|boolean} [props.checked] - Checked state (useState object or boolean)
 * @param {Object|boolean} [props.value] - Alias for checked state
 * @param {boolean} [props.outline] - Show focus outline
 * @param {string} [props.label] - Label text (wraps in Column with Heading)
 * @param {boolean} [props.disabled] - Disabled state
 * @param {Function} [props.change] - Change event handler
 * @param {Function} [props.input] - Input event handler
 * @param {number|string} [props.size=16] - Checkbox width and height
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements (ignored)
 * @returns {*} CheckBox component
 */
export const CheckBox = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    CheckBoxCore(finalProps, ...children),
  )({ textSize: "1rem", ...props }, ...children),
);

/**
 * OS-style switch toggle with state binding.
 *
 * @param {Object} props - Component props
 * @param {Object|boolean} [props.checked] - Checked state (useState object or boolean)
 * @param {Object|boolean} [props.value] - Alias for checked state
 * @param {boolean} [props.outline] - Show focus outline
 * @param {string} [props.label] - Label text (wraps in Row with Heading)
 * @param {boolean} [props.disabled] - Disabled state
 * @param {Function} [props.change] - Change event handler
 * @param {Function} [props.input] - Input event handler
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements (ignored)
 * @returns {*} Switch component
 */
export const Switch = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    SwitchCore(finalProps, ...children),
  )({ textSize: "1rem", ...props }, ...children),
);

/**
 * Range slider input with optional discrete step mapping.
 *
 * @param {Object} props - Component props
 * @param {Object|number} [props.value] - Slider value (useState object or number)
 * @param {Object|number} [props.min=0] - Minimum numeric value in native mode
 * @param {Object|number} [props.max=100] - Maximum numeric value in native mode
 * @param {Object|number} [props.step=1] - Step increment in native mode
 * @param {Array<{value: number, label?: string}>} [props.steps] - Discrete step configuration; ignores min/max/step when valid
 * @param {string} [props.label] - Label text (wraps in Column with Heading)
 * @param {boolean} [props.outline] - Show focus outline
 * @param {boolean} [props.disabled] - Disabled state
 * @param {Function} [props.input] - Input event handler
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements (ignored)
 * @returns {*} Slider component
 */
export const Slider = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    SliderCore(finalProps, ...children),
  )({ fillWidth: true, ...props }, ...children),
);
