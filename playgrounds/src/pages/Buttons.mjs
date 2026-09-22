import { useState } from "@bunnix/core";
import { Heading, Text, Column, Row, Spacer, Grid, Button, LinkButton, Icon } from "@bunnix/components";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function ButtonPage() {
  const clickCount = useState(0);
  const handleIncrement = () => {
    clickCount.set(Number(clickCount.get?.() ?? 0) + 1);
  };

  return Column(
    Heading({ h2: true }, "Button Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Standard button variants, icons, and disabled states",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { useState } from "@bunnix/core";
        import { Button } from "@bunnix/components";

        const clickCount = useState(0);

        Button({ click: () => clickCount.set(clickCount.get() + 1) }, "Click me");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Base Button"),
      Text("Native button with click action. Renders type button by default."),
      Spacer({ minHeight: 8 }),
      Row(
        { gap: "small", alignItems: "center" },
        Button({ click: handleIncrement }, "Click me"),
        Text(clickCount.map((count) => `Clicked ${count}x`)),
      ),
    ),
    Spacer({ minHeight: 16 }),
    ComponentShowcase(
      {
        code: `
        import { Button } from "@bunnix/components";

        Button({ disabled: true }, "Disabled Primary");
        Button({ variant: "secondary", disabled: true }, "Disabled Secondary");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Disabled"),
      Text("Disabled state blocks interaction. Accepts a plain boolean or reactive state."),
      Spacer({ minHeight: 8 }),
      Row(
        { gap: "small" },
        Button({ disabled: true }, "Disabled Primary"),
        Button({ variant: "secondary", disabled: true }, "Disabled Secondary"),
      ),
    ),
    Spacer({ minHeight: 16 }),
    ComponentShowcase(
      {
        code: `
        import { Button } from "@bunnix/components";

        Button("Primary");
        Button({ variant: "secondary" }, "Secondary");
        Button({ variant: "tertiary" }, "Tertiary");
        Button({ variant: "quaternary" }, "Quaternary");
        Button({ variant: "danger" }, "Danger");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Variants"),
      Text("Style variants without icons. Quaternary shares the tertiary base with a transparent-blend hover instead of a solid fill."),
      Spacer({ minHeight: 8 }),
      Grid(
        { layout: "flow", gridGap: "small" },
        Button("Primary"),
        Button({ variant: "secondary" }, "Secondary"),
        Button({ variant: "tertiary" }, "Tertiary"),
        Button({ variant: "quaternary" }, "Quaternary"),
        Button({ variant: "danger" }, "Danger"),
      ),
    ),
    Spacer({ minHeight: 16 }),
    ComponentShowcase(
      {
        code: `
        import { Button, Icon } from "@bunnix/components";

        Button(
          Icon({ name: "checkmark", size: 16 }),
          "With Icon"
        );
        Button(
          { variant: "quaternary" },
          Icon({ name: "star", size: 16 }),
          "Quaternary Star"
        );
        `,
      },
      Heading({ h3: true, color: "secondary" }, "With Icon"),
      Text("Buttons combining icons and text labels."),
      Spacer({ minHeight: 8 }),
      Row(
        { gap: "small" },
        Button(
          Icon({ name: "checkmark", size: 16 }),
          "With Icon",
        ),
        Button(
          { variant: "quaternary" },
          Icon({ name: "star", size: 16 }),
          "Quaternary Star",
        ),
      ),
    ),
  );
}

export function LinkButtonPage() {
  return Column(
    Heading({ h2: true }, "LinkButton Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Link-styled button variants and icon usage",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { LinkButton } from "@bunnix/components";

        LinkButton("Link Button");
        LinkButton({ variant: "secondary" }, "Secondary Link");
        LinkButton({ variant: "tertiary" }, "Tertiary Link");
        LinkButton({ variant: "danger" }, "Danger Link");
        LinkButton(
          Icon({ name: "arrow_up_right_square", size: 16 }),
          "External Link"
        );
        LinkButton({ disabled: true }, "Disabled Link");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "LinkButton"),
      Text("Link-styled button component with underline hover effects."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Row(
          { gap: "regular" },
          LinkButton("Link Button"),
          LinkButton({ variant: "secondary" }, "Secondary Link"),
          LinkButton({ variant: "tertiary" }, "Tertiary Link"),
          LinkButton({ variant: "danger" }, "Danger Link"),
        ),
        Row(
          { gap: "regular" },
          LinkButton(
            Icon({ name: "arrow_right", size: 16 }),
            "With Icon"
          ),
          LinkButton({ disabled: true }, "Disabled Link"),
        ),
      ),
    ),
  );
}
