---
layout: default
title: Usage
---

# Usage

This package ships ESM source and CSS utilities. Your bundler must be able to process CSS `url(...)` assets.

Basic usage:

```js
import "@bunnix/components/styles.css";
import { Button, Icon, Text } from "@bunnix/components";

Button({ variant: "regular" }, [
  Icon({ name: "star" }),
  Text({ type: "text" }, "Star")
]);
```

By default, `Text` and `Icon` inherit a button’s foreground color. You can still override per element:

```js
Button({ variant: "outline" }, [
  Icon({ name: "star", fill: "tertiary" }),
  Text({ type: "text", color: "tertiary" }, "Star")
]);
```

Size vocabulary:

- `sm | md | lg | xl`
- `md` is the default.
- Date/Time pickers and Toast do not support `sm` (normalize to `md`).
