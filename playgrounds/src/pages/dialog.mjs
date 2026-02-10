import Bunnix from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { useDialog } from "../../../src/core/dialog.mjs";
import { Button2 } from "../../../src/core/buttons.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function DialogPage() {
  const { Dialog, showDialog } = useDialog();

  const openBasicDialog = () => {
    showDialog({
      title: "Basic Dialog",
      contents: Text2("This is a simple dialog with default confirmation button."),
    });
  };

  const openCustomDialog = () => {
    showDialog({
      title: "Custom Dialog",
      contents: [
        Text2("This dialog has custom content and confirmation button."),
        Spacer({ minHeight: 8 }),
        Text2({ color: "secondary" }, "You can pass multiple content blocks."),
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
      contents: Text2("Are you sure you want to delete this item? This action cannot be undone."),
      confirmation: {
        text: "Delete",
        variant: "danger",
        action: () => console.log("Item deleted"),
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
          contents: Text2("This is a simple dialog."),
        });

        // Custom confirmation
        showDialog({
          title: "Custom Dialog",
          contents: [
            Text2("Multiple content blocks"),
            Text2({ color: "secondary" }, "Secondary text"),
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
          contents: Text2("Are you sure?"),
          confirmation: {
            text: "Delete",
            variant: "danger",
            action: () => console.log("Deleted"),
          },
        });

        // Render the Dialog component
        Dialog();
        `,
      },
      Heading({ h3: true, color: "secondary" }, "useDialog"),
      Text2("Hook that creates a dialog controller with imperative API for opening modals."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Text2("Click the buttons below to open different dialog variants:"),
        Row(
          { gap: "regular" },
          Button2({ click: openBasicDialog }, "Basic Dialog"),
          Button2({ click: openCustomDialog }, "Custom Dialog"),
          Button2({ click: openDangerDialog, variant: "danger" }, "Danger Dialog"),
        ),
      ),
    ),
    Dialog(),
  );
}
