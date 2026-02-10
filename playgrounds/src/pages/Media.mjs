import Bunnix from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Icon2, Spinner, Avatar } from "../../../src/core/media.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function MediaPage() {
  return Column(
    Heading({ h2: true }, "Media Components"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Core media components for icons, spinners, and avatars",
    ),
    Spacer({ minHeight: 24 }),
    
    // Icon2 Component
    ComponentShowcase(
      {
        code: `
        import { Icon2 } from "@bunnix/components";

        Icon2({ name: "star" });
        Icon2({ name: "heart", size: 32 });
        Icon2({ name: "check", color: "success" });
        Icon2({ name: "x", color: "danger", size: 24 });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Icon2"),
      Text2("Icon component using the icon registry with customizable size and color."),
      Spacer({ minHeight: 8 }),
      Row(
        { gap: "regular", alignItems: "center" },
        Icon2({ name: "star" }),
        Icon2({ name: "heart", size: 32 }),
        Icon2({ name: "check", color: "success" }),
        Icon2({ name: "x", color: "danger", size: 24 }),
      ),
    ),
    
    Spacer({ minHeight: 16 }),
    
    // Spinner Component
    ComponentShowcase(
      {
        code: `
        import { Spinner } from "@bunnix/components";

        Spinner();
        Spinner({ size: 32 });
        Spinner({ color: "primary", size: 40 });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Spinner"),
      Text2("Animated loading spinner with customizable size and color."),
      Spacer({ minHeight: 8 }),
      Row(
        { gap: "regular", alignItems: "center" },
        Spinner(),
        Spinner({ size: 32 }),
        Spinner({ color: "primary", size: 40 }),
      ),
    ),
    
    Spacer({ minHeight: 16 }),
    
    // Avatar Component
    ComponentShowcase(
      {
        code: `
        import { Avatar } from "@bunnix/components";

        Avatar({ letter: "A" });
        Avatar({ letter: "B", size: 40 });
        Avatar({ letter: "C", size: 48 });
        Avatar({ src: "https://..." });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Avatar"),
      Text2("User avatar component with support for images or letter initials."),
      Spacer({ minHeight: 8 }),
      Row(
        { gap: "regular", alignItems: "center" },
        Avatar({ letter: "A" }),
        Avatar({ letter: "B", size: 40 }),
        Avatar({ letter: "C", size: 48 }),
      ),
    ),
  );
}
