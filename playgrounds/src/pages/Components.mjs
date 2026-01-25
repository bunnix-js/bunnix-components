import Bunnix from "@bunnix/core";
import PopoverMenu from "../components/PopoverMenu.mjs";
import DropdownMenu from "../components/DropdownMenu.mjs";
import ToggleSwitch from "../components/ToggleSwitch.mjs";
import AccordionGroup from "../components/AccordionGroup.mjs";
import DatePicker from "../components/DatePicker.mjs";

const { div, h1, h5, p, hr, span } = Bunnix;

export default function ComponentsPage() {
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

  const languageOptions = [
    { title: "English", icon: "icon-globe" },
    { title: "Portuguese", icon: "icon-globe", selected: true },
    { title: "Spanish", icon: "icon-globe" },
  ];

  const actionOptions = [
    { title: "Add", icon: "icon-add" },
    { title: "Edit", icon: "icon-pencil" },
    { title: "Duplicate", icon: "icon-duplicate" },
    { title: "Delete", icon: "icon-trash", destructive: true },
  ];

  const accordionItems = [
    {
      title: "What's an accordion?",
      icon: "icon-info",
      description:
        "An accordion groups content into collapsible sections, with a title, a toggle icon, and controlled spacing."
    },
    {
      title: "When should it be used?",
      icon: "icon-question-circle",
      description:
        "Use it when users only need a few key details at a time and you want to reduce scroll length."
    },
    {
      title: "Does it allow only one open item?",
      icon: "icon-merge",
      description:
        "This variant keeps a single item open at a time; clicking another header collapses the current one."
    },
    {
      title: "How to signal expansion?",
      icon: "icon-add",
      description:
        "Use a clear icon with a rotation or state change so users can immediately read the toggle action."
    }
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
                  span({ class: "icon icon-more-horizontal icon-base" }),
                  "User Menu"
              ],
              items: primaryMenuItems,
              align: "left"
            })
          ]),

          div({ class: "box w-fit p-0" }, [
            PopoverMenu({
              trigger: span({ class: "icon icon-more-vertical icon-lg bg-primary" }),
              items: secondaryMenuItems,
              align: "right",
              size: "lg"
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
              items: languageOptions,
              placeholder: "Large Dropdown",
              size: "lg"
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
              placeholder: "Extra Large",
              size: "xl"
            })
          ]),
        ])
      ]),

      hr(),

      div({ class: "column-container gap-sm" }, [
        h5("Switch"),
        p("Toggle control built with design system utilities and custom styles."),
        div({ class: "row-container gap-md items-center" }, [
          ToggleSwitch({ labelText: "Notifications", checked: true }),
          ToggleSwitch({ labelText: "Large", size: "lg" }),
          ToggleSwitch({ labelText: "Extra Large", size: "xl" }),
          ToggleSwitch({ labelText: "Disabled", disabled: true }),
        ])
      ]),

      hr(),

      div({ class: "column-container gap-sm" }, [
        h5("Accordion Group"),
        p("Collapsible sections built with design system spacing, colors, and icons."),
        AccordionGroup({ items: accordionItems })
      ]),

      hr(),

      div({ class: "column-container gap-sm" }, [
        h5("Date Picker"),
        p("Custom date picker with dropdown-like behavior and locale formatting."),
        div({ class: "grid-flow gap-md items-center" }, [
          DatePicker({ placeholder: "Select date" }),
          DatePicker({ placeholder: "Select range", range: true })
        ])
      ]),
    ])
  ]);
}
