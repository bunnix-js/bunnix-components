import Bunnix, { useState } from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Spacer } from "../../../src/core/layout.mjs";
import { TextInput, TextArea, Select, CheckBox, Switch, Slider } from "../../../src/core/inputs.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function TextInputPage() {
  const textValue = useState("");

  return Column(
    Heading({ h2: true }, "TextInput Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Single-line text input with state binding",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { TextInput } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const value = useState("");

        TextInput({ value, placeholder: "Enter text..." });
        TextInput({ value, label: "Name" });
        TextInput({ value, type: "email", placeholder: "email@example.com" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "TextInput"),
      Text("Single-line text input with optional placeholder and state binding."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        TextInput({ value: textValue, placeholder: "Enter text..." }),
        TextInput({ value: textValue, label: "Name" }),
        TextInput({ value: textValue, type: "email", placeholder: "email@example.com" }),
        Text({ color: "secondary" }, `Current value: "${textValue.get()}"`),
      ),
    ),
  );
}

export function TextAreaPage() {
  const textAreaValue = useState("Line one\nLine two");

  return Column(
    Heading({ h2: true }, "TextArea Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Multiline text input with auto-growing height",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { TextArea } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const value = useState("Line one\\nLine two");

        TextArea({ value, placeholder: "Write a message..." });
        TextArea({ value, label: "Notes" });
        TextArea({
          value,
          label: "Description",
          minLines: 3,
          maxLines: 6,
          newlineTrigger: "shift-enter",
          placeholder: "Auto-grow between 3 and 6 lines",
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "TextArea"),
      Text("Multiline text input with optional label and auto-growing height between min and max lines."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        TextArea({ value: textAreaValue, placeholder: "Write a message..." }),
        TextArea({ value: textAreaValue, label: "Notes" }),
        TextArea({
          value: textAreaValue,
          label: "Description",
          minLines: 3,
          maxLines: 6,
          newlineTrigger: "shift-enter",
          placeholder: "Auto-grow between 3 and 6 lines",
        }),
        Text(
          { color: "secondary" },
          "This example uses Shift+Enter for a new line.",
        ),
        Text(
          { color: "secondary" },
          textAreaValue.map((value) => `Current text: "${value}"`),
        ),
      ),
    ),
  );
}

export function SelectPage() {
  const selectValue = useState("option1");

  return Column(
    Heading({ h2: true }, "Select Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Dropdown select input with mapped options",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { Select } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const value = useState("option1");

        Select({
          value,
          options: [
            { key: "option1", content: "Option 1" },
            { key: "option2", content: "Option 2" },
            { key: "option3", content: "Option 3" },
          ],
        });

        Select({
          value,
          label: "Choose option",
          options: [
            { key: "option1", content: "Option 1" },
            { key: "option2", content: "Option 2" },
          ],
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Select"),
      Text("Dropdown select input with mapped options and state binding."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Select({
          value: selectValue,
          options: [
            { key: "option1", content: "Option 1" },
            { key: "option2", content: "Option 2" },
            { key: "option3", content: "Option 3" },
          ],
        }),
        Select({
          value: selectValue,
          label: "Choose option",
          options: [
            { key: "option1", content: "Option 1" },
            { key: "option2", content: "Option 2" },
            { key: "option3", content: "Option 3" },
          ],
        }),
        Text({ color: "secondary" }, `Selected: ${selectValue.get()}`),
      ),
    ),
  );
}

export function CheckBoxPage() {
  const checkboxValue = useState(false);

  return Column(
    Heading({ h2: true }, "CheckBox Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Boolean input with optional label",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { CheckBox } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const checked = useState(false);

        CheckBox({ checked });
        CheckBox({ checked, label: "Accept terms" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "CheckBox"),
      Text("Simple checkbox input with optional label and state binding."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        CheckBox({ checked: checkboxValue }),
        CheckBox({ checked: checkboxValue, label: "Accept terms" }),
        Text({ color: "secondary" }, `Checked: ${checkboxValue.get()}`),
      ),
    ),
  );
}

export function SliderPage() {
  const sliderValue = useState(50);
  const customSliderValue = useState(100);

  return Column(
    Heading({ h2: true }, "Slider Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Range input with native and discrete step modes",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { Slider } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const value = useState(50);
        const customValue = useState(100);

        Slider({ value, min: 0, max: 100, step: 5, label: "Volume" });

        Slider({
          value: customValue,
          label: "Revenue target",
          steps: [
            { value: 10, label: "10K" },
            { value: 100, label: "100K" },
            { value: 1000, label: "1000K" },
          ],
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Slider"),
      Text("Range input with native linear mode or evenly distributed custom steps."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Slider({
          value: sliderValue,
          min: 0,
          max: 100,
          step: 5,
          label: "Volume",
        }),
        Text({ color: "secondary" }, sliderValue.map((value) => `Value: ${value}`)),
        Slider({
          value: customSliderValue,
          label: "Revenue target",
          steps: [
            { value: 10, label: "10K" },
            { value: 100, label: "100K" },
            { value: 1000, label: "1000K" },
          ],
        }),
        Text(
          { color: "secondary" },
          customSliderValue.map((value) => `Selected target: ${value}`),
        ),
      ),
    ),
  );
}

export function SwitchPage() {
  const switchValue = useState(false);

  return Column(
    Heading({ h2: true }, "Switch Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "OS-style boolean toggle with state binding",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { Switch } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const enabled = useState(false);

        Switch({ checked: enabled });
        Switch({ checked: enabled, label: "Enable notifications" });
        Switch({ checked: true, disabled: true, label: "Disabled" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Switch"),
      Text("OS-style toggle switch with optional label and boolean state binding."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Switch({ checked: switchValue }),
        Switch({ checked: switchValue, label: "Enable notifications" }),
        Switch({ checked: true, disabled: true, label: "Disabled" }),
        Text({ color: "secondary" }, switchValue.map((value) => `Enabled: ${value}`)),
      ),
    ),
  );
}
