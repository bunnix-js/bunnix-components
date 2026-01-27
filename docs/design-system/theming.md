---
layout: default
title: Theming
---

# Theming

Override CSS variables to theme the system. Put overrides after importing `@bunnix/components/styles.css`.

```css
:root {
  --color-primary: #0f172a;
  --color-secondary: #64748b;
  --background-color: #ffffff;
  --accent-color: #4f46e5;
}
```

## Options

1) Global overrides (recommended)

Define tokens in `:root` after importing the package CSS.

2) Scoped overrides

Apply a theme to a section only by wrapping a container:

```css
.my-theme {
  --background-color: #0b0f14;
  --color-primary: #e2e8f0;
  --accent-color: #22c55e;
}
```

3) Dark mode overrides

Define a dark theme using `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #0b0f14;
    --color-primary: #e2e8f0;
  }
}
```

4) light-dark() tokens

If your target browsers support it, you can use `light-dark()` for single-source tokens:

```css
:root {
  --color-primary: light-dark(#0f172a, #e2e8f0);
}
```

## Fallback behavior

The package defines light defaults in `:root`, provides a dark override via `@media (prefers-color-scheme: dark)`, and then uses `@supports (color: light-dark(...))` to switch to `light-dark()` where supported. Older browsers will use the light/dark media overrides.
