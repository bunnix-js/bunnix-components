import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import Badge from "../../components/Badge.mjs";
import Button from "../../components/Button.mjs";
import Icon from "../../components/Icon.mjs";

const { div } = Bunnix;

export default function BadgePage() {
  const headerOffset = "6rem";

  return div({ class: "column-container page-layout" }, [
    PageHeader({
      title: "Badge",
      description: "Compact status and metadata labels with tone, size, and variant options."
    }),
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Tones", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          Badge({ tone: "base" }, "Base"),
          Badge({ tone: "success" }, "Success"),
          Badge({ tone: "info" }, "Info"),
          Badge({ tone: "warning" }, "Warning"),
          Badge({ tone: "danger" }, "Danger"),
          Badge({ tone: "accent" }, "Accent"),
          Badge({ tone: "dimmed" }, "Dimmed")
        ])
      ]),
      PageSection({ title: "Variants", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          Badge({ tone: "success", variant: "solid" }, "Solid"),
          Badge({ tone: "success", variant: "soft" }, "Soft"),
          Badge({ tone: "success", variant: "outline" }, "Outline")
        ])
      ]),
      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          Badge({ tone: "accent", size: "xs" }, "XS"),
          Badge({ tone: "accent", size: "sm" }, "SM"),
          Badge({ tone: "accent", size: "md" }, "MD")
        ])
      ]),
      PageSection({ title: "Shapes", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          Badge({ tone: "accent", shape: "capsule" }, "Capsule"),
          Badge({ tone: "accent", shape: "circle", size: "xs" }, "100")
        ])
      ]),
      PageSection({ title: "With Icon", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          Badge({ tone: "success", icon: "check" }, "Active"),
          Badge({ tone: "info", icon: "info" }, "Info"),
          Badge({ tone: "danger", icon: "exclamation-mark" }, "Alert")
        ])
      ]),
      PageSection({ title: "Overlap", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          div({ class: "inline-flex", style: "anchor-name: --badge-anchor" }, [
            Button({ variant: "accent" }, [
              Icon({ name: "bell", fill: "white" }),
              "Alerts"
            ])
          ]),
          Badge({ tone: "danger", overlap: true, shape: "circle" }, "99")
        ])
      ])
    ])
  ]);
}
