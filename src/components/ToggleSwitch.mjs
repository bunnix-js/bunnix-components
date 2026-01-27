import Bunnix from "@bunnix/core";
const { label, input, span } = Bunnix;

export default function ToggleSwitch({
  labelText,
  size,
  onChange,
  class: className = "",
  ...inputProps
}) {
  const normalizeSize = (value) => {
    if (!value || value === "default" || value === "regular" || value === "md") return "md";
    if (value === "sm") return "sm";
    if (value === "lg" || value === "xl") return value;
    return value;
  };
  const normalizedSize = normalizeSize(size);
  const sizeClass = normalizedSize === "lg" ? "switch-lg" : normalizedSize === "xl" ? "switch-xl" : "";
  const change = onChange ?? inputProps.change;

  return label({ class: `switch-control ${sizeClass} ${className}`.trim() }, [
    input({ type: "checkbox", class: "switch-input", ...inputProps, change }),
    span({ class: "switch-track" }),
    labelText ? span({ class: "text-base" }, labelText) : null
  ]);
}
