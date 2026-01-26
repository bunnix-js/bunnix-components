import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import SearchBox from "../../components/SearchBox.mjs";

const { div, p } = Bunnix;

export default function SearchBoxPage() {
  const headerOffset = "6rem";
  const searchValue = Bunnix.useState("");

  return div({ class: "column-container page-layout" }, [
    PageHeader({
      title: "Search Box",
      description: "Search input with icon, sizing options, and rounded variant."
    }),
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Variants", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md" }, [
          div({ class: "w-300" }, [
            SearchBox({ placeholder: "Regular", input: (e) => searchValue.set(e.target.value) })
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
            input: (e) => searchValue.set(e.target.value)
          })
        ])
      ])
    ])
  ]);
}
