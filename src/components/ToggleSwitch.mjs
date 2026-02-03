import Bunnix from "@bunnix/core";
import { clampSize, toSizeToken } from "../utils/sizeUtils.mjs";
const { label, input, span } = Bunnix;

export default function ToggleSwitch({
  labelText,
  size,
  onChange,
  class: className = "",
  ...inputProps
}) {
  // ToggleSwitch supports all sizes
  const normalizeSize = (value) => clampSize(value, ["xsmall", "small", "regular", "large", "xlarge"], "regular");
  const normalizedSize = normalizeSize(size);
  const sizeToken = toSizeToken(normalizedSize);
  const sizeClass = sizeToken === "xl" ? "switch-xl" : sizeToken === "lg" ? "switch-lg" : "";
  const change = onChange ?? inputProps.change;

  return label({ class: `switch-control ${sizeClass} ${className}`.trim() }, [
    input({ type: "checkbox", class: "switch-input", ...inputProps, change }),
    span({ class: "switch-track" }),
    labelText ? span({ class: "text-base" }, labelText) : null
  ]);
}
