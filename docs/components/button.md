---
layout: default
title: Button
---

# Button

```js
import { Button, Icon } from "@bunnix/components";

Button({ click: () => console.log("Saved") }, "Save");
Button(
  Icon({ name: "star", color: "primary-inverted" }),
  "Star"
);
```

Renders a native `<button>` with `type="button"` by default. Omitting `variant` renders the `primary` style.

Props:

- `variant`: `primary | secondary | tertiary | quaternary | danger` (`primary` default)
- `disabled`: `boolean | StateLike<boolean>` — blocks interaction when truthy
- `click`: `(event) => void` — click handler
- `outline`: show a focus outline (default: no outline)
- `padding`: apply default padding (default: true)
- `minHeight`, `textSize`: layout defaults (`32`, `"1rem"`)

Variants:

- `primary`: filled button, default when `variant` is omitted
- `secondary`: bordered button on the default background
- `tertiary`: transparent button, solid `bg-secondary` fill on hover
- `quaternary`: same transparent base as `tertiary`, but the hover is a transparent blend of the primary foreground token, so it tints any background instead of painting a solid fill
- `danger`: destructive action styling

Behavior:

- `disabled` is passed through as received and also accepts a reactive state object.
- Hover styles do not apply while disabled.
- Combine with `Icon` for labeled buttons with leading icons:

```js
Button(
  Icon({ name: "checkmark", size: 16 }),
  "With Icon"
);
Button(
  { variant: "quaternary" },
  Icon({ name: "star", size: 16 }),
  "Quaternary Star"
);
```
