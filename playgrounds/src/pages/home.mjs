import Bunnix from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Spacer } from "../../../src/core/layout.mjs";

export function HomePage() {
  return Column(
    { gap: "regular" },
    
    // Hero
    Column(
      { gap: "small" },
      Heading({ h1: true }, "Bunnix Components"),
      Text2(
        { color: "secondary" },
        "A reactive component library built on Bunnix Core",
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Introduction
    Text2(
      "Bunnix Components provides a comprehensive set of UI primitives with reactive state binding, ",
      "automatic style extraction, and a consistent API. Built for speed, simplicity, and flexibility.",
    ),

    Spacer({ minHeight: 24 }),

    // Components
    Column(
      { gap: "small" },
      Heading({ h2: true }, "Components"),
      Text2({ color: "secondary" }, "Explore the component library using the sidebar navigation."),
    ),

    Spacer({ minHeight: 48 }),
  );
}
