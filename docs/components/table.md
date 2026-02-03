---
layout: default
title: Table
---

# Table

```js
import { Table } from "@bunnix/components";

Table({
  columns: [
    { field: "name", label: "Name", size: "auto" },
    { field: "role", label: "Role", size: "30%" }
  ],
  data: [
    { name: "Alex", role: "Developer" },
    { name: "Sam", role: "Designer" }
  ]
});
```

## Props

- `columns`: Array of column configurations
  - `field`: string - Field name in data object
  - `label`: string - Column header label
  - `size`: "auto" | number | string - Column width (auto, pixels, or percentage)
- `data`: Array of row objects or Bunnix.State
- `key`: string - Field name to use as unique row key
- `renderCell`: function - Custom cell renderer `(columnIndex, field, row, column) => BunnixChild`
- `cell`: function - Alias for `renderCell`
- `searchable`: object - Search configuration
  - `field`: string - Field to search in
  - `searchText`: string | Bunnix.State - Search query
- `sortable`: Array of sortable configurations
  - `field`: string - Field to sort by
  - `sortType`: "string" | "number" | "date" - Type of sorting
  - `sorted`: boolean - Initially sorted
  - `direction`: "asc" | "desc" - Initial sort direction
- `selection`: function - Callback when rows are selected `(keys) => void`
- `sort`: function - Custom sort function `(field) => (a, b) => number`
- `variant`: "regular" | "background" | "bordered"
- `interactive`: boolean - Enable hover effects
- `hideHeaders`: boolean - Hide table headers
