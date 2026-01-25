import Bunnix from "@bunnix/core";
import PageHeader from "../components/PageHeader.mjs";
const { div, h5, p, span, hr, input, textarea, label, select, option } = Bunnix;

const FormControl = (labelText, inputElement) => {
  return div({ class: "column-container w-300" }, [
    label({ class: "label" }, labelText),
    inputElement
  ]);
};

const SelectionControl = (labelText, inputElement) => {
  return label({ class: "selection-control" }, [
    inputElement,
    span({ class: "text-base" }, labelText)
  ]);
};

export default function ControlsPage() {
  return div({ class: "column-container page-layout" }, [
    PageHeader({ 
      title: "Controls", 
      description: "Form inputs and interactive control elements." 
    }),
    hr(),
    
    div({ class: "column-container gap-md" }, [
      div({ class: "column-container gap-sm" }, [
        h5("Textual Inputs"),
        div({ class: "grid-flow gap-md" }, [
          FormControl("Text Input", input({ type: "text", placeholder: "Type something..." })),
          FormControl("Email Input", input({ type: "email", placeholder: "user@example.com" })),
          FormControl("Password", input({ type: "password", value: "password123" })),
          FormControl("Number Input", input({ type: "number", value: "42" })),
        ]),
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("Select Menu"),
        div({ class: "grid-flow gap-md" }, [
          FormControl("Dropdown", select([
            option({ value: "1" }, "Option 1"),
            option({ value: "2" }, "Option 2"),
            option({ value: "3" }, "Option 3"),
          ])),
          FormControl("Disabled Select", select({ disabled: true }, [
            option("Disabled Choice")
          ])),
        ]),
      ]),

      div({ class: "row-container gap-lg" }, [
        div({ class: "column-container gap-sm" }, [
          h5("Checkboxes"),
          div({ class: "column-container gap-sm" }, [
            SelectionControl("Remember me", input({ type: "checkbox", checked: true })),
            SelectionControl("Subscribe to newsletter", input({ type: "checkbox" })),
            SelectionControl("Disabled Checkbox", input({ type: "checkbox", disabled: true })),
          ])
        ]),

        div({ class: "column-container gap-sm" }, [
          h5("Radio Buttons"),
          div({ class: "column-container gap-sm" }, [
            SelectionControl("Option A", input({ type: "radio", name: "radio-group", checked: true })),
            SelectionControl("Option B", input({ type: "radio", name: "radio-group" })),
            SelectionControl("Disabled Radio", input({ type: "radio", disabled: true })),
          ])
        ]),
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("DateTime Inputs"),
        div({ class: "grid-flow gap-md" }, [
          FormControl("Date", input({ type: "date" })),
          FormControl("Time", input({ type: "time" })),
          FormControl("DateTime Local", input({ type: "datetime-local" })),
        ]),
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("Sizes"),
        div({ class: "grid-flow gap-md items-center" }, [
          FormControl("Default", input({ type: "text", placeholder: "Default size" })),
          FormControl("Large (.input-lg)", input({ class: "input-lg", type: "text", placeholder: "Large input" })),
          FormControl("Extra Large (.input-xl)", input({ class: "input-xl", type: "text", placeholder: "Extra large input" })),
        ]),
        div({ class: "grid-flow gap-md items-center" }, [
          FormControl("Large Select", select({ class: "input-lg" }, [option("Option 1")])),
          FormControl("Extra Large Select", select({ class: "input-xl" }, [option("Option 1")])),
        ]),
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("Text Area"),
        div({ class: "w-full" }, [
          FormControl("Comments", textarea({ placeholder: "Tell us more..." })),
        ]),
      ]),
    ])
  ]);
}