import Bunnix from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Spacer, Grid } from "../../../src/core/layout.mjs";
import { Icon } from "../../../src/core/media.mjs";
import { iconRegistry } from "../../../src/utils/iconRegistry.generated.mjs";
const { div } = Bunnix;

export function IconRegistryPage() {
  const iconNames = Object.keys(iconRegistry);

  const IconCard = (iconName) => Column(
    {
      padding: "regular",
      border: "primary",
      radius: "regular",
      alignItems: "center",
      gap: "small",
      style: {
        minWidth: "100px",
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
    Heading({ h2: true }, "Icon Registry"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      `${iconNames.length} icons available in the registry`,
    ),
    Spacer({ minHeight: 24 }),
    Text("Click any icon to copy its code to clipboard."),
    Spacer({ minHeight: 16 }),
    Grid(
      {
        layout: "flow",
        gridGap: 12,
      },
      ...iconNames.map(iconName => IconCard(iconName))
    ),
  );
}
