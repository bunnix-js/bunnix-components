import Bunnix from "@bunnix/core";
import { normalizeSize, toSizeToken } from "../utils/sizeUtils.mjs";
const { span } = Bunnix;

export default function Icon({
  name,
  fill = "default",
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
  
  const normalizeSizeClass = (value) => {
    if (!value) return "";
    if (typeof value === "string" && value.startsWith("icon-")) return value;
    const normalized = normalizeSize(value);
    if (normalized === "regular") return "";
    const sizeToken = toSizeToken(normalized);
    return sizeToken ? `icon-${sizeToken}` : "";
  };
  const sizeClass = normalizeSizeClass(size);
  
  const combinedClass = `icon ${iconName} ${fillClass} ${sizeClass} ${className}`.trim();

  return span({
    class: combinedClass,
    ...rest
  });
}
