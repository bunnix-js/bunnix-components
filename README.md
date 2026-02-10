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
  ProgressBar({ value: 65, color: "success" }),
);
```

## Exported API

- Layout: `Column`, `Row`, `Spacer`, `Grid`
- Typography: `Heading`, `Text`
- Media: `Media`, `Icon`, `Spinner`, `Avatar`
- Buttons: `Button`, `LinkButton`
- Inputs: `TextInput`, `Select`, `CheckBox`
- Data display: `Table`, `Code`
- Navigation: `Sidebar`, `Menu`
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
