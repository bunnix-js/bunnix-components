import Bunnix, { Show, useEffect, useState } from "@bunnix/core";
import { Column, Grid } from "../../src/core/layout.mjs";
import { Sidebar } from "../../src/core/sidebar.mjs";
import { AlignmentPage, ColumnPage, RowPage, SpacerPage } from "./pages/Layout.mjs";
import { HeadingPage, TextPage } from "./pages/Typography.mjs";
import { AvatarPage, IconPage, MediaPage, SpinnerPage } from "./pages/Media.mjs";
import { CheckBoxPage, SegmentedPickerPage, SelectPage, SliderPage, SwitchPage, TextAreaPage, TextInputPage } from "./pages/inputs.mjs";
import { TablePage } from "./pages/table.mjs";
import { DialogPage } from "./pages/dialog.mjs";
import { ButtonPage, LinkButtonPage } from "./pages/Buttons.mjs";
import { ColorsPage } from "./pages/colors.mjs";
import { GridPage } from "./pages/grid.mjs";
import { IconRegistryPage } from "./pages/icon-registry.mjs";
import { HomePage } from "./pages/home.mjs";
import { SidebarPage } from "./pages/sidebar.mjs";
import { MenuPage, PickerPage } from "./pages/menu.mjs";
import { OutlinePage } from "./pages/outline.mjs";
import { ProgressPage } from "./pages/progress.mjs";

const sidebarItems = [
  { key: "home", text: "Home", icon: "house" },
  { key: "header-core", text: "Core", isHeader: true },
  {
    key: "layout",
    text: "Layout",
    icon: "table",
    children: [
      { key: "column", text: "Column" },
      { key: "row", text: "Row" },
      { key: "spacer", text: "Spacer" },
      { key: "alignment", text: "Alignment" },
    ],
  },
  { key: "colors", text: "Colors", icon: "paintbrush" },
  { key: "grid", text: "Grid", icon: "grid" },
  {
    key: "typography",
    text: "Typography",
    icon: "textformat",
    children: [
      { key: "heading", text: "Heading" },
      { key: "text", text: "Text" },
    ],
  },
  { key: "header-icons", text: "Icon Registry", isHeader: true },
  { key: "icon-registry", text: "Icons", icon: "star" },
  { key: "header-components", text: "Components", isHeader: true },
  {
    key: "buttons",
    text: "Buttons",
    icon: "rectangle_on_rectangle",
    children: [
      { key: "button", text: "Button" },
      { key: "link-button", text: "LinkButton" },
    ],
  },
  { key: "sidebar", text: "Sidebar", icon: "sidebar_left" },
  {
    key: "menus",
    text: "Menus",
    icon: "cursor_rays",
    children: [
      { key: "menu", text: "Menu" },
      { key: "picker", text: "Picker" },
    ],
  },
  { key: "outline", text: "Outline", icon: "chevron_down" },
  {
    key: "media",
    text: "Media",
    icon: "photo",
    children: [
      { key: "media-display", text: "Media" },
      { key: "icon", text: "Icon" },
      { key: "spinner", text: "Spinner" },
      { key: "avatar", text: "Avatar" },
    ],
  },
  {
    key: "inputs",
    text: "Inputs",
    icon: "square_pencil",
    children: [
      { key: "text-input", text: "TextInput" },
      { key: "text-area", text: "TextArea" },
      { key: "select", text: "Select" },
      { key: "checkbox", text: "CheckBox" },
      { key: "switch", text: "Switch" },
      { key: "segmented-picker", text: "SegmentedPicker" },
      { key: "slider", text: "Slider" },
    ],
  },
  { key: "table", text: "Table", icon: "table" },
  { key: "dialog", text: "Dialog", icon: "macwindow" },
  { key: "progress", text: "Progress", icon: "battery_25" },
];

const contentPageKeys = new Set([
  "house",
  "colors",
  "column",
  "row",
  "spacer",
  "alignment",
  "grid",
  "heading",
  "text",
  "icon-registry",
  "button",
  "link-button",
  "sidebar",
  "menu",
  "picker",
  "outline",
  "media-display",
  "icon",
  "spinner",
  "avatar",
  "text-input",
  "text-area",
  "select",
  "checkbox",
  "switch",
  "segmented-picker",
  "slider",
  "table",
  "dialog",
  "progress",
]);

export function App() {
  const selectedSidebarKey = useState("house");
  const displayedPageKey = useState("house");

  useEffect((selectedKey) => {
    if (contentPageKeys.has(selectedKey)) displayedPageKey.set(selectedKey);
  }, selectedSidebarKey);

  return Grid(
    {
      columns: [{ size: 240 }, { size: "auto" }],
      height: "100vh",
      fillWidth: true,
      overflow: "hidden",
      minHeight: 0,
    },
    Column(
      {
        fillHeight: true,
        overflow: "auto",
        minHeight: 0,
      },
      Sidebar({ items: sidebarItems, selection: selectedSidebarKey }),
    ),
    // Contents
    Column(
      {
        fillHeight: true,
        minHeight: 0,
        minWidth: 0,
        overflow: "hidden",
      },
      Column(
        {
          fillHeight: true,
          minHeight: 0,
          minWidth: 0,
          overflow: "auto",
          padding: "large",
        },
        Show(displayedPageKey, (item) => {
          if (item === "house") return HomePage();
          if (item === "colors") return ColorsPage();
          if (item === "column") return ColumnPage();
          if (item === "row") return RowPage();
          if (item === "spacer") return SpacerPage();
          if (item === "alignment") return AlignmentPage();
          if (item === "grid") return GridPage();
          if (item === "heading") return HeadingPage();
          if (item === "text") return TextPage();
          if (item === "icon-registry") return IconRegistryPage();
          if (item === "button") return ButtonPage();
          if (item === "link-button") return LinkButtonPage();
          if (item === "sidebar") return SidebarPage();
          if (item === "menu") return MenuPage();
          if (item === "picker") return PickerPage();
          if (item === "outline") return OutlinePage();
          if (item === "media-display") return MediaPage();
          if (item === "icon") return IconPage();
          if (item === "spinner") return SpinnerPage();
          if (item === "avatar") return AvatarPage();
          if (item === "text-input") return TextInputPage();
          if (item === "text-area") return TextAreaPage();
          if (item === "select") return SelectPage();
          if (item === "checkbox") return CheckBoxPage();
          if (item === "switch") return SwitchPage();
          if (item === "segmented-picker") return SegmentedPickerPage();
          if (item === "slider") return SliderPage();
          if (item === "table") return TablePage();
          if (item === "dialog") return DialogPage();
          if (item === "progress") return ProgressPage();
        }),
      ),
    ),
  );
}
