import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { SearchBox } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function SearchBoxPage() {
  const headerOffset = "6rem";
  const searchValue = Bunnix.useState("");
  const dataset = [
    { key: "button", title: "Button", snippet: "Primary, secondary, and icon button styles.", icon: "button" },
    { key: "checkbox", title: "Checkbox", snippet: "Selection control with multiple states.", icon: "check" },
    { key: "input", title: "Input Field", snippet: "Text input with labels and suggestions.", icon: "pencil" },
    { key: "datepicker", title: "Date Picker", snippet: "Calendar selection with range support.", icon: "calendar" },
    { key: "timepicker", title: "Time Picker", snippet: "24-hour time selection with segments.", icon: "clock" },
    { key: "toast", title: "Toast", snippet: "Transient status notifications.", icon: "bell" }
  ];
  const variantSnippet = [
    "SearchBox({ placeholder: \"Regular\", onInput: (e) => searchValue.set(e.target.value) });",
    "SearchBox({ placeholder: \"Rounded\", variant: \"rounded\" });"
  ].join("\n");
  const variantHtml = Prism.highlight(variantSnippet, Prism.languages.javascript, "javascript");
  const sizeSnippet = [
    "SearchBox({ placeholder: \"Default\" });",
    "SearchBox({ placeholder: \"Large\", size: \"large\" });",
    "SearchBox({ placeholder: \"Extra Large\", size: \"xlarge\" });"
  ].join("\n");
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");
  const controlledSnippet = [
    "const searchValue = Bunnix.useState(\"\");",
    "",
    "SearchBox({",
    "  value: searchValue,",
    "  placeholder: \"Type to update state\",",
    "  onInput: (e) => searchValue.set(e.target.value)",
    "});"
  ].join("\n");
  const controlledHtml = Prism.highlight(controlledSnippet, Prism.languages.javascript, "javascript");
  const datasetSnippet = [
    "const dataset = [",
    "  { key: \"button\", title: \"Button\", snippet: \"Primary, secondary, and icon button styles.\", icon: \"button\" },",
    "  { key: \"checkbox\", title: \"Checkbox\", snippet: \"Selection control with multiple states.\", icon: \"check\" },",
    "  { key: \"input\", title: \"Input Field\", snippet: \"Text input with labels and suggestions.\", icon: \"pencil\" },",
    "  { key: \"datepicker\", title: \"Date Picker\", snippet: \"Calendar selection with range support.\", icon: \"calendar\" },",
    "  { key: \"timepicker\", title: \"Time Picker\", snippet: \"24-hour time selection with segments.\", icon: \"clock\" },",
    "  { key: \"toast\", title: \"Toast\", snippet: \"Transient status notifications.\", icon: \"bell\" }",
    "];",
    "",
    "SearchBox({",
    "  data: dataset,",
    "  value: searchValue,",
    "  placeholder: \"Search components...\",",
    "  onInput: (e) => searchValue.set(e.target.value)",
    "});"
  ].join("\n");
  const datasetHtml = Prism.highlight(datasetSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      title: "Search Box",
      description: "Search input with icon, sizing options, and rounded variant."
    }),
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Variants", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md" }, [
            div({ class: "w-300" }, [
              SearchBox({ placeholder: "Regular", onInput: (e) => searchValue.set(e.target.value) })
            ]),
            div({ class: "w-300" }, [
              SearchBox({ placeholder: "Rounded", variant: "rounded" })
            ])
          ]),
          CodeBlock({ html: variantHtml, language: "js", wrap: true })
        ])
      ]),
      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            div({ class: "w-300" }, [
              SearchBox({ placeholder: "Default" })
            ]),
            div({ class: "w-300" }, [
              SearchBox({ placeholder: "Large", size: "large" })
            ]),
            div({ class: "w-300" }, [
              SearchBox({ placeholder: "Extra Large", size: "xlarge" })
            ])
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ]),
      PageSection({ title: "Controlled", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "SearchBox supports value binding for filtering."),
          div({ class: "w-300" }, [
              SearchBox({
                value: searchValue,
                placeholder: "Type to update state",
                onInput: (e) => searchValue.set(e.target.value)
              })
          ]),
          CodeBlock({ html: controlledHtml, language: "js", wrap: true })
        ])
      ]),
      PageSection({ title: "Dataset Search", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Filters a dataset and shows up to five matches in a popover."),
          div({ class: "w-300" }, [
            SearchBox({
              data: dataset,
              value: searchValue,
              placeholder: "Search components...",
              onInput: (e) => searchValue.set(e.target.value)
            })
          ]),
          CodeBlock({ html: datasetHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
