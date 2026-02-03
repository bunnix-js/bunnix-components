import Bunnix from "@bunnix/core";
import { clampSize, toSizeToken } from "../utils/sizeUtils.mjs";
const { button, a } = Bunnix;

export default function Button({
  type = "button",
  variant = "regular",
  size,
  href,
  disabled = false,
  onClick,
  click,
  class: className = "",
  ...rest
} = {}, children) {
  // Button supports all sizes
  const normalizeSize = (value) => clampSize(value, ["xsmall", "small", "regular", "large", "xlarge"], "regular");

  const variantState = variant && typeof variant.map === "function" ? variant : null;
  const sizeState = size && typeof size.map === "function" ? size : null;
  const disabledState = disabled && typeof disabled.map === "function" ? disabled : null;
  const resolvedVariant = variantState ? variantState.get() : variant;
  const isHyperlink = resolvedVariant === "hyperlink";
  const handler = onClick ?? click;

  const buildClass = (variantValue, sizeValue, disabledValue) => {
    const normalizedSize = normalizeSize(sizeValue);
    const sizeToken = toSizeToken(normalizedSize);
    const baseClass = isHyperlink ? "" : "btn";
    const variantClass = (isHyperlink || variantValue === "regular") ? "" : `btn-${variantValue}`;
    const sizeClass = (!isHyperlink && sizeToken && sizeToken !== "md")
      ? `btn-${sizeToken}`
      : "";
    const disabledClass = disabledValue ? "btn-disabled" : "";
    return `row-container justify-start shrink-0 no-selectable ${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();
  };

  const combinedClass = variantState
    ? variantState.map((value) =>
        buildClass(value, sizeState ? sizeState.get() : size, disabledState ? disabledState.get() : disabled)
      )
    : sizeState
      ? sizeState.map((value) =>
          buildClass(resolvedVariant, value, disabledState ? disabledState.get() : disabled)
        )
      : disabledState
        ? disabledState.map((value) => buildClass(resolvedVariant, size, value))
        : buildClass(resolvedVariant, size, disabled);

  const props = {
    class: combinedClass,
    disabled,
    ...rest
  };

  // Only attach click handler if not disabled
  if (handler) {
    props.click = (event) => {
      const isDisabled = disabledState ? disabledState.get() : !!disabled;
      if (isDisabled) return;
      handler(event);
    };
  }

  if (type === "link" || isHyperlink) {
    // If it's a hyperlink variant, default to link type unless explicitly button
    if (!disabled) {
      props.href = href || "#";
    }
    return a(props, children);
  }

  return button(props, children);
}
