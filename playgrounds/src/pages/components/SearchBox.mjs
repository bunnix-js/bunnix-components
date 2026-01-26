import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import SearchBox from "../../components/SearchBox.mjs";
import Container from "../../components/Container.mjs";

const { div, p } = Bunnix;

export default function SearchBoxPage() {
  const headerOffset = "6rem";
  const searchValue = Bunnix.useState("");
  const dataset = [
    { key: "button", title: "Button", snippet: "Primary, secondary, and icon button styles.", icon: "button" },
    { key: "checkbox", title: "Checkbox", snippet: "Selection control with multiple states.", icon: "check" },
    { key: "input", title: "Input Field", snippet: "Text input with labels and suggestions.", icon: "pencil" },
    { key: "datepicker", title: "Date Picker", snippet: "Calendar selection with range support.", icon: "calendar" },
    { key: "timepicker", title: "Time Picker", snippet: "24-hour time selection with segments.", icon: "clock" },
    { key: "toast", title: "Toast", snippet: "Transient status notifications.", icon: "bell" }
  ];

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({
      title: "Search Box",
      description: "Search input with icon, sizing options, and rounded variant."
    }),
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Variants", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md" }, [
          div({ class: "w-300" }, [
            SearchBox({ placeholder: "Regular", onInput: (e) => searchValue.set(e.target.value) })
          ]),
          div({ class: "w-300" }, [
            SearchBox({ placeholder: "Rounded", variant: "rounded" })
          ])
        ])
      ]),
      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md items-center" }, [
          div({ class: "w-300" }, [
            SearchBox({ placeholder: "Default" })
          ]),
          div({ class: "w-300" }, [
            SearchBox({ placeholder: "Large", size: "lg" })
          ]),
          div({ class: "w-300" }, [
            SearchBox({ placeholder: "Extra Large", size: "xl" })
          ])
        ])
      ]),
      PageSection({ title: "Controlled", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "SearchBox supports value binding for filtering."),
        div({ class: "w-300" }, [
            SearchBox({
              value: searchValue,
              placeholder: "Type to update state",
              onInput: (e) => searchValue.set(e.target.value)
            })
        ])
      ]),
      PageSection({ title: "Dataset Search", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "Filters a dataset and shows up to five matches in a popover."),
        div({ class: "w-300" }, [
          SearchBox({
            data: dataset,
            value: searchValue,
            placeholder: "Search components...",
            onInput: (e) => searchValue.set(e.target.value)
          })
        ])
      ])
    ])
  ]);
}
