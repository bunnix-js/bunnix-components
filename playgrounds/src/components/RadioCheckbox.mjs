import Bunnix from "@bunnix/core";
const { label, input, span } = Bunnix;

export default function RadioCheckbox({ labelText, size, check, class: className = "", ...inputProps }) {
  const sizeClass = size === "lg" ? "checkbox-lg" : size === "xl" ? "checkbox-xl" : "";
  const nativeChange = inputProps.change;

  return label({ class: `selection-control ${className}`.trim() }, [
    input({
      type: "radio",
      class: sizeClass,
      ...inputProps,
      change: (e) => {
        if (nativeChange) nativeChange(e);
        if (check) check(e.target.checked);
      }
    }),
    labelText ? span({ class: "text-base" }, labelText) : null
  ]);
}
