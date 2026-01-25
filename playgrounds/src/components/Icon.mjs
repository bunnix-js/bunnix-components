import Bunnix from "@bunnix/core";
const { span } = Bunnix;

export default function Icon({
  name,
  fill = "base",
  size,
  class: className = "",
  ...rest
} = {}) {
  // name is expected to be just the slug, e.g. "add" or "person"
  // but we handle "icon-name" too for backward compatibility
  const iconName = name.startsWith("icon-") ? name : `icon-${name}`;
  
  // fill mapping: "base" -> "icon-base", "white" -> "icon-white", etc.
  const fillClass = fill.startsWith("icon-") ? fill : `icon-${fill}`;
  
  const sizeClass = size ? `icon-${size}` : "";
  
  const combinedClass = `icon ${iconName} ${fillClass} ${sizeClass} ${className}`.trim();

  return span({
    class: combinedClass,
    ...rest
  });
}
