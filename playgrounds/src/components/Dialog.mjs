import Bunnix, { useEffect, useRef, useState } from "@bunnix/core";
import VStack from "./VStack.mjs";
import HStack from "./HStack.mjs";
import Button from "./Button.mjs";
import Text from "./Text.mjs";
import Icon from "./Icon.mjs";

const { div, dialog, kbd, hr } = Bunnix;

const defaultDialog = {
  open: false,
  title: "",
  message: "",
  confirmation: {
    text: "Confirm",
    action: null,
    variant: "regular"
  },
  extra: {
    text: "",
    action: null
  }
};

export const dialogState = useState(defaultDialog);

export const showDialog = ({ title, message, confirmation } = {}) => {
  dialogState.set({
    open: true,
    title: title ?? "",
    message: message ?? "",
    confirmation: {
      text: confirmation?.text ?? defaultDialog.confirmation.text,
      action: confirmation?.action ?? null,
      variant: confirmation?.variant ?? defaultDialog.confirmation.variant
    },
    extra: {
      text: confirmation?.extra?.text ?? defaultDialog.extra.text,
      action: confirmation?.extra?.action ?? null
    }
  });
};

export const hideDialog = () => {
  dialogState.set({ ...dialogState.get(), open: false });
};

export default function Dialog() {
  const dialogRef = useRef(null);

  useEffect((value) => {
    const element = dialogRef.current;
    if (!element) return;

    if (value.open) {
      if (!element.open) {
        element.showModal();
      }
    } else if (element.open) {
      element.close();
    }
  }, [dialogState]);

  const confirmationText = dialogState.map((value) => value.confirmation?.text ?? defaultDialog.confirmation.text);
  const confirmationVariant = dialogState.map((value) => value.confirmation?.variant ?? defaultDialog.confirmation.variant);
  const extraText = dialogState.map((value) => value.extra?.text ?? "");

  return dialog({
    ref: dialogRef,
    class: "dialog-base dialog-backdrop fixed inset-0 w-full h-full row-container items-center justify-center",
    cancel: () => {
      hideDialog();
    }
  }, [
    VStack({ gap: "regular", class: "card shadow bg-base w-300 p-lg" }, [
      HStack({ alignment: "leading", gap: "small", class: "items-center w-full" }, [
        Text({ type: "heading4", class: "no-margin" }, dialogState.map((value) => value.title)),
        div({ class: "spacer-h" }),
        Button({
          variant: "flat",
          class: "p-xs",
          click: hideDialog
        }, Icon({ name: "close" }))
      ]),
      Text({ type: "paragraph", class: "text-secondary whitespace-pre-line" }, dialogState.map((value) => value.message)),
      hr({ class: "no-margin" }),
      HStack({ alignment: "trailing", gap: "regular", class: "w-full" }, [
        Button({
          variant: "flat",
          class: extraText.map((value) => (value ? "" : "hidden")),
          click: () => {
            const current = dialogState.get();
            const action = current.extra?.action;
            if (typeof action === "function") {
              action();
            }
            hideDialog();
          }
        }, extraText),
        Button({
          autofocus: true,
          variant: confirmationVariant,
          click: () => {
            const current = dialogState.get();
            const action = current.confirmation?.action;
            if (typeof action === "function") {
              action();
            }
            hideDialog();
          }
        }, [
          confirmationText,
          kbd({ class: "text-white text-sm whitespace-nowrap" }, "⏎ Enter")
        ])
      ])
    ])
  ]);
}
