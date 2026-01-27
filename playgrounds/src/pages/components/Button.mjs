import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Button } from "@bunnix/components";
import { Container } from "@bunnix/components";

const { div, p, span } = Bunnix;

export default function ButtonPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Button", 
      description: "Standard action elements with multiple variants and support for link types." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Variants", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          Button({ variant: "regular" }, "Regular"),
          Button({ variant: "flat" }, "Flat"),
          Button({ variant: "outline" }, "Outline"),
          Button({ variant: "destructive" }, "Destructive"),
          Button({ variant: "hyperlink" }, "Hyperlink"),
        ])
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          Button({ size: "default" }, "Default"),
          Button({ size: "lg" }, "Large"),
          Button({ size: "xl" }, "Extra Large"),
        ])
      ]),

      PageSection({ title: "Link Type", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "Buttons rendered as anchor tags for navigation."),
        div({ class: "grid-flow gap-md items-center" }, [
          Button({ type: "link", href: "#", variant: "regular" }, "Link Button"),
          Button({ type: "link", href: "#", variant: "outline" }, "Outline Link"),
          Button({ type: "link", href: "#", variant: "flat" }, "Flat Link"),
        ])
      ]),

      PageSection({ title: "With Icons", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          Button({ variant: "regular" }, [
            span({ class: "icon icon-add bg-white" }),
            "Create"
          ]),
          Button({ variant: "outline" }, [
            span({ class: "icon icon-gear icon-base" }),
            "Settings"
          ]),
          Button({ variant: "flat", size: "xl" }, [
            span({ class: "icon icon-logout icon-xl icon-base" }),
            "Log Out"
          ]),
        ])
      ]),

      PageSection({ title: "States", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          Button({ disabled: true }, "Disabled Button"),
          Button({ type: "link", href: "#", disabled: true, variant: "outline" }, "Disabled Link"),
        ])
      ])
    ])
  ]);
}
