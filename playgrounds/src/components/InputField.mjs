import Bunnix, { useRef, useEffect } from "@bunnix/core";
const { div, label, input, datalist, option, span } = Bunnix;

export default function InputField({
  class: className = "",
  type = "text",
  variant = "regular",
  value,
  placeholder,
  label: labelText,
  disabled = false,
  suggestions = [],
  input: onInput,
  change: onChange,
  focus: onFocus,
  blur: onBlur,
  ...rest
} = {}) {
  const inputRef = useRef(null);
  const listId = suggestions.length > 0 ? `list-${Math.random().toString(36).slice(2, 8)}` : null;

  useEffect((el) => {
    if (el && listId) {
      el.setAttribute('list', listId);
    }
  }, inputRef);

  const variantClass = variant === "rounded" ? "rounded-full" : "";
  const combinedClass = `${className} ${variantClass}`.trim();

  const inputElement = input({
    ref: inputRef,
    type,
    value: value ?? "",
    placeholder: placeholder ?? "", // Ensure placeholder is never undefined to avoid "false" text
    disabled,
    class: `input ${combinedClass}`.trim(),
    input: onInput,
    change: onChange,
    focus: onFocus,
    blur: onBlur,
    ...rest
  });

  const sizeClass = className.includes("input-xl")
    ? "icon-xl"
    : className.includes("input-lg")
      ? "icon-lg"
      : "";

  const inputBlock = type === "search"
    ? div({ class: "input-search w-full" }, [
        span({ class: `icon icon-search icon-quaternary ${sizeClass}`.trim() }),
        inputElement
      ])
    : inputElement;

  return div({ class: "column-container no-margin shrink-0" }, [
    labelText && label({ class: "label select-none" }, labelText),
    inputBlock,
    listId && datalist({ id: listId },
      suggestions.map(s => option({ value: s }))
    )
  ]);
}
