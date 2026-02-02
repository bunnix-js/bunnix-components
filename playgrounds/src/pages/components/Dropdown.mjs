import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { DropdownMenu } from "@bunnix/components";
import { Container } from "@bunnix/components";

const { div, p } = Bunnix;

export default function DropdownPage() {
  const headerOffset = "6rem";

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

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Dropdown Menu", 
      description: "A selection control that combines 'select' appearance with the power of the Popover API." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Standard Selection", stickyOffset: headerOffset }, [
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

      PageSection({ title: "Actions & Destructive States", stickyOffset: headerOffset }, [
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
