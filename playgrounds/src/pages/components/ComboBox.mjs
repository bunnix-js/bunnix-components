import Bunnix, { useState } from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { ComboBox } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import { Text } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function ComboBoxPage() {
  const headerOffset = "6rem";
  const selection = useState("Banana");
  const countrySelection = useState("Brazil");

  const options = [
    { value: "Apple", label: "Apple" },
    { value: "Banana", label: "Banana" },
    { value: "Orange", label: "Orange" }
  ];

  const countries = [
    { value: "USA", label: "United States" },
    { value: "Brazil", label: "Brazil" },
    { value: "Canada", label: "Canada" },
    { value: "Mexico", label: "Mexico" }
  ];

  const basicSnippet = `const selection = useState("Banana");
const options = [
  { value: "Apple", label: "Apple" },
  { value: "Banana", label: "Banana" },
  { value: "Orange", label: "Orange" }
];

ComboBox({ options, selection });`;
  const basicHtml = Prism.highlight(basicSnippet, Prism.languages.javascript, "javascript");

  const labelSnippet = `ComboBox({ 
  label: "Select Fruit",
  options, 
  selection 
});`;
  const labelHtml = Prism.highlight(labelSnippet, Prism.languages.javascript, "javascript");

  const sizeSnippet = `ComboBox({ label: "Regular", options, selection, size: "regular" });
ComboBox({ label: "Large", options, selection, size: "large" });
ComboBox({ label: "X-Large", options, selection, size: "xlarge" });`;
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");

  const disabledSnippet = `ComboBox({ 
  label: "Disabled",
  options, 
  selection, 
  disabled: true 
});`;
  const disabledHtml = Prism.highlight(disabledSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      title: "ComboBox",
      description: "Native select dropdown with design system styling and reactive state binding."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Basic Usage", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "A styled native select element. Supports string arrays or objects with value/label pairs."),
          div({ class: "w-300" }, [
            ComboBox({ options, selection })
          ]),
          Text({ class: "text-secondary" }, selection.map((value) => `Selected: ${value}`)),
          CodeBlock({ html: basicHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "With Label", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Add a label above the select dropdown for better accessibility."),
          div({ class: "w-300" }, [
            ComboBox({ 
              label: "Select Fruit",
              options, 
              selection 
            })
          ]),
          CodeBlock({ html: labelHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Available sizes: regular, large, and xlarge."),
          div({ class: "column-container gap-md items-start max-w-400" }, [
            ComboBox({ label: "Regular", options, selection, size: "regular" }),
            ComboBox({ label: "Large", options, selection, size: "large" }),
            ComboBox({ label: "X-Large", options, selection, size: "xlarge" })
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Disabled State", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Disabled state prevents interaction."),
          div({ class: "w-300" }, [
            ComboBox({ 
              label: "Disabled",
              options, 
              selection, 
              disabled: true 
            })
          ]),
          CodeBlock({ html: disabledHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Multiple ComboBoxes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Each ComboBox can have its own state and options."),
          div({ class: "grid-flow gap-md items-start" }, [
            div({ class: "w-300" }, [
              ComboBox({ 
                label: "Favorite Fruit",
                options, 
                selection 
              })
            ]),
            div({ class: "w-300" }, [
              ComboBox({ 
                label: "Country",
                options: countries, 
                selection: countrySelection
              })
            ])
          ]),
          div({ class: "row-container gap-md" }, [
            Text({ class: "text-secondary" }, selection.map((value) => `Fruit: ${value}`)),
            Text({ class: "text-secondary" }, countrySelection.map((value) => `Country: ${value}`))
          ])
        ])
      ])
    ])
  ]);
}
