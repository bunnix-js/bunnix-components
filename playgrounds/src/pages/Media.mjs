import Bunnix from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Media, Icon, Spinner, Avatar } from "../../../src/core/media.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function MediaPage() {
  return Column(
    Heading({ h2: true }, "Media Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Generic image and inline SVG rendering",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { Media } from "@bunnix/components";

        Media({ src: "https://picsum.photos/300/200" });
        Media({ src: "https://picsum.photos/300/200", width: 200, height: 150 });
        Media({
          svg: '<svg>...</svg>',
          width: 40,
          height: 40
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Media"),
      Text("Generic media component that renders images or inline SVG content."),
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
  );
}

export function IconPage() {
  return Column(
    Heading({ h2: true }, "Icon Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Registry-backed icons with configurable size and color",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { Icon } from "@bunnix/components";

        Icon({ name: "star" });
        Icon({ name: "heart", size: 32 });
        Icon({ name: "check", color: "success" });
        Icon({ name: "close", color: "danger", size: 24 });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Icon"),
      Text("Icon component using the icon registry with customizable size and color."),
      Spacer({ minHeight: 8 }),
      Row(
        { gap: "regular", alignItems: "center" },
        Icon({ name: "star" }),
        Icon({ name: "heart", size: 32 }),
        Icon({ name: "check", color: "success" }),
        Icon({ name: "close", color: "danger", size: 24 }),
      ),
    ),
  );
}

export function SpinnerPage() {
  return Column(
    Heading({ h2: true }, "Spinner Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Animated loading feedback with size and color controls",
    ),
    Spacer({ minHeight: 24 }),
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
      Text("Animated loading spinner with customizable size and color."),
      Spacer({ minHeight: 8 }),
      Row(
        { gap: "regular", alignItems: "center" },
        Spinner(),
        Spinner({ size: 32 }),
        Spinner({ color: "primary", size: 40 }),
      ),
    ),
  );
}

export function AvatarPage() {
  return Column(
    Heading({ h2: true }, "Avatar Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Letter and image-based avatars",
    ),
    Spacer({ minHeight: 24 }),
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
      Text("User avatar component with support for images or letter initials."),
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
