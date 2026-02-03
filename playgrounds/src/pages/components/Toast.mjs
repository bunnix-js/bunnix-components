import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Button } from "@bunnix/components";
import { HStack } from "@bunnix/components";
import { ComboBox } from "@bunnix/components";
import { showToast } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function ToastPage() {
  const headerOffset = "6rem";
  const sizes = [
    { value: "regular", label: "Regular" },
    { value: "large", label: "Large" },
    { value: "xlarge", label: "Extra Large" }
  ];
  const sizeSelection = Bunnix.useState("regular");
  const toastSnippet = [
    "const sizes = [",
    "  { value: \"regular\", label: \"Regular\" },",
    "  { value: \"large\", label: \"Large\" },",
    "  { value: \"xlarge\", label: \"Extra Large\" }",
    "];",
    "const sizeSelection = Bunnix.useState(\"regular\");",
    "",
    "ComboBox({ options: sizes, selection: sizeSelection });",
    "",
    "Button({",
    "  click: () => showToast({",
    "    message: \"Saved successfully.\",",
    "    duration: 5,",
    "    anchor: \"topRight\",",
    "    size: sizeSelection.get(),",
    "    icon: \"icon-success-circle\"",
    "  })",
    "}, \"Top Right\");",
    "",
    "Button({",
    "  click: () => showToast({",
    "    message: \"New message received.\",",
    "    duration: 5,",
    "    anchor: \"topLeft\",",
    "    size: sizeSelection.get(),",
    "    icon: \"icon-mail\"",
    "  })",
    "}, \"Top Left\");",
    "",
    "Button({",
    "  click: () => showToast({",
    "    message: \"Export complete.\",",
    "    duration: 5,",
    "    anchor: \"bottomRight\",",
    "    size: sizeSelection.get(),",
    "    icon: \"icon-download\"",
    "  })",
    "}, \"Bottom Right\");",
    "",
    "Button({",
    "  click: () => showToast({",
    "    message: \"Offline mode enabled.\",",
    "    duration: 5,",
    "    anchor: \"bottomLeft\",",
    "    size: sizeSelection.get(),",
    "    icon: \"icon-cloud\"",
    "  })",
    "}, \"Bottom Left\");"
  ].join("\n");
  const toastHtml = Prism.highlight(toastSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      title: "Toast Notification",
      description: "Transient feedback messages that appear in a corner and auto-dismiss."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Examples", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
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
          ]),
          CodeBlock({ html: toastHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
