import Bunnix, { useState } from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";

const { div } = Bunnix;

export const Button2 = withNormalizedArgs((props, ...children) => {
  const propsWithDefaults = { outline: true, ...props };
  return withExtractedStyles((finalProps, ...children) => {
    let outlineClass = finalProps.outline ? "focus-outline-dimmed" : "no-outline";
    let baseClass = "flex-row flex-center cursor-pointer radius-md no-selectable";
    let paddingClass = (!finalProps.padding) ? "padding-y-sm padding-x-md" : "";
    let variant = "bg-fg-primary fg-primary-inverted hover-bg-primary-dimmed";

    if (finalProps.variant === "secondary")
      variant = "bg-primary fg-primary border-primary hover-bg-secondary";

    if (finalProps.variant === "tertiary")
      variant = "bg-none fg-primary border-transparent hover-bg-secondary";

    if (finalProps.variant === "danger")
      variant = "bg-danger fg-primary-inverted hover-bg-danger-dimmed";

    let disabled = (finalProps.disabled?.get && finalProps.disabled?.set) ?
      finalProps.disabled :
      useState(!!finalProps.disabled);

    delete finalProps.variant;
    delete finalProps.outline;

    const handleClick = (e) => {
      if (disabled.get()) return;
      if (finalProps.click) finalProps.click(e);
    };

    const handleKeyDown = (e) => {
      if (disabled.get()) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (finalProps.click) finalProps.click(e);
      }
      if (finalProps.keydown) finalProps.keydown(e);
    };

    return div({
      ...finalProps,
      tabindex: disabled.get() ? undefined : (finalProps.tabindex ?? 0),
      role: "button",
      click: handleClick,
      keydown: handleKeyDown,
      class: `${baseClass} ${outlineClass} ${paddingClass} ${variant}`
    }, ...children);
  })(propsWithDefaults, ...children);
});

export const LinkButton = withNormalizedArgs((props, ...children) => {
  const propsWithDefaults = { outline: true, ...props };
  return withExtractedStyles((finalProps, ...children) => {
    let outlineClass = finalProps.outline ? "focus-outline-dimmed" : "no-outline";
    let baseClass = "flex-row cursor-pointer radius-md no-selectable";
    let variant = "fg-link hover-fg-link-dimmed hover-decoration-underline";

    if (finalProps.variant === "secondary")
      variant = "fg-primary decoration-underline hover-decoration-underline hover-fg-primary-dimmed";

    if (finalProps.variant === "tertiary")
      variant = "padding-x-md bg-primary fg-primary border-transparent hover-bg-secondary";

    if (finalProps.variant === "danger")
      variant = "fg-danger hover-fg-danger-dimmed hover-decoration-underline";

    let disabled = (finalProps.disabled?.get && finalProps.disabled?.set) ?
      finalProps.disabled :
      useState(!!finalProps.disabled);

    delete finalProps.variant;
    delete finalProps.outline;

    const handleClick = (e) => {
      if (disabled.get()) return;
      if (finalProps.click) finalProps.click(e);
    };

    const handleKeyDown = (e) => {
      if (disabled.get()) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (finalProps.click) finalProps.click(e);
      }
      if (finalProps.keydown) finalProps.keydown(e);
    };

    return div({
      ...finalProps,
      tabindex: disabled.get() ? undefined : (finalProps.tabindex ?? 0),
      role: "button",
      click: handleClick,
      keydown: handleKeyDown,
      class: `${baseClass} ${outlineClass} ${variant}`
    }, ...children);
  })(propsWithDefaults, ...children);
});
