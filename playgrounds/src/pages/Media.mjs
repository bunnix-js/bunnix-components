import Bunnix, { useRef, useState, useEffect, useMemo } from "@bunnix/core";
import { PageHeader, PageSection, Container, Icon } from "@bunnix/components";
const { div, p, span, hr } = Bunnix;

const IconItem = (iconName) => {
  // Remove "icon-" prefix for Icon component
  const name = iconName.replace('icon-', '');
  return div({ class: "card box gap-sm w-fit" }, [
    Icon({ name, size: "xlarge", fill: "base" }),
    span({ class: "text-mono text-sm" }, `.${iconName}`)
  ]);
};

export default function MediaPage() {
  const headerRef = useRef(null);
  const headerOffset = useState("6rem");

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
    "icon-question-circle", "icon-remove-circle", "icon-return-arrow", "icon-save", "icon-search", "icon-sections", "icon-send", "icon-share",
    "icon-shine", "icon-sliders", "icon-star", "icon-storage", "icon-success-circle", "icon-swap", "icon-switch",
    "icon-sync", "icon-table", "icon-tag", "icon-text", "icon-terminal", "icon-thumb-down", "icon-thumb-up", "icon-timer", "icon-toggle",
    "icon-trash", "icon-update-page", "icon-upload", "icon-video", "icon-wallet", "icon-window"
  ];

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      ref: headerRef,
      title: "Media & Icons",
      description: "Core system icons managed via CSS variables and mask-image for easy recoloring."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Available Icons", stickyOffset: headerOffset.get() }, [
        div({ class: "grid-flow gap-md" }, icons.map(icon => IconItem(icon))),
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset.get() }, [
        div({ class: "grid-flow gap-md items-center" }, [
           div({ class: "card box gap-sm w-fit" }, [
             Icon({ name: "person", fill: "base" }),
             span("Default (1.2rem)")
           ]),
           div({ class: "card box gap-sm w-fit" }, [
             Icon({ name: "person", size: "large", fill: "base" }),
             span("Large (1.5rem)")
           ]),
           div({ class: "card box gap-sm w-fit" }, [
             Icon({ name: "person", size: "xlarge", fill: "base" }),
             span("Extra Large (2rem)")
           ]),
        ])
      ]),

      PageSection({ title: "Colored Examples", stickyOffset: headerOffset.get() }, [
        p({ class: "pb-sm" }, "Icons inherit the color from CSS classes."),
        div({ class: "grid-flow gap-md" }, [
           div({ class: "card box gap-sm w-fit" }, [
            Icon({ name: "home", size: "xlarge", fill: "accent" }),
            span("Accent Color")
          ]),
          div({ class: "card box gap-sm w-fit" }, [
            Icon({ name: "people", size: "xlarge", fill: "secondary" }),
             span("Secondary Large")
          ]),
           div({ class: "card box gap-sm w-fit" }, [
            Icon({ name: "star", size: "xlarge", fill: "destructive" }),
             span("Destructive Star")
          ]),
        ])
      ])
    ])
  ]);
}
