import Bunnix, { useState, Show } from "@bunnix/core";
import { Sidebar } from "@bunnix/components";
import TypographyPage from "./pages/Typography.mjs";
import ColorsPage from "./pages/Colors.mjs";
import LinksPage from "./pages/Links.mjs";
import MediaPage from "./pages/Media.mjs";
import LayoutPage from "./pages/Layout.mjs";
import ButtonsPage from "./pages/Buttons.mjs";
import TablesPage from "./pages/Tables.mjs";
import ControlsPage from "./pages/Controls.mjs";

// Sub-component Pages
import PopoverPage from "./pages/components/Popover.mjs";
import DropdownPage from "./pages/components/Dropdown.mjs";
import SwitchPage from "./pages/components/Switch.mjs";
import AccordionPage from "./pages/components/Accordion.mjs";
import DatePickerPage from "./pages/components/DatePicker.mjs";
import TimePickerPage from "./pages/components/TimePicker.mjs";
import InputFieldPage from "./pages/components/InputField.mjs";
import ButtonPage from "./pages/components/Button.mjs";
import IconPage from "./pages/components/Icon.mjs";
import TextPage from "./pages/components/Text.mjs";
import SearchBoxPage from "./pages/components/SearchBox.mjs";
import BadgePage from "./pages/components/Badge.mjs";
import StacksPage from "./pages/components/Stacks.mjs";
import GridPage from "./pages/components/Grid.mjs";
import TablesComponentPage from "./pages/components/Tables.mjs";
import CheckboxPage from "./pages/components/Checkbox.mjs";
import ComboBoxPage from "./pages/components/ComboBox.mjs";
import ToastPage from "./pages/components/Toast.mjs";
import DialogPage from "./pages/components/Dialog.mjs";
import CodeBlockPage from "./pages/components/CodeBlock.mjs";
import CardPage from "./pages/components/Card.mjs";
import { ToastNotification } from "@bunnix/components";
import { Dialog, showDialog } from "@bunnix/components";
import { HStack } from "@bunnix/components";
import { Button } from "@bunnix/components";
import { Icon } from "@bunnix/components";
import { Container } from "@bunnix/components";
import { NavigationBar } from "@bunnix/components";

import BunnixLogo from "./images/bunnix-transparent-regular.png";

const { div, h1, h2, img } = Bunnix;

export default function App() {
  const initialPage = window.location.hash.replace("#", "") || "home";
  const page = useState(initialPage);

  const sidebarItems = [
    { id: "typography", label: "Typography", icon: "icon-text" },
    { id: "colors", label: "Colors", icon: "icon-palette" },
    { id: "layout", label: "Layout", icon: "icon-columns-layout" },
    { id: "media", label: "Media", icon: "icon-image" },
    { isHeader: true, label: "HTML Controls" },
    { id: "tables", label: "Tables", icon: "icon-table" },
    { id: "controls", label: "Controls", icon: "icon-sliders" },
    { id: "buttons", label: "Buttons", icon: "icon-button" },
    { id: "links", label: "Links", icon: "icon-link" },
    { isHeader: true, label: "Rich Components" },
    {
      id: "rich-components",
      label: "Components",
      icon: "icon-cube",
      isExpanded: true,
      children: [
        { id: "components-text", label: "Text", icon: "icon-text" },
        { id: "components-icon", label: "Icon", icon: "icon-star" },
        { id: "components-button", label: "Button", icon: "icon-button" },
        { id: "components-card", label: "Card", icon: "icon-window" },
        { id: "components-badge", label: "Badge", icon: "icon-tag", badge: { value: "New", tone: "dimmed", variant: "solid" } },
        { id: "components-searchbox", label: "Search Box", icon: "icon-search" },
        { id: "components-checkbox", label: "Check Box", icon: "icon-check" },
        { id: "components-input", label: "Input Field", icon: "icon-pencil" },
        {
          id: "components-combobox",
          label: "Combo Box",
          icon: "icon-chevron-down",
        },
        { id: "components-switch", label: "Switch", icon: "icon-toggle" },
        {
          id: "components-popover",
          label: "Popover Menu",
          icon: "icon-more-horizontal",
        },
        {
          id: "components-dropdown",
          label: "Dropdown Menu",
          icon: "icon-chevron-down",
        },
        { id: "components-grid", label: "Grid", icon: "icon-grid" },
        { id: "components-table", label: "Table", icon: "icon-table" },
        { id: "components-codeblock", label: "Code Block", icon: "icon-terminal" },
        {
          id: "components-stacks",
          label: "Stacks",
          icon: "icon-columns-layout",
        },
        {
          id: "components-accordion",
          label: "Accordion Group",
          icon: "icon-sections",
        },
        {
          id: "components-datepicker",
          label: "Date Picker",
          icon: "icon-calendar",
        },
        {
          id: "components-timepicker",
          label: "Time Picker",
          icon: "icon-clock",
        },
        { id: "components-toast", label: "Toast", icon: "icon-bell" },
        { id: "components-dialog", label: "Dialog", icon: "icon-window" },
      ],
    },
  ];

  const handleSidebarSelect = (id) => {
    page.set(id);
  };

  return Container({ type: "main", direction: "horizontal" }, [
    Sidebar({
      items: sidebarItems,
      selection: initialPage,
      onSelect: handleSidebarSelect,
      searchable: true
    }),
    Container({ type: "content", direction: "vertical" }, [
      // Navigation component
      NavigationBar({
        title: () =>
          HStack({ alignment: "middle", gap: "small", class: "items-center" }, [
            img({ src: BunnixLogo, alt: "Bunnix Logo", class: "w-40 h-40" }),
            h2({ class: "whitespace-nowrap" }, "Bunnix Components"),
          ]),
        trailing: () => [
          Button({ type: "button", variant: "flat", click: () => handleSidebarSelect("home") }, [
            Icon({ name: "icon-home", class: "icon-secondary" }),
          ]),
          Button(
            {
              type: "button",
              variant: "flat",
              click: () =>
                showDialog({
                  title: "Bunnix Components Showcase",
                  message: [
                    "Welcome to the Bunnix Components Showcase!",
                    "",
                    "Explore a wide range of UI components designed to enhance your web applications.",
                    "Feel free to explore and use them in your projects."
                  ].join("\n"),
                }),
            },
            [Icon({ name: "icon-question-circle", class: "icon-secondary" })],
          ),
        ],
        searchable: false,
      }),
      div([
        Show(
          page.map((v) => v === "typography"),
          () => TypographyPage(),
        ),
        Show(
          page.map((v) => v === "colors"),
          () => ColorsPage(),
        ),
        Show(
          page.map((v) => v === "links"),
          () => LinksPage(),
        ),
        Show(
          page.map((v) => v === "media"),
          () => MediaPage(),
        ),
        Show(
          page.map((v) => v === "layout"),
          () => LayoutPage(),
        ),
        Show(
          page.map((v) => v === "buttons"),
          () => ButtonsPage(),
        ),
        Show(
          page.map((v) => v === "tables"),
          () => TablesPage(),
        ),
        Show(
          page.map((v) => v === "controls"),
          () => ControlsPage(),
        ),

        // Sub-component Routes
        Show(
          page.map((v) => v === "components-popover"),
          () => PopoverPage(),
        ),
        Show(
          page.map((v) => v === "components-dropdown"),
          () => DropdownPage(),
        ),
        Show(
          page.map((v) => v === "components-switch"),
          () => SwitchPage(),
        ),
        Show(
          page.map((v) => v === "components-input"),
          () => InputFieldPage(),
        ),
        Show(
          page.map((v) => v === "components-checkbox"),
          () => CheckboxPage(),
        ),
        Show(
          page.map((v) => v === "components-combobox"),
          () => ComboBoxPage(),
        ),
        Show(
          page.map((v) => v === "components-toast"),
          () => ToastPage(),
        ),
        Show(
          page.map((v) => v === "components-button"),
          () => ButtonPage(),
        ),
        Show(
          page.map((v) => v === "components-card"),
          () => CardPage(),
        ),
        Show(
          page.map((v) => v === "components-icon"),
          () => IconPage(),
        ),
        Show(
          page.map((v) => v === "components-text"),
          () => TextPage(),
        ),
        Show(
          page.map((v) => v === "components-searchbox"),
          () => SearchBoxPage(),
        ),
        Show(
          page.map((v) => v === "components-badge"),
          () => BadgePage(),
        ),
        Show(
          page.map((v) => v === "components-stacks"),
          () => StacksPage(),
        ),
        Show(
          page.map((v) => v === "components-grid"),
          () => GridPage(),
        ),
        Show(
          page.map((v) => v === "components-table"),
          () => TablesComponentPage(),
        ),
        Show(
          page.map((v) => v === "components-accordion"),
          () => AccordionPage(),
        ),
        Show(
          page.map((v) => v === "components-datepicker"),
          () => DatePickerPage(),
        ),
        Show(
          page.map((v) => v === "components-timepicker"),
          () => TimePickerPage(),
        ),
        Show(
          page.map((v) => v === "components-dialog"),
          () => DialogPage(),
        ),
        Show(
          page.map((v) => v === "components-codeblock"),
          () => CodeBlockPage(),
        ),

        Show(
          page.map((v) => v === "home"),
          () =>
            div({ style: "padding: 2rem;" }, [
              h1("Welcome to the Design System Showcase"),
              div("Select an item from the sidebar to view components."),
            ]),
        ),
      ]),
    ]),
    ToastNotification(),
    Dialog(),
  ]);
}
