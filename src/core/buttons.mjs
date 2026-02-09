import Bunnix, { useState } from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";

const { div, button } = Bunnix;

const Button2Core = (props, ...children) => {
  let outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  let baseClass = "appearance-none border-none flex-row flex-center cursor-pointer radius-md no-selectable";
  let paddingClass = (!props.padding) ? "padding-y-sm padding-x-md" : "padding-y-sm";
  let variant = "bg-fg-primary fg-primary-inverted hover-bg-primary-dimmed";

  if (props.variant === "secondary")
    variant = "bg-primary fg-primary border-primary hover-bg-secondary";

  if (props.variant === "tertiary")
    variant = "bg-none fg-primary border-transparent hover-bg-secondary";

  if (props.variant === "danger")
    variant = "bg-danger fg-primary-inverted hover-bg-danger-dimmed";

  let disabled = (props.disabled?.get && props.disabled?.set) ?
    props.disabled :
    useState(!!props.disabled);

  delete props.variant;
  delete props.outline;

  const handleClick = (e) => {
    if (disabled.get()) return;
    if (props.click) props.click(e);
  };

  return button({
    ...props,
    type: props.type ?? "button",
    disabled: !!disabled.get(),
    click: handleClick,
    class: `${baseClass} ${outlineClass} ${paddingClass} ${variant}`
  }, ...children);
};

const LinkButtonCore = (props, ...children) => {
  let outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  let baseClass = "flex-row padding-y-sm cursor-pointer radius-md no-selectable";
  let variant = "fg-link hover-fg-link-dimmed hover-decoration-underline";

  if (props.variant === "secondary")
    variant = "fg-primary decoration-underline hover-decoration-underline hover-fg-primary-dimmed";

  if (props.variant === "tertiary")
    variant = "padding-x-md bg-primary fg-primary border-transparent hover-bg-secondary";

  if (props.variant === "danger")
    variant = "fg-danger hover-fg-danger-dimmed hover-decoration-underline";

  let disabled = (props.disabled?.get && props.disabled?.set) ?
    props.disabled :
    useState(!!props.disabled);

  delete props.variant;
  delete props.outline;

  const handleClick = (e) => {
    if (disabled.get()) return;
    if (props.click) props.click(e);
  };

  const handleKeyDown = (e) => {
    if (disabled.get()) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (props.click) props.click(e);
    }
    if (props.keydown) props.keydown(e);
  };

  return div({
    ...props,
    tabindex: disabled.get() ? undefined : (props.tabindex ?? 0),
    role: "button",
    click: handleClick,
    keydown: handleKeyDown,
    class: `${baseClass} ${outlineClass} ${variant}`
  }, ...children);
};

export const Button2 = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    Button2Core(finalProps, ...children),
  )({ minHeight: 32, ...props }, ...children),
);

export const LinkButton = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    LinkButtonCore(finalProps, ...children),
  )({ minHeight: 32, ...props }, ...children),
);
