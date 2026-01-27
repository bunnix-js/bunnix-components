---
layout: default
title: Getting Started
---

# Getting Started

Install the package and its peer dependency:

```bash
npm install @bunnix/components @bunnix/core
```

Import the CSS once in your app entry:

```js
import "@bunnix/components/styles.css";
```

Then import components as needed:

```js
import { Button, Icon } from "@bunnix/components";

Button({ variant: "regular" }, [
  Icon({ name: "star", fill: "white" }),
  "Star"
]);
```
