import Bunnix from "@bunnix/core";
const { div } = Bunnix;

export default function VStack(props = {}, ...children) {
  const isElement = props && typeof props === "object" && "tag" in props;
  if (props === null || props === undefined || Array.isArray(props) || typeof props !== "object" || isElement) {
    const initialChildren = Array.isArray(props) ? props : [props];
    children = [...initialChildren, ...children].filter((child) => child !== undefined);
    props = {};
  }

  const {
    alignment = "leading",
    gap = "regular",
    class: className = "",
    ...rest
  } = props;
  // For VStack, alignment controls horizontal alignment (cross axis)
  const alignmentMap = {
    leading: "items-start",
    middle: "items-center",
    trailing: "items-end"
  };

  const gapMap = {
    xsmall: "gap-xs",
    small: "gap-sm",
    regular: "gap-md",
    large: "gap-lg"
  };

  const combinedClass = `column-container ${alignmentMap[alignment]} ${gapMap[gap]} ${className}`.trim();

  return div({
    class: combinedClass,
    ...rest
  }, ...children);
}
