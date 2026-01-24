import Bunnix, { useRef, useState, useMemo } from "@bunnix/core";
const { div, button, hr, span } = Bunnix;

let dropdownCounter = 0;

export default function DropdownMenu({
  items = [],
  id,
  align = "left",
  placeholder = "Select option...",
  size,
  class: className = ""
}) {
  const popoverRef = useRef(null);
  const dropdownId = id || `dropdown-instance-${++dropdownCounter}`;
  const anchorName = `--${dropdownId}`;
  
  const initialItem = items.find(item => item.selected) || null;
  const selectedItem = useState(initialItem);

  // Computed signals for the trigger's internal state
  const hasSelection = selectedItem.map(s => !!s);
  const currentTitle = selectedItem.map(s => s ? s.title : placeholder);
  const currentIcon = selectedItem.map(s => s ? s.icon : "");
  const isDestructive = selectedItem.map(s => s ? !!s.destructive : false);

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
    if (item?.click) {
      item.click();
    }
    const popover = popoverRef.current;
    if (popover) {
      popover.hidePopover();
    }
  };

  const sizeClass = size === "lg" ? "dropdown-lg" : size === "xl" ? "dropdown-xl" : "";
  const itemSizeClass = size === "lg" ? "btn-lg" : size === "xl" ? "btn-xl" : "";
  const iconSizeClass = size === "lg" ? "icon-lg" : size === "xl" ? "icon-xl" : "";

  return div({ class: "menu-wrapper" }, [
    button({
      id: dropdownId,
      style: `anchor-name: ${anchorName}`,
      class: `dropdown-trigger justify-start ${sizeClass} ${className}`.trim(),
      click: handleToggle
    }, [
      // The "fixed" elements with reactive attributes/content
      div({ class: "row-container items-center gap-sm no-margin" }, [
        // Icon span: fixed element, reactive class attribute
        span({ 
          class: useMemo([currentIcon, isDestructive], (icon, destructive) => 
            `icon ${iconSizeClass} ${icon} ${destructive ? 'bg-destructive' : 'bg-primary'} ${!icon ? 'hidden' : ''}`.trim()
          ) 
        }),
        // Title: reactive text content
        span({ class: hasSelection.map(sel => sel ? "" : "text-secondary") }, currentTitle)
      ])
    ]),

    div({
      ref: popoverRef,
      popover: "auto",
      class: `menu-popover menu-anchor-${align}`,
      style: `--anchor-id: ${anchorName}`
    }, [
      div({ class: "card column-container shadow gap-sm w-min-150 p-sm bg-base" },
        items.map((item) => {
          if (item.isSeparator) {
            return hr({ class: "no-margin" });
          }
          
          const isCurrent = selectedItem.map(s => s?.title === item.title);
          const iconTint = isCurrent.map(active => {
            if (active) return "bg-white";
            return item.destructive ? "bg-destructive" : "bg-primary";
          });
          
          return button({
            class: isCurrent.map(active => `btn btn-flat justify-start w-full ${itemSizeClass} ${active ? 'selected' : ''}`.trim()),
            click: () => handleItemClick(item)
          }, [
            span({ class: iconTint.map(tint => `icon ${iconSizeClass} ${item.icon} ${tint}`.trim()) }),
            item.title
          ]);
        })
      )
    ])
  ]);
}
