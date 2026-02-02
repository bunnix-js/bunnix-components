---
layout: default
title: Sidebar
---

# Sidebar

```js
import { Sidebar } from "@bunnix/components";
import { useState } from "@bunnix/core";

const page = useState("typography");

const items = [
  { id: "typography", label: "Typography", icon: "text" },
  { id: "colors", label: "Colors", icon: "palette" },
  { isHeader: true, label: "Components" },
  {
    id: "components",
    label: "Components",
    icon: "cube",
    isExpanded: true,
    children: [
      { id: "components-button", label: "Button", icon: "button" },
      { id: "components-icon", label: "Icon", icon: "star" },
    ],
  },
];

Sidebar({
  items,
  selection: page,
  onItemSelect: (id) => page.set(id),
  searchable: true,
});
```

Props (common):

- `items`: `SidebarItem[]`
- `selection`: `string | state` (reactive state supported)
- `onItemSelect`: `(id?: string) => void`
- `searchable`: `boolean`
- `searchProps`: `Record<string, unknown>` (passed to `SearchBox`)
- `leading`: `children | (() => children)`
- `trailing`: `children | (() => children)`

`SidebarItem`:

- `id`: `string`
- `label`: `string`
- `icon`: `string` (`"person"` becomes `"icon-person"`, or pass `"icon-person"` directly)
- `href`: `string | null` (defaults to `#${id}`; set to `null` to skip hash updates)
- `badge`: `string | number | { value, tone, variant, size }`
- `children`: `SidebarItem[]`
- `isExpanded`: `boolean` (initial expand state when item has children)
- `isHeader`: `boolean`
- `isSeparator`: `boolean`
