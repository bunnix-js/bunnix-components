import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Container } from "@bunnix/components";
const { div, h5, p, span, a, hr } = Bunnix;

export default function LinksPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Links", 
      description: "Different styles of hyperlinks used in the system." 
    }),
    
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Standard Variants", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm" }, [
            h5({ class: "text-tertiary text-sm" }, "Standard Link"),
            div({ class: "box w-fit p-0" }, [
              a({ href: "#" }, "Click me - I'm a standard link"),
            ]),
          ]),
          
          div({ class: "column-container gap-sm" }, [
            h5({ class: "text-tertiary text-sm" }, "Flat Link (.link-flat)"),
            div({ class: "box w-fit p-0" }, [
              a({ class: "link-flat", href: "#" }, "I'm a flat link (like sidebar)")
            ]),
          ]),

          div({ class: "column-container gap-sm" }, [
            h5({ class: "text-tertiary text-sm" }, "Destructive Link (.link-destructive)"),
            div({ class: "box w-fit p-0" }, [
              a({ class: "link-destructive", href: "#" }, "Delete Account")
            ]),
          ]),
        ])
      ]),

      PageSection({ title: "Links with Icons", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md" }, [
          div({ class: "box w-fit p-0" }, [
            a({ href: "#" }, [
              span({ class: "icon icon-download bg-accent" }),
              "Download File"
            ])
          ]),
          div({ class: "box w-fit p-0" }, [
            a({ class: "link-destructive", href: "#" }, [
              span({ class: "icon icon-logout bg-destructive" }),
              "Sign Out"
            ])
          ]),
          div({ class: "box w-fit p-0" }, [
            a({ class: "link-flat", href: "#" }, [
              span({ class: "icon icon-chevron-left icon-base" }),
              "Back to Home"
            ])
          ]),
        ])
      ]),

      PageSection({ title: "Links styled as Buttons", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm" }, [
            div({ class: "text-secondary text-sm" }, "Standard Sizes"),
            div({ class: "grid-flow gap-md" }, [
              a({ class: "btn", href: "#" }, "Link as Button"),
              a({ class: "btn btn-destructive", href: "#" }, "Destructive Link Button"),
              a({ class: "btn btn-outline", href: "#" }, "Outline Link"),
            ])
          ]),

          div({ class: "column-container gap-sm" }, [
            div({ class: "text-secondary text-sm" }, "With Icons & Sizes"),
            div({ class: "grid-flow gap-md items-center" }, [
              a({ class: "btn", href: "#" }, [
                span({ class: "icon icon-download bg-white" }),
                "Download"
              ]),
              a({ class: "btn btn-lg btn-outline", href: "#" }, [
                span({ class: "icon icon-gear icon-base" }),
                "Large Settings"
              ]),
              a({ class: "btn btn-xl btn-destructive", href: "#" }, [
                span({ class: "icon icon-logout icon-xl bg-white" }),
                "Log Out"
              ]),
            ])
          ]),
        ])
      ]),
    ])
  ]);
}