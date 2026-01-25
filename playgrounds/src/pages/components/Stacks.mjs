import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import HStack from "../../components/HStack.mjs";
import VStack from "../../components/VStack.mjs";

const { div, span } = Bunnix;

const Box = (text) => div({ class: "bg-accent p-sm rounded text-white" }, text);

export default function StacksPage() {
  const headerOffset = "6rem";

  return div({ class: "column-container page-layout" }, [
    PageHeader({ 
      title: "Stacks", 
      description: "Primitive layout containers for consistent horizontal and vertical distribution." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "HStack (Horizontal)", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md w-full" }, [
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
        ])
      ]),

      PageSection({ title: "VStack (Vertical)", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-lg" }, [
          div({ class: "column-container gap-sm" }, [
            span({ class: "text-sm text-tertiary" }, "Leading (Top)"),
            VStack({ alignment: "leading", class: "h-200 border-dashed p-sm" }, [ Box("Item 1"), Box("Longer Item 2"), Box("Item 3") ])
          ]),
          div({ class: "column-container gap-sm" }, [
            span({ class: "text-sm text-tertiary" }, "Middle (Center)"),
            VStack({ alignment: "middle", class: "h-200 border-dashed p-sm" }, [ Box("Item 1"), Box("Longer Item 2"), Box("Item 3") ])
          ]),
          div({ class: "column-container gap-sm" }, [
            span({ class: "text-sm text-tertiary" }, "Trailing (Bottom)"),
            VStack({ alignment: "trailing", class: "h-200 border-dashed p-sm" }, [ Box("Item 1"), Box("Longer Item 2"), Box("Item 3") ])
          ]),
        ])
      ]),

      PageSection({ title: "Gaps", stickyOffset: headerOffset }, [
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
        ])
      ])
    ])
  ]);
}