import Bunnix, { useState } from "@bunnix/core";
import { resolveIconClass } from "../utils/iconUtils.mjs";
const { div, button, span, p } = Bunnix;

export default function AccordionGroup({ items = [], class: className = "", initialIndex } = {}) {
  const resolvedInitial = Number.isInteger(initialIndex)
    ? initialIndex
    : items.findIndex((item) => item?.open);
  const openIndex = useState(resolvedInitial >= 0 ? resolvedInitial : null);

  const handleToggle = (index) => {
    const current = openIndex.get();
    openIndex.set(current === index ? null : index);
  };

  return div(
    { class: `accordion-group ${className}`.trim() },
    items.map((item, index) => {
      const isOpen = openIndex.map((value) => value === index);
      const iconClass = resolveIconClass(item.icon) || "icon-add";
      const description = item.description ?? item.content ?? "";

      return div({ class: isOpen.map((open) => `accordion-item hoverable ${open ? "accordion-open" : ""}`) }, [
        button({ class: "accordion-header", click: () => handleToggle(index) }, [
          span({ class: isOpen.map((open) => `icon accordion-icon ${iconClass} ${open ? "bg-accent" : "bg-primary"}`) }),
          span({ class: "accordion-title" }, item.title)
        ]),
        div({ class: "accordion-content" }, [
          div({ class: "accordion-body" }, [
            typeof description === "string"
              ? p({ class: "accordion-description" }, description)
              : description
          ])
        ])
      ]);
    })
  );
}
