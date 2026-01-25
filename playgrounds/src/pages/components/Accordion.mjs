import Bunnix from "@bunnix/core";
import AccordionGroup from "../../components/AccordionGroup.mjs";

const { div, h1, h5, p, hr } = Bunnix;

export default function AccordionPage() {
  const accordionItems = [
    {
      title: "What's an accordion?",
      icon: "icon-info",
      description:
        "An accordion groups content into collapsible sections, with a title, a toggle icon, and controlled spacing."
    },
    {
      title: "When should it be used?",
      icon: "icon-question-circle",
      description:
        "Use it when users only need a few key details at a time and you want to reduce scroll length."
    },
    {
      title: "Does it allow only one open item?",
      icon: "icon-merge",
      description:
        "This variant keeps a single item open at a time; clicking another header collapses the current one."
    },
    {
      title: "How to signal expansion?",
      icon: "icon-add",
      description:
        "Use a clear icon with a rotation or state change so users can immediately read the toggle action."
    }
  ];

  return div({ class: "column-container page-layout" }, [
    h1("Accordion Group"),
    p("Collapsible sections built with design system spacing, colors, and icons."),
    hr(),

    div({ class: "column-container gap-sm" }, [
      AccordionGroup({ items: accordionItems })
    ])
  ]);
}
