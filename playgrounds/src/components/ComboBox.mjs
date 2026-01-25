import Bunnix from "@bunnix/core";
const { select, option } = Bunnix;

export default function ComboBox({
  options = [],
  selection,
  size,
  class: className = "",
  change,
  ...rest
} = {}, children) {
  const sizeClass = size === "lg" ? "input-lg" : size === "xl" ? "input-xl" : "";
  const selectionState = selection && typeof selection.map === "function" ? selection : null;

  const handleChange = (event) => {
    if (selectionState) {
      selectionState.set(event.target.value);
    }
    if (change) change(event);
  };

  const resolvedChildren = children ?? options.map((opt) => {
    if (typeof opt === "string") {
      return option({ value: opt }, opt);
    }
    return option({ value: opt.value }, opt.label ?? opt.value);
  });

  return select({
    class: `${sizeClass} ${className}`.trim(),
    value: selection ?? "",
    change: handleChange,
    ...rest
  }, resolvedChildren);
}
