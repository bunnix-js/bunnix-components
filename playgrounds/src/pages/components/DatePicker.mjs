import Bunnix, { useState } from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { DatePicker } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import { Text } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function DatePickerPage() {
  const headerOffset = "6rem";
  const selectedDate = useState(null);
  
  const basicSnippet = [
    "DatePicker({ label: \"Date\" });"
  ].join("\n");
  const basicHtml = Prism.highlight(basicSnippet, Prism.languages.javascript, "javascript");
  
  const placeholderSnippet = [
    "DatePicker({ ",
    "  label: \"Birth Date\",",
    "  placeholder: \"Select a date\"",
    "});"
  ].join("\n");
  const placeholderHtml = Prism.highlight(placeholderSnippet, Prism.languages.javascript, "javascript");
  
  const valueSnippet = [
    "const selectedDate = useState(null);",
    "",
    "DatePicker({ ",
    "  label: \"Appointment\",",
    "  value: selectedDate.get(),",
    "  change: (e) => {",
    "    selectedDate.set(e.date);",
    "    console.log('Selected:', e.date);",
    "  }",
    "});"
  ].join("\n");
  const valueHtml = Prism.highlight(valueSnippet, Prism.languages.javascript, "javascript");
  
  const rangeSnippet = [
    "DatePicker({ ",
    "  label: \"Date Range\",",
    "  range: true ",
    "});"
  ].join("\n");
  const rangeHtml = Prism.highlight(rangeSnippet, Prism.languages.javascript, "javascript");
  
  const roundedSnippet = [
    "DatePicker({ ",
    "  label: \"Rounded Date\",",
    "  variant: \"rounded\" ",
    "});"
  ].join("\n");
  const roundedHtml = Prism.highlight(roundedSnippet, Prism.languages.javascript, "javascript");
  
  const sizeSnippet = [
    "DatePicker({ label: \"Regular\", size: \"regular\" });",
    "DatePicker({ label: \"Large\", size: \"large\" });",
    "DatePicker({ label: \"X-Large\", size: \"xlarge\" });"
  ].join("\n");
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");
  
  const disabledSnippet = [
    "DatePicker({ ",
    "  label: \"Disabled\",",
    "  disabled: true ",
    "});"
  ].join("\n");
  const disabledHtml = Prism.highlight(disabledSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Date Picker", 
      description: "Text input with DD/MM/YYYY mask that shows a calendar popover when focused." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Basic Usage", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "A text input with DD/MM/YYYY mask. The calendar popover appears when the input is focused. You can type the date directly or pick it from the calendar."),
          div({ class: "grid-flow gap-md items-start" }, [
            DatePicker({ label: "Date" })
          ]),
          CodeBlock({ html: basicHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "With Placeholder", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Customize the placeholder text for the input field."),
          div({ class: "grid-flow gap-md items-start" }, [
            DatePicker({ 
              label: "Birth Date",
              placeholder: "Select a date"
            })
          ]),
          CodeBlock({ html: placeholderHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Controlled Value", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Control the value and handle changes with callbacks. The change event provides both the formatted string and the Date object."),
          div({ class: "column-container gap-md items-start" }, [
            DatePicker({ 
              label: "Appointment",
              value: selectedDate.get(),
              change: (e) => {
                selectedDate.set(e.date);
                console.log('Selected date:', e.date);
              }
            }),
            selectedDate.get() && Text({ class: "text-secondary" }, 
              `Selected: ${selectedDate.get().toLocaleDateString()}`
            )
          ]),
          CodeBlock({ html: valueHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Date Range", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Select a start and end date with intuitive highlighting. (Note: Range mode currently uses the old button-based UI and will be updated in a future version)"),
          div({ class: "grid-flow gap-md items-start" }, [
            DatePicker({ 
              label: "Date Range",
              range: true 
            })
          ]),
          CodeBlock({ html: rangeHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Rounded Variant", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Fully rounded input style for modern designs."),
          div({ class: "grid-flow gap-md items-start" }, [
            DatePicker({ 
              label: "Rounded Date",
              variant: "rounded" 
            })
          ]),
          CodeBlock({ html: roundedHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Available sizes: regular, large, and xlarge."),
          div({ class: "column-container gap-md items-start" }, [
            DatePicker({ label: "Regular", size: "regular" }),
            DatePicker({ label: "Large", size: "large" }),
            DatePicker({ label: "X-Large", size: "xlarge" })
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Disabled State", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Disabled state prevents interaction."),
          div({ class: "grid-flow gap-md items-start" }, [
            DatePicker({ 
              label: "Disabled",
              disabled: true 
            })
          ]),
          CodeBlock({ html: disabledHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
