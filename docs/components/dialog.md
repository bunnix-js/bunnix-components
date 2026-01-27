---
layout: default
title: Dialog
---

# Dialog

```js
import { Dialog, showDialog } from "@bunnix/components";

showDialog({
  title: "Confirm",
  message: "Are you sure?",
  confirmation: { text: "OK" }
});
```

Render `Dialog()` once at app root:

```js
Dialog();
```
