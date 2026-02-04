import Bunnix, { useState } from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Checkbox } from "@bunnix/components";
import { RadioCheckbox } from "@bunnix/components";
import { Button } from "@bunnix/components";
import { HStack } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function CheckboxPage() {
  const headerOffset = "6rem";
  const agreed = useState(false);
  const checkboxSnippet = [
    "Checkbox({ label: \"Remember me\", checked: true });",
    "Checkbox({ label: \"Large Checkbox\", size: \"large\" });",
    "Checkbox({ label: \"Extra Large Checkbox\", size: \"xlarge\" });",
    "Checkbox({ label: \"Subscribe to newsletter\" });",
    "Checkbox({ label: \"Disabled Checkbox\", disabled: true });"
  ].join("\n");
  const checkboxHtml = Prism.highlight(checkboxSnippet, Prism.languages.javascript, "javascript");
  const radioSnippet = [
    "RadioCheckbox({ labelText: \"Option A\", name: \"radio-demo\", checked: true });",
    "RadioCheckbox({ labelText: \"Option B\", name: \"radio-demo\" });",
    "RadioCheckbox({ labelText: \"Large Radio\", name: \"radio-demo-lg\", size: \"large\" });",
    "RadioCheckbox({ labelText: \"Extra Large Radio\", name: \"radio-demo-xl\", size: \"xlarge\" });",
    "RadioCheckbox({ labelText: \"Disabled Radio\", name: \"radio-demo\", disabled: true });"
  ].join("\n");
  const radioHtml = Prism.highlight(radioSnippet, Prism.languages.javascript, "javascript");
  const bindingSnippet = [
    "const agreed = useState(false);",
    "",
    "Checkbox({",
    "  label: \"I agree to the terms\",",
    "  checked: agreed,",
    "  check: (value) => agreed.set(value)",
    "});",
    "",
    "Button({",
    "  variant: \"regular\",",
    "  disabled: agreed.map((value) => !value)",
    "}, \"Continue\");"
  ].join("\n");
  const bindingHtml = Prism.highlight(bindingSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      title: "Checkbox",
      description: "Selection controls built with the Checkbox component."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Checkboxes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm" }, [
            Checkbox({ label: "Remember me", checked: true }),
            Checkbox({ label: "Large Checkbox", size: "large" }),
            Checkbox({ label: "Extra Large Checkbox", size: "xlarge" }),
            Checkbox({ label: "Subscribe to newsletter" }),
            Checkbox({ label: "Disabled Checkbox", disabled: true })
          ]),
          CodeBlock({ html: checkboxHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Radio Buttons", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm" }, [
            RadioCheckbox({ labelText: "Option A", name: "radio-demo", checked: true }),
            RadioCheckbox({ labelText: "Option B", name: "radio-demo" }),
            RadioCheckbox({ labelText: "Large Radio", name: "radio-demo-lg", size: "large" }),
            RadioCheckbox({ labelText: "Extra Large Radio", name: "radio-demo-xl", size: "xlarge" }),
            RadioCheckbox({ labelText: "Disabled Radio", name: "radio-demo", disabled: true })
          ]),
          CodeBlock({ html: radioHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "State Binding", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          HStack({ alignment: "leading", gap: "regular" }, [
            Checkbox({
              label: "I agree to the terms",
              checked: agreed,
              check: (value) => agreed.set(value)
            }),
            Button({
              variant: "regular",
              disabled: agreed.map((value) => !value)
            }, "Continue")
          ]),
          CodeBlock({ html: bindingHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
