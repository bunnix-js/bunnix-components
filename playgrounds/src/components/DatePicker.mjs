import Bunnix, { ForEach, useMemo, useRef, useState } from "@bunnix/core";
const { div, button, span, hr } = Bunnix;

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const isSameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const toMidnight = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const formatDate = (date, formatter) => (date ? formatter.format(date) : "");

const buildCalendar = (viewDate) => {
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
  placeholder = "Select date",
  range = false,
  class: className = ""
} = {}) {
  const popoverRef = useRef(null);
  const pickerId = id || `datepicker-${Math.random().toString(36).slice(2, 8)}`;
  const anchorName = `--${pickerId}`;

  const formatter = (() => {
    try {
      return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });
    } catch (error) {
      return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" });
    }
  })();

  const selectedStart = useState(null);
  const selectedEnd = useState(null);
  const inputValue = useState("");

  const viewDate = useState(new Date());

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

  const setSelection = (start, end = null) => {
    selectedStart.set(start);
    selectedEnd.set(end);
    if (range) {
      const startText = formatDate(start, formatter);
      const endText = end ? formatDate(end, formatter) : "";
      inputValue.set(endText ? `${startText} - ${endText}` : startText);
    } else {
      inputValue.set(formatDate(start, formatter));
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
    setSelection(today, range ? null : null);
    viewDate.set(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  // Reactive state for the trigger
  const hasValue = inputValue.map(v => !!v);
  const displayLabel = inputValue.map(v => v || placeholder);

  return div({ class: `datepicker-wrapper ${className}`.trim() }, [
    button({
      id: pickerId,
      class: "dropdown-trigger justify-start",
      style: `anchor-name: ${anchorName}`,
      click: openPopover
    }, [
      div({ class: "row-container items-center gap-sm no-margin" }, [
        span({ class: "icon icon-calendar bg-base" }),
        span({ class: hasValue.map(h => h ? "" : "text-secondary") }, displayLabel)
      ])
    ]),
    div({
      ref: popoverRef,
      popover: "auto",
      class: "datepicker-popover",
      style: `--anchor-id: ${anchorName}`
    }, [
      div({ class: "card column-container shadow gap-sm w-min-150 p-sm bg-base datepicker-card" }, [
        div({ class: "row-container items-center justify-between datepicker-header" }, [
          button({ class: "btn btn-flat datepicker-nav", click: handlePrevMonth }, [
            span({ class: "icon icon-chevron-left bg-base" })
          ]),
          span({ class: "datepicker-title" }, monthLabel),
          button({ class: "btn btn-flat datepicker-nav", click: handleNextMonth }, [
            span({ class: "icon icon-chevron-right bg-base" })
          ])
        ]),
        div({ class: "datepicker-body" }, [
          div({ class: "datepicker-weekdays" }, WEEKDAYS.map((day) =>
            span({ class: "datepicker-weekday" }, day)
          )),
          div({ class: "datepicker-grid" }, [
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
                "p-xs",
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
          ])
        ]),
        hr({ class: "no-margin" }),
        div({ class: "row-container justify-center datepicker-footer" }, [
          button({ class: "btn btn-flat datepicker-action", click: handleToday }, "Today")
        ])
      ])
    ])
  ]);
}