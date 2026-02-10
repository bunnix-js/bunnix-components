import Bunnix from "@bunnix/core";
import { Icon, PageHeader, PageSection, Container } from "@bunnix/components";
const { div, h5, p, span, hr, button } = Bunnix;

export default function ButtonsPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "column" }, [
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
            Icon({ name: "add", fill: "white" }),
            "Create New"
          ]),
          button({ class: "btn-outline" }, [
            Icon({ name: "gear", fill: "base" }),
            "Settings"
          ]),
          button({ class: "btn-flat" }, [
            Icon({ name: "logout", fill: "base" }),
            "Log Out"
          ]),
          button({ class: "btn btn-lg" }, [
            Icon({ name: "download", fill: "white", size: "large" }),
            "Matching Tint"
          ]),
        ])
      ]),

      PageSection({ title: "Icon-Only Buttons", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          button({ class: "btn" }, [
            Icon({ name: "star", fill: "white" })
          ]),
          button({ class: "btn btn-lg" }, [
            Icon({ name: "pencil", fill: "white", size: "large" })
          ]),
          button({ class: "btn btn-xl" }, [
            Icon({ name: "person", fill: "white", size: "xlarge" })
          ]),
          button({ class: "btn-flat" }, [
            Icon({ name: "close", fill: "base" }),
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