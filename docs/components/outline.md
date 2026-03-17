---
layout: default
title: Outline
---

# Outline

A disclosure widget with a clickable anchor header and collapsible details region.

```js
import { Outline, Row, Icon, Text, Column } from "@bunnix/components";

Outline({
  anchor: Row({ alignItems: "center", gap: "small" },
    Icon({ name: "doc_text", size: 16 }),
    Text({ weight: "heavy" }, "Section Title"),
  ),
  details: Column({ gap: "small", paddingTop: "small" },
    Text("Expandable content goes here."),
  ),
});
```

## Props (common):

- `anchor`: `BunnixChild` — Always-visible trigger content (any Bunnix node)
- `details`: `BunnixChild` — Collapsible content shown when expanded (any Bunnix node)
- `showChevron`: `boolean` — Whether to render the automatic chevron icon (default: `true`)
- `open`: `boolean | StateLike<boolean>` — Controlled open/closed state; pass a Bunnix State object for two-way external control

## Inherited Layout Props:

- `gap`: `number | string` — Space between anchor row and details
- `padding`: `number | string` — Inner padding on outer container
- `margin`: `number | string` — Outer margin
- `bgColor`: `string` — Background color (named tokens or hex/rgb)
- `width`: `number | string` — Outer width
- `height`: `number | string` — Outer height
- ...and all other `LayoutProps`

## Behavior:

- **Closed by default** — Details are hidden until user clicks the anchor
- **Chevron toggle** — Automatically shows `chevron-down` (closed) or `chevron-up` (open)
- **Click to toggle** — Clicking anywhere in the anchor row expands/collapses details
- **Reactive state** — State changes trigger smooth updates
- **Bindable state** — Pass a Bunnix `useState` object to `open` to control open/closed from outside the component
- **Optional chevron** — Set `showChevron: false` to suppress the automatic chevron for custom anchor layouts

## Example: Form Sections

```js
Column({ gap: "small" },
  Outline({
    anchor: Text({ weight: "heavy" }, "Personal Information"),
    details: Column({ gap: "small", paddingTop: "small" },
      TextInput({ label: "Name" }),
      TextInput({ label: "Email" }),
    ),
  }),
  Outline({
    anchor: Text({ weight: "heavy" }, "Address"),
    details: Column({ gap: "small", paddingTop: "small" },
      TextInput({ label: "Street" }),
      TextInput({ label: "City" }),
      TextInput({ label: "ZIP" }),
    ),
  }),
)
```

## Example: Documentation Sections

```js
Column({ gap: "small" },
  Outline({
    anchor: Row({ alignItems: "center", gap: "small" },
      Icon({ name: "book", size: 16, color: "secondary" }),
      Text({ weight: "heavy" }, "Getting Started"),
    ),
    details: Column({ gap: "small", paddingTop: "small" },
      Text("1. Install the package"),
      Text("2. Import components"),
      Text("3. Build your UI"),
    ),
  }),
  Outline({
    anchor: Row({ alignItems: "center", gap: "small" },
      Icon({ name: "cube", size: 16, color: "secondary" }),
      Text({ weight: "heavy" }, "Components"),
    ),
    details: Column({ gap: "small", paddingTop: "small" },
      Text("Button, Input, Select, ..."),
    ),
  }),
)
```
