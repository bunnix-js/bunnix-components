/**
 * Menu Components (Next-Gen Core)
 *
 * Menu component with action items and dividers.
 *
 * Components:
 * - Menu: Menu container with trigger and items
 *
 * Features:
 * - Automatic open/close state management
 * - Popover API for overflow-safe rendering (CSS Top Layer)
 * - Browser-native dismiss (click outside, Escape key)
 * - Action items with optional icons
 * - Divider support for grouping items
 * - Custom trigger support
 */
import Bunnix, { useState, useEffect, useRef, Show } from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";
import { Column, Row } from "./layout.mjs";
import { Button } from "./buttons.mjs";
import { Icon } from "./media.mjs";
import "./menu.css";

const { div } = Bunnix;

const MenuCore = (props, ...children) => {
  const isOpen = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  // Resolve items (state or raw value)
  let items = props.items?.get && props.items?.set
    ? props.items.get()
    : props.items ?? [];

  // Resolve trigger
  let trigger = props.trigger || "Menu";

  // Resolve anchor position
  let anchor = props.anchor || "bottomLeft";

  delete props.items;
  delete props.trigger;
  delete props.anchor;

  // Sync isOpen state from popover toggle events
  // Handles browser auto-dismiss (click outside, Escape key)
  useEffect(() => {
    const el = popoverRef.current;
    if (!el) return;
    const handleToggle = (e) => {
      isOpen.set(e.newState === "open");
    };
    el.addEventListener("toggle", handleToggle);
    return () => el.removeEventListener("toggle", handleToggle);
  });

  const computeMenuPos = (rect, anchor) => {
    const GAP = 4;
    switch (anchor) {
      case "bottomRight":
        return {
          top: `${rect.bottom + GAP}px`,
          left: "auto",
          bottom: "auto",
          right: `${window.innerWidth - rect.right}px`,
        };
      case "topLeft":
        return {
          top: "auto",
          left: `${rect.left}px`,
          bottom: `${window.innerHeight - rect.top + GAP}px`,
          right: "auto",
        };
      case "topRight":
        return {
          top: "auto",
          left: "auto",
          bottom: `${window.innerHeight - rect.top + GAP}px`,
          right: `${window.innerWidth - rect.right}px`,
        };
      case "bottomLeft":
      default:
        return {
          top: `${rect.bottom + GAP}px`,
          left: `${rect.left}px`,
          bottom: "auto",
          right: "auto",
        };
    }
  };

  const toggleDropdown = () => {
    if (!isOpen.get()) {
      const rect = triggerRef.current.getBoundingClientRect();
      const pos = computeMenuPos(rect, anchor);
      if (popoverRef.current) {
        Object.assign(popoverRef.current.style, pos);
        popoverRef.current.showPopover();
      }
    } else {
      popoverRef.current?.hidePopover();
    }
  };

  const handleItemClick = (item) => {
    if (item.divider) return;
    popoverRef.current?.hidePopover();
    if (item.action) {
      item.action();
    }
  };

  return div(
    { ...props, class: `menu ${props.class || ""}`, ref: triggerRef },
    // Trigger
    typeof trigger === "function"
      ? trigger({ isOpen: isOpen.get(), toggle: toggleDropdown })
      : Button(
          {
            variant: "secondary",
            click: toggleDropdown,
          },
          trigger
        ),
    // Popover dropdown — always in DOM, shown/hidden via Popover API (CSS Top Layer)
    div(
      { class: "menu-items", popover: "auto", ref: popoverRef },
      Column(
        { gap: 0 },
        ...items.map((item) => {
          if (item.divider) {
            return div({ class: "menu-divider" });
          }

          return Button(
            {
              variant: "tertiary",
              click: () => handleItemClick(item),
              padding: false,
            },
            Row(
              { fillWidth: true, alignItems: "center", gap: "small" },
              item.icon && Icon({ name: item.icon, size: 16 }),
              item.text || item.key,
            ),
          );
        })
      )
    ),
  );
};

/**
 * Menu component with trigger and action items.
 *
 * Uses the HTML Popover API (`popover="auto"`) to render the dropdown in
 * the CSS Top Layer — fully escaping any `overflow: hidden` ancestor.
 * Browser provides native dismiss on click-outside and Escape key.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.items - Menu items array
 * @param {string} props.items[].key - Unique identifier for the item
 * @param {string} props.items[].text - Display text for the item
 * @param {string} [props.items[].icon] - Optional icon name from registry
 * @param {Function} [props.items[].action] - Optional action to run on click
 * @param {boolean} [props.items[].divider] - If true, renders a divider
 * @param {*} [props.trigger] - Trigger element or function that receives {isOpen, toggle}
 * @param {string} [props.anchor="bottomLeft"] - Menu anchor position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements
 * @returns {*} Menu component
 */
export const Menu = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    MenuCore(finalProps, ...children),
  )(props, ...children),
);
