import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { PopoverMenu } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

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
  const popoverSnippet = [
    "const primaryMenuItems = [",
    "  { title: \"Profile\", icon: \"icon-person\", click: () => console.log(\"Profile clicked\") },",
    "  { title: \"Settings\", icon: \"icon-gear\", click: () => console.log(\"Settings clicked\") },",
    "  { isSeparator: true },",
    "  { title: \"Logout\", icon: \"icon-logout\", destructive: true, click: () => console.log(\"Logout clicked\") },",
    "];",
    "",
    "PopoverMenu({",
    "  trigger: [",
    "    span({ class: \"icon icon-more-horizontal icon-base\" }),",
    "    \"Left Aligned\"",
    "  ],",
    "  menuItems: primaryMenuItems,",
    "  align: \"left\"",
    "});",
    "",
    "PopoverMenu({",
    "  trigger: () => span({ class: \"icon icon-more-vertical icon-lg fg-primary\" }),",
    "  menuItems: secondaryMenuItems,",
    "  align: \"right\",",
    "  size: \"large\"",
    "});"
  ].join("\n");
  const popoverHtml = Prism.highlight(popoverSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      title: "Popover Menu",
      description: "A versatile floating menu component using the modern Popover API and CSS Anchor Positioning."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Multi-Instance Alignment", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "row-container gap-md" }, [
            div({ class: "box w-fit p-0" }, [
              PopoverMenu({
                trigger: [
                    span({ class: "icon icon-more-horizontal icon-base" }),
                    "Left Aligned"
                ],
                menuItems: primaryMenuItems,
                align: "left"
              })
            ]),

            div({ class: "box w-fit p-0" }, [
              PopoverMenu({
                trigger: () => span({ class: "icon icon-more-vertical icon-lg fg-primary" }),
                menuItems: secondaryMenuItems,
                align: "right",
                size: "large"
              })
            ]),
          ]),
          CodeBlock({ html: popoverHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
