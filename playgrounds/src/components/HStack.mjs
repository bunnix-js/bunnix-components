import Bunnix from "@bunnix/core";
const { div } = Bunnix;

export default function HStack({
  alignment = "leading",
  gap = "regular",
  class: className = "",
  ...rest
} = {}, children) {
  const alignmentMap = {
    leading: "justify-start",
    middle: "justify-center",
    trailing: "justify-end"
  };

  const gapMap = {
    small: "gap-sm",
    regular: "gap-md",
    large: "gap-lg"
  };

  const combinedClass = `row-container ${alignmentMap[alignment]} ${gapMap[gap]} ${className}`.trim();

  return div({
    class: combinedClass,
    ...rest
  }, children);
}
