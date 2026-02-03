import Bunnix, { useState } from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { ComboBox } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function ComboBoxPage() {
  const headerOffset = "6rem";
  const selection = useState("Banana");

  const options = [
    { value: "Apple", label: "Apple" },
    { value: "Banana", label: "Banana" },
    { value: "Orange", label: "Orange" }
  ];
  const comboSnippet = [
    "const selection = useState(\"Banana\");",
    "const options = [",
    "  { value: \"Apple\", label: \"Apple\" },",
    "  { value: \"Banana\", label: \"Banana\" },",
    "  { value: \"Orange\", label: \"Orange\" }",
    "];",
    "",
    "ComboBox({ options, selection });",
    "ComboBox({ options, selection, size: \"lg\" });",
    "ComboBox({ options, selection, size: \"xl\" });",
    "ComboBox({ options, selection, disabled: true });"
  ].join("\n");
  const comboHtml = Prism.highlight(comboSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      title: "ComboBox",
      description: "Native select input wrapped with design system sizing and state binding."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Examples", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            ComboBox({ options, selection }),
            ComboBox({ options, selection, size: "lg" }),
            ComboBox({ options, selection, size: "xl" }),
            ComboBox({ options, selection, disabled: true })
          ]),
          p({ class: "text-secondary" }, selection.map((value) => `Selected: ${value}`)),
          CodeBlock({ html: comboHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
