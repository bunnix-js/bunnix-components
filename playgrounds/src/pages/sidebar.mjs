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
    { key: "dashboard", text: "Dashboard", icon: "home" },
    { key: "settings", text: "Settings", icon: "settings" },
    { key: "profile", text: "Profile", icon: "user" },
  ];

  // Example 2: Sidebar with headers
  const groupedSelection = useState("overview");
  const groupedItems = [
    { key: "header-main", text: "Main", isHeader: true },
    { key: "overview", text: "Overview", icon: "home" },
    { key: "analytics", text: "Analytics", icon: "bar-chart" },
    { key: "header-settings", text: "Settings", isHeader: true },
    { key: "account", text: "Account", icon: "user" },
    { key: "preferences", text: "Preferences", icon: "settings" },
  ];

  // Example 3: Nested sidebar
  const nestedSelection = useState("components");
  const nestedItems = [
    { key: "home", text: "Home", icon: "home" },
    { key: "header-components", text: "Components", isHeader: true },
    {
      key: "components",
      text: "Components",
      icon: "columns-layout",
      expanded: true,
      children: [
        { key: "buttons", text: "Buttons", icon: "button" },
        {
          key: "forms",
          text: "Forms",
          icon: "square-pencil",
          children: [
            { key: "inputs", text: "Inputs", icon: "square-pencil" },
            { key: "dialog", text: "Dialog", icon: "hand" },
          ],
        },
      ],
    },
    { key: "settings", text: "Settings", icon: "settings" },
  ];

  // Example 4: Full navigation sidebar
  const navSelection = useState("projects");
  const navItems = [
    { key: "header-workspace", text: "Workspace", isHeader: true },
    { key: "projects", text: "Projects", icon: "folder" },
    { key: "tasks", text: "Tasks", icon: "check-square" },
    { key: "team", text: "Team", icon: "users" },
    { key: "header-tools", text: "Tools", isHeader: true },
    { key: "calendar", text: "Calendar", icon: "calendar" },
    { key: "documents", text: "Documents", icon: "file-text" },
    { key: "messages", text: "Messages", icon: "message-square" },
    { key: "header-admin", text: "Admin", isHeader: true },
    { key: "settings", text: "Settings", icon: "settings" },
    { key: "logout", text: "Logout", icon: "log-out" },
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
          { key: "dashboard", text: "Dashboard", icon: "home" },
          { key: "settings", text: "Settings", icon: "settings" },
          { key: "profile", text: "Profile", icon: "user" },
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
          { key: "overview", text: "Overview", icon: "home" },
          { key: "analytics", text: "Analytics", icon: "bar-chart" },
          { key: "header-settings", text: "Settings", isHeader: true },
          { key: "account", text: "Account", icon: "user" },
          { key: "preferences", text: "Preferences", icon: "settings" },
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
          { key: "home", text: "Home", icon: "home" },
          { key: "header-components", text: "Components", isHeader: true },
          {
            key: "components",
            text: "Components",
            icon: "columns-layout",
            expanded: true,
            children: [
              { key: "buttons", text: "Buttons", icon: "button" },
              {
                key: "forms",
                text: "Forms",
                icon: "square-pencil",
                children: [
                  { key: "inputs", text: "Inputs", icon: "square-pencil" },
                  { key: "dialog", text: "Dialog", icon: "hand" },
                ],
              },
            ],
          },
          { key: "settings", text: "Settings", icon: "settings" },
        ];

        Sidebar({ items, selection });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Nested Sidebar"),
      Text("Parent items stay selectable while expanding or collapsing their nested children."),
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
          { key: "tasks", text: "Tasks", icon: "check-square" },
          { key: "team", text: "Team", icon: "users" },
          { key: "header-tools", text: "Tools", isHeader: true },
          { key: "calendar", text: "Calendar", icon: "calendar" },
          { key: "documents", text: "Documents", icon: "file-text" },
          { key: "messages", text: "Messages", icon: "message-square" },
          { key: "header-admin", text: "Admin", isHeader: true },
          { key: "settings", text: "Settings", icon: "settings" },
          { key: "logout", text: "Logout", icon: "log-out" },
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
          icon: "icon-name",       // Optional: icon name from registry
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
          " Optional icons from the icon registry",
        ),
        Text(
          Text({ weight: "heavy" }, "• Nested Groups:"),
          " Parent items can expand recursive child navigation",
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
