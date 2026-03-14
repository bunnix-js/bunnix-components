/**
 * Input Components (Next-Gen Core)
 *
 * Simplified input primitives with reactive state binding and inline style extraction.
 *
 * Components:
 * - TextInput: Single-line text input with optional placeholder and state binding
 * - Picker: Menu-backed selection input with a selector-style trigger
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
import { withNormalizedArgs, withExtractedStyles, isStateLike } from "./utils.mjs";
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

function shouldInsertTextAreaNewline(event, newlineTrigger) {
  if (event.key !== "Enter" || event.isComposing) return true;

  if (newlineTrigger === "shift-enter") {
    return !!event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey;
  }

  if (newlineTrigger === "command-enter") {
    return !!event.metaKey && !event.shiftKey && !event.ctrlKey && !event.altKey;
  }

  return !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey;
}

/** Text Input core component and logic */
const TextInputCore = (props, _) => {
  let value =
    props.value?.get && props.value?.set
      ? props.value
      : useState(props.value ?? "");
  let placeholder = props.placeholder ?? "";
  let outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  let defaultClass =
    "padding-sm border-primary radius-md flex-grow-1 focus-border-outline bg-primary text-default";

  delete props.outline;

  let rawValue = useState("");

  useEffect((val) => {
    if (props.type === "date" && val instanceof Date) {
      rawValue.set(val.toISOString().substring(0, 10));
    } else {
      rawValue.set(val);
    }
  }, value);

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
      value: rawValue,
      disabled: props.disabled,
      input: (e) => {
        convertRawValue(e.target.value ?? "");
        // value.set(e.target.value ?? "");
        props.input && props.input(e);
      },
      placeholder: placeholder,
      class: `${defaultClass} ${outlineClass} ${props.class || ""}`,
    }),
  );
};

const TextAreaCore = (props, _) => {
  const value =
    props.value?.get && props.value?.set
      ? props.value
      : useState(props.value ?? "");
  const rawValue = useState(value.get?.() ?? props.value ?? "");
  const textAreaRef = useRef(null);
  const minLines = resolveTextAreaLines(props.minLines, 3);
  const maxLines = Math.max(minLines, resolveTextAreaLines(props.maxLines, 3));
  const newlineTrigger = props.newlineTrigger ?? "enter";
  const placeholder = props.placeholder ?? "";
  const outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  const defaultClass =
    "padding-sm border-primary radius-md flex-grow-1 focus-border-outline bg-primary text-default";

  delete props.outline;
  delete props.minLines;
  delete props.maxLines;
  delete props.newlineTrigger;

  useEffect((nextValue) => {
    rawValue.set(nextValue ?? "");
    resizeTextArea(textAreaRef.current, minLines, maxLines);
  }, value);

  useEffect(() => {
    resizeTextArea(textAreaRef.current, minLines, maxLines);
  }, []);

  return wrapIntoLabel(
    props,
    textarea({
      ...props,
      ref: textAreaRef,
      rows: minLines,
      value: rawValue,
      disabled: props.disabled,
      placeholder,
      class: `textarea ${defaultClass} ${outlineClass} ${props.class || ""}`.trim(),
      keydown: (e) => {
        if (e.key === "Enter" && !shouldInsertTextAreaNewline(e, newlineTrigger)) {
          e.preventDefault();
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
  const itemsValue =
    props.items?.get && props.items?.set
      ? props.items
      : useState(props.items ?? []);
  const outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  const defaultClass =
    "padding-sm border-primary radius-md flex-grow-1 focus-border-outline bg-primary text-default";
  const pickerState = Compute([value, itemsValue], (selectedKey, resolvedItems) => {
    const selectedItem = (resolvedItems ?? []).find(
      (item) => !item.divider && item.key === selectedKey,
    );

    const menuItems = (resolvedItems ?? []).map((item) => {
      if (item.divider) return item;

      return {
        ...item,
        action: () => {
          value.set(item.key);
          props.input &&
            props.input({
              target: { value: item.key },
              currentTarget: { value: item.key },
              item,
            });
        },
      };
    });

    return { selectedItem, menuItems };
  });

  delete props.outline;
  delete props.items;

  return wrapIntoLabel(
    props,
    Show(pickerState, ({ selectedItem, menuItems }) =>
      Menu({
        ...props,
        items: menuItems,
        trigger: ({ toggle }) =>
          button(
            {
              type: "button",
              disabled: !!props.disabled,
              click: props.disabled ? undefined : toggle,
              style: {
                minHeight: props.style?.minHeight ?? "32px",
              },
              class: `picker-trigger ${defaultClass} ${outlineClass} ${
                props.disabled ? "picker-trigger-disabled" : ""
              }`.trim(),
            },
            Row(
              { fillWidth: true, alignItems: "center", gap: "small" },
              div(
                { class: "picker-selection" },
                ...(selectedItem?.icon
                  ? [Icon({ name: selectedItem.icon, size: 16 })]
                  : []),
                ...(selectedItem
                  ? [Text({ weight: "heavy" }, selectedItem.text ?? selectedItem.key)]
                  : []),
              ),
              Spacer(),
              Icon({ name: "chevron_down", size: 16, color: "secondary" }),
            ),
          ),
      }),
    ),
  );
};

/** Select core component and logic */
const SelectCore = (props, _) => {
  let value =
    props.value?.get && props.value?.set
      ? props.value
      : useState(props.value ?? "");
  let optionsValue =
    props.options?.get && props.options?.set
      ? props.options
      : useState(props.options ?? []);
  let outline = props.outline ?? false;

  delete props.options;
  delete props.outline;

  // Use ForEach for reactive option rendering - updates when value changes
  let childrenOptions = ForEach(optionsValue, "key", (o, index) =>
    option(
      {
        value: o.key ?? `option ${index() + 1}`,
        selected: o.key === value.get(),
      },
      o.content ?? ``,
    ),
  );

  let defaultClass = `appearance-none padding-sm bg-primary border-primary radius-md flex-grow-1 focus-border-outline ${outline ? "focus-outline-dimmed" : "no-outline"}`;

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
  let outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  let defaultClass =
    "cursor-pointer border-primary radius-md focus-border-outline bg-primary";

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
      class: `checkbox ${defaultClass} ${outlineClass} ${props.class || ""}`,
    }),
  );
};

const SwitchCore = (props, _) => {
  let checkedValue = "checked" in props ? props.checked : props.value;
  let checked = resolveBooleanState(checkedValue);
  let outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  let defaultClass =
    "cursor-pointer border-primary focus-border-outline bg-primary";

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
      class: `switch ${defaultClass} ${outlineClass} ${props.class || ""}`.trim(),
    }),
  );
};

const SliderCore = (props, _) => {
  const customSteps = isValidSliderSteps(props.steps) ? props.steps : null;
  const outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  const minState = resolveNumericState(props.min, 0);
  const maxState = resolveNumericState(props.max, 100);
  const stepState = resolveNumericState(props.step, 1);
  const initialValue = customSteps
    ? customSteps[0].value
    : toSliderNumber(props.value, toSliderNumber(minState.get(), 0));
  const valueState = resolveNumericState(props.value, initialValue);
  const sliderValue = useState(
    customSteps
      ? findNearestSliderStepIndex(customSteps, valueState.get())
      : toSliderNumber(valueState.get(), toSliderNumber(minState.get(), 0)),
  );
  const shouldRenderLabels = customSteps && hasSliderStepLabels(customSteps);

  delete props.outline;
  delete props.min;
  delete props.max;
  delete props.step;
  delete props.steps;
  delete props.value;

  useEffect((nextValue) => {
    if (customSteps) {
      sliderValue.set(findNearestSliderStepIndex(customSteps, nextValue));
      return;
    }

    sliderValue.set(toSliderNumber(nextValue, toSliderNumber(minState.get(), 0)));
  }, valueState);

  return wrapIntoLabel(
    props,
    Column(
      { gap: "small", class: "slider-field" },
      input({
        ...props,
        type: "range",
        min: customSteps ? 0 : minState,
        max: customSteps ? customSteps.length - 1 : maxState,
        step: customSteps ? 1 : stepState,
        value: sliderValue,
        disabled: props.disabled,
        class: `slider ${outlineClass} ${props.class || ""}`.trim(),
        input: (e) => {
          const rawValue = toSliderNumber(e.target.value, sliderValue.get());
          const nextValue = customSteps
            ? getSliderStepValue(customSteps, rawValue)
            : rawValue;

          sliderValue.set(customSteps ? findNearestSliderStepIndex(customSteps, nextValue) : nextValue);

          if (typeof valueState.set === "function") valueState.set(nextValue);
          props.input && props.input(e);
        },
      }),
      shouldRenderLabels
        ? div(
            {
              class: "slider-step-labels",
            },
            customSteps.map((step, index) =>
              div(
                {
                  class: `slider-step-label ${
                    index === 0
                      ? "slider-step-label-start"
                      : index === customSteps.length - 1
                        ? "slider-step-label-end"
                        : "slider-step-label-center"
                  }`,
                  style: {
                    left: `${(index / (customSteps.length - 1)) * 100}%`,
                  },
                },
                step.label
                  ? Text({ weight: "heavy", color: "secondary" }, step.label)
                  : "",
              ),
            ),
          )
        : null,
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
 * @param {string} [props.newlineTrigger="enter"] - Enter key combo that inserts a newline: "enter" | "shift-enter" | "command-enter"
 * @param {Function} [props.input] - Input event handler
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements (ignored)
 * @returns {*} TextArea component
 */
export const TextArea = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    TextAreaCore(finalProps, ...children),
  )({ textSize: "1rem", ...props }, ...children),
);

/**
 * Menu-backed selector with input-like trigger rendering.
 *
 * @param {Object} props - Component props
 * @param {Object|string} [props.value] - Selected item key (useState object or string)
 * @param {Array<{key: string, text?: string, icon?: string, action?: Function, divider?: boolean}>} [props.items] - Menu-style items array
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
  withExtractedStyles((finalProps, ...children) =>
    PickerCore(finalProps, ...children),
  )({ minHeight: 32, textSize: "1rem", ...props }, ...children),
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
