import Bunnix, {
  useRef,
  useState,
  useEffect,
  useMemo,
  Show,
  ForEach,
} from "@bunnix/core";
import { Heading } from "./typography.mjs";
import { Column, Row, Spacer } from "./layout.mjs";
import { Button2 } from "./buttons.mjs";
import { Icon2 } from "./media.mjs";

const { dialog } = Bunnix;

export const useDialog = () => {
  const dialogState = useState({
    title: "",
    contents: [],
    confirmation: { text: "OK", variant: "primary" },
  });
  const dialogRef = useRef(null);

  return {
    Dialog: () => {
      const title = dialogState.map((s) => s.title);
      const contents = dialogState.map((s) => s.contents);
      const confirmationText = dialogState.map((s) => s.confirmation.text);
      const confirmationVariant = dialogState.map((s) => s.confirmation.variant);
      const confirmationAction = dialogState.map((s) => s.confirmation.action);

      const closeDialog = () => {
        dialogRef.current?.close();
      };

      return dialog(
        {
          ref: dialogRef,
          cancel: closeDialog,
          class: `border-primary radius-lg backdrop-dimmed`,
        },
        Column(
          { class: "padding-md", gap: 12, maxWidth: 480 },
          Row(
            { gap: 24, alignItems: "start" },
            Heading({ h3: true, flexShrink: 0 }, title),
            Spacer(),
            Button2(
              { variant: "tertiary", click: closeDialog },
              Icon2({ name: "close", color: "secondary", size: 20 }),
            ),
          ),
          Show(
            contents.map((c) => c.length > 0),
            () => Column(...contents.get()),
          ),
          Row(
            Spacer(),
            Button2(
              {
                minWidth: 80,
                variant: confirmationVariant.get(),
                click: () => {
                  let action = confirmationAction.get();
                  (action) && action();
                  closeDialog();
                }
              }, confirmationText)
          ),
        ),
      );
    },
    showDialog: ({
      title,
      contents = [],
      confirmation = { text: "OK", variant: "primary", action },
    } = {}) => {
      dialogState.set({
        title,
        contents: typeof contents === "array" ? contents : [contents],
        confirmation,
      });
      dialogRef.current?.showModal();
    },
  };
};
