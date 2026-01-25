import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import DatePicker from "../../components/DatePicker.mjs";

const { div, h5, p, hr } = Bunnix;

export default function DatePickerPage() {
  return div({ class: "column-container page-layout" }, [
    PageHeader({ 
      title: "Date Picker", 
      description: "Custom date selection component with dynamic current-date placeholders and locale formatting." 
    }),
    hr(),

    div({ class: "column-container gap-md" }, [
      div({ class: "column-container gap-sm" }, [
        h5("Single Date"),
        p("A standard single date selection with quick-actions."),
        div({ class: "grid-flow gap-md items-center" }, [
          DatePicker()
        ])
      ]),

      hr(),

      div({ class: "column-container gap-sm" }, [
        h5("Date Range"),
        p("Select a start and end date with intuitive highlighting."),
        div({ class: "grid-flow gap-md items-center" }, [
          DatePicker({ range: true })
        ])
      ])
    ])
  ]);
}