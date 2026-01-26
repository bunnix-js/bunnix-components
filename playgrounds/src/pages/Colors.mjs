import Bunnix from "@bunnix/core";
import PageHeader from "../components/PageHeader.mjs";
import PageSection from "../components/PageSection.mjs";
import Container from "../components/Container.mjs";
const { div, h5, span, hr } = Bunnix;

const ColorSwatch = (name, variable) => {
  return div({ class: "card box gap-md" }, [
    div({ 
      class: "swatch",
      style: `background-color: var(${variable});` 
    }),
    div({ class: "column-container gap-sm" }, [
      h5({ class: "no-margin" }, name),
      span({ class: "text-mono text-sm text-secondary" }, variable)
    ])
  ]);
};

export default function ColorsPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Colors", 
      description: "The color palette used across the design system." 
    }),
    
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Core Palette", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          ColorSwatch("Primary", "--color-primary"),
          ColorSwatch("Primary Dimmed", "--color-primary-dimmed"),
          ColorSwatch("Secondary", "--color-secondary"),
          ColorSwatch("Tertiary", "--color-tertiary"),
          ColorSwatch("Quaternary", "--color-quaternary"),
          ColorSwatch("Destructive", "--color-destructive"),
          ColorSwatch("Destructive Dimmed", "--color-destructive-dimmed"),
          ColorSwatch("Accent", "--accent-color"),
          ColorSwatch("Accent Dimmed", "--accent-color-dimmed"),
          ColorSwatch("Border", "--border-color"),
          ColorSwatch("Background", "--background-color"),
          ColorSwatch("Alternate Background", "--alternate-background-color"),
          ColorSwatch("Highlight Background", "--highlight-background-color"),
        ])
      ]),

      PageSection({ title: "Text Color Utilities", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md" }, [
          div({ class: "text-primary" }, ".text-primary"),
          div({ class: "text-primary-dimmed" }, ".text-primary-dimmed"),
          div({ class: "text-secondary" }, ".text-secondary"),
          div({ class: "text-tertiary" }, ".text-tertiary"),
          div({ class: "text-quaternary" }, ".text-quaternary"),
          div({ class: "text-destructive" }, ".text-destructive"),
          div({ class: "text-destructive-dimmed" }, ".text-destructive-dimmed"),
          div({ class: "text-accent" }, ".text-accent"),
          div({ class: "text-accent-dimmed" }, ".text-accent-dimmed"),
        ])
      ]),

      PageSection({ title: "Background Color Utilities", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md" }, [
          div({ class: "bg-dimmed text-primary p-sm rounded" }, ".bg-dimmed"),
          div({ class: "bg-destructive text-white p-sm rounded" }, ".bg-destructive"),
          div({ class: "bg-destructive-dimmed text-white p-sm rounded" }, ".bg-destructive-dimmed"),
          div({ class: "bg-accent text-white p-sm rounded" }, ".bg-accent"),
          div({ class: "bg-accent-dimmed text-white p-sm rounded" }, ".bg-accent-dimmed"),
          div({ class: "bg-alternate text-primary p-sm rounded" }, ".bg-alternate"),
          div({ class: "bg-highlight text-primary p-sm rounded" }, ".bg-highlight"),
        ])
      ])
    ])
  ]);
}
