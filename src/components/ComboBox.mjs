import Bunnix from "@bunnix/core";
const { select, option } = Bunnix;

export default function ComboBox({
  options = [],
  selection,
  size,
  class: className = "",
  onChange,
  change,
  ...rest
} = {}, children) {
  const normalizeSize = (value) => {
    if (!value || value === "default" || value === "regular" || value === "md") return "md";
    if (value === "sm") return "sm";
    if (value === "lg" || value === "xl") return value;
    return value;
  };
  const normalizedSize = normalizeSize(size);
  const sizeClass = normalizedSize === "lg" ? "input-lg" : normalizedSize === "xl" ? "input-xl" : "";
  const selectionState = selection && typeof selection.map === "function" ? selection : null;
  const handleChangeExternal = onChange ?? change;

  const handleChange = (event) => {
    if (selectionState) {
      selectionState.set(event.target.value);
    }
    if (handleChangeExternal) handleChangeExternal(event);
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
