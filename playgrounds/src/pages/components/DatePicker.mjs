import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { DatePicker } from "@bunnix/components";
import { Container } from "@bunnix/components";

const { div, p } = Bunnix;

export default function DatePickerPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Date Picker", 
      description: "Custom date selection component with dynamic current-date placeholders and locale formatting." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Single Date", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "A standard single date selection with quick-actions."),
        div({ class: "grid-flow gap-md items-center" }, [
          DatePicker()
        ])
      ]),

      PageSection({ title: "Date Range", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "Select a start and end date with intuitive highlighting."),
        div({ class: "grid-flow gap-md items-center" }, [
          DatePicker({ range: true })
        ])
      ]),

      PageSection({ title: "Rounded Variant", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "Rounded trigger style for compact layouts."),
        div({ class: "grid-flow gap-md items-center" }, [
          DatePicker({ variant: "rounded" }),
          DatePicker({ range: true, variant: "rounded" })
        ])
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "Size variants for the trigger control."),
        div({ class: "grid-flow gap-md items-center" }, [
          DatePicker({ size: "regular" }),
          DatePicker({ size: "lg" }),
          DatePicker({ size: "xl" })
        ])
      ])
    ])
  ]);
}
