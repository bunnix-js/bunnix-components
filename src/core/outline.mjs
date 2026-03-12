/**
 * Outline Component (Disclosure Widget)
 *
 * A collapsible section component with a clickable anchor header and expandable details region.
 *
 * Components:
 * - Outline: Disclosure widget with togglable details
 *
 * Features:
 * - Always-visible anchor header (any Bunnix node)
 * - Collapsible details region (any Bunnix node)
 * - Automatic chevron icon (up/down)
 * - Full layout prop support (gap, padding, margin, width, etc.)
 */
import Bunnix, { useState, Show } from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";
import { Column, Row } from "./layout.mjs";
import { Icon } from "./media.mjs";

const OutlineCore = (props) => {
  let { anchor, details, showChevron = true } = props;
  delete props.anchor;
  delete props.details;
  delete props.showChevron;

  // Bindable state: accept external StateLike<boolean> or fallback to internal useState
  let showingDetails =
    props.open?.get && props.open?.set
      ? props.open
      : useState(props.open ?? false);
  delete props.open;

  const handleToggleDetails = () => {
    showingDetails.set(!showingDetails.get());
  };

  return Column(
    props,
    Row(
      { cursor: "pointer", click: handleToggleDetails, fillWidth: true },
      anchor,
      // Only render chevron if showChevron is true
      showChevron && Show(showingDetails.map((v) => !v), () =>
        Icon({ name: "chevron-down", size: 16, flexShrink: 0 }),
      ),
      showChevron && Show(showingDetails, () =>
        Icon({ name: "chevron-up", size: 16, flexShrink: 0 }),
      ),
    ),
    Show(showingDetails, () => details),
  );
};

/**
 * Outline disclosure component with a togglable details region.
 *
 * Renders a clickable anchor row that expands/collapses a details section.
 * A chevron icon in the anchor row reflects the current open/closed state.
 *
 * @param {Object} props - Component props (also accepts all LayoutProps: gap, padding, margin, width, etc.)
 * @param {*} props.anchor - Always-visible trigger content (any Bunnix node)
 * @param {*} props.details - Collapsible content shown when expanded (any Bunnix node)
 * @param {boolean} [props.showChevron=true] - Whether to render the chevron toggle icon
 * @param {boolean|StateLike<boolean>} [props.open] - Controlled open/closed state; pass a Bunnix State for two-way binding
 * @returns {*} Outline component
 *
 * @example
 * // Basic usage
 * Outline({
 *   anchor: Row({ alignItems: "center", gap: "small" },
 *     Icon({ name: "doc-text", size: 16 }),
 *     Text({ weight: "heavy" }, "Section Title"),
 *   ),
 *   details: Column({ gap: "small", paddingTop: "small" },
 *     Text("Expandable content goes here."),
 *   ),
 * });
 *
 * @example
 * // With external state control
 * const outlineState = useState(false);
 * Outline({
 *   open: outlineState,
 *   anchor: Text({ weight: "heavy" }, "Click to expand"),
 *   details: Text("Controlled from outside"),
 * });
 *
 * @example
 * // Without chevron
 * Outline({
 *   showChevron: false,
 *   anchor: Text({ weight: "heavy" }, "Custom anchor"),
 *   details: Text("No automatic chevron"),
 * });
 */
export const Outline = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    OutlineCore(finalProps, ...children),
  )(props, ...children),
);
