import Bunnix from "@bunnix/core";
import { clampSize } from "../utils/sizeUtils.mjs";
const { span, p, h1, h2, h3, h4 } = Bunnix;

export default function Text(props = {}, children) {
  const isState = (value) => value && typeof value.map === "function";
  
  // Normalize arguments: Text("Value"), Text(State), or Text({ props }, value)
  if (
    props === null ||
    props === undefined ||
    Array.isArray(props) ||
    typeof props === "string" ||
    isState(props)
  ) {
    children = props;
    props = {};
  }

  const {
    type = "text",
    color = "primary",
    design = "regular",
    weight,
    size,
    wrap,
    class: className = "",
    ...rest
  } = props;

  const normalizeSize = (value) =>
    clampSize(value, ["xs", "sm", "md", "lg", "xl"], "md");
  const normalizedSize = normalizeSize(size);
  const sizeClass = normalizedSize ? `text-${normalizedSize}` : "";
  const tagMap = {
    text: span,
    paragraph: p,
    heading1: h1,
    heading2: h2,
    heading3: h3,
    heading4: h4,
  };

  const tag = tagMap[type] || span;
  const colorClass = color ? `text-${color}` : "";
  const designClass = design === "mono" ? "text-mono" : "";
  const weightClass =
    weight === "bold" ? "bold" : weight === "semibold" ? "semibold" : "";

  const isClassState = isState(className);

  const wrapClass =
    wrap === "nowrap" ? "whitespace-nowrap" : wrap === "wrap" ? "" : "";

  const combinedClass = isClassState
    ? className.map((value) =>
        `${colorClass} ${designClass} ${weightClass} ${sizeClass} ${wrapClass} ${value}`.trim(),
      )
    : `${colorClass} ${designClass} ${weightClass} ${sizeClass} ${wrapClass} ${className}`.trim();

  return tag(
    {
      class: combinedClass,
      ...rest,
    },
    children,
  );
}
