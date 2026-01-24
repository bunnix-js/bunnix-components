import Bunnix from "@bunnix/core";
const { label, input, span } = Bunnix;

export default function ToggleSwitch({ labelText, class: className = "", ...inputProps }) {
  return label({ class: `switch-control ${className}`.trim() }, [
    input({ type: "checkbox", class: "switch-input", ...inputProps }),
    span({ class: "switch-track" }),
    labelText ? span({ class: "text-base" }, labelText) : null
  ]);
}
