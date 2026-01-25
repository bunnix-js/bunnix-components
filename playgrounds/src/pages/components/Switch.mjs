import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import ToggleSwitch from "../../components/ToggleSwitch.mjs";

const { div, h5, p, hr } = Bunnix;

export default function SwitchPage() {
  return div({ class: "column-container page-layout" }, [
    PageHeader({ 
      title: "Switch", 
      description: "A highly customizable toggle control built with semantic design system utilities." 
    }),
    hr(),

    div({ class: "column-container gap-md" }, [
      div({ class: "column-container gap-sm" }, [
        h5("Variants"),
        div({ class: "row-container gap-md items-center" }, [
          ToggleSwitch({ labelText: "Notifications", checked: true }),
          ToggleSwitch({ labelText: "Large", size: "lg" }),
          ToggleSwitch({ labelText: "Extra Large", size: "xl" }),
          ToggleSwitch({ labelText: "Disabled", disabled: true }),
        ])
      ])
    ])
  ]);
}