import Bunnix, { Show, useState } from "@bunnix/core";
import { Column, Grid2 } from "../../src/core/layout.mjs";
import { Sidebar2 } from "../../src/core/sidebar.mjs";
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
import { Heading } from "../../src/core/typography.mjs";

const sidebarItems = [
  { key: "home", text: "Home", icon: "home" },
  { key: "header-core", text: "Core", isHeader: true },
  { key: "layout", text: "Layout", icon: "table" },
  { key: "colors", text: "Colors", icon: "palette" },
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
  const selectedSidebarKey = useState("home");

  return Grid2(
    {
      columns: [{ size: 240 }, { size: "auto" }],
    },
    Sidebar2({ items: sidebarItems, selected: selectedSidebarKey }),
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
        if (item === "home") return Heading({ h2: true }, "Bunnix Components");
      }),
    ),
  );
}
