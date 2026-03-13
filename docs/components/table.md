---
layout: default
title: Table
---

# Table

```js
import { Table, Text } from "@bunnix/components";

const rows = [
  { name: "Alice", role: "Developer", status: "Active" },
  { name: "Bob", role: "Designer", status: "Active" },
  { name: "Charlie", role: "Manager", status: "Inactive" },
];

Table({
  headers: [
    { content: "Name", key: "name", size: 180 },
    { content: "Role", key: "role", size: 180 },
    { content: "Status", key: "status", size: 120 },
  ],
  rows,
  renderCell: (record, rowIndex, field) => {
    if (field === "status") {
      return Text(
        {
          weight: "heavy",
          color: record.status === "Active" ? "success" : "secondary",
        },
        record.status,
      );
    }

    if (field === "name") {
      return `${rowIndex + 1}. ${record.name}`;
    }
  },
});
```

## Props

- `headers`: Array of column definitions with:
  - `content`: header cell content
  - `key`: record field name used for body cells
  - `size`: optional column width (`number` in pixels or CSS string)
- `rows`: Array of data records rendered in header order
- `hideHeaders`: optional boolean that removes the visible header row while preserving column sizing
- `renderCell`: optional callback `(record, rowIndex, field) => BunnixChild`
  - called for each keyed body cell
  - when it returns `undefined`, the table falls back to `record[field]`

`Table` also accepts layout props such as `width`, `height`, `margin`, `padding`, and `border`.
