import Bunnix from "@bunnix/core";
const { div, h1, h5, p, span, hr } = Bunnix;

const IconItem = (className) => {
  return div({ class: "card box gap-sm w-fit" }, [
    span({ class: `icon icon-xl ${className}` }),
    span({ class: "text-mono text-sm" }, `.${className}`)
  ]);
};

export default function MediaPage() {
  const icons = [
    "icon-add-circle", "icon-add", "icon-alt", "icon-archive", "icon-at", "icon-attestation", "icon-bell",
    "icon-bookmark", "icon-bot", "icon-button", "icon-calculate", "icon-calendar", "icon-chart", "icon-check",
    "icon-chevron-down", "icon-chevron-left", "icon-chevron-right", "icon-clip", "icon-clock",
    "icon-close-circle", "icon-close", "icon-cloud-download", "icon-cloud-upload", "icon-cloud",
    "icon-columns-layout", "icon-command", "icon-cube", "icon-delete", "icon-dollar", "icon-download",
    "icon-draw", "icon-duplicate", "icon-edit", "icon-exclamation-mark", "icon-eye-open", "icon-eye", "icon-file-html", "icon-file", "icon-finger",
    "icon-flag", "icon-folder", "icon-function", "icon-gear", "icon-gift", "icon-globe",
    "icon-grid", "icon-hand", "icon-heart", "icon-home",
    "icon-image", "icon-inbox", "icon-info", "icon-key", "icon-lamp", "icon-link", "icon-location",
    "icon-locker", "icon-login", "icon-logout", "icon-mail", "icon-map", "icon-markup", "icon-merge",
    "icon-more-horizontal", "icon-more-vertical", "icon-mouse", "icon-palette", "icon-password",
    "icon-pencil", "icon-people", "icon-person-add", "icon-person-remove", "icon-person", "icon-pin",
    "icon-question-circle", "icon-remove-circle", "icon-search", "icon-send",
    "icon-shine", "icon-sliders", "icon-star", "icon-storage", "icon-success-circle", "icon-swap", "icon-switch",
    "icon-sync", "icon-table", "icon-tag", "icon-thumb-down", "icon-thumb-up", "icon-timer",
    "icon-trash", "icon-update-page", "icon-upload", "icon-video", "icon-wallet", "icon-window"
  ];

  return div({ class: "column-container page-layout" }, [
    h1("Media & Icons"),
    p("Core system icons managed via CSS variables and mask-image for easy recoloring."),
    hr(),
    
    div({ class: "column-container gap-md" }, [
      div({ class: "column-container gap-sm" }, [
        h5("Available Icons"),
        div({ class: "grid-flow gap-md" }, icons.map(icon => IconItem(icon))),
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
            span({ class: "icon icon-xl icon-home bg-accent" }),
            span("Accent Color")
          ]),
          div({ class: "card box gap-sm w-fit text-secondary" }, [
            span({ class: "icon icon-xl icon-people bg-dimmed" }),
             span("Secondary Large")
          ]),
           div({ class: "card box gap-sm w-fit text-accent-dimmed" }, [
            span({ class: "icon icon-xl icon-star bg-accent-dimmed" }),
             span("Dimmed Star")
          ]),
        ])
      ])
    ])
  ]);
}