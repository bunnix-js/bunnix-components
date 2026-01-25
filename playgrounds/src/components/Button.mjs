import Bunnix from "@bunnix/core";
const { button, a } = Bunnix;

export default function Button({
  type = "button",
  variant = "regular",
  size,
  href,
  disabled = false,
  click,
  class: className = "",
  ...rest
} = {}, children) {
  const isHyperlink = variant === "hyperlink";
  const disabledState = disabled && typeof disabled.map === "function" ? disabled : null;
  const handler = click;

  // Only apply button-system classes if NOT a hyperlink
  const baseClass = isHyperlink ? "" : "btn";
  const variantClass = (isHyperlink || variant === "regular") ? "" : `btn-${variant}`;
  const sizeClass = (!isHyperlink && size && size !== "default") ? `btn-${size}` : "";
  const disabledClass = disabledState
    ? disabledState.map((value) => (value ? "btn-disabled" : ""))
    : (disabled ? "btn-disabled" : "");
  
  const combinedClass = disabledState
    ? disabledState.map((value) =>
        `${baseClass} ${variantClass} ${sizeClass} ${value ? "btn-disabled" : ""} ${className}`.trim()
      )
    : `${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();

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
