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
  const safeName = typeof name === "string" ? name : "";
  const iconName = safeName.startsWith("icon-") ? safeName : `icon-${safeName}`;
  
  // fill mapping: "base" -> "icon-base", "white" -> "icon-white", etc.
  const fillClass = fill.startsWith("icon-") ? fill : `icon-${fill}`;
  
  const normalizeSize = (value) => {
    if (!value || value === "default" || value === "regular" || value === "md") return "";
    if (typeof value === "string" && value.startsWith("icon-")) return value;
    return `icon-${value}`;
  };
  const sizeClass = normalizeSize(size);
  
  const combinedClass = `icon ${iconName} ${fillClass} ${sizeClass} ${className}`.trim();

  return span({
    class: combinedClass,
    ...rest
  });
}
