import Bunnix, { useRef } from "@bunnix/core";
const { div, button, hr, span } = Bunnix;

let menuCounter = 0;

export default function PopoverMenu({
  trigger,
  items = [],
  id,
  align = "left",
  size,
  onSelect,
  class: className = ""
}) {
  const popoverRef = useRef(null);

  const menuId = id || `menu-instance-${++menuCounter}`;
  const anchorName = `--${menuId}`;

  const handleToggle = (e) => {
    const popover = popoverRef.current;
    if (!popover) return;

    if (popover.matches(":popover-open")) {
      popover.hidePopover();
    } else {
      popover.showPopover();
    }
  };

  const handleItemClick = (item) => {
    if (item?.click) item.click();
    if (onSelect) onSelect(item);
    const popover = popoverRef.current;
    if (popover) {
      popover.hidePopover();
    }
  };

  const sizeClass = size === "lg" ? "btn-lg" : size === "xl" ? "btn-xl" : "";
  const iconSizeClass = size === "lg" ? "icon-lg" : size === "xl" ? "icon-xl" : "";

  return div({ class: "menu-wrapper" }, [
    button({
      id: menuId,
      style: `anchor-name: ${anchorName}`,
      class: `btn btn-flat ${sizeClass} ${className}`.trim(),
      click: handleToggle
    }, trigger),

    div({
      ref: popoverRef,
      popover: "auto",
      class: `menu-popover popover-base menu-anchor-${align}`, 
      style: `--anchor-id: ${anchorName}`
    }, [
      /* All design system styles go here to avoid overriding popover visibility */
      div({ class: "card column-container shadow gap-sm w-min-150 p-sm bg-base" },
        items.map((item) => {
          if (item.isSeparator) {
            return hr({ class: "no-margin" });
          }
          return button({
            class: `btn btn-flat justify-start w-full ${sizeClass}`.trim(),
            click: () => handleItemClick(item)
          }, [
            item.icon ? span({ class: `icon ${iconSizeClass} ${item.icon} ${item.destructive ? 'bg-destructive' : 'bg-primary'}`.trim() }) : null,
            item.title
          ]);
        })
      )
    ])
  ]);
}
