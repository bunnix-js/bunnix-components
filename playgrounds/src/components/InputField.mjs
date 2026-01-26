import Bunnix, { useRef, useEffect } from "@bunnix/core";
const { div, label, input, datalist, option } = Bunnix;

export default function InputField({
  class: className = "",
  type = "text",
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

  return div({ class: `column-container no-margin shrink-0` }, [
    labelText && label({ class: "label select-none" }, labelText),
    input({
      ref: inputRef,
      type,
      value: value ?? "",
      placeholder: placeholder ?? "", // Ensure placeholder is never undefined to avoid "false" text
      disabled,
      class: `input ${className}`,
      input: onInput,
      change: onChange,
      focus: onFocus,
      blur: onBlur,
      ...rest
    }),
    listId && datalist({ id: listId },
      suggestions.map(s => option({ value: s }))
    )
  ]);
}
