/**
 * Input Components (Next-Gen Core)
 *
 * Simplified input primitives with reactive state binding and inline style extraction.
 *
 * Components:
 * - TextInput: Single-line text input with optional placeholder and state binding
 * - Select: Dropdown input with mapped options
 * - CheckBox2: Simple checkbox input with optional state binding
 *
 * Features:
 * - Two-way binding with useState objects
 * - Automatic style extraction (width, height, gap, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - Outline focus states via core.css utilities
 */
import Bunnix, { useState, useEffect } from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";
import { Column, Row } from "./layout.mjs";
import { Heading } from "./typography.mjs";
import "./input.css";

const { input, select, option } = Bunnix;

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
      value: rawValue.get(),
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

/** Select core component and logic */
const SelectCore = (props, _) => {
  let value =
    props.value?.get && props.value?.set
      ? props.value
      : useState(props.value ?? "");
  let options = props.options ?? [];
  let outline = props.outline ?? false;

  delete props.options;
  delete props.outline;

  let childrenOptions = options.map((o, index) => {
    return option(
      {
        value: o.key ?? `option ${index + 1}`,
        selected: o.key === value.get(),
      },
      o.content ?? ``,
    );
  });

  let defaultClass = `appearance-none padding-sm bg-primary border-primary radius-md flex-grow-1 focus-border-outline ${outline ? "focus-outline-dimmed" : "no-outline"}`;

  return wrapIntoLabel(
    props,
    select(
      {
        ...props,
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
  let checked =
    checkedValue?.get && checkedValue?.set
      ? checkedValue
      : useState(!!checkedValue);
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
  )({ height: 32, textSize: "1rem", ...props }, ...children),
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
 * @returns {*} CheckBox2 component
 */
export const CheckBox2 = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    CheckBoxCore(finalProps, ...children),
  )({ size: 20, textSize: "1rem", ...props }, ...children),
);
