---
layout: default
title: Sidebar
---

# Sidebar

```js
import { Sidebar } from "@bunnix/components";
import { useState } from "@bunnix/core";

const selection = useState("components");

const items = [
  { key: "home", text: "Home", icon: "home" },
  { key: "header-components", text: "Components", isHeader: true },
  {
    key: "components",
    text: "Components",
    icon: "columns-layout",
    children: [
      { key: "buttons", text: "Buttons" },
      { key: "inputs", text: "Inputs" },
    ],
  },
  { key: "settings", text: "Settings", icon: "settings" },
];

Sidebar({ items, selection });
```

Props:

- `items`: `SidebarItem[] | StateLike<SidebarItem[]>`
- `selection`: `string | null | StateLike<string | null>`

`SidebarItem`:

- `key`: `string`
- `text`: `string`
- `icon?`: `string`
- `isHeader?`: `boolean`
- `children?`: `SidebarItem[]`
- `expanded?`: `boolean`

Behavior:

- Header items render as non-clickable section labels.
- Leaf items render as selectable buttons.
- Items with `children` render a chevron on the right.
- Only root-level items render leading icons; nested children ignore `icon`.
- Parent items remain selectable.
- Clicking a parent item updates `selection` to the parent `key` and toggles its expanded state.
- Clicking a child item only updates `selection` to the child `key`.
- Nested groups default to collapsed unless their own `key` is the selected key.
- `expanded` seeds the initial open state for nested groups when the parent is not the selected key; later expand/collapse state is managed internally by `Sidebar`.
- Selecting a child key does not auto-expand ancestor groups.
