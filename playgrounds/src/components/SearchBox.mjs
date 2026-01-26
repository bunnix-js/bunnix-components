import Bunnix from "@bunnix/core";
import InputField from "./InputField.mjs";

const sizeClassMap = {
  lg: "input-lg",
  xl: "input-xl"
};

export default function SearchBox({
  value,
  placeholder = "Search",
  input,
  size,
  variant = "regular",
  class: className = "",
  ...rest
} = {}) {
  const sizeClass = sizeClassMap[size] || "";
  const variantClass = variant === "rounded" ? "rounded-full" : "";
  const combinedClass = `${sizeClass} ${variantClass} ${className}`.trim();

  return InputField({
    type: "search",
    value,
    placeholder,
    input,
    class: combinedClass,
    ...rest
  });
}
