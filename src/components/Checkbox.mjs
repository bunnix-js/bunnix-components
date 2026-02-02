import Bunnix from "@bunnix/core";
import { clampSize } from "../utils/sizeUtils.mjs";
const { label, input, span } = Bunnix;

export default function Checkbox({
  labelText,
  size,
  onCheck,
  check,
  onChange,
  class: className = "",
  ...inputProps
}) {
  // Checkbox supports all sizes
  const normalizeSize = (value) => clampSize(value, ["xs", "sm", "md", "lg", "xl"], "md");
  const normalizedSize = normalizeSize(size);
  const sizeClass = normalizedSize === "xl" ? "checkbox-xl" : normalizedSize === "lg" ? "checkbox-lg" : "";
  const nativeChange = onChange ?? inputProps.change;
  const checkHandler = onCheck ?? check;

  return label({ class: `selection-control ${className}`.trim() }, [
    input({
      type: "checkbox",
      class: sizeClass,
      ...inputProps,
      change: (e) => {
        if (nativeChange) nativeChange(e);
        if (checkHandler) checkHandler(e.target.checked);
      }
    }),
    labelText ? span({ class: "text-base" }, labelText) : null
  ]);
}
