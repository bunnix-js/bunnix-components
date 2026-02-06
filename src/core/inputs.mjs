/**
 * Input Components (Next-Gen Core)
 *
 * Simplified input primitives with reactive state binding and inline style extraction.
 *
 * Components:
 * - TextBox: Single-line text input with optional placeholder and state binding
 *
 * Features:
 * - Two-way binding with useState objects
 * - Automatic style extraction (width, height, gap, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - Outline focus states via core.css utilities
 */
import Bunnix, { useState } from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";
import { Column } from "./layout.mjs";
import { Heading } from "./typography.mjs";

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
      component
    );
  }
  return component;
}

const TextInputCore = (props, _) => {
  let value = (props.value?.get && props.value?.set) ?
    props.value :
    useState(props.value ?? "");
  let placeholder = props.placeholder ?? "";
  let outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  let defaultClass = "padding-sm border-primary radius-md flex-grow-1 focus-border-outline bg-primary text-default";

  delete props.outline;

  return wrapIntoLabel(props,
    input(
      {
        ...props,
        value: value.get(),
        disabled: props.disabled,
        input: (e) => {
          value.set(e.target.value ?? "");
          (props.input) && props.input(e);
        },
        placeholder: placeholder,
        class: `${defaultClass} ${outlineClass} ${props.class || ""}`
      }
    )
  );
};

const SelectCore = (props, _) => {
  let options = props.options ?? [];
  let outline = props.outline ?? false;

  delete props.options;
  delete props.outline;

  let childrenOptions = options.map((o, index) => {
    return option({ value: o.key ?? `option ${index + 1}` }, o.content ?? ``);
  });

  let defaultClass =
    `appearance-none padding-sm bg-primary border-primary radius-md flex-grow-1 focus-border-outline ${outline ? "focus-outline-dimmed" : "no-outline" }`;

  return wrapIntoLabel(props,
    select(
    {...props, class: `select ${defaultClass} ${props.class}` },
    childrenOptions)
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
export const TextInput = withNormalizedArgs((props, ...children) => (
  withExtractedStyles((finalProps, ...children) =>
    TextInputCore(finalProps, ...children))
  )({ height: 32, ...props }, ...children)
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
export const Select = withNormalizedArgs((props, ...children) => (
  withExtractedStyles((finalProps, ...children) =>
    SelectCore(finalProps, ...children))
  )({ height: 32, ...props }, ...children)
);