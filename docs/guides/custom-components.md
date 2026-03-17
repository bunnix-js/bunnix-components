---
layout: default
title: Custom Components
---

# Custom Components

You can build custom UI using the same utilities and tokens.

```js
import { Icon, Row, Text } from "@bunnix/components";

export default function Tag({ label }) {
  return Row(
    { class: "card", padding: "small", gap: "small", alignItems: "center" },
    Icon({ name: "tag", size: 14, color: "secondary" }),
    Text(label),
  );
}
```

Tips:

- Prefer utility classes instead of writing new CSS.
- Reuse token variables from `src/styles/variables.css`.
- Keep size vocabulary consistent: `xsmall | small | regular | large | xlarge`.
