import Bunnix, { useState } from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Sidebar2 } from "../../../src/core/sidebar.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

const { div } = Bunnix;

export function SidebarPage() {
  // Example 1: Basic sidebar
  const basicSelected = useState("dashboard");
  const basicItems = [
    { key: "dashboard", text: "Dashboard", icon: "home" },
    { key: "settings", text: "Settings", icon: "settings" },
    { key: "profile", text: "Profile", icon: "user" },
  ];

  // Example 2: Sidebar with headers
  const groupedSelected = useState("overview");
  const groupedItems = [
    { key: "header-main", text: "Main", isHeader: true },
    { key: "overview", text: "Overview", icon: "home" },
    { key: "analytics", text: "Analytics", icon: "bar-chart" },
    { key: "header-settings", text: "Settings", isHeader: true },
    { key: "account", text: "Account", icon: "user" },
    { key: "preferences", text: "Preferences", icon: "settings" },
  ];

  // Example 3: Full navigation sidebar
  const navSelected = useState("projects");
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
        import { Sidebar2 } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const selected = useState("dashboard");
        const items = [
          { key: "dashboard", text: "Dashboard", icon: "home" },
          { key: "settings", text: "Settings", icon: "settings" },
          { key: "profile", text: "Profile", icon: "user" },
        ];

        Sidebar2({ items, selected });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Basic Sidebar"),
      Text2("Simple sidebar with icon items and reactive state binding."),
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
        Sidebar2({ items: basicItems, selected: basicSelected }),
      ),
      Spacer({ minHeight: 8 }),
      Text2(
        { color: "secondary", textSize: "0.875rem" },
        "Selected: ",
        Text2({ weight: "heavy" }, basicSelected.get()),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Sidebar with Headers
    ComponentShowcase(
      {
        code: `
        import { Sidebar2 } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const selected = useState("overview");
        const items = [
          { key: "header-main", text: "Main", isHeader: true },
          { key: "overview", text: "Overview", icon: "home" },
          { key: "analytics", text: "Analytics", icon: "bar-chart" },
          { key: "header-settings", text: "Settings", isHeader: true },
          { key: "account", text: "Account", icon: "user" },
          { key: "preferences", text: "Preferences", icon: "settings" },
        ];

        Sidebar2({ items, selected });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Sidebar with Headers"),
      Text2("Sidebar with section headers for organizing navigation items."),
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
        Sidebar2({ items: groupedItems, selected: groupedSelected }),
      ),
      Spacer({ minHeight: 8 }),
      Text2(
        { color: "secondary", textSize: "0.875rem" },
        "Selected: ",
        Text2({ weight: "heavy" }, groupedSelected.get()),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Full Navigation Sidebar
    ComponentShowcase(
      {
        code: `
        import { Sidebar2 } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const selected = useState("projects");
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

        Sidebar2({ items, selected });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Full Navigation"),
      Text2("Complete navigation sidebar with multiple sections."),
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
        Sidebar2({ items: navItems, selected: navSelected }),
      ),
      Spacer({ minHeight: 8 }),
      Text2(
        { color: "secondary", textSize: "0.875rem" },
        "Selected: ",
        Text2({ weight: "heavy" }, navSelected.get()),
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
        const selected = useState("key"); // or just "key"

        Sidebar2({ items, selected });

        // Selected state updates automatically on click
        selected.get(); // Get current selection
        selected.set("new-key"); // Programmatically change selection
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Features"),
      Text2("Key features of the Sidebar2 component:"),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text2(
          Text2({ weight: "heavy" }, "• Reactive State:"),
          " Automatically syncs with useState objects",
        ),
        Text2(
          Text2({ weight: "heavy" }, "• Section Headers:"),
          " Organize items with isHeader: true",
        ),
        Text2(
          Text2({ weight: "heavy" }, "• Icon Support:"),
          " Optional icons from the icon registry",
        ),
        Text2(
          Text2({ weight: "heavy" }, "• Visual Feedback:"),
          " Selected item uses primary variant",
        ),
        Text2(
          Text2({ weight: "heavy" }, "• Flexible Props:"),
          " Supports all standard layout props (padding, bg, etc.)",
        ),
      ),
    ),
  );
}
