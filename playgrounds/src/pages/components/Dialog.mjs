import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import Button from "../../components/Button.mjs";
import Text from "../../components/Text.mjs";
import HStack from "../../components/HStack.mjs";
import { showDialog } from "../../components/Dialog.mjs";

const { div } = Bunnix;

export default function DialogPage() {
  const headerOffset = "6rem";
  const status = Bunnix.useState("No action yet.");

  return div({ class: "column-container page-layout" }, [
    PageHeader({
      title: "Dialog",
      description: "Modal confirmations using Popover API and design system components."
    }),
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Example", stickyOffset: headerOffset }, [
        HStack({ alignment: "leading", gap: "regular" }, [
          Button({
            variant: "destructive",
            click: () => showDialog({
              title: "Delete project?",
              message: "This action cannot be undone.\nThe project, its assets, and shared links will be permanently removed.\nPlease confirm that you want to proceed with the deletion.",
              confirmation: {
                text: "Delete",
                variant: "destructive",
                action: () => status.set("Confirmed delete action.")
              }
            })
          }, "Delete Project"),
          Button({
            click: () => showDialog({
              title: "Restore backup?",
              message: "The current configuration will be replaced with the last saved backup.\nPlease confirm you want to restore these settings.",
              confirmation: {
                text: "Restore",
                action: () => status.set("Backup restored successfully."),
                extra: {
                  text: "Cancel",
                  action: () => status.set("Restore canceled.")
                }
              }
            })
          }, "Restore")
        ]),
        Text({ type: "paragraph", class: "text-secondary" }, status)
      ])
    ])
  ]);
}
