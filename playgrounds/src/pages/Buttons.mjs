import Bunnix from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Button, LinkButton } from "../../../src/core/buttons.mjs";
import { Icon } from "../../../src/core/media.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function ButtonPage() {
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
        import { Button } from "@bunnix/components";

        Button("Primary Button");
        Button({ variant: "secondary" }, "Secondary");
        Button({ variant: "tertiary" }, "Tertiary");
        Button({ variant: "danger" }, "Danger");
        Button(
          Icon({ name: "checkmark", size: 16 }),
          "With Icon"
        );
        Button({ disabled: true }, "Disabled");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Button"),
      Text("Standard button component with multiple variants and states."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Row(
          { gap: "small" },
          Button("Primary"),
          Button({ variant: "secondary" }, "Secondary"),
          Button({ variant: "tertiary" }, "Tertiary"),
          Button({ variant: "danger" }, "Danger"),
        ),
        Row(
          { gap: "small" },
          Button(
            Icon({ name: "checkmark", size: 16 }),
            "With Icon"
          ),
          Button(
            { variant: "secondary" },
            Icon({ name: "star", size: 16 }),
            "Star"
          ),
        ),
        Row(
          { gap: "small" },
          Button({ disabled: true }, "Disabled Primary"),
          Button({ variant: "secondary", disabled: true }, "Disabled Secondary"),
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
