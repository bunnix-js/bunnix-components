import Bunnix, { useState } from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Menu } from "../../../src/core/menu.mjs";
import { Picker } from "../../../src/core/inputs.mjs";
import { Button } from "../../../src/core/buttons.mjs";
import { Icon, Avatar } from "../../../src/core/media.mjs";
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
    { key: "edit", text: "Edit", icon: "pencil", action: () => console.log("Edit clicked") },
    { key: "copy", text: "Copy", icon: "doc_on_doc", action: () => console.log("Copy clicked") },
    { key: "delete", text: "Delete", icon: "trash", action: () => console.log("Delete clicked") },
  ];

  // Example 3: Dropdown with dividers
  const groupedItems = [
    { key: "new", text: "New File", icon: "doc", action: () => console.log("New File") },
    { key: "open", text: "Open", icon: "folder", action: () => console.log("Open") },
    { divider: true },
    { key: "save", text: "Save", icon: "checkmark", action: () => console.log("Save") },
    { key: "export", text: "Export", icon: "download", action: () => console.log("Export") },
    { divider: true },
    { key: "settings", text: "Settings", icon: "gear", action: () => console.log("Settings") },
  ];

  // Example 4: Custom trigger
  const customItems = [
    { key: "home", text: "Home", icon: "house", action: () => console.log("Home") },
    { key: "profile", text: "Profile", icon: "person", action: () => console.log("Profile") },
    { key: "settings", text: "Settings", icon: "gear", action: () => console.log("Settings") },
    { divider: true },
    { key: "logout", text: "Logout", icon: "arrow_right_square", action: () => console.log("Logout") },
  ];

  // Example 5: With actions
  const actionItems = [
    { key: "refresh", text: "Refresh", icon: "arrow_2_circlepath", action: () => console.log("Refresh clicked") },
    { key: "download", text: "Download", icon: "download", action: () => console.log("Download clicked") },
    { divider: true },
    { key: "share", text: "Share", icon: "share", action: () => console.log("Share clicked") },
  ];

  // Example 6: Anchor positions
  const anchorItems = [
    { key: "a", text: "Action A", action: () => console.log("Action A") },
    { key: "b", text: "Action B", action: () => console.log("Action B") },
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
      Text("Simple menu with text items and actions."),
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
          { key: "edit", text: "Edit", icon: "pencil", action: () => console.log("Edit") },
          { key: "copy", text: "Copy", icon: "doc_on_doc", action: () => console.log("Copy") },
          { key: "delete", text: "Delete", icon: "trash", action: () => console.log("Delete") },
        ];

        Menu({ items, trigger: "Actions" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "With Icons"),
      Text("Menu items with optional Framework7 icons."),
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
          { key: "new", text: "New File", icon: "doc", action: () => console.log("New") },
          { key: "open", text: "Open", icon: "folder", action: () => console.log("Open") },
          { divider: true },
          { key: "save", text: "Save", icon: "checkmark", action: () => console.log("Save") },
          { key: "export", text: "Export", icon: "download", action: () => console.log("Export") },
          { divider: true },
          { key: "settings", text: "Settings", icon: "gear", action: () => console.log("Settings") },
        ];

        Menu({ items, trigger: "File" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "With Dividers"),
      Text("Use dividers to group related items."),
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
          { key: "profile", text: "Profile", icon: "person", action: () => console.log("Profile") },
          { key: "settings", text: "Settings", icon: "gear", action: () => console.log("Settings") },
          { divider: true },
          { key: "logout", text: "Logout", icon: "arrow_right_square", action: () => console.log("Logout") },
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
      Text("Use an Avatar component as the menu trigger."),
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
            icon: "arrow_2_circlepath",
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
      Text("Menu items trigger custom actions on click."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Menu({
          items: actionItems,
          trigger: "More",
        }),
        Text(
          { color: "secondary", textSize: "0.875rem" },
          "(Check console for action logs)",
        ),
      ),
    ),

    Spacer({ minHeight: 16 }),

    // Anchor Positions
    ComponentShowcase(
      {
        code: `
        import { Menu } from "@bunnix/components";

        const items = [
          { key: "a", text: "Action A", action: () => {} },
          { key: "b", text: "Action B", action: () => {} },
        ];

        // bottomLeft (default)
        Menu({ items, trigger: "Bottom Left", anchor: "bottomLeft" });

        // bottomRight
        Menu({ items, trigger: "Bottom Right", anchor: "bottomRight" });

        // topLeft
        Menu({ items, trigger: "Top Left", anchor: "topLeft" });

        // topRight
        Menu({ items, trigger: "Top Right", anchor: "topRight" });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Anchor Positions"),
      Text("Control where the popover opens relative to the trigger using the anchor prop."),
      Spacer({ minHeight: 8 }),
      Row(
        { gap: "small", flexWrap: "wrap" },
        Menu({ items: anchorItems, trigger: "Bottom Left", anchor: "bottomLeft" }),
        Menu({ items: anchorItems, trigger: "Bottom Right", anchor: "bottomRight" }),
        Menu({ items: anchorItems, trigger: "Top Left", anchor: "topLeft" }),
        Menu({ items: anchorItems, trigger: "Top Right", anchor: "topRight" }),
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
          action: () => {},        // Optional: function to call on click
          divider: false           // Optional: renders divider if true
        }

        // Trigger Options
        trigger: "Text"                  // Simple text (renders as Button)
        trigger: ({ isOpen, toggle }) => // Custom render function
          Button({ click: toggle }, "Custom")

        // Anchor Positions
        anchor: "bottomLeft"     // Popover position: bottomLeft | bottomRight | topLeft | topRight

        // Auto-closes on:
        // - Item click
        // - Click outside dropdown
        // - Page scroll
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Features"),
      Text("Key features of the Menu component:"),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text(
          Text({ weight: "heavy" }, "• Action-based Menu:"),
          " Items execute actions, not selection state",
        ),
        Text(
          Text({ weight: "heavy" }, "• Icon Support:"),
          " Optional icons from the Framework7 icon font",
        ),
        Text(
          Text({ weight: "heavy" }, "• Dividers:"),
          " Group related items with visual separators",
        ),
        Text(
          Text({ weight: "heavy" }, "• Custom Trigger:"),
          " Use any component as the menu trigger (Button, Avatar, etc.)",
        ),
        Text(
          Text({ weight: "heavy" }, "• Uses Button:"),
          " All items are Button components with tertiary variant",
        ),
        Text(
          Text({ weight: "heavy" }, "• Auto Close:"),
          " Closes on item click or click outside",
        ),
      ),
    ),
  );
}

export function PickerPage() {
  const pickerValue = useState("");
  const iconPickerValue = useState("calendar");

  return Column(
    Heading({ h2: true }, "Picker Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Menu-backed selector that shows the selected item icon and text",
    ),
    Spacer({ minHeight: 24 }),

    ComponentShowcase(
      {
        code: `
        import { Picker } from "@bunnix/components";
        import { useState } from "@bunnix/core";

        const value = useState("");
        const iconValue = useState("calendar");

        Picker({
          value,
          items: [
            { key: "overview", text: "Overview" },
            { key: "analytics", text: "Analytics" },
            { key: "settings", text: "Settings" },
          ],
        });

        Picker({
          value: iconValue,
          items: [
            { key: "calendar", text: "Calendar", icon: "calendar" },
            { key: "messages", text: "Messages", icon: "chat_bubble_2" },
            { key: "documents", text: "Documents", icon: "doc_text" },
          ],
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Picker"),
      Text("Picker reuses Menu items but behaves like a selector, showing the current choice in the trigger."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Picker({
          value: pickerValue,
          items: [
            { key: "overview", text: "Overview" },
            { key: "analytics", text: "Analytics" },
            { key: "settings", text: "Settings" },
          ],
        }),
        Picker({
          value: iconPickerValue,
          items: [
            { key: "calendar", text: "Calendar", icon: "calendar" },
            { key: "messages", text: "Messages", icon: "chat_bubble_2" },
            { key: "divider-1", divider: true },
            { key: "documents", text: "Documents", icon: "doc_text" },
          ],
        }),
        Text(
          { color: "secondary" },
          pickerValue.map((value) => `Selected: ${value || "(blank)"}`),
        ),
        Text(
          { color: "secondary" },
          iconPickerValue.map((value) => `Selected destination: ${value}`),
        ),
      ),
    ),
  );
}
