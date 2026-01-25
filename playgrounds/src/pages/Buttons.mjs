import Bunnix from "@bunnix/core";
const { div, h1, h5, p, span, hr, button } = Bunnix;

export default function ButtonsPage() {
  return div({ class: "column-container page-layout" }, [
    h1("Buttons"),
    p("Interactive elements for user actions."),
    hr(),
    
    div({ class: "column-container gap-md" }, [
      div({ class: "column-container gap-sm" }, [
        h5("Default Variants"),
        div({ class: "grid-flow gap-md items-center" }, [
          button({ class: "btn" }, "Primary Button"),
          button({ class: "btn-flat" }, "Flat Button"),
          button({ class: "btn-outline" }, "Outline Button"),
          button({ class: "btn-destructive" }, "Destructive"),
        ])
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("Sizes"),
        p("Specific button size modifiers."),
        div({ class: "grid-flow gap-md items-center" }, [
          button({ class: "btn" }, "Default size"),
          button({ class: "btn btn-lg" }, "Large Button"),
          button({ class: "btn btn-xl" }, "Extra Large"),
        ])
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("Buttons with Icons"),
        p("Combining text labels with icons."),
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

      div({ class: "column-container gap-sm" }, [
        h5("Icon-Only Buttons"),
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
            span({ class: "icon icon-close icon-base" }), // Tinted to match primary text of flat btn
          ]),
        ])
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("States"),
        div({ class: "grid-flow gap-md items-center" }, [
          button({ class: "btn", disabled: true }, "Disabled Primary"),
          button({ class: "btn-flat", disabled: true }, "Disabled Flat"),
        ])
      ]),
    ])
  ]);
}