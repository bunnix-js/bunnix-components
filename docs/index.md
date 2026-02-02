---
layout: default
title: Bunnix Components Documentation
---

# Bunnix Components

![Bunnix logo](./images/bunnix-transparent-regular.png)

Design system + UI components for Bunnix projects. Ships ESM source with CSS + icon assets.

> Disclaimer: This project is currently in **alpha release candidate**. APIs and components may change until the first stable release. Most icons are provided for common creative usage, but some icon attributions may still need review before final release.

## Start Here

- [Getting Started](./getting-started.md) - install and use components

## Features

- ✨ Ready-to-use components for Bunnix apps
- 🎨 Design system utilities and tokens
- 📦 ESM package with CSS + icon assets
- 🎯 Playground-driven development

## Quick Start

```bash
npm install @bunnix/components @bunnix/core
```

```js
import "@bunnix/components/styles.css";
import { Button, Icon } from "@bunnix/components";

Button({ variant: "regular" }, [
  Icon({ name: "star", fill: "white" }),
  "Star"
]);
```

## Documentation

### Getting Started

- [Install](./getting-started.md)
- [Usage](./usage.md)
- [CSS & Assets](./css.md)
- [Icons](./icons.md)

### Components

- [Code Block](./components/code-block.md)
- [Button](./components/button.md)
- [Icon](./components/icon.md)
- [Input Field](./components/input-field.md)
- [Search Box](./components/search-box.md)
- [Sidebar](./components/sidebar.md)
- [Badge](./components/badge.md)
- [Table](./components/table.md)
