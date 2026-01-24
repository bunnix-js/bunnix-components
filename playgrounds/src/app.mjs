import Bunnix, { useState, Show } from "@bunnix/core";
import Sidebar from "./components/Sidebar.mjs";
import TypographyPage from "./pages/Typography.mjs";
import ColorsPage from "./pages/Colors.mjs";
import LinksPage from "./pages/Links.mjs";
import MediaPage from "./pages/Media.mjs";
import LayoutPage from "./pages/Layout.mjs";
import ButtonsPage from "./pages/Buttons.mjs";
import TablesPage from "./pages/Tables.mjs";
import ComponentsPage from "./pages/Components.mjs";
import ControlsPage from "./pages/Controls.mjs";

const { div, h1 } = Bunnix;

export default function App() {
  const initialPage = window.location.hash.replace('#', '') || 'home';
  const page = useState(initialPage);

  const handleSidebarSelect = (id) => {
    page.set(id);
  };

  return div({ class: "main-container row-container" }, [
    Sidebar({ selection: initialPage, onSelect: handleSidebarSelect }),
    div({ class: "main-content" }, [
      Show(page.map(v => v === 'typography'), TypographyPage()),
      Show(page.map(v => v === 'colors'), ColorsPage()),
      Show(page.map(v => v === 'links'), LinksPage()),
      Show(page.map(v => v === 'media'), MediaPage()),
      Show(page.map(v => v === 'layout'), LayoutPage()),
      Show(page.map(v => v === 'buttons'), ButtonsPage()),
      Show(page.map(v => v === 'tables'), TablesPage()),
      Show(page.map(v => v === 'components'), ComponentsPage()),
      Show(page.map(v => v === 'controls'), ControlsPage()),
      Show(page.map(v => v === 'home'), div({ style: "padding: 2rem;" }, [
        h1("Welcome to the Design System Showcase"),
        div("Select an item from the sidebar to view components."),
      ]))
    ]),
  ]);
}