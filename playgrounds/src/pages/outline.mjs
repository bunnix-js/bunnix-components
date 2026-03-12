import Bunnix from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Icon } from "../../../src/core/media.mjs";
import { Outline } from "../../../src/core/outline.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function OutlinePage() {
  return Column(
    Heading({ h2: true }, "Outline Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Disclosure widget with togglable details region",
    ),
    Spacer({ minHeight: 24 }),

    // Basic Outline
    ComponentShowcase(
      {
        code: `
        import { Outline, Text, Column } from "@bunnix/components";

        Outline({
          anchor: Text({ weight: "heavy" }, "What is Bunnix?"),
          details: Column({ paddingTop: "small" },
            Text("Bunnix is a lightweight reactive component library..."),
          ),
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Basic Outline"),
      Text("Click the anchor to expand or collapse the details."),
      Spacer({ minHeight: 8 }),
      Outline({
        anchor: Text({ weight: "heavy" }, "What is Bunnix?"),
        details: Column({ paddingTop: "small" },
          Text("Bunnix is a lightweight, reactive component library built on core web technologies with a focus on simplicity and performance."),
        ),
      }),
    ),

    Spacer({ minHeight: 16 }),

    // With Rich Anchor
    ComponentShowcase(
      {
        code: `
        import { Outline, Row, Icon, Text, Column } from "@bunnix/components";

        Outline({
          anchor: Row({ alignItems: "center", gap: "small" },
            Icon({ name: "doc-richtext", size: 16, color: "secondary" }),
            Text({ weight: "heavy" }, "Documentation"),
          ),
          details: Column({ gap: "small", paddingTop: "small" },
            Text("• Getting started"),
            Text("• API reference"),
            Text("• Examples and patterns"),
          ),
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "With Rich Anchor"),
      Text("Anchor can be any Bunnix node — combine icons, text, and custom layouts."),
      Spacer({ minHeight: 8 }),
      Outline({
        anchor: Row({ alignItems: "center", gap: "small" },
          Icon({ name: "doc-richtext", size: 16, color: "secondary" }),
          Text({ weight: "heavy" }, "Documentation"),
        ),
        details: Column({ gap: "small", paddingTop: "small" },
          Text("• Getting started guide"),
          Text("• Complete API reference"),
          Text("• Examples and patterns"),
        ),
      }),
    ),

    Spacer({ minHeight: 16 }),

    // With Layout Props
    ComponentShowcase(
      {
        code: `
        import { Outline, Row, Icon, Text, Column } from "@bunnix/components";

        Outline({
          gap: "small",
          padding: "regular",
          bgColor: "primary-dimmed",
          anchor: Row({ alignItems: "center", gap: "small" },
            Icon({ name: "settings", size: 16 }),
            Text({ weight: "heavy" }, "Settings"),
          ),
          details: Column({ gap: "small", paddingTop: "small" },
            Text("Configure your preferences here."),
          ),
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "With Layout Props"),
      Text("Supports all layout props: gap, padding, margin, bgColor, width, etc."),
      Spacer({ minHeight: 8 }),
      Outline({
        gap: "small",
        padding: "regular",
        bgColor: "primary-dimmed",
        anchor: Row({ alignItems: "center", gap: "small" },
          Icon({ name: "settings", size: 16 }),
          Text({ weight: "heavy" }, "Settings"),
        ),
        details: Column({ gap: "small", paddingTop: "small" },
          Text("Configure your preferences and options here."),
        ),
      }),
    ),

    Spacer({ minHeight: 16 }),

    // Features
    ComponentShowcase(
      {
        code: `
        // Outline API
        {
          anchor: BunnixChild,      // Required: trigger content
          details: BunnixChild,     // Required: expandable content

          // Inherits all LayoutProps:
          gap: number | string,
          padding: number | string,
          margin: number | string,
          bgColor: string,
          width: number | string,
          // ... and more
        }
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Features"),
      Text("Key features of the Outline component:"),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text(
          Text({ weight: "heavy" }, "• anchor:"),
          " Always-visible trigger — accepts any Bunnix node",
        ),
        Text(
          Text({ weight: "heavy" }, "• details:"),
          " Collapsible content — accepts any Bunnix node",
        ),
        Text(
          Text({ weight: "heavy" }, "• Chevron icon:"),
          " Automatically toggles between chevron-down and chevron-up",
        ),
        Text(
          Text({ weight: "heavy" }, "• Layout props:"),
          " Full support for gap, padding, margin, bgColor, width, height, etc.",
        ),
        Text(
          Text({ weight: "heavy" }, "• Closed by default:"),
          " Details are hidden until user clicks the anchor",
        ),
      ),
    ),
  );
}
