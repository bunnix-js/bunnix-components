import Bunnix, { useRef, useState, useMemo } from "@bunnix/core";
const { div, button, span, hr, input } = Bunnix;

const formatSegment = (val) => val.toString().padStart(2, '0');

export default function TimePicker({
  id,
  placeholder,
  class: className = ""
} = {}) {
  const popoverRef = useRef(null);
  const hourInputRef = useRef(null);
  const minuteInputRef = useRef(null);
  const pickerId = id || `timepicker-${Math.random().toString(36).slice(2, 8)}`;
  const anchorName = `--${pickerId}`;

  // State
  const hour = useState(new Date().getHours());
  const minute = useState(new Date().getMinutes());
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
    const now = new Date();
    hour.set(now.getHours());
    minute.set(now.getMinutes());
    isModified.set(true);
  };

  const handleHourInput = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    if (val > 23) val = 23;
    if (val < 0) val = 0;
    hour.set(val);
    isModified.set(true);
    if (e.target.value.length >= 2) {
      minuteInputRef.current?.focus();
      minuteInputRef.current?.select();
    }
  };

  const handleMinuteInput = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    if (val > 59) val = 59;
    if (val < 0) val = 0;
    minute.set(val);
    isModified.set(true);
  };

  // Reactive display label for the trigger
  const displayLabel = useMemo([hour, minute, isModified], (h, m, mod) => {
    if (mod) return `${formatSegment(h)}:${formatSegment(m)}`;
    if (placeholder) return placeholder;
    
    // Dynamic fallback to current time
    const now = new Date();
    return `${formatSegment(now.getHours())}:${formatSegment(now.getMinutes())}`;
  });

  const hasValue = isModified.map(m => !!m);

  return div({ class: `timepicker-wrapper ${className}`.trim() }, [
    button({
      id: pickerId,
      class: "dropdown-trigger timepicker-trigger justify-start",
      style: `anchor-name: ${anchorName}`,
      click: openPopover
    }, [
      span({ class: hasValue.map(h => h ? "" : "text-tertiary") }, displayLabel)
    ]),

    div({
      ref: popoverRef,
      popover: "auto",
      class: "timepicker-popover",
      style: `--anchor-id: ${anchorName}`
    }, [
      div({ class: "card column-container shadow gap-0 p-0 bg-base timepicker-card" }, [
        // Header: Digital Display
        div({ class: "timepicker-display" }, [
          input({ 
            ref: hourInputRef,
            type: "text",
            class: "time-segment",
            value: hour.map(formatSegment),
            input: handleHourInput,
            focus: (e) => e.target.select()
          }),
          span({ class: "time-separator" }, ":"),
          input({ 
            ref: minuteInputRef,
            type: "text",
            class: "time-segment",
            value: minute.map(formatSegment),
            input: handleMinuteInput,
            focus: (e) => e.target.select()
          })
        ]),

        hr({ class: "no-margin" }),

        // Footer: Actions
        div({ class: "row-container justify-between items-center timepicker-footer" }, [
          button({ class: "btn btn-flat", click: () => { isModified.set(false); closePopover(); } }, "Clear"),
          div({ class: "row-container gap-sm no-margin" }, [
            button({ class: "btn btn-flat", click: handleNow }, "Now"),
            button({ class: "btn", click: closePopover }, "OK")
          ])
        ])
      ])
    ])
  ]);
}