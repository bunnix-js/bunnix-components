import Bunnix, { ForEach, useEffect, useMemo, useRef, useState } from "@bunnix/core";
import { clampSize, toSizeToken } from "../utils/sizeUtils.mjs";
import InputField from "./InputField.mjs";
import Icon from "./Icon.mjs";

const { div, button, span } = Bunnix;

export default function SearchBox({
  data,
  value,
  placeholder = "Search",
  onInput,
  input,
  size,
  variant = "regular",
  class: className = "",
  onSelect,
  select,
  ...rest
} = {}) {
  // SearchBox supports all sizes
  const normalizeSize = (value) => clampSize(value, ["xsmall", "small", "regular", "large", "xlarge"], "regular");
  const normalizedSize = normalizeSize(size);
  const sizeToken = toSizeToken(normalizedSize);
  const sizeClass = sizeToken === "xl" ? "input-xl" : sizeToken === "lg" ? "input-lg" : "";
  const variantClass = variant === "rounded" ? "rounded-full" : "";
  const combinedClass = `${sizeClass} ${variantClass} ${className}`.trim();

  const handleInputExternal = onInput ?? input;
  const handleSelectExternal = onSelect ?? select;

  if (!Array.isArray(data)) {
    return InputField({
      type: "search",
      value,
      placeholder,
      onInput: handleInputExternal,
      class: combinedClass,
      ...rest
    });
  }

  const popoverRef = useRef(null);
  const searchId = `searchbox-${Math.random().toString(36).slice(2, 8)}`;
  const anchorName = `--${searchId}`;
  const internalValue = useState("");
  const activeIndex = useState(-1);
  const valueState = value && typeof value.map === "function" ? value : null;
  const currentValue = valueState ? valueState : (value ?? internalValue);

  const filteredData = useMemo([data, currentValue], (list, query) => {
    const needle = String(query ?? "").trim().toLowerCase();
    if (!needle) return [];
    return (Array.isArray(list) ? list : [])
      .filter((item) => {
        const title = String(item?.title ?? "").toLowerCase();
        const snippet = String(item?.snippet ?? "").toLowerCase();
        return title.includes(needle) || snippet.includes(needle);
      })
      .slice(0, 5);
  });

  const indexedData = useMemo([filteredData], (list) =>
    (list || []).map((item, index) => ({ ...item, __index: index }))
  );

  useEffect((text) => {
    const popover = popoverRef.current;
    if (!popover) return;
    const hasText = String(text ?? "").trim().length > 0;
    const list = indexedData.get();
    const hasItems = Array.isArray(list) && list.length > 0;
    if (hasText && hasItems && !popover.matches(":popover-open")) {
      popover.showPopover();
    } else if ((!hasText || !hasItems) && popover.matches(":popover-open")) {
      popover.hidePopover();
    }
  }, [currentValue]);

  useEffect((list) => {
    if (!Array.isArray(list) || list.length === 0) {
      activeIndex.set(-1);
      return;
    }
    activeIndex.set(0);
  }, [indexedData]);

  const handleInput = (event) => {
    const next = event?.target?.value ?? "";
    if (valueState) {
      valueState.set(next);
    } else if (typeof value === "string") {
      // leave to external control
    } else {
      internalValue.set(next);
    }
    if (handleInputExternal) handleInputExternal(event);
  };

  const handleSelect = (item) => {
    const next = item?.title ?? "";
    if (valueState) {
      valueState.set(next);
    } else if (typeof value === "string") {
      // leave to external control
    } else {
      internalValue.set(next);
    }
    if (handleSelectExternal) handleSelectExternal(item);
    const popover = popoverRef.current;
    if (popover && popover.matches(":popover-open")) {
      popover.hidePopover();
    }
  };

  const itemSizeClass = sizeToken === "lg" ? "btn-lg" : sizeToken === "xl" ? "btn-xl" : "";
  const iconSizeValue = normalizedSize === "small"
    ? "small"
    : normalizedSize === "large"
      ? "large"
      : normalizedSize === "xlarge"
        ? "xlarge"
        : undefined;
  const hasResults = indexedData.map((list) => (list || []).length > 0);

  const handleKeyDown = (event) => {
    if (!event || !Array.isArray(indexedData.get())) return;
    const list = indexedData.get();
    if (list.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const current = activeIndex.get();
      const next = current < 0 ? 0 : Math.min(current + 1, list.length - 1);
      activeIndex.set(next);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const current = activeIndex.get();
      const next = current <= 0 ? 0 : current - 1;
      activeIndex.set(next);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const current = activeIndex.get();
      const item = list[current];
      if (item) handleSelect(item);
      return;
    }
    if (event.key === "Escape") {
      const popover = popoverRef.current;
      if (popover && popover.matches(":popover-open")) {
        popover.hidePopover();
      }
    }
  };

  return div({ class: "menu-wrapper w-full" }, [
    div({ class: "w-full" }, [
      InputField({
        type: "search",
        value: currentValue,
        placeholder,
        onInput: handleInput,
        class: combinedClass,
        keydown: handleKeyDown,
        style: `anchor-name: ${anchorName}`,
        ...rest
      })
    ]),
    div({
      ref: popoverRef,
      popover: "auto",
      class: "menu-popover popover-base menu-anchor-left match-anchor",
      style: `--anchor-id: ${anchorName}`
    }, [
      div({ class: "card column-container shadow gap-sm w-full p-sm bg-base" }, [
        ForEach(indexedData, "key", (item) => (
          button({
            class: activeIndex.map((index) =>
              `btn btn-flat justify-start w-full ${itemSizeClass} ${index === item.__index ? "selected" : ""}`.trim()
            ),
            click: () => handleSelect(item)
          }, [
            item.icon
              ? Icon({ name: item.icon, fill: "tertiary", size: iconSizeValue })
              : null,
            div({ class: "column-container gap-xs" }, [
              span({ class: "text-base" }, item.title ?? ""),
              item.snippet ? span({ class: "text-sm text-secondary" }, item.snippet) : null
            ])
          ])
        ))
      ])
    ])
  ]);
}
