import Bunnix from "@bunnix/core";
import { clampSize, toSizeToken } from "../utils/sizeUtils.mjs";
const { label, input, span } = Bunnix;

export default function RadioCheckbox({
  labelText,
  size,
  onCheck,
  check,
  onChange,
  class: className = "",
  ...inputProps
}) {
  // RadioCheckbox supports all sizes
  const normalizeSize = (value) => clampSize(value, ["xsmall", "small", "regular", "large", "xlarge"], "regular");
  const normalizedSize = normalizeSize(size);
  const sizeToken = toSizeToken(normalizedSize);
  const sizeClass = sizeToken === "xl" ? "checkbox-xl" : sizeToken === "lg" ? "checkbox-lg" : "";
  const nativeChange = onChange ?? inputProps.change;
  const checkHandler = onCheck ?? check;

  return label({ class: `selection-control ${className}`.trim() }, [
    input({
      type: "radio",
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
