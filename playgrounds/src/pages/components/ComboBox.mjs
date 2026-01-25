import Bunnix, { useState } from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import ComboBox from "../../components/ComboBox.mjs";

const { div, p } = Bunnix;

export default function ComboBoxPage() {
  const headerOffset = "6rem";
  const selection = useState("Banana");

  const options = [
    { value: "Apple", label: "Apple" },
    { value: "Banana", label: "Banana" },
    { value: "Orange", label: "Orange" }
  ];

  return div({ class: "column-container page-layout" }, [
    PageHeader({
      title: "ComboBox",
      description: "Native select input wrapped with design system sizing and state binding."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Examples", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          ComboBox({ options, selection }),
          ComboBox({ options, selection, size: "lg" }),
          ComboBox({ options, selection, size: "xl" }),
          ComboBox({ options, selection, disabled: true })
        ]),
        p({ class: "text-secondary" }, selection.map((value) => `Selected: ${value}`))
      ])
    ])
  ]);
}
