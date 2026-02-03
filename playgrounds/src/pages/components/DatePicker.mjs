import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { DatePicker } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function DatePickerPage() {
  const headerOffset = "6rem";
  const singleSnippet = [
    "DatePicker();"
  ].join("\n");
  const singleHtml = Prism.highlight(singleSnippet, Prism.languages.javascript, "javascript");
  const rangeSnippet = [
    "DatePicker({ range: true });"
  ].join("\n");
  const rangeHtml = Prism.highlight(rangeSnippet, Prism.languages.javascript, "javascript");
  const roundedSnippet = [
    "DatePicker({ variant: \"rounded\" });",
    "DatePicker({ range: true, variant: \"rounded\" });"
  ].join("\n");
  const roundedHtml = Prism.highlight(roundedSnippet, Prism.languages.javascript, "javascript");
  const sizeSnippet = [
    "DatePicker({ size: \"regular\" });",
    "DatePicker({ size: \"large\" });",
    "DatePicker({ size: \"xlarge\" });"
  ].join("\n");
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Date Picker", 
      description: "Custom date selection component with dynamic current-date placeholders and locale formatting." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Single Date", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "A standard single date selection with quick-actions."),
          div({ class: "grid-flow gap-md items-center" }, [
            DatePicker()
          ]),
          CodeBlock({ html: singleHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Date Range", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Select a start and end date with intuitive highlighting."),
          div({ class: "grid-flow gap-md items-center" }, [
            DatePicker({ range: true })
          ]),
          CodeBlock({ html: rangeHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Rounded Variant", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Rounded trigger style for compact layouts."),
          div({ class: "grid-flow gap-md items-center" }, [
            DatePicker({ variant: "rounded" }),
            DatePicker({ range: true, variant: "rounded" })
          ]),
          CodeBlock({ html: roundedHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Size variants for the trigger control."),
          div({ class: "grid-flow gap-md items-center" }, [
            DatePicker({ size: "regular" }),
            DatePicker({ size: "large" }),
            DatePicker({ size: "xlarge" })
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
