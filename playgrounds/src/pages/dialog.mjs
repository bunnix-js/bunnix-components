import Bunnix from "@bunnix/core";
import { Heading, Text, Column, Grid, Row, Spacer, useDialog, Button, Icon } from "@bunnix/components";
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
    
    // Dialog Component
    ComponentShowcase(
      {
        code: `
        import { useDialog } from "@bunnix/components";

        const { Dialog, showDialog } = useDialog();

        // Basic dialog
        showDialog({
          title: "Basic Dialog",
          contents: Text("This is a simple dialog."),
        });

        // Custom confirmation
        showDialog({
          title: "Custom Dialog",
          contents: [
            Text("Multiple content blocks"),
            Text({ color: "secondary" }, "Secondary text"),
          ],
          confirmation: {
            text: "Got it!",
            variant: "primary",
            action: () => console.log("Confirmed"),
          },
        });

        // Danger variant
        showDialog({
          title: "Delete Item",
          contents: Text("Are you sure?"),
          secondary: {
            text: "Cancel",
            variant: "secondary",
            action: () => console.log("Cancelled"),
          },
          confirmation: {
            text: "Delete",
            variant: "danger",
            action: () => console.log("Deleted"),
          },
        });

        // Fixed-size dialog with custom padding and scrollable contents
        showDialog({
          title: "Sized Dialog",
          padding: "large",
          width: 640,
          height: 320,
          contents: [
            Text("This dialog demonstrates fixed height."),
            Text({ color: "secondary" }, "Add enough content and only the body scrolls."),
          ],
          secondary: {
            text: "Later",
            variant: "secondary",
          },
          confirmation: {
            text: "Continue",
            variant: "primary",
          },
        });

        // Custom title content
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

        // Render the Dialog component
        Dialog();
        `,
      },
      Heading({ h3: true, color: "secondary" }, "useDialog"),
      Text("Hook that creates a dialog controller with imperative API for opening modals."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Text("Click the buttons below to open different dialog variants, including a two-button footer:"),
        Grid(
          { layout: "flow", gridGap: "regular" },
          Button({ click: openBasicDialog }, "Basic Dialog"),
          Button({ click: openCustomDialog }, "Custom Dialog"),
          Button({ click: openDangerDialog, variant: "danger" }, "Danger Dialog"),
          Button({ click: openSizedDialog, variant: "secondary" }, "Sized Dialog"),
          Button({ click: openSettingsDialog, variant: "secondary" }, "Settings Dialog"),
        ),
      ),
    ),
    Dialog(),
  );
}
