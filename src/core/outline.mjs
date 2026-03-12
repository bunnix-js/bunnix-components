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
  let { anchor, details } = props;
  delete props.anchor;
  delete props.details;

  const showingDetails = useState(false);

  const handleToggleDetails = () => {
    showingDetails.set(!showingDetails.get());
  };

  return Column(
    props,
    Row(
      { cursor: "pointer", click: handleToggleDetails, fillWidth: true },
      anchor,
      Show(showingDetails.map((v) => !v), () =>
        Icon({ name: "chevron-down", size: 16, flexShrink: 0 }),
      ),
      Show(showingDetails, () =>
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
 * @returns {*} Outline component
 *
 * @example
 * Outline({
 *   anchor: Row({ alignItems: "center", gap: "small" },
 *     Icon({ name: "doc-text", size: 16 }),
 *     Text({ weight: "heavy" }, "Section Title"),
 *   ),
 *   details: Column({ gap: "small", paddingTop: "small" },
 *     Text("Expandable content goes here."),
 *   ),
 * });
 */
export const Outline = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    OutlineCore(finalProps, ...children),
  )(props, ...children),
);
