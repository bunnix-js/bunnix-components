import Bunnix from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Spacer, Grid, Row } from "../../../src/core/layout.mjs";
import { Icon } from "../../../src/core/media.mjs";
import { Button, LinkButton } from "../../../src/core/buttons.mjs";
import {
  framework7IconNames,
  framework7IconsSourceCount,
} from "../data/framework7-icons.mjs";

const OFFICIAL_ICONS_URL = "https://framework7.io/icons/";
const OFFICIAL_RELEASE_URL = "https://github.com/framework7io/framework7-icons/releases/tag/v5.0.5";

export function IconRegistryPage() {
  const IconCard = (iconName) => Button(
    {
      variant: "tertiary",
      padding: false,
      radius: "regular",
      style: {
        minWidth: "120px",
        minHeight: "120px",
        cursor: "pointer",
      },
      click: () => {
        navigator.clipboard.writeText(`Icon({ name: "${iconName}" })`);
      },
    },
    Column(
      {
        padding: "regular",
        alignItems: "center",
        justifyContent: "center",
        gap: "small",
        width: "100%",
      },
      Icon({ name: iconName, size: 32 }),
      Text({ color: "secondary", textSize: "0.75rem", textAlign: "center" }, iconName),
    ),
  );

  return Column(
    Heading({ h2: true }, "Framework7 Icons"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      `${framework7IconNames.length} unique ligatures from the official v5.0.5 package`,
    ),
    Spacer({ minHeight: 24 }),
    Text('Click any icon card to copy `Icon({ name: "..." })`.'),
    Spacer({ minHeight: 12 }),
    Row(
      { gap: "regular" },
      LinkButton(
        {
          click: () => window.open(OFFICIAL_ICONS_URL, "_blank", "noopener,noreferrer"),
        },
        "Official Icons Site",
      ),
      LinkButton(
        {
          click: () => window.open(OFFICIAL_RELEASE_URL, "_blank", "noopener,noreferrer"),
        },
        "v5.0.5 Release",
      ),
    ),
    Spacer({ minHeight: 16 }),
    Grid(
      {
        columns: [
          { size: "auto" },
          { size: "auto" },
          { size: "auto" },
          { size: "auto" },
          { size: "auto" },
        ],
        gridGap: 12,
      },
      ...framework7IconNames.map((iconName) => IconCard(iconName)),
    ),
  );
}
