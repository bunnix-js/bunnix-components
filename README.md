# @bunnix/components

Design system + UI components for Bunnix projects. Ships ESM source with CSS and icon assets for modern bundlers.

**Status**: Alpha release candidate - APIs may change before v1.0

## Install

```bash
npm install @bunnix/components @bunnix/core
```

`@bunnix/core` is a peer dependency.

## Quick Start

Import CSS once at your app entry:

```js
import "@bunnix/components/styles.css";
```

Use components:

```js
import { Button, Icon, InputField, DatePicker } from "@bunnix/components";

// Button with icon
Button({ variant: "regular" }, [
  Icon({ name: "star", fill: "white" }),
  "Star"
]);

// Input with mask
InputField({ label: "Phone", mask: "phone-br" });

// Date picker
DatePicker({ label: "Birth Date", change: (e) => console.log(e.date) });
```

## Key Features

### Input Masks
InputField supports 12+ built-in masks plus custom patterns:
- `date`, `time`, `email`, `currency`, `decimal`, `integer`
- `phone`, `phone-br`, `credit-card`
- `cpf`, `cnpj`, `cep` (Brazilian documents)
- Custom patterns: `{ pattern: "999.999.999-99" }` (9=digit, A=letter, *=alphanumeric)

```js
InputField({ 
  label: "Price",
  mask: { type: "currency", options: { prefix: "R$", decimalPlaces: 2 }}
});
```

Mask utilities available for custom use:
```js
import { applyMask, validateMask, getMaskMaxLength } from "@bunnix/components";
```

### Date & Time Pickers
Text inputs with masks that show popover calendars/selectors on focus:
```js
DatePicker({ label: "Date", change: (e) => console.log(e.date) });
TimePicker({ label: "Time", change: (e) => console.log(e.time) });
```

### Dialog & Toast
```js
import { showDialog, showToast } from "@bunnix/components";

showDialog({ title: "Welcome", message: "Ready to go!" });
showToast({ message: "Saved", icon: "success-circle" });
```

### 30+ Components
Button, Icon, Text, InputField, ComboBox, DatePicker, TimePicker, SearchBox, Checkbox, ToggleSwitch, Badge, Card, Table, Sidebar, NavigationBar, Dialog, Toast, and more.

See `/playgrounds` for live examples of all components.

## Theming

Override CSS variables:

```css
:root {
  --accent-color: #2563eb;
  --background-color: #ffffff;
  --border-color: #e5e7eb;
  --base-padding: 0.75rem;
  --font-family: "Inter", system-ui, sans-serif;
}
```

## CSS Utilities

Use the same utilities that power the components:

- **Layout**: `row-container`, `column-container`, `grid-flow`, `gap-xs|sm|md|lg`
- **Surfaces**: `box`, `card`, `shadow`, `rounded`
- **Typography**: `text-primary|secondary|tertiary`, `text-xs|sm|md|base|lg|xl`
- **Buttons**: `btn`, `btn-flat`, `btn-outline`, `btn-destructive`, `btn-xs|sm|lg|xl`
- **Icons**: `icon`, `icon-<name>`, `icon-xs|sm|lg|xl`, `icon-primary|secondary|tertiary|quaternary|accent|destructive|white`

```js
import Bunnix from "@bunnix/core";
import { Icon } from "@bunnix/components";
const { div, span } = Bunnix;

div({ class: "card row-container gap-sm" }, [
  Icon({ name: "star", fill: "base" }),
  span({ class: "text-primary" }, "Custom card")
]);
```

## Bundler Setup

Works with webpack, vite, rollup, or any modern ESM bundler. Ensure your bundler:
- Processes CSS imports
- Handles CSS `url(...)` for SVG assets
- Supports `.mjs` extensions

Minimal webpack example:
```js
export default {
  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" }
    ]
  }
};
```

## Icon Attribution

- Framework7 Line Icons (MIT) - framework7io
- Iconcino Interface Icons (CC0 1.0) - Gabriele Malaspina

## Project Structure

```
src/
  components/   # Component library
  styles/       # Design system CSS
  icons/        # SVG assets
  utils/        # Utilities (masks, etc.)
  index.mjs     # Package exports
playgrounds/    # Component showcase
```

## License

ISC
