import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import InputField from "../../components/InputField.mjs";
import Container from "../../components/Container.mjs";

const { div, p } = Bunnix;

export default function InputFieldPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Input Field", 
      description: "A semantic wrapper for standard HTML inputs with label and suggestion support." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Common Types", stickyOffset: headerOffset }, [
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
        ])
      ]),

      PageSection({ title: "Native Suggestions", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "Uses the HTML5 datalist element to provide non-obstructive auto-complete."),
        div({ class: "w-300" }, [
          InputField({ 
            type: "text", 
            label: "Search Frameworks", 
            placeholder: "Try 'Bunnix'...",
            suggestions: ["Bunnix", "React", "Vue", "Angular", "Svelte"]
          })
        ])
      ]),

      PageSection({ title: "Sizing Variants", stickyOffset: headerOffset }, [
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
        ])
      ]),

      PageSection({ title: "Rounded Variant", stickyOffset: headerOffset }, [
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
        ])
      ]),

      PageSection({ title: "States", stickyOffset: headerOffset }, [
        div({ class: "w-300" }, [
          InputField({ 
            label: "Disabled Field", 
            disabled: true, 
            value: "Read-only content" 
          })
        ])
      ])
    ])
  ]);
}
