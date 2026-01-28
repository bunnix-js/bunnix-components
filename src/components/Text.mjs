import Bunnix from "@bunnix/core";
const { span, p, h1, h2, h3, h4 } = Bunnix;

export default function Text(props = {}, children) {
  if (props === null || props === undefined || Array.isArray(props) || typeof props !== "object") {
    children = props;
    props = {};
  }

  const {
    type = "text",
    color = "primary",
    design = "regular",
    wrap,
    class: className = "",
    ...rest
  } = props;
  const tagMap = {
    text: span,
    paragraph: p,
    heading1: h1,
    heading2: h2,
    heading3: h3,
    heading4: h4
  };

  const tag = tagMap[type] || span;
  
  // Color mapping: primary -> text-primary, secondary -> text-secondary, etc.
  const colorClass = color ? `text-${color}` : "";
  
  // Design mapping: mono -> text-mono, regular -> ""
  const designClass = design === "mono" ? "text-mono" : "";
  
  const isState = className && typeof className.map === "function";

  const wrapClass = wrap === "nowrap"
    ? "whitespace-nowrap"
    : wrap === "wrap"
      ? ""
      : "";

  const combinedClass = isState
    ? className.map((value) => `${colorClass} ${designClass} ${wrapClass} ${value}`.trim())
    : `${colorClass} ${designClass} ${wrapClass} ${className}`.trim();

  return tag({
    class: combinedClass,
    ...rest
  }, children);
}
