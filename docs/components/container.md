---
layout: default
title: Container
---

# Container

The layout wrapper used across the system. It maps semantic `type` and `direction` to utility classes.

```js
import { Container } from "@bunnix/components";

Container({ type: "page", direction: "vertical" }, [
  "Content"
]);
```

Props:

- `type`: `main | content | page`
- `direction`: `horizontal | vertical`
- `class`: extra classes
