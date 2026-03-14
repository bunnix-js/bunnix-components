import Bunnix from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Spacer, Grid } from "../../../src/core/layout.mjs";
import { Icon } from "../../../src/core/media.mjs";
import { LinkButton } from "../../../src/core/buttons.mjs";
import {
  framework7IconNames,
  framework7IconsAttribution,
  framework7IconsIntro,
  framework7IconsMirrorUrl,
} from "../data/framework7-icons.mjs";
const { div } = Bunnix;

export function IconRegistryPage() {
  const IconCard = (iconName) => Column(
    {
      padding: "regular",
      border: "primary",
      radius: "regular",
      alignItems: "center",
      gap: "small",
      style: {
        minWidth: "120px",
        cursor: "pointer",
      },
      click: () => {
        navigator.clipboard.writeText(`Icon({ name: "${iconName}" })`);
      },
    },
    Icon({ name: iconName, size: 32 }),
    Text({ color: "secondary", textSize: "0.75rem", textAlign: "center" }, iconName),
  );

  return Column(
    Heading({ h2: true }, "Framework7 Icons"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      `${framework7IconNames.length} ligatures from the Defuddle mirror snapshot`,
    ),
    Spacer({ minHeight: 24 }),
    ...framework7IconsIntro.map((copy) =>
      Text({ color: "secondary" }, copy),
    ),
    Spacer({ minHeight: 16 }),
    Text('Click any icon card to copy `Icon({ name: "..." })`.'),
    Spacer({ minHeight: 8 }),
    Column(
      { gap: "small" },
      ...framework7IconsAttribution.map((line) =>
        Text({ color: "secondary", textSize: "0.875rem" }, line),
      ),
    ),
    Spacer({ minHeight: 16 }),
    Grid(
      { layout: "flow", gridGap: 12 },
      ...framework7IconNames.map((iconName) => IconCard(iconName)),
    ),
    Spacer({ minHeight: 16 }),
    Text(
      { color: "secondary" },
      "Browse the same mirrored source page used for this local snapshot.",
    ),
    Spacer({ minHeight: 8 }),
    div(
      LinkButton(
        {
          click: () => window.open(framework7IconsMirrorUrl, "_blank", "noopener,noreferrer"),
        },
        "Open Defuddle Mirror",
      ),
    ),
  );
}
