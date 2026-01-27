import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Button } from "@bunnix/components";
import { HStack } from "@bunnix/components";
import { ComboBox } from "@bunnix/components";
import { showToast } from "@bunnix/components";
import { Container } from "@bunnix/components";

const { div, p } = Bunnix;

export default function ToastPage() {
  const headerOffset = "6rem";
  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" }
  ];
  const sizeSelection = Bunnix.useState("md");

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({
      title: "Toast Notification",
      description: "Transient feedback messages that appear in a corner and auto-dismiss."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Examples", stickyOffset: headerOffset }, [
        p("Click a button to show a toast in the selected corner."),
        HStack({ alignment: "leading", gap: "regular" }, [
          ComboBox({
            options: sizes,
            selection: sizeSelection
          })
        ]),
        HStack({ alignment: "leading", gap: "regular" }, [
          Button({ click: () => showToast({ message: "Saved successfully.", duration: 5, anchor: "topRight", size: sizeSelection.get(), icon: "icon-success-circle" }) }, "Top Right"),
          Button({ click: () => showToast({ message: "New message received.", duration: 5, anchor: "topLeft", size: sizeSelection.get(), icon: "icon-mail" }) }, "Top Left"),
          Button({ click: () => showToast({ message: "Export complete.", duration: 5, anchor: "bottomRight", size: sizeSelection.get(), icon: "icon-download" }) }, "Bottom Right"),
          Button({ click: () => showToast({ message: "Offline mode enabled.", duration: 5, anchor: "bottomLeft", size: sizeSelection.get(), icon: "icon-cloud" }) }, "Bottom Left"),
        ])
      ])
    ])
  ]);
}
