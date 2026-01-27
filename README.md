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

## Assets (icons)

SVG icons are shipped with the package and referenced by CSS variables. If your bundler rewrites asset URLs, make sure it processes CSS `url(...)` values from `@bunnix/components`.

## CSS modifiers (utilities)

You can compose your own UI using the same CSS utilities the components use:

- Layout: `row-container`, `column-container`, `grid-flow`, `gap-xs|sm|md|lg`, `items-start|center|end|stretch`, `justify-start|center|end`, `w-full`, `h-full`, `spacer-h`, `spacer-v`
- Surfaces: `box`, `box-sm`, `box-control`, `box-capsule`, `card`, `shadow`, `rounded|rounded-sm|rounded-full`
- Typography: `text-primary|secondary|tertiary|quaternary`, `text-accent`, `text-destructive`, `text-sm|base|lg|xl`, `text-mono`, `whitespace-nowrap`, `whitespace-pre-line`
- Buttons: `btn`, `btn-flat`, `btn-outline`, `btn-destructive`, `btn-lg`, `btn-xl`, `btn-disabled`
- Forms: `input-lg`, `input-xl`, `rounded-full` (useful for pill inputs)
- Icons: `icon`, `icon-<name>`, `icon-xs|sm|lg|xl`, `icon-base|white|secondary|tertiary|quaternary`

Example:

```js
import Bunnix from "@bunnix/core";
const { div, span } = Bunnix;

div({ class: "card row-container gap-sm items-center" }, [
  span({ class: "icon icon-star icon-base icon-sm" }),
  span({ class: "text-primary text-sm" }, "Custom card")
]);
```

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
