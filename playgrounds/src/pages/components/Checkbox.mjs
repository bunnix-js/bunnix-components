import Bunnix, { useState } from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import Checkbox from "../../components/Checkbox.mjs";
import RadioCheckbox from "../../components/RadioCheckbox.mjs";
import Button from "../../components/Button.mjs";
import HStack from "../../components/HStack.mjs";

const { div, p } = Bunnix;

export default function CheckboxPage() {
  const headerOffset = "6rem";
  const agreed = useState(false);

  return div({ class: "column-container page-layout" }, [
    PageHeader({
      title: "Checkbox",
      description: "Selection controls built with the Checkbox component."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Checkboxes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-sm" }, [
          Checkbox({ labelText: "Remember me", checked: true }),
          Checkbox({ labelText: "Large Checkbox", size: "lg" }),
          Checkbox({ labelText: "Extra Large Checkbox", size: "xl" }),
          Checkbox({ labelText: "Subscribe to newsletter" }),
          Checkbox({ labelText: "Disabled Checkbox", disabled: true })
        ])
      ]),

      PageSection({ title: "Radio Buttons", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-sm" }, [
          RadioCheckbox({ labelText: "Option A", name: "radio-demo", checked: true }),
          RadioCheckbox({ labelText: "Option B", name: "radio-demo" }),
          RadioCheckbox({ labelText: "Large Radio", name: "radio-demo-lg", size: "lg" }),
          RadioCheckbox({ labelText: "Extra Large Radio", name: "radio-demo-xl", size: "xl" }),
          RadioCheckbox({ labelText: "Disabled Radio", name: "radio-demo", disabled: true })
        ])
      ]),

      PageSection({ title: "State Binding", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-sm" }, [
          HStack({ alignment: "leading", gap: "regular" }, [
            Checkbox({
              labelText: "I agree to the terms",
              checked: agreed,
              check: (value) => agreed.set(value)
            }),
            Button({
              variant: "regular",
              disabled: agreed.map((value) => !value)
            }, "Continue")
          ])
        ])
      ])
    ])
  ]);
}
