import Bunnix, { useRef, useState, useMemo, Show } from "@bunnix/core";
import { clampSize, toSizeToken, normalizeSize } from "../utils/sizeUtils.mjs";
import { resolveIconName } from "../utils/iconUtils.mjs";
import Icon from "./Icon.mjs";
const { div, button, hr, span } = Bunnix;

let dropdownCounter = 0;

export default function DropdownMenu({
  items = [],
  id,
  align = "left",
  placeholder = "Select option...",
  size,
  onSelect,
  class: className = ""
}) {
  // DropdownMenu supports all sizes
  const normalizeSize = (value) => clampSize(value, ["xsmall", "small", "regular", "large", "xlarge"], "regular");
  const normalizedSize = normalizeSize(size);
  const sizeToken = toSizeToken(normalizedSize);
  const popoverRef = useRef(null);
  const dropdownId = id || `dropdown-instance-${++dropdownCounter}`;
  const anchorName = `--${dropdownId}`;
  
  const initialItem = items.find(item => item.selected) || null;
  const selectedItem = useState(initialItem);
  const hasSelection = selectedItem.map(s => !!s);
  const currentTitle = selectedItem.map(s => s ? s.title : placeholder);
  const selectedIconName = selectedItem.map(s => resolveIconName(s?.icon));
  const selectedIconFill = selectedItem.map(s => s?.destructive ? "destructive" : "base");
  const hasSelectedIcon = selectedItem.map(s => !!s?.icon);

  const handleToggle = () => {
    const popover = popoverRef.current;
    if (!popover) return;
    if (popover.matches(":popover-open")) {
      popover.hidePopover();
    } else {
      popover.showPopover();
    }
  };

  const handleItemClick = (item) => {
    selectedItem.set(item);
    if (item?.click) item.click();
    if (onSelect) onSelect(item);
    const popover = popoverRef.current;
    if (popover) {
      popover.hidePopover();
    }
  };

  const sizeClass = sizeToken === "lg" ? "dropdown-lg" : sizeToken === "xl" ? "dropdown-xl" : "";
  const itemSizeClass = sizeToken === "lg" ? "btn-lg" : sizeToken === "xl" ? "btn-xl" : "";
  const iconSize = normalizeSize(normalizedSize);

  return div({ class: "menu-wrapper" }, [
    button({
      id: dropdownId,
      style: `anchor-name: ${anchorName}`,
      class: `dropdown-trigger justify-start ${sizeClass} ${className}`.trim(),
      click: handleToggle
    }, [
      // Reactive Icon
      Show(
        hasSelectedIcon,
        Icon({ name: selectedIconName, fill: selectedIconFill, size: iconSize })
      ),
      // Reactive Title: text with dimmed style when empty
      span({ class: hasSelection.map(selected => selected ? "" : "text-secondary") }, currentTitle)
    ]),

    div({
      ref: popoverRef,
      popover: "auto",
      class: `menu-popover popover-base menu-anchor-${align}`,
      style: `--anchor-id: ${anchorName}`
    }, [
      div({ class: "card column-container shadow gap-sm w-min-150 p-sm bg-base" },
        items.map((item) => {
          if (item.isSeparator) {
            return hr({ class: "no-margin" });
          }
          
          const isCurrent = selectedItem.map(s => s?.title === item.title);
          
          return button({
            class: isCurrent.map(active => `btn btn-flat justify-start w-full ${itemSizeClass} ${active ? 'selected' : ''}`.trim()),
            click: () => handleItemClick(item)
          }, [
            item.icon
              ? Icon({
                  name: resolveIconName(item.icon),
                  fill: isCurrent.map(active => active ? "white" : item.destructive ? "destructive" : "base"),
                  size: iconSize,
                })
              : null,
            item.title
          ]);
        })
      )
    ])
  ]);
}
