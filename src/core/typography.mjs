/**
 * Typography Components (Next-Gen Core)
 *
 * Text and heading primitives with semantic HTML and style extraction.
 *
 * Components:
 * - Heading: Semantic heading component (h1-h6) with prop-based level selection
 *
 * Features:
 * - Automatic style extraction (width, height, gap, margins, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - Semantic HTML heading levels (h1 default, h2-h6 via props)
 * - Usage: Heading({ h2: true }, "Title") renders <h2>Title</h2>
 */
import Bunnix from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";

const { h1, h2, h3, h4, h5, h6 } = Bunnix;

const HeadingCore = withNormalizedArgs((props, ...children) => {
  return withExtractedStyles((finalProps, ...children) => {
    if ("h6" in finalProps) return h6({ ...finalProps }, ...children);
    if ("h5" in finalProps) return h5({ ...finalProps }, ...children);
    if ("h4" in finalProps) return h4({ ...finalProps }, ...children);
    if ("h3" in finalProps) return h3({ ...finalProps }, ...children);
    if ("h2" in finalProps) return h2({ ...finalProps }, ...children);

    return h1({ ...finalProps }, ...children);
  })(props, ...children);
});

// Apply default Heading props at export
export const Heading = (props = {}, ...children) => {
  const propsWithDefaults = { marginY: 0, ...props };
  return HeadingCore(propsWithDefaults, ...children);
};
