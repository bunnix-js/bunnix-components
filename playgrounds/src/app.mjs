import Bunnix, { Show, useState } from "@bunnix/core";
import { Column, Grid } from "../../src/core/layout.mjs";
import { Sidebar } from "../../src/core/sidebar.mjs";
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
import { HomePage } from "./pages/home.mjs";
import { SidebarPage } from "./pages/sidebar.mjs";
import { MenuPage } from "./pages/menu.mjs";
import { ProgressPage } from "./pages/progress.mjs";

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
  { key: "sidebar", text: "Sidebar", icon: "columns-layout" },
  { key: "menu", text: "Menu", icon: "more-vertical" },
  { key: "media", text: "Media", icon: "image" },
  { key: "inputs", text: "Inputs", icon: "edit" },
  { key: "table", text: "Table", icon: "table" },
  { key: "dialog", text: "Dialog", icon: "hand" },
  { key: "progress", text: "Progress", icon: "battery-25" },
];

export function App() {
  const selectedSidebarKey = useState("progress");

  return Grid(
    {
      columns: [{ size: 240 }, { size: "auto" }],
    },
    Sidebar({ items: sidebarItems, selected: selectedSidebarKey }),
    // Contents
    Column(
      { padding: "large" },
      Show(selectedSidebarKey, (item) => {
        if (item === "home") return HomePage();
        if (item === "colors") return ColorsPage();
        if (item === "layout") return LayoutPage();
        if (item === "grid") return GridPage();
        if (item === "typography") return TypographyPage();
        if (item === "icon-registry") return IconRegistryPage();
        if (item === "buttons") return ButtonsPage();
        if (item === "sidebar") return SidebarPage();
        if (item === "menu") return MenuPage();
        if (item === "media") return MediaPage();
        if (item === "inputs") return InputsPage();
        if (item === "table") return TablePage();
        if (item === "dialog") return DialogPage();
        if (item === "progress") return ProgressPage();
      }),
    ),
  );
}
