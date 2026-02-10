import Bunnix, { ForEach, Show, useState } from "@bunnix/core";
import { Column, Grid2, Row } from "../../src/core/layout.mjs";
import { Button2 } from "../../src/core/buttons.mjs";
import { Icon2 } from "../../src/core/media.mjs";
import { LayoutPage } from "./pages/layout.mjs";
import { TypographyPage } from "./pages/typography.mjs";
import { MediaPage } from "./pages/media.mjs";
import { InputsPage } from "./pages/inputs.mjs";
import { TablePage } from "./pages/table.mjs";
import { DialogPage } from "./pages/dialog.mjs";
import { ButtonsPage } from "./pages/buttons.mjs";
import { ColorsPage } from "./pages/colors.mjs";
import { GridPage } from "./pages/grid.mjs";
import { IconRegistryPage } from "./pages/icon-registry.mjs";
import { Heading, Text2 } from "../../src/core/typography.mjs";

const sidebarItems = [
  { key: "header-core", text: "Core", isHeader: true },
  { key: "colors", text: "Colors", icon: "palette" },
  { key: "layout", text: "Layout", icon: "table" },
  { key: "grid", text: "Grid", icon: "grid" },
  { key: "typography", text: "Typography", icon: "text" },
  { key: "header-icons", text: "Icon Registry", isHeader: true },
  { key: "icon-registry", text: "Icons", icon: "star" },
  { key: "header-components", text: "Components", isHeader: true },
  { key: "buttons", text: "Buttons", icon: "button" },
  { key: "media", text: "Media", icon: "image" },
  { key: "inputs", text: "Inputs", icon: "edit" },
  { key: "table", text: "Table", icon: "table" },
  { key: "dialog", text: "Dialog", icon: "hand" },
];

export function App() {
  const selectedSidebarKey = useState("grid");

  return Grid2(
    {
      columns: [{ size: 240 }, { size: "auto" }],
    },
    // Sidebar
    Column(
      { padding: "regular" },
      ForEach(sidebarItems, "key", (item) =>
        item.isHeader
          ? Heading(
              { h4: true, color: "tertiary", textSize: "1rem" },
              item.text,
            )
          : Button2(
              {
                variant: "tertiary",
                click: () => selectedSidebarKey.set(item.key),
              },
              Row(
                { fillWidth: true, alignItems: "center" },
                Icon2({ name: item.icon, color: "secondary" }),
                Row(item.text),
              ),
            ),
      ),
    ),
    // Contents
    Column(
      { padding: "large" },
      Show(selectedSidebarKey, (item) => {
        if (item === "colors") return ColorsPage();
        if (item === "layout") return LayoutPage();
        if (item === "grid") return GridPage();
        if (item === "typography") return TypographyPage();
        if (item === "icon-registry") return IconRegistryPage();
        if (item === "buttons") return ButtonsPage();
        if (item === "media") return MediaPage();
        if (item === "inputs") return InputsPage();
        if (item === "table") return TablePage();
        if (item === "dialog") return DialogPage();
        return Heading({ h2: true }, "Bunnix Components");
      }),
    ),
  );
}
