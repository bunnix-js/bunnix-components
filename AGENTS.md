# AGENTS.md

This document is the live operating guide for language models and agents working on `@bunnix/components`. Keep it updated until the first public release.

## Mission

- Ship a stable, minimal ESM package of reusable Bunnix UI components + design system CSS.
- Ensure components share consistent API patterns (especially sizing).
- Keep the playground as a consumer of the package (dogfooding).

## Project Structure

```
src/
  components/     # package components (public API)
  styles/         # design system CSS
  icons/          # svg assets referenced by CSS
  utils/          # shared utilities (maskUtils, sizeUtils, etc.)
  index.mjs       # package JS exports
  styles.css      # CSS entry (imports styles/main.css)
@types/
  index.d.ts      # package typings
playgrounds/
  src/            # showcase app (imports @bunnix/components)
```

## Package Contract

- Package name: `@bunnix/components`
- ESM only; ships source files (no dist build).
- `@bunnix/core` is a **peer dependency**.
- CSS must be imported once by consumers: `@bunnix/components/styles.css`.
- Icons are referenced by CSS `url(...)`; bundlers must process CSS URLs.
- Utilities (mask functions, etc.) are exported from the main entry point.

## Component API Conventions

### Size vocabulary (authoritative)

- Use **`xsmall | small | regular | large | xlarge`**.
- `regular` is the default when unspecified.
- Some components only support `regular | large | xlarge` (see exceptions below).
- Legacy sizes `xs | sm | md | lg | xl | default` should normalize to the extended names inside components.

### Exceptions (no `small` support)

- `DatePicker`, `TimePicker`, `InputField`, `ToastNotification` do **not** support `small` or `xsmall`.
- When passed `small`/`sm` or `xsmall`/`xs`, normalize to `regular`.

### Variant and color

- Variants are component-specific; do not force a shared vocabulary.
- Colors are handled by component-specific props (`Text.color`, `Badge.tone`, `Icon.fill`).

### Input Components

- `InputField`, `DatePicker`, `TimePicker` now support `label` prop for consistency.
- `DatePicker` and `TimePicker` use text input with masks, showing popover on focus.
- All three disable browser autocomplete by default (`autocomplete="off"`).
- `InputField` supports mask prop for formatted input (date, phone, currency, etc.).

### State handling

- Prefer supporting Bunnix reactive values (`useState` atom-like) via `.map` / `.get` where existing patterns exist.
- Avoid breaking reactive prop usage when refactoring.

## Design System CSS

Key utility families:

- Layout: `row-container`, `column-container`, `grid-flow`, `gap-*`, `items-*`, `justify-*`
- Surfaces: `box*`, `card`, `shadow`, `rounded*`
- Buttons: `btn`, `btn-flat`, `btn-outline`, `btn-destructive`, `btn-lg`, `btn-xl`
- Forms: `input-lg`, `input-xl`
- Icons: `icon`, `icon-<name>`, `icon-xs|sm|lg|xl`, `icon-*` color utilities

When adding utilities, update `README.md` and keep the list concise.

## Playground Rules

- Playground **must** import from `@bunnix/components` (not local relative paths).
- CSS import lives in `playgrounds/src/index.mjs`:
  - `import "@bunnix/components/styles.css";`
- Playground pages are local (`playgrounds/src/pages/...`) and should continue to work as package consumers.

## Type Declarations

- `@types/index.d.ts` is the single public typing surface.
- Keep prop interfaces aligned with actual component props.
- Update typings when changing size or variant behavior.

## Release Readiness Checklist (pre-1.0)

- Consistent size vocabulary across components.
- Playground compiles and renders using package imports.
- README updated with usage + webpack minimal config + CSS utilities.
- `package.json` exports include `styles.css` and `@types`.
- `@bunnix/core` remains a peer dependency.

## Maintenance Rules

- Avoid breaking API unless explicitly requested.
- Keep components minimal and consistent; no duplicated logic when a helper is feasible.
- Changes to CSS utilities should be reflected in `README.md`.
- Keep this AGENTS.md updated with any new conventions or package decisions.
