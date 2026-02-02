import Bunnix from "@bunnix/core";
import { clampSize } from "../utils/sizeUtils.mjs";
const { label, input, span } = Bunnix;

export default function ToggleSwitch({
  labelText,
  size,
  onChange,
  class: className = "",
  ...inputProps
}) {
  // ToggleSwitch supports all sizes
  const normalizeSize = (value) => clampSize(value, ["xs", "sm", "md", "lg", "xl"], "md");
  const normalizedSize = normalizeSize(size);
  const sizeClass = normalizedSize === "xl" ? "switch-xl" : normalizedSize === "lg" ? "switch-lg" : "";
  const change = onChange ?? inputProps.change;

  return label({ class: `switch-control ${sizeClass} ${className}`.trim() }, [
    input({ type: "checkbox", class: "switch-input", ...inputProps, change }),
    span({ class: "switch-track" }),
    labelText ? span({ class: "text-base" }, labelText) : null
  ]);
}
