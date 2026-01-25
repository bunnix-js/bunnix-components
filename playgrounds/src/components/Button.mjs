import Bunnix from "@bunnix/core";
const { button, a } = Bunnix;

export default function Button({
  type = "button",
  variant = "regular",
  size,
  href,
  disabled = false,
  click: onClick,
  class: className = "",
  ...rest
} = {}, children) {
  const isHyperlink = variant === "hyperlink";

  // Only apply button-system classes if NOT a hyperlink
  const baseClass = isHyperlink ? "" : "btn";
  const variantClass = (isHyperlink || variant === "regular") ? "" : `btn-${variant}`;
  const sizeClass = (!isHyperlink && size && size !== "default") ? `btn-${size}` : "";
  const disabledClass = disabled ? "btn-disabled" : "";
  
  const combinedClass = `${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();

  const props = {
    class: combinedClass,
    disabled,
    ...rest
  };

  // Only attach click handler if not disabled
  if (!disabled && onClick) {
    props.click = onClick;
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