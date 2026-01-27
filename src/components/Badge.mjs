import Bunnix from "@bunnix/core";
import Icon from "./Icon.mjs";

const { span } = Bunnix;

const toneClassMap = {
  base: "badge-base",
  success: "badge-success",
  info: "badge-info",
  warning: "badge-warning",
  danger: "badge-danger",
  accent: "badge-accent",
  dimmed: "badge-dimmed"
};

const sizeClassMap = {
  xs: "badge-xs",
  sm: "badge-sm",
  md: "badge-md"
};

const variantClassMap = {
  solid: "badge-solid",
  soft: "badge-soft",
  outline: "badge-outline"
};

export default function Badge({
  tone = "base",
  size = "sm",
  variant = "solid",
  icon,
  overlap = false,
  shape = "capsule",
  class: className = ""
} = {}, children) {
  const toneClass = toneClassMap[tone] || toneClassMap.base;
  const sizeClass = sizeClassMap[size] || sizeClassMap.sm;
  const variantClass = variantClassMap[variant] || variantClassMap.solid;
  const iconSize = size === "md" ? "lg" : size === "xs" ? "xs" : "sm";
  const overlapClass = overlap ? "badge-overlap" : "";
  const shapeClass = shape === "circle" ? "badge-circle" : "";
  const combinedClass = `badge ${toneClass} ${sizeClass} ${variantClass} ${overlapClass} ${shapeClass} ${className}`.trim();

  return span({ class: combinedClass }, [
    icon ? Icon({ name: icon, fill: "current", size: iconSize }) : null,
    children
  ]);
}
