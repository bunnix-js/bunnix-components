/**
 * Dialog Components (Next-Gen Core)
 *
 * Minimal modal dialog API built on native <dialog>.
 *
 * Exports:
 * - useDialog: Creates local dialog state and returns Dialog renderer + showDialog API
 *
 * Features:
 * - Programmatic open with title, content blocks, and confirmation action
 * - Local state-driven rendering via useState + Show
 * - Uses core primitives (Button, Heading, Row/Column/Spacer, Icon)
 */
import Bunnix, {
  useRef,
  useState,
  Show,
} from "@bunnix/core";
import { Heading } from "./typography.mjs";
import { Column, Row, Spacer } from "./layout.mjs";
import { Button } from "./buttons.mjs";
import { Icon } from "./media.mjs";

const { dialog } = Bunnix;

/**
 * Creates a dialog controller and render component.
 *
 * @returns {{
 *   Dialog: Function,
 *   showDialog: Function
 * }} Dialog renderer and imperative open handler
 */
export const useDialog = () => {
  const dialogState = useState({
    title: "",
    contents: [],
    confirmation: { text: "OK", variant: "primary" },
  });
  const dialogRef = useRef(null);

  return {
    /**
     * Dialog component bound to this hook instance state.
     *
     * @returns {*} Renderable dialog node
     */
    Dialog: () => {
      const closeDialog = () => {
        dialogRef.current?.close();
      };

      return dialog(
        {
          ref: dialogRef,
          cancel: closeDialog,
          class: `dialog`,
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
                Button(
                  { variant: "tertiary", click: closeDialog },
                  Icon({ name: "close", color: "secondary", size: 20 }),
                ),
              ),
              state.contents.length > 0 && Column(...state.contents),
              Row(
                Spacer(),
                Button(
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
    /**
     * Opens dialog with provided content and confirmation behavior.
     *
     * @param {Object} [config] - Dialog config
     * @param {string} [config.title] - Dialog title text
     * @param {Array|*} [config.contents=[]] - Renderable content block(s)
     * @param {Object} [config.confirmation] - Confirmation button config
     * @param {string} [config.confirmation.text=\"OK\"] - Confirmation label
     * @param {string} [config.confirmation.variant=\"primary\"] - Button variant
     * @param {Function|null} [config.confirmation.action=null] - Action run before close
     * @returns {void}
     */
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
