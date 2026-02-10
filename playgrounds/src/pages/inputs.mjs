import Bunnix, { useState } from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Spacer } from "../../../src/core/layout.mjs";
import { TextInput, Select, CheckBox2 } from "../../../src/core/inputs.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function InputsPage() {
  const textValue = useState("");
  const selectValue = useState("option1");
  const checkboxValue = useState(false);

  return Column(
    Heading({ h2: true }, "Input Components"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Core input components for user interaction",
    ),
    Spacer({ minHeight: 24 }),
    
    // TextInput Component
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
      Text2("Single-line text input with optional placeholder and state binding."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        TextInput({ value: textValue, placeholder: "Enter text..." }),
        TextInput({ value: textValue, label: "Name" }),
        TextInput({ value: textValue, type: "email", placeholder: "email@example.com" }),
        Text2({ color: "secondary" }, `Current value: "${textValue.get()}"`),
      ),
    ),
    
    Spacer({ minHeight: 16 }),
    
    // Select Component
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
      Text2("Dropdown select input with mapped options and state binding."),
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
        Text2({ color: "secondary" }, `Selected: ${selectValue.get()}`),
      ),
    ),
    
    Spacer({ minHeight: 16 }),
    
    // CheckBox2 Component
    ComponentShowcase(
      {
        code: `
        import { CheckBox2 } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const checked = useState(false);

        CheckBox2({ checked });
        CheckBox2({ checked, label: "Accept terms" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "CheckBox2"),
      Text2("Simple checkbox input with optional label and state binding."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        CheckBox2({ checked: checkboxValue }),
        CheckBox2({ checked: checkboxValue, label: "Accept terms" }),
        Text2({ color: "secondary" }, `Checked: ${checkboxValue.get()}`),
      ),
    ),
  );
}
