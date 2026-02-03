import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Badge } from "@bunnix/components";
import { Button } from "@bunnix/components";
import { Icon } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div } = Bunnix;

export default function BadgePage() {
  const headerOffset = "6rem";
  const toneSnippet = [
    "Badge({ tone: \"base\" }, \"Base\");",
    "Badge({ tone: \"success\" }, \"Success\");",
    "Badge({ tone: \"info\" }, \"Info\");",
    "Badge({ tone: \"warning\" }, \"Warning\");",
    "Badge({ tone: \"danger\" }, \"Danger\");",
    "Badge({ tone: \"accent\" }, \"Accent\");",
    "Badge({ tone: \"dimmed\" }, \"Dimmed\");"
  ].join("\n");
  const toneHtml = Prism.highlight(toneSnippet, Prism.languages.javascript, "javascript");
  const variantSnippet = [
    "Badge({ tone: \"success\", variant: \"solid\" }, \"Solid\");",
    "Badge({ tone: \"success\", variant: \"soft\" }, \"Soft\");",
    "Badge({ tone: \"success\", variant: \"outline\" }, \"Outline\");"
  ].join("\n");
  const variantHtml = Prism.highlight(variantSnippet, Prism.languages.javascript, "javascript");
  const sizeSnippet = [
    "Badge({ tone: \"accent\", size: \"xsmall\" }, \"XSmall\");",
    "Badge({ tone: \"accent\", size: \"small\" }, \"Small\");",
    "Badge({ tone: \"accent\", size: \"regular\" }, \"Regular\");"
  ].join("\n");
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");
  const shapeSnippet = [
    "Badge({ tone: \"accent\", shape: \"capsule\" }, \"Capsule\");",
    "Badge({ tone: \"accent\", shape: \"circle\", size: \"xsmall\" }, \"100\");"
  ].join("\n");
  const shapeHtml = Prism.highlight(shapeSnippet, Prism.languages.javascript, "javascript");
  const iconSnippet = [
    "Badge({ tone: \"success\", icon: \"check\" }, \"Active\");",
    "Badge({ tone: \"info\", icon: \"info\" }, \"Info\");",
    "Badge({ tone: \"danger\", icon: \"exclamation-mark\" }, \"Alert\");"
  ].join("\n");
  const iconHtml = Prism.highlight(iconSnippet, Prism.languages.javascript, "javascript");
  const overlapSnippet = [
    "div({ class: \"inline-flex\", style: \"anchor-name: --badge-anchor\" }, [",
    "  Button({ variant: \"accent\" }, [",
    "    Icon({ name: \"bell\", fill: \"white\" }),",
    "    \"Alerts\"",
    "  ])",
    "]);",
    "",
    "Badge({ tone: \"danger\", overlap: true, shape: \"circle\" }, \"99\");"
  ].join("\n");
  const overlapHtml = Prism.highlight(overlapSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      title: "Badge",
      description: "Compact status and metadata labels with tone, size, and variant options."
    }),
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Tones", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            Badge({ tone: "base" }, "Base"),
            Badge({ tone: "success" }, "Success"),
            Badge({ tone: "info" }, "Info"),
            Badge({ tone: "warning" }, "Warning"),
            Badge({ tone: "danger" }, "Danger"),
            Badge({ tone: "accent" }, "Accent"),
            Badge({ tone: "dimmed" }, "Dimmed")
          ]),
          CodeBlock({ html: toneHtml, language: "js", wrap: true })
        ])
      ]),
      PageSection({ title: "Variants", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            Badge({ tone: "success", variant: "solid" }, "Solid"),
            Badge({ tone: "success", variant: "soft" }, "Soft"),
            Badge({ tone: "success", variant: "outline" }, "Outline")
          ]),
          CodeBlock({ html: variantHtml, language: "js", wrap: true })
        ])
      ]),
      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            Badge({ tone: "accent", size: "xsmall" }, "XSmall"),
            Badge({ tone: "accent", size: "small" }, "Small"),
            Badge({ tone: "accent", size: "regular" }, "Regular")
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ]),
      PageSection({ title: "Shapes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            Badge({ tone: "accent", shape: "capsule" }, "Capsule"),
            Badge({ tone: "accent", shape: "circle", size: "xsmall" }, "100")
          ]),
          CodeBlock({ html: shapeHtml, language: "js", wrap: true })
        ])
      ]),
      PageSection({ title: "With Icon", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            Badge({ tone: "success", icon: "check" }, "Active"),
            Badge({ tone: "info", icon: "info" }, "Info"),
            Badge({ tone: "danger", icon: "exclamation-mark" }, "Alert")
          ]),
          CodeBlock({ html: iconHtml, language: "js", wrap: true })
        ])
      ]),
      PageSection({ title: "Overlap", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md items-center" }, [
            div({ class: "inline-flex", style: "anchor-name: --badge-anchor" }, [
              Button({ variant: "accent" }, [
                Icon({ name: "bell", fill: "white" }),
                "Alerts"
              ])
            ]),
            Badge({ tone: "danger", overlap: true, shape: "circle" }, "99")
          ]),
          CodeBlock({ html: overlapHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
