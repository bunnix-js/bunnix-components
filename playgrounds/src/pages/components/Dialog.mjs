import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import Button from "../../components/Button.mjs";
import Text from "../../components/Text.mjs";
import HStack from "../../components/HStack.mjs";
import VStack from "../../components/VStack.mjs";
import InputField from "../../components/InputField.mjs";
import { showDialog } from "../../components/Dialog.mjs";
import Container from "../../components/Container.mjs";

const { div } = Bunnix;

export default function DialogPage() {
  const headerOffset = "6rem";
  const status = Bunnix.useState("No action yet.");
  const email = Bunnix.useState("");

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({
      title: "Dialog",
      description: "Modal confirmations using the Dialog API and design system components."
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
          }, "Restore"),
          Button({
            click: () => {
              email.set("");
              showDialog({
                title: "Share access",
                confirmation: {
                  text: "Invite",
                  disabled: true,
                  action: () => status.set("Invitation sent.")
                },
                content: ({ setConfirmDisabled }) => VStack({ gap: "regular", class: "w-full" }, [
                  Text({ type: "paragraph", class: "text-secondary" }, "Invite a teammate to this project."),
                  InputField({
                    label: "Email address",
                    placeholder: "name@company.com",
                    type: "email",
                    value: email,
                    input: (event) => {
                      const value = event?.target?.value ?? "";
                      email.set(value);
                      setConfirmDisabled(!value);
                    }
                  })
                ])
              });
            }
          }, "Custom Content")
        ]),
        Text({ type: "paragraph", class: "text-secondary" }, status)
      ])
    ])
  ]);
}
