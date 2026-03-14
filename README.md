# @bunnix/components

Core UI primitives + design system CSS for Bunnix projects.

## Install

```bash
npm install @bunnix/components @bunnix/core
```

`@bunnix/core` is a peer dependency.

## Quick Start

Import CSS once at app entry:

```js
import "@bunnix/components/styles.css";
```

Use core primitives:

```js
import {
  Column,
  Row,
  Heading,
  Text,
  Button,
  TextInput,
  TextArea,
  Switch,
  Slider,
  Picker,
  ProgressBar,
} from "@bunnix/components";

Column(
  { gap: 16, padding: "large" },
  Heading({ h2: true }, "Hello"),
  Row(
    { gap: 8 },
    Button({ variant: "primary" }, "Save"),
    Button({ variant: "tertiary" }, "Cancel"),
  ),
  TextInput({ label: "Name", placeholder: "Type here" }),
  TextArea({
    label: "Notes",
    minLines: 3,
    maxLines: 6,
    newlineTrigger: "shift-enter",
    placeholder: "Write more...",
  }),
  Switch({ checked: false, label: "Enable sync" }),
  Picker({
    value: "calendar",
    items: [
      { key: "calendar", text: "Calendar", icon: "calendar" },
      { key: "messages", text: "Messages", icon: "chat_bubble_2" },
    ],
  }),
  Slider({ min: 0, max: 100, step: 5, value: 50 }),
  ProgressBar({ value: 65, color: "success" }),
);
```

## Layout Border Prop

Layout primitives accept a resolved `border` prop:

`"none" | "primary" | "secondary" | "tertiary" | "transparent"`

```js
Column(
  { gap: 8 },
  Column({ border: "primary", padding: "regular", radius: "regular" }, "Primary"),
  Column({ border: "secondary", padding: "regular", radius: "regular" }, "Secondary"),
  Column({ border: "tertiary", padding: "regular", radius: "regular" }, "Tertiary"),
  Column({ border: "transparent", padding: "regular", radius: "regular" }, "Transparent"),
);
```

These border tokens automatically adapt to light and dark color schemes, with `secondary` and `tertiary` rendered as softer tones of the primary border.

## Exported API

- Layout: `Column`, `Row`, `Spacer`, `Grid`
- Typography: `Heading`, `Text`
- Media: `Media`, `Icon`, `Spinner`, `Avatar`
- Buttons: `Button`, `LinkButton`
- Inputs: `TextInput`, `TextArea`, `Select`, `CheckBox`, `Switch`, `Slider`
- Data display: `Table`, `Code`
- Navigation: `Sidebar`, `Picker`, `Menu`
- Feedback: `useDialog`, `ProgressBar`

## ProgressBar Colors

`ProgressBar` supports both token-style and semantic colors.

- Token-style: `primary`, `primary-dimmed`, `secondary`, `tertiary`
- Semantic: `success`, `warning`, `danger`, `error` (alias of danger), `link`

```js
Column(
  { gap: 8 },
  ProgressBar({ value: 80, color: "success" }),
  ProgressBar({ value: 55, color: "warning" }),
  ProgressBar({ value: 35, color: "error" }),
  ProgressBar({ value: 65, color: "link" }),
);
```

## CSS Entry Points

Primary consumer stylesheet:

- `@bunnix/components/styles.css`

Optional core styles (advanced use):

- `@bunnix/components/src/core/core.css`
- `@bunnix/components/src/core/input.css`
- `@bunnix/components/src/core/table.css`

## Bundler Notes

Ensure your bundler:

- Processes CSS imports
- Handles CSS `url(...)` assets (SVG icons)
- Supports ESM `.mjs`

## License

ISC
