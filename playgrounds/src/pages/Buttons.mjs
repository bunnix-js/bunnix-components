import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Container } from "@bunnix/components";
const { div, h5, p, span, hr, button } = Bunnix;

export default function ButtonsPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Buttons", 
      description: "Interactive elements for user actions." 
    }),
    
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Default Variants", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          button({ class: "btn" }, "Primary Button"),
          button({ class: "btn-flat" }, "Flat Button"),
          button({ class: "btn-outline" }, "Outline Button"),
          button({ class: "btn-destructive" }, "Destructive"),
        ])
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          button({ class: "btn" }, "Default size"),
          button({ class: "btn btn-lg" }, "Large Button"),
          button({ class: "btn btn-xl" }, "Extra Large"),
        ])
      ]),

      PageSection({ title: "Buttons with Icons", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          button({ class: "btn" }, [
            span({ class: "icon icon-add bg-white" }),
            "Create New"
          ]),
          button({ class: "btn-outline" }, [
            span({ class: "icon icon-gear icon-base" }),
            "Settings"
          ]),
          button({ class: "btn-flat" }, [
            span({ class: "icon icon-logout icon-base" }),
            "Log Out"
          ]),
          button({ class: "btn btn-lg" }, [
            span({ class: "icon icon-download icon-lg bg-white" }),
            "Matching Tint"
          ]),
        ])
      ]),

      PageSection({ title: "Icon-Only Buttons", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          button({ class: "btn" }, [
            span({ class: "icon icon-star bg-white" })
          ]),
          button({ class: "btn btn-lg" }, [
            span({ class: "icon icon-pencil icon-lg bg-white" })
          ]),
          button({ class: "btn btn-xl" }, [
            span({ class: "icon icon-person icon-xl bg-white" })
          ]),
          button({ class: "btn-flat" }, [
            span({ class: "icon icon-close icon-base" }),
          ]),
        ])
      ]),

      PageSection({ title: "States", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          button({ class: "btn", disabled: true }, "Disabled Primary"),
          button({ class: "btn-flat", disabled: true }, "Disabled Flat"),
        ])
      ]),
    ])
  ]);
}