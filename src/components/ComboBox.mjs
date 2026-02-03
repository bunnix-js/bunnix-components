import Bunnix from "@bunnix/core";
import { clampSize, toSizeToken, normalizeSize } from "../utils/sizeUtils.mjs";
import Icon from "./Icon.mjs";
const { select, option, div, label } = Bunnix;

export default function ComboBox({
  options = [],
  selection,
  size,
  label: labelText,
  class: className = "",
  onChange,
  change,
  ...rest
} = {}, children) {
  // ComboBox supports all sizes
  const normalizeSizeValue = (value) => clampSize(value, ["xsmall", "small", "regular", "large", "xlarge"], "regular");
  const normalizedSize = normalizeSizeValue(size);
  const sizeToken = toSizeToken(normalizedSize);
  const sizeClass = sizeToken === "xl" ? "input-xl" : sizeToken === "lg" ? "input-lg" : "";
  const iconSize = normalizeSize(normalizedSize);
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

  const selectElement = div({ class: "combobox" }, [
    select({
      class: `combobox-select ${sizeClass} ${className}`.trim(),
      value: selection ?? "",
      change: handleChange,
      ...rest
    }, resolvedChildren),
    Icon({ name: "chevron-down", fill: "base", size: iconSize, class: "combobox-chevron" })
  ]);

  return div({ class: "column-container no-margin shrink-0 gap-0" }, [
    labelText && label({ class: "label select-none" }, labelText),
    selectElement
  ]);
}
