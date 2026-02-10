/**
 * Typography Components (Next-Gen Core)
 *
 * Text and heading primitives with semantic HTML and style extraction.
 *
 * Components:
 * - Heading: Semantic heading component (h1-h6) with prop-based level selection
 * - Text: Simple text wrapper component using span element
 *
 * Features:
 * - Automatic style extraction (width, height, gap, margins, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - Semantic HTML heading levels (h1 default, h2-h6 via props)
 * - Usage: Heading({ h2: true }, "Title") renders <h2>Title</h2>
 * - Usage: Text("Simple text") or Text({ color: "secondary" }, "Styled text")
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

const TextCore = (props, ...children) => {
  return span({ ...props }, ...children);
};

// Exports with wrappers

/**
 * Semantic heading component with flexible level selection.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.h1] - Render as h1 (default if no level specified)
 * @param {boolean} [props.h2] - Render as h2
 * @param {boolean} [props.h3] - Render as h3
 * @param {boolean} [props.h4] - Render as h4
 * @param {boolean} [props.h5] - Render as h5
 * @param {boolean} [props.h6] - Render as h6
 * @param {string} [props.color] - Text color (CSS value or design token)
 * @param {number} [props.marginY=0] - Vertical margin in pixels
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Heading content
 * @returns {*} Heading component
 */
export const Heading = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    HeadingCore(finalProps, ...children),
  )({ marginY: 0, ...props }, ...children),
);

/**
 * Simple text wrapper component using span element.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.color] - Text color (CSS value or design token)
 * @param {string} [props.fontSize] - Font size (CSS value)
 * @param {string} [props.fontWeight] - Font weight (CSS value)
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Text content
 * @returns {*} Text component
 */
export const Text = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    TextCore(finalProps, ...children),
  )(props, ...children),
);
