import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Grid } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, span } = Bunnix;

const Item = (text) => div({ class: "bg-accent p-sm rounded text-white text-center" }, text);

export default function GridPage() {
  const headerOffset = "6rem";
  const flowSnippet = [
    "Grid({ type: \"flow\" }, [",
    "  Item(\"Item 1\"), Item(\"Short\"), Item(\"Much longer item here\"),",
    "  Item(\"4\"), Item(\"5\"), Item(\"Small\")",
    "]);"
  ].join("\n");
  const flowHtml = Prism.highlight(flowSnippet, Prism.languages.javascript, "javascript");
  const fixedSnippet = [
    "Grid({",
    "  type: \"fixed\",",
    "  columns: [{ size: \"auto\" }, { size: \"auto\" }, { size: \"auto\" }]",
    "}, [",
    "  Item(\"1\"), Item(\"2\"), Item(\"3\"),",
    "  Item(\"4\"), Item(\"5\"), Item(\"6\")",
    "]);",
    "",
    "Grid({",
    "  type: \"fixed\",",
    "  columns: [{ size: \"150px\" }, { size: \"auto\" }]",
    "}, [",
    "  Item(\"Fixed 150px\"), Item(\"Fluid (1fr)\"),",
    "  Item(\"Row 2 Col 1\"), Item(\"Row 2 Col 2\")",
    "]);"
  ].join("\n");
  const fixedHtml = Prism.highlight(fixedSnippet, Prism.languages.javascript, "javascript");
  const gapSnippet = [
    "Grid({",
    "  type: \"fixed\",",
    "  gap: \"large\",",
    "  columns: [{ size: \"auto\" }, { size: \"auto\" }, { size: \"auto\" }]",
    "}, [",
    "  Item(\"1\"), Item(\"2\"), Item(\"3\")",
    "]);",
    "",
    "Grid({",
    "  type: \"fixed\",",
    "  gap: \"small\",",
    "  columns: [{ size: \"auto\" }, { size: \"auto\" }, { size: \"auto\" }]",
    "}, [",
    "  Item(\"1\"), Item(\"2\"), Item(\"3\")",
    "]);"
  ].join("\n");
  const gapHtml = Prism.highlight(gapSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Grid", 
      description: "Standardized grid containers for flexible and fixed multi-column layouts." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Flow Grid (Flexible Wrap)", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Uses flex-wrap to automatically distribute items based on their intrinsic width."),
          Grid({ type: "flow" }, [
            Item("Item 1"), Item("Short"), Item("Much longer item here"), 
            Item("4"), Item("5"), Item("Small")
          ]),
          CodeBlock({ html: flowHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Fixed Grid (Explicit Columns)", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md w-full" }, [
          div({ class: "column-container gap-md" }, [
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
          ]),
          CodeBlock({ html: fixedHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Gaps", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
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
          ]),
          CodeBlock({ html: gapHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}

const p = Bunnix.p;
