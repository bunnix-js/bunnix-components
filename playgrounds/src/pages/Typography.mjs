import Bunnix from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Spacer } from "../../../src/core/layout.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function TypographyPage() {
  return Column(
    Heading({ h2: true }, "Typography Components"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Core typography components for text display",
    ),
    Spacer({ minHeight: 24 }),
    
    // Heading Component
    ComponentShowcase(
      {
        code: `
        import { Heading } from "@bunnix/components";

        Heading({ h1: true }, "Heading 1");
        Heading({ h2: true }, "Heading 2");
        Heading({ h3: true }, "Heading 3");
        Heading({ h4: true, color: "secondary" }, "Heading 4");
        Heading({ h5: true, weight: "heavy" }, "Heading 5");
        Heading({ h6: true }, "Heading 6");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Heading"),
      Text("Heading component for displaying text with semantic heading levels (h1-h6) and customizable styles."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Heading({ h1: true }, "Heading 1"),
        Heading({ h2: true }, "Heading 2"),
        Heading({ h3: true }, "Heading 3"),
        Heading({ h4: true, color: "secondary" }, "Heading 4 - Secondary"),
        Heading({ h5: true, weight: "heavy" }, "Heading 5 - Heavy"),
        Heading({ h6: true }, "Heading 6"),
      ),
    ),
    
    Spacer({ minHeight: 16 }),
    
    // Text Component
    ComponentShowcase(
      {
        code: `
        import { Text } from "@bunnix/components";

        Text("Default text");
        Text({ color: "secondary" }, "Secondary color");
        Text({ weight: "heavy" }, "Heavy weight");
        Text({ size: "large" }, "Large text");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Text"),
      Text("Simple text wrapper component using span element with style extraction support."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text("Default text"),
        Text({ color: "secondary" }, "Secondary color text"),
        Text({ weight: "heavy" }, "Heavy weight text"),
        Text({ color: "secondary", weight: "heavy" }, "Heavy secondary text"),
        Text({ size: "large" }, "Large text"),
      ),
    ),
  );
}
