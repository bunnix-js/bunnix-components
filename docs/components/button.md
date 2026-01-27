---
layout: default
title: Button
---

# Button

```js
import { Button, Icon } from "@bunnix/components";

Button({ variant: "regular", size: "md" }, [
  Icon({ name: "star", fill: "white" }),
  "Star"
]);
```

Props (common):

- `variant`: `regular | flat | outline | destructive | hyperlink`
- `size`: `sm | md | lg | xl` (md default)
- `disabled`: boolean
- `onClick` / `click`
