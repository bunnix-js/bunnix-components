/**
 * Sidebar Components (Next-Gen Core)
 *
 * Sidebar navigation component with items and selection state.
 *
 * Components:
 * - Sidebar: Sidebar navigation with headers and clickable items
 *
 * Features:
 * - State binding for items and selected key
 * - Automatic state resolution (useState object or raw value)
 * - Headers support for grouping items
 * - Icon support for items
 */
import Bunnix, { ForEach, useState, Show } from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles, isStateLike } from "./utils.mjs";
import { Column, Row } from "./layout.mjs";
import { Button } from "./buttons.mjs";
import { Icon } from "./media.mjs";
import { Heading } from "./typography.mjs";

const SidebarCore = (props, ...children) => {
  // Resolve items (state or raw value)
  let itemsValue = props.items?.get && props.items?.set
    ? props.items
    : useState(props.items ?? []);

  // Resolve selected (state or raw value)
  let selectedValue = props.selected?.get && props.selected?.set
    ? props.selected
    : useState(props.selected ?? "");

  delete props.items;
  delete props.selected;

  return Column(
    { ...props },
    ForEach(itemsValue, "key", (item) =>
      item.isHeader
        ? Heading(
            { h4: true, color: "tertiary", textSize: "1rem" },
            item.text,
          )
        : Show(selectedValue, (selected) =>
            Button(
              {
                variant: selected === item.key ? "primary" : "tertiary",
                click: () => selectedValue.set(item.key),
              },
              Row(
                { fillWidth: true, alignItems: "center" },
                item.icon && Icon({
                  size: 20,
                  name: item.icon,
                  ...(selected !== item.key && { color: "secondary" })
                }),
                Row(item.text),
              ),
            )
          ),
    ),
  );
};

/**
 * Sidebar navigation component with item selection state.
 * 
 * @param {Object} props - Component props
 * @param {Array<{key: string, text: string, icon?: string, isHeader?: boolean}>|*} props.items - Navigation items array or state object containing items
 * @param {string|*} props.selected - Currently selected item key or state object for selection
 * @param {string} [props.padding="regular"] - Padding size: "small" | "regular" | "large"
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Child elements
 * @returns {*} Sidebar component
 * 
 * @example
 * const selected = useState("home");
 * Sidebar({
 *   items: [
 *     { key: "home", text: "Home", icon: "home" },
 *     { key: "settings", text: "Settings", icon: "settings", isHeader: true }
 *   ],
 *   selected: selected
 * })
 */
export const Sidebar = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    SidebarCore(finalProps, ...children),
  )({ padding: "regular", ...props }, ...children),
);
