import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import PopoverMenu from "../../components/PopoverMenu.mjs";
import Container from "../../components/Container.mjs";

const { div, h5, p, span } = Bunnix;

export default function PopoverPage() {
  const headerOffset = "6rem";

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

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Popover Menu", 
      description: "A versatile floating menu component using the modern Popover API and CSS Anchor Positioning." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Multi-Instance Alignment", stickyOffset: headerOffset }, [
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
    ])
  ]);
}
