import Bunnix from "@bunnix/core";
const { label, input, span } = Bunnix;

export default function ToggleSwitch({
  labelText,
  size,
  onChange,
  class: className = "",
  ...inputProps
}) {
  const sizeClass = size === "lg" ? "switch-lg" : size === "xl" ? "switch-xl" : "";
  const change = onChange ?? inputProps.change;

  return label({ class: `switch-control ${sizeClass} ${className}`.trim() }, [
    input({ type: "checkbox", class: "switch-input", ...inputProps, change }),
    span({ class: "switch-track" }),
    labelText ? span({ class: "text-base" }, labelText) : null
  ]);
}
