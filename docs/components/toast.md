---
layout: default
title: Toast
---

# Toast

```js
import { ToastNotification, showToast } from "@bunnix/components";

showToast({ message: "Saved", size: "md" });
```

Render `ToastNotification()` once at app root:

```js
ToastNotification();
```

Sizes:

- `md | lg | xl`
