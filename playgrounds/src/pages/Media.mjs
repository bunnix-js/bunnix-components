import Bunnix from "@bunnix/core";
const { div, h1, h5, p, span, hr } = Bunnix;

const IconItem = (className) => {
  return div({ class: "card box gap-sm w-fit" }, [
    span({ class: `icon ${className}` }),
    span({ class: "text-mono text-sm" }, `.${className}`)
  ]);
};

export default function MediaPage() {
  return div({ class: "column-container page-layout" }, [
    h1("Media & Icons"),
    p("Core system icons managed via CSS variables and mask-image for easy recoloring."),
    hr(),
    
    div({ class: "column-container gap-md" }, [
      div({ class: "column-container gap-sm" }, [
        h5("Available Icons"),
        div({ class: "grid-flow gap-md" }, [
          IconItem("icon-home"),
          IconItem("icon-person"),
          IconItem("icon-people"),
          IconItem("icon-add"),
          IconItem("icon-at"),
          IconItem("icon-info"),
          IconItem("icon-chevron-left"),
          IconItem("icon-chevron-right"),
          IconItem("icon-duplicate"),
          IconItem("icon-download"),
          IconItem("icon-gearshape"),
          IconItem("icon-pencil"),
          IconItem("icon-sign-out"),
          IconItem("icon-star"),
          IconItem("icon-sync"),
          IconItem("icon-close"),
          IconItem("icon-success"),
          IconItem("icon-tag"),
          IconItem("icon-cloud-up"),
          IconItem("icon-switch"),
          IconItem("icon-attestation"),
          IconItem("icon-bell"),
          IconItem("icon-check"),
          IconItem("icon-cube"),
          IconItem("icon-globe"),
          IconItem("icon-key"),
          IconItem("icon-link"),
          IconItem("icon-mail"),
          IconItem("icon-bookmark"),
          IconItem("icon-bot"),
          IconItem("icon-chart"),
          IconItem("icon-clock"),
          IconItem("icon-file-html"),
          IconItem("icon-inbox"),
          IconItem("icon-markup"),
          IconItem("icon-merge"),
          IconItem("icon-script"),
          IconItem("icon-search"),
          IconItem("icon-timer"),
          IconItem("icon-trash"),
          IconItem("icon-upload"),
          IconItem("icon-video"),
          IconItem("icon-heart"),
          IconItem("icon-heart-fill"),
          IconItem("icon-heart-stack"),
          IconItem("icon-locker"),
          IconItem("icon-pin"),
          IconItem("icon-table"),
          IconItem("icon-close-circle"),
          IconItem("icon-lamp"),
          IconItem("icon-question-circle"),
          IconItem("icon-window"),
          IconItem("icon-dollar"),
          IconItem("icon-palette"),
          IconItem("icon-alt"),
          IconItem("icon-file"),
          IconItem("icon-more-horizontal"),
          IconItem("icon-more-vertical"),
          IconItem("icon-sliders"),
          IconItem("icon-swap"),
          IconItem("icon-update-page"),
        ]),
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("Sizes"),
        div({ class: "grid-flow gap-md items-center" }, [
           div({ class: "card box gap-sm w-fit" }, [
             span({ class: "icon icon-person" }),
             span("Default (1rem)")
           ]),
           div({ class: "card box gap-sm w-fit" }, [
             span({ class: "icon icon-person icon-lg" }),
             span("Large (1.5rem)")
           ]),
           div({ class: "card box gap-sm w-fit" }, [
             span({ class: "icon icon-person icon-xl" }),
             span("Extra Large (2rem)")
           ]),
        ])
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("Colored Examples"),
        p("Icons inherit the background color context or can be explicitly colored."),
        div({ class: "grid-flow gap-md" }, [
           div({ class: "card box gap-sm w-fit text-accent" }, [
            span({ class: "icon icon-home bg-accent" }),
            span("Accent Color")
          ]),
          div({ class: "card box gap-sm w-fit text-secondary" }, [
            span({ class: "icon icon-people icon-lg bg-secondary" }),
             span("Secondary Large")
          ]),
           div({ class: "card box gap-sm w-fit text-accent-dimmed" }, [
            span({ class: "icon icon-star icon-xl bg-accent-dimmed" }),
             span("Dimmed Star")
          ]),
        ])
      ])
    ])
  ]);
}
