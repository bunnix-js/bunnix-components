---
layout: default
title: CSS & Assets
---

# CSS & Assets

Import the stylesheet once:

```js
import "@bunnix/components/styles.css";
```

This provides component styles, design tokens, and utility classes. Icon assets are referenced by CSS `url(...)` and require bundler asset handling.

Core utilities:

- Layout: `row-container`, `column-container`, `grid-flow`, `gap-*`, `items-*`, `justify-*`
- Surfaces: `box*`, `card`, `shadow`, `rounded*`
- Buttons: `btn`, `btn-flat`, `btn-outline`, `btn-destructive`, `btn-lg`, `btn-xl`
- Forms: `input-lg`, `input-xl`
- Icons: `icon`, `icon-<name>`, `icon-xs|sm|lg|xl`, `icon-*` color utilities
