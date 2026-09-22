import { Heading, Text, Column, Row, Spacer, useDialog, Button, Icon } from "@bunnix/components";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function DialogPage() {
  const { Dialog, showDialog } = useDialog();
  const longContents = Array.from({ length: 10 }, (_, index) =>
    Text(
      { color: index === 0 ? "primary" : "secondary" },
      index === 0
        ? "This dialog demonstrates fixed height with scrolling contents."
        : `Scrollable line ${index}: extra content stays inside the modal body.`,
    ),
  );

  const openBasicDialog = () => {
    showDialog({
      title: "Basic Dialog",
      contents: Text("This is a simple dialog with default confirmation button."),
    });
  };

  const openCustomDialog = () => {
    showDialog({
      title: "Custom Dialog",
      contents: [
        Text("This dialog has custom content and confirmation button."),
        Spacer({ minHeight: 8 }),
        Text({ color: "secondary" }, "You can pass multiple content blocks."),
      ],
      confirmation: {
        text: "Got it!",
        variant: "primary",
        action: () => console.log("Dialog confirmed"),
      },
    });
  };

  const openDangerDialog = () => {
    showDialog({
      title: "Delete Item",
      contents: Text("Are you sure you want to delete this item? This action cannot be undone."),
      secondary: {
        text: "Cancel",
        variant: "secondary",
        action: () => console.log("Delete cancelled"),
      },
      confirmation: {
        text: "Delete",
        variant: "danger",
        action: () => console.log("Item deleted"),
      },
    });
  };

  const openSizedDialog = () => {
    showDialog({
      title: "Sized Dialog",
      padding: "large",
      width: 640,
      height: 320,
      contents: longContents,
      secondary: {
        text: "Later",
        variant: "secondary",
        action: () => console.log("Deferred"),
      },
      confirmation: {
        text: "Continue",
        variant: "primary",
        action: () => console.log("Continued"),
      },
    });
  };

  const openSettingsDialog = () => {
    showDialog({
      title: Row(
        { gap: 12, alignItems: "center" },
        Icon({ name: "hammer", size: 42, color: "secondary" }),
        Column(
          { gap: 2 },
          Heading({ h3: true }, "Workspace Settings"),
          Text({ color: "secondary" }, "Static configuration preview"),
        ),
      ),
      contents: [
        Row(
          { gap: 12, alignItems: "center" },
          Text({ weight: "heavy", width: 120 }, "Theme"),
          Text({ color: "secondary" }, "System default"),
        ),
        Row(
          { gap: 12, alignItems: "center" },
          Text({ weight: "heavy", width: 120 }, "Notifications"),
          Text({ color: "secondary" }, "Enabled"),
        ),
        Row(
          { gap: 12, alignItems: "center" },
          Text({ weight: "heavy", width: 120 }, "Auto-save"),
          Text({ color: "secondary" }, "Every 5 minutes"),
        ),
      ],
      secondary: {
        text: "Back",
        variant: "secondary",
      },
      confirmation: {
        text: "Save",
        variant: "primary",
      },
    });
  };

  return Column(
    Heading({ h2: true }, "Dialog Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Modal dialog component built on native <dialog> element",
    ),
    Spacer({ minHeight: 24 }),
    Text(
      { color: "secondary" },
      "Each example below is a complete component. In a real page, hoist a single useDialog to the top and render Dialog() once in the layout.",
    ),
    Spacer({ minHeight: 16 }),
    
    // Basic dialog with default confirmation
    ComponentShowcase(
      {
        code: `
        import { useDialog, Button, Text, Column } from "@bunnix/components";

        export function BasicDialogDemo() {
          const { Dialog, showDialog } = useDialog();

          const open = () =>
            showDialog({
              title: "Basic Dialog",
              contents: Text("This is a simple dialog with default confirmation button."),
            });

          return Column(
            Button({ click: open }, "Basic Dialog"),
            Dialog(),
          );
        }
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Basic Dialog"),
      Text("Hook at the top of the component, showDialog linked to a button click, Dialog rendered once in the layout."),
      Spacer({ minHeight: 8 }),
      Button({ click: openBasicDialog }, "Basic Dialog"),
    ),
    Spacer({ minHeight: 16 }),
    // Custom confirmation button
    ComponentShowcase(
      {
        code: `
        import { useDialog, Button, Text, Spacer, Column } from "@bunnix/components";

        export function CustomDialogDemo() {
          const { Dialog, showDialog } = useDialog();

          const open = () =>
            showDialog({
              title: "Custom Dialog",
              contents: [
                Text("This dialog has custom content and confirmation button."),
                Spacer({ minHeight: 8 }),
                Text({ color: "secondary" }, "You can pass multiple content blocks."),
              ],
              confirmation: {
                text: "Got it!",
                variant: "primary",
                action: () => console.log("Dialog confirmed"),
              },
            });

          return Column(
            Button({ click: open }, "Custom Dialog"),
            Dialog(),
          );
        }
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Custom Confirmation"),
      Text("Multiple content blocks with a custom confirmation label and action."),
      Spacer({ minHeight: 8 }),
      Button({ click: openCustomDialog }, "Custom Dialog"),
    ),
    Spacer({ minHeight: 16 }),
    // Danger dialog with two-button footer
    ComponentShowcase(
      {
        code: `
        import { useDialog, Button, Text, Column } from "@bunnix/components";

        export function DangerDialogDemo() {
          const { Dialog, showDialog } = useDialog();

          const open = () =>
            showDialog({
              title: "Delete Item",
              contents: Text("Are you sure you want to delete this item? This action cannot be undone."),
              secondary: {
                text: "Cancel",
                variant: "secondary",
                action: () => console.log("Delete cancelled"),
              },
              confirmation: {
                text: "Delete",
                variant: "danger",
                action: () => console.log("Item deleted"),
              },
            });

          return Column(
            Button({ click: open, variant: "danger" }, "Danger Dialog"),
            Dialog(),
          );
        }
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Danger"),
      Text("Two-button footer combining a secondary action with a danger confirmation."),
      Spacer({ minHeight: 8 }),
      Button({ click: openDangerDialog, variant: "danger" }, "Danger Dialog"),
    ),
    Spacer({ minHeight: 16 }),
    // Fixed-size dialog with scrollable contents
    ComponentShowcase(
      {
        code: `
        import { useDialog, Button, Text, Column } from "@bunnix/components";

        export function SizedDialogDemo() {
          const { Dialog, showDialog } = useDialog();

          const longContents = Array.from({ length: 10 }, (_, index) =>
            Text(
              { color: index === 0 ? "primary" : "secondary" },
              index === 0
                ? "This dialog demonstrates fixed height with scrolling contents."
                : \`Scrollable line \${index}: extra content stays inside the modal body.\`,
            ),
          );

          const open = () =>
            showDialog({
              title: "Sized Dialog",
              padding: "large",
              width: 640,
              height: 320,
              contents: longContents,
              secondary: {
                text: "Later",
                variant: "secondary",
                action: () => console.log("Deferred"),
              },
              confirmation: {
                text: "Continue",
                variant: "primary",
                action: () => console.log("Continued"),
              },
            });

          return Column(
            Button({ click: open, variant: "secondary" }, "Sized Dialog"),
            Dialog(),
          );
        }
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Sized Dialog"),
      Text("Fixed width and height with custom padding; overflowing contents scroll inside the body."),
      Spacer({ minHeight: 8 }),
      Button({ click: openSizedDialog, variant: "secondary" }, "Sized Dialog"),
    ),
    Spacer({ minHeight: 16 }),
    // Custom title content
    ComponentShowcase(
      {
        code: `
        import { useDialog, Button, Heading, Text, Column, Row, Icon } from "@bunnix/components";

        export function SettingsDialogDemo() {
          const { Dialog, showDialog } = useDialog();

          const open = () =>
            showDialog({
              title: Row(
                { gap: 12, alignItems: "center" },
                Icon({ name: "hammer", size: 42, color: "secondary" }),
                Column(
                  { gap: 2 },
                  Heading({ h3: true }, "Workspace Settings"),
                  Text({ color: "secondary" }, "Static configuration preview"),
                ),
              ),
              contents: [
                Row(
                  { gap: 12, alignItems: "center" },
                  Text({ weight: "heavy", width: 120 }, "Theme"),
                  Text({ color: "secondary" }, "System default"),
                ),
                Row(
                  { gap: 12, alignItems: "center" },
                  Text({ weight: "heavy", width: 120 }, "Notifications"),
                  Text({ color: "secondary" }, "Enabled"),
                ),
                Row(
                  { gap: 12, alignItems: "center" },
                  Text({ weight: "heavy", width: 120 }, "Auto-save"),
                  Text({ color: "secondary" }, "Every 5 minutes"),
                ),
              ],
              secondary: {
                text: "Back",
                variant: "secondary",
              },
              confirmation: {
                text: "Save",
                variant: "primary",
              },
            });

          return Column(
            Button({ click: open, variant: "secondary" }, "Settings Dialog"),
            Dialog(),
          );
        }
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Custom Title"),
      Text("Rich title content with labeled configuration rows in the body."),
      Spacer({ minHeight: 8 }),
      Button({ click: openSettingsDialog, variant: "secondary" }, "Settings Dialog"),
    ),
    Dialog(),
  );
}
