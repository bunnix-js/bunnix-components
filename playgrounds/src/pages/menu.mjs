import Bunnix, { useState } from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Menu } from "../../../src/core/menu.mjs";
import { Button2 } from "../../../src/core/buttons.mjs";
import { Icon2, Avatar } from "../../../src/core/media.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function MenuPage() {
  // Example 1: Basic dropdown
  const basicItems = [
    { key: "option1", text: "Option 1", action: () => console.log("Option 1 clicked") },
    { key: "option2", text: "Option 2", action: () => console.log("Option 2 clicked") },
    { key: "option3", text: "Option 3", action: () => console.log("Option 3 clicked") },
  ];

  // Example 2: Dropdown with icons
  const iconItems = [
    { key: "edit", text: "Edit", icon: "edit", action: () => console.log("Edit clicked") },
    { key: "copy", text: "Copy", icon: "copy", action: () => console.log("Copy clicked") },
    { key: "delete", text: "Delete", icon: "trash", action: () => console.log("Delete clicked") },
  ];

  // Example 3: Dropdown with dividers
  const groupedItems = [
    { key: "new", text: "New File", icon: "file", action: () => console.log("New File") },
    { key: "open", text: "Open", icon: "folder", action: () => console.log("Open") },
    { divider: true },
    { key: "save", text: "Save", icon: "check", action: () => console.log("Save") },
    { key: "export", text: "Export", icon: "download", action: () => console.log("Export") },
    { divider: true },
    { key: "settings", text: "Settings", icon: "settings", action: () => console.log("Settings") },
  ];

  // Example 4: Custom trigger
  const customItems = [
    { key: "home", text: "Home", icon: "home", action: () => console.log("Home") },
    { key: "profile", text: "Profile", icon: "user", action: () => console.log("Profile") },
    { key: "settings", text: "Settings", icon: "settings", action: () => console.log("Settings") },
    { divider: true },
    { key: "logout", text: "Logout", icon: "log-out", action: () => console.log("Logout") },
  ];

  // Example 5: With actions
  const actionItems = [
    { key: "refresh", text: "Refresh", icon: "refresh-cw", action: () => console.log("Refresh clicked") },
    { key: "download", text: "Download", icon: "download", action: () => console.log("Download clicked") },
    { divider: true },
    { key: "share", text: "Share", icon: "share", action: () => console.log("Share clicked") },
  ];

  return Column(
    Heading({ h2: true }, "Menu Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Action menu with items, icons, and dividers",
    ),
    Spacer({ minHeight: 24 }),

    // Basic Menu
    ComponentShowcase(
      {
        code: `
        import { Menu } from "@bunnix/components";

        const items = [
          { key: "option1", text: "Option 1", action: () => console.log("Option 1") },
          { key: "option2", text: "Option 2", action: () => console.log("Option 2") },
          { key: "option3", text: "Option 3", action: () => console.log("Option 3") },
        ];

        Menu({
          items,
          trigger: "Options"
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Basic Menu"),
      Text2("Simple menu with text items and actions."),
      Spacer({ minHeight: 8 }),
      Menu({
        items: basicItems,
        trigger: "Options",
      }),
    ),

    Spacer({ minHeight: 16 }),

    // Menu with Icons
    ComponentShowcase(
      {
        code: `
        import { Menu } from "@bunnix/components";

        const items = [
          { key: "edit", text: "Edit", icon: "edit", action: () => console.log("Edit") },
          { key: "copy", text: "Copy", icon: "copy", action: () => console.log("Copy") },
          { key: "delete", text: "Delete", icon: "trash", action: () => console.log("Delete") },
        ];

        Menu({ items, trigger: "Actions" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "With Icons"),
      Text2("Menu items with icons from the icon registry."),
      Spacer({ minHeight: 8 }),
      Menu({
        items: iconItems,
        trigger: "Actions",
      }),
    ),

    Spacer({ minHeight: 16 }),

    // Menu with Dividers
    ComponentShowcase(
      {
        code: `
        import { Menu } from "@bunnix/components";

        const items = [
          { key: "new", text: "New File", icon: "file", action: () => console.log("New") },
          { key: "open", text: "Open", icon: "folder", action: () => console.log("Open") },
          { divider: true },
          { key: "save", text: "Save", icon: "check", action: () => console.log("Save") },
          { key: "export", text: "Export", icon: "download", action: () => console.log("Export") },
          { divider: true },
          { key: "settings", text: "Settings", icon: "settings", action: () => console.log("Settings") },
        ];

        Menu({ items, trigger: "File" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "With Dividers"),
      Text2("Use dividers to group related items."),
      Spacer({ minHeight: 8 }),
      Menu({
        items: groupedItems,
        trigger: "File",
      }),
    ),

    Spacer({ minHeight: 16 }),

    // Custom Trigger with Avatar
    ComponentShowcase(
      {
        code: `
        import { Menu } from "@bunnix/components";
        import { Avatar } from "@bunnix/components";

        const items = [
          { key: "profile", text: "Profile", icon: "user", action: () => console.log("Profile") },
          { key: "settings", text: "Settings", icon: "settings", action: () => console.log("Settings") },
          { divider: true },
          { key: "logout", text: "Logout", icon: "log-out", action: () => console.log("Logout") },
        ];

        Menu({
          items,
          trigger: ({ toggle }) => Avatar({
            src: "https://i.pravatar.cc/50",
            size: 32,
            click: toggle,
            style: { cursor: "pointer" }
          })
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Custom Trigger with Avatar"),
      Text2("Use an Avatar component as the menu trigger."),
      Spacer({ minHeight: 8 }),
      Menu({
        items: customItems,
        trigger: ({ toggle }) =>
          Avatar({
            src: "https://i.pravatar.cc/50",
            size: 32,
            click: toggle,
            style: { cursor: "pointer" }
          }),
      }),
    ),

    Spacer({ minHeight: 16 }),

    // With Actions
    ComponentShowcase(
      {
        code: `
        import { Menu } from "@bunnix/components";

        const items = [
          { 
            key: "refresh", 
            text: "Refresh", 
            icon: "refresh-cw",
            action: () => console.log("Refresh") 
          },
          { 
            key: "download", 
            text: "Download", 
            icon: "download",
            action: () => console.log("Download")
          },
          { divider: true },
          { 
            key: "share", 
            text: "Share", 
            icon: "share",
            action: () => console.log("Share")
          },
        ];

        Menu({ items, trigger: "More" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "With Actions"),
      Text2("Menu items trigger custom actions on click."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Menu({
          items: actionItems,
          trigger: "More",
        }),
        Text2(
          { color: "secondary", textSize: "0.875rem" },
          "(Check console for action logs)",
        ),
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
          icon: "icon-name",       // Optional: icon from registry
          action: () => {},        // Optional: function to call on click
          divider: false           // Optional: renders divider if true
        }

        // Trigger Options
        trigger: "Text"                  // Simple text (renders as Button2)
        trigger: ({ isOpen, toggle }) => // Custom render function
          Button2({ click: toggle }, "Custom")

        // Auto-closes on:
        // - Item click
        // - Click outside dropdown
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Features"),
      Text2("Key features of the Menu component:"),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text2(
          Text2({ weight: "heavy" }, "• Action-based Menu:"),
          " Items execute actions, not selection state",
        ),
        Text2(
          Text2({ weight: "heavy" }, "• Icon Support:"),
          " Optional icons from the icon registry",
        ),
        Text2(
          Text2({ weight: "heavy" }, "• Dividers:"),
          " Group related items with visual separators",
        ),
        Text2(
          Text2({ weight: "heavy" }, "• Custom Trigger:"),
          " Use any component as the menu trigger (Button, Avatar, etc.)",
        ),
        Text2(
          Text2({ weight: "heavy" }, "• Uses Button2:"),
          " All items are Button2 components with tertiary variant",
        ),
        Text2(
          Text2({ weight: "heavy" }, "• Auto Close:"),
          " Closes on item click or click outside",
        ),
      ),
    ),
  );
}
