/**
 * InputField
 * 
 * Text input with optional label, masking, and autocomplete suggestions.
 * 
 * Key features:
 * - Supports state objects (useState) for two-way binding
 * - Input masking for dates, phone, currency, CPF, CNPJ, etc.
 * - Currency/decimal masks emit numeric values, not formatted strings
 * - Search variant with icon
 * - Datalist-based suggestions
 */
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
  const valueState = value && typeof value.get === "function" && typeof value.subscribe === "function";
  const resolvedValue = valueState ? value.get() : value;
  
  const getInitialMaskedValue = () => {
    if (!mask || !resolvedValue) return resolvedValue || "";
    
    const maskType = typeof mask === 'object' ? mask.type : mask;
    if (maskType === 'currency' || maskType === 'decimal') {
      const decimalPlaces = maskType === 'currency' 
        ? (typeof mask === 'object' ? mask.options?.decimalPlaces ?? 2 : 2)
        : (typeof mask === 'object' ? mask.options?.decimalPlaces ?? 2 : 2);
      const numValue = parseFloat(resolvedValue);
      if (!isNaN(numValue)) {
        const intValue = Math.round(numValue * Math.pow(10, decimalPlaces));
        return applyMask(intValue.toString(), mask);
      }
    }
    return applyMask(resolvedValue, mask);
  };
  
  const maskedValue = useState(getInitialMaskedValue());

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

  useEffect((nextValue) => {
    if (!mask || !valueState) return;
    
    const maskType = typeof mask === 'object' ? mask.type : mask;
    if (maskType === 'currency' || maskType === 'decimal') {
      const decimalPlaces = maskType === 'currency' 
        ? (typeof mask === 'object' ? mask.options?.decimalPlaces ?? 2 : 2)
        : (typeof mask === 'object' ? mask.options?.decimalPlaces ?? 2 : 2);
      const numValue = parseFloat(nextValue);
      if (!isNaN(numValue)) {
        const intValue = Math.round(numValue * Math.pow(10, decimalPlaces));
        const masked = applyMask(intValue.toString(), mask);
        maskedValue.set(masked);
      } else {
        maskedValue.set("");
      }
    } else {
      const masked = applyMask(nextValue ?? "", mask);
      maskedValue.set(masked);
    }
  }, [value]);

  const variantClass = variant === "rounded" ? "rounded-full" : "";
  const combinedClass = `${className} ${sizeClass} ${variantClass}`.trim();

  const handleInput = onInput ?? input;
  const handleChange = onChange ?? change;
  const handleFocus = onFocus ?? focus;
  const handleBlur = onBlur ?? blur;
  const handleKeyDown = onKeyDown ?? keydown;

  const handleMaskedInput = (e) => {
    if (mask) {
      const rawValue = e?.target?.value ?? "";
      const masked = applyMask(rawValue, mask);
      maskedValue.set(masked);
      
      const maskType = typeof mask === 'object' ? mask.type : mask;
      let valueToEmit = masked;
      
      if (maskType === 'currency' || maskType === 'decimal') {
        const digitsOnly = rawValue.replace(/[^\d]/g, "");
        if (digitsOnly) {
          const decimalPlaces = maskType === 'currency' 
            ? (typeof mask === 'object' ? mask.options?.decimalPlaces ?? 2 : 2)
            : (typeof mask === 'object' ? mask.options?.decimalPlaces ?? 2 : 2);
          valueToEmit = (parseInt(digitsOnly, 10) / Math.pow(10, decimalPlaces)).toString();
        } else {
          valueToEmit = "";
        }
      }
      
      if (valueState) {
        value.set(valueToEmit);
      }
      
      if (e?.target) {
        e.target.value = masked;
      }
      
      const eventValue = (maskType === 'currency' || maskType === 'decimal') ? valueToEmit : masked;
      const maskedEvent = {
        ...e,
        target: { ...(e?.target || {}), value: eventValue }
      };
      
      if (handleInput) {
        handleInput(maskedEvent);
      }
      if (handleChange) {
        handleChange(maskedEvent);
      }
    } else {
      const inputValue = e?.target?.value ?? "";
      
      if (valueState) {
        value.set(inputValue);
      }
      
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

  const maxLength = mask ? getMaskMaxLength(mask) : rest.maxlength;
  const { maxlength: _maxlength, ...restWithoutMaxLength } = rest;

  const inputElement = inputEl({
    ref: inputRef,
    type,
    value: mask ? maskedValue : (valueState ? value : (value ?? "")),
    placeholder: placeholder ?? "",
    disabled,
    autocomplete: autocomplete ?? "off",
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
