import Bunnix from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Button, LinkButton } from "../../../src/core/buttons.mjs";
import { Icon } from "../../../src/core/media.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function ButtonsPage() {
  return Column(
    Heading({ h2: true }, "Button Components"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Core button components for user actions",
    ),
    Spacer({ minHeight: 24 }),
    
    // Button Component
    ComponentShowcase(
      {
        code: `
        import { Button } from "@bunnix/components";

        // Default/Primary variant
        Button("Primary Button");

        // Secondary variant
        Button({ variant: "secondary" }, "Secondary");

        // Tertiary variant
        Button({ variant: "tertiary" }, "Tertiary");

        // Danger variant
        Button({ variant: "danger" }, "Danger");

        // With icon
        Button(
          Icon({ name: "check", size: 16 }),
          "With Icon"
        );

        // Disabled
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
            Icon({ name: "check", size: 16 }),
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
    
    Spacer({ minHeight: 16 }),
    
    // LinkButton Component
    ComponentShowcase(
      {
        code: `
        import { LinkButton } from "@bunnix/components";

        // Default/Link variant
        LinkButton("Link Button");

        // Secondary variant
        LinkButton({ variant: "secondary" }, "Secondary Link");

        // Tertiary variant
        LinkButton({ variant: "tertiary" }, "Tertiary Link");

        // Danger variant
        LinkButton({ variant: "danger" }, "Danger Link");

        // With icon
        LinkButton(
          Icon({ name: "external-link", size: 16 }),
          "External Link"
        );

        // Disabled
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
            Icon({ name: "arrow-right", size: 16 }),
            "With Icon"
          ),
          LinkButton({ disabled: true }, "Disabled Link"),
        ),
      ),
    ),
  );
}
