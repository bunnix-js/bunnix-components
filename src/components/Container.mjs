import Bunnix from "@bunnix/core";

const { div } = Bunnix;

const typeClassMap = {
  main: "main-container",
  content: "main-content",
  page: "page-layout",
};

const directionClassMap = {
  row: "row-container",
  column: "column-container",
};

export default function Container(
  { type = "box", direction = "column", class: className = "", ...rest } = {},
  ...children
) {
  const typeClass = typeClassMap[type] || "";
  const directionClass = directionClassMap[direction] || "";
  const combinedClass = `${typeClass} ${directionClass} ${className}`.trim();

  return div({ class: combinedClass, ...rest }, ...children);
}
