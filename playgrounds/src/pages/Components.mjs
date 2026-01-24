import Bunnix from "@bunnix/core";
import PopoverMenu from "../components/PopoverMenu.mjs";
import DropdownMenu from "../components/DropdownMenu.mjs";

const { div, h1, h5, p, hr, span } = Bunnix;

export default function ComponentsPage() {
  const primaryMenuItems = [
    { title: "Profile", icon: "icon-person", click: () => console.log("Profile clicked") },
    { title: "Settings", icon: "icon-gearshape", click: () => console.log("Settings clicked") },
    { isSeparator: true },
    { title: "Logout", icon: "icon-sign-out", destructive: true, click: () => console.log("Logout clicked") },
  ];

  const secondaryMenuItems = [
    { title: "Share", icon: "icon-link", click: () => console.log("Share clicked") },
    { title: "Download", icon: "icon-download", click: () => console.log("Download clicked") },
    { isSeparator: true },
    { title: "Delete", icon: "icon-trash", destructive: true, click: () => console.log("Delete clicked") },
  ];

  const languageOptions = [
    { title: "English", icon: "icon-globe" },
    { title: "Portuguese", icon: "icon-globe", selected: true },
    { title: "Spanish", icon: "icon-globe" },
  ];

  const actionOptions = [
    { title: "Add", icon: "icon-add" },
    { title: "Edit", icon: "icon-pencil" },
    { title: "Duplicate", icon: "icon-clip" },
    { title: "Archive", icon: "icon-inbox" },
  ];

  return div({ class: "column-container page-layout" }, [
    h1("Components"),
    p("Sophisticated components built by combining design system elements."),
    hr(),
    
    div({ class: "column-container gap-md" }, [
      div({ class: "column-container gap-sm" }, [
        h5("Popover Menu"),
        p("Multiple independent instances with distinct content and alignment."),
        
        div({ class: "row-container gap-md" }, [
          div({ class: "box w-fit p-0" }, [
            PopoverMenu({ 
              trigger: [
                  span({ class: "icon icon-more-horizontal bg-primary" }),
                  "User Menu"
              ],
              items: primaryMenuItems,
              align: "left"
            })
          ]),

          div({ class: "box w-fit p-0" }, [
            PopoverMenu({ 
              trigger: span({ class: "icon icon-more-vertical bg-primary" }),
              items: secondaryMenuItems,
              align: "right"
            })
          ]),
        ])
      ]),

      hr(),

      div({ class: "column-container gap-sm" }, [
        h5("Dropdown Menu"),
        p("A selection control that combines 'select' appearance with Popover power."),
        div({ class: "row-container gap-md" }, [
          div({ class: "box w-fit p-0" }, [
            DropdownMenu({ 
              items: languageOptions,
              placeholder: "Choose Language"
            })
          ]),
          div({ class: "box w-fit p-0" }, [
            DropdownMenu({ 
              items: [
                { title: "Small", icon: "icon-cube" },
                { title: "Medium", icon: "icon-cube" },
                { title: "Large", icon: "icon-cube" },
              ],
              placeholder: "Select size..."
            })
          ]),
          div({ class: "box w-fit p-0" }, [
            DropdownMenu({
              items: actionOptions,
              placeholder: "Actions"
            })
          ]),
        ])
      ]),
    ])
  ]);
}
