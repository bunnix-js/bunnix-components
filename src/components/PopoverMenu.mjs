import Bunnix, { useRef } from "@bunnix/core";
import { resolveIconName } from "../utils/iconUtils.mjs";
import { clampSize, toSizeToken } from "../utils/sizeUtils.mjs";
import Icon from "./Icon.mjs";
const { div, button, hr } = Bunnix;

let menuCounter = 0;

export default function PopoverMenu(
  {
    trigger,
    menuItems = [],
    id,
    align = "left",
    size,
    onSelect,
    class: className = "",
  } = {},
  children,
) {
  const normalizeSize = (value) =>
    clampSize(value, ["xsmall", "small", "regular", "large", "xlarge"], "regular");
  const normalizedSize = normalizeSize(size);
  const sizeToken = toSizeToken(normalizedSize);
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

  const sizeClass =
    sizeToken === "lg"
      ? "btn-lg"
      : sizeToken === "xl"
        ? "btn-xl"
        : "";
  const iconSizeValue = normalizedSize;

  const triggerProps = {
    id: menuId,
    type: 'button',
    style: `anchor-name: ${anchorName}`,
    class: `btn btn-flat ${sizeClass} ${className}`.trim(),
    click: handleToggle,
  };

  // Determine what to use as trigger:
  // 1. If children are provided, use children as trigger content
  // 2. Otherwise use trigger prop
  const hasTriggerContent =
    children !== undefined &&
    children !== null &&
    (Array.isArray(children) ? children.length > 0 : true);

  const resolvedTrigger = hasTriggerContent ? children : trigger;

  // If trigger is a function, call it to get the content, then wrap in button
  // Otherwise use the trigger/children directly as content
  const triggerContent =
    typeof resolvedTrigger === "function" ? resolvedTrigger() : resolvedTrigger;

  const triggerElement = button(triggerProps, triggerContent);

  return div({ class: "menu-wrapper" }, [
    triggerElement,

    div(
      {
        ref: popoverRef,
        popover: "auto",
        class: `menu-popover popover-base menu-anchor-${align}`,
        style: `--anchor-id: ${anchorName}`,
      },
      [
        /* All design system styles go here to avoid overriding popover visibility */
        div(
          {
            class: "card column-container shadow gap-sm w-min-150 p-sm bg-base",
          },
          menuItems.map((item) => {
            if (item.isSeparator) {
              return hr({ class: "no-margin" });
            }
            return button(
              {
                class: `btn btn-flat justify-start w-full ${sizeClass}`.trim(),
                click: () => handleItemClick(item),
              },
              [
                item.icon
                  ? Icon({
                      name: resolveIconName(item.icon),
                      fill: item.destructive ? "destructive" : "base",
                      size: iconSizeValue,
                    })
                  : null,
                item.title,
              ],
            );
          }),
        ),
      ],
    ),
  ]);
}
