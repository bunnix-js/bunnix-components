import Bunnix from "@bunnix/core";
const { span, p, h1, h2, h3, h4 } = Bunnix;

export default function Text({
  type = "text",
  color = "primary",
  design = "regular",
  class: className = "",
  ...rest
} = {}, children) {
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
  
  const combinedClass = `${colorClass} ${designClass} ${className}`.trim();

  return tag({ 
    class: combinedClass, 
    ...rest 
  }, children);
}
