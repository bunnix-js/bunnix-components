import Bunnix, {
  useRef,
  useState,
  Show,
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
      const closeDialog = () => {
        dialogRef.current?.close();
      };

      return dialog(
        {
          ref: dialogRef,
          cancel: closeDialog,
          class: `border-primary radius-lg backdrop-dimmed padding-sm`,
        },
        Show(
          dialogState,
          (state) => (
            Column(
              { class: "padding-md", gap: 12, minWidth: 420, maxWidth: 580 },
              Row(
                { gap: 24, alignItems: "center" },
                Heading({ h3: true, flexShrink: 0 }, state.title),
                Spacer(),
                Button2(
                  { variant: "tertiary", click: closeDialog },
                  Icon2({ name: "close", color: "secondary", size: 20 }),
                ),
              ),
              state.contents.length > 0 && Column(...state.contents),
              Row(
                Spacer(),
                Button2(
                  {
                    minWidth: 80,
                    variant: state.confirmation.variant,
                    click: () => {
                      let action = state.confirmation.action;
                      (action) && action();
                      closeDialog();
                    }
                  },
                  state.confirmation.text
                )
              ),
            )
          )
        )
      );
    },
    showDialog: ({
      title,
      contents = [],
      confirmation,
    } = {}) => {
      const defaultConfirmation = { text: "OK", variant: "primary", action: null };
      const mergedConfirmation = { ...defaultConfirmation, ...confirmation };

      dialogState.set({
        title,
        contents: Array.isArray(contents) ? contents : [contents],
        confirmation: mergedConfirmation,
      });
      dialogRef.current?.showModal();
    },
  };
};
