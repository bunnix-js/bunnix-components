import Bunnix from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles, isStateLike } from "./utils.mjs";

const { button } = Bunnix;

const Button2Core = (props, ...children) => {
  let outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  let paddingClass = (!props.padding) ? "padding-y-sm padding-x-md" : "padding-y-sm";
  let variantClass = props.variant || "primary";

  const disabledValue = props.disabled;

  delete props.variant;
  delete props.outline;
  delete props.disabled;

  const handleClick = (e) => {
    if (props.click) props.click(e);
  };

  return button({
    ...props,
    type: props.type ?? "button",
    disabled: disabledValue ?? false,
    click: handleClick,
    class: `button ${variantClass} ${outlineClass} ${paddingClass} ${props.class || ""}`
  }, ...children);
};

const LinkButtonCore = (props, ...children) => {
  let outlineClass = props.outline ? "focus-outline-dimmed" : "no-outline";
  let variantClass = props.variant || "";

  const disabledValue = props.disabled;
  const getIsDisabled = () =>
    isStateLike(disabledValue) ? !!disabledValue.get() : !!disabledValue;

  delete props.variant;
  delete props.outline;
  delete props.disabled;

  const handleClick = (e) => {
    if (getIsDisabled()) return;
    if (props.click) props.click(e);
  };

  return button({
    ...props,
    type: props.type ?? "button",
    ...(getIsDisabled() ? { disabled: true } : {}),
    click: handleClick,
    class: `link-button ${variantClass} ${outlineClass} ${props.class || ""}`
  }, ...children);
};

export const Button2 = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    Button2Core(finalProps, ...children),
  )({ minHeight: 32, textSize: "1rem", ...props }, ...children),
);

export const LinkButton = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    LinkButtonCore(finalProps, ...children),
  )({ minHeight: 32, textSize: "1rem", ...props }, ...children),
);
