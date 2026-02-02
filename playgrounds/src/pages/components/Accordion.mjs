import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { AccordionGroup } from "@bunnix/components";
import { Container } from "@bunnix/components";

const { div } = Bunnix;

export default function AccordionPage() {
  const headerOffset = "6rem";

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
      icon: "icon-sections",
      description:
        "Use a clear icon with a rotation or state change so users can immediately read the toggle action."
    }
  ];

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Accordion Group", 
      description: "Collapsible sections built with design system spacing, colors, and icons." 
    }),

    div({ class: "column-container gap-sm" }, [
      PageSection({ title: "Multi-Item Group", stickyOffset: headerOffset }, [
        AccordionGroup({ items: accordionItems })
      ])
    ])
  ]);
}
