/**
 * Sidebar Components (Next-Gen Core)
 *
 * Sidebar navigation component with items and selection state.
 *
 * Components:
 * - Sidebar2: Sidebar navigation with headers and clickable items
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
import { Button2 } from "./buttons.mjs";
import { Icon2 } from "./media.mjs";
import { Heading } from "./typography.mjs";

const Sidebar2Core = (props, ...children) => {
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
            Button2(
              {
                variant: selected === item.key ? "primary" : "tertiary",
                click: () => selectedValue.set(item.key),
              },
              Row(
                { fillWidth: true, alignItems: "center" },
                item.icon && Icon2({ 
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

export const Sidebar2 = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    Sidebar2Core(finalProps, ...children),
  )({ padding: "regular", ...props }, ...children),
);
