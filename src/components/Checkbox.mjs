import Bunnix from "@bunnix/core";
import { clampSize, toSizeToken } from "../utils/sizeUtils.mjs";
import Icon from "./Icon.mjs";
const { label: labelTag, input, span } = Bunnix;

export default function Checkbox({
  label,
  size,
  onCheck,
  check,
  onChange,
  class: className = "",
  ...inputProps
}) {
  // Checkbox supports all sizes
  const normalizeSize = (value) => clampSize(value, ["xsmall", "small", "regular", "large", "xlarge"], "regular");
  const normalizedSize = normalizeSize(size);
  const sizeToken = toSizeToken(normalizedSize);
  const sizeClass = sizeToken === "xl" ? "checkbox-xl" : sizeToken === "lg" ? "checkbox-lg" : "";
  const nativeChange = onChange ?? inputProps.change;
  const checkHandler = onCheck ?? check;

  return labelTag({ class: `selection-control ${className}`.trim() }, [
    span({ class: `checkbox-box ${sizeClass}`.trim() }, [
      input({
        type: "checkbox",
        class: sizeClass,
        ...inputProps,
        change: (e) => {
          if (nativeChange) nativeChange(e);
          if (checkHandler) checkHandler(e.target.checked);
        }
      }),
      span({ class: "checkbox-icon" }, Icon({ name: "check", fill: "white", class: "checkbox-icon-svg" })),
    ]),
    label ? span({ class: "text-base" }, label) : null
  ]);
}
