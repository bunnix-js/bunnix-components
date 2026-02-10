import Bunnix from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Icon2 } from "../../../src/core/media.mjs";
import { Button2 } from "../../../src/core/buttons.mjs";

const { div } = Bunnix;

export function HomePage() {
  const FeatureCard = (props) =>
    Column(
      {
        padding: "large",
        bg: "primary-dimmed",
        radius: "regular",
        gap: "small",
      },
      Row(
        { gap: "small", alignItems: "center" },
        Icon2({ name: props.icon, size: 24, color: "primary" }),
        Heading({ h3: true }, props.title),
      ),
      Text2({ color: "secondary" }, props.description),
    );

  return Column(
    { gap: "regular" },
    // Hero Section
    Column(
      { gap: "small" },
      Heading({ h1: true }, "Bunnix Components"),
      Heading(
        { h3: true, color: "secondary", weight: "regular" },
        "A reactive component library built on Bunnix Core",
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Introduction
    Column(
      { gap: "small" },
      Text2(
        "Bunnix Components provides a comprehensive set of UI primitives with reactive state binding, ",
        "automatic style extraction, and a consistent API. Built for speed, simplicity, and flexibility.",
      ),
    ),

    Spacer({ minHeight: 24 }),

    // Features Grid
    Heading({ h2: true }, "Key Features"),
    Spacer({ minHeight: 8 }),
    Column(
      { gap: "regular" },
      Row(
        { gap: "regular", style: { flexWrap: "wrap" } },
        FeatureCard({
          icon: "zap",
          title: "Reactive State",
          description:
            "Two-way binding with useState objects. Components automatically sync with your application state.",
        }),
        FeatureCard({
          icon: "layers",
          title: "Style Extraction",
          description:
            "Props like width, height, color, and gap are automatically extracted to inline styles for maximum flexibility.",
        }),
      ),
      Row(
        { gap: "regular", style: { flexWrap: "wrap" } },
        FeatureCard({
          icon: "feather",
          title: "Lightweight",
          description:
            "No heavy dependencies. Pure JavaScript with minimal overhead. Components are tree-shakeable.",
        }),
        FeatureCard({
          icon: "palette",
          title: "Theme Support",
          description:
            "Built-in light/dark mode with CSS variables. All colors automatically adapt to user preferences.",
        }),
      ),
    ),

    Spacer({ minHeight: 32 }),

    // Getting Started
    Column(
      { gap: "small" },
      Heading({ h2: true }, "Getting Started"),
      Text2({ color: "secondary" }, "Explore the component library:"),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "xsmall" },
        Row(
          { gap: "small", alignItems: "center" },
          Icon2({ name: "table", size: 18, color: "secondary" }),
          Text2(
            Text2({ weight: "heavy" }, "Layout"),
            " - Grid, Column, Row, and Spacer components for flexible layouts",
          ),
        ),
        Row(
          { gap: "small", alignItems: "center" },
          Icon2({ name: "text", size: 18, color: "secondary" }),
          Text2(
            Text2({ weight: "heavy" }, "Typography"),
            " - Heading and Text components with semantic styling",
          ),
        ),
        Row(
          { gap: "small", alignItems: "center" },
          Icon2({ name: "button", size: 18, color: "secondary" }),
          Text2(
            Text2({ weight: "heavy" }, "Buttons"),
            " - Button and LinkButton with multiple variants",
          ),
        ),
        Row(
          { gap: "small", alignItems: "center" },
          Icon2({ name: "edit", size: 18, color: "secondary" }),
          Text2(
            Text2({ weight: "heavy" }, "Inputs"),
            " - TextInput, Select, and CheckBox with state binding",
          ),
        ),
        Row(
          { gap: "small", alignItems: "center" },
          Icon2({ name: "image", size: 18, color: "secondary" }),
          Text2(
            Text2({ weight: "heavy" }, "Media"),
            " - Icon, Avatar, and Media components for visual content",
          ),
        ),
        Row(
          { gap: "small", alignItems: "center" },
          Icon2({ name: "table", size: 18, color: "secondary" }),
          Text2(
            Text2({ weight: "heavy" }, "Table"),
            " - Simple table component with flexible cell content",
          ),
        ),
        Row(
          { gap: "small", alignItems: "center" },
          Icon2({ name: "hand", size: 18, color: "secondary" }),
          Text2(
            Text2({ weight: "heavy" }, "Dialog"),
            " - Modal dialog with customizable content",
          ),
        ),
      ),
    ),

    Spacer({ minHeight: 32 }),

    // Architecture
    Column(
      { gap: "small" },
      Heading({ h2: true }, "Architecture"),
      Text2(
        { color: "secondary" },
        "Bunnix Components follows a standardized architecture:",
      ),
      Spacer({ minHeight: 8 }),
      div(
        { bg: "primary-dimmed", padding: "regular", radius: "regular" },
        Column(
          { gap: "small" },
          Text2(
            Text2({ weight: "heavy" }, "1. CSS Base Styles"),
            " - Component-specific .css files with design tokens",
          ),
          Text2(
            Text2({ weight: "heavy" }, "2. Style Extraction"),
            " - Props like width, color, and gap converted to inline styles",
          ),
          Text2(
            Text2({ weight: "heavy" }, "3. Prop Normalization"),
            " - Consistent API across all components with withNormalizedArgs",
          ),
          Text2(
            Text2({ weight: "heavy" }, "4. State Resolution"),
            " - Automatic handling of useState objects or raw values",
          ),
        ),
      ),
    ),

    Spacer({ minHeight: 32 }),

    // Example
    Column(
      { gap: "small" },
      Heading({ h2: true }, "Quick Example"),
      div(
        { bg: "primary-dimmed", padding: "regular", radius: "regular" },
        Column(
          { gap: "small" },
          Text2({ weight: "heavy" }, "Basic Usage:"),
          Spacer({ minHeight: 4 }),
          Text2(
            { color: "secondary", textSize: "0.875rem", style: { fontFamily: "monospace" } },
            'import { Button2, Column, TextInput } from "@bunnix/components";',
          ),
          Text2(
            { color: "secondary", textSize: "0.875rem", style: { fontFamily: "monospace" } },
            'import { useState } from "@bunnix/core";',
          ),
          Spacer({ minHeight: 4 }),
          Text2(
            { color: "secondary", textSize: "0.875rem", style: { fontFamily: "monospace" } },
            'const name = useState("");',
          ),
          Spacer({ minHeight: 4 }),
          Text2(
            { color: "secondary", textSize: "0.875rem", style: { fontFamily: "monospace" } },
            'Column(',
          ),
          Text2(
            { color: "secondary", textSize: "0.875rem", style: { fontFamily: "monospace", paddingLeft: "16px" } },
            '{ gap: "regular" },',
          ),
          Text2(
            { color: "secondary", textSize: "0.875rem", style: { fontFamily: "monospace", paddingLeft: "16px" } },
            'TextInput({ value: name, placeholder: "Enter your name" }),',
          ),
          Text2(
            { color: "secondary", textSize: "0.875rem", style: { fontFamily: "monospace", paddingLeft: "16px" } },
            'Button2({ variant: "primary" }, "Submit")',
          ),
          Text2(
            { color: "secondary", textSize: "0.875rem", style: { fontFamily: "monospace" } },
            ')',
          ),
        ),
      ),
    ),

    Spacer({ minHeight: 48 }),
  );
}
