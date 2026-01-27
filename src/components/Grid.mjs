import Bunnix from "@bunnix/core";
const { div } = Bunnix;

export default function Grid({
  type = "flow",
  columns = [],
  gap = "regular",
  class: className = "",
  style: inlineStyle = "",
  ...rest
} = {}, children) {
  const gapMap = {
    small: "gap-sm",
    regular: "gap-md",
    large: "gap-lg"
  };

  const isFixed = type === "fixed";
  
  // Base structural class
  // 'grid-flow' uses flex-wrap: wrap
  // 'column-container' provides display: flex which we override with display: grid if fixed
  const baseClass = isFixed ? "column-container" : "grid-flow";
  
  let gridStyle = inlineStyle;
  if (isFixed && columns.length > 0) {
    const template = columns.map(col => {
      if (col.size === "auto") return "1fr";
      if (col.size === "minmax") return "minmax(min-content, 1fr)";
      return col.size || "1fr";
    }).join(" ");
    gridStyle = `display: grid; grid-template-columns: ${template}; ${inlineStyle}`.trim();
  }

  return div({
    class: `${baseClass} ${gapMap[gap]} ${className}`.trim(),
    style: gridStyle,
    ...rest
  }, children);
}
