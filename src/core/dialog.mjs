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

const resolveDialogSize = (value) =>
  typeof value === "number" ? `${value}px` : value;

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
    padding: "regular",
    width: null,
    height: null,
    secondary: null,
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

      return Show(
        dialogState,
        (state) => (
          dialog(
            {
              ref: dialogRef,
              cancel: closeDialog,
              class: `dialog`,
              style: {
                ...(state.width ? { width: resolveDialogSize(state.width) } : {}),
                ...(state.height ? { height: resolveDialogSize(state.height) } : {}),
              },
            },
            Column(
              {
                gap: 12,
                minWidth: state.width ? undefined : 420,
                maxWidth: state.width ? undefined : 580,
                ...(state.width ? { fillWidth: true } : {}),
                ...(state.height ? { fillHeight: true } : {}),
                minHeight: 0,
              },
              Row(
                {
                  gap: 24,
                  alignItems: "center",
                  paddingX: state.padding,
                  paddingTop: state.padding,
                  flexShrink: 0,
                },
                Heading({ h3: true, flexShrink: 0 }, state.title),
                Spacer(),
                Button(
                  { variant: "tertiary", click: closeDialog },
                  Icon({ name: "close", color: "secondary", size: 20 }),
                ),
              ),
              state.contents.length > 0 && Column(
                {
                  flexGrow: state.height ? 1 : 0,
                  minHeight: 0,
                },
                Column(
                  {
                    gap: 12,
                    paddingX: state.padding,
                    ...(state.height ? { fillHeight: true } : {}),
                    minHeight: 0,
                    style: {
                      ...(state.height ? { overflowY: "auto" } : {}),
                    },
                  },
                  ...state.contents,
                ),
              ),
              Row(
                {
                  paddingX: state.padding,
                  paddingBottom: state.padding,
                  bgColor: "primary",
                  flexShrink: 0,
                },
                ...(state.secondary ? [
                  Button(
                    {
                      minWidth: 80,
                      variant: state.secondary.variant,
                      click: () => {
                        let action = state.secondary.action;
                        (action) && action();
                        closeDialog();
                      }
                    },
                    state.secondary.text
                  ),
                ] : []),
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
            ),
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
     * @param {number|string} [config.padding="regular"] - Shared dialog section padding
     * @param {number|string} [config.width] - Fixed dialog width
     * @param {number|string} [config.height] - Fixed dialog height
     * @param {Object} [config.secondary] - Optional secondary button config
     * @param {string} [config.secondary.text="Cancel"] - Secondary label
     * @param {string} [config.secondary.variant="secondary"] - Button variant
     * @param {Function|null} [config.secondary.action=null] - Action run before close
     * @param {Object} [config.confirmation] - Confirmation button config
     * @param {string} [config.confirmation.text=\"OK\"] - Confirmation label
     * @param {string} [config.confirmation.variant=\"primary\"] - Button variant
     * @param {Function|null} [config.confirmation.action=null] - Action run before close
     * @returns {void}
     */
    showDialog: ({
      title,
      contents = [],
      padding = "regular",
      width = null,
      height = null,
      secondary,
      confirmation,
    } = {}) => {
      const defaultSecondary = { text: "Cancel", variant: "secondary", action: null };
      const defaultConfirmation = { text: "OK", variant: "primary", action: null };
      const mergedSecondary = secondary ? { ...defaultSecondary, ...secondary } : null;
      const mergedConfirmation = { ...defaultConfirmation, ...confirmation };

      dialogState.set({
        title,
        contents: Array.isArray(contents) ? contents : [contents],
        padding,
        width,
        height,
        secondary: mergedSecondary,
        confirmation: mergedConfirmation,
      });
      dialogRef.current?.showModal();
    },
  };
};
