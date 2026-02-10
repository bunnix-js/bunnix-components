/**
 * Typography Components (Next-Gen Core)
 *
 * Text and heading primitives with semantic HTML and style extraction.
 *
 * Components:
 * - Heading: Semantic heading component (h1-h6) with prop-based level selection
 * - Text2: Simple text wrapper component using span element
 *
 * Features:
 * - Automatic style extraction (width, height, gap, margins, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - Semantic HTML heading levels (h1 default, h2-h6 via props)
 * - Usage: Heading({ h2: true }, "Title") renders <h2>Title</h2>
 * - Usage: Text2("Simple text") or Text2({ color: "secondary" }, "Styled text")
 */
import Bunnix from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";

const { h1, h2, h3, h4, h5, h6, span } = Bunnix;

const HeadingCore = (props, ...children) => {
  if ("h6" in props) return h6({ ...props }, ...children);
  if ("h5" in props) return h5({ ...props }, ...children);
  if ("h4" in props) return h4({ ...props }, ...children);
  if ("h3" in props) return h3({ ...props }, ...children);
  if ("h2" in props) return h2({ ...props }, ...children);

  return h1({ ...props }, ...children);
};

const Text2Core = (props, ...children) => {
  return span({ ...props }, ...children);
};

// Exports with wrappers

export const Heading = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    HeadingCore(finalProps, ...children),
  )({ marginY: 0, ...props }, ...children),
);

export const Text2 = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    Text2Core(finalProps, ...children),
  )(props, ...children),
);
