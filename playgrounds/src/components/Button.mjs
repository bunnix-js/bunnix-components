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
  // Always include 'btn' as the base class for consistent layout properties
  // Then append the variant specific class (unless it's the regular variant)
  const baseClass = "btn";
  const variantClass = variant === "regular" ? "" : `btn-${variant}`;
  const sizeClass = size && size !== "default" ? `btn-${size}` : "";
  const combinedClass = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();

  const props = {
    class: combinedClass,
    disabled,
    click: onClick,
    ...rest
  };

  if (type === "link") {
    props.href = href;
    return a(props, children);
  }

  return button(props, children);
}