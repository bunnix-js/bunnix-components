import Bunnix from "@bunnix/core";
import { normalizeSize, toSizeToken } from "../utils/sizeUtils.mjs";
import { iconRegistry } from "../utils/iconRegistry.generated.mjs";

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
  const nameState = name && typeof name.map === "function" ? name : null;
  const nameValue = nameState ? nameState.get() : name;
  const buildSlug = (value) => {
    const safeName = typeof value === "string" ? value : "";
    return safeName.startsWith("icon-") ? safeName.substring(5) : safeName;
  };
  const iconSlugState = nameState ? nameState.map(buildSlug) : null;
  const iconSlug = iconSlugState ?? buildSlug(nameValue);
  
  // Handle reactive fill values (from .map()) or static strings
  const fillState = fill && typeof fill.map === "function" ? fill : null;
  const fillValue = fillState ? fillState.get() : fill;
  
  // fill mapping: "base" -> "icon-base", "white" -> "icon-white", etc.
  const buildFillClass = (fillVal) => {
    if (!fillVal || typeof fillVal !== "string") return "icon-default";
    return fillVal.startsWith("icon-") ? fillVal : `icon-${fillVal}`;
  };
  
  const fillClass = fillState 
    ? fillState.map(buildFillClass)
    : buildFillClass(fillValue);
  
  const normalizeSizeClass = (value) => {
    if (!value) return "";
    if (typeof value === "string" && value.startsWith("icon-")) return value;
    const normalized = normalizeSize(value);
    if (normalized === "regular") return "";
    const sizeToken = toSizeToken(normalized);
    return sizeToken ? `icon-${sizeToken}` : "";
  };
  const sizeClass = normalizeSizeClass(size);
  
  // Handle reactive className
  const classState = className && typeof className.map === "function" ? className : null;
  const classValue = classState ? classState.get() : className;
  
  const buildCombinedClass = (slugValue, fClass, cClass) => {
    return `icon icon-${slugValue} ${fClass} ${sizeClass} ${cClass}`.trim();
  };

  const combinedClass = iconSlugState || fillState || classState
    ? (iconSlugState && fillState && classState
        ? iconSlugState.map(slug => fillState.map(fClass => classState.map(cClass => buildCombinedClass(slug, fClass, cClass))))
        : iconSlugState && fillState
          ? iconSlugState.map(slug => fillState.map(fClass => buildCombinedClass(slug, fClass, classValue)))
          : iconSlugState && classState
            ? iconSlugState.map(slug => classState.map(cClass => buildCombinedClass(slug, buildFillClass(fillValue), cClass)))
            : iconSlugState
              ? iconSlugState.map(slug => buildCombinedClass(slug, fillClass, classValue))
              : fillState && classState
                ? fillState.map(fClass => classState.map(cClass => buildCombinedClass(iconSlug, fClass, cClass)))
                : fillState
                  ? fillState.map(fClass => buildCombinedClass(iconSlug, fClass, classValue))
                  : classState.map(cClass => buildCombinedClass(iconSlug, buildFillClass(fillValue), cClass)))
    : buildCombinedClass(iconSlug, fillClass, classValue);

  // Get SVG content from registry (already sanitized)
  const svgContent = iconSlugState
    ? iconSlugState.map(slug => iconRegistry[slug] || '')
    : iconRegistry[iconSlug] || '';
  
  // Create span using Bunnix with innerHTML property
  return span({
    class: combinedClass,
    innerHTML: svgContent,
    ...rest
  });
}
