---
layout: default
title: Code Block
---

# Code Block

A safe container for preformatted HTML produced by external highlighters (Prism, Shiki, Highlight.js, LSP tools).

```js
import { CodeBlock } from "@bunnix/components";

CodeBlock({ html: "<span>const</span> x = 1;", language: "js" });
```

Props:

- `html`: preformatted HTML string (trusted input only)
- `language`: class hook (e.g. "js" -> `language-js`)
- `overflowX`: `auto | scroll | hidden` (default: auto)
- `wrap`: boolean (default: false)

Note: This component does not ship a highlighter. Use your preferred tool and pass HTML via `html`.
