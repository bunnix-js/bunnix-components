import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { TimePicker } from "@bunnix/components";
import { Container } from "@bunnix/components";

const { div, p } = Bunnix;

export default function TimePickerPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Time Picker", 
      description: "Digital time picker focusing on rapid entry through direct typing and validated masking." 
    }),

    div({ class: "column-container gap-sm" }, [
      PageSection({ title: "24-Hour Digital Entry", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "Supports direct keyboard input with auto-navigation between hour and minute segments."),
        div({ class: "grid-flow gap-md items-center" }, [
          TimePicker()
        ])
      ]),

      PageSection({ title: "Rounded Variant", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "Rounded trigger style for compact layouts."),
        div({ class: "grid-flow gap-md items-center" }, [
          TimePicker({ variant: "rounded" })
        ])
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "Size variants for the trigger control."),
        div({ class: "grid-flow gap-md items-center" }, [
          TimePicker({ size: "regular" }),
          TimePicker({ size: "lg" }),
          TimePicker({ size: "xl" })
        ])
      ])
    ])
  ]);
}
