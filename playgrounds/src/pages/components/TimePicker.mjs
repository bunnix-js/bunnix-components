import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import TimePicker from "../../components/TimePicker.mjs";

const { div, p } = Bunnix;

export default function TimePickerPage() {
  const headerOffset = "6rem";

  return div({ class: "column-container page-layout" }, [
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
      ])
    ])
  ]);
}
