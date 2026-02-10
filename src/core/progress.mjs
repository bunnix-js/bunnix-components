/**
 * Progress Components (Next-Gen Core)
 *
 * Progress indicator primitives for showing task completion.
 *
 * Components:
 * - ProgrUncaught runtime errors:
 ×
 ERROR
 [Bunnix] Show: Expected a State object but received object. Primitives/Values are not supported.
 validateState@
 Show@essBar: Simple progress bar with customizable color
 *
 * Features:
 * - Automatic style extraction (width, height, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - Color tinting using background color tokens
 * - Percentage-based progress value (0-100)
 */
import Bunnix, { Show, useState } from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles, isStateLike } from "./utils.mjs";
import "./progress.css";

const { div } = Bunnix;

/**
 * Simple progress bar component with customizable color.
 *
 * @param {Object} props - Component props
 * @param {number} [props.value=0] - Progress value (0-100)
 * @param {string} [props.color="primary"] - Bar color using background color tokens: "primary" | "secondary" | "tertiary" | "danger"
 * @param {number} [props.height=8] - Bar height in pixels
 * @param {number} [props.width] - Bar width in pixels
 * @param {boolean} [props.fillWidth=true] - Expand to fill container width
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Child elements
 * @returns {*} ProgressBar component
 *
 * @example
 * ProgressBar({ value: 75, color: "primary" })
 * ProgressBar({ value: 50, color: "danger", fillWidth: true })
 */
export const ProgressBar = withNormalizedArgs((props = {}, ...children) => {
  return withExtractedStyles((finalProps, ...children) => {
    const valueInput = props.value ?? 0;
    const color = props.color ?? "primary";

    // Convert to state if not already
    const valueState = isStateLike(valueInput) ? valueInput : useState(valueInput);

    delete finalProps.value;
    delete finalProps.color;

    return div(
      {
        ...finalProps,
        class: `progress-bar ${finalProps.class || ""}`.trim(),
      },
      Show(valueState, (val) => {
        const clampedValue = Math.min(100, Math.max(0, val));
        return div({
          class: "progress-bar-fill",
          style: {
            width: `${clampedValue}%`,
            backgroundColor: `var(--color-bg-${color})`,
          },
        });
      }),
    );
  })({ height: 8, fillWidth: true, ...props }, ...children);
});
