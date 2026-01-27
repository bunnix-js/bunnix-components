---
layout: default
title: Tokens
---

# Tokens

Tokens live in `src/styles/variables.css` and include colors, spacing, typography, and control sizing. Override them in your app to theme globally.

Example:

```css
:root {
  --accent-color: #2563eb;
  --border-color: #e5e7eb;
  --base-radius: 12px;
}
```

## Common Tokens

Colors:

- `--color-primary`, `--color-primary-dimmed`
- `--color-secondary`, `--color-tertiary`, `--color-quaternary`
- `--color-destructive`, `--color-destructive-dimmed`
- `--color-success`, `--color-info`
- `--accent-color`, `--accent-color-dimmed`

Surfaces:

- `--background-color`
- `--alternate-background-color`
- `--highlight-background-color`
- `--border-color`
- `--shadow-base`

Spacing & radius:

- `--base-padding`
- `--base-gap`
- `--base-radius`
- `--min-control-height`
- `--min-control-radius`

Typography:

- `--font-family`
- `--font-regular`, `--font-semibold`, `--font-bold`
- `--font-size`, `--font-size-sm`, `--font-size-xs`
