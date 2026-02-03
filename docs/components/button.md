---
layout: default
title: Button
---

# Button

```js
import { Button, Icon } from "@bunnix/components";

Button({ variant: "regular", size: "regular" }, [
  Icon({ name: "star", fill: "white" }),
  "Star"
]);
```

Props (common):

- `variant`: `regular | flat | outline | destructive | hyperlink`
- `size`: `xsmall | small | regular | large | xlarge` (regular default)
- `disabled`: boolean
- `onClick` / `click`
