import Bunnix from "@bunnix/core";
import PopoverMenu from "../../components/PopoverMenu.mjs";

const { div, h1, h5, p, hr, span } = Bunnix;

export default function PopoverPage() {
  const primaryMenuItems = [
    { title: "Profile", icon: "icon-person", click: () => console.log("Profile clicked") },
    { title: "Settings", icon: "icon-gear", click: () => console.log("Settings clicked") },
    { isSeparator: true },
    { title: "Logout", icon: "icon-logout", destructive: true, click: () => console.log("Logout clicked") },
  ];

  const secondaryMenuItems = [
    { title: "Share", icon: "icon-link", click: () => console.log("Share clicked") },
    { title: "Download", icon: "icon-download", click: () => console.log("Download clicked") },
    { isSeparator: true },
    { title: "Delete", icon: "icon-trash", destructive: true, click: () => console.log("Delete clicked") },
  ];

  return div({ class: "column-container page-layout" }, [
    h1("Popover Menu"),
    p("A versatile floating menu component using the modern Popover API and CSS Anchor Positioning."),
    hr(),

    div({ class: "column-container gap-sm" }, [
      h5("Multi-Instance Alignment"),
      p("Independent instances with distinct alignment and content."),

      div({ class: "row-container gap-md" }, [
        div({ class: "box w-fit p-0" }, [
          PopoverMenu({
            trigger: [
                span({ class: "icon icon-more-horizontal icon-base" }),
                "Left Aligned"
            ],
            items: primaryMenuItems,
            align: "left"
          })
        ]),

        div({ class: "box w-fit p-0" }, [
          PopoverMenu({
            trigger: span({ class: "icon icon-more-vertical icon-lg fg-primary" }),
            items: secondaryMenuItems,
            align: "right",
            size: "lg"
          })
        ]),
      ])
    ])
  ]);
}
