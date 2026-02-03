import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { InputField } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function InputFieldPage() {
  const headerOffset = "6rem";
  const commonSnippet = [
    "InputField({",
    "  label: \"Text Input\",",
    "  placeholder: \"Type something...\",",
    "  input: (e) => console.log(\"Input:\", e.target.value)",
    "});",
    "",
    "InputField({",
    "  type: \"search\",",
    "  label: \"Search Input\",",
    "  placeholder: \"Search...\"",
    "});",
    "",
    "InputField({",
    "  type: \"email\",",
    "  label: \"Email Input\",",
    "  placeholder: \"user@example.com\"",
    "});",
    "",
    "InputField({",
    "  type: \"password\",",
    "  label: \"Password\",",
    "  value: \"secret-password\"",
    "});",
    "",
    "InputField({",
    "  type: \"number\",",
    "  label: \"Number\",",
    "  placeholder: \"0\"",
    "});"
  ].join("\n");
  const commonHtml = Prism.highlight(commonSnippet, Prism.languages.javascript, "javascript");
  const suggestionSnippet = [
    "InputField({",
    "  type: \"text\",",
    "  label: \"Search Frameworks\",",
    "  placeholder: \"Try 'Bunnix'...\",",
    "  suggestions: [\"Bunnix\", \"React\", \"Vue\", \"Angular\", \"Svelte\"]",
    "});"
  ].join("\n");
  const suggestionHtml = Prism.highlight(suggestionSnippet, Prism.languages.javascript, "javascript");
  const sizeSnippet = [
    "InputField({ label: \"Default\", placeholder: \"Standard size\" });",
    "InputField({ label: \"Large\", class: \"input-lg\", placeholder: \"Large (.input-lg)\" });",
    "InputField({ label: \"Extra Large\", class: \"input-xl\", placeholder: \"Extra large (.input-xl)\" });"
  ].join("\n");
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");
  const roundedSnippet = [
    "InputField({ label: \"Rounded\", variant: \"rounded\", placeholder: \"Rounded input\" });",
    "InputField({ label: \"Rounded Large\", variant: \"rounded\", class: \"input-lg\", placeholder: \"Rounded large\" });",
    "InputField({ label: \"Rounded Extra Large\", variant: \"rounded\", class: \"input-xl\", placeholder: \"Rounded XL\" });"
  ].join("\n");
  const roundedHtml = Prism.highlight(roundedSnippet, Prism.languages.javascript, "javascript");
  const stateSnippet = [
    "InputField({",
    "  label: \"Disabled Field\",",
    "  disabled: true,",
    "  value: \"Read-only content\"",
    "});"
  ].join("\n");
  const stateHtml = Prism.highlight(stateSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Input Field", 
      description: "A semantic wrapper for standard HTML inputs with label and suggestion support." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Common Types", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md" }, [
            div({ class: "w-300" }, [
              InputField({ 
                label: "Text Input", 
                placeholder: "Type something...",
                input: (e) => console.log("Input:", e.target.value)
              })
            ]),
            div({ class: "w-300" }, [
              InputField({ 
                type: "search",
                label: "Search Input", 
                placeholder: "Search..."
              })
            ]),
            div({ class: "w-300" }, [
              InputField({ 
                type: "email", 
                label: "Email Input", 
                placeholder: "user@example.com" 
              })
            ]),
            div({ class: "w-300" }, [
              InputField({ 
                type: "password", 
                label: "Password", 
                value: "secret-password" 
              })
            ]),
            div({ class: "w-300" }, [
              InputField({ 
                type: "number", 
                label: "Number", 
                placeholder: "0" 
              })
            ]),
          ]),
          CodeBlock({ html: commonHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Native Suggestions", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Uses the HTML5 datalist element to provide non-obstructive auto-complete."),
          div({ class: "w-300" }, [
            InputField({ 
              type: "text", 
              label: "Search Frameworks", 
              placeholder: "Try 'Bunnix'...",
              suggestions: ["Bunnix", "React", "Vue", "Angular", "Svelte"]
            })
          ]),
          CodeBlock({ html: suggestionHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Sizing Variants", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            div({ class: "w-300" }, [
              InputField({ label: "Default", placeholder: "Standard size" })
            ]),
            div({ class: "w-300" }, [
              InputField({ label: "Large", class: "input-lg", placeholder: "Large (.input-lg)" })
            ]),
            div({ class: "w-300" }, [
              InputField({ label: "Extra Large", class: "input-xl", placeholder: "Extra large (.input-xl)" })
            ]),
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Rounded Variant", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            div({ class: "w-300" }, [
              InputField({ label: "Rounded", variant: "rounded", placeholder: "Rounded input" })
            ]),
            div({ class: "w-300" }, [
              InputField({ label: "Rounded Large", variant: "rounded", class: "input-lg", placeholder: "Rounded large" })
            ]),
            div({ class: "w-300" }, [
              InputField({ label: "Rounded Extra Large", variant: "rounded", class: "input-xl", placeholder: "Rounded XL" })
            ]),
          ]),
          CodeBlock({ html: roundedHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "States", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "w-300" }, [
            InputField({ 
              label: "Disabled Field", 
              disabled: true, 
              value: "Read-only content" 
            })
          ]),
          CodeBlock({ html: stateHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
