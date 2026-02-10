/**
 * Code Components (Next-Gen Core)
 *
 * Code display primitives for showing formatted code blocks.
 *
 * Components:
 * - Code2: Pre-formatted code block with automatic wrapping and style extraction
 *
 * Features:
 * - Automatic style extraction (width, height, padding, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - Pre-wrap whitespace handling (preserves newlines, wraps long lines)
 * - Word breaking for overflow prevention
 */
import Bunnix from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";

const { pre } = Bunnix;

const Code2Core = (props, ...children) => {
  return pre({
    ...props,
    style: {
      ...props.style,
      margin: 0,
      padding: "regular",
      flex: 1,
      minWidth: 0,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      fontSize: "10pt",
      fontFamily: "var(--font-mono)",
    },
  }, ...children);
};

export const Code2 = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    Code2Core(finalProps, ...children),
  )(props, ...children),
);
