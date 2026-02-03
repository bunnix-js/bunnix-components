import Bunnix, { useState } from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { TimePicker } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import { Text } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function TimePickerPage() {
  const headerOffset = "6rem";
  const selectedTime = useState(null);
  
  const basicSnippet = [
    "TimePicker({ label: \"Time\" });"
  ].join("\n");
  const basicHtml = Prism.highlight(basicSnippet, Prism.languages.javascript, "javascript");
  
  const placeholderSnippet = [
    "TimePicker({ ",
    "  label: \"Meeting Time\",",
    "  placeholder: \"Select time\"",
    "});"
  ].join("\n");
  const placeholderHtml = Prism.highlight(placeholderSnippet, Prism.languages.javascript, "javascript");
  
  const valueSnippet = [
    "const selectedTime = useState(null);",
    "",
    "TimePicker({ ",
    "  label: \"Appointment\",",
    "  value: selectedTime.get(),",
    "  change: (e) => {",
    "    selectedTime.set(e.time);",
    "    console.log('Selected:', e.time);",
    "  }",
    "});"
  ].join("\n");
  const valueHtml = Prism.highlight(valueSnippet, Prism.languages.javascript, "javascript");
  
  const roundedSnippet = [
    "TimePicker({ ",
    "  label: \"Rounded Time\",",
    "  variant: \"rounded\" ",
    "});"
  ].join("\n");
  const roundedHtml = Prism.highlight(roundedSnippet, Prism.languages.javascript, "javascript");
  
  const sizeSnippet = [
    "TimePicker({ label: \"Regular\", size: \"regular\" });",
    "TimePicker({ label: \"Large\", size: \"large\" });",
    "TimePicker({ label: \"X-Large\", size: \"xlarge\" });"
  ].join("\n");
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");
  
  const disabledSnippet = [
    "TimePicker({ ",
    "  label: \"Disabled\",",
    "  disabled: true ",
    "});"
  ].join("\n");
  const disabledHtml = Prism.highlight(disabledSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Time Picker", 
      description: "Text input with HH:MM mask that shows a time selector popover when focused." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Basic Usage", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "A text input with HH:MM mask (24-hour format). The time selector popover appears when the input is focused. You can type the time directly or use the popover to adjust hours and minutes."),
          div({ class: "grid-flow gap-md items-start" }, [
            TimePicker({ label: "Time" })
          ]),
          CodeBlock({ html: basicHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "With Placeholder", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Customize the placeholder text for the input field."),
          div({ class: "grid-flow gap-md items-start" }, [
            TimePicker({ 
              label: "Meeting Time",
              placeholder: "Select time"
            })
          ]),
          CodeBlock({ html: placeholderHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Controlled Value", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Control the value and handle changes with callbacks. The change event provides both the formatted string and a time object with hours and minutes."),
          div({ class: "column-container gap-md items-start" }, [
            TimePicker({ 
              label: "Appointment",
              value: selectedTime.get(),
              change: (e) => {
                selectedTime.set(e.time);
                console.log('Selected time:', e.time);
              }
            }),
            selectedTime.get() && Text({ class: "text-secondary" }, 
              `Selected: ${String(selectedTime.get().hours).padStart(2, '0')}:${String(selectedTime.get().minutes).padStart(2, '0')}`
            )
          ]),
          CodeBlock({ html: valueHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Rounded Variant", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Fully rounded input style for modern designs."),
          div({ class: "grid-flow gap-md items-start" }, [
            TimePicker({ 
              label: "Rounded Time",
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
            TimePicker({ label: "Regular", size: "regular" }),
            TimePicker({ label: "Large", size: "large" }),
            TimePicker({ label: "X-Large", size: "xlarge" })
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Disabled State", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Disabled state prevents interaction."),
          div({ class: "grid-flow gap-md items-start" }, [
            TimePicker({ 
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
