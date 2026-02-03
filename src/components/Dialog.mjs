import Bunnix, { useEffect, useRef, useState, Show } from "@bunnix/core";
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
  minWidth: 400,
  minHeight: null,
  confirmation: {
    text: "",
    action: null,
    variant: "regular",
    disabled: false
  },
  extra: {
    text: "",
    action: null
  },
  content: null
};

export const dialogState = useState(defaultDialog);

export const showDialog = (options = {}) => {
  const { title, message, confirmation, content, minWidth, minHeight } = options;
  const hasMinWidth = Object.prototype.hasOwnProperty.call(options, "minWidth");
  const hasMinHeight = Object.prototype.hasOwnProperty.call(options, "minHeight");

  dialogState.set({
    open: true,
    title: title ?? "",
    message: message ?? "",
    minWidth: hasMinWidth ? minWidth : defaultDialog.minWidth,
    minHeight: hasMinHeight ? minHeight : defaultDialog.minHeight,
    confirmation: {
      text: confirmation?.text ?? defaultDialog.confirmation.text,
      action: confirmation?.action ?? null,
      variant: confirmation?.variant ?? defaultDialog.confirmation.variant,
      disabled: confirmation?.disabled ?? defaultDialog.confirmation.disabled
    },
    extra: {
      text: confirmation?.extra?.text ?? defaultDialog.extra.text,
      action: confirmation?.extra?.action ?? null
    },
    content: content ?? null
  });
};

export const hideDialog = () => {
  dialogState.set({ ...dialogState.get(), open: false });
};

export default function Dialog() {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const setConfirmDisabled = (disabled) => {
    const current = dialogState.get();
    dialogState.set({
      ...current,
      confirmation: {
        ...current.confirmation,
        disabled: !!disabled
      }
    });
  };

  const resolveSizeValue = (size) => {
    if (size == null || size === "") return "";
    if (size === "auto") return "auto";
    if (typeof size === "number") return `${size}px`;
    return String(size);
  };

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

    const panel = panelRef.current;
    if (panel) {
      const minWidth = resolveSizeValue(value?.minWidth);
      const minHeight = resolveSizeValue(value?.minHeight);
      panel.style.minWidth = minWidth || "";
      panel.style.minHeight = minHeight || "";
    }
  }, [dialogState]);

  const confirmationText = dialogState.map((value) => value.confirmation?.text ?? defaultDialog.confirmation.text);
  const confirmationVariant = dialogState.map((value) => value.confirmation?.variant ?? defaultDialog.confirmation.variant);
  const confirmationDisabled = dialogState.map((value) => !!value.confirmation?.disabled);
  const showConfirmation = dialogState.map((value) => !!value.confirmation?.text);
  const extraText = dialogState.map((value) => value.extra?.text ?? "");
  const showExtra = dialogState.map((value) => !!value.extra?.text);
  const showContent = dialogState.map((value) => typeof value.content === "function");
  const showMessage = dialogState.map((value) => !!value.message && typeof value.content !== "function");
  const showBody = dialogState.map((value) => !!value.message || typeof value.content === "function");

  return dialog({
    ref: dialogRef,
    class: "dialog-base dialog-backdrop fixed inset-0 w-full h-full row-container items-center justify-center",
    cancel: () => {
      hideDialog();
    },
    keydown: (event) => {
      if (event?.key !== "Enter") return;
      const current = dialogState.get();
      const hasConfirmation = !!current?.confirmation?.text;
      const isDisabled = !!current?.confirmation?.disabled;
      if (!hasConfirmation || isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      event.preventDefault();
      const action = current?.confirmation?.action;
      if (typeof action === "function") {
        action();
      }
      hideDialog();
    }
  }, [
    VStack({
      ref: panelRef,
      gap: "regular",
      class: "box-capsule dialog-panel shadow bg-base p-lg items-stretch dialog-appear"
    }, [
      HStack({ alignment: "leading", gap: "small", class: "items-center w-full" }, [
        Text({ type: "heading4", class: "no-margin" }, dialogState.map((value) => value.title)),
        div({ class: "spacer-h" }),
        Button({
          variant: "flat",
          class: "p-xs",
          click: hideDialog
        }, Icon({ name: "close" }))
      ]),
      Text({
        type: "paragraph",
        color: "secondary",
        class: showMessage.map((value) => `whitespace-pre-line ${value ? "" : "hidden"}`.trim())
      }, dialogState.map((value) => value.message)),
      Show(showContent, () => {
        const current = dialogState.get();
        if (typeof current.content !== "function") return null;
        return div(
          { class: "column-container gap-sm w-full h-full flex-1" },
          current.content({ setConfirmDisabled })
        );
      }),
      HStack({ alignment: "trailing", gap: "regular", class: "w-full" }, [
        Show(showExtra, () => Button({
          variant: "flat",
          click: () => {
            const current = dialogState.get();
            const action = current.extra?.action;
            if (typeof action === "function") {
              action();
            }
            hideDialog();
          }
        }, extraText)),
        Show(showConfirmation, () => Button({
          autofocus: true,
          variant: confirmationVariant,
          disabled: confirmationDisabled,
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
          kbd({ class: "text-white text-sm whitespace-nowrap" }, [
            Icon({ name: "return-arrow", fill: "white", size: "xsmall" }),
            "Enter"
          ])
        ]))
      ])
    ])
  ]);
}
