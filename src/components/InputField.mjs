import Bunnix, { useRef, useEffect, useState } from "@bunnix/core";
import { clampSize, toSizeToken, normalizeSize } from "../utils/sizeUtils.mjs";
import { applyMask, getMaskMaxLength } from "../utils/maskUtils.mjs";
import Icon from "./Icon.mjs";
const { div, label, input: inputEl, datalist, option } = Bunnix;

export default function InputField({
  class: className = "",
  type = "text",
  variant = "regular",
  size,
  value,
  placeholder,
  label: labelText,
  disabled = false,
  autocomplete,
  mask,
  suggestions = [],
  onInput,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  input,
  change,
  focus,
  blur,
  keydown,
  ...rest
} = {}) {
  const inputRef = useRef(null);
  const listId = suggestions.length > 0 ? `list-${Math.random().toString(36).slice(2, 8)}` : null;
  
  // Initialize masked value based on initial value and mask
  const initialMaskedValue = mask && value ? applyMask(value, mask) : (value || "");
  const maskedValue = useState(initialMaskedValue);

  // InputField supports regular, large, xlarge (no xsmall, small)
  const normalizeSizeValue = (value) => clampSize(value, ["regular", "large", "xlarge"], "regular");
  const normalizedSize = normalizeSizeValue(size);
  const sizeToken = toSizeToken(normalizedSize);
  const sizeClass = sizeToken === "xl" ? "input-xl" : sizeToken === "lg" ? "input-lg" : "";
  const iconSize = normalizeSize(normalizedSize);

  useEffect((el) => {
    if (el && listId) {
      el.setAttribute('list', listId);
    }
  }, inputRef);

  const variantClass = variant === "rounded" ? "rounded-full" : "";
  const combinedClass = `${className} ${sizeClass} ${variantClass}`.trim();

  const handleInput = onInput ?? input;
  const handleChange = onChange ?? change;
  const handleFocus = onFocus ?? focus;
  const handleBlur = onBlur ?? blur;
  const handleKeyDown = onKeyDown ?? keydown;

  const handleMaskedInput = (e) => {
    if (mask) {
      const rawValue = e.target.value;
      const masked = applyMask(rawValue, mask);
      maskedValue.set(masked);
      
      // Update the input element value
      e.target.value = masked;
      
      // Create a new event with the masked value
      const maskedEvent = {
        ...e,
        target: { ...e.target, value: masked }
      };
      
      if (handleInput) {
        handleInput(maskedEvent);
      }
      if (handleChange) {
        handleChange(maskedEvent);
      }
    } else {
      if (handleInput) {
        handleInput(e);
      }
    }
  };

  const handleMaskedChange = (e) => {
    if (!mask && handleChange) {
      handleChange(e);
    }
  };

  // Determine maxlength based on mask
  const maxLength = mask ? getMaskMaxLength(mask) : rest.maxlength;
  
  // Remove maxlength from rest to avoid override
  const { maxlength: _maxlength, ...restWithoutMaxLength } = rest;

  const inputElement = inputEl({
    ref: inputRef,
    type,
    value: mask ? maskedValue : (value ?? ""),
    placeholder: placeholder ?? "", // Ensure placeholder is never undefined to avoid "false" text
    disabled,
    autocomplete: autocomplete ?? "off", // Default to off to prevent browser autocomplete suggestions
    maxlength: maxLength,
    class: `input ${combinedClass}`.trim(),
    input: handleMaskedInput,
    change: handleMaskedChange,
    focus: handleFocus,
    blur: handleBlur,
    keydown: handleKeyDown,
    ...restWithoutMaxLength
  });

  const inputBlock = type === "search"
    ? div({ class: "input-search w-full" }, [
        Icon({ name: "search", fill: "quaternary", size: iconSize }),
        inputElement
      ])
    : inputElement;

  return div({ class: "column-container no-margin shrink-0 gap-0" }, [
    labelText && label({ class: "label select-none" }, labelText),
    inputBlock,
    listId && datalist({ id: listId },
      suggestions.map(s => option({ value: s }))
    )
  ]);
}
