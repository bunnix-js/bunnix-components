import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Grid } from "@bunnix/components";
import { Container } from "@bunnix/components";

const { div, span } = Bunnix;

const Item = (text) => div({ class: "bg-accent p-sm rounded text-white text-center" }, text);

export default function GridPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Grid", 
      description: "Standardized grid containers for flexible and fixed multi-column layouts." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Flow Grid (Flexible Wrap)", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "Uses flex-wrap to automatically distribute items based on their intrinsic width."),
        Grid({ type: "flow" }, [
          Item("Item 1"), Item("Short"), Item("Much longer item here"), 
          Item("4"), Item("5"), Item("Small")
        ])
      ]),

      PageSection({ title: "Fixed Grid (Explicit Columns)", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md w-full" }, [
          div({ class: "column-container gap-sm" }, [
            span({ class: "text-sm text-tertiary" }, "3 Equal Columns (auto)"),
            Grid({ 
              type: "fixed", 
              columns: [{ size: "auto" }, { size: "auto" }, { size: "auto" }] 
            }, [
              Item("1"), Item("2"), Item("3"), 
              Item("4"), Item("5"), Item("6")
            ])
          ]),

          div({ class: "column-container gap-sm" }, [
            span({ class: "text-sm text-tertiary" }, "Custom Sizing (150px fixed, 1fr remaining)"),
            Grid({ 
              type: "fixed", 
              columns: [{ size: "150px" }, { size: "auto" }] 
            }, [
              Item("Fixed 150px"), Item("Fluid (1fr)"),
              Item("Row 2 Col 1"), Item("Row 2 Col 2")
            ])
          ]),
        ])
      ]),

      PageSection({ title: "Gaps", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm" }, [
            span({ class: "text-sm text-tertiary" }, "Large Gap"),
            Grid({ 
              type: "fixed", 
              gap: "large",
              columns: [{ size: "auto" }, { size: "auto" }, { size: "auto" }] 
            }, [
              Item("1"), Item("2"), Item("3")
            ])
          ]),
          div({ class: "column-container gap-sm" }, [
            span({ class: "text-sm text-tertiary" }, "Small Gap"),
            Grid({ 
              type: "fixed", 
              gap: "small",
              columns: [{ size: "auto" }, { size: "auto" }, { size: "auto" }] 
            }, [
              Item("1"), Item("2"), Item("3")
            ])
          ]),
        ])
      ])
    ])
  ]);
}

const p = Bunnix.p;
