import Bunnix from "@bunnix/core";
const { label, input, span } = Bunnix;

export default function Checkbox({ labelText, class: className = "", ...inputProps }) {
  return label({ class: `selection-control ${className}`.trim() }, [
    input({ type: "checkbox", ...inputProps }),
    labelText ? span({ class: "text-base" }, labelText) : null
  ]);
}
