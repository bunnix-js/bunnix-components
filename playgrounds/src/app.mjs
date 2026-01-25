import Bunnix, { useState, Show } from "@bunnix/core";
import Sidebar from "./components/Sidebar.mjs";
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
import StacksPage from "./pages/components/Stacks.mjs";

const { div, h1 } = Bunnix;

export default function App() {
  const initialPage = window.location.hash.replace('#', '') || 'home';
  const page = useState(initialPage);

  const sidebarItems = [
    { id: 'typography', label: 'Typography', icon: 'icon-text' },
    { id: 'colors', label: 'Colors', icon: 'icon-palette' },
    { id: 'layout', label: 'Layout', icon: 'icon-columns-layout' },
    { id: 'media', label: 'Media', icon: 'icon-image' },
    { isHeader: true, label: 'HTML Controls' },
    { id: 'tables', label: 'Tables', icon: 'icon-table' },
    { id: 'controls', label: 'Controls', icon: 'icon-sliders' },
    { id: 'buttons', label: 'Buttons', icon: 'icon-button' },
    { id: 'links', label: 'Links', icon: 'icon-link' },
    { isHeader: true, label: 'Rich Components' },
    { 
      id: 'rich-components', 
      label: 'Components', 
      icon: 'icon-cube',
      isExpanded: true,
      children: [
        { id: 'components-popover', label: 'Popover Menu', icon: 'icon-more-horizontal' },
        { id: 'components-dropdown', label: 'Dropdown Menu', icon: 'icon-chevron-down' },
        { id: 'components-switch', label: 'Switch', icon: 'icon-toggle' },
        { id: 'components-input', label: 'Input Field', icon: 'icon-pencil' },
        { id: 'components-button', label: 'Button', icon: 'icon-button' },
        { id: 'components-icon', label: 'Icon', icon: 'icon-star' },
        { id: 'components-text', label: 'Text', icon: 'icon-text' },
        { id: 'components-stacks', label: 'Stacks', icon: 'icon-columns-layout' },
        { id: 'components-accordion', label: 'Accordion Group', icon: 'icon-sections' },
        { id: 'components-datepicker', label: 'Date Picker', icon: 'icon-calendar' },
        { id: 'components-timepicker', label: 'Time Picker', icon: 'icon-clock' },
      ]
    },
  ];

  const handleSidebarSelect = (id) => {
    page.set(id);
  };

  return div({ class: "main-container row-container" }, [
    Sidebar({ 
      items: sidebarItems,
      selection: initialPage, 
      onSelect: handleSidebarSelect 
    }),
    div({ class: "main-content" }, [
      Show(page.map(v => v === 'typography'), TypographyPage()),
      Show(page.map(v => v === 'colors'), ColorsPage()),
      Show(page.map(v => v === 'links'), LinksPage()),
      Show(page.map(v => v === 'media'), MediaPage()),
      Show(page.map(v => v === 'layout'), LayoutPage()),
      Show(page.map(v => v === 'buttons'), ButtonsPage()),
      Show(page.map(v => v === 'tables'), TablesPage()),
      Show(page.map(v => v === 'controls'), ControlsPage()),
      
      // Sub-component Routes
      Show(page.map(v => v === 'components-popover'), PopoverPage()),
      Show(page.map(v => v === 'components-dropdown'), DropdownPage()),
      Show(page.map(v => v === 'components-switch'), SwitchPage()),
      Show(page.map(v => v === 'components-input'), InputFieldPage()),
      Show(page.map(v => v === 'components-button'), ButtonPage()),
      Show(page.map(v => v === 'components-icon'), IconPage()),
      Show(page.map(v => v === 'components-text'), TextPage()),
      Show(page.map(v => v === 'components-stacks'), StacksPage()),
      Show(page.map(v => v === 'components-accordion'), AccordionPage()),
      Show(page.map(v => v === 'components-datepicker'), DatePickerPage()),
      Show(page.map(v => v === 'components-timepicker'), TimePickerPage()),

      Show(page.map(v => v === 'home'), div({ style: "padding: 2rem;" }, [
        h1("Welcome to the Design System Showcase"),
        div("Select an item from the sidebar to view components."),
      ]))
    ]),
  ]);
}
