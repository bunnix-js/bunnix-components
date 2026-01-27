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
- `size`: `sm | md | lg | xl` (md default)
- `variant`: regular | rounded
