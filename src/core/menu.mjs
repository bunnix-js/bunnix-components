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
 * - Click outside to close
 * - Action items with optional icons
 * - Divider support for grouping items
 * - Custom trigger support
 */
import Bunnix, { useState, useEffect, useRef, Show } from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";
import { Column, Row } from "./layout.mjs";
import { Button2 } from "./buttons.mjs";
import { Icon2 } from "./media.mjs";
import "./menu.css";

const { div, button } = Bunnix;

const MenuCore = (props, ...children) => {
  const isOpen = useState(false);
  const dropdownRef = useRef(null);
  
  // Resolve items (state or raw value)
  let items = props.items?.get && props.items?.set
    ? props.items.get()
    : props.items ?? [];
  
  // Resolve trigger
  let trigger = props.trigger || "Menu";
  
  delete props.items;
  delete props.trigger;
  
  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen.get() && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        isOpen.set(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, isOpen);
  
  const toggleDropdown = () => {
    isOpen.set(!isOpen.get());
  };
  
  const handleItemClick = (item) => {
    if (item.divider) return;
    
    isOpen.set(false);
    
    if (item.action) {
      item.action();
    }
  };
  
  return div(
    { ...props, class: `menu ${props.class || ""}`, ref: dropdownRef },
    // Trigger
    typeof trigger === "function" ? trigger({ isOpen: isOpen.get(), toggle: toggleDropdown }) : 
      Button2(
        {
          variant: "secondary",
          click: toggleDropdown,
        },
        trigger
      ),
    // Menu
    Show(isOpen, (open) => 
      open && div(
        { class: "menu-items" },
        Column(
          { gap: 0 },
          ...items.map((item) => {
            if (item.divider) {
              return div({ class: "menu-divider" });
            }
            
            return Button2(
              {
                variant: "tertiary",
                click: () => handleItemClick(item),
                padding: false,
              },
              Row(
                { fillWidth: true, alignItems: "center", gap: "small" },
                item.icon && Icon2({ name: item.icon, size: 16 }),
                item.text || item.key,
              ),
            );
          })
        )
      )
    ),
  );
};

/**
 * Menu component with trigger and action items.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.items - Menu items array
 * @param {string} props.items[].key - Unique identifier for the item
 * @param {string} props.items[].text - Display text for the item
 * @param {string} [props.items[].icon] - Optional icon name from registry
 * @param {Function} [props.items[].action] - Optional action to run on click
 * @param {boolean} [props.items[].divider] - If true, renders a divider
 * @param {*} [props.trigger] - Trigger element or function that receives {isOpen, toggle}
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Children elements
 * @returns {*} Menu component
 */
export const Menu = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    MenuCore(finalProps, ...children),
  )(props, ...children),
);
