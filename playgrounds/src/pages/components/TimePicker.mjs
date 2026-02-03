import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { TimePicker } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function TimePickerPage() {
  const headerOffset = "6rem";
  const entrySnippet = [
    "TimePicker();"
  ].join("\n");
  const entryHtml = Prism.highlight(entrySnippet, Prism.languages.javascript, "javascript");
  const roundedSnippet = [
    "TimePicker({ variant: \"rounded\" });"
  ].join("\n");
  const roundedHtml = Prism.highlight(roundedSnippet, Prism.languages.javascript, "javascript");
  const sizeSnippet = [
    "TimePicker({ size: \"md\" });",
    "TimePicker({ size: \"lg\" });",
    "TimePicker({ size: \"xl\" });"
  ].join("\n");
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Time Picker", 
      description: "Digital time picker focusing on rapid entry through direct typing and validated masking." 
    }),

    div({ class: "column-container gap-sm" }, [
      PageSection({ title: "24-Hour Digital Entry", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Supports direct keyboard input with auto-navigation between hour and minute segments."),
          div({ class: "grid-flow gap-md items-center" }, [
            TimePicker()
          ]),
          CodeBlock({ html: entryHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Rounded Variant", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Rounded trigger style for compact layouts."),
          div({ class: "grid-flow gap-md items-center" }, [
            TimePicker({ variant: "rounded" })
          ]),
          CodeBlock({ html: roundedHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Size variants for the trigger control."),
          div({ class: "grid-flow gap-md items-center" }, [
            TimePicker({ size: "md" }),
            TimePicker({ size: "lg" }),
            TimePicker({ size: "xl" })
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
