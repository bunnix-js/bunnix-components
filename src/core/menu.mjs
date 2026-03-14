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
 * - Browser-native dismiss (click outside, Escape key, page scroll)
 * - Action items with optional icons
 * - Divider support for grouping items
 * - Custom trigger support
 */
import Bunnix, { useState, useEffect, useRef, Show } from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";
import { Column, Row } from "./layout.mjs";
import { Button } from "./buttons.mjs";
import { Icon } from "./media.mjs";
import { Text } from "./typography.mjs";
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

  // Resolve anchor position (support both kebab-case and camelCase for backward compatibility)
  let anchorInput = props.anchor || "bottom-left";
  const anchorMap = {
    "bottom-left": "bottomLeft",
    "bottom-right": "bottomRight",
    "top-left": "topLeft",
    "top-right": "topRight",
    "bottomLeft": "bottomLeft",
    "bottomRight": "bottomRight",
    "topLeft": "topLeft",
    "topRight": "topRight",
  };
  let anchor = anchorMap[anchorInput] || "bottomLeft";

  delete props.items;
  delete props.trigger;
  delete props.anchor;

  // Sync isOpen state from popover toggle events & close on scroll
  // Handles browser auto-dismiss (click outside, Escape key) + scroll-away behavior
  // Uses queueMicrotask to defer listener attachment until after popoverRef is assigned by bunnixToDOM
  useEffect(() => {
    queueMicrotask(() => {
      const el = popoverRef.current;
      if (!el) return;

      // Close menu when page scrolls (capture phase for early detection)
      const handleScroll = () => {
        el.hidePopover();
      };

      // Sync state when popover opens/closes, manage scroll listener lifecycle
      const handleToggle = (e) => {
        const open = e.newState === "open";
        isOpen.set(open);
        if (open) {
          // Attach scroll listener when menu opens
          window.addEventListener("scroll", handleScroll, true);
        } else {
          // Remove scroll listener when menu closes (click outside, Escape, item click, etc.)
          window.removeEventListener("scroll", handleScroll, true);
        }
      };

      el.addEventListener("toggle", handleToggle);
      // Toggle listener lives with the element and is GC'd when element is removed
      // Scroll listener is self-managed: attached on open, removed on close
    });
  });

  const computeMenuPos = (rect, anchor) => {
    const GAP = 4;
    // clientWidth/clientHeight exclude scrollbar width — matches getBoundingClientRect() coordinate space.
    // window.innerWidth/innerHeight include scrollbar and would produce a consistent gap on the right/bottom.
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    switch (anchor) {
      case "bottomRight":
        return {
          top: `${rect.bottom + GAP}px`,
          left: "auto",
          bottom: "auto",
          right: `${vw - rect.right}px`,
        };
      case "topLeft":
        return {
          top: "auto",
          left: `${rect.left}px`,
          bottom: `${vh - rect.top + GAP}px`,
          right: "auto",
        };
      case "topRight":
        return {
          top: "auto",
          left: "auto",
          bottom: `${vh - rect.top + GAP}px`,
          right: `${vw - rect.right}px`,
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
      // Measure the trigger element (first child), not the wrapper, for accurate right-edge alignment
      const triggerEl = triggerRef.current.firstElementChild ?? triggerRef.current;
      const rect = triggerEl.getBoundingClientRect();
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
              Text({ weight: "heavy" }, item.text || item.key),
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
 * Menu also closes automatically when the page scrolls.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.items - Menu items array
 * @param {string} props.items[].key - Unique identifier for the item
 * @param {string} props.items[].text - Display text for the item
 * @param {string} [props.items[].icon] - Optional official Framework7 icon name
 * @param {Function} [props.items[].action] - Optional action to run on click
 * @param {boolean} [props.items[].divider] - If true, renders a divider
 * @param {*} [props.trigger] - Trigger element or function that receives {isOpen, toggle}
 * @param {string} [props.anchor="bottom-left"] - Menu anchor position: "bottom-left" | "bottom-right" | "top-left" | "top-right" (or camelCase variants for backward compatibility)
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements
 * @returns {*} Menu component
 */
export const Menu = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    MenuCore(finalProps, ...children),
  )(props, ...children),
);
