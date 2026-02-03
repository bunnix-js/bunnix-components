import Bunnix, { useState } from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { ToggleSwitch } from "@bunnix/components";
import { Button } from "@bunnix/components";
import { HStack } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div } = Bunnix;

export default function SwitchPage() {
  const headerOffset = "6rem";
  const enabled = useState(false);
  const sizingSnippet = [
    "ToggleSwitch({ labelText: \"Notifications\", checked: true });",
    "ToggleSwitch({ labelText: \"Large\", size: \"lg\" });",
    "ToggleSwitch({ labelText: \"Extra Large\", size: \"xl\" });",
    "ToggleSwitch({ labelText: \"Disabled\", disabled: true });"
  ].join("\n");
  const sizingHtml = Prism.highlight(sizingSnippet, Prism.languages.javascript, "javascript");
  const stateSnippet = [
    "const enabled = useState(false);",
    "",
    "ToggleSwitch({",
    "  labelText: \"Enable advanced options\",",
    "  checked: enabled,",
    "  input: (e) => enabled.set(e.target.checked)",
    "});",
    "",
    "Button({",
    "  disabled: enabled.map((value) => !value)",
    "}, \"Save Settings\");"
  ].join("\n");
  const stateHtml = Prism.highlight(stateSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Switch", 
      description: "A highly customizable toggle control built with semantic design system utilities." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Sizing Variants", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "row-container gap-md items-center" }, [
            ToggleSwitch({ labelText: "Notifications", checked: true }),
            ToggleSwitch({ labelText: "Large", size: "lg" }),
            ToggleSwitch({ labelText: "Extra Large", size: "xl" }),
            ToggleSwitch({ labelText: "Disabled", disabled: true }),
          ]),
          CodeBlock({ html: sizingHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "State Binding", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          HStack({ alignment: "leading", gap: "regular" }, [
            ToggleSwitch({
              labelText: "Enable advanced options",
              checked: enabled,
              input: (e) => enabled.set(e.target.checked)
            }),
            Button({
              disabled: enabled.map((value) => !value)
            }, "Save Settings")
          ]),
          CodeBlock({ html: stateHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
