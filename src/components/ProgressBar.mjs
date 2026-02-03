import Bunnix from "@bunnix/core";
import { clampSize, toSizeToken } from "../utils/sizeUtils.mjs";

const { div } = Bunnix;

export default function ProgressBar({
  value = 0,
  min = 0,
  max = 100,
  size,
  color = "default",
  class: className = "",
  ...rest
} = {}) {
  const isState = (val) => val && typeof val.map === "function";
  const normalizeSize = (val) =>
    clampSize(val, ["xsmall", "small", "regular", "large", "xlarge"], "regular");

  const sizeState = isState(size) ? size : null;
  const classState = isState(className) ? className : null;
  const colorState = isState(color) ? color : null;
  const valueState = isState(value) ? value : null;
  const minState = isState(min) ? min : null;
  const maxState = isState(max) ? max : null;

  const buildClass = (sizeValue, classValue) => {
    const normalizedSize = normalizeSize(sizeValue);
    const sizeToken = toSizeToken(normalizedSize);
    const sizeClass = sizeToken ? `progress-bar-${sizeToken}` : "";
    return `progress-bar ${sizeClass} ${classValue || ""}`.trim();
  };

  const buildFillClass = (colorValue) => {
    const resolvedColor = colorValue || "default";
    return `progress-bar-fill text-${resolvedColor}`.trim();
  };

  const clampPercent = (val, minValue, maxValue) => {
    const safeMin = Number.isFinite(Number(minValue)) ? Number(minValue) : 0;
    const safeMax = Number.isFinite(Number(maxValue)) ? Number(maxValue) : 100;
    const safeValue = Number.isFinite(Number(val)) ? Number(val) : 0;

    if (safeMax <= safeMin) return 0;

    const rawPercent = ((safeValue - safeMin) / (safeMax - safeMin)) * 100;
    return Math.min(100, Math.max(0, rawPercent));
  };

  const buildFillStyle = (val, minValue, maxValue) =>
    `width: ${clampPercent(val, minValue, maxValue)}%;`;

  const combinedClass = sizeState
    ? sizeState.map((value) => buildClass(value, classState ? classState.get() : className))
    : classState
      ? classState.map((value) => buildClass(size, value))
      : buildClass(size, className);

  const fillClass = colorState ? colorState.map((value) => buildFillClass(value)) : buildFillClass(color);

  const fillStyle = valueState
    ? valueState.map((val) =>
        buildFillStyle(val, minState ? minState.get() : min, maxState ? maxState.get() : max)
      )
    : minState
      ? minState.map((val) => buildFillStyle(value, val, maxState ? maxState.get() : max))
      : maxState
        ? maxState.map((val) => buildFillStyle(value, min, val))
        : buildFillStyle(value, min, max);

  return div(
    {
      class: combinedClass,
      role: "progressbar",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      ...rest,
    },
    [div({ class: fillClass, style: fillStyle })],
  );
}
