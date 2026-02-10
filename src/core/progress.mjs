/**
 * Progress Components (Next-Gen Core)
 *
 * Progress indicator primitives for showing task completion.
 *
 * Components:
 * - ProgressBar: Simple progress bar with customizable color
 *
 * Features:
 * - Automatic style extraction (width, height, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - Color tinting using background color tokens
 * - Percentage-based progress value (0-100)
 */
import Bunnix from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles, isStateLike } from "./utils.mjs";
import "./progress.css";

const { div } = Bunnix;

/**
 * Simple progress bar component with customizable color.
 *
 * @param {Object} props - Component props
 * @param {number} [props.value=0] - Progress value (0-100)
 * @param {string} [props.color="primary"] - Bar color variant matching foreground token family
 * Semantic options include: "success" | "warning" | "danger" | "error" | "link"
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
    const valueInput = finalProps.value ?? 0;
    const color = props.color ?? "primary";

    delete finalProps.value;
    delete finalProps.color;

    const toWidth = (val) => {
      const clampedValue = Math.min(100, Math.max(0, Number(val ?? 0)));
      return `${clampedValue}%`;
    };

    const fillWidth =
      isStateLike(valueInput) && typeof valueInput.map === "function"
        ? valueInput.map((val) => toWidth(val))
        : toWidth(valueInput);

    const resolveFillColor = (tone) => {
      const normalizedTone = String(tone ?? "primary").toLowerCase();

      if (normalizedTone === "primary") return "var(--color-primary)";
      if (normalizedTone === "primary-dimmed") return "var(--color-primary-dimmed)";
      if (normalizedTone === "secondary") return "var(--color-secondary)";
      if (normalizedTone === "tertiary") return "var(--color-tertiary)";
      if (normalizedTone === "error") return "var(--color-danger)";

      return `var(--color-${normalizedTone})`;
    };

    return div(
      {
        ...finalProps,
        class: `progress-bar ${finalProps.class || ""}`.trim(),
      },
      div({
        class: "progress-bar-fill",
        style: {
          width: fillWidth,
          backgroundColor: resolveFillColor(color),
        },
      }),
    );
  })({ height: 8, fillWidth: true, ...props }, ...children);
});
