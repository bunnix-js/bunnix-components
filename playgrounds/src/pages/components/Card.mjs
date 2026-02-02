import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Card } from "@bunnix/components";
import { Container } from "@bunnix/components";

const { div, p, span } = Bunnix;

const SampleCard = ({ title, body, className = "", direction, alignment } = {}) =>
  Card({ class: className, direction, alignment }, [
    span({ class: "text-sm text-tertiary" }, title),
    p({ class: "no-margin" }, body)
  ]);

export default function CardPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      title: "Card",
      description: "A simple layout wrapper that maps to the design system card surface."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Basic Usage", stickyOffset: headerOffset }, [
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
        ])
      ]),

      PageSection({ title: "Direction", stickyOffset: headerOffset }, [
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
        ])
      ])
      ,
      PageSection({ title: "Alignment", stickyOffset: headerOffset }, [
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
        ])
      ])
    ])
  ]);
}
