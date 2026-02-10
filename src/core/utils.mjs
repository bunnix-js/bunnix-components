export const isStateLike = (value) =>
  value &&
  typeof value.get === "function" &&
  typeof value.subscribe === "function";

export function withNormalizedArgs(fn) {
  return (props = {}, ...children) => {
    const isProps =
      typeof props === "object" &&
      !Array.isArray(props) &&
      props.nodeType === undefined &&
      !("tag" in props);
    const actualProps = isProps ? props : {};
    const actualChildren = isProps ? children : [props, ...children];
    return fn(actualProps, ...actualChildren);
  };
}

export function withExtractedStyles(fn) {
  return (props, ...children) => {
    let style = { ...(props.style || {}) };
    let finalProps = { ...props };

    if ("gap" in props) {
      style.gap = typeof props.gap === "number" ? `${props.gap}px` : props.gap;
      delete finalProps.gap;
    }

    if ("color" in props) {
      style.color = props.color;
      if (props.color === "primary") style.color = "var(--color-fg-primary)";
      if (props.color === "secondary") style.color = "var(--color-fg-secondary)";
      if (props.color === "tertiary") style.color = "var(--color-fg-tertiary)";
      if (props.color === "success") style.color = "var(--color-success)";
      if (props.color === "warning") style.color = "var(--color-warning)";
      if (props.color === "danger") style.color = "var(--color-danger)";
      if (props.color === "link") style.color = "var(--color-link)";
      delete finalProps.color;
    }

    if ("textColor" in props) {
      style.color = props.textColor;
      delete finalProps.textColor;
    }

    if ("textSize" in props) {
      style.fontSize =
        typeof props.textSize === "number"
          ? `${props.textSize}px`
          : props.textSize;
      delete finalProps.textSize;
    }

    if ("weight" in props) {
      if (typeof props.weight === "number") {
        style.fontWeight = props.weight;
      } else {
        if (props.weight === "regular" || props.weight === "default")
          style.fontWeight = "var(--font-weight-default)";
        if (props.weight === "heavy")
          style.fontWeight = "var(--font-weight-heavy)";
        if (props.weight === "heavier")
          style.fontWeight = "var(--font-weight-heavier)";
      }
      delete finalProps.weight;
    }

    if ("overflow" in props) {
      style.overflow = props.overflow;
      delete finalProps.overflow;
    }

    if ("bgColor" in props) {
      style.backgroundColor = props.bgColor;
      delete finalProps.bgColor;
    }

    if ("width" in props) {
      style.width =
        typeof props.width === "number"
          ? `${props.width}px`
          : props.width;
      delete finalProps.width;
    }

    if ("height" in props) {
      style.height =
        typeof props.height === "number"
          ? `${props.height}px`
          : props.height;
      delete finalProps.height;
    }

    if ("fillWidth" in props) {
      style.width = "100%";
      delete finalProps.fillWidth;
    }

    if ("fillHeight" in props) {
      style.height = "100%";
      delete finalProps.fillHeight;
    }

    if ("maxWidth" in props) {
      style.maxWidth =
        typeof props.maxWidth === "number"
          ? `${props.maxWidth}px`
          : props.maxWidth;
      delete finalProps.maxWidth;
    }

    if ("minWidth" in props) {
      style.minWidth =
        typeof props.minWidth === "number"
          ? `${props.minWidth}px`
          : props.minWidth;
      delete finalProps.minWidth;
    }

    if ("maxHeight" in props) {
      style.maxHeight =
        typeof props.maxHeight === "number"
          ? `${props.maxHeight}px`
          : props.maxHeight;
      delete finalProps.maxHeight;
    }

    if ("minHeight" in props) {
      style.minHeight =
        typeof props.minHeight === "number"
          ? `${props.minHeight}px`
          : props.minHeight;
      delete finalProps.minHeight;
    }

    if ("size" in props) {
      const sizeValue =
        typeof props.size === "number" ? `${props.size}px` : props.size;
      style.width = sizeValue;
      style.height = sizeValue;
      delete finalProps.size;
    }

    if ("marginX" in props) {
      const marginXValue =
        typeof props.marginX === "number"
          ? `${props.marginX}px`
          : props.marginX;
      style.marginLeft = marginXValue;
      style.marginRight = marginXValue;
      delete finalProps.marginX;
    }

    if ("marginY" in props) {
      const marginYValue =
        typeof props.marginY === "number"
          ? `${props.marginY}px`
          : props.marginY;
      style.marginTop = marginYValue;
      style.marginBottom = marginYValue;
      delete finalProps.marginY;
    }

    if ("marginLeft" in props) {
      style.marginLeft =
        typeof props.marginLeft === "number"
          ? `${props.marginLeft}px`
          : props.marginLeft;
      delete finalProps.marginLeft;
    }

    if ("marginRight" in props) {
      style.marginRight =
        typeof props.marginRight === "number"
          ? `${props.marginRight}px`
          : props.marginRight;
      delete finalProps.marginRight;
    }

    if ("marginTop" in props) {
      style.marginTop =
        typeof props.marginTop === "number"
          ? `${props.marginTop}px`
          : props.marginTop;
      delete finalProps.marginTop;
    }

    if ("marginBottom" in props) {
      style.marginBottom =
        typeof props.marginBottom === "number"
          ? `${props.marginBottom}px`
          : props.marginBottom;
      delete finalProps.marginBottom;
    }

    if ("top" in props) {
      style.top =
        typeof props.top === "number"
          ? `${props.top}px`
          : props.top;
      delete finalProps.top;
    }

    if ("bottom" in props) {
      style.bottom =
        typeof props.bottom === "number"
          ? `${props.bottom}px`
          : props.bottom;
      delete finalProps.bottom;
    }

    if ("left" in props) {
      style.left =
        typeof props.left === "number"
          ? `${props.left}px`
          : props.left;
      delete finalProps.left;
    }

    if ("right" in props) {
      style.right =
        typeof props.right === "number"
          ? `${props.right}px`
          : props.right;
      delete finalProps.right;
    }

    if ("flexGrow" in props) {
      style.flexGrow = props.flexGrow;
      delete finalProps.flexGrow;
    }

    if ("flexShrink" in props) {
      style.flexShrink = props.flexShrink;
      delete finalProps.flexShrink;
    }

    finalProps.style = style;
    return fn(finalProps, ...children);
  };
}
