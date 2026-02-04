import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Button } from "@bunnix/components";
import { Icon } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p, span } = Bunnix;

export default function ButtonPage() {
  const headerOffset = "6rem";
  const variantSnippet = [
    "Button({ variant: \"regular\" }, \"Regular\");",
    "Button({ variant: \"flat\" }, \"Flat\");",
    "Button({ variant: \"outline\" }, \"Outline\");",
    "Button({ variant: \"destructive\" }, \"Destructive\");",
    "Button({ variant: \"hyperlink\" }, \"Hyperlink\");"
  ].join("\n");
  const variantHtml = Prism.highlight(variantSnippet, Prism.languages.javascript, "javascript");
  const sizeSnippet = [
    "Button({ size: \"xsmall\" }, \"Extra Small\");",
    "Button({ size: \"small\" }, \"Small\");",
    "Button({ size: \"regular\" }, \"Default\");",
    "Button({ size: \"large\" }, \"Large\");",
    "Button({ size: \"xlarge\" }, \"Extra Large\");"
  ].join("\n");
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");
  const linkSnippet = [
    "Button({ type: \"link\", href: \"#\", variant: \"regular\" }, \"Link Button\");",
    "Button({ type: \"link\", href: \"#\", variant: \"outline\" }, \"Outline Link\");",
    "Button({ type: \"link\", href: \"#\", variant: \"flat\" }, \"Flat Link\");"
  ].join("\n");
  const linkHtml = Prism.highlight(linkSnippet, Prism.languages.javascript, "javascript");
  const iconSnippet = [
    "Button({ variant: \"regular\" }, [",
    "  Icon({ name: \"add\" }),",
    "  \"Create\"",
    "]);",
    "",
    "Button({ variant: \"outline\" }, [",
    "  Icon({ name: \"gear\" }),",
    "  \"Settings\"",
    "]);",
    "",
    "Button({ variant: \"flat\", size: \"xlarge\" }, [",
    "  Icon({ name: \"logout\", size: \"xlarge\" }),",
    "  \"Log Out\"",
    "]);"
  ].join("\n");
  const iconHtml = Prism.highlight(iconSnippet, Prism.languages.javascript, "javascript");
  const tintSnippet = [
    "Button({ variant: \"regular\" }, [",
    "  Icon({ name: \"star\", fill: \"white\" }),",
    "  span({ class: \"text-white\" }, \"Force White\")",
    "]);",
    "",
    "Button({ variant: \"outline\" }, [",
    "  Icon({ name: \"exclamation-mark\", fill: \"tertiary\" }),",
    "  span({ class: \"text-tertiary\" }, \"Tertiary\")",
    "]);",
    "",
    "Button({ variant: \"flat\" }, [",
    "  Icon({ name: \"trash\", fill: \"destructive\" }),",
    "  span({ class: \"text-destructive\" }, \"Destructive\")",
    "]);"
  ].join("\n");
  const tintHtml = Prism.highlight(tintSnippet, Prism.languages.javascript, "javascript");
  const stateSnippet = [
    "Button({ disabled: true }, \"Disabled Button\");",
    "Button({ type: \"link\", href: \"#\", disabled: true, variant: \"outline\" }, \"Disabled Link\");"
  ].join("\n");
  const stateHtml = Prism.highlight(stateSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Button", 
      description: "Standard action elements with multiple variants and support for link types." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Variants", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            Button({ variant: "regular" }, "Regular"),
            Button({ variant: "flat" }, "Flat"),
            Button({ variant: "outline" }, "Outline"),
            Button({ variant: "destructive" }, "Destructive"),
            Button({ variant: "hyperlink" }, "Hyperlink"),
          ]),
          CodeBlock({ html: variantHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            Button({ size: "xsmall" }, "Extra Small"),
            Button({ size: "small" }, "Small"),
            Button({ size: "regular" }, "Default"),
            Button({ size: "large" }, "Large"),
            Button({ size: "xlarge" }, "Extra Large"),
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Link Type", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Buttons rendered as anchor tags for navigation."),
          div({ class: "grid-flow gap-md items-center" }, [
            Button({ type: "link", href: "#", variant: "regular" }, "Link Button"),
            Button({ type: "link", href: "#", variant: "outline" }, "Outline Link"),
            Button({ type: "link", href: "#", variant: "flat" }, "Flat Link"),
          ]),
          CodeBlock({ html: linkHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "With Icons", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            Button({ variant: "regular" }, [
              Icon({ name: "add" }),
              "Create"
            ]),
            Button({ variant: "outline" }, [
              Icon({ name: "gear" }),
              "Settings"
            ]),
            Button({ variant: "flat", size: "xlarge" }, [
              Icon({ name: "logout", size: "xlarge" }),
              "Log Out"
            ]),
          ]),
          CodeBlock({ html: iconHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Tint Overrides", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            Button({ variant: "regular" }, [
              Icon({ name: "star", fill: "white" }),
              span({ class: "text-white" }, "Force White")
            ]),
            Button({ variant: "outline" }, [
              Icon({ name: "exclamation-mark", fill: "tertiary" }),
              span({ class: "text-tertiary" }, "Tertiary")
            ]),
            Button({ variant: "flat" }, [
              Icon({ name: "trash", fill: "destructive" }),
              span({ class: "text-destructive" }, "Destructive")
            ]),
          ]),
          CodeBlock({ html: tintHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "States", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            Button({ disabled: true }, "Disabled Button"),
            Button({ type: "link", href: "#", disabled: true, variant: "outline" }, "Disabled Link"),
          ]),
          CodeBlock({ html: stateHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
