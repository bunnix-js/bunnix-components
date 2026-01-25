import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import Button from "../../components/Button.mjs";
import HStack from "../../components/HStack.mjs";
import ComboBox from "../../components/ComboBox.mjs";
import { showToast } from "../../components/ToastNotification.mjs";

const { div, p } = Bunnix;

export default function ToastPage() {
  const headerOffset = "6rem";
  const sizes = [
    { value: "regular", label: "Regular" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" }
  ];
  const sizeSelection = Bunnix.useState("regular");

  return div({ class: "column-container page-layout" }, [
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
          Button({ click: () => showToast({ message: "Saved successfully.", duration: 3, anchor: "topRight", size: sizeSelection.get() }) }, "Top Right"),
          Button({ click: () => showToast({ message: "New message received.", duration: 3, anchor: "topLeft", size: sizeSelection.get() }) }, "Top Left"),
          Button({ click: () => showToast({ message: "Export complete.", duration: 3, anchor: "bottomRight", size: sizeSelection.get() }) }, "Bottom Right"),
          Button({ click: () => showToast({ message: "Offline mode enabled.", duration: 3, anchor: "bottomLeft", size: sizeSelection.get() }) }, "Bottom Left"),
        ])
      ])
    ])
  ]);
}
