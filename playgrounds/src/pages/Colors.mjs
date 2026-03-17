import Bunnix from "@bunnix/core";
import { Heading, Text, Column, Grid, Row, Spacer } from "@bunnix/components";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

const { div } = Bunnix;

export function ColorsPage() {
  // Helper for color swatch
  const ColorSwatch = (props) =>
    Column(
      { gap: "small", alignItems: "center" },
      Column({
        bgColor: props.color,
        width: 80,
        height: 80,
        style: {
          borderRadius: "8px",
          border: "1px solid var(--color-border-primary)",
        },
      }),
      Text({ color: "secondary", textSize: "0.875rem" }, props.name),
    );

  const BorderSwatch = (props) =>
    Column(
      { gap: "small", alignItems: "center" },
      Column({
        border: props.border,
        bgColor: "primary-dimmed",
        width: 80,
        height: 80,
        radius: "regular",
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

        // Named tokens resolve to design system CSS variables
        Column({ bgColor: "primary", padding: "regular" }, "Primary background");
        Column({ bgColor: "secondary", padding: "regular" }, "Secondary background");
        Column({ bgColor: "success", padding: "regular" }, "Success background");

        // Also accepts raw CSS values
        Column({ bgColor: "#ff6b6b", padding: "regular" }, "Custom hex color");
        Column({ bgColor: "rgba(0,0,0,0.1)", padding: "regular" }, "RGBA color");
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Background Colors"),
      Text("Background colors using the bgColor prop. Accepts named tokens or any CSS color value."),
      Spacer({ minHeight: 8 }),
      Grid(
        { layout: "flow", gridGap: 8 },
        ColorSwatch({ color: "primary", name: "primary" }),
        ColorSwatch({ color: "primary-dimmed", name: "primary-dimmed" }),
        ColorSwatch({ color: "secondary", name: "secondary" }),
        ColorSwatch({ color: "success", name: "success" }),
        ColorSwatch({ color: "success-dimmed", name: "success-dimmed" }),
        ColorSwatch({ color: "warning", name: "warning" }),
        ColorSwatch({ color: "warning-dimmed", name: "warning-dimmed" }),
        ColorSwatch({ color: "danger", name: "danger" }),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Border Colors
    ComponentShowcase(
      {
        code: `
        import { Column, Grid } from "@bunnix/components";

        Grid(
          { layout: "flow", gridGap: 8 },
          Column({ border: "none", padding: "regular", radius: "regular" }, "None"),
          Column({ border: "primary", padding: "regular", radius: "regular" }, "Primary"),
          Column({ border: "secondary", padding: "regular", radius: "regular" }, "Secondary"),
          Column({ border: "tertiary", padding: "regular", radius: "regular" }, "Tertiary"),
          Column({ border: "transparent", padding: "regular", radius: "regular" }, "Transparent"),
        );
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Border Colors"),
      Text(
        "Border tones use the resolved border prop and adapt across light and dark modes, with secondary and tertiary as toned-down primary borders.",
      ),
      Spacer({ minHeight: 8 }),
      Grid(
        { layout: "flow", gridGap: 8 },
        BorderSwatch({ border: "none", name: "none" }),
        BorderSwatch({ border: "primary", name: "primary" }),
        BorderSwatch({ border: "secondary", name: "secondary" }),
        BorderSwatch({ border: "tertiary", name: "tertiary" }),
        BorderSwatch({ border: "transparent", name: "transparent" }),
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
        var(--color-border-secondary)
        var(--color-border-tertiary)

        // Using with CSS classes
        .fg-primary { color: var(--color-primary); }
        .bg-primary { background-color: var(--color-bg-primary); }

        // Using with props
        Text({ color: "primary" }, "Text");
        Column({ bgColor: "primary" }, "Content");
        Column({ bgColor: "#ff0000" }, "Custom color");
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
              "• bgColor: 'primary' | 'primary-dimmed' | 'secondary' | 'success' | 'success-dimmed' | 'warning' | 'warning-dimmed' | 'danger' | <any CSS color>",
            ),
            Text(
              { color: "secondary" },
              "• border: 'none' | 'primary' | 'secondary' | 'tertiary' | 'transparent'",
            ),
          ),
        ),
      ),
    ),
  );
}
