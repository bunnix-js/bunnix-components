---
layout: default
title: Custom Components
---

# Custom Components

You can build custom UI using the same utilities and tokens.

```js
import Bunnix from "@bunnix/core";
const { div, span } = Bunnix;

export default function Tag({ label }) {
  return div({ class: "card row-container gap-sm items-center" }, [
    span({ class: "icon icon-tag icon-base icon-sm" }),
    span({ class: "text-primary text-sm" }, label)
  ]);
}
```

Tips:

- Prefer utility classes instead of writing new CSS.
- Reuse token variables from `src/styles/variables.css`.
- Keep size vocabulary consistent: `xsmall | small | regular | large | xlarge`.
