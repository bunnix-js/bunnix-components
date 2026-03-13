---
layout: default
title: Dialog
---

# Dialog

```js
import { useDialog, Column, Heading, Icon, Row, Text } from "@bunnix/components";

const { Dialog, showDialog } = useDialog();

showDialog({
  title: Row(
    { gap: 12, alignItems: "center" },
    Icon({ name: "hammer", size: 42, color: "secondary" }),
    Column(
      { gap: 2 },
      Heading({ h3: true }, "Workspace Settings"),
      Text({ color: "secondary" }, "Static configuration preview"),
    ),
  ),
  contents: Text("Are you sure?"),
  padding: "large",
  width: 640,
  height: 320,
  secondary: {
    text: "Cancel",
    variant: "secondary",
    action: () => console.log("Cancelled"),
  },
  confirmation: {
    text: "Delete",
    variant: "danger",
    action: () => console.log("Deleted"),
  },
});
```

`title` accepts either a string or custom content. `padding` overrides the dialog section padding, while `width` and `height` force fixed modal dimensions. When a fixed height causes overflow, only the contents area scrolls vertically.

Render `Dialog()` once at app root:

```js
Dialog();
```
