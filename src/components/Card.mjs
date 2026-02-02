import Bunnix from "@bunnix/core";

const { div } = Bunnix;

const directionClassMap = {
  horizontal: "row-container",
  vertical: "column-container"
};

export default function Card({
  direction,
  alignment,
  class: className = "",
  ...rest
} = {}, children) {
  const directionClass = directionClassMap[direction] || "";
  const rowAlignmentMap = {
    leading: "justify-start",
    middle: "justify-center",
    trailing: "justify-end"
  };
  const columnAlignmentMap = {
    leading: "items-start",
    middle: "items-center",
    trailing: "items-end"
  };
  const alignmentClass = alignment
    ? direction === "vertical"
      ? columnAlignmentMap[alignment] || ""
      : direction === "horizontal"
        ? rowAlignmentMap[alignment] || ""
        : ""
    : "";
  const combinedClass = `card ${directionClass} ${alignmentClass} ${className}`.trim();

  return div({ class: combinedClass, ...rest }, children);
}
