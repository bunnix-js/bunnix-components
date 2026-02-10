import Bunnix from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Media, Icon2, Spinner, Avatar } from "../../../src/core/media.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function MediaPage() {
  return Column(
    Heading({ h2: true }, "Media Components"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Core media components for icons, spinners, and avatars",
    ),
    Spacer({ minHeight: 24 }),

    // Media Component
    ComponentShowcase(
      {
        code: `
        import { Media } from "@bunnix/components";

        // Image
        Media({ src: "https://picsum.photos/300/200" });

        // With custom size
        Media({ src: "https://picsum.photos/300/200", width: 200, height: 150 });

        // SVG inline
        Media({
          svg: '<svg>...</svg>',
          width: 40,
          height: 40
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Media"),
      Text2("Generic media component that renders images or inline SVG content."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Media({ src: "https://picsum.photos/300/200", width: 300, height: 200, radius: "regular" }),
        Media({ src: "https://picsum.photos/300/200", width: 200, height: 150, radius: "regular" }),
        Row(
          { gap: "regular", alignItems: "center" },
          Media({
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="var(--color-success)" /><circle cx="50" cy="50" r="25" fill="var(--color-bg-primary)" /></svg>',
            width: 40,
            height: 40
          }),
          Media({
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="var(--color-warning)" rx="10" /></svg>',
            width: 40,
            height: 40
          }),
          Media({
            svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 90,90 10,90" fill="var(--color-danger)" /></svg>',
            width: 40,
            height: 40
          }),
        ),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Icon2 Component
    ComponentShowcase(
      {
        code: `
        import { Icon2 } from "@bunnix/components";

        Icon2({ name: "star" });
        Icon2({ name: "heart", size: 32 });
        Icon2({ name: "check", color: "success" });
        Icon2({ name: "close", color: "danger", size: 24 });
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
        Icon2({ name: "close", color: "danger", size: 24 }),
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
        Avatar({ src: "https://ui-avatars.com/api/?size=48", size: 48 });
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
        Avatar({ src: "https://ui-avatars.com/api/?size=48", size: 48 }),
      ),
    ),
  );
}
