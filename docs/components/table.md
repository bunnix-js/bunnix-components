---
layout: default
title: Table
---

# Table

```js
import { Table } from "@bunnix/components";

Table({
  columns: [
    { field: "name", label: "Name" },
    { field: "role", label: "Role" }
  ],
  data: [
    { name: "Alex", role: "Developer" },
    { name: "Sam", role: "Designer" }
  ]
});
```

Props (common):

- `columns`: array of column configs
- `data`: array of row objects
- `sortable`: array of sortable configs
- `variant`: regular | background | bordered
