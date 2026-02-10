import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Card } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p, span } = Bunnix;

const SampleCard = ({ title, body, className = "", direction, alignment } = {}) =>
  Card({ class: className, direction, alignment }, [
    span({ class: "text-sm text-tertiary" }, title),
    p({ class: "no-margin" }, body)
  ]);

export default function CardPage() {
  const headerOffset = "6rem";
  const basicSnippet = [
    "Card({}, [",
    "  span({ class: \"text-sm text-tertiary\" }, \"Default Card\"),",
    "  p({ class: \"no-margin\" }, \"Standard card container with base padding.\")",
    "]);",
    "",
    "Card({ class: \"box\" }, [",
    "  span({ class: \"text-sm text-tertiary\" }, \"Card + Box\"),",
    "  p({ class: \"no-margin\" }, \"Combine with utilities for extra spacing.\")",
    "]);"
  ].join("\n");
  const basicHtml = Prism.highlight(basicSnippet, Prism.languages.javascript, "javascript");
  const directionSnippet = [
    "Card({ direction: \"horizontal\", class: \"box gap-md items-center\" }, [",
    "  div({ class: \"bg-accent w-40 h-40 rounded\" }),",
    "  div({ class: \"column-container gap-xs\" }, [",
    "    span({ class: \"text-sm text-tertiary\" }, \"Horizontal\"),",
    "    span(\"Row layout using the card surface.\")",
    "  ])",
    "]);",
    "",
    "Card({ direction: \"column\", class: \"box\" }, [",
    "  span({ class: \"text-sm text-tertiary\" }, \"Vertical\"),",
    "  span(\"Column layout using the card surface.\")",
    "]);"
  ].join("\n");
  const directionHtml = Prism.highlight(directionSnippet, Prism.languages.javascript, "javascript");
  const alignmentSnippet = [
    "Card({ direction: \"horizontal\", alignment: \"leading\", class: \"box\" }, [",
    "  span({ class: \"text-sm text-tertiary\" }, \"Leading (Row)\"),",
    "  p({ class: \"no-margin\" }, \"justify-start when direction is horizontal.\")",
    "]);",
    "",
    "Card({ direction: \"horizontal\", alignment: \"middle\", class: \"box\" }, [",
    "  span({ class: \"text-sm text-tertiary\" }, \"Middle (Row)\"),",
    "  p({ class: \"no-margin\" }, \"justify-center when direction is horizontal.\")",
    "]);",
    "",
    "Card({ direction: \"horizontal\", alignment: \"trailing\", class: \"box\" }, [",
    "  span({ class: \"text-sm text-tertiary\" }, \"Trailing (Row)\"),",
    "  p({ class: \"no-margin\" }, \"justify-end when direction is horizontal.\")",
    "]);",
    "",
    "Card({ direction: \"column\", alignment: \"leading\", class: \"box\" }, [",
    "  span({ class: \"text-sm text-tertiary\" }, \"Leading (Column)\"),",
    "  p({ class: \"no-margin\" }, \"items-start when direction is vertical.\")",
    "]);",
    "",
    "Card({ direction: \"column\", alignment: \"middle\", class: \"box\" }, [",
    "  span({ class: \"text-sm text-tertiary\" }, \"Middle (Column)\"),",
    "  p({ class: \"no-margin\" }, \"items-center when direction is vertical.\")",
    "]);",
    "",
    "Card({ direction: \"column\", alignment: \"trailing\", class: \"box\" }, [",
    "  span({ class: \"text-sm text-tertiary\" }, \"Trailing (Column)\"),",
    "  p({ class: \"no-margin\" }, \"items-end when direction is vertical.\")",
    "]);"
  ].join("\n");
  const alignmentHtml = Prism.highlight(alignmentSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      title: "Card",
      description: "A simple layout wrapper that maps to the design system card surface."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Basic Usage", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md" }, [
            SampleCard({
              title: "Default Card",
              body: "Standard card container with base padding."
            }),
            SampleCard({
              title: "Card + Box",
              body: "Combine with utilities for extra spacing.",
              className: "box"
            })
          ]),
          CodeBlock({ html: basicHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Direction", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md" }, [
            Card({ direction: "horizontal", class: "box gap-md items-center" }, [
              div({ class: "bg-accent w-40 h-40 rounded" }),
              div({ class: "column-container gap-xs" }, [
                span({ class: "text-sm text-tertiary" }, "Horizontal"),
                span("Row layout using the card surface.")
              ])
            ]),
            Card({ direction: "column", class: "box" }, [
              span({ class: "text-sm text-tertiary" }, "Vertical"),
              span("Column layout using the card surface.")
            ])
          ]),
          CodeBlock({ html: directionHtml, language: "js", wrap: true })
        ])
      ])
      ,
      PageSection({ title: "Alignment", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "grid-flow gap-md" }, [
            SampleCard({
              title: "Leading (Row)",
              body: "justify-start when direction is horizontal.",
              direction: "horizontal",
              alignment: "leading",
              className: "box"
            }),
            SampleCard({
              title: "Middle (Row)",
              body: "justify-center when direction is horizontal.",
              direction: "horizontal",
              alignment: "middle",
              className: "box"
            }),
            SampleCard({
              title: "Trailing (Row)",
              body: "justify-end when direction is horizontal.",
              direction: "horizontal",
              alignment: "trailing",
              className: "box"
            }),
            SampleCard({
              title: "Leading (Column)",
              body: "items-start when direction is vertical.",
              direction: "column",
              alignment: "leading",
              className: "box"
            }),
            SampleCard({
              title: "Middle (Column)",
              body: "items-center when direction is vertical.",
              direction: "column",
              alignment: "middle",
              className: "box"
            }),
            SampleCard({
              title: "Trailing (Column)",
              body: "items-end when direction is vertical.",
              direction: "column",
              alignment: "trailing",
              className: "box"
            })
          ]),
          CodeBlock({ html: alignmentHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
