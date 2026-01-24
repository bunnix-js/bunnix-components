import Bunnix, { useRef } from "@bunnix/core";
const { div, button, hr, span } = Bunnix;

let menuCounter = 0;

export default function PopoverMenu({ trigger, items = [], id, align = "left" }) {
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
    if (item?.click) {
      item.click();
    }
    const popover = popoverRef.current;
    if (popover) {
      popover.hidePopover();
    }
  };

  const renderIcon = (iconName, colorClass = "bg-primary") => {
    if (!iconName) return null;
    return span({ class: `icon ${iconName} ${colorClass}` });
  };

  return div({ class: "menu-wrapper" }, [
    button({
      id: menuId,
      style: `anchor-name: ${anchorName}`,
      class: "btn btn-flat",
      click: handleToggle
    }, trigger),

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
          return button({
            class: "btn btn-flat justify-start w-full",
            click: () => handleItemClick(item)
          }, [
            renderIcon(item.icon, item.destructive ? "bg-destructive" : "bg-primary"),
            item.title
          ]);
        })
      )
    ])
  ]);
}
