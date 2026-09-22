import Bunnix, { useState } from "@bunnix/core";
import { Heading, Text, Column, Spacer, TextInput, TextArea, Select, CheckBox, Switch, SegmentedPicker, Slider } from "@bunnix/components";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function TextInputPage() {
  const baseValue = useState("");
  const boundValue = useState("Hello");
  const textTypeValue = useState("");
  const emailValue = useState("");
  const dateValue = useState(new Date(2026, 8, 22));

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

        TextInput({ value, label: "Name", placeholder: "Enter text..." });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Base Input"),
      Text("Label plus placeholder with state binding."),
      Spacer({ minHeight: 8 }),
      TextInput({ value: baseValue, label: "Name", placeholder: "Enter text..." }),
    ),
    Spacer({ minHeight: 16 }),
    ComponentShowcase(
      {
        code: `
        import { TextInput, Text } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const value = useState("Hello");

        TextInput({ value, placeholder: "Type here..." });
        Text(value.map((v) => \`Current value: "\${v}"\`));
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Reactive Binding"),
      Text("Two-way binding with useState; external edits sync via value.get/set."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        TextInput({ value: boundValue, placeholder: "Type here..." }),
        Text({ color: "secondary" }, boundValue.map((v) => `Current value: "${v}"`)),
      ),
    ),
    Spacer({ minHeight: 16 }),
    ComponentShowcase(
      {
        code: `
        import { TextInput } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const text = useState("");
        const email = useState("");
        const birthday = useState(new Date(2026, 8, 22));

        TextInput({ value: text, type: "text", label: "Username", placeholder: "Enter username..." });
        TextInput({ value: email, type: "email", label: "Email", placeholder: "email@example.com" });
        TextInput({ value: birthday, type: "date", label: "Birthday" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Input Types"),
      Text("Native types text, email and date. Date accepts a Date state and renders yyyy-mm-dd."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        TextInput({ value: textTypeValue, type: "text", label: "Username", placeholder: "Enter username..." }),
        TextInput({ value: emailValue, type: "email", label: "Email", placeholder: "email@example.com" }),
        TextInput({ value: dateValue, type: "date", label: "Birthday" }),
      ),
    ),
    Spacer({ minHeight: 16 }),
    ComponentShowcase(
      {
        code: `
        import { TextInput } from "@bunnix/components";

        TextInput({ value: "Disabled text", label: "Disabled", disabled: true });
        TextInput({ value: "", label: "Disabled empty", placeholder: "Cannot type here", disabled: true });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Disabled"),
      Text("Disabled state blocks interaction. Accepts a plain boolean or reactive state."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        TextInput({ value: "Disabled text", label: "Disabled", disabled: true }),
        TextInput({ value: "", label: "Disabled empty", placeholder: "Cannot type here", disabled: true }),
      ),
    ),
  );
}

export function TextAreaPage() {
  const baseValue = useState("");
  const boundValue = useState("Line one\nLine two");
  const growValue = useState("");
  const keysValue = useState("");

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

        const value = useState("");

        TextArea({ value, label: "Notes", placeholder: "Write a message..." });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Base Input"),
      Text("Label plus placeholder with state binding."),
      Spacer({ minHeight: 8 }),
      TextArea({ value: baseValue, label: "Notes", placeholder: "Write a message..." }),
    ),
    Spacer({ minHeight: 16 }),
    ComponentShowcase(
      {
        code: `
        import { TextArea, Text } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const value = useState("Line one\\nLine two");

        TextArea({ value, placeholder: "Type here..." });
        Text(value.map((v) => \`Current text: "\${v}"\`));
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Reactive Binding"),
      Text("Two-way binding with useState; external edits sync via value.get/set."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        TextArea({ value: boundValue, placeholder: "Type here..." }),
        Text(
          { color: "secondary" },
          boundValue.map((value) => `Current text: "${value}"`),
        ),
      ),
    ),
    Spacer({ minHeight: 16 }),
    ComponentShowcase(
      {
        code: `
        import { TextArea } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const value = useState("");

        TextArea({
          value,
          label: "Description",
          minLines: 3,
          maxLines: 6,
          placeholder: "Auto-grow between 3 and 6 lines",
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Auto-Grow"),
      Text("Grows between minLines and maxLines, then scrolls."),
      Spacer({ minHeight: 8 }),
      TextArea({
        value: growValue,
        label: "Description",
        minLines: 3,
        maxLines: 6,
        placeholder: "Auto-grow between 3 and 6 lines",
      }),
    ),
    Spacer({ minHeight: 16 }),
    ComponentShowcase(
      {
        code: `
        import { TextArea } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const value = useState("");

        TextArea({ value, placeholder: "Press Enter..." });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Keyboard"),
      Text("Use Shift+Enter for a new line. Enter submits the parent form when available."),
      Spacer({ minHeight: 8 }),
      TextArea({ value: keysValue, placeholder: "Press Enter..." }),
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
  const baseChecked = useState(false);
  const boundChecked = useState(false);

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
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Base Usage"),
      Text("Bare checkbox without label."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        CheckBox({ checked: baseChecked }),
      ),
    ),
    Spacer({ minHeight: 16 }),
    ComponentShowcase(
      {
        code: `
        import { CheckBox, Text } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const checked = useState(false);

        CheckBox({ checked, label: "Subscribe" });
        CheckBox({ value: checked, label: "Via value alias" });
        Text(checked.map((v) => \`Checked: \${v}\`));
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Reactive Binding"),
      Text("Two-way binding with useState; checked and value alias share the same state."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        CheckBox({ checked: boundChecked, label: "Subscribe" }),
        CheckBox({ value: boundChecked, label: "Via value alias" }),
        Text({ color: "secondary" }, boundChecked.map((v) => `Checked: ${v}`)),
      ),
    ),
    Spacer({ minHeight: 16 }),
    ComponentShowcase(
      {
        code: `
        import { CheckBox } from "@bunnix/components";

        CheckBox({ checked: true, disabled: true, label: "Disabled checked" });
        CheckBox({ checked: false, disabled: true, label: "Disabled unchecked" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Disabled"),
      Text("Disabled state blocks interaction."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        CheckBox({ checked: true, disabled: true, label: "Disabled checked" }),
        CheckBox({ checked: false, disabled: true, label: "Disabled unchecked" }),
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

export function SegmentedPickerPage() {
  const textValue = useState("week");
  const iconValue = useState("calendar");

  return Column(
    Heading({ h2: true }, "SegmentedPicker Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "iOS-style segmented selection with optional icons",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { SegmentedPicker } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const timeframe = useState("week");
        const destination = useState("calendar");

        SegmentedPicker({
          value: timeframe,
          items: [
            { key: "day", text: "Day" },
            { key: "week", text: "Week" },
            { key: "month", text: "Month" },
          ],
        });

        SegmentedPicker({
          value: destination,
          items: [
            { key: "calendar", text: "Calendar", icon: "calendar" },
            { key: "messages", text: "Messages", icon: "chat_bubble_2" },
            { key: "mail", text: "Mail", icon: "envelope" },
          ],
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "SegmentedPicker"),
      Text("Classic segmented control for single keyed selection."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        SegmentedPicker({
          value: textValue,
          items: [
            { key: "day", text: "Day" },
            { key: "week", text: "Week" },
            { key: "month", text: "Month" },
          ],
        }),
        Text({ color: "secondary" }, textValue.map((value) => `Selected range: ${value}`)),
        SegmentedPicker({
          value: iconValue,
          items: [
            { key: "calendar", text: "Calendar", icon: "calendar" },
            { key: "messages", text: "Messages", icon: "chat_bubble_2" },
            { key: "mail", text: "Mail", icon: "envelope" },
          ],
        }),
        Text({ color: "secondary" }, iconValue.map((value) => `Selected destination: ${value}`)),
        SegmentedPicker({
          value: "week",
          disabled: true,
          items: [
            { key: "day", text: "Day" },
            { key: "week", text: "Week" },
            { key: "month", text: "Month" },
          ],
        }),
      ),
    ),
  );
}
