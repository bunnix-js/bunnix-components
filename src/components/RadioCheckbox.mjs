import Bunnix from "@bunnix/core";
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
  const normalizeSize = (value) => {
    if (!value || value === "default" || value === "regular" || value === "md") return "md";
    if (value === "sm") return "sm";
    if (value === "lg" || value === "xl") return value;
    return value;
  };
  const normalizedSize = normalizeSize(size);
  const sizeClass = normalizedSize === "lg" ? "checkbox-lg" : normalizedSize === "xl" ? "checkbox-xl" : "";
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
