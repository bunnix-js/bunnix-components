---
layout: default
title: Search Box
---

# Search Box

```js
import { SearchBox } from "@bunnix/components";

SearchBox({
  data: [
    { title: "Users", snippet: "Manage users", icon: "person" },
    { title: "Settings", snippet: "Configure app", icon: "gear" }
  ]
});
```

Props:

- `data`: array of { title, snippet, icon }
- `size`: `xsmall | small | regular | large | xlarge` (regular default)
- `variant`: regular | rounded
