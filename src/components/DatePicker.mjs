import Bunnix, { ForEach, useMemo, useRef, useState, useEffect } from "@bunnix/core";
import { clampSize, toSizeToken } from "../utils/sizeUtils.mjs";
import Icon from "./Icon.mjs";
const { div, label, input: inputEl, button, span, hr } = Bunnix;

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const isSameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const toMidnight = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const formatDate = (date, format = "DD/MM/YYYY") => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const parseDate = (str) => {
  if (!str) return null;
  const parts = str.split("/");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  const date = new Date(year, month, day);
  if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
    return null;
  }
  return date;
};

const applyDateMask = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");
  
  // Apply mask DD/MM/YYYY
  let masked = "";
  for (let i = 0; i < digits.length && i < 8; i++) {
    if (i === 2 || i === 4) {
      masked += "/";
    }
    masked += digits[i];
  }
  
  return masked;
};

const buildCalendar = (viewDate) => {
  if (!viewDate) return [];
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const startOfMonth = new Date(year, month, 1);
  const startDay = startOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = 0; i < 42; i += 1) {
    let day;
    let cellMonth = month;
    let outside = false;

    if (i < startDay) {
      day = daysInPrev - startDay + i + 1;
      cellMonth = month - 1;
      outside = true;
    } else if (i >= startDay + daysInMonth) {
      day = i - (startDay + daysInMonth) + 1;
      cellMonth = month + 1;
      outside = true;
    } else {
      day = i - startDay + 1;
    }

    const cellDate = new Date(year, cellMonth, day);
    const key = `${cellDate.getFullYear()}-${cellDate.getMonth()}-${cellDate.getDate()}-${outside ? "o" : "i"}`;
    cells.push({ key, date: cellDate, outside });
  }

  return cells;
};

export default function DatePicker({
  id,
  placeholder = "DD/MM/YYYY",
  range = false,
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
  const pickerId = id || `datepicker-${Math.random().toString(36).slice(2, 8)}`;
  const anchorName = `--${pickerId}`;

  const selectedStart = useState(value || null);
  const selectedEnd = useState(null);
  const inputValue = useState(value ? formatDate(value) : "");

  const viewDate = useState(value || new Date());

  const calendar = useMemo([viewDate], (value) => buildCalendar(value));
  const monthLabel = useMemo([viewDate], (value) => {
    try {
      return new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(value);
    } catch (error) {
      return new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" }).format(value);
    }
  });

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

  const setSelection = (start, end = null) => {
    selectedStart.set(start);
    selectedEnd.set(end);
    if (range) {
      const startText = formatDate(start);
      const endText = end ? formatDate(end) : "";
      inputValue.set(endText ? `${startText} - ${endText}` : startText);
    } else {
      inputValue.set(formatDate(start));
    }
  };

  const handleDayClick = (date) => {
    if (range) {
      const start = selectedStart.get();
      const end = selectedEnd.get();
      if (!start || end) {
        setSelection(date, null);
      } else if (date < start) {
        setSelection(date, start);
      } else {
        setSelection(start, date);
      }
    } else {
      setSelection(date, null);
      closePopover();
      
      // Trigger change handlers
      const handleChange = onChange ?? change;
      if (handleChange) {
        handleChange({ target: { value: formatDate(date) }, date });
      }
    }
    viewDate.set(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  const handlePrevMonth = () => {
    const current = viewDate.get();
    viewDate.set(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    const current = viewDate.get();
    viewDate.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = toMidnight(new Date());
    setSelection(today, null);
    viewDate.set(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const handleClear = () => {
    selectedStart.set(null);
    selectedEnd.set(null);
    inputValue.set("");
    closePopover();
    
    const handleChange = onChange ?? change;
    if (handleChange) {
      handleChange({ target: { value: "" }, date: null });
    }
  };

  const handleOK = () => {
    // Update the main input with the currently selected date when OK is clicked
    const start = selectedStart.get();
    const end = selectedEnd.get();
    
    if (range) {
      if (start && end) {
        const startText = formatDate(start);
        const endText = formatDate(end);
        const value = `${startText} - ${endText}`;
        inputValue.set(value);
        
        const handleChange = onChange ?? change;
        if (handleChange) {
          handleChange({ target: { value }, dateStart: start, dateEnd: end });
        }
      } else if (start) {
        const value = formatDate(start);
        inputValue.set(value);
        
        const handleChange = onChange ?? change;
        if (handleChange) {
          handleChange({ target: { value }, dateStart: start, dateEnd: null });
        }
      }
    } else {
      if (start) {
        const value = formatDate(start);
        inputValue.set(value);
        
        const handleChange = onChange ?? change;
        if (handleChange) {
          handleChange({ target: { value }, date: start });
        }
      }
    }
    
    closePopover();
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    const maskedValue = applyDateMask(rawValue);
    inputValue.set(maskedValue);
    
    // Try to parse the date if complete
    if (maskedValue.length === 10) {
      const parsedDate = parseDate(maskedValue);
      if (parsedDate) {
        selectedStart.set(parsedDate);
        viewDate.set(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
        
        const handleChange = onChange ?? change;
        if (handleChange) {
          handleChange({ target: { value: maskedValue }, date: parsedDate });
        }
      }
    }
    
    const handleInput = onInput ?? input;
    if (handleInput) {
      handleInput(e);
    }
  };

  const handleInputFocus = (e) => {
    openPopover();
    
    const handleFocus = onFocus ?? focus;
    if (handleFocus) {
      handleFocus(e);
    }
  };

  const handleInputBlur = (e) => {
    // Don't close popover on blur - let it handle its own dismissal
    // The popover will close when clicking outside or pressing escape
    
    const handleBlur = onBlur ?? blur;
    if (handleBlur) {
      handleBlur(e);
    }
  };

  const handleCalendarIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const input = inputRef.current;
    if (input) {
      input.focus();
    }
  };

  // DatePicker supports regular, large, xlarge (no xsmall, small)
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

  return div({ class: `column-container no-margin shrink-0 ${className}`.trim() }, [
    labelText && label({ class: "label select-none" }, labelText),
    div({ class: "datepicker-input-wrapper w-full relative" }, [
      inputEl({
        ref: inputRef,
        id: pickerId,
        type: "text",
        value: inputValue,
        placeholder,
        disabled,
        class: `input ${sizeClass} ${variantClass} pr-xl`.trim(),
        style: `anchor-name: ${anchorName}`,
        input: handleInputChange,
        focus: handleInputFocus,
        blur: handleInputBlur,
        maxlength: "10"
      }),
      button({
        class: "datepicker-icon-button",
        type: "button",
        disabled,
        click: handleCalendarIconClick,
        tabindex: "-1"
      }, [
        Icon({ name: "calendar", fill: "quaternary", size: iconSizeValue })
      ])
    ]),
    div({
      ref: popoverRef,
      popover: "manual",
      class: "datepicker-popover popover-base",
      style: `--anchor-id: ${anchorName}`
    }, [
      div({ class: "card column-container shadow gap-0 p-0 bg-base datepicker-card" }, [
        div({ class: "row-container items-center justify-between datepicker-header p-sm no-margin" }, [
          button({ class: "btn btn-flat datepicker-nav", click: handlePrevMonth }, [
            span({ class: "icon icon-chevron-left icon-base" })
          ]),
          span({ class: "datepicker-title" }, monthLabel),
          button({ class: "btn btn-flat datepicker-nav", click: handleNextMonth }, [
            span({ class: "icon icon-chevron-right icon-base" })
          ])
        ]),
        div({ class: "datepicker-body" }, [
          div({ class: "datepicker-weekdays" }, WEEKDAYS.map((day) =>
            span({ class: "datepicker-weekday" }, day)
          )),
          div({ class: "datepicker-grid" },
            ForEach(calendar, "key", (cell) => {
              const start = selectedStart.get();
              const end = selectedEnd.get();
              const inRange = range && start && end && cell.date >= start && cell.date <= end;
              const isStart = range && start && isSameDay(cell.date, start);
              const isEnd = range && end && isSameDay(cell.date, end);
              const isSelected = !range && start && isSameDay(cell.date, start);
              const isToday = isSameDay(cell.date, toMidnight(new Date()));

              const classNames = [
                "datepicker-cell",
                cell.outside ? "is-outside" : "",
                inRange ? "is-in-range" : "",
                isStart ? "is-range-start" : "",
                isEnd ? "is-range-end" : "",
                isSelected ? "is-selected" : "",
                isToday ? "is-today" : ""
              ].filter(Boolean).join(" ");

              return button({
                class: classNames,
                click: () => handleDayClick(cell.date)
              }, cell.date.getDate().toString());
            })
          )
        ]),
        hr({ class: "no-margin" }),
        div({ class: "row-container justify-center items-center gap-md p-base shrink-0 datepicker-footer" }, [
          button({ class: "btn btn-flat", click: handleClear }, "Clear"),
          button({ class: "btn btn-flat", click: handleToday }, "Today"),
          button({ class: "btn", click: handleOK }, "OK")
        ])
      ])
    ])
  ]);
}
