import Bunnix, { useState } from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { ToggleSwitch } from "@bunnix/components";
import { Button } from "@bunnix/components";
import { HStack } from "@bunnix/components";
import { Container } from "@bunnix/components";

const { div } = Bunnix;

export default function SwitchPage() {
  const headerOffset = "6rem";
  const enabled = useState(false);

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Switch", 
      description: "A highly customizable toggle control built with semantic design system utilities." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Sizing Variants", stickyOffset: headerOffset }, [
        div({ class: "row-container gap-md items-center" }, [
          ToggleSwitch({ labelText: "Notifications", checked: true }),
          ToggleSwitch({ labelText: "Large", size: "lg" }),
          ToggleSwitch({ labelText: "Extra Large", size: "xl" }),
          ToggleSwitch({ labelText: "Disabled", disabled: true }),
        ])
      ]),

      PageSection({ title: "State Binding", stickyOffset: headerOffset }, [
        HStack({ alignment: "leading", gap: "regular" }, [
          ToggleSwitch({
            labelText: "Enable advanced options",
            checked: enabled,
            input: (e) => enabled.set(e.target.checked)
          }),
          Button({
            disabled: enabled.map((value) => !value)
          }, "Save Settings")
        ])
      ])
    ])
  ]);
}
