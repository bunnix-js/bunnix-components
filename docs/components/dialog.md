---
layout: default
title: Dialog
---

# Dialog

```js
import { useDialog, Text } from "@bunnix/components";

const { Dialog, showDialog } = useDialog();

showDialog({
  title: "Confirm",
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

`padding` overrides the dialog section padding, while `width` and `height` force fixed modal dimensions. When a fixed height causes overflow, only the contents area scrolls vertically.

Render `Dialog()` once at app root:

```js
Dialog();
```
