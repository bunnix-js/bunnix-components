import Bunnix from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Grid, Row, Spacer } from "../../../src/core/layout.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

const { div } = Bunnix;

export function ColorsPage() {
  // Helper for color swatch
  const ColorSwatch = (props) =>
    Column(
      { gap: "small", alignItems: "center" },
      div({
        style: {
          width: "80px",
          height: "80px",
          backgroundColor: props.color,
          borderRadius: "8px",
          border: "1px solid var(--color-border-primary)",
        },
      }),
      Text({ color: "secondary", textSize: "0.875rem" }, props.name),
    );

  return Column(
    Heading({ h2: true }, "Color System"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Core color tokens with light/dark mode support",
    ),
    Spacer({ minHeight: 24 }),

    // Text Colors
    ComponentShowcase(
      {
        code: `
        import { Text } from "@bunnix/components";

        Text({ color: "primary" }, "Primary text");
        Text({ color: "secondary" }, "Secondary text");
        Text({ color: "tertiary" }, "Tertiary text");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Text Colors"),
      Text(
        "Primary, secondary, and tertiary text colors that adapt to light/dark mode.",
      ),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text({ color: "primary" }, "Primary text color"),
        Text({ color: "secondary" }, "Secondary text color"),
        Text({ color: "tertiary" }, "Tertiary text color"),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Semantic Colors
    ComponentShowcase(
      {
        code: `
        import { Text } from "@bunnix/components";

        Text({ color: "success" }, "Success message");
        Text({ color: "warning" }, "Warning message");
        Text({ color: "danger" }, "Error message");
        Text({ color: "link" }, "Link text");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Semantic Colors"),
      Text("Semantic colors for success, warning, danger, and link states."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text({ color: "success" }, "Success: Operation completed"),
        Text({ color: "warning" }, "Warning: Please review"),
        Text({ color: "danger" }, "Error: Something went wrong"),
        Text({ color: "link" }, "Link: Click here"),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Background Colors
    ComponentShowcase(
      {
        code: `
        import { Column } from "@bunnix/components";

        Column(
          { bg: "primary", padding: "regular" },
          "Primary background"
        );

        Column(
          { bg: "primary-dimmed", padding: "regular" },
          "Primary dimmed background"
        );

        Column(
          { bg: "secondary", padding: "regular" },
          "Secondary background"
        );
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Background Colors"),
      Text("Background color utilities using the bg prop or CSS classes."),
      Spacer({ minHeight: 8 }),
      Grid(
        { layout: "flow", gridGap: 8 },
        ColorSwatch({ color: "var(--color-bg-primary)", name: "primary" }),
        ColorSwatch({ color: "var(--color-bg-primary-dimmed)", name: "primary-dimmed" }),
        ColorSwatch({ color: "var(--color-bg-secondary)", name: "secondary" }),
        ColorSwatch({ color: "var(--color-success)", name: "success" }),
        ColorSwatch({ color: "var(--color-warning)", name: "warning" }),
        ColorSwatch({ color: "var(--color-danger)", name: "danger" }),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Color Tokens
    ComponentShowcase(
      {
        code: `
        // CSS Variables
        var(--color-primary)
        var(--color-secondary)
        var(--color-tertiary)
        var(--color-success)
        var(--color-warning)
        var(--color-danger)
        var(--color-link)

        // Background tokens
        var(--color-bg-primary)
        var(--color-bg-primary-dimmed)
        var(--color-bg-secondary)

        // Border tokens
        var(--color-border-primary)

        // Using with CSS classes
        .fg-primary { color: var(--color-primary); }
        .bg-primary { background-color: var(--color-bg-primary); }

        // Using with props
        Text({ color: "primary" }, "Text");
        Column({ bg: "primary" }, "Content");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Color Tokens"),
      Text(
        "All color tokens are available as CSS variables and can be used via props or classes.",
      ),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text(
          "Color tokens automatically adapt between light and dark modes using the light-dark() CSS function.",
        ),
        Spacer({ minHeight: 8 }),
        div(
          { bg: "primary-dimmed", padding: "regular", radius: "regular" },
          Column(
            { gap: "small" },
            Text({ weight: "heavy" }, "Available Props:"),
            Text(
              { color: "secondary" },
              "• color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'link'",
            ),
            Text(
              { color: "secondary" },
              "• bg: 'primary' | 'primary-dimmed' | 'secondary' | 'success' | 'warning' | 'danger'",
            ),
          ),
        ),
      ),
    ),
  );
}
