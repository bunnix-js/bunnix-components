import Bunnix from "@bunnix/core";
const { div, h1, h5, p, span, a, hr } = Bunnix;

export default function LinksPage() {
  return div({ class: "column-container page-layout" }, [
    h1("Links"),
    p("Different styles of hyperlinks used in the system."),
    hr(),
    
    div({ class: "column-container gap-md" }, [
      div({ class: "column-container gap-sm" }, [
        h5("Standard Link"),
        div({ class: "box w-fit p-0" }, [
          a({ href: "#" }, "Click me - I'm a standard link"),
        ]),
      ]),
      
      div({ class: "column-container gap-sm" }, [
        h5("Flat Link (.link-flat)"),
        div({ class: "box w-fit p-0" }, [
          a({ class: "link-flat", href: "#" }, "I'm a flat link (like sidebar)")
        ]),
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("Destructive Link (.link-destructive)"),
        div({ class: "box w-fit p-0" }, [
          a({ class: "link-destructive", href: "#" }, "Delete Account")
        ]),
      ]),

      hr(),
      h5("Links with Icons"),
      p("Standard text links combined with icons."),
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
      ]),

      hr(),
      h5("Links styled as Buttons"),
      p("Applying button classes to <a> tags."),
      
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
  ]);
}