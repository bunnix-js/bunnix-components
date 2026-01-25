import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import DropdownMenu from "../../components/DropdownMenu.mjs";

const { div, h5, p, hr } = Bunnix;

export default function DropdownPage() {
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

  return div({ class: "column-container page-layout" }, [
    PageHeader({ 
      title: "Dropdown Menu", 
      description: "A selection control that combines 'select' appearance with the power of the Popover API." 
    }),
    hr(),

    div({ class: "column-container gap-md" }, [
      div({ class: "column-container gap-sm" }, [
        h5("Standard Selection"),
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
          ])
        ])
      ]),

      hr(),

      div({ class: "column-container gap-sm" }, [
        h5("Actions & Destructive States"),
        div({ class: "row-container gap-md" }, [
          div({ class: "box w-fit p-0" }, [
            DropdownMenu({
              items: actionOptions,
              placeholder: "Select action..."
            })
          ]),
          div({ class: "box w-fit p-0" }, [
            DropdownMenu({
              items: actionOptions,
              placeholder: "Extra Large",
              size: "xl"
            })
          ])
        ])
      ])
    ])
  ]);
}