import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { HStack } from "@bunnix/components";
import { VStack } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, span } = Bunnix;

const Box = (text) => div({ class: "bg-accent p-sm rounded text-white" }, text);

export default function StacksPage() {
  const headerOffset = "6rem";
  const hstackSnippet = [
    "HStack({}, [ Box(\"Item 1\"), Box(\"Item 2\"), Box(\"Item 3\") ]);",
    "HStack({ alignment: \"middle\" }, [ Box(\"Item 1\"), Box(\"Item 2\"), Box(\"Item 3\") ]);",
    "HStack({ alignment: \"trailing\" }, [ Box(\"Item 1\"), Box(\"Item 2\"), Box(\"Item 3\") ]);"
  ].join("\n");
  const hstackHtml = Prism.highlight(hstackSnippet, Prism.languages.javascript, "javascript");
  const vstackSnippet = [
    "VStack({ alignment: \"leading\", class: \"h-200 border-dashed p-sm\" }, [",
    "  Box(\"Item 1\"),",
    "  Box(\"Longer Item 2\"),",
    "  Box(\"Item 3\")",
    "]);",
    "",
    "VStack({ alignment: \"middle\", class: \"h-200 border-dashed p-sm\" }, [",
    "  Box(\"Item 1\"),",
    "  Box(\"Longer Item 2\"),",
    "  Box(\"Item 3\")",
    "]);",
    "",
    "VStack({ alignment: \"trailing\", class: \"h-200 border-dashed p-sm\" }, [",
    "  Box(\"Item 1\"),",
    "  Box(\"Longer Item 2\"),",
    "  Box(\"Item 3\")",
    "]);"
  ].join("\n");
  const vstackHtml = Prism.highlight(vstackSnippet, Prism.languages.javascript, "javascript");
  const verticalSnippet = [
    "HStack({ verticalAlignment: \"top\" }, [",
    "  Box(\"Short\"),",
    "  div({ class: \"bg-accent p-sm rounded text-white\", style: \"height: 80px; display: flex; align-items: center;\" }, \"Tall Item\"),",
    "  Box(\"Short\")",
    "]);",
    "",
    "HStack({ verticalAlignment: \"center\" }, [",
    "  Box(\"Short\"),",
    "  div({ class: \"bg-accent p-sm rounded text-white\", style: \"height: 80px; display: flex; align-items: center;\" }, \"Tall Item\"),",
    "  Box(\"Short\")",
    "]);",
    "",
    "HStack({ verticalAlignment: \"bottom\" }, [",
    "  Box(\"Short\"),",
    "  div({ class: \"bg-accent p-sm rounded text-white\", style: \"height: 80px; display: flex; align-items: center;\" }, \"Tall Item\"),",
    "  Box(\"Short\")",
    "]);"
  ].join("\n");
  const verticalHtml = Prism.highlight(verticalSnippet, Prism.languages.javascript, "javascript");
  const gapSnippet = [
    "HStack({ gap: \"small\" }, [ Box(\"1\"), Box(\"2\"), Box(\"3\"), Box(\"4\") ]);",
    "HStack({ gap: \"regular\" }, [ Box(\"1\"), Box(\"2\"), Box(\"3\"), Box(\"4\") ]);",
    "HStack({ gap: \"large\" }, [ Box(\"1\"), Box(\"2\"), Box(\"3\"), Box(\"4\") ]);"
  ].join("\n");
  const gapHtml = Prism.highlight(gapSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Stacks", 
      description: "Primitive layout containers for consistent horizontal and vertical distribution." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "HStack (Horizontal)", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md w-full" }, [
          div({ class: "column-container gap-md" }, [
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Leading (Default)"),
              HStack({}, [ Box("Item 1"), Box("Item 2"), Box("Item 3") ])
            ]),
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Middle Alignment"),
              HStack({ alignment: "middle" }, [ Box("Item 1"), Box("Item 2"), Box("Item 3") ])
            ]),
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Trailing Alignment"),
              HStack({ alignment: "trailing" }, [ Box("Item 1"), Box("Item 2"), Box("Item 3") ])
            ]),
          ]),
          CodeBlock({ html: hstackHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "VStack (Vertical)", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-lg" }, [
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Leading (Left)"),
              VStack({ alignment: "leading", class: "h-200 border-dashed p-sm" }, [ Box("Item 1"), Box("Longer Item 2"), Box("Item 3") ])
            ]),
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Middle (Center)"),
              VStack({ alignment: "middle", class: "h-200 border-dashed p-sm" }, [ Box("Item 1"), Box("Longer Item 2"), Box("Item 3") ])
            ]),
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Trailing (Right)"),
              VStack({ alignment: "trailing", class: "h-200 border-dashed p-sm" }, [ Box("Item 1"), Box("Longer Item 2"), Box("Item 3") ])
            ]),
          ]),
          CodeBlock({ html: vstackHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "HStack Vertical Alignment", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-md" }, [
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Top Alignment"),
              div({ class: "h-200 border-dashed p-sm" }, [
                HStack({ verticalAlignment: "top" }, [ 
                  Box("Short"), 
                  div({ class: "bg-accent p-sm rounded text-white", style: "height: 80px; display: flex; align-items: center;" }, "Tall Item"),
                  Box("Short") 
                ])
              ])
            ]),
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Center Alignment (Default)"),
              div({ class: "h-200 border-dashed p-sm" }, [
                HStack({ verticalAlignment: "center" }, [ 
                  Box("Short"), 
                  div({ class: "bg-accent p-sm rounded text-white", style: "height: 80px; display: flex; align-items: center;" }, "Tall Item"),
                  Box("Short") 
                ])
              ])
            ]),
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Bottom Alignment"),
              div({ class: "h-200 border-dashed p-sm" }, [
                HStack({ verticalAlignment: "bottom" }, [ 
                  Box("Short"), 
                  div({ class: "bg-accent p-sm rounded text-white", style: "height: 80px; display: flex; align-items: center;" }, "Tall Item"),
                  Box("Short") 
                ])
              ])
            ]),
          ]),
          CodeBlock({ html: verticalHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Gaps", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-md" }, [
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Small Gap"),
              HStack({ gap: "small" }, [ Box("1"), Box("2"), Box("3"), Box("4") ])
            ]),
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Regular Gap"),
              HStack({ gap: "regular" }, [ Box("1"), Box("2"), Box("3"), Box("4") ])
            ]),
            div({ class: "column-container gap-sm" }, [
              span({ class: "text-sm text-tertiary" }, "Large Gap"),
              HStack({ gap: "large" }, [ Box("1"), Box("2"), Box("3"), Box("4") ])
            ]),
          ]),
          CodeBlock({ html: gapHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
