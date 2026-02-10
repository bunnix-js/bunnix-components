import Bunnix from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Spacer, Grid2 } from "../../../src/core/layout.mjs";
import { Icon2 } from "../../../src/core/media.mjs";
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
        navigator.clipboard.writeText(`Icon2({ name: "${iconName}" })`);
      },
    },
    Icon2({ name: iconName, size: 32 }),
    Text2({ color: "secondary", textSize: "0.75rem", textAlign: "center" }, iconName),
  );

  return Column(
    Heading({ h2: true }, "Icon Registry"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      `${iconNames.length} icons available in the registry`,
    ),
    Spacer({ minHeight: 24 }),
    Text2("Click any icon to copy its code to clipboard."),
    Spacer({ minHeight: 16 }),
    Grid2(
      {
        layout: "flow",
        gridGap: 12,
      },
      ...iconNames.map(iconName => IconCard(iconName))
    ),
  );
}
