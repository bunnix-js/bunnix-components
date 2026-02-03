import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Icon } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p, span } = Bunnix;

export default function IconPage() {
  const headerOffset = "6rem";
  const basicSnippet = [
    "Icon({ name: \"home\" });",
    "Icon({ name: \"person\", fill: \"secondary\" });",
    "Icon({ name: \"trash\", fill: \"destructive\" });"
  ].join("\n");
  const basicHtml = Prism.highlight(basicSnippet, Prism.languages.javascript, "javascript");
  const sizeSnippet = [
    "Icon({ name: \"star\", size: \"md\" });",
    "Icon({ name: \"star\", size: \"lg\" });",
    "Icon({ name: \"star\", size: \"xl\" });"
  ].join("\n");
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");
  const contextSnippet = [
    "div({ class: \"card box gap-sm bg-accent text-white\" }, [",
    "  Icon({ name: \"check\", fill: \"white\" }),",
    "  \"Operation Successful\"",
    "]);",
    "",
    "div({ class: \"card box gap-sm bg-dimmed\" }, [",
    "  Icon({ name: \"info\", fill: \"base\" }),",
    "  \"System Information\"",
    "]);"
  ].join("\n");
  const contextHtml = Prism.highlight(contextSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Icon", 
      description: "A semantic wrapper for system icons with theme-aware tinting and sizing." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Basic Usage", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            div({ class: "column-container items-center gap-xs" }, [
              Icon({ name: "home" }),
              span({ class: "text-sm text-secondary" }, "Default (Base)")
            ]),
            div({ class: "column-container items-center gap-xs" }, [
              Icon({ name: "person", fill: "secondary" }),
              span({ class: "text-sm text-secondary" }, "Secondary Fill")
            ]),
            div({ class: "column-container items-center gap-xs" }, [
              Icon({ name: "trash", fill: "destructive" }),
              span({ class: "text-sm text-secondary" }, "Destructive Fill")
            ]),
          ]),
          CodeBlock({ html: basicHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            div({ class: "column-container items-center gap-xs" }, [
              Icon({ name: "star", size: "md" }),
              span({ class: "text-sm text-secondary" }, "Default (1rem)")
            ]),
            div({ class: "column-container items-center gap-xs" }, [
              Icon({ name: "star", size: "lg" }),
              span({ class: "text-sm text-secondary" }, "Large (1.5rem)")
            ]),
            div({ class: "column-container items-center gap-xs" }, [
              Icon({ name: "star", size: "xl" }),
              span({ class: "text-sm text-secondary" }, "Extra Large (2rem)")
            ]),
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "In-Context Examples", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md" }, [
            div({ class: "card box gap-sm bg-accent text-white" }, [
              Icon({ name: "check", fill: "white" }),
              "Operation Successful"
            ]),
            div({ class: "card box gap-sm bg-dimmed" }, [
              Icon({ name: "info", fill: "base" }),
              "System Information"
            ]),
          ]),
          CodeBlock({ html: contextHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
