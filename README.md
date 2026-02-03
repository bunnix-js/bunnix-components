# @bunnix/components

Design system + UI components for Bunnix projects. This package ships ESM source with CSS + icon assets and is intended for modern, module-based builds (webpack/vite/rollup/etc).

Disclaimer:
- This project is currently in **alpha release candidate**. APIs and components may change until the first stable release.
- Icon usage & attribution:
  - COLLECTION: Framework7 Line Icons — LICENSE: MIT License — AUTHOR: framework7io
  - COLLECTION: Iconcino Interface Icons — LICENSE: CC0 1.0 — AUTHOR: Gabriele Malaspina
  - Sources (copy/paste): `https://framework7.io/icons/` and `https://iconcino.com/`

## Install

```bash
npm install @bunnix/components @bunnix/core
```

`@bunnix/core` is a peer dependency (required by design).

## Usage

Import the CSS once at your app entry:

```js
import "@bunnix/components/styles.css";
```

Then import components as needed:

```js
import { Button, Icon, Text } from "@bunnix/components";

export default function Example() {
  return Button({ variant: "regular" }, [
    Icon({ name: "star", fill: "white" }),
    Text({ type: "text" }, "Star")
  ]);
}
```

## Component examples

Button with icon:

```js
import { Button, Icon } from "@bunnix/components";

Button({ variant: "regular" }, [
  Icon({ name: "star", fill: "white" }),
  "Star"
]);
```

Input with mask:

```js
import { InputField } from "@bunnix/components";

// Date mask
InputField({ label: "Date", mask: "date", placeholder: "DD/MM/YYYY" });

// Brazilian phone
InputField({ label: "Phone", mask: "phone-br", placeholder: "+55 11 99999-9999" });

// Currency with options
InputField({ 
  label: "Price", 
  mask: { 
    type: "currency",
    options: { prefix: "R$", decimalPlaces: 2 }
  }
});

// Custom pattern (9=digit, A=letter, *=alphanumeric)
InputField({ 
  label: "Custom", 
  mask: { pattern: "999.999.999-99" }
});
```

DatePicker and TimePicker:

```js
import { DatePicker, TimePicker } from "@bunnix/components";

// DatePicker with label
DatePicker({ 
  label: "Birth Date",
  change: (e) => console.log("Date:", e.date)
});

// TimePicker with label
TimePicker({ 
  label: "Meeting Time",
  change: (e) => console.log("Time:", e.time)
});
```

Search box with suggestions:

```js
import { SearchBox } from "@bunnix/components";

SearchBox({
  data: [
    { title: "Users", snippet: "Manage users", icon: "person" },
    { title: "Settings", snippet: "Configure app", icon: "gear" }
  ]
});
```

Dialog + toast helpers:

```js
import { Dialog, showDialog, ToastNotification, showToast } from "@bunnix/components";

showDialog({ title: "Welcome", message: "Bunnix components ready." });
showToast({ message: "Saved successfully", icon: "success-circle" });
```

## Input Masks

InputField supports automatic formatting with built-in masks:

### Predefined masks

- `date` - DD/MM/YYYY
- `time` - HH:MM (24-hour)
- `email` - lowercase, no spaces
- `currency` - $ 1,234.56 (configurable)
- `decimal` - 123.45
- `integer` - digits only
- `phone` - +1 (234) 567-8900 (US/International)
- `phone-br` - +55 11 99999-9999 (Brazilian mobile/landline)
- `credit-card` - 1234 5678 9012 3456
- `cpf` - 123.456.789-01 (Brazilian CPF)
- `cnpj` - 12.345.678/0001-90 (Brazilian CNPJ)
- `cep` - 12345-678 (Brazilian ZIP code)

### Custom patterns

Create custom masks with pattern syntax:
- `9` = digit (0-9)
- `A` = letter (a-z, A-Z)
- `*` = alphanumeric
- Other characters are literals

```js
// Example: Brazilian CPF
InputField({ 
  mask: { pattern: "999.999.999-99" }
});
```

### Mask utilities

Import mask utilities for custom use:

```js
import { applyMask, validateMask, getMaskMaxLength } from "@bunnix/components";

const masked = applyMask("12345678901", "cpf"); // "123.456.789-01"
const isValid = validateMask("123.456.789-01", "cpf"); // true/false
const maxLen = getMaskMaxLength("cpf"); // 14
```

## Assets (icons)

SVG icons are shipped with the package and referenced by CSS variables. If your bundler rewrites asset URLs, make sure it processes CSS `url(...)` values from `@bunnix/components`.

## Theming

Override CSS variables after importing the stylesheet:

```css
:root {
  --accent-color: #2563eb;
  --background-color: #ffffff;
  --border-color: #e5e7eb;
  --base-padding: 0.75rem;
  --base-gap: 0.6rem;
  --font-family: "Inter", system-ui, sans-serif;
}
```

## CSS modifiers (utilities)

You can compose your own UI using the same CSS utilities the components use:

- Layout: `row-container`, `column-container`, `grid-flow`, `gap-xs|sm|md|lg`, `items-start|center|end|stretch`, `justify-start|center|end`, `w-full`, `h-full`, `spacer-h`, `spacer-v`
- Surfaces: `box`, `box-sm`, `box-control`, `box-capsule`, `card`, `shadow`, `rounded|rounded-sm|rounded-full`
- Typography: `text-default|primary|secondary|tertiary|quaternary`, `text-accent`, `text-destructive`, `text-sm|base|lg|xl`, `text-mono`, `whitespace-nowrap`, `whitespace-pre-line`
- Buttons: `btn`, `btn-flat`, `btn-outline`, `btn-destructive`, `btn-lg`, `btn-xl`, `btn-disabled`
- Forms: `input-lg`, `input-xl`, `rounded-full` (useful for pill inputs)
- Icons: `icon`, `icon-<name>`, `icon-xs|sm|lg|xl`, `icon-default|base|white|secondary|tertiary|quaternary|destructive`

Example:

```js
import Bunnix from "@bunnix/core";
const { div, span } = Bunnix;

div({ class: "card row-container gap-sm items-center" }, [
  span({ class: "icon icon-star icon-base icon-sm" }),
  span({ class: "text-primary text-sm" }, "Custom card")
]);
```

## Icon props

- `name`: icon slug (e.g. `star`) or a full class (e.g. `icon-star`). IDEs should autocomplete shipped icon names.
- `fill`: `default | base | white | secondary | tertiary | quaternary | destructive` or any `icon-*` utility.
- `size`: `xsmall | small | regular | large | xlarge` or `icon-xs | icon-sm | icon-lg | icon-xl`.

## Minimal webpack config

This is a minimal setup that works with `@bunnix/components` (ESM, CSS, and SVG assets):

```js
import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.mjs",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "images/[hash][ext][query]"
  },
  mode: "development",
  module: {
    rules: [
      { test: /\\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" }
    ]
  },
  resolve: {
    extensions: [".mjs", ".js", ".json"]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" })
  ],
  devServer: {
    static: { directory: path.join(__dirname, "public") },
    compress: true,
    port: 3000,
    open: true
  }
};
```

## Project structure

```
src/
  components/   # exported components
  styles/       # design system CSS
  icons/        # SVG assets
  index.mjs     # package exports
  styles.css    # CSS entry
playgrounds/    # local showcase (uses the package)
```

## Playground

The playground consumes `@bunnix/components` directly. Start it with your preferred dev server (whatever you use today), and ensure the CSS import stays at `playgrounds/src/index.mjs`.

## Publishing notes

- This package targets ESM consumers and ships source files (no dist build).
- Ensure `files` and `exports` in `package.json` include `src/` and CSS entries.
- GitHub CI should run with Node that supports ESM (Node 16+ recommended).

## License

ISC
