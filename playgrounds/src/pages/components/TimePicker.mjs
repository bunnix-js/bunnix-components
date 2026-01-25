import Bunnix from "@bunnix/core";
import TimePicker from "../../components/TimePicker.mjs";

const { div, h1, h5, p, hr } = Bunnix;

export default function TimePickerPage() {
  return div({ class: "column-container page-layout" }, [
    h1("Time Picker"),
    p("Digital time picker focusing on rapid entry through direct typing and validated masking."),
    hr(),

    div({ class: "column-container gap-sm" }, [
      h5("24-Hour Digital Entry"),
      p("Supports direct keyboard input with auto-navigation between hour and minute segments."),
      div({ class: "grid-flow gap-md items-center" }, [
        TimePicker()
      ])
    ])
  ]);
}
