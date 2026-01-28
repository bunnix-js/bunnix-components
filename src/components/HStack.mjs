import Bunnix from "@bunnix/core";
const { div } = Bunnix;

export default function HStack(props = {}, children) {
  if (props === null || props === undefined || Array.isArray(props) || typeof props !== "object") {
    children = props;
    props = {};
  }

  const {
    alignment = "leading",
    gap = "regular",
    class: className = "",
    ...rest
  } = props;
  const alignmentMap = {
    leading: "justify-start",
    middle: "justify-center",
    trailing: "justify-end"
  };

  const gapMap = {
    xsmall: "gap-xs",
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
