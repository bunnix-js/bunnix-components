/**
 * Layout Components (Next-Gen Core)
 *
 * Foundational layout primitives for building flexible UIs with flexbox.
 *
 * Components:
 * - Column: Vertical flex container with gap between children
 * - Row: Horizontal flex container with centered alignment and gap
 * - Spacer: Flexible spacing element that grows to fill available space
 *
 * Features:
 * - Automatic style extraction (width, height, gap, margins, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - CSS utility classes via core.css for consistent styling
 * - Spacer supports type variants: default (flex-grow), horizontal (width), vertical (height)
 */
import Bunnix from "@bunnix/core";
import "./core.css";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";

const { div } = Bunnix;

export const Column = withNormalizedArgs(
  withExtractedStyles((props, ...children) => {
    const className = props.class ? `column ${props.class}` : "column";
    return div({ ...props, class: className }, ...children);
  }),
);

export const Row = withNormalizedArgs(
  withExtractedStyles((props, ...children) => {
    const className = props.class ? `row ${props.class}` : "row";
    return div({ ...props, class: className }, ...children);
  }),
);

const SpacerCore = (props, ...children) => {
  return div({
    ...props,
    class: `spacer ${props.class || ""}`,
  });
};

// Apply default Spacer props at export
export const Spacer = withNormalizedArgs((props = {}, ...children) => {
  return withExtractedStyles((finalProps, ...children) => {
    let injectedProps = {};
    if (finalProps.type === "horizontal") injectedProps = { fillWidth: true };
    if (finalProps.type === "vertical") injectedProps = { fillHeight: true };
    
    delete finalProps.type;

    return SpacerCore({ ...injectedProps, ...finalProps }, ...children);
  })(props, ...children);
});

const GridCore = (props, ...children) => {
  let layout = props.layout ?? "fixed";
  let columns = props.columns ?? [];
  let gap = props.gridGap ?? "var(--gap-md)";

  delete props.layout;
  delete props.columns;
  delete props.gridGap;

  gap = (typeof gap === "number") ? `${gap}px` : gap;

  let style = {
    display: "grid",
    "column-gap": gap,
    "row-gap": gap,
  };

  if (layout === "flow") {
    style = {
      ...style,
      "display": "flex",
      "flex-wrap": "wrap",
      "flex-direction": "row",
      "gap": gap
    }
  }

  if (layout === "fixed") {
    let columnsTemplate = columns.map((col) => {
      if (col.size === "auto") return "1fr";
      if (typeof col.size === "number") return `${col.size}px`;
      return col.size ?? "1fr";
    }).join(" ");

    style = {
      ...style,
      "grid-template-columns": columnsTemplate,
    }
  }

  return div(
    { ...props, class: `grid ${props.class ?? ""}`, style },
    children
  )
};

export const Grid2 = withNormalizedArgs((props, ...children) => (
  withExtractedStyles((finalProps, ...children) =>
    GridCore(finalProps, ...children))
  )({ gridGap: props.gridGap ?? props.gap, ...props }, ...children)
);
