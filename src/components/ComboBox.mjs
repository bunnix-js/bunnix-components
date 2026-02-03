import Bunnix from "@bunnix/core";
import { clampSize } from "../utils/sizeUtils.mjs";
const { select, option, div, span } = Bunnix;

export default function ComboBox({
  options = [],
  selection,
  size,
  class: className = "",
  onChange,
  change,
  ...rest
} = {}, children) {
  // ComboBox supports all sizes
  const normalizeSize = (value) => clampSize(value, ["xs", "sm", "md", "lg", "xl"], "md");
  const normalizedSize = normalizeSize(size);
  const sizeClass = normalizedSize === "xl" ? "input-xl" : normalizedSize === "lg" ? "input-lg" : "";
  const iconSizeClass = normalizedSize === "sm"
    ? "icon-sm"
    : normalizedSize === "lg"
      ? "icon-lg"
      : normalizedSize === "xl"
        ? "icon-xl"
        : "";
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

  return div({ class: "combobox" }, [
    select({
      class: `combobox-select ${sizeClass} ${className}`.trim(),
      value: selection ?? "",
      change: handleChange,
      ...rest
    }, resolvedChildren),
    span({ class: `combobox-chevron icon icon-chevron-down icon-base ${iconSizeClass}`.trim() })
  ]);
}
