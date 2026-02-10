import Bunnix from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Button2, LinkButton } from "../../../src/core/buttons.mjs";
import { Icon2 } from "../../../src/core/media.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function ButtonsPage() {
  return Column(
    Heading({ h2: true }, "Button Components"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Core button components for user actions",
    ),
    Spacer({ minHeight: 24 }),
    
    // Button2 Component
    ComponentShowcase(
      {
        code: `
        import { Button2 } from "@bunnix/components";

        // Default/Primary variant
        Button2("Primary Button");

        // Secondary variant
        Button2({ variant: "secondary" }, "Secondary");

        // Tertiary variant
        Button2({ variant: "tertiary" }, "Tertiary");

        // Danger variant
        Button2({ variant: "danger" }, "Danger");

        // With icon
        Button2(
          Icon2({ name: "check", size: 16 }),
          "With Icon"
        );

        // Disabled
        Button2({ disabled: true }, "Disabled");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Button2"),
      Text2("Standard button component with multiple variants and states."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Row(
          { gap: "small" },
          Button2("Primary"),
          Button2({ variant: "secondary" }, "Secondary"),
          Button2({ variant: "tertiary" }, "Tertiary"),
          Button2({ variant: "danger" }, "Danger"),
        ),
        Row(
          { gap: "small" },
          Button2(
            Icon2({ name: "check", size: 16 }),
            "With Icon"
          ),
          Button2(
            { variant: "secondary" },
            Icon2({ name: "star", size: 16 }),
            "Star"
          ),
        ),
        Row(
          { gap: "small" },
          Button2({ disabled: true }, "Disabled Primary"),
          Button2({ variant: "secondary", disabled: true }, "Disabled Secondary"),
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
          Icon2({ name: "external-link", size: 16 }),
          "External Link"
        );

        // Disabled
        LinkButton({ disabled: true }, "Disabled Link");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "LinkButton"),
      Text2("Link-styled button component with underline hover effects."),
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
            Icon2({ name: "arrow-right", size: 16 }),
            "With Icon"
          ),
          LinkButton({ disabled: true }, "Disabled Link"),
        ),
      ),
    ),
  );
}
