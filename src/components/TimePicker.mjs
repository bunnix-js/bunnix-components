import Bunnix, { useRef, useState, useMemo, useEffect } from "@bunnix/core";
import { clampSize, toSizeToken } from "../utils/sizeUtils.mjs";
import Icon from "./Icon.mjs";
const { div, label, input: inputEl, button, span, hr } = Bunnix;

const formatSegment = (val) => val.toString().padStart(2, '0');

const applyTimeMask = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");
  
  // Apply mask HH:MM
  let masked = "";
  for (let i = 0; i < digits.length && i < 4; i++) {
    if (i === 2) {
      masked += ":";
    }
    masked += digits[i];
  }
  
  return masked;
};

const parseTime = (str) => {
  if (!str) return null;
  const parts = str.split(":");
  if (parts.length !== 2) return null;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return { hours, minutes };
};

const formatTime = (hours, minutes) => {
  if (hours === null || minutes === null) return "";
  return `${formatSegment(hours)}:${formatSegment(minutes)}`;
};

export default function TimePicker({
  id,
  placeholder = "HH:MM",
  variant = "regular",
  size = "regular",
  label: labelText,
  disabled = false,
  value,
  onInput,
  onChange,
  onFocus,
  onBlur,
  input,
  change,
  focus,
  blur,
  class: className = ""
} = {}) {
  const popoverRef = useRef(null);
  const inputRef = useRef(null);
  const hourInputRef = useRef(null);
  const minuteInputRef = useRef(null);
  const pickerId = id || `timepicker-${Math.random().toString(36).slice(2, 8)}`;
  const anchorName = `--${pickerId}`;

  // Initialize from value prop if provided
  const now = new Date();
  const initialHours = value?.hours ?? now.getHours();
  const initialMinutes = value?.minutes ?? now.getMinutes();
  
  const hour = useState(formatSegment(initialHours));
  const minute = useState(formatSegment(initialMinutes));
  const inputValue = useState(value ? formatTime(initialHours, initialMinutes) : "");

  const openPopover = () => {
    const popover = popoverRef.current;
    if (popover && !popover.matches(":popover-open")) {
      popover.showPopover();
    }
  };

  const closePopover = () => {
    const popover = popoverRef.current;
    if (popover && popover.matches(":popover-open")) {
      popover.hidePopover();
    }
  };

  // Handle click outside and escape key for manual popover
  useEffect((popoverElement) => {
    if (!popoverElement) return;

    const handleClickOutside = (e) => {
      if (!popoverElement.matches(":popover-open")) return;
      
      const input = inputRef.current;
      const isClickInside = popoverElement.contains(e.target);
      const isClickOnInput = input && input.contains(e.target);
      
      if (!isClickInside && !isClickOnInput) {
        closePopover();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape" && popoverElement.matches(":popover-open")) {
        closePopover();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, popoverRef);

  const updateTime = (hours, minutes) => {
    hour.set(formatSegment(hours));
    minute.set(formatSegment(minutes));
    inputValue.set(formatTime(hours, minutes));
    
    const handleChange = onChange ?? change;
    if (handleChange) {
      handleChange({ target: { value: formatTime(hours, minutes) }, time: { hours, minutes } });
    }
  };

  const handleNow = () => {
    const d = new Date();
    updateTime(d.getHours(), d.getMinutes());
  };

  const handleClear = () => {
    hour.set("00");
    minute.set("00");
    inputValue.set("");
    closePopover();
    
    const handleChange = onChange ?? change;
    if (handleChange) {
      handleChange({ target: { value: "" }, time: null });
    }
  };

  const handleOK = () => {
    // Update the main input with current segment values when OK is clicked
    const h = hour.get().padStart(2, '0');
    const m = minute.get().padStart(2, '0');
    const time = formatTime(parseInt(h, 10), parseInt(m, 10));
    inputValue.set(time);
    
    const handleChange = onChange ?? change;
    if (handleChange) {
      handleChange({ 
        target: { value: time }, 
        time: { hours: parseInt(h, 10), minutes: parseInt(m, 10) } 
      });
    }
    
    closePopover();
  };

  const handleHourInput = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (raw !== "") {
      const val = parseInt(raw, 10);
      if (val > 23) raw = "23";
    }
    hour.set(raw);

    // Update main input value
    const currentMinute = minute.get();
    if (raw && currentMinute) {
      inputValue.set(formatTime(parseInt(raw, 10), parseInt(currentMinute, 10)));
    }

    // Auto-focus minutes if we have 2 digits or a digit that can't be leading (3-9)
    if (raw.length === 2 || (raw.length === 1 && parseInt(raw, 10) > 2)) {
      minuteInputRef.current?.focus();
      minuteInputRef.current?.select();
    }
  };

  const handleMinuteInput = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (raw !== "") {
      const val = parseInt(raw, 10);
      if (val > 59) raw = "59";
    }
    minute.set(raw);

    // Update main input value
    const currentHour = hour.get();
    if (currentHour && raw) {
      inputValue.set(formatTime(parseInt(currentHour, 10), parseInt(raw, 10)));
    }
  };

  const handleSegmentBlur = (type) => {
    const state = type === 'hour' ? hour : minute;
    let val = state.get();
    if (val === "") val = "00";
    const padded = val.padStart(2, '0');
    state.set(padded);

    // Update main input with padded values
    const h = type === 'hour' ? padded : hour.get();
    const m = type === 'minute' ? padded : minute.get();
    if (h && m) {
      const time = formatTime(parseInt(h, 10), parseInt(m, 10));
      inputValue.set(time);
      
      const handleChange = onChange ?? change;
      if (handleChange) {
        handleChange({ 
          target: { value: time }, 
          time: { hours: parseInt(h, 10), minutes: parseInt(m, 10) } 
        });
      }
    }
  };

  const handleMainInputChange = (e) => {
    const rawValue = e.target.value;
    const maskedValue = applyTimeMask(rawValue);
    inputValue.set(maskedValue);
    
    // Try to parse the time if complete
    if (maskedValue.length === 5) {
      const parsedTime = parseTime(maskedValue);
      if (parsedTime) {
        hour.set(formatSegment(parsedTime.hours));
        minute.set(formatSegment(parsedTime.minutes));
        
        const handleChange = onChange ?? change;
        if (handleChange) {
          handleChange({ target: { value: maskedValue }, time: parsedTime });
        }
      }
    }
    
    const handleInput = onInput ?? input;
    if (handleInput) {
      handleInput(e);
    }
  };

  const handleMainInputFocus = (e) => {
    openPopover();
    
    const handleFocus = onFocus ?? focus;
    if (handleFocus) {
      handleFocus(e);
    }
  };

  const handleMainInputBlur = (e) => {
    // Don't close popover on blur - let it handle its own dismissal
    
    const handleBlur = onBlur ?? blur;
    if (handleBlur) {
      handleBlur(e);
    }
  };

  const handleClockIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const input = inputRef.current;
    if (input) {
      input.focus();
    }
  };

  // TimePicker supports regular, large, xlarge (no xsmall, small)
  const normalizeSize = (value) => clampSize(value, ["regular", "large", "xlarge"], "regular");
  const normalizedSize = normalizeSize(size);
  const sizeToken = toSizeToken(normalizedSize);
  const sizeClass = sizeToken === "xl" ? "input-xl" : sizeToken === "lg" ? "input-lg" : "";
  const variantClass = variant === "rounded" ? "rounded-full" : "";
  const iconSizeValue = normalizedSize === "large"
    ? "large"
    : normalizedSize === "xlarge"
      ? "xlarge"
      : undefined;

  return div({ class: `column-container no-margin shrink-0 gap-0 ${className}`.trim() }, [
    labelText && label({ class: "label select-none" }, labelText),
    div({ class: "timepicker-input-wrapper w-full relative" }, [
      inputEl({
        ref: inputRef,
        id: pickerId,
        type: "text",
        value: inputValue,
        placeholder,
        disabled,
        autocomplete: "off",
        class: `input ${sizeClass} ${variantClass} pr-xl`.trim(),
        style: `anchor-name: ${anchorName}`,
        input: handleMainInputChange,
        focus: handleMainInputFocus,
        blur: handleMainInputBlur,
        maxlength: "5"
      }),
      button({
        class: "timepicker-icon-button",
        type: "button",
        disabled,
        click: handleClockIconClick,
        tabindex: "-1"
      }, [
        Icon({ name: "clock", fill: "quaternary", size: iconSizeValue })
      ])
    ]),

    div({
      ref: popoverRef,
      popover: "manual",
      class: "timepicker-popover popover-base",
      style: `--anchor-id: ${anchorName}`
    }, [
      div({ class: "card column-container shadow gap-0 p-0 bg-base timepicker-card" }, [
        div({ class: "timepicker-display" }, [
          inputEl({
            ref: hourInputRef,
            type: "text",
            class: "time-segment",
            value: hour,
            placeholder: "00",
            input: handleHourInput,
            blur: () => handleSegmentBlur('hour'),
            focus: (e) => e.target.select()
          }),
          span({ class: "time-separator" }, ":"),
          inputEl({
            ref: minuteInputRef,
            type: "text",
            class: "time-segment",
            value: minute,
            placeholder: "00",
            input: handleMinuteInput,
            blur: () => handleSegmentBlur('minute'),
            focus: (e) => e.target.select()
          })
        ]),

        hr({ class: "no-margin" }),

        div({ class: "row-container justify-center items-center gap-md p-base shrink-0" }, [
          button({ type: "button", class: "btn btn-flat", click: handleClear }, "Clear"),
          button({ type: "button", class: "btn btn-flat", click: handleNow }, "Now"),
          button({ type: "button", class: "btn", click: handleOK }, "OK")
        ])
      ])
    ])
  ]);
}
