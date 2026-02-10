import Bunnix from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles, isStateLike } from "./utils.mjs";

const { button } = Bunnix;

const ButtonCore = (props, ...children) => {
  let outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  let paddingClass = (!props.padding) ? "padding-y-sm padding-x-md" : "padding-y-sm";
  let variantClass = props.variant || "primary";

  const disabledValue = props.disabled;

  delete props.variant;
  delete props.outline;
  delete props.disabled;

  const handleClick = (e) => {
    if (props.click) props.click(e);
  };

  return button({
    ...props,
    type: props.type ?? "button",
    disabled: disabledValue ?? false,
    click: handleClick,
    class: `button ${variantClass} ${outlineClass} ${paddingClass} ${props.class || ""}`
  }, ...children);
};

const LinkButtonCore = (props, ...children) => {
  let outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  let variantClass = props.variant || "";

  const disabledValue = props.disabled;
  const getIsDisabled = () =>
    isStateLike(disabledValue) ? !!disabledValue.get() : !!disabledValue;

  delete props.variant;
  delete props.outline;
  delete props.disabled;

  const handleClick = (e) => {
    if (getIsDisabled()) return;
    if (props.click) props.click(e);
  };

  return button({
    ...props,
    type: props.type ?? "button",
    ...(getIsDisabled() ? { disabled: true } : {}),
    click: handleClick,
    class: `link-button ${variantClass} ${outlineClass} ${props.class || ""}`
  }, ...children);
};

/**
 * Standard button component with multiple variants and states.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant="primary"] - Button style variant: "primary" | "secondary" | "tertiary" | "danger"
 * @param {boolean} [props.disabled] - Disabled state
 * @param {boolean} [props.outline=false] - Show focus outline
 * @param {boolean} [props.padding=true] - Apply default padding (can be disabled for custom layouts)
 * @param {Function} [props.click] - Click event handler
 * @param {number} [props.minHeight=32] - Minimum height in pixels
 * @param {string} [props.textSize="1rem"] - Text size
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Button content (text, icons, etc.)
 * @returns {*} Button component
 */
export const Button = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    ButtonCore(finalProps, ...children),
  )({ minHeight: 32, textSize: "1rem", ...props }, ...children),
);

/**
 * Link-styled button component with underline hover effects.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant="primary"] - Button style variant: "primary" | "secondary" | "tertiary" | "danger"
 * @param {boolean} [props.disabled] - Disabled state
 * @param {boolean} [props.outline=false] - Show focus outline
 * @param {Function} [props.click] - Click event handler
 * @param {number} [props.minHeight=32] - Minimum height in pixels
 * @param {string} [props.textSize="1rem"] - Text size
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Button content (text, icons, etc.)
 * @returns {*} LinkButton component
 */
export const LinkButton = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    LinkButtonCore(finalProps, ...children),
  )({ minHeight: 32, textSize: "1rem", ...props }, ...children),
);
