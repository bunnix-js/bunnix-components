import Bunnix, { useState } from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Sidebar } from "../../../src/core/sidebar.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

const { div } = Bunnix;

export function SidebarPage() {
  // Example 1: Basic sidebar
  const basicSelection = useState("dashboard");
  const basicItems = [
    { key: "dashboard", text: "Dashboard", icon: "house" },
    { key: "settings", text: "Settings", icon: "gear" },
    { key: "profile", text: "Profile", icon: "person" },
  ];

  // Example 2: Sidebar with headers
  const groupedSelection = useState("overview");
  const groupedItems = [
    { key: "header-main", text: "Main", isHeader: true },
    { key: "overview", text: "Overview", icon: "house" },
    { key: "analytics", text: "Analytics", icon: "chart_bar" },
    { key: "header-settings", text: "Settings", isHeader: true },
    { key: "account", text: "Account", icon: "person" },
    { key: "preferences", text: "Preferences", icon: "gear" },
  ];

  // Example 3: Nested sidebar
  const nestedSelection = useState("components");
  const nestedItems = [
    { key: "home", text: "Home", icon: "house" },
    { key: "header-components", text: "Components", isHeader: true },
    {
      key: "components",
      text: "Components",
      icon: "rectangle_grid_1x2",
      children: [
        { key: "buttons", text: "Buttons" },
        {
          key: "forms",
          text: "Forms",
          children: [
            { key: "inputs", text: "Inputs" },
            { key: "dialog", text: "Dialog" },
          ],
        },
      ],
    },
    { key: "settings", text: "Settings", icon: "gear" },
  ];

  // Example 4: Full navigation sidebar
  const navSelection = useState("projects");
  const navItems = [
    { key: "header-workspace", text: "Workspace", isHeader: true },
    { key: "projects", text: "Projects", icon: "folder" },
    { key: "tasks", text: "Tasks", icon: "checkmark_rectangle" },
    { key: "team", text: "Team", icon: "person_2" },
    { key: "header-tools", text: "Tools", isHeader: true },
    { key: "calendar", text: "Calendar", icon: "calendar" },
    { key: "documents", text: "Documents", icon: "doc_text" },
    { key: "messages", text: "Messages", icon: "chat_bubble_2" },
    { key: "header-admin", text: "Admin", isHeader: true },
    { key: "settings", text: "Settings", icon: "gear" },
    { key: "logout", text: "Logout", icon: "arrow_right_square" },
  ];

  return Column(
    Heading({ h2: true }, "Sidebar Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Navigation sidebar with state binding and section headers",
    ),
    Spacer({ minHeight: 24 }),

    // Basic Sidebar
    ComponentShowcase(
      {
        code: `
        import { Sidebar } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const selection = useState("dashboard");
        const items = [
          { key: "dashboard", text: "Dashboard", icon: "house" },
          { key: "settings", text: "Settings", icon: "gear" },
          { key: "profile", text: "Profile", icon: "person" },
        ];

        Sidebar({ items, selection });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Basic Sidebar"),
      Text("Simple sidebar with icon items and reactive state binding."),
      Spacer({ minHeight: 8 }),
      div(
        {
          style: {
            border: "1px solid var(--color-border-primary)",
            borderRadius: "8px",
            width: "240px",
            overflow: "hidden",
          },
        },
        Sidebar({ items: basicItems, selection: basicSelection }),
      ),
      Spacer({ minHeight: 8 }),
      Text(
        { color: "secondary", textSize: "0.875rem" },
        "Selected: ",
        Text({ weight: "heavy" }, basicSelection.get()),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Sidebar with Headers
    ComponentShowcase(
      {
        code: `
        import { Sidebar } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const selection = useState("overview");
        const items = [
          { key: "header-main", text: "Main", isHeader: true },
          { key: "overview", text: "Overview", icon: "house" },
          { key: "analytics", text: "Analytics", icon: "chart_bar" },
          { key: "header-settings", text: "Settings", isHeader: true },
          { key: "account", text: "Account", icon: "person" },
          { key: "preferences", text: "Preferences", icon: "gear" },
        ];

        Sidebar({ items, selection });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Sidebar with Headers"),
      Text("Sidebar with section headers for organizing navigation items."),
      Spacer({ minHeight: 8 }),
      div(
        {
          style: {
            border: "1px solid var(--color-border-primary)",
            borderRadius: "8px",
            width: "240px",
            overflow: "hidden",
          },
        },
        Sidebar({ items: groupedItems, selection: groupedSelection }),
      ),
      Spacer({ minHeight: 8 }),
      Text(
        { color: "secondary", textSize: "0.875rem" },
        "Selected: ",
        Text({ weight: "heavy" }, groupedSelection.get()),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Nested Sidebar
    ComponentShowcase(
      {
        code: `
        import { Sidebar } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const selection = useState("components");
        const items = [
          { key: "home", text: "Home", icon: "house" },
          { key: "header-components", text: "Components", isHeader: true },
          {
            key: "components",
            text: "Components",
            icon: "rectangle_grid_1x2",
            children: [
              { key: "buttons", text: "Buttons" },
              {
                key: "forms",
                text: "Forms",
                children: [
                  { key: "inputs", text: "Inputs" },
                  { key: "dialog", text: "Dialog" },
                ],
              },
            ],
          },
          { key: "settings", text: "Settings", icon: "gear" },
        ];

        Sidebar({ items, selection });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Nested Sidebar"),
      Text("Parent items stay selectable while expanding or collapsing their nested children. Nested groups start collapsed unless their own key is selected, and only root-level items render leading icons."),
      Spacer({ minHeight: 8 }),
      div(
        {
          style: {
            border: "1px solid var(--color-border-primary)",
            borderRadius: "8px",
            width: "260px",
            overflow: "hidden",
          },
        },
        Sidebar({ items: nestedItems, selection: nestedSelection }),
      ),
      Spacer({ minHeight: 8 }),
      Text(
        { color: "secondary", textSize: "0.875rem" },
        "Selected: ",
        nestedSelection.map((value) => Text({ weight: "heavy" }, value)),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Full Navigation Sidebar
    ComponentShowcase(
      {
        code: `
        import { Sidebar } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const selection = useState("projects");
        const items = [
          { key: "header-workspace", text: "Workspace", isHeader: true },
          { key: "projects", text: "Projects", icon: "folder" },
          { key: "tasks", text: "Tasks", icon: "checkmark_rectangle" },
          { key: "team", text: "Team", icon: "person_2" },
          { key: "header-tools", text: "Tools", isHeader: true },
          { key: "calendar", text: "Calendar", icon: "calendar" },
          { key: "documents", text: "Documents", icon: "doc_text" },
          { key: "messages", text: "Messages", icon: "chat_bubble_2" },
          { key: "header-admin", text: "Admin", isHeader: true },
          { key: "settings", text: "Settings", icon: "gear" },
          { key: "logout", text: "Logout", icon: "arrow_right_square" },
        ];

        Sidebar({ items, selection });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Full Navigation"),
      Text("Complete navigation sidebar with multiple sections."),
      Spacer({ minHeight: 8 }),
      div(
        {
          style: {
            border: "1px solid var(--color-border-primary)",
            borderRadius: "8px",
            width: "240px",
            overflow: "hidden",
          },
        },
        Sidebar({ items: navItems, selection: navSelection }),
      ),
      Spacer({ minHeight: 8 }),
      Text(
        { color: "secondary", textSize: "0.875rem" },
        "Selected: ",
        Text({ weight: "heavy" }, navSelection.get()),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Features
    ComponentShowcase(
      {
        code: `
        // Item Structure
        {
          key: "unique-key",       // Required: unique identifier
          text: "Display Text",    // Required: text to display
          icon: "framework7_icon", // Optional: official Framework7 icon name
          isHeader: false          // Optional: renders as header if true
        }

        // State Binding
        // Auto-resolves useState objects or raw values
        const items = useState([...]); // or just [...]
        const selection = useState("key"); // or just "key"

        Sidebar({ items, selection });

        // Selection state updates automatically on click
        selection.get(); // Get current selection
        selection.set("new-key"); // Programmatically change selection
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Features"),
      Text("Key features of the Sidebar component:"),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text(
          Text({ weight: "heavy" }, "• Reactive State:"),
          " Automatically syncs with useState objects",
        ),
        Text(
          Text({ weight: "heavy" }, "• Section Headers:"),
          " Organize items with isHeader: true",
        ),
        Text(
          Text({ weight: "heavy" }, "• Icon Support:"),
          " Optional Framework7 icon names on root-level items",
        ),
        Text(
          Text({ weight: "heavy" }, "• Nested Groups:"),
          " Parent items can expand recursive child navigation, and only root nested items render icons",
        ),
        Text(
          Text({ weight: "heavy" }, "• Visual Feedback:"),
          " Selected item uses primary variant",
        ),
        Text(
          Text({ weight: "heavy" }, "• Flexible Props:"),
          " Supports all standard layout props (padding, bg, etc.)",
        ),
      ),
    ),
  );
}
