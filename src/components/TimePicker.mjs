import Bunnix, { useRef, useState, useMemo } from "@bunnix/core";
import Icon from "./Icon.mjs";
const { div, button, span, hr, input } = Bunnix;

const formatSegment = (val) => val.toString().padStart(2, '0');

export default function TimePicker({
  id,
  placeholder,
  variant = "regular",
  size = "regular",
  class: className = ""
} = {}) {
  const popoverRef = useRef(null);
  const hourInputRef = useRef(null);
  const minuteInputRef = useRef(null);
  const pickerId = id || `timepicker-${Math.random().toString(36).slice(2, 8)}`;
  const anchorName = `--${pickerId}`;

  // State as strings for better input handling
  const now = new Date();
  const hour = useState(formatSegment(now.getHours()));
  const minute = useState(formatSegment(now.getMinutes()));
  const isModified = useState(false);

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

  const handleNow = () => {
    const d = new Date();
    hour.set(formatSegment(d.getHours()));
    minute.set(formatSegment(d.getMinutes()));
    isModified.set(true);
  };

  const handleHourInput = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (raw !== "") {
      const val = parseInt(raw, 10);
      if (val > 23) raw = "23";
    }
    hour.set(raw);
    isModified.set(true);

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
    isModified.set(true);
  };

  const handleBlur = (type) => {
    const state = type === 'hour' ? hour : minute;
    let val = state.get();
    if (val === "") val = "00";
    state.set(val.padStart(2, '0'));
  };

  // Reactive display label for the trigger
  const displayLabel = useMemo([hour, minute, isModified], (h, m, mod) => {
    if (!mod && placeholder) return placeholder;
    // Ensure we show padded values in the trigger even if input is mid-edit
    const hh = h === "" ? "00" : h.padStart(2, '0');
    const mm = m === "" ? "00" : m.padStart(2, '0');
    return `${hh}:${hh === h ? '' : ''}${mm}`; // Trigger re-render correctly
  });

  // Refined display label using state directly for consistency
  const finalLabel = useMemo([hour, minute, isModified], (h, m, mod) => {
    if (!mod && placeholder) return placeholder;
    const hh = h.padStart(2, '0');
    const mm = m.padStart(2, '0');
    return `${hh}:${mm}`;
  });

  const hasValue = isModified.map(m => !!m);

  const variantClass = variant === "rounded" ? "rounded-full" : "";
  const triggerSizeClass = size === "xl"
    ? "dropdown-xl"
    : size === "lg"
      ? "dropdown-lg"
      : "";
  const iconSizeClass = size === "xl"
    ? "icon-xl"
    : size === "lg"
      ? "icon-lg"
      : "";

  return div({ class: `timepicker-wrapper ${className}`.trim() }, [
    button({
      id: pickerId,
      class: `dropdown-trigger timepicker-trigger justify-start ${variantClass} ${triggerSizeClass} no-chevron`.trim(),
      style: `anchor-name: ${anchorName}`,
      click: openPopover
    }, [
      span({ class: hasValue.map(h => h ? "" : "text-tertiary") }, finalLabel),
      Icon({ name: "clock", fill: "quaternary", size: iconSizeClass || undefined, class: "ml-auto" })
    ]),

    div({
      ref: popoverRef,
      popover: "auto",
      class: "timepicker-popover popover-base",
      style: `--anchor-id: ${anchorName}`
    }, [
      div({ class: "card column-container shadow gap-0 p-0 bg-base timepicker-card" }, [
        div({ class: "timepicker-display" }, [
          input({
            ref: hourInputRef,
            type: "text",
            class: "time-segment",
            value: hour,
            placeholder: "00",
            input: handleHourInput,
            blur: () => handleBlur('hour'),
            focus: (e) => e.target.select()
          }),
          span({ class: "time-separator" }, ":"),
          input({
            ref: minuteInputRef,
            type: "text",
            class: "time-segment",
            value: minute,
            placeholder: "00",
            input: handleMinuteInput,
            blur: () => handleBlur('minute'),
            focus: (e) => e.target.select()
          })
        ]),

        hr({ class: "no-margin" }),

        div({ class: "row-container justify-center items-center gap-md p-base shrink-0" }, [
          button({ class: "btn btn-flat", click: () => { isModified.set(false); closePopover(); } }, "Clear"),
          button({ class: "btn btn-flat", click: handleNow }, "Now"),
          button({ class: "btn", click: closePopover }, "OK")
        ])
      ])
    ])
  ]);
}
